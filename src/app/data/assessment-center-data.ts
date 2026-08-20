// Assessment Center - standalone module for personality, behavioral, cognitive, and soft skills assessments
// Distinct from Learning module's career-path assessments

export type AssessmentFamily =
  | "Personality & Psychology"
  | "Work Style & Behavior"
  | "Career Interest & Direction"
  | "Cognitive & Aptitude"
  | "Emotional & Social Intelligence"
  | "Communication & Soft Skills"
  | "Hiring & Work Readiness"
  | "General AI Readiness"
  | "Language & International Readiness"
  | "Leadership & Management"
  | "Team & Employee Development"
  | "Work Wellbeing"
  | "Profile & Career Presentation";

export type TimedMode = "Untimed" | "Soft Timed" | "Strict Timed";

export type QualityStatus =
  | "Draft"
  | "Structure Ready"
  | "Questions Ready"
  | "Scoring Ready"
  | "Report Ready"
  | "Pilot Tested"
  | "Published"
  | "Archived";

export type AttemptStatus =
  | "Not Started"
  | "Ready to Start"
  | "Requested by Company"
  | "In Progress"
  | "Paused"
  | "Submitted"
  | "Auto-submitted"
  | "Expired"
  | "Abandoned"
  | "Completed"
  | "Retake Available";

export type VisibilityLevel =
  | "Only Me"
  | "Show Summary in Profile"
  | "Share with Selected Company"
  | "Share Only During Application"
  | "Time-limited Link";

export interface DimensionScore {
  name: string;
  label: string;
  score: number; // 0–100
  description: string;
  dominance?: string; // e.g. "High" | "Moderate" | "Low" or type label like "I" for MBTI
}

export interface SampleQuestion {
  id: string;
  type: "preference" | "likert" | "ranking" | "multiple_choice";
  text: string;
  options: string[];
  instruction?: string;
}

export interface AssessmentCenterItem {
  id: string;
  name: string;
  displayName: string;
  family: AssessmentFamily;
  familyShort: string;
  description: string;
  primaryUseCase: string;
  usageLabels: string[];
  estimatedMinutes: number;
  timeLimit: number;
  timedMode: TimedMode;
  countdownEnabled: boolean;
  autoSubmit: boolean;
  pauseAllowed: boolean;
  resumePolicy: string;
  retakeRule: string;
  validityPeriod: string;
  dimensions: string[];
  dimensionCount: number;
  questionCount: number;
  isLaunchBatch: boolean;
  launchPriority?: number;
  launchReason?: string;
  qualityStatus: QualityStatus;
  canCompanyRequest: boolean;
  sensitivityLevel: "Standard" | "Sensitive";
  sampleQuestions: SampleQuestion[];
  color: string;
  iconLabel: string;
}

export interface UserAssessmentAttempt {
  id: string;
  userId: string;
  assessmentId: string;
  status: AttemptStatus;
  startedAt?: string;
  submittedAt?: string;
  expiresAt?: string;
  timeLimitMinutes: number;
  estimatedDurationMinutes: number;
  timeSpentSeconds?: number;
  remainingTimeSeconds?: number;
  countdownEnabled: boolean;
  autoSubmitEnabled: boolean;
  autoSubmitted?: boolean;
  pauseAllowed: boolean;
  pausedAt?: string;
  resumeCount?: number;
  resumeDeadline?: string;
  requestedByCompany?: { id: string; name: string; deadline: string; purpose: string };
  scoreStatus?: "Pending" | "Scored";
  reportStatus?: "Not Generated" | "Generated";
  createdAt: string;
}

export interface AssessmentCenterResult {
  assessmentId: string;
  attemptId: string;
  completedAt: string;
  durationMinutes: number;
  submissionType: "User Submitted" | "Auto-submitted";
  timedMode: TimedMode;
  assessmentVersion: string;
  validUntil: string;
  overallProfile: string;
  overallLabel: string;
  dimensionScores: DimensionScore[];
  executiveSummary: string;
  strengths: string[];
  developmentAreas: string[];
  workplaceMeaning: string[];
  interviewTips?: string[];
  recommendedAssessments: string[];
  reportId: string;
  verificationCode: string;
  visibility: VisibilityLevel;
  sharedWith: { type: "company" | "link"; name?: string; sharedAt: string; expiresAt?: string }[];
}

// ─── Launch Batch: 10 Assessments ───────────────────────────────────────────

