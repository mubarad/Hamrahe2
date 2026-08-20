// ─── WORKFLOWS VIEW (intent-first) ───────────────────────────────────────────
// Replaces the catalog-first tool registry with an intent-driven interface.
// Default order per spec §6:
//   1. Natural-language task input
//   2. Up to 3 context-aware recommended workflows
//   3. Unfinished cases requiring attention
//   4. 6–8 task-oriented categories
//   5. Recently used and saved workflows
//   6. Secondary "View all capabilities" for advanced users
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { Search, ArrowRight, Briefcase, Clock, Sparkles, Zap, AlertCircle, ChevronRight, Star, Layers, Lock, Shield, ExternalLink, RotateCcw } from "lucide-react";
import { useAIEngine } from "../../context/AIEngineContext";
import { motion, AnimatePresence } from "motion/react";
import { WORKFLOW_REGISTRY, getPublishedWorkflows, searchWorkflows, WORKFLOW_CATEGORIES, getWorkflowById } from "../../data/workflow-registry";
import { WorkflowContract } from "../../types/ai-engine-workflow";
import { WorkflowEngine } from "./WorkflowEngine";
import { toast } from "sonner";

const CATEGORY_ICONS: Record<string, any> = {
  "Jobs & Career": Briefcase,
  "Profile & Resume": Star,
  "Interview Prep": Layers,
  "Skills & Evidence": Shield,
  "Networking & Intro": Sparkles,
  "Content & Brand": Zap,
  "Learning & Assessment": Clock,
  "Projects & Freelancing": ArrowRight,
  "Hiring & Recruiting": Briefcase,
  "B2B & Sales": ExternalLink,
};

// ─── INTENT SUGGESTIONS ───────────────────────────────────────────────────────

const INTENT_SUGGESTIONS = [
  "Prepare me for my interview",
  "Tailor my resume to this job",
  "Build a salary negotiation strategy",
  "Draft a message to a connection",
  "Create a learning plan for a skill gap",
  "Improve my profile for a target role",
  "Prepare a freelance proposal",
  "Write a professional post",
];

// ─── WARNING LABEL ────────────────────────────────────────────────────────────

function WarningLabel({ workflow }: { workflow: WorkflowContract }) {
  if (workflow.warningKinds.length === 0) return null;
  const label = workflow.warningKinds.includes("requires_org_authorization")
    ? "Organization approval required"
    : workflow.warningKinds.includes("uses_sensitive_info")
    ? "Sensitive data permission required"
    : "Requires your approval";
  return (
    <span className="flex items-center gap-1 text-[10px] text-amber-700 font-medium">
      <Lock className="w-2.5 h-2.5" />{label}
    </span>
  );
}

// ─── WORKFLOW CARD (intent-oriented) ─────────────────────────────────────────

