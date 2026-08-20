export type ReadinessStatus = "Not Started" | "Building" | "Improving" | "Ready" | "Strong";
export type CertStatus = "Not Eligible" | "In Progress" | "Eligible" | "Issued" | "Shared";

export interface CareerPath {
  id: string;
  title: string;
  tagline: string;
  description: string;
  recommendedReason: string;
  progress: number;
  readiness: number;
  status: ReadinessStatus;
  currentPhase: "Foundation" | "Practice & Execution" | "Readiness & Opportunity";
  practiceCount: number;
  assessmentCount: number;
  hasFinalProject: boolean;
  relatedJobs: number;
  relatedCompanies: number;
  partnerEligible: boolean;
  aiNative: boolean;
  outcomes: string[];
  color: string;
  iconBg: string;
  iconColor: string;
}

export interface AssessmentDef {
  id: string;
  title: string;
  type:
    | "Initial Diagnostic"
    | "Job-Required"
    | "Company-Requested"
    | "Career Readiness"
    | "AI Workflow"
    | "AI Output Critique"
    | "Role-Fit"
    | "Skill";
  relatedPathId?: string;
  description: string;
  skills: string[];
  aiSkills: string[];
  estimatedMinutes: number;
  privacy: "Private" | "Shared on Apply";
  status: "Not Started" | "In Progress" | "Completed";
  lastScore?: number;
  requestedBy?: { kind: "company" | "job"; name: string };
}

export interface AssessmentResult {
  assessmentId: string;
  score: number;
  status: ReadinessStatus;
  strengths: string[];
  gaps: string[];
  recommendedActions: { id: string; label: string; kind: "practice" | "path" | "assessment" | "critique"; targetId: string }[];
  readinessImpact: { label: string; delta: number }[];
}

export interface AIPractice {
  id: string;
  title: string;
  pathId: string;
  unitType: "Interactive Lesson" | "Scenario" | "Roleplay" | "Simulation" | "Critique" | "Prompt Practice";
  durationMin: number;
  difficulty: "Foundation" | "Practice" | "Advanced";
  skills: string[];
  description: string;
  recommended: boolean;
  completed: boolean;
}

export interface Certificate {
  id: string;
  title: string;
  pathId: string;
  type: "Completion" | "Verified Skill" | "AI-Augmented Role Readiness" | "Work-Ready" | "Partner-Eligible";
  status: CertStatus;
  requirements: { label: string; done: boolean }[];
  issuedDate?: string;
  visibility: "Private" | "Profile" | "Shared with Company";
}

export interface SkillGap {
  name: string;
  severity: "Critical" | "Moderate" | "Minor";
  aiNative: boolean;
  recommendedPractice?: string;
}

export interface WalletCredit {
  label: string;
  amount: number;
  kind: "earned" | "bonus" | "sponsored";
  date: string;
}

export interface PartnerOpportunity {
  id: string;
  company: string;
  role: string;
  level: "Internship" | "Junior" | "Entry-Level";
  matchScore: number;
  requirements: string[];
}

// ---------- DATA ----------

