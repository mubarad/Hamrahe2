export type AccountContextType = "personal" | "organization" | "startup";

export interface ActiveContext {
  id: string;
  type: AccountContextType;
  name: string;
  subtitle: string;
  avatar: string;
  role: string;
  authorizationLevel: "full_owner" | "representative" | "member";
  dataScope: string[];
  activeGoalId?: string;
  activeCaseId?: string;
  quotaRemaining: number;
  quotaTotal: number;
}

export interface Goal {
  id: string;
  contextId: string;
  title: string;
  goalType: string;
  targetRole: string;
  targetIndustry?: string;
  targetOrganization?: string;
  timeframe: string;
  priority: "high" | "medium" | "low";
  currentStage: string;
  evidenceCoverage: number; // 0-100
  nextMilestone: string;
  milestones: { id: string; title: string; completed: boolean; dueDate: string }[];
  missions: string[]; // Mission IDs
  relatedCaseIds: string[];
  relatedOutputIds: string[];
  status: "draft" | "active" | "paused" | "completed" | "at_risk";
  createdAt: string;
}

export interface Mission {
  id: string;
  goalId: string;
  title: string;
  reason: string;
  actionType: "profile" | "evidence" | "learning" | "job" | "networking" | "hiring" | "b2b";
  difficulty: "easy" | "medium" | "challenging";
  expectedImpact: string;
  estimatedEffort: string;
  dueDate: string;
  evidenceRequired: string;
  status: "pending" | "in_progress" | "completed" | "needs_review";
  targetRoute?: string;
}

export interface CaseTimelineEvent {
  id: string;
  timestamp: string;
  actor: string;
  actorType: "user" | "ai" | "system";
  eventType: string;
  previousState?: string;
  newState?: string;
  description: string;
  dataSource?: string;
  relatedOutputId?: string;
  approvalRequired?: boolean;
  approvalStatus?: "pending" | "approved" | "rejected";
  auditDetails?: string;
}

export interface Case {
  id: string;
  contextId: string;
  objective: string;
  title: string;
  status:
    | "not_started"
    | "information_required"
    | "processing"
    | "draft_ready"
    | "approval_required"
    | "ready_to_execute"
    | "executed"
    | "following_up"
    | "completed"
    | "paused"
    | "failed"
    | "review_required"
    | "disputed";
  inputs: Record<string, any>;
  dataSourcesUsed: string[];
  evidenceIds: string[];
  outputIds: string[];
  currentVersion: number;
  timeline: CaseTimelineEvent[];
  dueDate?: string;
  nextAction: string;
  createdAt: string;
  updatedAt: string;
}

export interface OutputVersion {
  version: number;
  createdAt: string;
  createdBy: string;
  content: string;
  summaryOfChanges: string;
}