function WorkflowCard({ workflow, onStart, reason }: { workflow: WorkflowContract; onStart: () => void; reason?: string }) {
  return (
    <div
      className="bg-card border border-border/30 rounded-2xl p-4 hover:shadow-md hover:border-primary/20 transition-all cursor-pointer group"
      onClick={onStart}
    >
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">{workflow.category}</span>
          <div className="flex items-center gap-1 shrink-0">
            <span className="flex items-center gap-0.5 text-[10px] text-amber-600 font-semibold">
              <Zap className="w-2.5 h-2.5" />
              {workflow.estimatedCredits}
            </span>
            {workflow.entitlementRequired !== "free" && (
              <span className="px-1.5 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-semibold capitalize">{workflow.entitlementRequired}</span>
            )}
          </div>
        </div>

        <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug">{workflow.name}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{workflow.outcome}</p>

        {reason && (
          <div className="flex items-start gap-1.5 pt-1">
            <Sparkles className="w-3 h-3 text-primary shrink-0 mt-0.5" />
            <p className="text-[11px] text-primary font-medium">{reason}</p>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-border/15">
          <WarningLabel workflow={workflow} />
          <span className="flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all">
            Start <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── ADVANCED REGISTRY ROW ────────────────────────────────────────────────────

function RegistryRow({ workflow, onStart }: { workflow: WorkflowContract; onStart: () => void }) {
  return (
    <div className="flex items-center justify-between p-3 hover:bg-muted/30 rounded-xl transition-colors group cursor-pointer" onClick={onStart}>
      <div className="flex-1 min-w-0 pr-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors truncate">{workflow.name}</span>
          {workflow.warningKinds.length > 0 && <Lock className="w-3 h-3 text-amber-500 shrink-0" />}
          {workflow.entitlementRequired !== "free" && (
            <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-semibold capitalize shrink-0">{workflow.entitlementRequired}</span>
          )}
        </div>
        <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{workflow.category}</p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-[10px] text-amber-600 font-semibold flex items-center gap-0.5">
          <Zap className="w-2.5 h-2.5" />{workflow.estimatedCredits}
        </span>
        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
    </div>
  );
}

// ─── MAIN VIEW ────────────────────────────────────────────────────────────────

export function ToolRegistryView() {
  const { recommendations, cases, tools, toggleSaveTool, activeContext } = useAIEngine();

  const [intentQuery, setIntentQuery] = useState("");
  const [activeWorkflowId, setActiveWorkflowId] = useState<string | null>(null);
  const [showAllCapabilities, setShowAllCapabilities] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const isPersonalContext = activeContext.type === "personal";
  const allPublishedWorkflows = getPublishedWorkflows();

  // Filter all workflows by active context type — personal sees only personal/shared, org sees only org/shared
  const publishedWorkflows = allPublishedWorkflows.filter((w) =>
    isPersonalContext
      ? w.audience === "personal" || w.audience === "shared"
      : w.audience === "organizational" || w.audience === "shared"
  );
  const totalPublished = publishedWorkflows.length;

  // Intent-driven search results — also filtered by context
  const intentResults = intentQuery.trim().length > 1
    ? searchWorkflows(intentQuery).filter((w) =>
        isPersonalContext
          ? w.audience === "personal" || w.audience === "shared"
          : w.audience === "organizational" || w.audience === "shared"
      )
    : [];

  // Recommended workflows — filtered to match active context audience
  const recommendedWorkflows = recommendations
    .map((r) => ({ workflow: getWorkflowById(r.workflowId), reason: r.reason }))
    .filter((r): r is { workflow: NonNullable<typeof r.workflow>; reason: string } => {
      if (!r.workflow) return false;
      return isPersonalContext
        ? r.workflow.audience === "personal" || r.workflow.audience === "shared"
        : r.workflow.audience === "organizational" || r.workflow.audience === "shared";
    })
    .slice(0, 3);

  // Open cases requiring attention
  const attentionCases = cases.filter((c) => c.status === "approval_required" || c.status === "ready_to_execute").slice(0, 3);

  // Category-filtered workflows (already filtered by context via publishedWorkflows)
  const categoryWorkflows = selectedCategory ? publishedWorkflows.filter((w) => w.category === selectedCategory) : [];

  // Saved tools from the legacy tools system
  const savedTools = tools.filter((t) => t.isSaved).slice(0, 3);

  const handleStart = (workflowId: string) => {
    setActiveWorkflowId(workflowId);
  };

  return (
    <div className="space-y-6">

      {/* ── 1. INTENT INPUT ─────────────────────────────────────────── */}
      <div className="bg-card border border-border/30 rounded-2xl p-5 shadow-sm space-y-4">
        <div>
          <h2 className="text-base font-bold text-foreground">What do you want to accomplish?</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Describe your goal and AI Engine will recommend the right workflows.</p>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3" />
          <input
            type="text"
            value={intentQuery}
            onChange={(e) => setIntentQuery(e.target.value)}
            placeholder="e.g. Prepare me for my interview, negotiate salary, improve my profile…"
            className="w-full bg-muted/40 border border-border/30 rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Intent suggestions */}
        {!intentQuery && (
          <div className="flex flex-wrap gap-1.5">
            {INTENT_SUGGESTIONS.slice(0, 6).map((s) => (
              <button
                key={s}
                onClick={() => setIntentQuery(s)}
                className="px-3 py-1 rounded-full border border-border/30 bg-muted/30 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-all cursor-pointer"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Intent search results */}
        <AnimatePresence>
          {intentQuery.trim().length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-2"
            >
              {intentResults.length === 0 ? (
                <p className="text-xs text-muted-foreground py-3 text-center">No workflows match "{intentQuery}". Try different keywords.</p>
              ) : (
                <>
                  <p className="text-xs font-semibold text-muted-foreground">{intentResults.length} workflow{intentResults.length > 1 ? "s" : ""} found</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {intentResults.slice(0, 4).map((wf) => (
                      <WorkflowCard key={wf.id} workflow={wf} onStart={() => handleStart(wf.id)} />
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Only show sections below when not showing search results */}
      {!intentQuery && (
        <>
          {/* ── 2. RECOMMENDED WORKFLOWS ────────────────────────────── */}
          {recommendedWorkflows.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Recommended for you
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {recommendedWorkflows.map(({ workflow, reason }) => (
                  <WorkflowCard key={workflow.id} workflow={workflow} onStart={() => handleStart(workflow.id)} reason={reason} />
                ))}
              </div>
            </div>
          )}

          {/* ── 3. CASES REQUIRING ATTENTION ────────────────────────── */}
          {attentionCases.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                Cases requiring attention
              </h3>
              <div className="space-y-2">
                {attentionCases.map((c) => (
                  <div key={c.id} className="flex items-center justify-between p-3.5 bg-amber-50/60 border border-amber-200/60 rounded-xl hover:bg-amber-50 transition-colors cursor-pointer">
                    <div className="flex-1 min-w-0 pr-4">
                      <p className="text-xs font-bold text-amber-900 truncate">{c.title}</p>
                      <p className="text-[11px] text-amber-700 mt-0.5">{c.nextAction}</p>
                    </div>
                    <span className="flex items-center gap-1 text-xs font-semibold text-amber-700 shrink-0">
                      Continue <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── 4. TASK-ORIENTED CATEGORIES ─────────────────────────── */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-foreground">Browse by goal</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {WORKFLOW_CATEGORIES.filter((cat) => publishedWorkflows.some((w) => w.category === cat)).slice(0, 8).map((cat) => {
                const Icon = CATEGORY_ICONS[cat] ?? Layers;
                const count = publishedWorkflows.filter((w) => w.category === cat).length;
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(isSelected ? null : cat)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${isSelected ? "bg-primary/10 border-primary/30 text-primary" : "bg-card border-border/30 hover:border-primary/20 hover:bg-muted/40 text-foreground"}`}
                  >
                    <Icon className={`w-4 h-4 mb-1.5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                    <p className="text-xs font-semibold leading-snug">{cat}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{count} workflow{count !== 1 ? "s" : ""}</p>
                  </button>
                );
              })}
            </div>

            {/* Category workflows */}
            <AnimatePresence>
              {selectedCategory && categoryWorkflows.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3">
                    {categoryWorkflows.map((wf) => (
                      <WorkflowCard key={wf.id} workflow={wf} onStart={() => handleStart(wf.id)} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── 5. SAVED WORKFLOWS ──────────────────────────────────── */}
          {savedTools.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                Saved workflows
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {savedTools.map((tool) => {
                  const wf = publishedWorkflows.find((w) => w.name.toLowerCase().includes(tool.name.toLowerCase().split(" ")[0]));
                  return wf ? (
                    <WorkflowCard key={tool.id} workflow={wf} onStart={() => handleStart(wf.id)} />
                  ) : null;
                })}
              </div>
            </div>
          )}

          {/* ── 6. VIEW ALL CAPABILITIES (secondary / advanced) ─────── */}
          <div className="bg-card border border-border/30 rounded-2xl overflow-hidden">
            <button
              onClick={() => setShowAllCapabilities(!showAllCapabilities)}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-muted-foreground" />
                <div className="text-left">
                  <p className="text-xs font-bold text-foreground">View all capabilities</p>
                  <p className="text-[11px] text-muted-foreground">
                    {totalPublished} published workflows · Advanced users
                  </p>
                </div>
              </div>
              <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${showAllCapabilities ? "rotate-90" : ""}`} />
            </button>

            <AnimatePresence>
              {showAllCapabilities && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  {/* Filter bar */}
                  <div className="px-4 pb-3 border-t border-border/20 pt-3">
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${!selectedCategory ? "bg-primary text-white" : "bg-muted/40 text-muted-foreground hover:bg-muted"}`}
                      >
                        All ({totalPublished})
                      </button>
                      {WORKFLOW_CATEGORIES.map((cat) => {
                        const count = publishedWorkflows.filter((w) => w.category === cat).length;
                        return (
                          <button
                            key={cat}
                            onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${selectedCategory === cat ? "bg-primary text-white" : "bg-muted/40 text-muted-foreground hover:bg-muted"}`}
                          >
                            {cat} ({count})
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Registry rows */}
                  <div className="px-2 pb-3 divide-y divide-border/10">
                    {(selectedCategory ? categoryWorkflows : publishedWorkflows).map((wf) => (
                      <RegistryRow key={wf.id} workflow={wf} onStart={() => handleStart(wf.id)} />
                    ))}
                  </div>

                  {/* Draft / unpublished note */}
                  <div className="px-4 pb-4">
                    <p className="text-[11px] text-muted-foreground bg-muted/30 rounded-xl p-2.5 border border-border/20">
                      <span className="font-semibold">{WORKFLOW_REGISTRY.filter((w) => w.availabilityStatus === "draft").length} capabilities</span> are in draft and not shown — they do not yet meet the full execution contract and will be published when ready.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </>
      )}

      {/* ── WORKFLOW ENGINE DRAWER ─────────────────────────────────── */}
      <AnimatePresence>
        {activeWorkflowId && (
          <WorkflowEngine
            key={activeWorkflowId}
            workflowId={activeWorkflowId}
            onClose={() => setActiveWorkflowId(null)}
            onComplete={() => {
              setActiveWorkflowId(null);
              toast.success("Workflow completed. Output saved.");
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