export const ASSESSMENT_CENTER_ITEMS: AssessmentCenterItem[] = [
  {
    id: "mbti",
    name: "Myers-Briggs Type Indicator",
    displayName: "MBTI",
    family: "Personality & Psychology",
    familyShort: "Personality",
    description:
      "Discover your personality type across four dimensions: how you gain energy, process information, make decisions, and organize your life. Widely recognized across industries for team building, career guidance, and self-awareness.",
    primaryUseCase: "Self-awareness & Career Guidance",
    usageLabels: ["Self-awareness", "Career guidance", "Team building", "International report available"],
    estimatedMinutes: 20,
    timeLimit: 30,
    timedMode: "Soft Timed",
    countdownEnabled: false,
    autoSubmit: false,
    pauseAllowed: true,
    resumePolicy: "Within 24 hours",
    retakeRule: "After 6 months",
    validityPeriod: "2 years",
    dimensions: ["Extraversion / Introversion", "Sensing / Intuition", "Thinking / Feeling", "Judging / Perceiving"],
    dimensionCount: 4,
    questionCount: 70,
    isLaunchBatch: true,
    launchPriority: 1,
    launchReason: "Most globally recognized personality framework. High market familiarity. Strong profile value and company understanding.",
    qualityStatus: "Pilot Tested",
    canCompanyRequest: true,
    sensitivityLevel: "Standard",
    color: "from-violet-500 to-purple-600",
    iconLabel: "MB",
    sampleQuestions: [
      {
        id: "mbti-1",
        type: "preference",
        text: "At a party or social gathering, you tend to:",
        options: ["Stay close to familiar people and leave early", "Meet as many new people as possible"],
        instruction: "Choose the option that feels most natural to you",
      },
      {
        id: "mbti-2",
        type: "preference",
        text: "When making a decision, you rely more on:",
        options: ["Logic and objective analysis", "Personal values and how it affects people"],
      },
      {
        id: "mbti-3",
        type: "preference",
        text: "You prefer working on:",
        options: ["A well-organized schedule with clear steps", "A flexible approach that adapts as you go"],
      },
      {
        id: "mbti-4",
        type: "preference",
        text: "When learning something new, you prefer:",
        options: ["Concrete facts and real-world examples", "Theories, concepts, and big-picture patterns"],
      },
    ],
  },
  {
    id: "disc",
    name: "DISC Behavioral Assessment",
    displayName: "DISC",
    family: "Work Style & Behavior",
    familyShort: "Work Style",
    description:
      "Understand your behavioral style across four dimensions: Dominance, Influence, Steadiness, and Conscientiousness. Highly valued in hiring, team dynamics, and management development.",
    primaryUseCase: "Hiring Support & Team Dynamics",
    usageLabels: ["Self-awareness", "Hiring support", "Team building", "Company-requested"],
    estimatedMinutes: 15,
    timeLimit: 25,
    timedMode: "Soft Timed",
    countdownEnabled: false,
    autoSubmit: false,
    pauseAllowed: true,
    resumePolicy: "Within 24 hours",
    retakeRule: "After 6 months",
    validityPeriod: "2 years",
    dimensions: ["Dominance (D)", "Influence (I)", "Steadiness (S)", "Conscientiousness (C)"],
    dimensionCount: 4,
    questionCount: 28,
    isLaunchBatch: true,
    launchPriority: 2,
    launchReason: "Leading behavioral assessment in corporate hiring. High company familiarity. Critical for team composition and role fit.",
    qualityStatus: "Pilot Tested",
    canCompanyRequest: true,
    sensitivityLevel: "Standard",
    color: "from-blue-500 to-cyan-500",
    iconLabel: "DI",
    sampleQuestions: [
      {
        id: "disc-1",
        type: "ranking",
        text: "Rank these four words from most like you (1) to least like you (4):",
        options: ["Results-oriented", "Enthusiastic", "Patient", "Accurate"],
        instruction: "Choose the one that best describes you at work",
      },
      {
        id: "disc-2",
        type: "preference",
        text: "When facing a problem at work, you are most likely to:",
        options: ["Take charge and act decisively", "Analyze data carefully before moving forward"],
      },
      {
        id: "disc-3",
        type: "preference",
        text: "In a team setting, others would describe you as:",
        options: ["Energetic and persuasive", "Reliable and methodical"],
      },
      {
        id: "disc-4",
        type: "preference",
        text: "When given a new project, you prefer to:",
        options: ["Set the direction and delegate", "Ensure everything is done correctly and on time"],
      },
    ],
  },
  {
    id: "big-five",
    name: "Big Five Personality Assessment",
    displayName: "Big Five",
    family: "Personality & Psychology",
    familyShort: "Personality",
    description:
      "The most scientifically validated personality model. Measures five core dimensions: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism (OCEAN). Widely used in organizational psychology and research.",
    primaryUseCase: "Scientific Self-assessment & Career Guidance",
    usageLabels: ["Self-awareness", "Career guidance", "Employee development", "International report available"],
    estimatedMinutes: 20,
    timeLimit: 30,
    timedMode: "Soft Timed",
    countdownEnabled: false,
    autoSubmit: false,
    pauseAllowed: true,
    resumePolicy: "Within 24 hours",
    retakeRule: "After 6 months",
    validityPeriod: "2 years",
    dimensions: ["Openness to Experience", "Conscientiousness", "Extraversion", "Agreeableness", "Neuroticism"],
    dimensionCount: 5,
    questionCount: 60,
    isLaunchBatch: true,
    launchPriority: 3,
    launchReason: "Most scientifically validated personality model. Strong academic and HR credibility. Complements MBTI for profile depth.",
    qualityStatus: "Structure Ready",
    canCompanyRequest: true,
    sensitivityLevel: "Standard",
    color: "from-emerald-500 to-teal-500",
    iconLabel: "B5",
    sampleQuestions: [
      {
        id: "bf-1",
        type: "likert",
        text: "I enjoy exploring new ideas and abstract concepts.",
        options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
        instruction: "Rate how accurately this statement describes you",
      },
      {
        id: "bf-2",
        type: "likert",
        text: "I always complete tasks on time and keep things organized.",
        options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
      },
      {
        id: "bf-3",
        type: "likert",
        text: "I find it easy to make new friends and enjoy meeting people.",
        options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
      },
      {
        id: "bf-4",
        type: "likert",
        text: "I tend to worry about things and experience stress easily.",
        options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
      },
    ],
  },
  {
    id: "holland",
    name: "Holland Occupational Themes (RIASEC)",
    displayName: "Holland / RIASEC",
    family: "Career Interest & Direction",
    familyShort: "Career Interest",
    description:
      "Identify your career interest profile across six types: Realistic, Investigative, Artistic, Social, Enterprising, and Conventional. Helps align career decisions with natural interests and work preferences.",
    primaryUseCase: "Career Direction & Job Fit",
    usageLabels: ["Career guidance", "Self-awareness", "International report available"],
    estimatedMinutes: 18,
    timeLimit: 25,
    timedMode: "Soft Timed",
    countdownEnabled: false,
    autoSubmit: false,
    pauseAllowed: true,
    resumePolicy: "Within 24 hours",
    retakeRule: "After 12 months",
    validityPeriod: "2 years",
    dimensions: ["Realistic (R)", "Investigative (I)", "Artistic (A)", "Social (S)", "Enterprising (E)", "Conventional (C)"],
    dimensionCount: 6,
    questionCount: 48,
    isLaunchBatch: true,
    launchPriority: 4,
    launchReason: "Foundational career interest model. Strong career guidance value. Widely used in job counseling and educational settings.",
    qualityStatus: "Structure Ready",
    canCompanyRequest: false,
    sensitivityLevel: "Standard",
    color: "from-amber-500 to-orange-500",
    iconLabel: "RI",
    sampleQuestions: [
      {
        id: "hol-1",
        type: "preference",
        text: "Which activity would you find most fulfilling?",
        options: ["Building or repairing physical things", "Conducting research and analyzing data"],
      },
      {
        id: "hol-2",
        type: "preference",
        text: "In your ideal job, you would:",
        options: ["Lead and influence others toward a goal", "Follow clear processes and maintain accurate records"],
      },
      {
        id: "hol-3",
        type: "preference",
        text: "Which role would you most enjoy?",
        options: ["Creative director developing new ideas", "Social worker helping individuals with challenges"],
      },
      {
        id: "hol-4",
        type: "preference",
        text: "You feel most energized when:",
        options: ["Working with tools, machines, or technology", "Expressing yourself through art, design, or writing"],
      },
    ],
  },
  {
    id: "work-style",
    name: "Work Style Assessment",
    displayName: "Work Style",
    family: "Work Style & Behavior",
    familyShort: "Work Style",
    description:
      "Understand how you work best — your collaboration preferences, structure needs, feedback style, and productivity patterns. Valuable for remote teams, onboarding, and personal development.",
    primaryUseCase: "Employee Development & Team Integration",
    usageLabels: ["Self-awareness", "Employee development", "Hiring support", "Company-requested"],
    estimatedMinutes: 12,
    timeLimit: 20,
    timedMode: "Soft Timed",
    countdownEnabled: false,
    autoSubmit: false,
    pauseAllowed: true,
    resumePolicy: "Within 24 hours",
    retakeRule: "After 6 months",
    validityPeriod: "18 months",
    dimensions: ["Autonomy vs Collaboration", "Structure vs Flexibility", "Fast vs Deliberate", "Feedback Style", "Productivity Environment"],
    dimensionCount: 5,
    questionCount: 36,
    isLaunchBatch: true,
    launchPriority: 5,
    launchReason: "High relevance for remote and hybrid teams. Strong onboarding and employee development value. Directly requested by companies.",
    qualityStatus: "Pilot Tested",
    canCompanyRequest: true,
    sensitivityLevel: "Standard",
    color: "from-sky-500 to-blue-500",
    iconLabel: "WS",
    sampleQuestions: [
      {
        id: "ws-1",
        type: "likert",
        text: "I prefer to work independently with minimal check-ins from my manager.",
        options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
        instruction: "Rate how accurately this describes your work preferences",
      },
      {
        id: "ws-2",
        type: "preference",
        text: "When starting a new project, you prefer:",
        options: ["A clear, step-by-step plan before beginning", "Jumping in and figuring things out as you go"],
      },
      {
        id: "ws-3",
        type: "likert",
        text: "I do my best work when I have deadlines and structure.",
        options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
      },
      {
        id: "ws-4",
        type: "preference",
        text: "When receiving feedback, you prefer:",
        options: ["Immediate, direct comments even if critical", "Thoughtful, balanced feedback in a private setting"],
      },
    ],
  },
  {
    id: "communication-style",
    name: "Communication Style Assessment",
    displayName: "Communication Style",
    family: "Communication & Soft Skills",
    familyShort: "Communication",
    description:
      "Identify your primary communication style and understand how you express ideas, handle conflict, and collaborate with others. Critical for team roles, leadership, and client-facing positions.",
    primaryUseCase: "Communication & Collaboration",
    usageLabels: ["Self-awareness", "Hiring support", "Team building", "Company-requested"],
    estimatedMinutes: 12,
    timeLimit: 20,
    timedMode: "Soft Timed",
    countdownEnabled: false,
    autoSubmit: false,
    pauseAllowed: true,
    resumePolicy: "Within 24 hours",
    retakeRule: "After 6 months",
    validityPeriod: "18 months",
    dimensions: ["Assertiveness", "Expressiveness", "Analytical Depth", "Empathy & Listening", "Conflict Handling"],
    dimensionCount: 5,
    questionCount: 32,
    isLaunchBatch: true,
    launchPriority: 6,
    launchReason: "Essential for team-based and client-facing roles. Strong company demand. Complements DISC for work behavior profile.",
    qualityStatus: "Pilot Tested",
    canCompanyRequest: true,
    sensitivityLevel: "Standard",
    color: "from-fuchsia-500 to-pink-500",
    iconLabel: "CS",
    sampleQuestions: [
      {
        id: "cs-1",
        type: "preference",
        text: "When there's a disagreement in a meeting, you typically:",
        options: ["Address it directly and state your position clearly", "Listen carefully before offering a compromise"],
      },
      {
        id: "cs-2",
        type: "likert",
        text: "I am comfortable presenting ideas to a large audience.",
        options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
        instruction: "Rate how accurately this describes you",
      },
      {
        id: "cs-3",
        type: "preference",
        text: "When explaining a complex topic, you prefer to:",
        options: ["Use data, facts, and logical structure", "Use stories, examples, and emotional context"],
      },
      {
        id: "cs-4",
        type: "likert",
        text: "I tend to ask clarifying questions before responding to requests.",
        options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
      },
    ],
  },
  {
    id: "eq",
    name: "Emotional Intelligence Assessment",
    displayName: "Emotional Intelligence",
    family: "Emotional & Social Intelligence",
    familyShort: "Emotional Intelligence",
    description:
      "Measure your ability to understand, manage, and use emotions effectively. Covers self-awareness, self-regulation, motivation, empathy, and social skills. Strongly linked to leadership and team performance.",
    primaryUseCase: "Leadership Development & Interpersonal Effectiveness",
    usageLabels: ["Self-awareness", "Employee development", "Hiring support"],
    estimatedMinutes: 25,
    timeLimit: 35,
    timedMode: "Soft Timed",
    countdownEnabled: false,
    autoSubmit: false,
    pauseAllowed: true,
    resumePolicy: "Within 24 hours",
    retakeRule: "After 6 months",
    validityPeriod: "18 months",
    dimensions: ["Self-Awareness", "Self-Regulation", "Motivation", "Empathy", "Social Skills"],
    dimensionCount: 5,
    questionCount: 55,
    isLaunchBatch: true,
    launchPriority: 7,
    launchReason: "Critical for leadership and management roles. High demand in hiring. Complements personality assessments for behavioral depth.",
    qualityStatus: "Structure Ready",
    canCompanyRequest: true,
    sensitivityLevel: "Standard",
    color: "from-rose-500 to-red-500",
    iconLabel: "EQ",
    sampleQuestions: [
      {
        id: "eq-1",
        type: "likert",
        text: "I can recognize when my emotions are affecting my decision-making.",
        options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
        instruction: "Rate how accurately this describes you",
      },
      {
        id: "eq-2",
        type: "likert",
        text: "When someone is upset, I can usually understand why they feel that way.",
        options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
      },
      {
        id: "eq-3",
        type: "preference",
        text: "After a frustrating setback at work, you typically:",
        options: ["Take a moment to process before responding", "Address the issue immediately while the feelings are fresh"],
      },
      {
        id: "eq-4",
        type: "likert",
        text: "I stay motivated and focused on goals even when facing obstacles.",
        options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
      },
    ],
  },
  {
    id: "ai-readiness",
    name: "General AI Readiness Assessment",
    displayName: "AI Readiness",
    family: "General AI Readiness",
    familyShort: "AI Readiness",
    description:
      "Assess your readiness to work with AI tools and systems. Covers AI literacy, prompt thinking, output evaluation, AI ethics awareness, and productivity with AI. Increasingly required by forward-looking employers.",
    primaryUseCase: "AI-era Work Readiness",
    usageLabels: ["Self-awareness", "Hiring support", "Career guidance", "Company-requested"],
    estimatedMinutes: 18,
    timeLimit: 25,
    timedMode: "Soft Timed",
    countdownEnabled: true,
    autoSubmit: false,
    pauseAllowed: false,
    resumePolicy: "Within 2 hours of starting",
    retakeRule: "After 3 months",
    validityPeriod: "12 months",
    dimensions: ["AI Literacy", "Prompt Thinking", "Output Evaluation", "AI Ethics Awareness", "AI Workflow Integration"],
    dimensionCount: 5,
    questionCount: 40,
    isLaunchBatch: true,
    launchPriority: 8,
    launchReason: "Emerging critical skill set. Unique to Hamrahe's positioning. High demand from technology and AI-forward companies.",
    qualityStatus: "Pilot Tested",
    canCompanyRequest: true,
    sensitivityLevel: "Standard",
    color: "from-indigo-500 to-violet-500",
    iconLabel: "AI",
    sampleQuestions: [
      {
        id: "air-1",
        type: "multiple_choice",
        text: "When reviewing an AI-generated report, what is the most important first step?",
        options: [
          "Check if the writing style matches your brand",
          "Verify factual claims against reliable sources",
          "Improve the formatting and presentation",
          "Share it immediately to save time",
        ],
        instruction: "Choose the best answer",
      },
      {
        id: "air-2",
        type: "preference",
        text: "When crafting a prompt for an AI tool, you should primarily:",
        options: ["Be as brief as possible to save time", "Provide clear context, goal, and constraints"],
      },
      {
        id: "air-3",
        type: "multiple_choice",
        text: "Which is the best description of AI hallucination?",
        options: [
          "When an AI produces output too slowly",
          "When an AI generates false but plausible-sounding information",
          "When an AI refuses to answer a question",
          "When an AI output is too long",
        ],
      },
      {
        id: "air-4",
        type: "likert",
        text: "I regularly use AI tools to augment (not replace) my professional work.",
        options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
        instruction: "Rate how accurately this describes you",
      },
    ],
  },
  {
    id: "interview-readiness",
    name: "Interview Readiness Assessment",
    displayName: "Interview Readiness",
    family: "Hiring & Work Readiness",
    familyShort: "Hiring Readiness",
    description:
      "Evaluate how prepared you are for professional job interviews. Assesses preparation habits, communication confidence, storytelling ability, and behavioral interview skills. Actionable feedback provided.",
    primaryUseCase: "Job Search & Interview Preparation",
    usageLabels: ["Self-awareness", "Career guidance", "Hiring support"],
    estimatedMinutes: 12,
    timeLimit: 20,
    timedMode: "Soft Timed",
    countdownEnabled: false,
    autoSubmit: false,
    pauseAllowed: true,
    resumePolicy: "Within 24 hours",
    retakeRule: "After 3 months",
    validityPeriod: "12 months",
    dimensions: ["Preparation Level", "Communication Confidence", "Story Structuring", "Behavioral Awareness", "Nerves & Presence"],
    dimensionCount: 5,
    questionCount: 30,
    isLaunchBatch: true,
    launchPriority: 9,
    launchReason: "High-value for job seekers. Actionable and immediately useful. Connects directly to job application flows.",
    qualityStatus: "Pilot Tested",
    canCompanyRequest: false,
    sensitivityLevel: "Standard",
    color: "from-teal-500 to-emerald-500",
    iconLabel: "IR",
    sampleQuestions: [
      {
        id: "ir-1",
        type: "likert",
        text: "Before an interview, I research the company's mission, products, and recent news.",
        options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
        instruction: "Rate how accurately this describes your behavior",
      },
      {
        id: "ir-2",
        type: "preference",
        text: "When asked 'Tell me about yourself', you typically:",
        options: [
          "Give a structured 2-minute professional summary",
          "Start from the beginning and hope it flows naturally",
        ],
      },
      {
        id: "ir-3",
        type: "likert",
        text: "I can clearly describe a specific challenge I overcame at work using the STAR method.",
        options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
      },
      {
        id: "ir-4",
        type: "multiple_choice",
        text: "What is the best way to handle a question you don't know the answer to?",
        options: [
          "Make up a plausible answer to avoid appearing uninformed",
          "Say you don't know and ask if you can follow up",
          "Change the subject to something you know well",
          "Stay silent until you think of something",
        ],
      },
    ],
  },
  {
    id: "logical-reasoning",
    name: "Logical Reasoning Assessment",
    displayName: "Logical Reasoning",
    family: "Cognitive & Aptitude",
    familyShort: "Cognitive",
    description:
      "Measure your ability to analyze patterns, draw conclusions, and solve problems under time pressure. Includes deductive, inductive, and abstract reasoning. Strict timed format — a genuine cognitive challenge.",
    primaryUseCase: "Cognitive Ability for Analytical Roles",
    usageLabels: ["Hiring support", "Career guidance", "Company-requested", "Not for hiring decision alone"],
    estimatedMinutes: 25,
    timeLimit: 30,
    timedMode: "Strict Timed",
    countdownEnabled: true,
    autoSubmit: true,
    pauseAllowed: false,
    resumePolicy: "Not allowed after start",
    retakeRule: "After 6 months",
    validityPeriod: "1 year",
    dimensions: ["Deductive Reasoning", "Inductive Reasoning", "Abstract Reasoning", "Numerical Patterns", "Verbal Logic"],
    dimensionCount: 5,
    questionCount: 30,
    isLaunchBatch: true,
    launchPriority: 10,
    launchReason: "Critical for analytical, engineering, and product roles. High value in screening. Provides objective cognitive signal.",
    qualityStatus: "Pilot Tested",
    canCompanyRequest: true,
    sensitivityLevel: "Standard",
    color: "from-slate-600 to-slate-800",
    iconLabel: "LR",
    sampleQuestions: [
      {
        id: "lr-1",
        type: "multiple_choice",
        text: "All managers are employees. Some employees are interns. Which of the following must be true?",
        options: [
          "All managers are interns",
          "Some managers might be interns",
          "No managers are interns",
          "All interns are managers",
        ],
        instruction: "Choose the logically correct answer",
      },
      {
        id: "lr-2",
        type: "multiple_choice",
        text: "What comes next in the series: 2, 6, 18, 54, ?",
        options: ["108", "162", "81", "72"],
      },
      {
        id: "lr-3",
        type: "multiple_choice",
        text: "If all Bloops are Razzies, and all Razzies are Lazzies, which is true?",
        options: [
          "All Bloops are Lazzies",
          "All Lazzies are Bloops",
          "Some Bloops are not Lazzies",
          "No Razzies are Lazzies",
        ],
      },
      {
        id: "lr-4",
        type: "multiple_choice",
        text: "A train travels at 60 km/h for 2 hours and then at 90 km/h for 1 hour. What is the average speed?",
        options: ["70 km/h", "75 km/h", "80 km/h", "72 km/h"],
      },
    ],
  },
];

