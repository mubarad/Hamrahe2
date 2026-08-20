// ─── AI ENGINE WORKFLOW TYPES ────────────────────────────────────────────────
// Phase 1 Foundation — typed capability and workflow contracts
// These types enforce the product object model described in the specification.
// ─────────────────────────────────────────────────────────────────────────────

export type ExecutionState =
  | "draft"
  | "needs_context"
  | "needs_information"
  | "needs_permission"
  | "ready"
  | "running"
  | "needs_review"
  | "awaiting_approval"
  | "approved"
  | "executing_action"
  | "completed"
  | "partially_completed"
  | "failed"
  | "cancelled"
  | "expired";

export type WorkflowAudience = "personal" | "organizational" | "shared";
export type WorkflowEntitlement = "free" | "pro" | "enterprise";
export type WorkflowAvailability = "published" | "draft" | "deprecated";
export type WorkflowWarningKind =
  | "sends_or_publishes"
  | "modifies_stored_data"
  | "uses_sensitive_info"
  | "affects_another_person"
  | "requires_org_authorization"
  | "requires_explicit_approval";

export type InputFieldType =
  | "text"
  | "textarea"
  | "select"
  | "number"
  | "currency"
  | "date"
  | "boolean"
  | "entity_select"
  | "multi_select";

export type ContextEntityType =
  | "person"
  | "personal_profile"
  | "organization"
  | "organization_profile"
  | "organization_membership"
  | "job"
  | "job_application"
  | "candidate"
  | "connection"
  | "conversation"
  | "message"
  | "post"
  | "article"
  | "project"
  | "freelance_opportunity"
  | "learning_item"
  | "learning_path"
  | "assessment"
  | "skill"
  | "credential"
  | "verification_evidence"
  | "badge_evidence"
  | "event"
  | "product"
  | "service"
  | "goal"
  | "case"
  | "output_artifact";

export type WorkflowEntryPoint =
  | "for_me"
  | "workflows"
  | "assistant"
  | "job_page"
  | "profile_page"
  | "company_page"
  | "messages"
  | "learning"
  | "project_page"
  | "analytics";

export interface InputField {
  key: string;
  label: string;
  description?: string;
  type: InputFieldType;
  required: boolean;
  entityType?: ContextEntityType;
  options?: string[];
  placeholder?: string;
  defaultValue?: any;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

export interface ExactDataSource {
  id: string;
  label: string;           // e.g. "Current profile → Experience"
  entity: string;          // e.g. "personal_profile"
  fields: string[];        // e.g. ["work_history", "skills", "headline"]
  purpose: string;         // e.g. "Compare against job requirements"
  permissionKey?: string;  // named permission this source requires
  canExclude: boolean;     // user can revoke this source
  currentlyAvailable: boolean;
  freshnessRequired?: string; // e.g. "within 7 days"
}

export interface WorkflowStep {
  id: string;
  order: number;
  label: string;
  description: string;
  capabilityId?: string;    // internal capability used
  isExternal: boolean;      // touches external system
  requiresApproval: boolean;
  outputProduced?: string;
}

export interface WorkflowOutputSpec {
  type: string;               // e.g. "resume", "cover_note", "strategy"
  label: string;              // user-facing name
  saveLocation: string;       // where it lands (e.g. "Outputs / Applications")
  linkedToCase: boolean;
  exportable: boolean;
  editableByUser: boolean;
}

export interface ApprovalPolicy {
  required: boolean;
  requiredFor: string[];     // which steps / actions need approval
  displayLabel: string;      // shown on card and details
  approvingRole?: string;    // org role that must approve
}

export interface PermissionRequirement {
  key: string;
  label: string;             // e.g. "Read work history from your profile"
  scope: "read" | "write" | "external_action";
  duration: string;          // e.g. "This session only"
  sensitive: boolean;
}

export interface ErrorState {
  code: string;
  label: string;
  description: string;
  recoveryAction: string;
}

// ─── WORKFLOW CONTRACT ────────────────────────────────────────────────────────
// Full definition for a user-facing workflow.
// Every published workflow must satisfy this contract.
// ─────────────────────────────────────────────────────────────────────────────

export interface WorkflowContract {
  // Identity
  id: string;
  slug: string;
  version: string;
  name: string;                    // task-language name shown to users
  outcome: string;                 // what the user gets
  whyRelevant?: string;            // shown on card when personalized
  category: string;
  categoryIcon: string;            // lucide icon name

