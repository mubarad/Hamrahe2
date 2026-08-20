import { StructuredPostType, StructuredPostData } from "../types/post-types";

export const STRUCTURED_POST_CONFIGS: Record<
  StructuredPostType,
  { title: string; subtitle: string; iconName: string; primaryCtaLabel: string }
> = {
  milestone: {
    title: "Celebrate / Professional Milestone",
    subtitle: "Share major career events, achievements, or project completion with your network.",
    iconName: "Award",
    primaryCtaLabel: "Publish Milestone",
  },
  job_opening: {
    title: "Job Opening",
    subtitle: "Hire talented professionals from your network by posting an open position.",
    iconName: "Briefcase",
    primaryCtaLabel: "Publish Job",
  },
  service: {
    title: "Professional Service",
    subtitle: "Offer specialized consulting, agency services, or expertise to clients.",
    iconName: "Sparkles",
    primaryCtaLabel: "Publish Service",
  },
  expert: {
    title: "Find an Expert",
    subtitle: "Post a challenge, advisory need, or freelance assignment to find specialized help.",
    iconName: "Search",
    primaryCtaLabel: "Publish Request",
  },
  project: {
    title: "Project or Collaboration",
    subtitle: "Invite collaborators, co-builders, or project partners to join your initiative.",
    iconName: "FolderKanban",
    primaryCtaLabel: "Publish Project",
  },
  product_update: {
    title: "Product Update / Launch",
    subtitle: "Announce new releases, beta access, or major feature updates.",
    iconName: "Rocket",
    primaryCtaLabel: "Publish Update",
  },
  event: {
    title: "Event / Webinar",
    subtitle: "Host online webinars, panel discussions, or in-person meetups.",
    iconName: "Calendar",
    primaryCtaLabel: "Publish Event",
  },
  opportunity: {
    title: "Professional Opportunity",
    subtitle: "Share grants, RFP requests, mentorships, or strategic opportunities.",
    iconName: "Compass",
    primaryCtaLabel: "Publish Opportunity",
  },
  article: {
    title: "Long-form Article",
    subtitle: "Write in-depth industry analysis, guides, or original research.",
    iconName: "BookOpen",
    primaryCtaLabel: "Publish Article",
  },
  newsletter: {
    title: "Newsletter Issue",
    subtitle: "Publish an issue to your subscriber base and notify network followers.",
    iconName: "Mail",
    primaryCtaLabel: "Publish Issue",
  },
  live_session: {
    title: "Live Session",
    subtitle: "Host a live audio or video stream with live Q&A and polls.",
    iconName: "Radio",
    primaryCtaLabel: "Schedule / Go Live",
  },
};

export const INITIAL_STRUCTURED_DATA: Record<StructuredPostType, StructuredPostData> = {
  milestone: {
    type: "milestone",
    milestoneType: "new_position",
    milestoneTitle: "",
    notifyNetworkMilestone: true,
  },
  job_opening: {
    type: "job_opening",
    jobTitle: "",
    location: "Tehran (Hybrid)",
    workModel: "Hybrid",
    employmentType: "Full-time",
    requiredSkills: ["React", "TypeScript"],
  },
  service: {
    type: "service",
    serviceName: "",
    category: "Design & UX",
    deliveryModel: "Project-based",
    ctaType: "request_quote",
  },
  expert: {
    type: "expert",
    problemDescription: "",
    expertiseRequired: [],
    timeline: "2-4 weeks",
  },
  project: {
    type: "project",
    projectTitle: "",
    projectType: "Open Source / Startup",
    projectStage: "MVP Phase",
  },
  product_update: {
    type: "product_update",
    productUpdateType: "launch",
    productName: "",
  },
  event: {
    type: "event",
    eventTitle: "",
    eventFormat: "online",
    timezone: "GMT+3:30 (Tehran)",
  },
  opportunity: {
    type: "opportunity",
    opportunityType: "RFP / Partnership",
  },
  article: {
    type: "article",
    articleTitle: "",
  },
  newsletter: {
    type: "newsletter",
    newsletterIssueTitle: "",
  },
  live_session: {
    type: "live_session",
    liveTitle: "",
  },
};