// ─── User's Assessment Attempts (Ahmad Parvizi) ──────────────────────────────

export const USER_ATTEMPTS: UserAssessmentAttempt[] = [
  {
    id: "att-mbti-1",
    userId: "ahmad-parvizi",
    assessmentId: "mbti",
    status: "Completed",
    startedAt: "2026-04-10T09:15:00Z",
    submittedAt: "2026-04-10T09:38:00Z",
    timeLimitMinutes: 30,
    estimatedDurationMinutes: 20,
    timeSpentSeconds: 1380,
    countdownEnabled: false,
    autoSubmitEnabled: false,
    autoSubmitted: false,
    pauseAllowed: true,
    scoreStatus: "Scored",
    reportStatus: "Generated",
    createdAt: "2026-04-10T09:10:00Z",
  },
  {
    id: "att-disc-1",
    userId: "ahmad-parvizi",
    assessmentId: "disc",
    status: "Completed",
    startedAt: "2026-04-12T14:00:00Z",
    submittedAt: "2026-04-12T14:18:00Z",
    timeLimitMinutes: 25,
    estimatedDurationMinutes: 15,
    timeSpentSeconds: 1080,
    countdownEnabled: false,
    autoSubmitEnabled: false,
    autoSubmitted: false,
    pauseAllowed: true,
    scoreStatus: "Scored",
    reportStatus: "Generated",
    createdAt: "2026-04-12T13:55:00Z",
  },
  {
    id: "att-ai-1",
    userId: "ahmad-parvizi",
    assessmentId: "ai-readiness",
    status: "Requested by Company",
    timeLimitMinutes: 25,
    estimatedDurationMinutes: 18,
    countdownEnabled: true,
    autoSubmitEnabled: false,
    pauseAllowed: false,
    requestedByCompany: {
      id: "snapp",
      name: "Snapp",
      deadline: "2026-06-01T23:59:00Z",
      purpose: "Required for Product Manager role assessment process",
    },
    scoreStatus: "Pending",
    reportStatus: "Not Generated",
    createdAt: "2026-05-20T10:00:00Z",
  },
];

