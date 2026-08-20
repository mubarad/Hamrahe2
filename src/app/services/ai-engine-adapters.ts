// ─── AI ENGINE SERVICE ADAPTERS ───────────────────────────────────────────────
// Typed service interfaces and demo adapters.
// When real backends (Supabase, Claude API, Hamrahe API) become available,
// replace the demo adapter implementations — the interfaces stay the same.
// ─────────────────────────────────────────────────────────────────────────────

export type AdapterStatus = "connected" | "demo_simulation" | "not_connected";

export interface AdapterHealth {
  status: AdapterStatus;
  label: string;
  description: string;
}

// ─── SERVICE INTERFACES ───────────────────────────────────────────────────────

export interface AIProviderAdapter {
  health(): AdapterHealth;
  generateText(prompt: string, systemPrompt?: string): Promise<string>;
  generateStructured<T>(prompt: string, schema: object): Promise<T>;
}

export interface ProfileServiceAdapter {
  health(): AdapterHealth;
  getPersonalProfile(contextId: string): Promise<PersonalProfileSnapshot>;
  applyApprovedChanges(contextId: string, changeSet: ProfileChangeSet, approvedBy: string): Promise<boolean>;
}

export interface JobServiceAdapter {
  health(): AdapterHealth;
  getJob(jobId: string): Promise<JobSnapshot | null>;
  getApplication(applicationId: string): Promise<ApplicationSnapshot | null>;
  submitApplication(applicationId: string, package_: ApplicationPackage): Promise<SubmissionResult>;
}

export interface MessageServiceAdapter {
  health(): AdapterHealth;
  sendMessage(recipientId: string, content: string, senderContextId: string): Promise<SendResult>;
  draftMessage(recipientId: string): Promise<MessageDraft | null>;
}

export interface LearningServiceAdapter {
  health(): AdapterHealth;
  getResourcesForSkill(skill: string): Promise<LearningResource[]>;
  getLearningHistory(contextId: string): Promise<LearningRecord[]>;
}

export interface ContentServiceAdapter {
  health(): AdapterHealth;
  publishPost(contextId: string, content: string, format: string): Promise<PublishResult>;
  scheduleDraft(contextId: string, content: string, publishAt: string): Promise<ScheduleResult>;
}

// ─── DATA SNAPSHOTS ───────────────────────────────────────────────────────────

export interface PersonalProfileSnapshot {
  contextId: string;
  name: string;
  headline: string;
  summary: string;
  workHistory: { company: string; title: string; startDate: string; endDate?: string; description: string; verified: boolean }[];
  skills: { name: string; level?: string; endorsed: boolean; assessed: boolean }[];
  education: { institution: string; degree: string; field: string; year: string }[];
  projects: { title: string; description: string; skills: string[]; outcomes: string }[];
  credentials: { title: string; issuer: string; issueDate: string }[];
  verifiedEmployers: string[];
}

export interface ProfileChangeSet {
  changes: { field: string; section: string; original: string; proposed: string; reason: string }[];
}

export interface JobSnapshot {
  id: string;
  title: string;
  company: string;
  location: string;
  workModel: string;
  description: string;
  requirements: string[];
  niceToHave: string[];
  compensationRange?: string;
  deadline?: string;
}

export interface ApplicationSnapshot {
  id: string;
  jobId: string;
  status: string;
  stage: string;
  submittedAt?: string;
  job: JobSnapshot;
}

export interface ApplicationPackage {
  resumeContent: string;
  coverNote: string;
  applicationAnswers?: Record<string, string>;
  contextId: string;
}

export interface SubmissionResult {
  success: boolean;
  applicationId?: string;
  message: string;
  isDemo?: boolean;
}

export interface SendResult {
  success: boolean;
  messageId?: string;
  isDemo?: boolean;
}

export interface MessageDraft {
  recipientName: string;
  relationshipContext: string;
}

export interface LearningResource {
  id: string;
  title: string;
  skill: string;
  type: string;
  duration: string;
  level: string;
  url: string;
}

export interface LearningRecord {
  resourceId: string;
  title: string;
  completedAt: string;
  score?: number;
}

export interface PublishResult {
  success: boolean;
  postId?: string;
  isDemo?: boolean;
}

export interface ScheduleResult {
  success: boolean;
  scheduledAt?: string;
  isDemo?: boolean;
}

// ─── DEMO ADAPTERS ────────────────────────────────────────────────────────────
// These simulate real behavior for prototype flows.
// All external actions show "Demo simulation" status.
// ─────────────────────────────────────────────────────────────────────────────

export const demoProfileAdapter: ProfileServiceAdapter = {
  health: () => ({ status: "demo_simulation", label: "Demo mode", description: "Using mock profile data. Connect Supabase to use real profile data." }),

  async getPersonalProfile(contextId: string): Promise<PersonalProfileSnapshot> {
    await delay(300);
    return {
      contextId,
      name: "Sara Ahmadi",
      headline: "Senior Product Designer · Digikala",
      summary: "4 years designing large-scale e-commerce experiences at Digikala. Specializing in checkout, search, and design systems.",
      workHistory: [
        { company: "Digikala", title: "Senior Product Designer", startDate: "2022-03", endDate: undefined, description: "Led redesign of checkout flow, 23% conversion improvement. Built design system used by 30+ engineers.", verified: true },
        { company: "Cafe Bazaar", title: "Product Designer", startDate: "2020-01", endDate: "2022-02", description: "Designed mobile-first app store experiences. Increased daily active users by 18%.", verified: false },
      ],
      skills: [
        { name: "Figma", level: "Expert", endorsed: true, assessed: true },
        { name: "User Research", level: "Advanced", endorsed: true, assessed: false },
        { name: "Design Systems", level: "Advanced", endorsed: false, assessed: false },
        { name: "Product Strategy", level: "Intermediate", endorsed: false, assessed: false },
      ],
      education: [{ institution: "University of Tehran", degree: "Bachelor of Science", field: "Industrial Design", year: "2020" }],
      projects: [
        { title: "Digikala Checkout Redesign", description: "End-to-end redesign of 7-step checkout. A/B tested 3 variants.", skills: ["Figma", "User Research", "A/B Testing"], outcomes: "+23% conversion, -40% cart abandonment" },
      ],
      credentials: [],
      verifiedEmployers: ["Digikala"],
    };
  },

  async applyApprovedChanges(_contextId: string, _changeSet: ProfileChangeSet, _approvedBy: string): Promise<boolean> {
    await delay(500);
    return true; // Demo: always succeeds
  },
};

