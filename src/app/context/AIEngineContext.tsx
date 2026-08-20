import { createContext, useContext, useState, ReactNode } from "react";
import {
  ActiveContext,
  Goal,
  Mission,
  Case,
  OutputArtifact,
  ToolDefinition,
  MemoryItem,
  ConsentRecord,
  VerificationState,
  TrustSignal,
  Badge,
  Credential,
  Conversation,
  mockContexts,
  mockGoals,
  mockMissions,
  mockCases,
  mockOutputs,
  mockMemoryItems,
  mockConsentRecords,
  mockVerificationState,
  mockTrustSignals,
  mockBadges,
  mockCredentials,
  mockConversations,
  mockTools,
} from "../data/ai-engine-data";
import { WorkflowRun, ExecutionState, WorkflowRecommendation } from "../types/ai-engine-workflow";
import { getWorkflowById } from "../data/workflow-registry";
import { toast } from "sonner";

export interface PageContextInfo {
  route: string;
  entityType?: "profile" | "organization" | "job" | "project" | "post" | "message" | "course" | "assessment";
  entityId?: string;
  entityTitle?: string;
  entityData?: any;
}

interface ActionPreviewModalState {
  isOpen: boolean;
  actionName: string;
  destination: string;
  dataDisclosed: string[];
  quotaCost: number;
  onConfirm: () => void;
}

interface AIEngineContextType {
  activeContext: ActiveContext;
  switchContext: (contextId: string) => boolean;
  allContexts: ActiveContext[];
  
  // Data State
  goals: Goal[];
  missions: Mission[];
  cases: Case[];
  outputs: OutputArtifact[];
  tools: ToolDefinition[];
  memoryItems: MemoryItem[];
  consentRecords: ConsentRecord[];
  verificationState: VerificationState;
  trustSignals: TrustSignal[];
  badges: Badge[];
  credentials: Credential[];
  conversations: Conversation[];
  activeConversationId: string;
  setActiveConversationId: (id: string) => void;

  // Actions
  createGoal: (goal: Partial<Goal>) => Goal;
  createCase: (caseData: Partial<Case>) => Case;
  updateCaseStatus: (caseId: string, status: Case["status"], note?: string) => void;
  addCaseTimelineEvent: (caseId: string, event: any) => void;
  saveOutputArtifact: (output: Partial<OutputArtifact>) => OutputArtifact;
  updateOutputVersion: (outputId: string, newContent: string, summary: string) => void;
  addMemoryItem: (item: Partial<MemoryItem>) => void;
  deleteMemoryItem: (id: string) => void;
  clearAllMemory: () => void;
  revokeConsent: (id: string) => void;
  toggleSaveTool: (toolId: string) => void;
  consumeQuota: (amount: number, toolName: string) => boolean;

  // Action Preview & Approval System
  actionPreviewModal: ActionPreviewModalState;
  requestActionApproval: (
    actionName: string,
    destination: string,
    dataDisclosed: string[],
    quotaCost: number,
    onConfirm: () => void
  ) => void;
  closeActionPreviewModal: () => void;

  // Language & RTL
  language: "fa" | "en";
  setLanguage: (lang: "fa" | "en") => void;
  dir: "rtl" | "ltr";

  // Contextual Assistant Side Drawer
  contextualDrawerOpen: boolean;
  setContextualDrawerOpen: (open: boolean) => void;
  contextualPageContext: PageContextInfo | null;
  openContextualAssistant: (info?: PageContextInfo) => void;

  // Unsaved Draft State
  hasUnsavedDraft: boolean;
  setHasUnsavedDraft: (has: boolean) => void;

  // Workflow Execution Engine
  activeRuns: WorkflowRun[];
  startWorkflowRun: (workflowId: string, initialInputs?: Record<string, any>) => WorkflowRun;
  updateRunState: (runId: string, state: ExecutionState, update?: Partial<WorkflowRun>) => void;
  updateRunInputs: (runId: string, inputs: Record<string, any>) => void;
  advanceRunStep: (runId: string) => void;
  completeRun: (runId: string, outputIds: string[]) => void;
  cancelRun: (runId: string) => void;
  failRun: (runId: string, errorCode: string, message: string) => void;
  getActiveRunForWorkflow: (workflowId: string) => WorkflowRun | undefined;

  // Recommendations
  recommendations: WorkflowRecommendation[];
}

const AIEngineContext = createContext<AIEngineContextType | undefined>(undefined);