// ─── Completed Results ────────────────────────────────────────────────────────

export const ASSESSMENT_CENTER_RESULTS: Record<string, AssessmentCenterResult> = {
  mbti: {
    assessmentId: "mbti",
    attemptId: "att-mbti-1",
    completedAt: "2026-04-10T09:38:00Z",
    durationMinutes: 23,
    submissionType: "User Submitted",
    timedMode: "Soft Timed",
    assessmentVersion: "1.0",
    validUntil: "2028-04-10",
    overallProfile: "INTJ",
    overallLabel: "The Architect",
    dimensionScores: [
      { name: "E/I", label: "Introversion", score: 76, description: "You strongly prefer internal reflection over external stimulation.", dominance: "I" },
      { name: "S/N", label: "Intuition", score: 71, description: "You focus on patterns, possibilities, and big-picture thinking.", dominance: "N" },
      { name: "T/F", label: "Thinking", score: 68, description: "You make decisions based on logic and objective analysis.", dominance: "T" },
      { name: "J/P", label: "Judging", score: 82, description: "You prefer structure, planning, and decisive action.", dominance: "J" },
    ],
    executiveSummary:
      "You are an INTJ — The Architect. This personality type is characterized by strategic thinking, independence, and a drive for continuous improvement. INTJs are natural system-builders who excel at spotting patterns and devising long-term solutions. You combine analytical rigor with visionary thinking, making you exceptionally effective in complex problem-solving environments.",
    strengths: [
      "Strategic long-term planning and pattern recognition",
      "Independent, self-driven work without external motivation",
      "Strong analytical and critical thinking abilities",
      "High standards and commitment to quality outcomes",
      "Ability to focus deeply on complex problems",
    ],
    developmentAreas: [
      "Building rapport and small talk in social and professional settings",
      "Showing appreciation and emotional warmth to colleagues",
      "Tolerating ambiguity and incomplete information before acting",
      "Recognizing when good enough is better than perfect",
    ],
    workplaceMeaning: [
      "You thrive in roles that require deep thinking, system design, or strategic planning",
      "You prefer working with high autonomy and minimal micromanagement",
      "You value competence over hierarchy — you respect expertise, not just titles",
      "You may undervalue the interpersonal elements that drive team cohesion",
      "Roles such as Product Strategy, Architecture, Research, and Technical Leadership align well with your profile",
    ],
    interviewTips: [
      "Prepare structured answers — your analytical nature excels at STAR-format stories",
      "Show enthusiasm about the company's long-term vision, not just the immediate role",
      "Balance technical depth with warmth — interviewers also assess cultural fit",
      "Be ready to discuss how you handle ambiguity — your INTJ nature may be read as overconfident",
    ],
    recommendedAssessments: ["big-five", "work-style", "eq"],
    reportId: "RPT-MBTI-2026-0001",
    verificationCode: "HMR-MBTI-8X2K-PQ7R",
    visibility: "Show Summary in Profile",
    sharedWith: [],
  },
  disc: {
    assessmentId: "disc",
    attemptId: "att-disc-1",
    completedAt: "2026-04-12T14:18:00Z",
    durationMinutes: 18,
    submissionType: "User Submitted",
    timedMode: "Soft Timed",
    assessmentVersion: "1.0",
    validUntil: "2028-04-12",
    overallProfile: "C/I",
    overallLabel: "Conscientious Influencer",
    dimensionScores: [
      { name: "D", label: "Dominance", score: 44, description: "Moderate assertiveness — you balance directness with consideration.", dominance: "Moderate" },
      { name: "I", label: "Influence", score: 68, description: "You communicate persuasively and build enthusiasm in others.", dominance: "High" },
      { name: "S", label: "Steadiness", score: 52, description: "You maintain reliability while remaining adaptable to change.", dominance: "Moderate" },
      { name: "C", label: "Conscientiousness", score: 78, description: "You set high standards, focus on quality, and analyze before acting.", dominance: "High" },
    ],
    executiveSummary:
      "Your DISC profile shows a C/I pattern — a Conscientious Influencer. You combine high quality standards with genuine interpersonal effectiveness. You are accurate, detail-oriented, and persuasive — a rare combination that makes you effective in roles requiring both precision and people skills. You care deeply about doing things right while bringing others along.",
    strengths: [
      "Combining analytical depth with interpersonal warmth",
      "Maintaining high quality while inspiring confidence in others",
      "Persuasive communication backed by data and evidence",
      "Building collaborative environments with clear standards",
    ],
    developmentAreas: [
      "Balancing perfectionism with practical deadlines",
      "Delegating without over-controlling the quality of outcomes",
      "Moving from analysis to decisive action when data is incomplete",
    ],
    workplaceMeaning: [
      "You excel in roles requiring both technical depth and client or team interaction",
      "Your C dimension drives you to verify before committing — valuable in fast-moving environments",
      "Product Management, Technical Leadership, and Client Solutions align well with your profile",
      "Beware of analysis paralysis when rapid decisions are needed",
    ],
    recommendedAssessments: ["communication-style", "work-style", "eq"],
    reportId: "RPT-DISC-2026-0001",
    verificationCode: "HMR-DISC-9Y4M-RZ3T",
    visibility: "Only Me",
    sharedWith: [],
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getAssessmentCenterItem(id: string): AssessmentCenterItem | undefined {
  return ASSESSMENT_CENTER_ITEMS.find((a) => a.id === id);
}

export function getUserAttempt(assessmentId: string): UserAssessmentAttempt | undefined {
  return USER_ATTEMPTS.find((a) => a.assessmentId === assessmentId);
}

export function getAssessmentCenterResult(assessmentId: string): AssessmentCenterResult | undefined {
  return ASSESSMENT_CENTER_RESULTS[assessmentId];
}

export function getLaunchBatch(): AssessmentCenterItem[] {
  return ASSESSMENT_CENTER_ITEMS.filter((a) => a.isLaunchBatch).sort(
    (a, b) => (a.launchPriority ?? 99) - (b.launchPriority ?? 99)
  );
}

export function getItemsByFamily(family: AssessmentFamily): AssessmentCenterItem[] {
  return ASSESSMENT_CENTER_ITEMS.filter((a) => a.family === family);
}

export const ASSESSMENT_FAMILIES: { family: AssessmentFamily; description: string; color: string; count: number }[] = [
  { family: "Personality & Psychology", description: "MBTI, Big Five, Enneagram, and more", color: "from-violet-500 to-purple-600", count: 10 },
  { family: "Work Style & Behavior", description: "DISC, Work Style, Teamwork patterns", color: "from-blue-500 to-cyan-500", count: 18 },
  { family: "Career Interest & Direction", description: "Holland, Career Anchors, Fit profiles", color: "from-amber-500 to-orange-500", count: 10 },
  { family: "Cognitive & Aptitude", description: "Logical Reasoning, IQ, Critical Thinking", color: "from-slate-600 to-slate-800", count: 20 },
  { family: "Emotional & Social Intelligence", description: "EQ, Empathy, Self-regulation", color: "from-rose-500 to-red-500", count: 11 },
  { family: "Communication & Soft Skills", description: "Communication Style, Listening, Presentation", color: "from-fuchsia-500 to-pink-500", count: 14 },
  { family: "Hiring & Work Readiness", description: "Interview Readiness, SJT, Pre-employment", color: "from-teal-500 to-emerald-500", count: 12 },
  { family: "General AI Readiness", description: "AI Literacy, Prompt Thinking, Ethics", color: "from-indigo-500 to-violet-500", count: 12 },
];