export const CAREER_PATHS: CareerPath[] = [
  {
    id: "product-designer",
    title: "Product Designer",
    tagline: "AI-native · Practice-first · Assessment-backed",
    description:
      "Master the new logic of product design in an AI-augmented world — from problem framing to AI output critique.",
    recommendedReason:
      "Your assessment shows strong visual reasoning and a medium UX research gap.",
    progress: 34,
    readiness: 56,
    status: "Improving",
    currentPhase: "Practice & Execution",
    practiceCount: 18,
    assessmentCount: 4,
    hasFinalProject: true,
    relatedJobs: 23,
    relatedCompanies: 11,
    partnerEligible: false,
    aiNative: true,
    outcomes: ["Skill Upgrade", "Job Readiness", "Certificate", "Talent Pool", "Partner Opportunities"],
    color: "from-violet-500 to-fuchsia-500",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
  {
    id: "product-manager",
    title: "Product Manager",
    tagline: "AI-native · Decision-first · Outcome-driven",
    description: "Lead product decisions with AI as a partner, not a replacement.",
    recommendedReason: "Strong analytical reasoning detected; AI workflow skill gap is medium.",
    progress: 12,
    readiness: 41,
    status: "Building",
    currentPhase: "Foundation",
    practiceCount: 14,
    assessmentCount: 3,
    hasFinalProject: true,
    relatedJobs: 31,
    relatedCompanies: 14,
    partnerEligible: false,
    aiNative: true,
    outcomes: ["Skill Upgrade", "Job Readiness", "Certificate"],
    color: "from-blue-500 to-cyan-500",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: "sales-bd",
    title: "Sales / Business Development",
    tagline: "AI-native · Conversation-first · Pipeline-driven",
    description: "Modern selling with AI-assisted research, outreach, and negotiation simulation.",
    recommendedReason: "Communication style assessment shows strong narrative skill.",
    progress: 0,
    readiness: 18,
    status: "Not Started",
    currentPhase: "Foundation",
    practiceCount: 12,
    assessmentCount: 3,
    hasFinalProject: false,
    relatedJobs: 27,
    relatedCompanies: 18,
    partnerEligible: false,
    aiNative: true,
    outcomes: ["Skill Upgrade", "Job Readiness"],
    color: "from-emerald-500 to-teal-500",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    id: "digital-marketer",
    title: "Digital Marketer",
    tagline: "AI-native · Channel-aware · Measurement-first",
    description: "Run growth experiments with AI-generated content critiqued by humans.",
    recommendedReason: "Content critique skills detected in your initial assessment.",
    progress: 0,
    readiness: 22,
    status: "Not Started",
    currentPhase: "Foundation",
    practiceCount: 16,
    assessmentCount: 3,
    hasFinalProject: true,
    relatedJobs: 19,
    relatedCompanies: 9,
    partnerEligible: false,
    aiNative: true,
    outcomes: ["Skill Upgrade", "Job Readiness", "Certificate"],
    color: "from-pink-500 to-rose-500",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
  },
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    tagline: "AI-native · Component-first · Quality-driven",
    description: "Ship with AI as a pair-programmer; review, refine, and own the quality bar.",
    recommendedReason: "Code reasoning score is solid; AI critique skill is medium.",
    progress: 0,
    readiness: 31,
    status: "Not Started",
    currentPhase: "Foundation",
    practiceCount: 22,
    assessmentCount: 4,
    hasFinalProject: true,
    relatedJobs: 42,
    relatedCompanies: 21,
    partnerEligible: false,
    aiNative: true,
    outcomes: ["Skill Upgrade", "Job Readiness", "Certificate", "Talent Pool"],
    color: "from-indigo-500 to-blue-500",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
  {
    id: "customer-success",
    title: "Customer Success",
    tagline: "AI-native · Relationship-first · Retention-driven",
    description: "Combine empathy with AI-powered insight to keep customers thriving.",
    recommendedReason: "High empathic reasoning detected in communication assessment.",
    progress: 0,
    readiness: 14,
    status: "Not Started",
    currentPhase: "Foundation",
    practiceCount: 10,
    assessmentCount: 2,
    hasFinalProject: false,
    relatedJobs: 12,
    relatedCompanies: 7,
    partnerEligible: false,
    aiNative: true,
    outcomes: ["Skill Upgrade", "Job Readiness"],
    color: "from-amber-500 to-orange-500",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
];

export const ASSESSMENTS: AssessmentDef[] = [
  {
    id: "initial-diagnostic",
    title: "Initial Diagnostic Assessment",
    type: "Initial Diagnostic",
    description:
      "Measures your role logic, foundational skills, AI working ability, AI output critique, and career path readiness.",
    skills: ["Role Logic", "Foundational Skills", "Career Readiness"],
    aiSkills: ["AI Working Ability", "AI Output Critique"],
    estimatedMinutes: 22,
    privacy: "Private",
    status: "Completed",
    lastScore: 64,
  },
  {
    id: "pd-readiness",
    title: "Product Designer Readiness Assessment",
    type: "Career Readiness",
    relatedPathId: "product-designer",
    description:
      "Measures your current level in design logic, AI output critique, human judgment, and readiness to enter the Product Designer path.",
    skills: ["Design Logic", "Human Judgment", "UI Reasoning"],
    aiSkills: ["AI Output Critique", "AI-Assisted Ideation"],
    estimatedMinutes: 28,
    privacy: "Private",
    status: "In Progress",
  },
  {
    id: "ai-ui-critique",
    title: "AI-Generated UI Critique Assessment",
    type: "AI Output Critique",
    relatedPathId: "product-designer",
    description:
      "Tests how well you critique AI-generated UI outputs across hierarchy, accessibility, trust, and conversion.",
    skills: ["Critique Reasoning", "Accessibility Judgment", "Trust Signals"],
    aiSkills: ["AI Output Critique", "Refinement"],
    estimatedMinutes: 18,
    privacy: "Private",
    status: "Completed",
    lastScore: 68,
  },
  {
    id: "design-thinking",
    title: "Design Thinking Assessment",
    type: "Job-Required",
    relatedPathId: "product-designer",
    description:
      "Required for Junior Product Designer roles. Evaluates problem framing, user empathy, and decision rationale.",
    skills: ["Problem Framing", "Empathy", "Decision Logic"],
    aiSkills: ["AI-Augmented Ideation"],
    estimatedMinutes: 25,
    privacy: "Shared on Apply",
    status: "Not Started",
    requestedBy: { kind: "job", name: "Junior Product Designer · Snapp" },
  },
  {
    id: "ai-workflow",
    title: "AI Workflow Assessment",
    type: "AI Workflow",
    description:
      "Evaluates how effectively you integrate AI into a real product workflow without losing human judgment.",
    skills: ["Workflow Design", "Quality Control"],
    aiSkills: ["Prompting", "AI Integration", "Output Refinement"],
    estimatedMinutes: 20,
    privacy: "Private",
    status: "Not Started",
  },
  {
    id: "communication-style",
    title: "Communication Style Assessment",
    type: "Role-Fit",
    relatedPathId: "sales-bd",
    description: "Measures clarity, narrative structure, listening, and adaptive tone in sales conversations.",
    skills: ["Clarity", "Narrative", "Listening"],
    aiSkills: ["AI-Assisted Account Research"],
    estimatedMinutes: 16,
    privacy: "Private",
    status: "Not Started",
  },
];

export const ASSESSMENT_RESULTS: Record<string, AssessmentResult> = {
  "ai-ui-critique": {
    assessmentId: "ai-ui-critique",
    score: 68,
    status: "Improving",
    strengths: [
      "Good recognition of visual hierarchy",
      "Clear articulation of design decisions",
      "Ability to critique overall structure",
    ],
    gaps: ["Accessibility Judgment", "Error State Design", "Form Usability", "Trust Signals"],
    recommendedActions: [
      { id: "ra-1", label: "Start Accessibility Basics", kind: "practice", targetId: "accessibility-basics" },
      { id: "ra-2", label: "Complete Login Form Critique Practice", kind: "critique", targetId: "login-critique" },
      { id: "ra-3", label: "Continue Product Designer · Practice & Execution", kind: "path", targetId: "product-designer" },
      { id: "ra-4", label: "Re-assess after 3 practices", kind: "assessment", targetId: "ai-ui-critique" },
    ],
    readinessImpact: [
      { label: "UI Reasoning", delta: 5 },
      { label: "AI-Assisted Design", delta: 4 },
      { label: "Product Designer Readiness", delta: 3 },
      { label: "Application Readiness · 2 saved jobs", delta: 4 },
    ],
  },
  "initial-diagnostic": {
    assessmentId: "initial-diagnostic",
    score: 64,
    status: "Improving",
    strengths: ["Strong analytical reasoning", "Clear communication", "Good visual judgment"],
    gaps: ["AI Output Critique", "Prompting Discipline", "Accessibility Judgment"],
    recommendedActions: [
      { id: "ra-1", label: "Explore Product Designer Path", kind: "path", targetId: "product-designer" },
      { id: "ra-2", label: "Try AI Output Critique Practice", kind: "critique", targetId: "login-critique" },
    ],
    readinessImpact: [
      { label: "Career Readiness", delta: 6 },
      { label: "AI Working Ability", delta: 3 },
    ],
  },
};

export const AI_PRACTICES: AIPractice[] = [
  {
    id: "login-design",
    title: "Designing a Login Page with AI",
    pathId: "product-designer",
    unitType: "Interactive Lesson",
    durationMin: 18,
    difficulty: "Practice",
    skills: ["UI Reasoning", "AI Output Critique", "Refinement"],
    description: "Use AI to generate login layouts, critique outputs across 8 dimensions, and revise.",
    recommended: true,
    completed: false,
  },
  {
    id: "login-critique",
    title: "Login Form Critique Practice",
    pathId: "product-designer",
    unitType: "Critique",
    durationMin: 12,
    difficulty: "Practice",
    skills: ["Critique Reasoning", "Accessibility Judgment", "Form Usability"],
    description: "Critique an AI-generated login form across hierarchy, accessibility, error states, trust, and brand.",
    recommended: true,
    completed: false,
  },
  {
    id: "accessibility-basics",
    title: "Accessibility Basics",
    pathId: "product-designer",
    unitType: "Interactive Lesson",
    durationMin: 22,
    difficulty: "Foundation",
    skills: ["Accessibility", "Inclusive Design"],
    description: "Foundational accessibility judgment for UI work.",
    recommended: true,
    completed: false,
  },
  {
    id: "design-roleplay",
    title: "Design Critique with PM (Roleplay)",
    pathId: "product-designer",
    unitType: "Roleplay",
    durationMin: 20,
    difficulty: "Advanced",
    skills: ["Communication", "Decision Logic"],
    description: "Defend your design decisions in a simulated PM critique session.",
    recommended: false,
    completed: false,
  },
  {
    id: "ai-research",
    title: "AI-Assisted Account Research",
    pathId: "sales-bd",
    unitType: "Scenario",
    durationMin: 15,
    difficulty: "Practice",
    skills: ["Research", "Synthesis"],
    description: "Use AI to research accounts; critique its output and decide what to trust.",
    recommended: false,
    completed: false,
  },
  {
    id: "negotiation-roleplay",
    title: "Negotiation AI Roleplay",
    pathId: "sales-bd",
    unitType: "Roleplay",
    durationMin: 25,
    difficulty: "Advanced",
    skills: ["Negotiation", "Adaptive Tone"],
    description: "Simulate a real negotiation with an AI counterpart; receive feedback on tactics.",
    recommended: false,
    completed: false,
  },
];

export const CERTIFICATES: Certificate[] = [
  {
    id: "cert-ui-ai-readiness",
    title: "AI-Augmented UI Design Readiness",
    pathId: "product-designer",
    type: "AI-Augmented Role Readiness",
    status: "In Progress",
    requirements: [
      { label: "Assessment completed", done: true },
      { label: "AI Learning units complete (6/8)", done: false },
      { label: "Practice completion (3/5)", done: false },
      { label: "AI output critique attempts (2/3)", done: false },
      { label: "Work simulation", done: false },
      { label: "Final project / work sample", done: false },
      { label: "AI or human review", done: false },
      { label: "Profile readiness ≥ 70%", done: false },
    ],
    visibility: "Private",
  },
  {
    id: "cert-foundation-pd",
    title: "Product Design Foundation Completion",
    pathId: "product-designer",
    type: "Completion",
    status: "Eligible",
    requirements: [
      { label: "Foundation phase complete", done: true },
      { label: "Foundation assessment passed", done: true },
    ],
    visibility: "Private",
  },
  {
    id: "cert-ai-critique",
    title: "Verified Skill · AI Output Critique",
    pathId: "product-designer",
    type: "Verified Skill",
    status: "Not Eligible",
    requirements: [
      { label: "Critique practice ≥ 5 sessions", done: false },
      { label: "AI critique assessment ≥ 80%", done: false },
    ],
    visibility: "Private",
  },
  {
    id: "cert-work-ready-pd",
    title: "Work-Ready Product Designer",
    pathId: "product-designer",
    type: "Work-Ready",
    status: "Not Eligible",
    requirements: [
      { label: "All phase certificates", done: false },
      { label: "Portfolio case study", done: false },
      { label: "Application readiness ≥ 80%", done: false },
    ],
    visibility: "Private",
  },
  {
    id: "cert-partner-pd",
    title: "Partner-Eligible Product Designer",
    pathId: "product-designer",
    type: "Partner-Eligible",
    status: "Not Eligible",
    requirements: [
      { label: "Work-Ready certificate issued", done: false },
      { label: "Consent for partner sharing", done: false },
    ],
    visibility: "Private",
  },
];

export const SKILL_GAPS: SkillGap[] = [
  { name: "Accessibility Judgment", severity: "Critical", aiNative: false, recommendedPractice: "accessibility-basics" },
  { name: "Error State Design", severity: "Moderate", aiNative: false, recommendedPractice: "login-critique" },
  { name: "Form Usability", severity: "Moderate", aiNative: false, recommendedPractice: "login-critique" },
  { name: "Trust Signals", severity: "Minor", aiNative: false },
  { name: "AI Output Refinement", severity: "Moderate", aiNative: true, recommendedPractice: "login-design" },
  { name: "Prompting for Layout Options", severity: "Minor", aiNative: true, recommendedPractice: "login-design" },
];

export const READINESS_SCORES = {
  productDesigner: 56,
  applicationReadiness: 48,
  partnerEligibility: 22,
  uiReasoning: 64,
  aiAssistedDesign: 52,
  humanJudgment: 71,
};

export const WALLET = {
  balance: 1240,
  welcomeCredits: 500,
  history: [
    { label: "Welcome Credits", amount: 500, kind: "bonus" as const, date: "Apr 2" },
    { label: "Practice completion · Login Critique", amount: 80, kind: "earned" as const, date: "Apr 18" },
    { label: "Revision reward · UI Critique", amount: 40, kind: "earned" as const, date: "Apr 19" },
    { label: "Assessment retake · AI UI Critique", amount: -120, kind: "earned" as const, date: "Apr 21" },
    { label: "Snapp sponsored credits", amount: 300, kind: "sponsored" as const, date: "May 2" },
    { label: "Referral · Reza Mohammadi", amount: 100, kind: "bonus" as const, date: "May 5" },
    { label: "Practice completion · Accessibility Basics", amount: 80, kind: "earned" as const, date: "May 10" },
    { label: "Assessment attempt · Design Thinking", amount: -120, kind: "earned" as const, date: "May 19" },
    { label: "Certificate discount applied", amount: 380, kind: "bonus" as const, date: "May 22" },
  ] as WalletCredit[],
};

export const PARTNER_OPPORTUNITIES: PartnerOpportunity[] = [
  {
    id: "po-1",
    company: "Snapp",
    role: "Junior Product Designer",
    level: "Junior",
    matchScore: 78,
    requirements: ["Work-Ready certificate", "Portfolio case study", "Design Thinking assessment"],
  },
  {
    id: "po-2",
    company: "Cafe Bazaar",
    role: "Design Intern",
    level: "Internship",
    matchScore: 71,
    requirements: ["Foundation certificate", "AI critique practice ×3"],
  },
  {
    id: "po-3",
    company: "Tapsi",
    role: "Entry-Level UX Designer",
    level: "Entry-Level",
    matchScore: 64,
    requirements: ["Partner-Eligible certificate", "Portfolio review"],
  },
];

export const LEARNING_NOTIFICATIONS = [
  { id: "ln-1", icon: "company", title: "Snapp requested an assessment", body: "Design Thinking Assessment · required for Junior Product Designer", time: "2h ago", action: "Start Assessment", targetId: "design-thinking" },
  { id: "ln-2", icon: "ai", title: "Your AI review is ready", body: "Login Critique Practice · feedback and rubric score available", time: "5h ago", action: "View Review", targetId: "login-critique" },
  { id: "ln-3", icon: "assessment", title: "Recommended AI practice", body: "Your last assessment suggests Login Form Critique Practice", time: "1d ago", action: "Start Practice", targetId: "login-critique" },
  { id: "ln-4", icon: "partner", title: "You may be eligible for partner opportunities", body: "Complete Work-Ready certificate to unlock 3 partner roles", time: "2d ago", action: "View Requirements", targetId: "cert-work-ready-pd" },
  { id: "ln-5", icon: "cert", title: "Your certificate is ready", body: "Product Design Foundation Completion · ready to issue", time: "3d ago", action: "Issue Certificate", targetId: "cert-foundation-pd" },
  { id: "ln-6", icon: "job", title: "A saved job now matches your assessment", body: "Junior Product Designer · Snapp · match raised to 82%", time: "3d ago", action: "View Job", targetId: "job-1" },
  { id: "ln-7", icon: "company", title: "A company viewed your shared certificate", body: "Cafe Bazaar viewed your Foundation certificate", time: "4d ago", action: "View Activity", targetId: "company-bazaar" },
];

export const COMPANY_REQUIRED = {
  // Snapp's requirements for Product Design hires
  recommendedPaths: ["product-designer"],
  requiredAssessments: ["design-thinking", "pd-readiness"],
  recommendedPractices: ["login-critique", "login-design"],
  aiSkills: ["AI Output Critique", "Prompt Discipline", "Human Judgment in Design"],
  journey: [
    { label: "Explore company", done: true },
    { label: "Check your match", done: true },
    { label: "Complete required assessment", done: false },
    { label: "Finish recommended AI practice", done: false },
    { label: "Submit work sample", done: false },
    { label: "Apply to matching role", done: false },
    { label: "Join Talent Pool if no role fits", done: false },
  ],
};

export const ROLE_LOGIC_PD = [
  "Understand the user's problem",
  "Design the structure of the experience",
  "Make design decisions",
  "Evaluate UI quality",
  "Explain decisions",
];

export const AI_LITERACY_PD = [
  { q: "What does AI speed up?", a: "Layout exploration, variation generation, copy drafts, pattern recall." },
  { q: "Where does human judgment remain essential?", a: "Problem framing, ethics, accessibility, brand fit, trust." },
  { q: "Common AI output errors?", a: "Generic patterns, fake trust, accessibility blind spots, weak error states." },
  { q: "How to critique AI output?", a: "Use a rubric: hierarchy, clarity, accessibility, errors, trust, conversion, brand, usability." },
];

export const TRADITIONAL_SKILLS_PD = [
  "UI Structure",
  "Visual Hierarchy",
  "Usability",
  "Accessibility",
  "Design System Thinking",
];

export const AI_NATIVE_SKILLS_PD = [
  "AI-Assisted Ideation",
  "AI-Generated UI Critique",
  "Prompting for Layout Options",
  "AI Output Refinement",
  "Human Judgment",
  "Design Decision Explanation",
];

export const PHASES_PD = {
  Foundation: [
    "What is UI Design?",
    "What has AI changed in UI Design?",
    "Visual hierarchy logic",
    "Usability basics",
    "Accessibility basics",
    "AI-assisted layout exploration",
  ],
  "Practice & Execution": [
    "Generate layout options with AI",
    "Critique AI-generated UI",
    "Improve hierarchy",
    "Simulate design critique with PM",
    "Explain design decisions",
  ],
  "Readiness & Opportunity": [
    "Final project",
    "Portfolio case study",
    "AI Workflow Assessment",
    "Portfolio Review",
    "Certificate",
    "Talent Pool eligibility",
    "Optional partner introduction",
  ],
};

export const CRITIQUE_CHECKLIST = [
  "Hierarchy",
  "Clarity",
  "Accessibility",
  "Error states",
  "Trust",
  "Conversion",
  "Brand consistency",
  "Usability",
];

export function getPath(id: string) {
  return CAREER_PATHS.find((p) => p.id === id);
}
export function getAssessment(id: string) {
  return ASSESSMENTS.find((a) => a.id === id);
}
export function getPractice(id: string) {
  return AI_PRACTICES.find((p) => p.id === id);
}
export function getCertificate(id: string) {
  return CERTIFICATES.find((c) => c.id === id);
}