export function AIEngineProvider({ children }: { children: ReactNode }) {
  const [allContexts, setAllContexts] = useState<ActiveContext[]>(mockContexts);
  const [activeContext, setActiveContext] = useState<ActiveContext>(mockContexts[0]);

  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [missions, setMissions] = useState<Mission[]>(mockMissions);
  const [cases, setCases] = useState<Case[]>(mockCases);
  const [outputs, setOutputs] = useState<OutputArtifact[]>(mockOutputs);
  const [tools, setTools] = useState<ToolDefinition[]>(mockTools);
  const [memoryItems, setMemoryItems] = useState<MemoryItem[]>(mockMemoryItems);
  const [consentRecords, setConsentRecords] = useState<ConsentRecord[]>(mockConsentRecords);
  const [verificationState, setVerificationState] = useState<VerificationState>(mockVerificationState);
  const [trustSignals, setTrustSignals] = useState<TrustSignal[]>(mockTrustSignals);
  const [badges, setBadges] = useState<Badge[]>(mockBadges);
  const [credentials, setCredentials] = useState<Credential[]>(mockCredentials);
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [activeConversationId, setActiveConversationId] = useState<string>("conv_01");

  const [hasUnsavedDraft, setHasUnsavedDraft] = useState<boolean>(false);
  const [language, setLanguage] = useState<"fa" | "en">("en");
  const [activeRuns, setActiveRuns] = useState<WorkflowRun[]>([]);

  // Seeded recommendations based on Sara's active demo state
  const [recommendations] = useState<WorkflowRecommendation[]>([
    { workflowId: "wf_salary_negotiation", reason: "You have a pending offer from Snapp — now is the right time to negotiate.", urgency: "high", relatedEntityType: "job_application", relatedEntityId: "app_snapp_001", relatedEntityLabel: "Snapp SuperApp — Senior Product Designer" },
    { workflowId: "wf_interview_prep", reason: "Your Snapp application moved to panel interview stage.", urgency: "high", relatedEntityType: "job_application", relatedEntityId: "app_snapp_001", relatedEntityLabel: "Snapp SuperApp — Senior Product Designer" },
    { workflowId: "wf_profile_improvement", reason: "Your evidence coverage is 73% for Senior Product Designer. 3 gaps identified.", urgency: "medium", relatedEntityType: "goal", relatedEntityId: "goal_career_01", relatedEntityLabel: "Land Senior Product Design Role" },
  ]);

  // Contextual Assistant
  const [contextualDrawerOpen, setContextualDrawerOpen] = useState(false);
  const [contextualPageContext, setContextualPageContext] = useState<PageContextInfo | null>(null);

  // Action Preview Modal
  const [actionPreviewModal, setActionPreviewModal] = useState<ActionPreviewModalState>({
    isOpen: false,
    actionName: "",
    destination: "",
    dataDisclosed: [],
    quotaCost: 0,
    onConfirm: () => {},
  });

  const dir = language === "fa" ? "rtl" : "ltr";

  const switchContext = (contextId: string): boolean => {
    if (hasUnsavedDraft) {
      const confirmSwitch = window.confirm(
        "You have an unsaved draft or active session in this context. Are you sure you want to switch context?"
      );
      if (!confirmSwitch) return false;
    }

    const target = allContexts.find((c) => c.id === contextId);
    if (target) {
      setActiveContext(target);
      setHasUnsavedDraft(false);
      toast.success(`Active context switched to: ${target.name} (${target.subtitle})`);
      return true;
    }
    return false;
  };

  const consumeQuota = (amount: number, toolName: string): boolean => {
    if (activeContext.quotaRemaining < amount) {
      toast.error(`Insufficient AI Engine quota for "${toolName}". Remaining: ${activeContext.quotaRemaining} credits.`);
      return false;
    }
    const updatedRemaining = activeContext.quotaRemaining - amount;
    setActiveContext({ ...activeContext, quotaRemaining: updatedRemaining });
    setAllContexts((prev) =>
      prev.map((c) => (c.id === activeContext.id ? { ...c, quotaRemaining: updatedRemaining } : c))
    );
    return true;
  };

  const createGoal = (goalData: Partial<Goal>): Goal => {
    const newGoal: Goal = {
      id: `goal_${Date.now()}`,
      contextId: activeContext.id,
      title: goalData.title || "New Professional Goal",
      goalType: goalData.goalType || "Career Advancement",
      targetRole: goalData.targetRole || "Target Role",
      timeframe: goalData.timeframe || "Q4 2026",
      priority: goalData.priority || "medium",
      currentStage: "Planning Phase",
      evidenceCoverage: 50,
      nextMilestone: "Complete First Growth Mission",
      milestones: goalData.milestones || [
        { id: `m_${Date.now()}_1`, title: "Define Target Requirements", completed: false, dueDate: "2026-08-30" },
      ],
      missions: [],
      relatedCaseIds: [],
      relatedOutputIds: [],
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setGoals((prev) => [newGoal, ...prev]);
    toast.success(`New Goal created: "${newGoal.title}"`);
    return newGoal;
  };

  const createCase = (caseData: Partial<Case>): Case => {
    const newCase: Case = {
      id: `case_${Date.now()}`,
      contextId: activeContext.id,
      title: caseData.title || "New Professional Case",
      objective: caseData.objective || "Achieve target professional result",
      status: caseData.status || "ready_to_execute",
      inputs: caseData.inputs || {},
      dataSourcesUsed: caseData.dataSourcesUsed || ["Hamrahe Active Profile"],
      evidenceIds: caseData.evidenceIds || [],
      outputIds: caseData.outputIds || [],
      currentVersion: 1,
      nextAction: caseData.nextAction || "Review AI recommendations and execute",
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      timeline: [
        {
          id: `evt_${Date.now()}`,
          timestamp: new Date().toLocaleString(),
          actor: activeContext.name,
          actorType: "user",
          eventType: "Case Created",
          description: `Initiated case: "${caseData.title}"`,
        },
      ],
    };
    setCases((prev) => [newCase, ...prev]);
    toast.success(`New Case initiated: "${newCase.title}"`);
    return newCase;
  };

  const updateCaseStatus = (caseId: string, status: Case["status"], note?: string) => {
    setCases((prev) =>
      prev.map((c) => {
        if (c.id === caseId) {
          const newEvent = {
            id: `evt_${Date.now()}`,
            timestamp: new Date().toLocaleString(),
            actor: "AI Engine",
            actorType: "system" as const,
            eventType: "Status Changed",
            previousState: c.status,
            newState: status,
            description: note || `Case status updated to ${status.replace(/_/g, " ")}`,
          };
          return {
            ...c,
            status,
            updatedAt: new Date().toISOString().split("T")[0],
            timeline: [newEvent, ...c.timeline],
          };
        }
        return c;
      })
    );
    toast.success(`Case status updated: ${status.replace(/_/g, " ")}`);
  };

  const addCaseTimelineEvent = (caseId: string, eventData: any) => {
    setCases((prev) =>
      prev.map((c) => {
        if (c.id === caseId) {
          const newEvent = {
            id: `evt_${Date.now()}`,
            timestamp: new Date().toLocaleString(),
            actor: eventData.actor || activeContext.name,
            actorType: eventData.actorType || "user",
            eventType: eventData.eventType || "Activity Recorded",
            description: eventData.description || "Activity event added to case",
            ...eventData,
          };
          return {
            ...c,
            updatedAt: new Date().toISOString().split("T")[0],
            timeline: [newEvent, ...c.timeline],
          };
        }
        return c;
      })
    );
  };

  const saveOutputArtifact = (outputData: Partial<OutputArtifact>): OutputArtifact => {
    const newOutput: OutputArtifact = {
      id: `out_${Date.now()}`,
      contextId: activeContext.id,
      caseId: outputData.caseId,
      title: outputData.title || "Generated Output Artifact",
      type: outputData.type || "profile_revision",
      currentVersion: 1,
      content: outputData.content || "",
      versions: [
        {
          version: 1,
          createdAt: new Date().toLocaleString(),
          createdBy: activeContext.name,
          content: outputData.content || "",
          summaryOfChanges: "Initial Generation / Creation",
        },
      ],
      dataSources: outputData.dataSources || ["Personal Profile"],
      status: "draft",
      sharingPermission: "private",
      targetHamraheSection: outputData.targetHamraheSection || "AI Engine Outputs",
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };
    setOutputs((prev) => [newOutput, ...prev]);

    // If attached to a case, link it
    if (outputData.caseId) {
      setCases((prev) =>
        prev.map((c) => (c.id === outputData.caseId ? { ...c, outputIds: [...c.outputIds, newOutput.id] } : c))
      );
    }

    toast.success(`Output saved to Artifacts: "${newOutput.title}"`);
    return newOutput;
  };

  const updateOutputVersion = (outputId: string, newContent: string, summary: string) => {
    setOutputs((prev) =>
      prev.map((out) => {
        if (out.id === outputId) {
          const nextVer = out.currentVersion + 1;
          const newVerObj = {
            version: nextVer,
            createdAt: new Date().toLocaleString(),
            createdBy: activeContext.name,
            content: newContent,
            summaryOfChanges: summary || `Version ${nextVer} updated`,
          };
          return {
            ...out,
            content: newContent,
            currentVersion: nextVer,
            versions: [newVerObj, ...out.versions],
            updatedAt: new Date().toISOString().split("T")[0],
          };
        }
        return out;
      })
    );
    toast.success(`Output updated to Version ${summary ? `(${summary})` : "new draft"}`);
  };

  const addMemoryItem = (itemData: Partial<MemoryItem>) => {
    const newItem: MemoryItem = {
      id: `mem_${Date.now()}`,
      contextId: activeContext.id,
      key: itemData.key || `custom_key_${Date.now()}`,
      label: itemData.label || "Custom Memory Fact",
      value: itemData.value || "",
      category: itemData.category || "preferences",
      lastUpdated: new Date().toISOString().split("T")[0],
    };
    setMemoryItems((prev) => [newItem, ...prev]);
    toast.success(`Memory updated: "${newItem.label}"`);
  };

  const deleteMemoryItem = (id: string) => {
    setMemoryItems((prev) => prev.filter((m) => m.id !== id));
    toast.success("Memory item removed.");
  };

  const clearAllMemory = () => {
    setMemoryItems((prev) => prev.filter((m) => m.contextId !== activeContext.id));
    toast.success("All AI memory for this context has been cleared.");
  };

  const revokeConsent = (id: string) => {
    setConsentRecords((prev) =>
      prev.map((cs) => (cs.id === id ? { ...cs, status: "revoked" as const } : cs))
    );
    toast.info("Data consent permission revoked. AI limits applied.");
  };

  const toggleSaveTool = (toolId: string) => {
    setTools((prev) =>
      prev.map((t) => (t.id === toolId ? { ...t, isSaved: !t.isSaved } : t))
    );
  };

  const requestActionApproval = (
    actionName: string,
    destination: string,
    dataDisclosed: string[],
    quotaCost: number,
    onConfirm: () => void
  ) => {
    setActionPreviewModal({
      isOpen: true,
      actionName,
      destination,
      dataDisclosed,
      quotaCost,
      onConfirm: () => {
        const success = consumeQuota(quotaCost, actionName);
        if (success) {
          onConfirm();
          toast.success(`Action Executed: "${actionName}" -> Sent to ${destination}`);
        }
        closeActionPreviewModal();
      },
    });
  };

  const closeActionPreviewModal = () => {
    setActionPreviewModal((prev) => ({ ...prev, isOpen: false }));
  };

  const openContextualAssistant = (info?: PageContextInfo) => {
    if (info) setContextualPageContext(info);
    setContextualDrawerOpen(true);
  };

  // ─── WORKFLOW RUN ENGINE ────────────────────────────────────────────────────

  const startWorkflowRun = (workflowId: string, initialInputs: Record<string, any> = {}): WorkflowRun => {
    const workflow = getWorkflowById(workflowId);
    const now = new Date().toISOString();
    const missingInputKeys = workflow
      ? workflow.requiredInputs.filter((f) => !initialInputs[f.key]).map((f) => f.key)
      : [];
    const missingPermissionKeys = workflow ? workflow.requiredPermissions.map((p) => p.key) : [];

    const initialState: ExecutionState = missingInputKeys.length > 0
      ? "needs_information"
      : missingPermissionKeys.length > 0
      ? "needs_permission"
      : "ready";

    const newRun: WorkflowRun = {
      id: `run_${Date.now()}`,
      workflowId,
      contextId: activeContext.id,
      state: initialState,
      collectedInputs: initialInputs,
      missingInputKeys,
      missingPermissionKeys,
      currentStepIndex: 0,
      stepHistory: [],
      outputArtifactIds: [],
      actionIntents: [],
      startedAt: now,
      updatedAt: now,
    };

    setActiveRuns((prev) => [newRun, ...prev.filter((r) => r.workflowId !== workflowId)]);
    return newRun;
  };

  const updateRunState = (runId: string, state: ExecutionState, update: Partial<WorkflowRun> = {}) => {
    setActiveRuns((prev) =>
      prev.map((r) =>
        r.id === runId ? { ...r, state, updatedAt: new Date().toISOString(), ...update } : r
      )
    );
  };

  const updateRunInputs = (runId: string, inputs: Record<string, any>) => {
    setActiveRuns((prev) =>
      prev.map((r) => {
        if (r.id !== runId) return r;
        const merged = { ...r.collectedInputs, ...inputs };
        const workflow = getWorkflowById(r.workflowId);
        const missing = workflow ? workflow.requiredInputs.filter((f) => !merged[f.key]).map((f) => f.key) : [];
        const newState: ExecutionState = missing.length > 0 ? "needs_information" : r.missingPermissionKeys.length > 0 ? "needs_permission" : "ready";
        return { ...r, collectedInputs: merged, missingInputKeys: missing, state: newState, updatedAt: new Date().toISOString() };
      })
    );
  };

  const advanceRunStep = (runId: string) => {
    setActiveRuns((prev) =>
      prev.map((r) => {
        if (r.id !== runId) return r;
        const workflow = getWorkflowById(r.workflowId);
        const totalSteps = workflow?.steps.length ?? 0;
        const nextIndex = r.currentStepIndex + 1;
        const completedStep = {
          stepId: workflow?.steps[r.currentStepIndex]?.id ?? "unknown",
          startedAt: r.updatedAt,
          completedAt: new Date().toISOString(),
        };
        return {
          ...r,
          currentStepIndex: nextIndex,
          stepHistory: [...r.stepHistory, completedStep],
          state: nextIndex >= totalSteps ? "needs_review" : "running",
          updatedAt: new Date().toISOString(),
        };
      })
    );
  };

  const completeRun = (runId: string, outputIds: string[]) => {
    setActiveRuns((prev) =>
      prev.map((r) =>
        r.id === runId
          ? { ...r, state: "completed", outputArtifactIds: outputIds, completedAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
          : r
      )
    );
  };

  const cancelRun = (runId: string) => {
    setActiveRuns((prev) =>
      prev.map((r) => (r.id === runId ? { ...r, state: "cancelled", updatedAt: new Date().toISOString() } : r))
    );
    toast.info("Workflow cancelled.");
  };

  const failRun = (runId: string, errorCode: string, message: string) => {
    setActiveRuns((prev) =>
      prev.map((r) =>
        r.id === runId
          ? { ...r, state: "failed", error: { code: errorCode, message }, updatedAt: new Date().toISOString() }
          : r
      )
    );
  };

  const getActiveRunForWorkflow = (workflowId: string): WorkflowRun | undefined => {
    return activeRuns.find((r) => r.workflowId === workflowId && r.state !== "completed" && r.state !== "cancelled" && r.state !== "failed");
  };

  return (
    <AIEngineContext.Provider
      value={{
        activeContext,
        switchContext,
        allContexts,
        goals,
        missions,
        cases,
        outputs,
        tools,
        memoryItems,
        consentRecords,
        verificationState,
        trustSignals,
        badges,
        credentials,
        conversations,
        activeConversationId,
        setActiveConversationId,
        createGoal,
        createCase,
        updateCaseStatus,
        addCaseTimelineEvent,
        saveOutputArtifact,
        updateOutputVersion,
        addMemoryItem,
        deleteMemoryItem,
        clearAllMemory,
        revokeConsent,
        toggleSaveTool,
        consumeQuota,
        actionPreviewModal,
        requestActionApproval,
        closeActionPreviewModal,
        language,
        setLanguage,
        dir,
        contextualDrawerOpen,
        setContextualDrawerOpen,
        contextualPageContext,
        openContextualAssistant,
        hasUnsavedDraft,
        setHasUnsavedDraft,
        activeRuns,
        startWorkflowRun,
        updateRunState,
        updateRunInputs,
        advanceRunStep,
        completeRun,
        cancelRun,
        failRun,
        getActiveRunForWorkflow,
        recommendations,
      }}
    >
      <div dir={dir}>{children}</div>
    </AIEngineContext.Provider>
  );
}

export function useAIEngine() {
  const context = useContext(AIEngineContext);
  if (!context) {
    throw new Error("useAIEngine must be used within an AIEngineProvider");
  }
  return context;
}
