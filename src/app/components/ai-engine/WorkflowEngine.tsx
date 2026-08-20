// ─── WORKFLOW ENGINE ──────────────────────────────────────────────────────────
// Shared execution component that renders genuinely different experiences
// for each workflow based on its typed contract.
//
// State machine:
//   needs_context → needs_information → needs_permission → ready
//   → running (step by step) → needs_review → awaiting_approval
//   → completed / failed / cancelled
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import {
  X, ChevronRight, AlertCircle, CheckCircle2, Clock, Shield, Database,
  Eye, Play, Check, ArrowRight, Info, Loader2, FileText, AlertTriangle,
  Lock, ExternalLink, Zap, ChevronDown, ChevronUp, RotateCcw
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAIEngine } from "../../context/AIEngineContext";
import { getWorkflowById } from "../../data/workflow-registry";
import { WorkflowContract, InputField, ExactDataSource, WorkflowStep, ExecutionState, WorkflowRun } from "../../types/ai-engine-workflow";
import { toast } from "sonner";

interface WorkflowEngineProps {
  workflowId: string;
  initialInputs?: Record<string, any>;
  onClose: () => void;
  onComplete?: (run: WorkflowRun) => void;
}

// ─── STATE LABEL MAP ──────────────────────────────────────────────────────────

const STATE_LABELS: Record<ExecutionState, string> = {
  draft: "Draft",
  needs_context: "Select Context",
  needs_information: "Complete Information",
  needs_permission: "Grant Permission",
  ready: "Ready to Start",
  running: "Running",
  needs_review: "Review Output",
  awaiting_approval: "Awaiting Approval",
  approved: "Approved",
  executing_action: "Executing",
  completed: "Completed",
  partially_completed: "Partially Complete",
  failed: "Failed",
  cancelled: "Cancelled",
  expired: "Expired",
};

const STATE_COLORS: Partial<Record<ExecutionState, string>> = {
  needs_information: "text-amber-600 bg-amber-50 border-amber-200",
  needs_permission: "text-blue-600 bg-blue-50 border-blue-200",
  ready: "text-emerald-700 bg-emerald-50 border-emerald-200",
  running: "text-blue-600 bg-blue-50 border-blue-200",
  needs_review: "text-purple-600 bg-purple-50 border-purple-200",
  awaiting_approval: "text-amber-700 bg-amber-50 border-amber-200",
  completed: "text-emerald-700 bg-emerald-50 border-emerald-200",
  failed: "text-red-600 bg-red-50 border-red-200",
  cancelled: "text-muted-foreground bg-muted/40 border-border",
};

// ─── FIELD RENDERER ───────────────────────────────────────────────────────────

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: InputField;
  value: any;
  onChange: (val: any) => void;
}) {
  const base = "w-full px-3 py-2 bg-muted/30 border border-border/20 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground/50";

  if (field.type === "select") {
    return (
      <select value={value ?? ""} onChange={(e) => onChange(e.target.value)} className={base}>
        <option value="">Select…</option>
        {field.options?.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    );
  }

  if (field.type === "multi_select") {
    const selected: string[] = value ?? [];
    return (
      <div className="flex flex-wrap gap-1.5">
        {field.options?.map((o) => {
          const active = selected.includes(o);
          return (
            <button
              key={o}
              type="button"
              onClick={() => onChange(active ? selected.filter((s) => s !== o) : [...selected, o])}
              className={`px-2.5 py-1 rounded-lg text-xs border cursor-pointer transition-all ${active ? "bg-primary text-white border-primary" : "bg-muted/30 border-border/20 text-muted-foreground hover:bg-muted/50"}`}
            >
              {o}
            </button>
          );
        })}
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <textarea
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        rows={3}
        className={`${base} resize-none`}
      />
    );
  }

  if (field.type === "date") {
    return <input type="date" value={value ?? ""} onChange={(e) => onChange(e.target.value)} className={base} />;
  }

  if (field.type === "number") {
    return <input type="number" value={value ?? ""} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} className={base} />;
  }

  if (field.type === "entity_select") {
    return (
      <select value={value ?? ""} onChange={(e) => onChange(e.target.value)} className={base}>
        <option value="">Select {field.entityType?.replace("_", " ")}…</option>
        <option value="app_snapp_001">Snapp SuperApp — Senior Product Designer (Active)</option>
        <option value="job_snapp_spd">Senior Product Designer at Snapp (Job)</option>
        <option value="goal_career_01">Land Senior Product Design Role (Goal)</option>
      </select>
    );
  }

  return (
    <input
      type={field.type === "currency" ? "text" : "text"}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder}
      className={base}
    />
  );
}