export const demoJobAdapter: JobServiceAdapter = {
  health: () => ({ status: "demo_simulation", label: "Demo mode", description: "Using mock job data. Connect Jobs API for real job data." }),

  async getJob(jobId: string): Promise<JobSnapshot | null> {
    await delay(200);
    const jobs: Record<string, JobSnapshot> = {
      "job_snapp_spd": {
        id: "job_snapp_spd",
        title: "Senior Product Designer",
        company: "Snapp SuperApp",
        location: "Tehran",
        workModel: "Hybrid",
        description: "Join Snapp's product design team to shape the future of super-app experiences for millions of users across Iran.",
        requirements: ["5+ years product design", "Figma expert", "Experience with mobile-first design", "Design systems experience", "Strong portfolio"],
        niceToHave: ["Fintech experience", "Motion design", "Data-driven design experience"],
        compensationRange: "80,000,000 – 120,000,000 IRR / month",
        deadline: "2026-09-15",
      },
    };
    return jobs[jobId] || null;
  },

  async getApplication(applicationId: string): Promise<ApplicationSnapshot | null> {
    await delay(200);
    if (applicationId === "app_snapp_001") {
      const job = await demoJobAdapter.getJob("job_snapp_spd");
      if (!job) return null;
      return { id: "app_snapp_001", jobId: "job_snapp_spd", status: "under_review", stage: "Application Submitted", job };
    }
    return null;
  },

  async submitApplication(_applicationId: string, _package: ApplicationPackage): Promise<SubmissionResult> {
    await delay(1000);
    return { success: true, applicationId: _applicationId, message: "Demo: Application would be submitted to Snapp HR portal.", isDemo: true };
  },
};

export const demoMessageAdapter: MessageServiceAdapter = {
  health: () => ({ status: "demo_simulation", label: "Demo mode", description: "Messages are simulated. Connect Messages API to send real messages." }),

  async sendMessage(_recipientId: string, _content: string, _senderContextId: string): Promise<SendResult> {
    await delay(800);
    return { success: true, isDemo: true };
  },

  async draftMessage(recipientId: string): Promise<MessageDraft | null> {
    await delay(200);
    return { recipientName: "Demo Contact", relationshipContext: "Connected via Digikala network" };
  },
};

export const demoLearningAdapter: LearningServiceAdapter = {
  health: () => ({ status: "demo_simulation", label: "Demo mode", description: "Learning resources are sample data. Connect Learning API for live content." }),

  async getResourcesForSkill(skill: string): Promise<LearningResource[]> {
    await delay(300);
    return [
      { id: `lr_${skill}_1`, title: `${skill} Fundamentals`, skill, type: "Video course", duration: "4 hours", level: "Beginner", url: "/learning" },
      { id: `lr_${skill}_2`, title: `Advanced ${skill}`, skill, type: "Workshop", duration: "6 hours", level: "Advanced", url: "/learning" },
      { id: `lr_${skill}_3`, title: `${skill} in Practice`, skill, type: "Project-based", duration: "2 weeks", level: "Intermediate", url: "/learning" },
    ];
  },

  async getLearningHistory(_contextId: string): Promise<LearningRecord[]> {
    await delay(200);
    return [
      { resourceId: "lr_figma_basics", title: "Figma Fundamentals", completedAt: "2025-11-01", score: 92 },
    ];
  },
};

export const demoContentAdapter: ContentServiceAdapter = {
  health: () => ({ status: "demo_simulation", label: "Demo mode", description: "Publishing is simulated. Connect Content API to publish real content." }),

  async publishPost(_contextId: string, _content: string, _format: string): Promise<PublishResult> {
    await delay(800);
    return { success: true, postId: `post_demo_${Date.now()}`, isDemo: true };
  },

  async scheduleDraft(_contextId: string, _content: string, publishAt: string): Promise<ScheduleResult> {
    await delay(400);
    return { success: true, scheduledAt: publishAt, isDemo: true };
  },
};

// ─── SERVICE REGISTRY ─────────────────────────────────────────────────────────

export const serviceAdapters = {
  profile: demoProfileAdapter,
  job: demoJobAdapter,
  message: demoMessageAdapter,
  learning: demoLearningAdapter,
  content: demoContentAdapter,
};

export function getAdapterHealthSummary(): { allConnected: boolean; services: { name: string; health: AdapterHealth }[] } {
  const services = [
    { name: "Profile", health: serviceAdapters.profile.health() },
    { name: "Jobs", health: serviceAdapters.job.health() },
    { name: "Messages", health: serviceAdapters.message.health() },
    { name: "Learning", health: serviceAdapters.learning.health() },
    { name: "Content", health: serviceAdapters.content.health() },
  ];
  return {
    allConnected: services.every((s) => s.health.status === "connected"),
    services,
  };
}

// ─── UTILITY ──────────────────────────────────────────────────────────────────

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