  // Audience & context
  audience: WorkflowAudience;
  supportedIntents: string[];
  supportedContextEntityTypes: ContextEntityType[];
  entryPoints: WorkflowEntryPoint[];
  requiresOrgContext: boolean;
  requiredOrgRole?: string;

  // Inputs
  requiredInputs: InputField[];
  optionalInputs: InputField[];

  // Data
  dataSources: ExactDataSource[];

  // Permissions
  requiredPermissions: PermissionRequirement[];
  prerequisites: string[];

  // Execution
  steps: WorkflowStep[];
  warningKinds: WorkflowWarningKind[];
  approvalPolicy: ApprovalPolicy;

  // Outputs
  outputs: WorkflowOutputSpec[];
  caseCreated: boolean;
  caseBehavior: "create_new" | "update_existing" | "none";

  // Side effects
  externalSideEffects: string[];

  // Follow-up
  followUpActions: string[];

  // Errors
  errorStates: ErrorState[];

  // Entitlement & quota
  estimatedCredits: number;
  entitlementRequired: WorkflowEntitlement;

  // Prohibited actions (spec domain rules enforced at type level)
  canIssueBadge: false;
  canIssueVerification: false;
  canModifyTrustScore: false;
  canModifyProfessionalPower: false;
  canHireOrRejectCandidate: false;
  canSendWithoutApproval: false;

  // Metadata
  availabilityStatus: WorkflowAvailability;
  knownLimitations: string[];
}

// ─── EXECUTION RUN ────────────────────────────────────────────────────────────

export interface WorkflowRun {
  id: string;
  workflowId: string;
  contextId: string;
  caseId?: string;
  state: ExecutionState;
  collectedInputs: Record<string, any>;
  missingInputKeys: string[];
  missingPermissionKeys: string[];
  currentStepIndex: number;
  stepHistory: {
    stepId: string;
    startedAt: string;
    completedAt?: string;
    result?: string;
    error?: string;
  }[];
  outputArtifactIds: string[];
  actionIntents: ActionIntent[];
  startedAt: string;
  updatedAt: string;
  error?: { code: string; message: string };
  approvalRequestedAt?: string;
  approvalExpiresAt?: string;
  completedAt?: string;
}

// ─── ACTION INTENT ────────────────────────────────────────────────────────────

export interface ActionIntent {
  id: string;
  runId: string;
  action: string;                  // what will happen
  destination: string;             // where
  dataDisclosed: string[];
  affectedPersonId?: string;
  requiresOrgAuthorization: boolean;
  status: "pending" | "approved" | "rejected" | "executed" | "expired";
  createdAt: string;
  expiresAt: string;
  approvedAt?: string;
  approvedBy?: string;
}

// ─── EVIDENCE ITEM ────────────────────────────────────────────────────────────

export interface EvidenceItem {
  id: string;
  contextId: string;
  claimType: "employment" | "skill" | "credential" | "achievement" | "education" | "other";
  claim: string;
  sourceEntity: string;
  sourceFields: string[];
  supportedBy: string[];          // supporting document IDs or descriptions
  submittedFor?: "verification" | "badge" | "credential";
  status: "draft" | "prepared" | "submitted" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
}

// ─── AUDIT EVENT ─────────────────────────────────────────────────────────────

export interface AuditEvent {
  id: string;
  timestamp: string;
  contextId: string;
  runId?: string;
  caseId?: string;
  actorType: "user" | "ai" | "system";
  actor: string;
  eventKind:
    | "workflow_started"
    | "workflow_completed"
    | "workflow_failed"
    | "workflow_cancelled"
    | "permission_granted"
    | "permission_revoked"
    | "action_approved"
    | "action_rejected"
    | "action_executed"
    | "action_failed"
    | "output_created"
    | "output_version_saved"
    | "case_created"
    | "case_updated"
    | "data_read"
    | "data_written";
  description: string;
  metadata?: Record<string, any>;
}

// ─── WORKFLOW RECOMMENDATION ─────────────────────────────────────────────────

export interface WorkflowRecommendation {
  workflowId: string;
  reason: string;               // why this is recommended now
  urgency: "low" | "medium" | "high";
  relatedEntityType?: ContextEntityType;
  relatedEntityId?: string;
  relatedEntityLabel?: string;
}