// ─── DATA SOURCE CARD ─────────────────────────────────────────────────────────

function DataSourceCard({ source }: { source: ExactDataSource }) {
  return (
    <div className={`flex items-start gap-2 p-2.5 rounded-xl border text-xs ${source.currentlyAvailable ? "bg-muted/20 border-border/20" : "bg-amber-50/60 border-amber-200/60"}`}>
      <Database className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${source.currentlyAvailable ? "text-primary" : "text-amber-600"}`} />
      <div className="flex-1 min-w-0">
        <p className={`font-medium leading-tight ${source.currentlyAvailable ? "text-foreground" : "text-amber-800"}`}>{source.label}</p>
        <p className="text-muted-foreground mt-0.5 text-[11px]">{source.purpose}</p>
        {!source.currentlyAvailable && (
          <p className="text-amber-700 text-[10px] mt-0.5 font-medium">Not yet linked — select an entity above</p>
        )}
      </div>
      {source.canExclude && (
        <button className="shrink-0 text-[10px] text-muted-foreground hover:text-red-500 cursor-pointer transition-colors">Exclude</button>
      )}
    </div>
  );
}

// ─── STEP ROW ─────────────────────────────────────────────────────────────────

function StepRow({ step, status }: { step: WorkflowStep; status: "pending" | "active" | "completed" }) {
  return (
    <div className={`flex items-start gap-3 p-2.5 rounded-xl text-xs transition-all ${status === "active" ? "bg-primary/5 border border-primary/20" : status === "completed" ? "opacity-60" : ""}`}>
      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${status === "completed" ? "bg-emerald-500 text-white" : status === "active" ? "bg-primary text-white" : "bg-muted border border-border/30 text-muted-foreground"}`}>
        {status === "completed" ? <Check className="w-3 h-3" /> : status === "active" ? <Loader2 className="w-3 h-3 animate-spin" /> : <span className="text-[10px] font-bold">{step.order}</span>}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`font-medium leading-tight ${status === "active" ? "text-primary" : "text-foreground"}`}>{step.label}</p>
        <p className="text-muted-foreground text-[11px] mt-0.5">{step.description}</p>
        {step.isExternal && <span className="inline-flex items-center gap-0.5 mt-1 text-[10px] text-amber-700 font-medium"><ExternalLink className="w-2.5 h-2.5" />External action</span>}
        {step.requiresApproval && <span className="inline-flex items-center gap-0.5 ml-2 mt-1 text-[10px] text-amber-700 font-medium"><Lock className="w-2.5 h-2.5" />Needs approval</span>}
      </div>
    </div>
  );
}

// ─── MAIN ENGINE ──────────────────────────────────────────────────────────────

