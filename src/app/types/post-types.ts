import type { User, Post } from "../data/mock-data";

export type CommentPermission = "everyone" | "followers_connections" | "connections" | "mentioned" | "disabled";

export type RepostPermission = "both" | "repost_only" | "quote_only" | "disabled";

export type NotificationPreference = "all" | "comments_replies" | "important" | "muted";

export interface MediaAttachment {
  id: string;
  type: "image" | "video" | "document";
  url: string;
  name?: string;
  size?: number;
  // Image specific
  altText?: string;
  caption?: string;
  taggedUsers?: string[];
  cropRatio?: "original" | "1:1" | "4:5" | "16:9";
  isCover?: boolean;
  // Video specific
  trimStart?: number;
  trimEnd?: number;
  coverFrameUrl?: string;
  captions?: string;
  autoPlay?: boolean;
  // Document specific
  title?: string;
  description?: string;
  pageCount?: number;
  allowDownload?: boolean;
  pageThumbnails?: string[];
}

export interface LinkPreviewData {
  url: string;
  title: string;
  description: string;
  domain: string;
  imageUrl?: string;
  status: "loaded" | "loading" | "failed";
}

export type StructuredPostType =
  | "milestone"
  | "job_opening"
  | "service"
  | "expert"
  | "project"
  | "product_update"
  | "event"
  | "opportunity"
  | "article"
  | "newsletter"
  | "live_session";

export interface StructuredPostData {
  type: StructuredPostType;
  // Milestone / Celebrate
  milestoneType?:
    | "new_position"
    | "promotion"
    | "anniversary"
    | "founding"
    | "project_launch"
    | "project_done"
    | "product_launch"
    | "certification"
    | "education"
    | "graduation"
    | "award"
    | "publication"
    | "speaking"
    | "verified_outcome";
  milestoneTitle?: string;
  companyOrOrg?: string;
  connectedProfileId?: string;
  notifyNetworkMilestone?: boolean;
  // Milestone-specific fields
  previousTitle?: string;         // promotion: old role
  employmentKind?: "Full-time" | "Part-time" | "Contract" | "Freelance" | "Internship"; // new_position
  startDate?: string;             // new_position, founding
  milestoneLocation?: string;     // new_position
  yearsCount?: number;            // anniversary
  currentRole?: string;           // anniversary
  founderRole?: string;           // founding
  foundingIndustry?: string;      // founding
  projectUrl?: string;            // project_launch / product_launch
  projectTeam?: string;           // project_launch
  certIssuingOrg?: string;        // certification
  certIssueDate?: string;         // certification
  credentialId?: string;          // certification
  certUrl?: string;               // certification
  eduInstitution?: string;        // education / graduation
  eduDegree?: string;             // education / graduation
  eduField?: string;              // education / graduation
  graduationYear?: string;        // graduation
  awardName?: string;             // award
  awardOrg?: string;              // award
  pubTitle?: string;              // publication
  pubUrl?: string;                // publication
  pubPublisher?: string;          // publication
  speakingEvent?: string;         // speaking
  speakingTopic?: string;         // speaking

  // Job Opening
  jobTitle?: string;
  location?: string;
  workModel?: "On-site" | "Hybrid" | "Remote";
  employmentType?: "Full-time" | "Part-time" | "Contract" | "Freelance";
  salaryRange?: string;
  requiredSkills?: string[];
  deadline?: string;

  // Service
  serviceName?: string;
  category?: string;
  deliveryModel?: string;
  pricingModel?: string;
  responseTime?: string;
  ctaType?: "request_quote" | "book_meeting" | "request_demo" | "view_portfolio";

  // Find an Expert
  problemDescription?: string;
  expertiseRequired?: string[];
  timeline?: string;
  collaborationModel?: string;
  budget?: string;
  confidential?: boolean;

  // Project / Collaboration
  projectTitle?: string;
  projectType?: string;
  projectStage?: string;

  // Product Update
  productUpdateType?: "launch" | "beta" | "version" | "feature" | "case_study";
  productName?: string;

