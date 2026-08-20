export type InternalRole =
  | "SuperAdmin"
  | "TrustSafetyLead"
  | "Moderator"
  | "SupportLead"
  | "RiskAnalyst"
  | "ComplianceOfficer"
  | "AIGovernanceLead"
  | "RevenueOps"
  | "SysAdmin";

export interface InternalAdminUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isInternalAdmin: boolean;
  internalRoles: InternalRole[];
  permissions: string[];
  team: string;
  clearanceLevel: "Level 1" | "Level 2" | "Level 3" | "Top Secret";
  allowedCountries: string[];
  allowedScopes: string[];
  sessionRisk: "Low" | "Medium" | "High";
  mfaVerified: boolean;
  deviceTrustLevel: "Verified Workstation" | "Registered Laptop" | "Untrusted";
  employmentStatus: "Active FTE" | "Contractor";
  accessReviewStatus: "Approved" | "Pending Review";
}

export interface PlatformKPI {
  id: string;
  name: string;
  value: string | number;
  change: string;
  trend: "up" | "down" | "neutral";
  status: "healthy" | "warning" | "critical";
  category: "Platform" | "Revenue" | "Safety" | "System" | "Marketplace";
}

export interface PriorityItem {
  id: string;
  title: string;
  domain: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  whyItMatters: string;
  owner: string;
  team: string;
  dueTime: string;
  recommendedAction: string;
  relatedCaseId?: string;
  expectedImpact: string;
  status: "Pending" | "In Progress" | "Resolved";
}

export interface CriticalAlert {
  id: string;
  category: "Security" | "Trust & Safety" | "Legal" | "Privacy" | "Revenue" | "AI Risk" | "Infrastructure";
  title: string;
  timestamp: string;
  severity: "SEV-1" | "SEV-2" | "SEV-3";
  details: string;
  affectedEntity?: string;
}

export interface DecisionItem {
  id: string;
  title: string;
  domain: string;
  requestedBy: string;
  timeSensitivity: string;
  requiresMakerChecker: boolean;
  status: "Pending Approval" | "Approved" | "Rejected";
  impactSummary: string;
}

export interface WorkQueueItem {
  id: string;
  queueType:
    | "Verification"
    | "Organization Ownership"
    | "Job Review"
    | "Content Review"
    | "Report"
    | "Chat Safety"
    | "Refund"
    | "AI Review";
  priority: "P0" | "P1" | "P2" | "P3";
  severity: "Critical" | "High" | "Medium" | "Low";
  riskScore: number;
  status: "New" | "In Review" | "Pending Decision" | "Escalated" | "Resolved";
  assignedOwner?: string;
  team: string;
  slaDue: string;
  age: string;
  relatedEntity: string;
  entityId: string;
  trigger: string;
  recommendedAction: string;
}

export interface Case360 {
  caseNumber: string;
  type: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  riskScore: number;
  status: "Triage" | "In Review" | "Decision Pending" | "Action Taken" | "Resolved";
  confidentiality: "Restricted" | "Internal" | "Highly Sensitive";
  owner: string;
  team: string;
  jurisdiction: string;
  sla: string;
  createdDate: string;
  lastUpdated: string;
  title: string;
  description: string;
  entitiesInvolved: { name: string; type: string; id: string }[];
  evidenceCount: number;
  timeline: { id: string; timestamp: string; event: string; actor: string }[];
}

export interface User360Entity {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  headline: string;
  avatar: string;
  trustScore: number;
  riskScore: number;
  verificationStatus: "Verified" | "Pending" | "Unverified" | "Suspended";
  accountStatus: "Active" | "Restricted" | "Suspended";
  accountType: "Individual" | "Company Admin" | "Startup Admin";
  country: string;
  joinedDate: string;
  activeCasesCount: number;
  reportsReceived: number;
  strikeCount: number;
}

export interface Organization360Entity {
  id: string;
  name: string;
  legalName: string;
  logo: string;
  industry: string;
  trustScore: number;
  riskScore: number;
  verificationStatus: "Verified" | "Pending" | "Unverified";
  status: "Active" | "Restricted" | "Suspended";
  type: "Company" | "Startup";
  openJobsCount: number;
  activeRecruiters: number;
  subscriptionPlan: string;
  mrr: string;
}