export function WorkflowEngine({ workflowId, initialInputs = {}, onClose, onComplete }: WorkflowEngineProps) {
  const { startWorkflowRun, updateRunInputs, advanceRunStep, completeRun, cancelRun, failRun, getActiveRunForWorkflow, saveOutputArtifact, createCase, requestActionApproval, activeContext } = useAIEngine();

  const workflow = getWorkflowById(workflowId);
  const [run, setRun] = useState<WorkflowRun | null>(null);
  const [localInputs, setLocalInputs] = useState<Record<string, any>>(initialInputs);
  const [showOptional, setShowOptional] = useState(false);
  const [showSources, setShowSources] = useState(true);
  const [showPlan, setShowPlan] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedOutput, setSimulatedOutput] = useState<string | null>(null);
  const [permissionsGranted, setPermissionsGranted] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!workflow) return;
    const existing = getActiveRunForWorkflow(workflowId);
    if (existing) {
      setRun(existing);
      setLocalInputs(existing.collectedInputs);
    } else {
      const newRun = startWorkflowRun(workflowId, initialInputs);
      setRun(newRun);
    }
  }, [workflowId]);

  if (!workflow) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">
        Workflow not found.
      </div>
    );
  }

  const missingRequired = workflow.requiredInputs.filter((f) => !localInputs[f.key] || localInputs[f.key] === "");
  const missingPermissions = workflow.requiredPermissions.filter((p) => !permissionsGranted.has(p.key));
  const isReady = missingRequired.length === 0 && missingPermissions.length === 0;

  const currentState: ExecutionState = run?.state ?? (
    missingRequired.length > 0 ? "needs_information" :
    missingPermissions.length > 0 ? "needs_permission" : "ready"
  );

  const handleFieldChange = (key: string, val: any) => {
    const updated = { ...localInputs, [key]: val };
    setLocalInputs(updated);
    if (run) {
      updateRunInputs(run.id, updated);
    }
  };

  const handleGrantPermission = (permKey: string) => {
    const updated = new Set(permissionsGranted);
    updated.add(permKey);
    setPermissionsGranted(updated);
    toast.success("Permission granted for this session");
  };

  const handleSimulateExecution = async () => {
    if (!run) return;
    setIsSimulating(true);
    setSimulatedOutput(null);

    // Simulate step-by-step execution
    const steps = workflow.steps.filter((s) => !s.requiresApproval || !s.isExternal);
    for (let i = 0; i < steps.length; i++) {
      await new Promise((r) => setTimeout(r, 600));
      advanceRunStep(run.id);
      setRun((prev) => prev ? { ...prev, currentStepIndex: i + 1, state: "running" } : prev);
    }

    // Generate deterministic demo output
    const outputText = generateDemoOutput(workflow, localInputs);
    setSimulatedOutput(outputText);
    setIsSimulating(false);
    setRun((prev) => prev ? { ...prev, state: "needs_review" } : prev);
  };

  const handleSaveOutput = () => {
    if (!run || !simulatedOutput) return;
    const artifact = saveOutputArtifact({
      title: `${workflow.name} — ${activeContext.name}`,
      type: (workflow.outputs[0]?.type ?? "analysis_report") as any,
      content: simulatedOutput,
      dataSources: workflow.dataSources.filter((s) => s.currentlyAvailable).map((s) => s.label),
      targetHamraheSection: workflow.outputs[0]?.saveLocation ?? "AI Engine Outputs",
    });

    completeRun(run.id, [artifact.id]);
    setRun((prev) => prev ? { ...prev, state: "completed", outputArtifactIds: [artifact.id] } : prev);
    toast.success("Output saved to Artifacts");
    onComplete?.(run);
  };

  const handleRequestApproval = () => {
    if (!run) return;
    const externalStep = workflow.steps.find((s) => s.isExternal && s.requiresApproval);
    requestActionApproval(
      workflow.approvalPolicy.requiredFor[0] ?? workflow.name,
      workflow.externalSideEffects[0] ?? "Hamrahe",
      workflow.dataSources.filter((s) => s.currentlyAvailable).map((s) => s.label),
      workflow.estimatedCredits,
      () => {
        setRun((prev) => prev ? { ...prev, state: "completed" } : prev);
        toast.success("Action executed successfully (demo simulation)");
        onComplete?.(run);
      }
    );
  };

  const handleCancel = () => {
    if (run) cancelRun(run.id);
    onClose();
  };

  const stateColorClass = STATE_COLORS[currentState] ?? "text-muted-foreground bg-muted/40 border-border";

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative w-full max-w-xl h-full bg-card border-l border-border/30 shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-border/20 shrink-0">
          <div className="flex-1 min-w-0 pr-4">
            <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">{workflow.category}</span>
            <h2 className="text-base font-bold text-foreground mt-0.5 leading-snug">{workflow.name}</h2>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{workflow.outcome}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold ${stateColorClass}`}>
              {STATE_LABELS[currentState]}
            </span>
            <button onClick={onClose} className="p-1.5 hover:bg-muted/60 rounded-xl cursor-pointer transition-colors">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">

          {/* ── COMPLETED STATE ──────────────────────────── */}
          {currentState === "completed" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-emerald-800">Workflow completed</p>
                  <p className="text-xs text-emerald-700">
                    {run?.outputArtifactIds.length ?? 0} output(s) saved to{" "}
                    <span className="font-semibold">{workflow.outputs[0]?.saveLocation}</span>
                  </p>
                </div>
              </div>
              {workflow.followUpActions.length > 0 && (
                <div className="bg-muted/30 rounded-2xl p-4 space-y-2">
                  <p className="text-xs font-semibold text-foreground">Suggested next actions</p>
                  {workflow.followUpActions.map((a, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <ArrowRight className="w-3 h-3 shrink-0" />
                      <span>{a}</span>
                    </div>
                  ))}
                </div>
              )}
              <button onClick={onClose} className="w-full py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors cursor-pointer">
                Done
              </button>
            </div>
          )}

          {/* ── FAILED STATE ─────────────────────────────── */}
          {currentState === "failed" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-red-800">{run?.error?.code ?? "Error"}</p>
                  <p className="text-xs text-red-700">{run?.error?.message ?? "An unexpected error occurred"}</p>
                </div>
              </div>
              <button onClick={() => setRun((prev) => prev ? { ...prev, state: "ready", error: undefined } : prev)} className="w-full py-2.5 rounded-xl border border-border/40 text-xs font-semibold hover:bg-muted cursor-pointer flex items-center justify-center gap-2">
                <RotateCcw className="w-3.5 h-3.5" /> Retry
              </button>
            </div>
          )}

          {/* ── OUTPUT REVIEW STATE ───────────────────────── */}
          {currentState === "needs_review" && simulatedOutput && (
            <div className="space-y-4">
              <div className="bg-muted/30 rounded-2xl border border-border/20 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2.5 bg-muted/40 border-b border-border/20">
                  <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                    <FileText className="w-3.5 h-3.5 text-primary" />
                    {workflow.outputs[0]?.label ?? "Generated Output"}
                  </div>
                  <span className="text-[10px] text-muted-foreground">Draft · Review before saving</span>
                </div>
                <div className="p-4 text-xs text-foreground leading-relaxed whitespace-pre-wrap max-h-72 overflow-y-auto">
                  {simulatedOutput}
                </div>
              </div>

              <div className="p-3 bg-blue-50/60 border border-blue-200/60 rounded-xl flex items-start gap-2 text-xs text-blue-800">
                <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-blue-600" />
                <p>Review the output above. You can edit it before saving. This content is private until you take an action.</p>
              </div>

              <div className="flex gap-2">
                <button onClick={handleSaveOutput} className="flex-1 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors cursor-pointer flex items-center justify-center gap-1.5">
                  <Check className="w-3.5 h-3.5" /> Save to Outputs
                </button>
                {workflow.approvalPolicy.required && (
                  <button onClick={handleRequestApproval} className="flex-1 py-2.5 rounded-xl border border-amber-400 text-amber-700 text-xs font-semibold hover:bg-amber-50 transition-colors cursor-pointer flex items-center justify-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" /> {workflow.approvalPolicy.displayLabel}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ── RUNNING STATE ─────────────────────────────── */}
          {currentState === "running" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-blue-50/60 border border-blue-200/60 rounded-2xl">
                <Loader2 className="w-5 h-5 text-blue-600 animate-spin shrink-0" />
                <div>
                  <p className="text-sm font-bold text-blue-800">Running…</p>
                  <p className="text-xs text-blue-700">
                    Step {(run?.currentStepIndex ?? 0) + 1} of {workflow.steps.length}: {workflow.steps[run?.currentStepIndex ?? 0]?.label}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {workflow.steps.map((step, idx) => {
                  const current = run?.currentStepIndex ?? 0;
                  const status = idx < current ? "completed" : idx === current ? "active" : "pending";
                  return <StepRow key={step.id} step={step} status={status} />;
                })}
              </div>
            </div>
          )}

          {/* ── NORMAL FLOW: INFORMATION + PERMISSIONS + PLAN ─ */}
          {(currentState === "needs_information" || currentState === "needs_permission" || currentState === "ready") && (
            <>
              {/* Why recommended */}
              {workflow.whyRelevant && (
                <div className="flex items-start gap-2 p-3 bg-primary/5 border border-primary/15 rounded-xl text-xs">
                  <Info className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <p className="text-foreground">{workflow.whyRelevant}</p>
                </div>
              )}

              {/* Warning banner */}
              {workflow.warningKinds.length > 0 && (
                <div className="flex items-start gap-2 p-3 bg-amber-50/80 border border-amber-200/60 rounded-xl text-xs">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-amber-800 font-medium">{workflow.approvalPolicy.displayLabel}</p>
                </div>
              )}

              {/* ── REQUIRED INPUTS ──── */}
              {workflow.requiredInputs.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <AlertCircle className={`w-3.5 h-3.5 ${missingRequired.length > 0 ? "text-amber-500" : "text-emerald-500"}`} />
                    Required Information
                    {missingRequired.length > 0 && (
                      <span className="text-[10px] text-amber-600 font-semibold">({missingRequired.length} missing)</span>
                    )}
                  </h3>
                  <div className="space-y-3">
                    {workflow.requiredInputs.map((field) => {
                      const isMissing = missingRequired.some((f) => f.key === field.key);
                      return (
                        <div key={field.key} className={`space-y-1.5 p-3 rounded-xl border ${isMissing ? "border-amber-200 bg-amber-50/40" : "border-border/20 bg-muted/10"}`}>
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-semibold text-foreground">{field.label}</label>
                            {field.required && <span className="text-[10px] text-amber-600 font-medium">Required</span>}
                          </div>
                          {field.description && <p className="text-[11px] text-muted-foreground">{field.description}</p>}
                          <FieldInput field={field} value={localInputs[field.key]} onChange={(v) => handleFieldChange(field.key, v)} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── OPTIONAL INPUTS ──── */}
              {workflow.optionalInputs.length > 0 && (
                <div className="space-y-2">
                  <button
                    onClick={() => setShowOptional(!showOptional)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                  >
                    {showOptional ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    Optional information ({workflow.optionalInputs.length} fields)
                  </button>
                  <AnimatePresence>
                    {showOptional && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-3 overflow-hidden"
                      >
                        {workflow.optionalInputs.map((field) => (
                          <div key={field.key} className="space-y-1.5 p-3 rounded-xl border border-border/20 bg-muted/10">
                            <label className="text-xs font-semibold text-foreground">{field.label}</label>
                            {field.description && <p className="text-[11px] text-muted-foreground">{field.description}</p>}
                            <FieldInput field={field} value={localInputs[field.key]} onChange={(v) => handleFieldChange(field.key, v)} />
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* ── PERMISSIONS ──── */}
              {workflow.requiredPermissions.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-blue-500" />
                    Permissions Required
                  </h3>
                  <div className="space-y-2">
                    {workflow.requiredPermissions.map((perm) => {
                      const granted = permissionsGranted.has(perm.key);
                      return (
                        <div key={perm.key} className={`flex items-center justify-between p-3 rounded-xl border text-xs ${granted ? "bg-emerald-50/60 border-emerald-200/60" : "bg-muted/20 border-border/20"}`}>
                          <div className="flex items-start gap-2 flex-1 min-w-0">
                            <Shield className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${granted ? "text-emerald-600" : "text-muted-foreground"}`} />
                            <div>
                              <p className={`font-medium leading-tight ${granted ? "text-emerald-800" : "text-foreground"}`}>{perm.label}</p>
                              <p className="text-muted-foreground text-[10px] mt-0.5">
                                {perm.scope.replace("_", " ")} · {perm.duration}
                                {perm.sensitive && <span className="text-amber-600 ml-1">· Sensitive</span>}
                              </p>
                            </div>
                          </div>
                          {granted
                            ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            : <button onClick={() => handleGrantPermission(perm.key)} className="px-3 py-1 rounded-lg bg-primary text-white text-[11px] font-semibold cursor-pointer hover:bg-primary/90 transition-colors shrink-0">Grant</button>
                          }
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── DATA SOURCES ──── */}
              <div className="space-y-2">
                <button
                  onClick={() => setShowSources(!showSources)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-foreground hover:text-primary cursor-pointer transition-colors w-full text-left"
                >
                  <Database className="w-3.5 h-3.5 text-primary" />
                  Data Sources
                  <span className="text-muted-foreground font-normal ml-1">
                    ({workflow.dataSources.filter((s) => s.currentlyAvailable).length}/{workflow.dataSources.length} available)
                  </span>
                  <span className="ml-auto">{showSources ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}</span>
                </button>
                <AnimatePresence>
                  {showSources && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2 overflow-hidden"
                    >
                      {workflow.dataSources.map((source) => (
                        <DataSourceCard key={source.id} source={source} />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ── EXECUTION PLAN ──── */}
              <div className="space-y-2">
                <button
                  onClick={() => setShowPlan(!showPlan)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-foreground hover:text-primary cursor-pointer transition-colors w-full text-left"
                >
                  <Eye className="w-3.5 h-3.5 text-primary" />
                  Execution Plan ({workflow.steps.length} steps)
                  <span className="ml-auto">{showPlan ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}</span>
                </button>
                <AnimatePresence>
                  {showPlan && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-1.5 overflow-hidden"
                    >
                      {workflow.steps.map((step) => (
                        <StepRow key={step.id} step={step} status="pending" />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ── KNOWN LIMITATIONS ──── */}
              {workflow.knownLimitations.length > 0 && (
                <div className="p-3 bg-muted/30 rounded-xl border border-border/20 space-y-1.5">
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Known limitations</p>
                  {workflow.knownLimitations.map((l, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                      <Info className="w-3 h-3 shrink-0 mt-0.5" />
                      <span>{l}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* ── QUOTA ──── */}
              <div className="flex items-center justify-between p-3 bg-amber-50/60 border border-amber-200/40 rounded-xl text-xs">
                <div className="flex items-center gap-1.5 text-amber-700 font-medium">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  Estimated usage
                </div>
                <span className="font-bold text-amber-700">{workflow.estimatedCredits} credits</span>
              </div>
            </>
          )}
        </div>

        {/* Footer action */}
        {(currentState === "needs_information" || currentState === "needs_permission" || currentState === "ready") && (
          <div className="p-5 border-t border-border/20 shrink-0 space-y-2">
            {!isReady && (
              <p className="text-[11px] text-muted-foreground text-center">
                {missingRequired.length > 0 && `${missingRequired.length} required field${missingRequired.length > 1 ? "s" : ""} incomplete · `}
                {missingPermissions.length > 0 && `${missingPermissions.length} permission${missingPermissions.length > 1 ? "s" : ""} needed`}
              </p>
            )}
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2.5 rounded-xl border border-border/40 text-xs font-semibold hover:bg-muted cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSimulateExecution}
                disabled={!isReady || isSimulating}
                className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${isReady && !isSimulating ? "bg-primary text-white hover:bg-primary/90 cursor-pointer shadow-md shadow-primary/20" : "bg-muted text-muted-foreground cursor-not-allowed"}`}
              >
                {isSimulating ? (
                  <><Loader2 className="w-3.5 h-3.5 animate-spin" />Running…</>
                ) : !isReady ? (
                  <>
                    {missingRequired.length > 0 ? <><AlertCircle className="w-3.5 h-3.5" />Complete required information</> : <><Shield className="w-3.5 h-3.5" />Grant permissions to continue</>}
                  </>
                ) : (
                  <><Play className="w-3.5 h-3.5 fill-white" />Start Workflow</>
                )}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

// ─── DEMO OUTPUT GENERATOR ────────────────────────────────────────────────────
// Deterministic, realistic demo outputs per workflow type.
// Never fabricates facts — uses only the inputs collected.

function generateDemoOutput(workflow: WorkflowContract, inputs: Record<string, any>): string {
  switch (workflow.id) {
    case "wf_salary_negotiation":
      return `SALARY NEGOTIATION STRATEGY
Role: ${inputs.role || "Senior Product Designer"} | Company: ${inputs.company || "Snapp SuperApp"}

NEGOTIATION OBJECTIVE
Secure a compensation package that reflects 4+ years of verified design leadership experience, with a primary focus on base salary and remote flexibility.

OPENING ANCHOR
Initial ask: ${inputs.target_compensation || "115,000,000 IRR / month"} — 35% above the current offer of ${inputs.current_offer || "85,000,000 IRR / month"}.

SUPPORTING ARGUMENTS
• 4 years verified experience at Digikala (HR-verified)
• Led checkout redesign: +23% conversion, -40% cart abandonment
• Design systems experience supporting 30+ engineers
• Relevant Snapp-specific: super-app scale, fintech adjacent work

OBJECTION RESPONSES
→ "Budget is fixed at current offer"
   "I understand budget constraints. My verified track record at Digikala's scale shows I can deliver measurable product outcomes. I'd like to discuss whether there's flexibility on the signing bonus or remote days."
→ "You don't have fintech experience"
   "My experience with Digikala's payment flows and my checkout conversion work is directly applicable to Snapp's financial features."

WALK-AWAY CONDITIONS
Below ${inputs.minimum_acceptable || "90,000,000 IRR / month"} base with no flexibility on other terms.

NEXT STEP
Schedule a 30-minute call to discuss the package. Proposed message ready to send after your review.`;

    case "wf_resume_tailoring":
      return `RESUME TAILORING COMPARISON
Target: ${inputs.target || "Senior Product Designer at Snapp"}\n
HEADLINE
Original: "Senior Product Designer at Digikala"
Proposed: "Senior Product Designer · Design Systems & Mobile Super-App Experiences"

WHY: Snapp's JD emphasizes super-app and mobile-first. The proposed headline connects directly.

WORK HISTORY — DIGIKALA (proposed changes)
+ Added: "Led checkout flow redesign, resulting in 23% conversion increase" (already in profile)
+ Reordered: Design systems work moved to top bullet (matches Snapp requirement)
~ Changed: "e-commerce" → "large-scale consumer product" where applicable

SKILLS (reordered for relevance)
Original order: Figma, User Research, Design Systems, Product Strategy
Proposed order: Figma, Design Systems, User Research, Product Strategy

UNCHANGED (factually accurate — no modifications)
• All company names, dates, and titles
• All metrics and outcome numbers
• Education and credentials

Note: Every change is editable. Reject any you disagree with.`;

    case "wf_interview_prep":
      return `INTERVIEW PREPARATION BRIEF
Role: Senior Product Designer at Snapp SuperApp
Stage: ${inputs.interview_stage || "Panel Interview"}

LIKELY FOCUS AREAS (based on JD analysis)
1. Design systems at scale
2. Mobile-first design decisions
3. Cross-functional collaboration
4. Metrics and design impact

BEHAVIORAL QUESTIONS (with your evidence)
Q: "Tell me about a time you improved a key product metric."
A framework: "At Digikala, I led the checkout redesign. The context was [situation]. My specific design decisions were [action]. The result was +23% conversion and -40% cart abandonment, verified by the product analytics team."

Q: "How do you work with engineering?"
A framework: "I built the design system used by 30+ engineers at Digikala. This required [specific collaboration process]."

TECHNICAL / PORTFOLIO QUESTIONS
• Be prepared to walk through your Digikala checkout case study in detail
• Prepare to explain your design system architecture decisions

QUESTIONS TO ASK SNAPP
• What are the biggest design challenges in the next 6 months?
• How does the design team collaborate with product and engineering?
• What does success look like for this role in the first 90 days?

PREPARATION CHECKLIST
☐ Review Snapp app flows before interview
☐ Prepare 2-3 case study stories with metrics
☐ Research recent Snapp product changes`;

    case "wf_learning_plan":
      return `LEARNING PLAN
Skill: ${inputs.skill_gap || "System Design"}
Timeframe: ${inputs.timeframe || "6 weeks"}

WEEK 1–2: FOUNDATIONS
• Resource: System Design Fundamentals (4h video course)
• Task: Complete first 3 modules, take notes on scalability patterns
• Milestone: Understand CAP theorem and basic distributed system concepts

WEEK 3–4: APPLIED PRACTICE
• Resource: Advanced System Design Workshop (6h)
• Task: Design one real system from scratch (e.g. a notification service)
• Milestone: Document your design with trade-offs explained

WEEK 5–6: REAL PROJECTS
• Task: Apply learning to a real Hamrahe project or case study
• Optional: Take the Hamrahe Assessment Center test for this skill
• Milestone: Produce one artifact demonstrating the skill

TRACKING
Progress updates from actual completed activities.
This plan does not affect Professional Power directly — completed activities are recorded and evaluated by the scoring system independently.`;

    default:
      return `Generated output for: ${workflow.name}\n\nThis is a demo simulation. Connect AI Engine to a real AI provider to generate actual content.\n\nInputs collected:\n${Object.entries(inputs).filter(([, v]) => v).map(([k, v]) => `• ${k}: ${Array.isArray(v) ? v.join(", ") : v}`).join("\n")}`;
  }
}