  // Event
  eventTitle?: string;
  eventDate?: string;
  eventTime?: string;
  timezone?: string;
  eventFormat?: "online" | "in_person" | "hybrid";
  eventLocation?: string;
  speakers?: string[];

  // Opportunity
  opportunityType?: string;

  // Article / Newsletter / Live
  articleTitle?: string;
  articleCover?: string;
  newsletterIssueTitle?: string;
  liveTitle?: string;
  liveScheduledTime?: string;
}

export interface Collaborator {
  id: string;
  user: User;
  role: string;
  status: "pending" | "accepted" | "rejected";
}

export type EvidenceType =
  | "external_link"
  | "uploaded_file"
  | "connected_project"
  | "connected_portfolio"
  | "colleague_confirmation"
  | "company_confirmation"
  | "client_confirmation"
  | "issuer_confirmation"
  | "platform_recorded";

export type EvidenceState =
  | "Claimed"
  | "Evidence Attached"
  | "Colleague Confirmed"
  | "Company Confirmed"
  | "Client Confirmed"
  | "Issuer Confirmed"
  | "Platform Recorded"
  | "Externally Verified"
  | "Disputed";

export interface ProfessionalEvidence {
  id: string;
  type: EvidenceType;
  state: EvidenceState;
  title: string;
  description?: string;
  urlOrFile?: string;
  isPrivate?: boolean;
}

export interface PostDraft {
  id: string;
  internalTitle?: string;
  content: string;
  media: MediaAttachment[];
  linkPreview?: LinkPreviewData;
  structuredData?: StructuredPostData;
  collaborators?: Collaborator[];
  evidence?: ProfessionalEvidence[];
  scheduledAt?: string;
  lastEdited: number;
}

export interface SavedCollection {
  id: string;
  name: string;
  count: number;
  postIds: string[];
}

export interface BoostCampaign {
  id: string;
  postId: string;
  objective: string;
  targetIndustry: string;
  targetRole: string;
  location: string;
  budget: string;
  durationDays: number;
  status: "active" | "completed" | "draft";
  spent: string;
  impressionsDelivered: number;
}

export interface ExtendedPost extends Post {
  // New media attachments
  attachments?: MediaAttachment[];
  album?: MediaAttachment[];
  linkPreview?: LinkPreviewData;
  
  // Structured post details
  structuredData?: StructuredPostData;
  collaborators?: Collaborator[];
  evidence?: ProfessionalEvidence[];

  // Permissions & Settings
  commentPermission?: CommentPermission;
  repostPermission?: RepostPermission;
  notificationPreference?: NotificationPreference;
  commentsDisabled?: boolean;

  // Post state flags
  isEdited?: boolean;
  isArchived?: boolean;
  isScheduled?: boolean;
  scheduledAt?: string;
  isSponsored?: boolean;
  sponsoredLabel?: "Sponsored" | "Promoted" | "Paid Partnership" | "Featured by Company";

  // Repost / Quote
  originalPostId?: string;
  quotedPost?: Post;
  repostActivityLabel?: string;

  // Analytics & Boost
  analytics?: PostAnalyticsData;
  boostCampaign?: BoostCampaign;

  // Ranking & Distribution Social Context
  distributionReason?: string; // e.g. "Reposted by Mina", "Ali commented on this"
  rankingScore?: number;
}

export interface PostAnalyticsData {
  impressions: number;
  reach: number;
  reactions: number;
  reactionBreakdown: { [key: string]: number };
  comments: number;
  reposts: number;
  quotePosts: number;
  saves: number;
  sends: number;
  linkClicks: number;
  profileViews: number;
  newFollowers: number;
  connectionRequests: number;
  ctaClicks: number;
  // Media specific
  videoStarts?: number;
  avgWatchTime?: string;
  completionRate?: string;
  documentOpens?: number;
  pagesViewed?: number;
  downloads?: number;
  // Professional outcomes
  recruiterViews?: number;
  portfolioViews?: number;
  inquiries?: number;
  applicants?: number;
}