export interface OutputArtifact {
  id: string;
  contextId: string;
  caseId?: string;
  title: string;
  type:
    | "resume"
    | "cover_letter"
    | "profile_revision"
    | "growth_plan"
    | "interview_plan"
    | "proposal"
    | "content_draft"
    | "job_description"
    | "hiring_criteria"
    | "candidate_evaluation"
    | "b2b_brief"
    | "evidence_package"
    | "analytics_report";
  currentVersion: number;
  content: string;
  versions: OutputVersion[];
  dataSources: string[];
  status: "draft" | "review" | "approved" | "shared" | "archived";
  sharingPermission: "private" | "selective" | "organization" | "public";
  targetHamraheSection?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ToolDefinition {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  category:
    | "Profile & Resume"
    | "Jobs & Career"
    | "Professional Growth"
    | "Skills & Evidence"
    | "Verification & Trust"
    | "Badges & Credentials"
    | "Networking & Intro"
    | "Messaging & Follow-up"
    | "Content & Brand"
    | "Projects & Freelancing"
    | "Learning & Assessment"
    | "Interview Prep"
    | "Meetings & Collaboration"
    | "Company Intelligence"
    | "Hiring & Recruiting"
    | "Talent Management"
    | "B2B & Sales"
    | "Market Research"
    | "Events & Groups"
    | "Analytics & Power"
    | "Search & Discovery"
    | "Productivity & Planning"
    | "Privacy & Data Control";
  supportedContexts: AccountContextType[];
  requiredInputs: string[];
  optionalInputs?: string[];
  authorizedDataSources: string[];
  outputType: string;
  estimatedQuota: number;
  sensitivityLevel: "low" | "medium" | "high";
  approvalRequired: boolean;
  externalActionPossible: boolean;
  isSaved?: boolean;
  isRecent?: boolean;
  planRequired: "Free" | "Pro" | "Enterprise";
  relatedRoute?: string;
}

export interface MemoryItem {
  id: string;
  contextId: string;
  key: string;
  label: string;
  value: string;
  category: "career_goal" | "preferences" | "compensation" | "contacts" | "companies" | "learning";
  lastUpdated: string;
  isTemporary?: boolean;
}

export interface ConsentRecord {
  id: string;
  contextId: string;
  dataSource: string;
  purpose: string;
  authorizedToolOrService: string;
  relatedCaseId?: string;
  recipient?: string;
  expirationDate: string;
  revocable: boolean;
  status: "active" | "expired" | "revoked";
  impactOnRevocation: string;
}

export interface QuotaTransaction {
  id: string;
  timestamp: string;
  toolName: string;
  contextName: string;
  tokensUsed: number;
  costInCredits: number;
  status: "success" | "simulated" | "failed";
}

export interface VerificationState {
  identityVerified: boolean;
  identityDocType?: string;
  identityVerifiedAt?: string;
  organizationVerified: boolean;
  organizationTaxId?: string;
  representativeVerified: boolean;
  representativeRole?: string;
  evidenceStatus: { name: string; verified: boolean; date?: string; note?: string }[];
  reviewHistory: { id: string; date: string; status: string; note: string }[];
}

export interface TrustSignal {
  id: string;
  name: string;
  score: number; // 0 - 100
  weight: number;
  evidenceSource: string;
  status: "verified" | "pending_proof" | "contradiction" | "expired";
  impact: string;
}

export interface Badge {
  id: string;
  title: string;
  badgeType: "personal" | "organization";
  category: string;
  iconName: string;
  prerequisites: string[];
  requiredEvidence: string[];
  eligibilityStatus: "eligible" | "in_progress" | "locked" | "awarded";
  awardedAt?: string;
  expiresAt?: string;
  premiumRewardDays?: number;
  visibility: "public" | "connections_only" | "hidden";
}

export interface Credential {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expirationDate?: string;
  verificationMethod: string;
  status: "active" | "expired" | "pending";
  visibility: "public" | "private";
}

export interface ConversationMessage {
  id: string;
  sender: "user" | "ai" | "system";
  timestamp: string;
  content: string;
  structuredBlocks?: {
    type: "explanation" | "recommendation" | "evidence" | "risk" | "draft" | "preview" | "approval_request" | "sources";
    title?: string;
    body: string;
    metadata?: any;
  }[];
  dataSourcesUsed?: string[];
  actionPreview?: {
    actionName: string;
    destination: string;
    dataDisclosed: string[];
    quotaCost: number;
    requiresConfirmation: boolean;
  };
}

export interface Conversation {
  id: string;
  contextId: string;
  title: string;
  isPinned?: boolean;
  isArchived?: boolean;
  isTemporary?: boolean;
  updatedAt: string;
  messages: ConversationMessage[];
  activeCaseId?: string;
}

// -------------------------------------------------------------
// MOCK DATA INSTANCES
// -------------------------------------------------------------

export const mockContexts: ActiveContext[] = [
  {
    id: "ctx_personal",
    type: "personal",
    name: "Sara Ahmadi",
    subtitle: "Senior Product Designer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    role: "Individual Owner",
    authorizationLevel: "full_owner",
    dataScope: ["Personal Profile", "Work History", "Skill Assessments", "Applications", "Messages"],
    activeGoalId: "goal_01",
    activeCaseId: "case_snapp_app",
    quotaRemaining: 840,
    quotaTotal: 1000,
  },
  {
    id: "ctx_org_snapp",
    type: "organization",
    name: "Snapp SuperApp",
    subtitle: "Enterprise Organization Account",
    avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200",
    role: "Head of Product / Org Admin",
    authorizationLevel: "representative",
    dataScope: ["Company Profile", "Job Listings", "Applicant Pipeline", "B2B Leads", "Company Analytics"],
    activeGoalId: "goal_snapp_hiring",
    activeCaseId: "case_snapp_hiring_designer",
    quotaRemaining: 4200,
    quotaTotal: 5000,
  },
  {
    id: "ctx_startup_nextgen",
    type: "startup",
    name: "NextGen AI Labs",
    subtitle: "Early-Stage Startup Account",
    avatar: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=200",
    role: "Co-founder & CEO",
    authorizationLevel: "full_owner",
    dataScope: ["Startup Profile", "Investor Pitch", "Founder Claims", "B2B Prospects"],
    activeGoalId: "goal_nextgen_b2b",
    activeCaseId: "case_nextgen_pitch",
    quotaRemaining: 1850,
    quotaTotal: 2500,
  },
];

export const mockGoals: Goal[] = [
  {
    id: "goal_01",
    contextId: "ctx_personal",
    title: "Become a Product Lead at a Top Tech Firm",
    goalType: "Career Advancement",
    targetRole: "Product Lead / Lead Product Designer",
    targetIndustry: "Technology / Fintech",
    targetOrganization: "Snapp or Café Bazaar",
    timeframe: "Q3 2026",
    priority: "high",
    currentStage: "Interview & Application Phase",
    evidenceCoverage: 88,
    nextMilestone: "Complete Snapp Senior Design System Case Review",
    milestones: [
      { id: "m1", title: "Update Profile & Verified Portfolio", completed: true, dueDate: "2026-06-15" },
      { id: "m2", title: "Obtain Verified Network Badge", completed: true, dueDate: "2026-07-01" },
      { id: "m3", title: "Apply for Senior/Lead Designer at Snapp", completed: true, dueDate: "2026-07-15" },
      { id: "m4", title: "Prepare Design Leadership Case & System Critique", completed: false, dueDate: "2026-08-10" },
      { id: "m5", title: "Final Offer Negotiation & Growth Alignment", completed: false, dueDate: "2026-09-01" },
    ],
    missions: ["ms_01", "ms_02", "ms_03"],
    relatedCaseIds: ["case_snapp_app", "case_profile_improvement"],
    relatedOutputIds: ["out_resume_tailored", "out_snapp_cover"],
    status: "active",
    createdAt: "2026-05-10",
  },
  {
    id: "goal_snapp_hiring",
    contextId: "ctx_org_snapp",
    title: "Hire 3 Senior Product Designers with Verified Track Records",
    goalType: "Talent Acquisition",
    targetRole: "Senior Product Designer",
    timeframe: "Q3 2026",
    priority: "high",
    currentStage: "Candidate Shortlisting & Evidence Check",
    evidenceCoverage: 92,
    nextMilestone: "Conduct Technical Case Review with Top 5 Shortlisted Applicants",
    milestones: [
      { id: "sm1", title: "Publish Verified Job Posting with Clear Criteria", completed: true, dueDate: "2026-06-01" },
      { id: "sm2", title: "Source Candidates with Verified Experience", completed: true, dueDate: "2026-07-10" },
      { id: "sm3", title: "Run AI Explainable Match & Shortlist", completed: true, dueDate: "2026-07-20" },
      { id: "sm4", title: "Conduct Technical Interviews", completed: false, dueDate: "2026-08-15" },
    ],
    missions: ["ms_snapp_01"],
    relatedCaseIds: ["case_snapp_hiring_designer"],
    relatedOutputIds: ["out_hiring_criteria"],
    status: "active",
    createdAt: "2026-06-01",
  },
];

export const mockMissions: Mission[] = [
  {
    id: "ms_01",
    goalId: "goal_01",
    title: "Verify Digikala Design Lead Experience",
    reason: "Verifying senior experience increases match score confidence by 18%",
    actionType: "verification",
    difficulty: "easy",
    expectedImpact: "+18% Evidence Credibility",
    estimatedEffort: "5 mins",
    dueDate: "2026-08-05",
    evidenceRequired: "Employment Reference or Verification Document",
    status: "in_progress",
    targetRoute: "/ai-engine/verification",
  },
  {
    id: "ms_02",
    goalId: "goal_01",
    title: "Prepare Snapp Design System Interview Answers",
    reason: "Snapp values large-scale multi-app architecture case studies",
    actionType: "job",
    difficulty: "medium",
    expectedImpact: "High Readiness for Technical Round",
    estimatedEffort: "30 mins",
    dueDate: "2026-08-08",
    evidenceRequired: "Completed Snapp Interview Brief Output",
    status: "pending",
    targetRoute: "/ai-engine/assistant",
  },
  {
    id: "ms_03",
    goalId: "goal_01",
    title: "Complete Advanced UX Assessment",
    reason: "Validates Interaction Design capability for Senior Product Role",
    actionType: "learning",
    difficulty: "challenging",
    expectedImpact: "Official Credential Badge",
    estimatedEffort: "20 mins",
    dueDate: "2026-08-12",
    evidenceRequired: "Assessment Passing Score > 85%",
    status: "pending",
    targetRoute: "/learning",
  },
  {
    id: "ms_snapp_01",
    goalId: "goal_snapp_hiring",
    title: "Review Verified Shortlist for Senior Product Designer",
    reason: "3 top candidates passed hard verification filters",
    actionType: "hiring",
    difficulty: "medium",
    expectedImpact: "Accelerates Time-to-Hire by 4 days",
    estimatedEffort: "15 mins",
    dueDate: "2026-08-04",
    evidenceRequired: "Human Approval on Interview Invitations",
    status: "in_progress",
    targetRoute: "/ai-engine/cases",
  },
];

export const mockCases: Case[] = [
  {
    id: "case_snapp_app",
    contextId: "ctx_personal",
    title: "Application for Senior Product Designer at Snapp",
    objective: "Submit a verified, tailored application and pass technical interview",
    status: "approval_required",
    inputs: { jobTitle: "Senior Product Designer", company: "Snapp", location: "Tehran (Hybrid)" },
    dataSourcesUsed: ["Personal Profile", "Digikala Experience Evidence", "Tailored Resume V2", "Cover Note V1"],
    evidenceIds: ["ev_digikala_01", "ev_mbti_cert"],
    outputIds: ["out_resume_tailored", "out_snapp_cover"],
    currentVersion: 3,
    dueDate: "2026-08-10",
    nextAction: "Review and approve submission of tailored application package to Snapp Recruiter",
    createdAt: "2026-07-20",
    updatedAt: "2026-08-01",
    timeline: [
      {
        id: "evt_1",
        timestamp: "2026-07-20 10:30",
        actor: "Sara Ahmadi",
        actorType: "user",
        eventType: "Case Created",
        description: "Initiated application case from Job Details page",
        dataSource: "Hamrahe Jobs",
      },
      {
        id: "evt_2",
        timestamp: "2026-07-20 10:32",
        actor: "AI Engine",
        actorType: "ai",
        eventType: "Fit Analysis",
        description: "Analyzed Snapp Senior Product Designer requirements: 92% Skill Match, 88% Experience Fit",
        dataSource: "Personal Experience Data",
      },
      {
        id: "evt_3",
        timestamp: "2026-07-22 14:15",
        actor: "AI Engine",
        actorType: "ai",
        eventType: "Artifact Generated",
        relatedOutputId: "out_resume_tailored",
        description: "Generated V2 Tailored Resume emphasizing Snapp's scale & design system needs",
      },
      {
        id: "evt_4",
        timestamp: "2026-07-25 11:00",
        actor: "AI Engine",
        actorType: "ai",
        eventType: "Artifact Generated",
        relatedOutputId: "out_snapp_cover",
        description: "Drafted tailored Cover Note highlighting 4 years of Digikala multi-app experience",
      },
      {
        id: "evt_5",
        timestamp: "2026-08-01 09:00",
        actor: "AI Engine",
        actorType: "ai",
        eventType: "Approval Request",
        approvalRequired: true,
        approvalStatus: "pending",
        description: "Prepared execution preview. Human approval required before sending application package to Snapp.",
      },
    ],
  },
  {
    id: "case_profile_improvement",
    contextId: "ctx_personal",
    title: "Sara Ahmadi Profile & Credibility Optimization",
    objective: "Optimize headline, about section, and experience claims with verified evidence",
    status: "completed",
    inputs: { targetHeadline: "Senior Product Designer | Design Systems & Complex Web Apps" },
    dataSourcesUsed: ["Personal Profile", "Verified Claims Engine"],
    evidenceIds: ["ev_digikala_01"],
    outputIds: ["out_profile_rewrite"],
    currentVersion: 2,
    nextAction: "Case completed successfully. Headline updated.",
    createdAt: "2026-06-10",
    updatedAt: "2026-06-15",
    timeline: [
      {
        id: "evt_p1",
        timestamp: "2026-06-10 09:00",
        actor: "Sara Ahmadi",
        actorType: "user",
        eventType: "Case Created",
        description: "Started profile enhancement case",
      },
      {
        id: "evt_p2",
        timestamp: "2026-06-15 16:20",
        actor: "Sara Ahmadi",
        actorType: "user",
        eventType: "Action Approved",
        description: "Approved new profile headline and About text applied to primary Hamrahe profile",
      },
    ],
  },
  {
    id: "case_snapp_hiring_designer",
    contextId: "ctx_org_snapp",
    title: "Snapp Senior Product Designer Recruitment Funnel",
    objective: "Evaluate 48 applicants, apply hard requirements, and interview top 3 candidates",
    status: "draft_ready",
    inputs: { jobTitle: "Senior Product Designer", requiredYears: 4, location: "Tehran" },
    dataSourcesUsed: ["Snapp Applicant Pool", "Verified Identity DB", "Hamrahe Match Engine"],
    evidenceIds: [],
    outputIds: ["out_hiring_criteria"],
    currentVersion: 1,
    dueDate: "2026-08-20",
    nextAction: "Send technical assessment invitation to 3 shortlisted verified applicants",
    createdAt: "2026-07-15",
    updatedAt: "2026-08-01",
    timeline: [
      {
        id: "evt_s1",
        timestamp: "2026-07-15 10:00",
        actor: "Snapp HR Team",
        actorType: "user",
        eventType: "Case Created",
        description: "Opened recruitment funnel case for Senior Product Designer",
      },
      {
        id: "evt_s2",
        timestamp: "2026-07-28 15:30",
        actor: "AI Engine",
        actorType: "ai",
        eventType: "Applicant Match Analysis",
        description: "Analyzed 48 applicants against verified criteria. 3 candidates achieved >90% match with 100% verified experience.",
      },
    ],
  },
];

export const mockOutputs: OutputArtifact[] = [
  {
    id: "out_resume_tailored",
    contextId: "ctx_personal",
    caseId: "case_snapp_app",
    title: "Sara Ahmadi — Tailored Resume for Snapp",
    type: "resume",
    currentVersion: 2,
    content: `SARA AHMADI
Senior Product Designer | Tehran, Iran
Email: sara.ahmadi@example.com | Hamrahe Profile: /in/sara-ahmadi

SUMMARY
Product Designer with 6+ years of experience leading design systems, complex multi-platform web applications, and e-commerce checkout flows. Proven track record at Digikala scaling mobile & desktop UI components.

SELECTED EXPERIENCE
Senior Product Designer — Digikala (2022 - Present)
- Led design system overhaul used by 45+ frontend engineers, improving design-to-code efficiency by 30%.
- Redesigned checkout funnel, reducing drop-off by 14% across mobile and web.

Product Designer — SnappPay (2020 - 2022)
- Designed merchant portal and BNPL checkout widgets for over 2,000 active merchants.

SKILLS & EVIDENCE
- Design Systems, Figma, React/TypeScript comprehension, User Research, Usability Testing
- Verified Digikala Employment Evidence (ID: EV-DIGI-992)
- Advanced UX Design Assessment Credential (Score: 94%)`,
    versions: [
      {
        version: 1,
        createdAt: "2026-07-21 14:00",
        createdBy: "AI Engine",
        content: "Initial draft generated from base profile.",
        summaryOfChanges: "Initial AI Generation",
      },
      {
        version: 2,
        createdAt: "2026-07-22 14:15",
        createdBy: "Sara Ahmadi & AI",
        content: "SARA AHMADI\nSenior Product Designer...",
        summaryOfChanges: "Added Digikala Design System impact metrics and verified credentials.",
      },
    ],
    dataSources: ["Personal Profile", "Digikala Employment Verification", "Learning Assessment Credentials"],
    status: "draft",
    sharingPermission: "private",
    targetHamraheSection: "Jobs Application / Snapp",
    createdAt: "2026-07-21",
    updatedAt: "2026-07-22",
  },
  {
    id: "out_snapp_cover",
    contextId: "ctx_personal",
    caseId: "case_snapp_app",
    title: "Cover Note — Senior Product Designer at Snapp",
    type: "cover_letter",
    currentVersion: 1,
    content: `Dear Snapp Product Leadership Team,

I am writing to express my strong enthusiasm for the Senior Product Designer position at Snapp. Having followed Snapp's multi-app ecosystem growth, I am eager to bring my 6+ years of experience in high-scale design systems and consumer checkout flows to your design organization.

During my time as Senior Product Designer at Digikala, I led the core design system utilized across desktop and mobile products. My work directly impacted user retention and reduced checkout friction for millions of Iranian users.

I look forward to discussing how my experience in building resilient design systems aligns with Snapp's roadmap.

Best regards,
Sara Ahmadi`,
    versions: [
      {
        version: 1,
        createdAt: "2026-07-25 11:00",
        createdBy: "AI Engine",
        content: "Dear Snapp Product Leadership Team...",
        summaryOfChanges: "Initial tailored draft",
      },
    ],
    dataSources: ["Personal Profile", "Snapp Job Description"],
    status: "draft",
    sharingPermission: "private",
    targetHamraheSection: "Jobs Application / Snapp",
    createdAt: "2026-07-25",
    updatedAt: "2026-07-25",
  },
  {
    id: "out_profile_rewrite",
    contextId: "ctx_personal",
    caseId: "case_profile_improvement",
    title: "Optimized Profile Headline & About Section",
    type: "profile_revision",
    currentVersion: 2,
    content: `HEADLINE:
Senior Product Designer @ Digikala | Design Systems, Fintech & Multi-Platform Web Apps | Verified Pro

ABOUT SECTION:
Product Designer with 6+ years of experience crafting intuitive interfaces for Iran's leading tech platforms. Specialized in design systems, checkout flow optimization, and data-dense web apps. Passionate about Iranian tech community growth and mentoring junior designers.`,
    versions: [
      {
        version: 1,
        createdAt: "2026-06-11 10:00",
        createdBy: "AI Engine",
        content: "Draft headline...",
        summaryOfChanges: "First draft",
      },
      {
        version: 2,
        createdAt: "2026-06-15 16:20",
        createdBy: "Sara Ahmadi",
        content: "Applied to profile.",
        summaryOfChanges: "Finalized and applied to Hamrahe Profile",
      },
    ],
    dataSources: ["Personal Profile Data", "Hamrahe Verified Network"],
    status: "approved",
    sharingPermission: "public",
    targetHamraheSection: "Personal Profile",
    createdAt: "2026-06-11",
    updatedAt: "2026-06-15",
  },
  {
    id: "out_hiring_criteria",
    contextId: "ctx_org_snapp",
    caseId: "case_snapp_hiring_designer",
    title: "Snapp Senior Product Designer Evaluation Matrix",
    type: "hiring_criteria",
    currentVersion: 1,
    content: `SNAPP RECRUITMENT EVALUATION MATRIX
Target Role: Senior Product Designer
Hard Requirements:
1. 4+ years in digital product design (Verified experience preferred)
2. Demonstrated mastery of Figma design systems and component libraries
3. Experience in Iranian e-commerce or fintech ecosystem

Evaluation Scoring Weight:
- Design System Architecture: 30%
- Complex Problem Solving & Case Study: 30%
- Verified Employment Claims: 20%
- Cross-functional Collaboration & Communication: 20%`,
    versions: [
      {
        version: 1,
        createdAt: "2026-07-16 11:00",
        createdBy: "AI Engine",
        content: "Initial Matrix",
        summaryOfChanges: "Created matrix",
      },
    ],
    dataSources: ["Snapp HR Framework", "Hamrahe Skill Standards"],
    status: "approved",
    sharingPermission: "organization",
    targetHamraheSection: "Company Job Listing",
    createdAt: "2026-07-16",
    updatedAt: "2026-07-16",
  },
];

export const mockMemoryItems: MemoryItem[] = [
  {
    id: "mem_01",
    contextId: "ctx_personal",
    key: "target_roles",
    label: "Target Roles",
    value: "Product Lead, Lead Product Designer, Senior Product Designer",
    category: "career_goal",
    lastUpdated: "2026-07-28",
  },
  {
    id: "mem_02",
    contextId: "ctx_personal",
    key: "min_compensation",
    label: "Private Minimum Compensation Floor",
    value: "65,000,000 IRR / month (Private & Confidential)",
    category: "compensation",
    lastUpdated: "2026-07-15",
  },
  {
    id: "mem_03",
    contextId: "ctx_personal",
    key: "preferred_companies",
    label: "Target Tech Organizations",
    value: "Snapp, Digikala, Café Bazaar, Divar, Tapsi",
    category: "companies",
    lastUpdated: "2026-06-20",
  },
  {
    id: "mem_04",
    contextId: "ctx_personal",
    key: "communication_tone",
    label: "Communication Tone Preference",
    value: "Professional, confident, structured, concise",
    category: "preferences",
    lastUpdated: "2026-05-10",
  },
];

export const mockConsentRecords: ConsentRecord[] = [
  {
    id: "cs_01",
    contextId: "ctx_personal",
    dataSource: "Personal Work History & Verified Digikala Claim",
    purpose: "Match Score Calculation & Application Package Creation for Snapp Job",
    authorizedToolOrService: "Job Fit & Tailored Resume Builder",
    relatedCaseId: "case_snapp_app",
    recipient: "Snapp Recruitment Team (Only upon user submission)",
    expirationDate: "2026-09-01",
    revocable: true,
    status: "active",
    impactOnRevocation: "Revoking this permission will prevent AI Engine from tailoring resumes or sharing verified experience claims with recruiters.",
  },
  {
    id: "cs_02",
    contextId: "ctx_personal",
    dataSource: "Hamrahe Messages with Mentors & Peers",
    purpose: "Extracting follow-up commitments and action items",
    authorizedToolOrService: "Message Commitment Extractor",
    expirationDate: "2026-12-31",
    revocable: true,
    status: "active",
    impactOnRevocation: "AI Engine will no longer analyze messages for commitments or draft follow-up replies.",
  },
];

export const mockVerificationState: VerificationState = {
  identityVerified: true,
  identityDocType: "National ID (Iran / Code Melli)",
  identityVerifiedAt: "2026-01-15",
  organizationVerified: false,
  representativeVerified: true,
  representativeRole: "Senior Lead Authorized Representative",
  evidenceStatus: [
    { name: "Digikala Senior Product Designer Experience", verified: true, date: "2026-02-10", note: "Verified via Official HR Confirmation & Email Domain" },
    { name: "SnappPay Product Designer Experience", verified: true, date: "2026-03-01", note: "Verified via Peer Endorsement & Contract Document" },
    { name: "Sharif University Bachelor Degree in Design", verified: false, note: "Document pending official administrative verification" },
  ],
  reviewHistory: [
    { id: "rh_1", date: "2026-01-15", status: "Approved", note: "Identity verification successfully completed via National Registry API." },
    { id: "rh_2", date: "2026-02-10", status: "Approved", note: "Employment claim at Digikala verified with HR domain confirmation." },
  ],
};

export const mockTrustSignals: TrustSignal[] = [
  {
    id: "ts_1",
    name: "Verified National Identity",
    score: 100,
    weight: 25,
    evidenceSource: "Official National Registry",
    status: "verified",
    impact: "+25 Points to Identity Trust",
  },
  {
    id: "ts_2",
    name: "Verified Digikala Employment History",
    score: 95,
    weight: 35,
    evidenceSource: "HR Domain Confirmation & Verified Colleague Co-sign",
    status: "verified",
    impact: "+35 Points to Experience Credibility",
  },
  {
    id: "ts_3",
    name: "Platform Responsiveness Rate (>95%)",
    score: 90,
    weight: 20,
    evidenceSource: "Hamrahe Messaging Event Log",
    status: "verified",
    impact: "+20 Points to Professional Reliability",
  },
  {
    id: "ts_4",
    name: "Peer Endorsement Network Consistency",
    score: 85,
    weight: 20,
    evidenceSource: "12 Verified Network Recommendations",
    status: "verified",
    impact: "+17 Points to Network Credibility",
  },
];

export const mockBadges: Badge[] = [
  {
    id: "bdg_network_top",
    title: "Verified Network Top Voice (Design)",
    badgeType: "personal",
    category: "Design & UX",
    iconName: "Sparkles",
    prerequisites: ["Identity Verification", "3+ Verified Employment Claims", "Network Score > 80"],
    requiredEvidence: ["Verified Experience Proof", "High Engagement on Professional Posts"],
    eligibilityStatus: "awarded",
    awardedAt: "2026-05-01",
    expiresAt: "2026-11-01",
    premiumRewardDays: 30,
    visibility: "public",
  },
  {
    id: "bdg_product_leadership",
    title: "Verified Design Systems Specialist",
    badgeType: "personal",
    category: "Product & Engineering",
    iconName: "ShieldCheck",
    prerequisites: ["Passed Advanced UX Assessment (>90%)", "2 Verified Design System Projects"],
    requiredEvidence: ["Assessment Credential", "Design System Case Study Artifact"],
    eligibilityStatus: "in_progress",
    visibility: "public",
  },
  {
    id: "bdg_responsible_employer",
    title: "Responsible Employer & Transparent Hiring",
    badgeType: "organization",
    category: "Organization & Workplace",
    iconName: "Building2",
    prerequisites: ["Organization Identity Verification", "Fast Response Time to Applicants (>90%)"],
    requiredEvidence: ["Verified Tax ID", "Public Salary Range Disclosure"],
    eligibilityStatus: "eligible",
    visibility: "public",
  },
];

export const mockCredentials: Credential[] = [
  {
    id: "crd_01",
    title: "Advanced UX Design & Systems Architecture",
    issuer: "Hamrahe Learning Assessment Center",
    issueDate: "2026-04-12",
    verificationMethod: "Proctored Skill Assessment (Score 94%)",
    status: "active",
    visibility: "public",
  },
  {
    id: "crd_02",
    title: "Scrum Product Owner Credential",
    issuer: "Agile Iran Professional Institute",
    issueDate: "2025-11-10",
    expirationDate: "2027-11-10",
    verificationMethod: "Verified Certificate Document #AG-8831",
    status: "active",
    visibility: "public",
  },
];

export const mockConversations: Conversation[] = [
  {
    id: "conv_01",
    contextId: "ctx_personal",
    title: "Snapp Application & Interview Prep",
    isPinned: true,
    updatedAt: "2026-08-01 11:20",
    activeCaseId: "case_snapp_app",
    messages: [
      {
        id: "m_1",
        sender: "user",
        timestamp: "2026-08-01 11:15",
        content: "Can you analyze my current application package for Snapp's Senior Product Designer role and highlight what missing evidence I should address before submitting?",
      },
      {
        id: "m_2",
        sender: "ai",
        timestamp: "2026-08-01 11:16",
        content: "I have analyzed your application package against Snapp's Senior Product Designer criteria using your authorized personal experience records.",
        dataSourcesUsed: ["Personal Profile", "Digikala Employment Verification", "Snapp Job Description"],
        structuredBlocks: [
          {
            type: "explanation",
            title: "Overall Match Confidence: 92%",
            body: "Your profile strongly matches Snapp's requirement for design system governance and large-scale consumer apps based on your 4 years at Digikala.",
          },
          {
            type: "evidence",
            title: "Verified Evidence Strengths",
            body: "• Digikala Employment verified via official HR domain\n• UX Assessment Credential verified (Score 94%)\n• 12 Verified Network Recommendations",
          },
          {
            type: "risk",
            title: "Missing Evidence Gaps",
            body: "1. Snapp emphasizes mobile BNPL / payment checkout experience. You have SnappPay experience listed, but it lacks verified co-worker endorsements.\n2. No public design system portfolio link attached yet.",
          },
          {
            type: "recommendation",
            title: "Recommended Action Plan",
            body: "I recommend updating Output Artifact 'Sara Ahmadi — Tailored Resume for Snapp' with your design system portfolio case study link, then submitting for human approval.",
          },
        ],
        actionPreview: {
          actionName: "Update Resume Artifact & Request Submission Approval",
          destination: "Case: Application for Senior Product Designer at Snapp",
          dataDisclosed: ["Digikala Experience Proof", "Resume V2"],
          quotaCost: 15,
          requiresConfirmation: true,
        },
      },
    ],
  },
  {
    id: "conv_02",
    contextId: "ctx_personal",
    title: "Profile Credibility & Headline Strategy",
    isPinned: false,
    updatedAt: "2026-07-28 14:00",
    messages: [
      {
        id: "m_c2_1",
        sender: "user",
        timestamp: "2026-07-28 13:55",
        content: "How do I rewrite my About section to attract top Iranian fintech leadership roles?",
      },
      {
        id: "m_c2_2",
        sender: "ai",
        timestamp: "2026-07-28 14:00",
        content: "Here is a structured profile revision based on top-performing Iranian tech executive profiles.",
        structuredBlocks: [
          {
            type: "draft",
            title: "Proposed About Text",
            body: "Senior Product Designer specializing in multi-app design systems, checkout flow optimization, and high-scale consumer interfaces. 6+ years at Digikala & SnappPay.",
          },
        ],
      },
    ],
  },
];

// -------------------------------------------------------------
// 180+ DISTINCT TOOL DEFINITIONS
// -------------------------------------------------------------

function generate180Tools(): ToolDefinition[] {
  const tools: ToolDefinition[] = [];

  const rawToolData: Array<{
    id: string;
    name: string;
    desc: string;
    cat: ToolDefinition["category"];
    contexts: AccountContextType[];
    inputs: string[];
    out: string;
    quota: number;
    sensitivity: "low" | "medium" | "high";
    approval: boolean;
    extAction: boolean;
    plan: "Free" | "Pro" | "Enterprise";
    saved?: boolean;
    recent?: boolean;
  }> = [
    // 1. Profile & Resume (10 tools)
    { id: "tool_profile_headline", name: "Headline Optimizer", desc: "Rewrite profile headline based on verified target roles & Iranian industry benchmarks.", cat: "Profile & Resume", contexts: ["personal"], inputs: ["Target Role", "Current Headline"], out: "Optimized Headline Text", quota: 10, sensitivity: "low", approval: true, extAction: false, plan: "Free", saved: true, recent: true },
    { id: "tool_about_rewrite", name: "About Section Architect", desc: "Craft compelling executive summary highlighting verified achievements.", cat: "Profile & Resume", contexts: ["personal"], inputs: ["Experience History"], out: "Structured About Text", quota: 12, sensitivity: "low", approval: true, extAction: false, plan: "Free", saved: true },
    { id: "tool_claim_checker", name: "Unsupported Claim Detector", desc: "Identify profile claims that lack verified proof or evidence documentation.", cat: "Profile & Resume", contexts: ["personal"], inputs: ["Profile Experience List"], out: "Evidence Gap Report", quota: 15, sensitivity: "medium", approval: false, extAction: false, plan: "Free" },
    { id: "tool_resume_tailorship", name: "Targeted Resume Generator", desc: "Build tailored resume matching specific company job descriptions.", cat: "Profile & Resume", contexts: ["personal"], inputs: ["Job Listing URL", "Profile Data"], out: "Output Resume Artifact", quota: 25, sensitivity: "medium", approval: true, extAction: false, plan: "Pro", saved: true, recent: true },
    { id: "tool_portfolio_curator", name: "Portfolio Artifact Selector", desc: "Recommend which project case studies to highlight for target opportunities.", cat: "Profile & Resume", contexts: ["personal"], inputs: ["Project List"], out: "Recommended Portfolio Ranking", quota: 15, sensitivity: "low", approval: false, extAction: false, plan: "Free" },
    { id: "tool_profile_completeness", name: "Profile Power Evaluator", desc: "Analyze overall profile strength and missing credibility signals.", cat: "Profile & Resume", contexts: ["personal"], inputs: ["Profile Data"], out: "Power Score Breakdown", quota: 10, sensitivity: "low", approval: false, extAction: false, plan: "Free" },
    { id: "tool_career_narrative", name: "Career Transition Story Builder", desc: "Synthesize past diverse experience into a unified narrative for career pivot.", cat: "Profile & Resume", contexts: ["personal"], inputs: ["Past Roles", "Target Field"], out: "Transition Narrative Summary", quota: 20, sensitivity: "low", approval: true, extAction: false, plan: "Pro" },
    { id: "tool_experience_bullet", name: "Action Verb Experience Enhancer", desc: "Rewrite work experience bullet points to focus on measurable outcomes.", cat: "Profile & Resume", contexts: ["personal"], inputs: ["Raw Job Duties"], out: "Impact-focused Bullets", quota: 10, sensitivity: "low", approval: true, extAction: false, plan: "Free" },
    { id: "tool_pdf_cv_parser", name: "External CV Data Importer", desc: "Parse PDF/Doc CV to automatically populate Hamrahe profile fields.", cat: "Profile & Resume", contexts: ["personal"], inputs: ["PDF File Upload"], out: "Extracted Experience Entities", quota: 20, sensitivity: "medium", approval: true, extAction: false, plan: "Free" },
    { id: "tool_multilingual_profile", name: "Persian/English Profile Synchronizer", desc: "Translate & localize profile sections between Persian and English naturally.", cat: "Profile & Resume", contexts: ["personal"], inputs: ["Profile Section Text"], out: "Bilingual Profile Sync", quota: 15, sensitivity: "low", approval: true, extAction: false, plan: "Free" },

    // 2. Jobs & Career (10 tools)
    { id: "tool_job_fit_analyzer", name: "Job Fit & Gap Analyzer", desc: "Calculate multidimensional fit score for any job listing with gap explanations.", cat: "Jobs & Career", contexts: ["personal"], inputs: ["Job Listing ID"], out: "Fit Breakdown & Gap Report", quota: 20, sensitivity: "low", approval: false, extAction: false, plan: "Free", saved: true, recent: true },
    { id: "tool_cover_note_builder", name: "Tailored Cover Note Creator", desc: "Draft high-converting personalized cover note for job applications.", cat: "Jobs & Career", contexts: ["personal"], inputs: ["Job ID", "Target Company"], out: "Output Cover Letter Artifact", quota: 20, sensitivity: "medium", approval: true, extAction: false, plan: "Free" },
    { id: "tool_referral_finder", name: "Warm Introduction Route Finder", desc: "Map 1st and 2nd degree connections at target job company for referrals.", cat: "Jobs & Career", contexts: ["personal"], inputs: ["Company Name"], out: "Referral Path Map", quota: 15, sensitivity: "low", approval: false, extAction: false, plan: "Pro" },
    { id: "tool_application_tracker", name: "Application Status Tracker", desc: "Monitor application progress across companies and trigger follow-ups.", cat: "Jobs & Career", contexts: ["personal"], inputs: ["Active Applications"], out: "Application Case Updates", quota: 10, sensitivity: "low", approval: false, extAction: false, plan: "Free" },
    { id: "tool_salary_benchmark", name: "Private Salary Benchmark Estimator", desc: "Compare private target compensation floor against verified market ranges.", cat: "Jobs & Career", contexts: ["personal"], inputs: ["Role", "Seniority", "Location"], out: "Compensation Range Report", quota: 15, sensitivity: "high", approval: false, extAction: false, plan: "Pro" },
    { id: "tool_interview_q_generator", name: "Company-Specific Interview Question Generator", desc: "Predict expected technical and behavioral questions for target company.", cat: "Jobs & Career", contexts: ["personal"], inputs: ["Job Title", "Company Name"], out: "Structured Interview Prep Guide", quota: 20, sensitivity: "low", approval: false, extAction: false, plan: "Free" },
    { id: "tool_application_prepack", name: "One-Click Application Package Prepper", desc: "Bundle resume, verified credentials, and cover note into a case.", cat: "Jobs & Career", contexts: ["personal"], inputs: ["Job ID"], out: "Complete Application Case", quota: 25, sensitivity: "medium", approval: true, extAction: false, plan: "Free" },
    { id: "tool_offer_evaluator", name: "Job Offer & Equity Evaluator", desc: "Analyze job offer terms, stock options, remote perks, and compensation.", cat: "Jobs & Career", contexts: ["personal"], inputs: ["Offer Details"], out: "Offer Evaluation & Counter-strategy", quota: 30, sensitivity: "high", approval: false, extAction: false, plan: "Pro" },
    { id: "tool_rejection_feedback", name: "Rejection Post-Mortem Analyzer", desc: "Extract growth insights and skill gaps from application rejections.", cat: "Jobs & Career", contexts: ["personal"], inputs: ["Rejection Email/Message"], out: "Feedback & Actionable Skill Plan", quota: 15, sensitivity: "low", approval: false, extAction: false, plan: "Free" },
    { id: "tool_remote_job_scout", name: "Remote & Hybrid Opportunity Scout", desc: "Filter jobs by verified remote flexibility, tech stack, and workplace culture.", cat: "Jobs & Career", contexts: ["personal"], inputs: ["Preferences"], out: "Scouted Jobs List", quota: 10, sensitivity: "low", approval: false, extAction: false, plan: "Free" },

    // 3. Professional Growth & Goals (8 tools)
    { id: "tool_growth_roadmap", name: "Career Roadmap Generator", desc: "Build milestone-driven 12-month growth plan toward target role.", cat: "Professional Growth", contexts: ["personal"], inputs: ["Current Role", "Target Role"], out: "Goal & Growth Plan Artifact", quota: 30, sensitivity: "medium", approval: true, extAction: false, plan: "Free", saved: true },
    { id: "tool_mission_suggester", name: "Daily Growth Mission Generator", desc: "Suggest actionable 15-minute missions connected to active goals.", cat: "Professional Growth", contexts: ["personal"], inputs: ["Active Goal"], out: "Daily Mission List", quota: 10, sensitivity: "low", approval: false, extAction: false, plan: "Free" },
    { id: "tool_skill_gap_matrix", name: "Industry Skill Matrix Analyzer", desc: "Compare personal skills against top 10% professionals in your field.", cat: "Professional Growth", contexts: ["personal"], inputs: ["Domain/Field"], out: "Skill Matrix & Benchmark", quota: 20, sensitivity: "low", approval: false, extAction: false, plan: "Free" },
    { id: "tool_mentorship_matcher", name: "Mentor & Peer Matcher", desc: "Identify senior mentors in Hamrahe network aligned with target growth.", cat: "Professional Growth", contexts: ["personal"], inputs: ["Target Skill"], out: "Recommended Mentor List", quota: 15, sensitivity: "low", approval: false, extAction: false, plan: "Free" },
    { id: "tool_leadership_assessor", name: "Leadership Potential Evaluator", desc: "Evaluate readiness for team lead / managerial transition.", cat: "Professional Growth", contexts: ["personal"], inputs: ["Project History"], out: "Leadership Readiness Report", quota: 20, sensitivity: "low", approval: false, extAction: false, plan: "Pro" },
    { id: "tool_career_pivot_risk", name: "Career Pivot Risk Assessor", desc: "Evaluate feasibility and timeline for switching to a new domain.", cat: "Professional Growth", contexts: ["personal"], inputs: ["Source Field", "Target Field"], out: "Pivot Viability & Steps", quota: 25, sensitivity: "low", approval: false, extAction: false, plan: "Free" },
    { id: "tool_milestone_verifier", name: "Milestone Evidence Verifier", desc: "Check if completed evidence satisfies goal milestone criteria.", cat: "Professional Growth", contexts: ["personal"], inputs: ["Milestone ID", "Evidence ID"], out: "Milestone Completion Status", quota: 10, sensitivity: "low", approval: false, extAction: false, plan: "Free" },
    { id: "tool_personal_brand_audit", name: "Personal Brand Visibility Audit", desc: "Evaluate content reach, search ranking, and topic authority on Hamrahe.", cat: "Professional Growth", contexts: ["personal"], inputs: ["Profile & Post History"], out: "Brand Visibility Breakdown", quota: 15, sensitivity: "low", approval: false, extAction: false, plan: "Free" },

    // 4. Verification & Trust (8 tools)
    { id: "tool_id_verification_guide", name: "Identity Verification Guide", desc: "Step-by-step guidance for completing official Iranian national ID verification.", cat: "Verification & Trust", contexts: ["personal", "organization", "startup"], inputs: ["ID Document Type"], out: "Verification Submission Package", quota: 10, sensitivity: "high", approval: true, extAction: true, plan: "Free" },
    { id: "tool_org_representation_check", name: "Organization Representative Verifier", desc: "Verify authorization level to act on behalf of a company/startup.", cat: "Verification & Trust", contexts: ["organization", "startup"], inputs: ["Company Tax ID", "Official Role Doc"], out: "Representation State", quota: 15, sensitivity: "high", approval: true, extAction: false, plan: "Free" },
    { id: "tool_evidence_packager", name: "Employment Evidence Packager", desc: "Compile employment contracts, HR confirmations, and project proofs.", cat: "Verification & Trust", contexts: ["personal"], inputs: ["Work Claim ID"], out: "Evidence Package Artifact", quota: 20, sensitivity: "medium", approval: true, extAction: false, plan: "Free" },
    { id: "tool_trust_signal_explainer", name: "Trust Score Explainer", desc: "Break down contributing factors to Trust Score with improvement steps.", cat: "Verification & Trust", contexts: ["personal", "organization"], inputs: ["Trust Signals"], out: "Trust Breakdown & Recommendations", quota: 10, sensitivity: "low", approval: false, extAction: false, plan: "Free" },
    { id: "tool_contradiction_resolver", name: "Profile Contradiction Resolver", desc: "Identify overlapping dates or conflicting title claims across profiles.", cat: "Verification & Trust", contexts: ["personal"], inputs: ["Experience List"], out: "Contradiction Report", quota: 15, sensitivity: "medium", approval: false, extAction: false, plan: "Free" },
    { id: "tool_appeal_drafter", name: "Verification Rejection Appeal Drafter", desc: "Draft formal appeal note if an experience verification claim was rejected.", cat: "Verification & Trust", contexts: ["personal", "organization"], inputs: ["Rejection Reason"], out: "Appeal Document Draft", quota: 20, sensitivity: "medium", approval: true, extAction: false, plan: "Free" },
    { id: "tool_sensitive_role_checker", name: "Sensitive Role Authorization Checker", desc: "Verify credentials required before performing financial or recruitment actions.", cat: "Verification & Trust", contexts: ["organization"], inputs: ["User Role"], out: "Authorization Status", quota: 10, sensitivity: "high", approval: false, extAction: false, plan: "Enterprise" },
    { id: "tool_peer_cosign_requester", name: "Peer Experience Co-sign Requester", desc: "Generate invitation to verified former colleagues to endorse employment claims.", cat: "Verification & Trust", contexts: ["personal"], inputs: ["Colleague Profile ID"], out: "Co-sign Request Message", quota: 10, sensitivity: "medium", approval: true, extAction: true, plan: "Free" },

    // 5. Badges & Credentials (8 tools)
    { id: "tool_badge_eligibility", name: "Badge Pathway Eligibility Checker", desc: "Evaluate prerequisites for Network Top Voice or Industry Leader badges.", cat: "Badges & Credentials", contexts: ["personal", "organization"], inputs: ["Target Badge ID"], out: "Eligibility Status & Missing Requirements", quota: 10, sensitivity: "low", approval: false, extAction: false, plan: "Free" },
    { id: "tool_badge_evidence_submitter", name: "Badge Evidence Package Submitter", desc: "Assemble and submit required proof for official human badge review.", cat: "Badges & Credentials", contexts: ["personal", "organization"], inputs: ["Badge ID", "Evidence IDs"], out: "Badge Submission Case", quota: 20, sensitivity: "medium", approval: true, extAction: true, plan: "Free" },
    { id: "tool_credential_importer", name: "Partner Credential Synchronizer", desc: "Import and verify credentials from Sharif, Tehran University, or Coursera.", cat: "Badges & Credentials", contexts: ["personal"], inputs: ["Credential Code/URL"], out: "Verified Credential Entity", quota: 15, sensitivity: "low", approval: true, extAction: false, plan: "Free" },
    { id: "tool_badge_reward_claimer", name: "Badge Premium Reward Claimer", desc: "Claim 1-month Premium credit earned through verified badge awards.", cat: "Badges & Credentials", contexts: ["personal"], inputs: ["Awarded Badge ID"], out: "Premium Quota Reward Credit", quota: 10, sensitivity: "low", approval: true, extAction: true, plan: "Free" },
    { id: "tool_badge_visibility_toggle", name: "Badge Profile Display Controller", desc: "Manage public vs connections-only display settings for earned badges.", cat: "Badges & Credentials", contexts: ["personal", "organization"], inputs: ["Badge ID", "Visibility Level"], out: "Display Setting Updated", quota: 5, sensitivity: "low", approval: false, extAction: false, plan: "Free" },
    { id: "tool_org_badge_guide", name: "Responsible Employer Badge Pathway", desc: "Guide company HR team to satisfy workplace transparency badge standards.", cat: "Badges & Credentials", contexts: ["organization"], inputs: ["Company Profile ID"], out: "Org Badge Audit & Action Plan", quota: 25, sensitivity: "medium", approval: false, extAction: false, plan: "Enterprise" },
    { id: "tool_credential_expiry_alert", name: "Credential Renewal Monitor", desc: "Track expiring certifications and suggest assessment refresh dates.", cat: "Badges & Credentials", contexts: ["personal"], inputs: ["Active Credentials"], out: "Renewal Reminders", quota: 10, sensitivity: "low", approval: false, extAction: false, plan: "Free" },
    { id: "tool_badge_appeal_manager", name: "Badge Decision Review Drafter", desc: "Prepare clarification if badge review requested additional information.", cat: "Badges & Credentials", contexts: ["personal", "organization"], inputs: ["Badge Review ID"], out: "Clarification Package", quota: 15, sensitivity: "medium", approval: true, extAction: false, plan: "Free" },

    // 6. Networking & Intro (8 tools)
    { id: "tool_intro_message_draft", name: "Personalized Introduction Drafter", desc: "Draft warm connection request highlighting mutual interests & background.", cat: "Networking & Intro", contexts: ["personal"], inputs: ["Target Profile ID", "Context"], out: "Draft Connection Message", quota: 10, sensitivity: "medium", approval: true, extAction: false, plan: "Free" },
    { id: "tool_connection_relevance", name: "Connection Relevance Explainer", desc: "Explain why connecting with a specific professional benefits active goals.", cat: "Networking & Intro", contexts: ["personal"], inputs: ["Target Profile ID"], out: "Relevance Explanation", quota: 10, sensitivity: "low", approval: false, extAction: false, plan: "Free" },
    { id: "tool_mutual_intro_path", name: "Mutual Introduction Requester", desc: "Draft message asking a mutual contact to introduce you to a decision-maker.", cat: "Networking & Intro", contexts: ["personal"], inputs: ["Mutual Friend ID", "Target ID"], out: "Intro Request Message", quota: 15, sensitivity: "medium", approval: true, extAction: false, plan: "Free" },
    { id: "tool_networking_followup", name: "Networking Event Follow-up Plan", desc: "Build structured follow-up plan for contacts met at events or webinars.", cat: "Networking & Intro", contexts: ["personal"], inputs: ["Event Name", "Contact List"], out: "Follow-up Timeline & Drafts", quota: 20, sensitivity: "medium", approval: true, extAction: false, plan: "Free" },
    { id: "tool_influencer_outreach", name: "Domain Expert Outreach Strategy", desc: "Formulate polite inquiry message for Iranian tech industry leaders.", cat: "Networking & Intro", contexts: ["personal"], inputs: ["Expert Profile ID", "Topic"], out: "Outreach Message Draft", quota: 15, sensitivity: "medium", approval: true, extAction: false, plan: "Free" },
    { id: "tool_network_quality_audit", name: "Network Quality & Diversity Auditor", desc: "Analyze network density across industries, seniorities, and companies.", cat: "Networking & Intro", contexts: ["personal"], inputs: ["Connection Graph"], out: "Network Quality Insights", quota: 15, sensitivity: "low", approval: false, extAction: false, plan: "Free" },
    { id: "tool_alumni_finder", name: "University Alumni Connector", desc: "Identify alumni from your university working at target companies.", cat: "Networking & Intro", contexts: ["personal"], inputs: ["University", "Target Company"], out: "Alumni Match List", quota: 10, sensitivity: "low", approval: false, extAction: false, plan: "Free" },
    { id: "tool_reconnect_suggester", name: "Dormant Connection Reconnect Suggester", desc: "Identify valuable past colleagues you haven't interacted with in 6+ months.", cat: "Networking & Intro", contexts: ["personal"], inputs: ["Connections List"], out: "Re-engagement Suggestions", quota: 10, sensitivity: "low", approval: false, extAction: false, plan: "Free" },

    // 7. Messaging & Follow-up (8 tools)
    { id: "tool_msg_smart_reply", name: "Context-Aware Reply Drafter", desc: "Generate professional reply options for direct messages.", cat: "Messaging & Follow-up", contexts: ["personal", "organization"], inputs: ["Conversation Messages"], out: "3 Proposed Reply Options", quota: 10, sensitivity: "medium", approval: true, extAction: false, plan: "Free" },
    { id: "tool_msg_summarizer", name: "Thread Summarizer & Decision Extractor", desc: "Summarize long chat threads and list key decisions and commitments.", cat: "Messaging & Follow-up", contexts: ["personal", "organization"], inputs: ["Message Thread"], out: "Summary & Action Items", quota: 15, sensitivity: "medium", approval: false, extAction: false, plan: "Free" },
    { id: "tool_msg_action_item_case", name: "Message Action Item Case Creator", desc: "Convert a message commitment into an official AI Engine Case.", cat: "Messaging & Follow-up", contexts: ["personal", "organization"], inputs: ["Action Item Text"], out: "New Case Created", quota: 15, sensitivity: "medium", approval: true, extAction: false, plan: "Free" },
    { id: "tool_msg_tone_adjuster", name: "Message Tone Polisher", desc: "Adjust draft message tone (More Formal, Persuasive, Concisification).", cat: "Messaging & Follow-up", contexts: ["personal", "organization"], inputs: ["Draft Message", "Target Tone"], out: "Polished Message", quota: 10, sensitivity: "low", approval: true, extAction: false, plan: "Free" },
    { id: "tool_followup_reminder_scheduler", name: "Follow-up Reminder & Draft Generator", desc: "Set automatic follow-up draft if unanswered after 3 days.", cat: "Messaging & Follow-up", contexts: ["personal", "organization"], inputs: ["Message ID", "Days"], out: "Follow-up Scheduled", quota: 10, sensitivity: "medium", approval: true, extAction: false, plan: "Free" },
    { id: "tool_interview_reschedule_msg", name: "Interview Reschedule Polite Request", desc: "Draft diplomatic message requesting interview time adjustment.", cat: "Messaging & Follow-up", contexts: ["personal"], inputs: ["Original Time", "New Proposed Slots"], out: "Reschedule Draft", quota: 10, sensitivity: "medium", approval: true, extAction: false, plan: "Free" },
    { id: "tool_b2b_inquiry_reply", name: "B2B Lead Initial Responder", desc: "Draft personalized response to business inquiries on company profile.", cat: "Messaging & Follow-up", contexts: ["organization", "startup"], inputs: ["Inquiry Message"], out: "B2B Response Draft", quota: 15, sensitivity: "medium", approval: true, extAction: false, plan: "Pro" },
    { id: "tool_outreach_sequence", name: "Multi-Step Outreach Sequence Generator", desc: "Build 3-message sequence for talent or business outreach.", cat: "Messaging & Follow-up", contexts: ["organization", "startup"], inputs: ["Prospect Profile"], out: "3-Step Message Sequence", quota: 25, sensitivity: "high", approval: true, extAction: false, plan: "Pro" },

    // 8. Content & Brand (8 tools)
    { id: "tool_post_drafter", name: "Professional Post Generator", desc: "Draft insightful feed posts sharing learnings, project case studies, or tech insights.", cat: "Content & Brand", contexts: ["personal", "organization"], inputs: ["Topic / Project Outcome"], out: "Post Content Draft Artifact", quota: 15, sensitivity: "medium", approval: true, extAction: false, plan: "Free" },
    { id: "tool_post_rewriter", name: "Feed Content Polish & Hashtag Suggester", desc: "Refine existing draft, improve formatting, and add relevant Persian tech hashtags.", cat: "Content & Brand", contexts: ["personal", "organization"], inputs: ["Raw Post Draft"], out: "Polished Post Text", quota: 10, sensitivity: "low", approval: true, extAction: false, plan: "Free" },
    { id: "tool_article_outline", name: "Long-form Technical Article Outliner", desc: "Structure comprehensive technical article or industry opinion piece.", cat: "Content & Brand", contexts: ["personal", "organization"], inputs: ["Article Topic"], out: "Structured Article Outline", quota: 20, sensitivity: "low", approval: true, extAction: false, plan: "Free" },
    { id: "tool_content_performance_analyzer", name: "Feed Post Performance Analyzer", desc: "Analyze engagement metrics and audience demographics for published posts.", cat: "Content & Brand", contexts: ["personal", "organization"], inputs: ["Post ID"], out: "Performance Analytics & Recommendations", quota: 15, sensitivity: "low", approval: false, extAction: false, plan: "Free" },
    { id: "tool_visual_asset_prompt", name: "Post Visual Infographic Conceptor", desc: "Generate concepts and layout wireframes for post image slides.", cat: "Content & Brand", contexts: ["personal", "organization"], inputs: ["Key Takeaways"], out: "Infographic Slide Concept", quota: 15, sensitivity: "low", approval: false, extAction: false, plan: "Free" },
    { id: "tool_company_announcement", name: "Company Milestone Announcement Builder", desc: "Craft official company news post (Funding, Product Launch, Hiring spree).", cat: "Content & Brand", contexts: ["organization", "startup"], inputs: ["Milestone Details"], out: "Official Announcement Draft", quota: 20, sensitivity: "medium", approval: true, extAction: false, plan: "Free" },
    { id: "tool_thought_leadership_calendar", name: "Content Calendar Planner", desc: "Plan monthly posting schedule aligned with personal or company goals.", cat: "Content & Brand", contexts: ["personal", "organization"], inputs: ["Goals", "Pillars"], out: "Monthly Content Calendar", quota: 25, sensitivity: "low", approval: true, extAction: false, plan: "Pro" },
    { id: "tool_community_discussion_starter", name: "Tech Group Discussion Starter", desc: "Draft engaging question post for specialized Hamrahe groups.", cat: "Content & Brand", contexts: ["personal"], inputs: ["Group Topic"], out: "Discussion Prompt Text", quota: 10, sensitivity: "low", approval: true, extAction: false, plan: "Free" },

    // 9. Projects & Freelancing (8 tools)
    { id: "tool_project_fit_analyzer", name: "Freelance Project Fit Evaluator", desc: "Analyze freelance/contract project requirements, budget, and scope.", cat: "Projects & Freelancing", contexts: ["personal"], inputs: ["Project ID"], out: "Project Fit & Estimate Report", quota: 20, sensitivity: "low", approval: false, extAction: false, plan: "Free" },
    { id: "tool_proposal_builder", name: "Tailored Proposal & Quote Builder", desc: "Draft professional project proposal with scope, milestone breakdown, and terms.", cat: "Projects & Freelancing", contexts: ["personal"], inputs: ["Project ID", "My Rates"], out: "Output Proposal Artifact", quota: 30, sensitivity: "medium", approval: true, extAction: false, plan: "Pro" },
    { id: "tool_scope_estimator", name: "Project Scope & Hours Estimator", desc: "Estimate design/development hours required for project deliverables.", cat: "Projects & Freelancing", contexts: ["personal"], inputs: ["Project Requirements"], out: "WBS & Hour Estimates", quota: 20, sensitivity: "low", approval: false, extAction: false, plan: "Free" },
    { id: "tool_contract_term_checker", name: "Project Agreement Term Reviewer", desc: "Highlight risk areas in freelance project contracts (IP, payment, SLA).", cat: "Projects & Freelancing", contexts: ["personal"], inputs: ["Contract Text"], out: "Contract Risk Report", quota: 25, sensitivity: "high", approval: false, extAction: false, plan: "Pro" },
    { id: "tool_project_milestone_tracker", name: "Client Project Milestone Tracker", desc: "Track deliverable handoffs and client feedback on active projects.", cat: "Projects & Freelancing", contexts: ["personal"], inputs: ["Active Project ID"], out: "Milestone Status Update", quota: 15, sensitivity: "medium", approval: false, extAction: false, plan: "Free" },
    { id: "tool_freelance_rate_calculator", name: "Hourly & Value Rate Calculator", desc: "Calculate sustainable hourly design/dev rates based on living costs.", cat: "Projects & Freelancing", contexts: ["personal"], inputs: ["Monthly Expenses", "Target Savings"], out: "Rate Recommendation", quota: 10, sensitivity: "high", approval: false, extAction: false, plan: "Free" },
    { id: "tool_client_testimonial_request", name: "Client Testimonial Request Generator", desc: "Draft polite request asking past clients for verified project reviews.", cat: "Projects & Freelancing", contexts: ["personal"], inputs: ["Client Name", "Project Name"], out: "Testimonial Request Draft", quota: 10, sensitivity: "medium", approval: true, extAction: false, plan: "Free" },
    { id: "tool_portfolio_case_study_builder", name: "Project Case Study Structurer", desc: "Transform completed freelance project into a structured portfolio case study.", cat: "Projects & Freelancing", contexts: ["personal"], inputs: ["Project Deliverables"], out: "Case Study Artifact", quota: 25, sensitivity: "medium", approval: true, extAction: false, plan: "Free" },

    // 10. Learning & Assessment (8 tools)
    { id: "tool_learning_path_adaptive", name: "Adaptive Skill Path Generator", desc: "Build custom course sequence targeting specific verified skill gaps.", cat: "Learning & Assessment", contexts: ["personal"], inputs: ["Target Skill", "Current Level"], out: "Custom Learning Path", quota: 20, sensitivity: "low", approval: true, extAction: false, plan: "Free" },
    { id: "tool_assessment_prep_quiz", name: "Skill Assessment Practice Quizzer", desc: "Generate 5 practice questions before taking official Hamrahe assessment.", cat: "Learning & Assessment", contexts: ["personal"], inputs: ["Assessment Category"], out: "Practice Quiz Session", quota: 15, sensitivity: "low", approval: false, extAction: false, plan: "Free" },
    { id: "tool_course_summary_notes", name: "Course Key Concept Summarizer", desc: "Generate structured study notes and cheat sheets from completed course units.", cat: "Learning & Assessment", contexts: ["personal"], inputs: ["Course ID"], out: "Study Cheat Sheet", quota: 15, sensitivity: "low", approval: false, extAction: false, plan: "Free" },
    { id: "tool_exercise_critique_ai", name: "Design/Code Exercise AI Critiquer", desc: "Receive immediate structured feedback on submitted learning assignments.", cat: "Learning & Assessment", contexts: ["personal"], inputs: ["Submitted Work"], out: "Critique & Improvement List", quota: 20, sensitivity: "low", approval: false, extAction: false, plan: "Free" },
    { id: "tool_assessment_gap_analyst", name: "Assessment Failure Analysis & Plan", desc: "Break down missed assessment questions and provide targeted review units.", cat: "Learning & Assessment", contexts: ["personal"], inputs: ["Assessment Result ID"], out: "Retake Readiness Plan", quota: 15, sensitivity: "low", approval: false, extAction: false, plan: "Free" },
    { id: "tool_team_learning_assigner", name: "Organization Team Upskilling Plan", desc: "Assign required learning paths to engineering/design team members.", cat: "Learning & Assessment", contexts: ["organization"], inputs: ["Team Department", "Skill Target"], out: "Team Upskilling Program", quota: 30, sensitivity: "medium", approval: true, extAction: true, plan: "Enterprise" },
    { id: "tool_learning_time_optimizer", name: "Weekly Study Time Scheduler", desc: "Fit 30-minute daily learning blocks into active calendar.", cat: "Learning & Assessment", contexts: ["personal"], inputs: ["Weekly Availability"], out: "Study Schedule Blocks", quota: 10, sensitivity: "low", approval: true, extAction: false, plan: "Free" },
    { id: "tool_cert_sharing_post", name: "Certificate Achievement Post Builder", desc: "Draft celebratory post when passing an official certification assessment.", cat: "Learning & Assessment", contexts: ["personal"], inputs: ["Certificate ID"], out: "Certificate Post Draft", quota: 10, sensitivity: "low", approval: true, extAction: false, plan: "Free" },

    // 11. Interview Prep (8 tools)
    { id: "tool_mock_interview_simulator", name: "Interactive AI Mock Interviewer", desc: "Simulate live voice/text technical or behavioral interview roleplay.", cat: "Interview Prep", contexts: ["personal"], inputs: ["Job Role", "Company"], out: "Interactive Interview Session", quota: 30, sensitivity: "medium", approval: false, extAction: false, plan: "Pro" },
    { id: "tool_star_method_builder", name: "STAR Method Response Structurer", desc: "Format personal work stories into Situation, Task, Action, Result framework.", cat: "Interview Prep", contexts: ["personal"], inputs: ["Raw Story"], out: "Structured STAR Answer", quota: 15, sensitivity: "low", approval: true, extAction: false, plan: "Free" },
    { id: "tool_case_study_presentation_prep", name: "Design System Case Study Deck Guide", desc: "Outline 15-minute presentation structure for design portfolio rounds.", cat: "Interview Prep", contexts: ["personal"], inputs: ["Case Study Details"], out: "Presentation Deck Outline", quota: 20, sensitivity: "low", approval: true, extAction: false, plan: "Free" },
    { id: "tool_interviewer_researcher", name: "Interviewer Background & Style Brief", desc: "Analyze interviewer's public tech articles and background for rapport.", cat: "Interview Prep", contexts: ["personal"], inputs: ["Interviewer Profile ID"], out: "Interviewer Brief", quota: 15, sensitivity: "medium", approval: false, extAction: false, plan: "Pro" },
    { id: "tool_post_interview_thankyou", name: "Post-Interview Thank You Note Drafter", desc: "Draft timely, memorable thank-you note highlighting key discussion points.", cat: "Interview Prep", contexts: ["personal"], inputs: ["Interviewer Name", "Key Topic"], out: "Thank You Note Draft", quota: 10, sensitivity: "medium", approval: true, extAction: false, plan: "Free" },
    { id: "tool_salary_negotiation_script", name: "Salary Negotiation Talking Points", desc: "Prepare respectful scripts for discussing compensation expectations.", cat: "Interview Prep", contexts: ["personal"], inputs: ["Current Offer", "Target Salary"], out: "Negotiation Script", quota: 20, sensitivity: "high", approval: true, extAction: false, plan: "Pro" },
    { id: "tool_technical_concept_freshener", name: "System Architecture Q&A Refresher", desc: "Quick Q&A flashcards for high-scale web app concepts before interview.", cat: "Interview Prep", contexts: ["personal"], inputs: ["Domain"], out: "Concept Refresher Cards", quota: 15, sensitivity: "low", approval: false, extAction: false, plan: "Free" },
    { id: "tool_questions_for_interviewer", name: "Reverse Interview Question Generator", desc: "Formulate thoughtful questions to ask hiring manager about team culture.", cat: "Interview Prep", contexts: ["personal"], inputs: ["Company Name"], out: "Strategic Questions List", quota: 10, sensitivity: "low", approval: false, extAction: false, plan: "Free" },

    // 12. Company Intelligence & Org Profile (8 tools)
    { id: "tool_company_profile_optimizer", name: "Organization Profile Quality Enhancer", desc: "Audit and improve company overview, tech stack, and benefits sections.", cat: "Company Intelligence", contexts: ["organization", "startup"], inputs: ["Company Data"], out: "Profile Improvement Plan", quota: 20, sensitivity: "medium", approval: true, extAction: false, plan: "Free" },
    { id: "tool_competitor_tech_bench", name: "Iranian Tech Competitor Benchmarker", desc: "Compare company tech stack, hiring velocity, and employee perks against peers.", cat: "Company Intelligence", contexts: ["organization", "startup"], inputs: ["Industry Category"], out: "Competitor Benchmark Report", quota: 30, sensitivity: "high", approval: false, extAction: false, plan: "Enterprise" },
    { id: "tool_b2b_value_prop_builder", name: "B2B Value Proposition Architect", desc: "Draft crisp value proposition messaging for company B2B services.", cat: "Company Intelligence", contexts: ["organization", "startup"], inputs: ["Services & Products"], out: "Value Prop Document", quota: 25, sensitivity: "medium", approval: true, extAction: false, plan: "Pro" },
    { id: "tool_employer_brand_auditor", name: "Employer Brand Reputation Auditor", desc: "Analyze applicant feedback, employee retention signals, and public trust.", cat: "Company Intelligence", contexts: ["organization", "startup"], inputs: ["Company ID"], out: "Employer Reputation Audit", quota: 25, sensitivity: "high", approval: false, extAction: false, plan: "Enterprise" },
    { id: "tool_org_structure_mapper", name: "Organizational Chart & Role Mapper", desc: "Map team hierarchies and identify missing department positions.", cat: "Company Intelligence", contexts: ["organization", "startup"], inputs: ["Employee List"], out: "Org Chart Summary", quota: 20, sensitivity: "medium", approval: false, extAction: false, plan: "Pro" },
    { id: "tool_startup_pitch_deck_analyzer", name: "Startup Pitch & Thesis Evaluator", desc: "Analyze startup value proposition, market size, and business model.", cat: "Company Intelligence", contexts: ["startup"], inputs: ["Pitch Deck / Text"], out: "Startup Evaluation & Gaps", quota: 30, sensitivity: "high", approval: false, extAction: false, plan: "Pro" },
    { id: "tool_service_catalog_drafter", name: "B2B Service Catalog Builder", desc: "Structure services list with clear deliverables, pricing models, and case studies.", cat: "Company Intelligence", contexts: ["organization", "startup"], inputs: ["Service Details"], out: "Services Tab Content", quota: 20, sensitivity: "medium", approval: true, extAction: false, plan: "Free" },
    { id: "tool_culture_manifesto_builder", name: "Company Culture & Values Builder", desc: "Define company core principles, remote policy, and work philosophy.", cat: "Company Intelligence", contexts: ["organization", "startup"], inputs: ["Founders Values"], out: "Culture Manifesto Artifact", quota: 20, sensitivity: "low", approval: true, extAction: false, plan: "Free" },

    // 13. Hiring & Recruiting (8 tools)
    { id: "tool_jd_architect", name: "Inclusive Job Description Architect", desc: "Draft clear, high-converting job posts with hard requirements and salary transparency.", cat: "Hiring & Recruiting", contexts: ["organization", "startup"], inputs: ["Target Role", "Budget"], out: "Job Description Artifact", quota: 20, sensitivity: "medium", approval: true, extAction: false, plan: "Free" },
    { id: "tool_candidate_matcher_explainable", name: "Explainable Candidate Matcher", desc: "Rank applicants against hard criteria with transparent justification breakdown.", cat: "Hiring & Recruiting", contexts: ["organization", "startup"], inputs: ["Job ID", "Applicant Pool"], out: "Shortlist & Match Matrix", quota: 30, sensitivity: "high", approval: false, extAction: false, plan: "Pro" },
    { id: "tool_candidate_bias_checker", name: "Unbiased Screening Filter", desc: "Apply strict skill-and-evidence evaluation hiding non-essential demographics.", cat: "Hiring & Recruiting", contexts: ["organization", "startup"], inputs: ["Applicant Profiles"], out: "Anonymized Skill Evaluation", quota: 20, sensitivity: "medium", approval: false, extAction: false, plan: "Pro" },
    { id: "tool_interview_kit_builder", name: "Structured Technical Interview Kit", desc: "Generate standardized interview rubrics and scoring rubrics for hiring team.", cat: "Hiring & Recruiting", contexts: ["organization", "startup"], inputs: ["Role Seniority"], out: "Interview Kit Artifact", quota: 25, sensitivity: "medium", approval: true, extAction: false, plan: "Pro" },
    { id: "tool_rejection_polite_builder", name: "Constructive Applicant Feedback Generator", desc: "Send compassionate, individualized feedback to interviewed candidates.", cat: "Hiring & Recruiting", contexts: ["organization", "startup"], inputs: ["Candidate Notes"], out: "Constructive Rejection Email", quota: 15, sensitivity: "medium", approval: true, extAction: true, plan: "Free" },
    { id: "tool_recruitment_funnel_analytics", name: "Recruitment Funnel Velocity Analyzer", desc: "Track applicant progression times and identify drop-off bottlenecks.", cat: "Hiring & Recruiting", contexts: ["organization", "startup"], inputs: ["Funnel Data"], out: "Funnel Velocity Report", quota: 25, sensitivity: "medium", approval: false, extAction: false, plan: "Enterprise" },
    { id: "tool_passive_candidate_sourcer", name: "Verified Passive Talent Sourcer", desc: "Discover top verified professionals in Hamrahe open to discreet opportunities.", cat: "Hiring & Recruiting", contexts: ["organization", "startup"], inputs: ["Skill Criteria"], out: "Talent Discovery List", quota: 30, sensitivity: "high", approval: false, extAction: false, plan: "Pro" },
    { id: "tool_offer_letter_drafter", name: "Formal Offer Letter Generator", desc: "Generate standard offer letter specifying compensation, probation, and remote terms.", cat: "Hiring & Recruiting", contexts: ["organization", "startup"], inputs: ["Candidate Name", "Salary"], out: "Offer Letter Artifact", quota: 25, sensitivity: "high", approval: true, extAction: false, plan: "Pro" },

    // 14. B2B & Sales (8 tools)
    { id: "tool_target_account_builder", name: "Target Account Profile Builder", desc: "Build strategic brief for prospective corporate B2B clients.", cat: "B2B & Sales", contexts: ["organization", "startup"], inputs: ["Target Company"], out: "Target Account Brief Artifact", quota: 25, sensitivity: "medium", approval: true, extAction: false, plan: "Pro" },
    { id: "tool_stakeholder_mapper", name: "Key Decision-Maker Stakeholder Mapper", desc: "Identify CTOs, Heads of Product, or HR Directors inside target accounts.", cat: "B2B & Sales", contexts: ["organization", "startup"], inputs: ["Company ID"], out: "Stakeholder Map", quota: 20, sensitivity: "high", approval: false, extAction: false, plan: "Pro" },
    { id: "tool_cold_outreach_b2b", name: "High-Response B2B Outreach Message", desc: "Draft concise value-focused intro message to decision-makers.", cat: "B2B & Sales", contexts: ["organization", "startup"], inputs: ["Stakeholder Profile"], out: "B2B Message Draft", quota: 15, sensitivity: "medium", approval: true, extAction: false, plan: "Free" },
    { id: "tool_proposal_rfp_responder", name: "RFP Response & Tender Assistant", desc: "Draft comprehensive technical response for corporate RFPs.", cat: "B2B & Sales", contexts: ["organization", "startup"], inputs: ["RFP Document"], out: "RFP Response Artifact", quota: 35, sensitivity: "high", approval: true, extAction: false, plan: "Enterprise" },
    { id: "tool_lead_qualification_score", name: "B2B Lead Qualification Scorer", desc: "Evaluate incoming service inquiry quality and deal likelihood.", cat: "B2B & Sales", contexts: ["organization", "startup"], inputs: ["Inquiry Form"], out: "Lead Qualification Score", quota: 15, sensitivity: "medium", approval: false, extAction: false, plan: "Pro" },
    { id: "tool_b2b_meeting_agenda", name: "Discovery Call Agenda Builder", desc: "Create structured 30-minute discovery call agenda and questions.", cat: "B2B & Sales", contexts: ["organization", "startup"], inputs: ["Prospect Needs"], out: "Meeting Brief Artifact", quota: 15, sensitivity: "low", approval: true, extAction: false, plan: "Free" },
    { id: "tool_b2b_case_study_matcher", name: "Prospect Case Study Matcher", desc: "Select best-matching past client case study for pitch presentation.", cat: "B2B & Sales", contexts: ["organization", "startup"], inputs: ["Prospect Industry"], out: "Matched Case Study", quota: 15, sensitivity: "low", approval: false, extAction: false, plan: "Free" },
    { id: "tool_pipeline_forecast_ai", name: "B2B Pipeline Revenue Forecaster", desc: "Forecast expected deal close rate and quarter revenue pipeline.", cat: "B2B & Sales", contexts: ["organization", "startup"], inputs: ["Active Deals"], out: "Pipeline Forecast Report", quota: 30, sensitivity: "high", approval: false, extAction: false, plan: "Enterprise" },

    // 15. Analytics & Power (8 tools)
    { id: "tool_power_score_breakdown", name: "Professional Power Score Deep Dive", desc: "Deconstruct total power score across identity, experience, skills, and network.", cat: "Analytics & Power", contexts: ["personal"], inputs: ["Power Score"], out: "Multidimensional Power Report", quota: 10, sensitivity: "low", approval: false, extAction: false, plan: "Free" },
    { id: "tool_power_simulator", name: "Power Score Scenario Simulator", desc: "Simulate score impact if adding a verified certification or new experience claim.", cat: "Analytics & Power", contexts: ["personal"], inputs: ["Simulated Event"], out: "Simulated Score Change (+14 pts)", quota: 15, sensitivity: "low", approval: false, extAction: false, plan: "Free" },
    { id: "tool_peer_benchmark_analyst", name: "Anonymized Peer Benchmark Analyst", desc: "Compare score trajectory against senior professionals with similar tenure.", cat: "Analytics & Power", contexts: ["personal"], inputs: ["Domain"], out: "Peer Percentile Chart", quota: 15, sensitivity: "low", approval: false, extAction: false, plan: "Pro" },
    { id: "tool_evidence_coverage_checker", name: "Evidence Coverage Percentage Calculator", desc: "Calculate percentage of profile claims backed by verified documentation.", cat: "Analytics & Power", contexts: ["personal", "organization"], inputs: ["Profile Data"], out: "Evidence Coverage Score (88%)", quota: 10, sensitivity: "low", approval: false, extAction: false, plan: "Free" },
    { id: "tool_org_trust_analytics", name: "Company Trust Signal Monitor", desc: "Track organizational trust indicators and employee feedback velocity.", cat: "Analytics & Power", contexts: ["organization", "startup"], inputs: ["Company ID"], out: "Org Trust Dashboard", quota: 20, sensitivity: "medium", approval: false, extAction: false, plan: "Enterprise" },
    { id: "tool_analytics_export_pdf", name: "Executive Professional Growth Report Exporter", desc: "Export clean 2-page PDF summary of growth trajectory and evidence.", cat: "Analytics & Power", contexts: ["personal", "organization"], inputs: ["Analytics Data"], out: "Exported PDF File", quota: 15, sensitivity: "low", approval: true, extAction: false, plan: "Free" },
    { id: "tool_activity_quality_audit", name: "Platform Engagement Quality Auditor", desc: "Evaluate whether messaging, posting, and networking behavior aligns with high standards.", cat: "Analytics & Power", contexts: ["personal"], inputs: ["Platform Event Log"], out: "Activity Quality Score", quota: 10, sensitivity: "low", approval: false, extAction: false, plan: "Free" },
    { id: "tool_analytics_data_source_viewer", name: "Data Source Audit Inspector", desc: "View exact event logs and data sources used to calculate every metric.", cat: "Analytics & Power", contexts: ["personal", "organization"], inputs: ["Metric Name"], out: "Audit Event Trail", quota: 5, sensitivity: "low", approval: false, extAction: false, plan: "Free" },

    // 16. Privacy, Data & Productivity (8 tools)
    { id: "tool_consent_manager", name: "Granular Consent & Expiration Manager", desc: "Review, extend, or revoke AI access permissions for individual tools.", cat: "Privacy & Data Control", contexts: ["personal", "organization", "startup"], inputs: ["Consent ID"], out: "Consent Status Updated", quota: 5, sensitivity: "high", approval: true, extAction: true, plan: "Free" },
    { id: "tool_memory_editor", name: "AI Memory Inspection & Item Editor", desc: "View and modify stored facts, target role preferences, and compensation floors.", cat: "Privacy & Data Control", contexts: ["personal", "organization"], inputs: ["Memory Item ID"], out: "Memory Updated", quota: 5, sensitivity: "high", approval: true, extAction: false, plan: "Free" },
    { id: "tool_temp_mode_toggle", name: "Incognito / Temporary Conversation Mode", desc: "Run analysis without saving conversation history or updating memory.", cat: "Privacy & Data Control", contexts: ["personal", "organization"], inputs: ["Mode Toggle"], out: "Temporary Session Active", quota: 5, sensitivity: "low", approval: false, extAction: false, plan: "Free" },
    { id: "tool_quota_ledger_inspector", name: "AI Credit & Quota Usage Inspector", desc: "Review detailed per-tool credit consumption history.", cat: "Productivity & Planning", contexts: ["personal", "organization"], inputs: ["Time Range"], out: "Quota Usage Breakdown", quota: 5, sensitivity: "low", approval: false, extAction: false, plan: "Free" },
    { id: "tool_data_export_gdpr", name: "Complete AI Data & Case Archive Exporter", desc: "Download all AI Engine cases, outputs, conversations, and consent history as JSON/ZIP.", cat: "Privacy & Data Control", contexts: ["personal", "organization"], inputs: ["Export Request"], out: "Data Zip Archive", quota: 10, sensitivity: "high", approval: true, extAction: false, plan: "Free" },
    { id: "tool_revocation_impact_simulator", name: "Revocation Impact Assessor", desc: "Simulate feature limitations if revoking message or experience analysis permissions.", cat: "Privacy & Data Control", contexts: ["personal"], inputs: ["Permission Name"], out: "Impact Explanation Report", quota: 5, sensitivity: "low", approval: false, extAction: false, plan: "Free" },
    { id: "tool_calendar_time_blocker", name: "Focus & Growth Time Blocker", desc: "Block focus time slots on Google/Hamrahe calendar for interview prep.", cat: "Productivity & Planning", contexts: ["personal"], inputs: ["Time Goal"], out: "Calendar Block Event", quota: 10, sensitivity: "medium", approval: true, extAction: true, plan: "Free" },
    { id: "tool_case_timeline_auditor", name: "Case Audit Log & History Inspector", desc: "Inspect step-by-step history of AI recommendations and user approvals for any case.", cat: "Productivity & Planning", contexts: ["personal", "organization"], inputs: ["Case ID"], out: "Audit Trail View", quota: 5, sensitivity: "low", approval: false, extAction: false, plan: "Free" },
  ];

  // Populate first 120 explicit tools from above
  rawToolData.forEach((t) => {
    tools.push({
      id: t.id,
      name: t.name,
      shortDescription: t.desc,
      fullDescription: `${t.desc} Designed specifically for the Iranian professional ecosystem within Hamrahe's AI Engine. Supports structured event processing, transparent evidence verification, action previews, and full user approval before execution.`,
      category: t.cat,
      supportedContexts: t.contexts,
      requiredInputs: t.inputs,
      authorizedDataSources: ["Hamrahe Data Layer", ...t.inputs],
      outputType: t.out,
      estimatedQuota: t.quota,
      sensitivityLevel: t.sensitivity,
      approvalRequired: t.approval,
      externalActionPossible: t.extAction,
      isSaved: t.saved || false,
      isRecent: t.recent || false,
      planRequired: t.plan,
    });
  });

  // To reach exactly 180 genuinely distinct tools across the 23 categories, generate programmatically distinct specialized tools
  const categoriesList: ToolDefinition["category"][] = [
    "Profile & Resume", "Jobs & Career", "Professional Growth", "Skills & Evidence",
    "Verification & Trust", "Badges & Credentials", "Networking & Intro", "Messaging & Follow-up",
    "Content & Brand", "Projects & Freelancing", "Learning & Assessment", "Interview Prep",
    "Meetings & Collaboration", "Company Intelligence", "Hiring & Recruiting", "Talent Management",
    "B2B & Sales", "Market Research", "Events & Groups", "Analytics & Power",
    "Search & Discovery", "Productivity & Planning", "Privacy & Data Control"
  ];

  const additionalTitles = [
    "Expertise Graph Inspector", "Tehran Tech Hub Benchmark", "Fintech Domain Credibility Evaluator",
    "Remote Team Sync Facilitator", "Code Review Quality Assessor", "Product Requirement Spec Drafter",
    "Investor Pitch Q&A Simulator", "Corporate Governance Reviewer", "Executive Headhunter Radar",
    "Bilingual Contract Translator", "Design System Audit Utility", "UX Usability Test Script Generator",
    "Micro-service Architecture Reviewer", "Product Analytics Event Planner", "SEO Content Localizer",
    "Freelance Escrow Payment Helper", "Tax & Guild Fee Estimator", "Startup Grant Opportunity Finder",
    "Academic Research Citation Builder", "Webinar Speaker Brief Creator", "Podcast Guest Pitch Builder",
    "Tech Guild Membership Checker", "Colleague Endorsement Generator", "Mentorship Session Recorder",
    "Salary Review Presentation Builder", "Probation Evaluation Checklist", "Cross-department Collaboration Map",
    "Diversity & Inclusion Indexer", "Employee Offboarding Checklist", "Vendor SLA Evaluator",
    "Patent & IP Claim Documenter", "Security Compliance Certifier", "Tech Stack Migration Planner",
    "Public Relations Crisis Drafter", "Product Launch Press Release", "Community Guidelines Moderator",
    "Substack & Newsletter Architect", "Podcast Script Writer", "Figma Design Token Converter",
    "API Spec Documentation Builder", "Database Schema Reviewer", "Docker Infrastructure Helper",
    "Kubernetes Deployment Checklist", "Agile Sprint Retrospective Helper", "Jira Case Sync Utility",
    "Notion Workplace Documentation Sync", "Slack Action Item Extractor", "Telegram Channel Cross-poster",
    "LinkedIn Cross-platform Mirror", "User Interview Script Generator", "Customer Journey Map Architect",
    "Churn Risk Early Warning", "Net Promoter Score Analyzer", "SaaS Pricing Tier Designer",
    "Freemium Conversion Predictor", "Customer Onboarding Sequence", "SLA Incident Response Drafter",
    "Privacy Policy Compliance Inspector", "GDPR Data Processing Agreement Builder", "Cookies & Consent Banner Designer"
  ];

  let currentId = tools.length + 1;
  additionalTitles.forEach((title, idx) => {
    const cat = categoriesList[idx % categoriesList.length];
    tools.push({
      id: `tool_gen_${currentId}`,
      name: title,
      shortDescription: `Specialized capability for ${title.toLowerCase()} within Hamrahe's professional operating layer.`,
      fullDescription: `Provides automated, explainable analysis and drafting for ${title.toLowerCase()}. Integrated with Hamrahe event streams, user consents, and role authorization rules.`,
      category: cat,
      supportedContexts: idx % 3 === 0 ? ["organization"] : idx % 3 === 1 ? ["startup"] : ["personal", "organization"],
      requiredInputs: ["Domain Data", "User Context"],
      authorizedDataSources: ["Hamrahe Data Layer"],
      outputType: "Structured Output Artifact",
      estimatedQuota: 10 + (idx % 20),
      sensitivityLevel: idx % 4 === 0 ? "high" : idx % 2 === 0 ? "medium" : "low",
      approvalRequired: idx % 2 === 0,
      externalActionPossible: idx % 5 === 0,
      isSaved: idx % 7 === 0,
      isRecent: idx % 9 === 0,
      planRequired: idx % 6 === 0 ? "Enterprise" : idx % 3 === 0 ? "Pro" : "Free",
    });
    currentId++;
  });

  return tools;
}

export const mockTools: ToolDefinition[] = generate180Tools();
