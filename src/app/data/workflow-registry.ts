// ─── AI ENGINE WORKFLOW REGISTRY ─────────────────────────────────────────────
// 12 gold-standard reference workflows with complete typed contracts.
// Each workflow has unique inputs, data sources, steps, and outputs.
// Domain rules from spec §3 are enforced at type level:
//   canIssueBadge: false, canIssueVerification: false, etc.
// ─────────────────────────────────────────────────────────────────────────────

import { WorkflowContract } from "../types/ai-engine-workflow";

const NEVER = false as const;

export const WORKFLOW_REGISTRY: WorkflowContract[] = [

  // ── 1. SALARY NEGOTIATION PREPARATION ───────────────────────────────────────
  {
    id: "wf_salary_negotiation",
    slug: "salary-negotiation-prep",
    version: "1.0",
    name: "Prepare me for salary negotiation",
    outcome: "A complete negotiation strategy: anchor, arguments, objection responses, walk-away conditions, and ready-to-send message.",
    category: "Jobs & Career",
    categoryIcon: "TrendingUp",
    audience: "personal",
    requiresOrgContext: false,
    supportedIntents: [
      "negotiate salary",
      "prepare for offer discussion",
      "counter offer",
      "negotiate compensation package",
    ],
    supportedContextEntityTypes: ["job", "job_application"],
    entryPoints: ["for_me", "workflows", "assistant", "job_page"],
    requiredInputs: [
      { key: "role", label: "Role / Position", type: "text", required: true, placeholder: "e.g. Senior Product Designer" },
      { key: "company", label: "Company", type: "text", required: true, placeholder: "e.g. Snapp SuperApp" },
      { key: "location", label: "Location", type: "text", required: true, placeholder: "e.g. Tehran (Hybrid)" },
      { key: "hiring_stage", label: "Hiring Stage", type: "select", required: true, options: ["Offer Received", "Final Interview", "Negotiation Active", "Counter Offer Sent"] },
      { key: "current_offer", label: "Current Offer (Monthly)", type: "currency", required: true, placeholder: "e.g. 85,000,000 IRR" },
    ],
    optionalInputs: [
      { key: "target_compensation", label: "Target Compensation", type: "currency", required: false, placeholder: "Your ideal number" },
      { key: "minimum_acceptable", label: "Minimum Acceptable", type: "currency", required: false, placeholder: "Your walk-away point" },
      { key: "benefits_received", label: "Benefits in Current Offer", type: "textarea", required: false, placeholder: "Stock, insurance, remote days..." },
      { key: "personal_priorities", label: "Your Priorities", type: "multi_select", required: false, options: ["Base salary", "Equity / Stock", "Remote work", "Signing bonus", "Healthcare", "Learning budget", "Title / seniority"] },
      { key: "alternative_offers", label: "Alternative Offers", type: "textarea", required: false, placeholder: "Other offers you hold or are expecting" },
      { key: "negotiation_deadline", label: "Decision Deadline", type: "date", required: false },
      { key: "relevant_achievements", label: "Relevant Achievements", type: "textarea", required: false, placeholder: "Outcomes you drove that support your ask" },
    ],
    dataSources: [
      { id: "ds_profile_exp", label: "Current profile → Work history & achievements", entity: "personal_profile", fields: ["work_history", "achievements", "skills"], purpose: "Build evidence for compensation ask", canExclude: false, currentlyAvailable: true },
      { id: "ds_profile_skills", label: "Current profile → Verified skills", entity: "personal_profile", fields: ["skills", "assessments"], purpose: "Support qualifications argument", canExclude: true, currentlyAvailable: true },
      { id: "ds_job_app", label: "Selected application → Job requirements", entity: "job_application", fields: ["job_title", "company", "requirements", "compensation_range"], purpose: "Anchor negotiation to stated range", canExclude: false, currentlyAvailable: false },
      { id: "ds_user_input", label: "Your input → Offer details and priorities", entity: "person", fields: ["current_offer", "target_compensation", "priorities"], purpose: "Personalize strategy to your situation", canExclude: false, currentlyAvailable: true },
    ],
    requiredPermissions: [
      { key: "read_profile_experience", label: "Read your work history and achievements", scope: "read", duration: "This session only", sensitive: false },
      { key: "read_profile_skills", label: "Read your verified skills", scope: "read", duration: "This session only", sensitive: false },
    ],
    prerequisites: [],
    steps: [
      { id: "step_resolve_context", order: 1, label: "Resolve context", description: "Identify the relevant job, application, and offer details", isExternal: false, requiresApproval: false },
      { id: "step_collect_inputs", order: 2, label: "Collect offer and priority information", description: "Gather your current offer, target, and priorities", isExternal: false, requiresApproval: false },
      { id: "step_build_strategy", order: 3, label: "Build negotiation strategy", description: "AI generates anchor, arguments, and objection responses from your evidence", isExternal: false, requiresApproval: false, outputProduced: "Negotiation strategy document" },
      { id: "step_draft_messages", order: 4, label: "Draft messages and scripts", description: "Generate message, email, and meeting script variants", isExternal: false, requiresApproval: false, outputProduced: "Message and email drafts" },
      { id: "step_review_output", order: 5, label: "Review and edit outputs", description: "You review and edit all generated content before any sending", isExternal: false, requiresApproval: false },
      { id: "step_send_approval", order: 6, label: "Approve sending (if requested)", description: "Explicit approval required before any message is sent", isExternal: true, requiresApproval: true },
    ],
    warningKinds: ["sends_or_publishes", "requires_explicit_approval"],
    approvalPolicy: {
      required: true,
      requiredFor: ["Send negotiation message", "Send negotiation email"],
      displayLabel: "Requires your approval before sending",
    },
    outputs: [
      { type: "negotiation_strategy", label: "Negotiation Strategy", saveLocation: "Outputs / Career", linkedToCase: true, exportable: true, editableByUser: true },
      { type: "message_draft", label: "Negotiation Message Draft", saveLocation: "Outputs / Messages", linkedToCase: true, exportable: true, editableByUser: true },
      { type: "email_draft", label: "Negotiation Email Draft", saveLocation: "Outputs / Messages", linkedToCase: true, exportable: true, editableByUser: true },
      { type: "meeting_script", label: "Meeting Script", saveLocation: "Outputs / Career", linkedToCase: true, exportable: true, editableByUser: true },
    ],
    caseCreated: true,
    caseBehavior: "create_new",
    externalSideEffects: ["May send a negotiation message or email after explicit user approval"],
    followUpActions: ["Record final negotiation outcome", "Update application case with result", "Create follow-up task if no reply in 3 days"],
    errorStates: [
      { code: "no_offer_data", label: "No offer information", description: "Current offer amount is required to build a strategy", recoveryAction: "Enter the current offer in the form above" },
      { code: "conflicting_compensation", label: "Target below minimum", description: "Your target compensation is below your stated minimum", recoveryAction: "Review and correct your compensation inputs" },
    ],
    estimatedCredits: 12,
    entitlementRequired: "free",
    canIssueBadge: NEVER,
    canIssueVerification: NEVER,
    canModifyTrustScore: NEVER,
    canModifyProfessionalPower: NEVER,
    canHireOrRejectCandidate: NEVER,
    canSendWithoutApproval: NEVER,
    availabilityStatus: "published",
    knownLimitations: [
      "Market compensation data requires an authorized external source to be connected",
      "AI does not access private salary databases",
      "Final decision remains entirely with you",
    ],
  },

  // ── 2. JOB APPLICATION PACKAGE ───────────────────────────────────────────────
  {
    id: "wf_job_application",
    slug: "job-application-package",
    version: "1.0",
    name: "Apply for a job",
    outcome: "Tailored resume, cover note, and application answers ready to submit — with your explicit approval before any application is sent.",
    category: "Jobs & Career",
    categoryIcon: "Briefcase",
    audience: "personal",
    requiresOrgContext: false,
    supportedIntents: ["apply for job", "prepare job application", "submit application", "tailor my resume for a job"],
    supportedContextEntityTypes: ["job", "job_application"],
    entryPoints: ["for_me", "workflows", "assistant", "job_page"],
    requiredInputs: [
      { key: "job_id", label: "Select Job", type: "entity_select", entityType: "job", required: true },
    ],
    optionalInputs: [
      { key: "cover_note_tone", label: "Cover Note Tone", type: "select", required: false, options: ["Professional", "Conversational", "Enthusiastic", "Concise"] },
      { key: "personal_note", label: "Something personal to include", type: "textarea", required: false, placeholder: "Specific reason you want this role or company" },
      { key: "highlight_skills", label: "Skills to emphasize", type: "multi_select", required: false, options: ["Leadership", "Technical depth", "Cross-functional experience", "International exposure", "Startup experience"] },
    ],
    dataSources: [
      { id: "ds_profile_full", label: "Current profile → Full work history and skills", entity: "personal_profile", fields: ["work_history", "skills", "projects", "education", "headline", "summary"], purpose: "Build tailored resume", canExclude: false, currentlyAvailable: true },
      { id: "ds_job_requirements", label: "Selected job → Requirements and description", entity: "job", fields: ["title", "requirements", "description", "company", "location", "work_model"], purpose: "Match profile to role", canExclude: false, currentlyAvailable: false },
      { id: "ds_verification", label: "Verification records → Verified employment claims", entity: "verification_evidence", fields: ["verified_employers", "verified_roles"], purpose: "Use verified claims as strong evidence", canExclude: true, currentlyAvailable: true },
    ],
    requiredPermissions: [
      { key: "read_profile_full", label: "Read your complete profile", scope: "read", duration: "This session only", sensitive: false },
      { key: "read_verification_records", label: "Read your verified employment records", scope: "read", duration: "This session only", sensitive: false },
    ],
    prerequisites: ["Profile must have at least one work history entry"],
    steps: [
      { id: "s1", order: 1, label: "Analyze job requirements", description: "Extract requirements, must-haves, and nice-to-haves from the job posting", isExternal: false, requiresApproval: false },
      { id: "s2", order: 2, label: "Compare profile to requirements", description: "Identify strong matches and coverage gaps", isExternal: false, requiresApproval: false },
      { id: "s3", order: 3, label: "Tailor resume", description: "Propose profile-accurate resume changes that highlight matching evidence", isExternal: false, requiresApproval: false, outputProduced: "Tailored resume draft" },
      { id: "s4", order: 4, label: "Draft cover note", description: "Write a cover note connecting your experience to the role", isExternal: false, requiresApproval: false, outputProduced: "Cover note draft" },
      { id: "s5", order: 5, label: "Prepare application answers", description: "Draft answers to application-specific questions if present", isExternal: false, requiresApproval: false },
      { id: "s6", order: 6, label: "Preview package", description: "You review the complete application package before submission", isExternal: false, requiresApproval: false },
      { id: "s7", order: 7, label: "Submit application", description: "Application submitted only after your explicit confirmation", isExternal: true, requiresApproval: true, outputProduced: "Application submission confirmation" },
    ],
    warningKinds: ["sends_or_publishes", "requires_explicit_approval"],
    approvalPolicy: {
      required: true,
      requiredFor: ["Submit application to company"],
      displayLabel: "Requires your approval before submitting",
    },
    outputs: [
      { type: "resume", label: "Tailored Resume", saveLocation: "Outputs / Applications", linkedToCase: true, exportable: true, editableByUser: true },
      { type: "cover_note", label: "Cover Note", saveLocation: "Outputs / Applications", linkedToCase: true, exportable: true, editableByUser: true },
      { type: "application_answers", label: "Application Answers", saveLocation: "Outputs / Applications", linkedToCase: true, exportable: false, editableByUser: true },
    ],
    caseCreated: true,
    caseBehavior: "create_new",
    externalSideEffects: ["Submits application to job after explicit approval"],
    followUpActions: ["Track application status", "Schedule interview preparation if invited", "Save case for follow-up"],
    errorStates: [
      { code: "no_job_selected", label: "No job selected", description: "A specific job must be selected to create the package", recoveryAction: "Select a job from your saved or recent jobs" },
      { code: "empty_profile", label: "Profile incomplete", description: "Your profile has insufficient work history to tailor a resume", recoveryAction: "Add at least one work experience entry to your profile" },
      { code: "fabrication_detected", label: "Unsupported claim detected", description: "AI cannot include experience or achievements not present in your profile", recoveryAction: "Add the missing experience to your profile first" },
    ],
    estimatedCredits: 15,
    entitlementRequired: "free",
    canIssueBadge: NEVER,
    canIssueVerification: NEVER,
    canModifyTrustScore: NEVER,
    canModifyProfessionalPower: NEVER,
    canHireOrRejectCandidate: NEVER,
    canSendWithoutApproval: NEVER,
    availabilityStatus: "published",
    knownLimitations: [
      "AI will not fabricate experience or achievements",
      "Resume reflects only what is already in your Hamrahe profile",
      "Submission requires the job to accept Hamrahe applications",
    ],
  },

  // ── 3. RESUME TAILORING ──────────────────────────────────────────────────────
  {
    id: "wf_resume_tailoring",
    slug: "resume-tailoring",
    version: "1.0",
    name: "Tailor my resume to a specific role",
    outcome: "A side-by-side comparison of your current resume and the proposed tailored version, with every change explained and awaiting your approval.",
    category: "Profile & Resume",
    categoryIcon: "FileText",
    audience: "personal",
    requiresOrgContext: false,
    supportedIntents: ["tailor resume", "customize resume", "improve resume for job", "update my resume"],
    supportedContextEntityTypes: ["job", "personal_profile"],
    entryPoints: ["for_me", "workflows", "assistant", "job_page", "profile_page"],
    requiredInputs: [
      { key: "target", label: "Target Job or Role", type: "entity_select", entityType: "job", required: true, placeholder: "Select a specific job or describe the role" },
    ],
    optionalInputs: [
      { key: "emphasis", label: "What to emphasize", type: "multi_select", required: false, options: ["Technical skills", "Leadership", "Design thinking", "Business impact", "Cross-team collaboration", "Startup agility"] },
      { key: "length_preference", label: "Resume length", type: "select", required: false, options: ["One page", "Two pages", "No preference"] },
    ],
    dataSources: [
      { id: "ds_profile", label: "Current profile → Complete work history, skills, education", entity: "personal_profile", fields: ["work_history", "skills", "education", "projects", "summary", "headline"], purpose: "Source of truth for resume content — nothing will be invented", canExclude: false, currentlyAvailable: true },
      { id: "ds_job", label: "Selected job → Requirements and keywords", entity: "job", fields: ["title", "requirements", "description", "keywords"], purpose: "Align resume language and emphasis with the role", canExclude: false, currentlyAvailable: false },
    ],
    requiredPermissions: [
      { key: "read_profile_full", label: "Read your complete profile", scope: "read", duration: "This session only", sensitive: false },
    ],
    prerequisites: ["Profile must have at least one work history entry"],
    steps: [
      { id: "s1", order: 1, label: "Read current profile", description: "AI reads your profile as the source of truth", isExternal: false, requiresApproval: false },
      { id: "s2", order: 2, label: "Analyze target role", description: "Extract keywords, requirements, and priorities from job", isExternal: false, requiresApproval: false },
      { id: "s3", order: 3, label: "Propose resume changes", description: "Generate a diff view: original vs. tailored. No information is invented.", isExternal: false, requiresApproval: false, outputProduced: "Resume diff and tailored version" },
      { id: "s4", order: 4, label: "Your review and edit", description: "You approve, reject, or edit each proposed change", isExternal: false, requiresApproval: true },
      { id: "s5", order: 5, label: "Save approved version", description: "Approved resume saved as a versioned artifact", isExternal: false, requiresApproval: false, outputProduced: "Approved tailored resume" },
    ],
    warningKinds: ["modifies_stored_data", "requires_explicit_approval"],
    approvalPolicy: {
      required: true,
      requiredFor: ["Apply resume changes to your profile or artifact"],
      displayLabel: "Requires your review before applying changes",
    },
    outputs: [
      { type: "resume", label: "Tailored Resume (approved)", saveLocation: "Outputs / Resume Library", linkedToCase: false, exportable: true, editableByUser: true },
      { type: "resume_diff", label: "Change Comparison", saveLocation: "Outputs / Resume Library", linkedToCase: false, exportable: false, editableByUser: false },
    ],
    caseCreated: false,
    caseBehavior: "none",
    externalSideEffects: [],
    followUpActions: ["Use tailored resume in job application", "Save to application package"],
    errorStates: [
      { code: "no_profile_content", label: "Profile has no resume content", description: "Your profile needs work history before a resume can be generated", recoveryAction: "Add work history and skills to your profile" },
      { code: "fabrication_blocked", label: "Change rejected — not in your profile", description: "AI cannot add experience that is not in your profile", recoveryAction: "Add the real experience to your profile first" },
    ],
    estimatedCredits: 8,
    entitlementRequired: "free",
    canIssueBadge: NEVER,
    canIssueVerification: NEVER,
    canModifyTrustScore: NEVER,
    canModifyProfessionalPower: NEVER,
    canHireOrRejectCandidate: NEVER,
    canSendWithoutApproval: NEVER,
    availabilityStatus: "published",
    knownLimitations: ["AI will not add experience or credentials not already in your profile", "Does not automatically update your live Hamrahe profile — only creates an artifact"],
  },

  // ── 4. INTERVIEW PREPARATION ─────────────────────────────────────────────────
  {
    id: "wf_interview_prep",
    slug: "interview-preparation",
    version: "1.0",
    name: "Prepare me for this interview",
    outcome: "Role-specific questions with evidence-backed answer structures, a practice session, and a final preparation brief.",
    category: "Interview Prep",
    categoryIcon: "MessageSquare",
    audience: "personal",
    requiresOrgContext: false,
    supportedIntents: ["prepare for interview", "practice interview", "interview questions", "get ready for interview"],
    supportedContextEntityTypes: ["job_application", "job"],
    entryPoints: ["for_me", "workflows", "assistant", "job_page"],
    requiredInputs: [
      { key: "application_id", label: "Select Application", type: "entity_select", entityType: "job_application", required: true },
      { key: "interview_stage", label: "Interview Stage", type: "select", required: true, options: ["Phone Screen", "Technical Assessment", "Design Challenge", "Panel Interview", "Final Round", "Executive Interview"] },
      { key: "interview_format", label: "Interview Format", type: "select", required: true, options: ["Video call", "In-person", "Asynchronous", "Case study", "Take-home"] },
    ],
    optionalInputs: [
      { key: "interviewer_info", label: "Interviewer Name / Role (if known)", type: "text", required: false },
      { key: "known_topics", label: "Topics you expect", type: "textarea", required: false, placeholder: "e.g. System design, portfolio review, culture fit" },
      { key: "concerns", label: "Your biggest concern about this interview", type: "textarea", required: false },
    ],
    dataSources: [
      { id: "ds_application", label: "Selected application → Job requirements and stage", entity: "job_application", fields: ["job_title", "company", "requirements", "stage", "timeline"], purpose: "Build role-specific questions", canExclude: false, currentlyAvailable: false },
      { id: "ds_company", label: "Company page → Public company information", entity: "organization_profile", fields: ["about", "culture", "recent_news", "products"], purpose: "Prepare company knowledge questions", canExclude: true, currentlyAvailable: false },
      { id: "ds_profile_evidence", label: "Current profile → Work history and achievements", entity: "personal_profile", fields: ["work_history", "projects", "achievements", "skills"], purpose: "Build evidence-backed STAR answers", canExclude: false, currentlyAvailable: true },
    ],
    requiredPermissions: [
      { key: "read_profile_experience", label: "Read your work history and achievements", scope: "read", duration: "This session only", sensitive: false },
    ],
    prerequisites: ["Must have at least one active or past job application"],
    steps: [
      { id: "s1", order: 1, label: "Connect to application and company", description: "Load job requirements, company info, and your application", isExternal: false, requiresApproval: false },
      { id: "s2", order: 2, label: "Identify interview focus areas", description: "Map role requirements to likely question areas", isExternal: false, requiresApproval: false },
      { id: "s3", order: 3, label: "Build question list", description: "Generate behavioral, technical, and situational questions specific to this role", isExternal: false, requiresApproval: false, outputProduced: "Question bank" },
      { id: "s4", order: 4, label: "Create evidence-backed answer structures", description: "For each question, map to real evidence from your profile using STAR format", isExternal: false, requiresApproval: false, outputProduced: "Answer guide" },
      { id: "s5", order: 5, label: "Practice session (optional)", description: "Interactive Q&A practice — you answer, AI gives feedback", isExternal: false, requiresApproval: false },
      { id: "s6", order: 6, label: "Produce preparation brief", description: "Final 1-page summary: key points, potential weak areas, questions to ask", isExternal: false, requiresApproval: false, outputProduced: "Preparation brief" },
    ],
    warningKinds: [],
    approvalPolicy: {
      required: false,
      requiredFor: [],
      displayLabel: "No approval required — all outputs are private to you",
    },
    outputs: [
      { type: "interview_brief", label: "Interview Preparation Brief", saveLocation: "Outputs / Applications", linkedToCase: true, exportable: true, editableByUser: true },
      { type: "question_bank", label: "Role-specific Question Bank", saveLocation: "Outputs / Applications", linkedToCase: true, exportable: false, editableByUser: true },
    ],
    caseCreated: true,
    caseBehavior: "update_existing",
    externalSideEffects: [],
    followUpActions: ["Add post-interview notes", "Record interview result", "Trigger negotiation prep if offer received"],
    errorStates: [
      { code: "no_application", label: "No application found", description: "Could not find an active application to link to", recoveryAction: "Start from the Jobs section and select an active application" },
    ],
    estimatedCredits: 10,
    entitlementRequired: "free",
    canIssueBadge: NEVER,
    canIssueVerification: NEVER,
    canModifyTrustScore: NEVER,
    canModifyProfessionalPower: NEVER,
    canHireOrRejectCandidate: NEVER,
    canSendWithoutApproval: NEVER,
    availabilityStatus: "published",
    knownLimitations: ["AI generates questions based on public job requirements — actual interview questions may differ", "Practice session does not simulate a real interviewer"],
  },

  // ── 5. PROFESSIONAL PROFILE IMPROVEMENT ─────────────────────────────────────
  {
    id: "wf_profile_improvement",
    slug: "profile-improvement",
    version: "1.0",
    name: "Improve my profile for a target role",
    outcome: "Prioritized, evidence-backed profile improvement suggestions connected to your goal — applied only after your approval.",
    category: "Profile & Resume",
    categoryIcon: "User",
    audience: "personal",
    requiresOrgContext: false,
    supportedIntents: ["improve profile", "strengthen profile", "profile recommendations", "profile for promotion", "optimize profile"],
    supportedContextEntityTypes: ["personal_profile", "goal"],
    entryPoints: ["for_me", "workflows", "assistant", "profile_page"],
    requiredInputs: [
      { key: "target_goal", label: "Target Role or Goal", type: "text", required: true, placeholder: "e.g. Head of Product, Senior Engineer, Startup Founder" },
    ],
    optionalInputs: [
      { key: "goal_id", label: "Link to an Active Goal", type: "entity_select", entityType: "goal", required: false },
      { key: "timeline", label: "Your timeline", type: "select", required: false, options: ["Immediately", "1–3 months", "3–6 months", "6–12 months", "No rush"] },
      { key: "focus_areas", label: "Focus areas", type: "multi_select", required: false, options: ["Headline and summary", "Work history evidence", "Skills and assessments", "Recommendations", "Portfolio / projects", "Education and credentials"] },
    ],
    dataSources: [
      { id: "ds_profile", label: "Current profile → All sections", entity: "personal_profile", fields: ["headline", "summary", "work_history", "skills", "education", "projects", "recommendations", "credentials"], purpose: "Identify incomplete or weak evidence areas", canExclude: false, currentlyAvailable: true },
      { id: "ds_goal", label: "Active goal → Target role and milestones", entity: "goal", fields: ["title", "target_role", "milestones", "evidence_coverage"], purpose: "Connect suggestions to your career goal", canExclude: true, currentlyAvailable: true },
    ],
    requiredPermissions: [
      { key: "read_profile_full", label: "Read your complete profile", scope: "read", duration: "This session only", sensitive: false },
    ],
    prerequisites: [],
    steps: [
      { id: "s1", order: 1, label: "Read existing profile", description: "AI reads the existing primary profile as source of truth", isExternal: false, requiresApproval: false },
      { id: "s2", order: 2, label: "Identify gaps and weak evidence", description: "Map each profile section against target role expectations", isExternal: false, requiresApproval: false },
      { id: "s3", order: 3, label: "Generate improvement suggestions", description: "Prioritized recommendations — each tied to a specific profile section", isExternal: false, requiresApproval: false, outputProduced: "Improvement plan" },
      { id: "s4", order: 4, label: "Preview proposed changes", description: "Every suggested change is shown as a diff before anything is applied", isExternal: false, requiresApproval: true },
      { id: "s5", order: 5, label: "Apply approved changes", description: "Only user-approved suggestions are applied to the profile", isExternal: false, requiresApproval: false },
    ],
    warningKinds: ["modifies_stored_data", "requires_explicit_approval"],
    approvalPolicy: {
      required: true,
      requiredFor: ["Apply changes to your Hamrahe profile"],
      displayLabel: "Requires your approval before profile changes are applied",
    },
    outputs: [
      { type: "profile_revision", label: "Profile Improvement Plan", saveLocation: "Outputs / Profile", linkedToCase: false, exportable: false, editableByUser: true },
    ],
    caseCreated: false,
    caseBehavior: "none",
    externalSideEffects: [],
    followUpActions: ["Track evidence coverage progress", "Identify next milestone"],
    errorStates: [
      { code: "fabrication_blocked", label: "Fabrication not allowed", description: "AI cannot suggest adding experience, skills, or achievements that do not exist", recoveryAction: "Add real experience or skills to your profile first" },
    ],
    estimatedCredits: 6,
    entitlementRequired: "free",
    canIssueBadge: NEVER,
    canIssueVerification: NEVER,
    canModifyTrustScore: NEVER,
    canModifyProfessionalPower: NEVER,
    canHireOrRejectCandidate: NEVER,
    canSendWithoutApproval: NEVER,
    availabilityStatus: "published",
    knownLimitations: ["AI will never add fake experience or credentials", "Profile score changes only reflect real completed improvements"],
  },

  // ── 6. SKILL EVIDENCE PREPARATION ───────────────────────────────────────────
  {
    id: "wf_skill_evidence",
    slug: "skill-evidence-prep",
    version: "1.0",
    name: "Build a skill evidence package",
    outcome: "A structured evidence package for a chosen skill — ready for submission to the independent verification or badge process.",
    category: "Skills & Evidence",
    categoryIcon: "ShieldCheck",
    audience: "personal",
    requiresOrgContext: false,
    supportedIntents: ["prove my skill", "build evidence for skill", "skill verification", "badge evidence", "get verified for skill"],
    supportedContextEntityTypes: ["skill", "credential", "verification_evidence"],
    entryPoints: ["for_me", "workflows", "assistant"],
    requiredInputs: [
      { key: "skill", label: "Skill to Prove", type: "text", required: true, placeholder: "e.g. Figma, Product Strategy, Data Analysis" },
    ],
    optionalInputs: [
      { key: "target", label: "What this is for", type: "select", required: false, options: ["Hamrahe skill verification", "Badge eligibility", "Credential submission", "Profile strengthening", "Job application"] },
    ],
    dataSources: [
      { id: "ds_profile_skills", label: "Current profile → Claimed skills and assessments", entity: "personal_profile", fields: ["skills", "assessments", "skill_endorsements"], purpose: "Show current skill claim and evidence baseline", canExclude: false, currentlyAvailable: true },
      { id: "ds_projects", label: "Current profile → Projects and outcomes", entity: "personal_profile", fields: ["projects", "outcomes", "links"], purpose: "Surface project evidence for skill", canExclude: true, currentlyAvailable: true },
      { id: "ds_credentials", label: "Credentials → Certificates and qualifications", entity: "credential", fields: ["title", "issuer", "date", "credential_id"], purpose: "Include formal credentials supporting the skill", canExclude: true, currentlyAvailable: true },
      { id: "ds_assessments", label: "Assessment results → Completed assessments", entity: "assessment", fields: ["skill", "score", "date", "issuer"], purpose: "Include scored assessment evidence", canExclude: true, currentlyAvailable: false },
    ],
    requiredPermissions: [
      { key: "read_profile_skills", label: "Read your claimed skills and endorsements", scope: "read", duration: "This session only", sensitive: false },
      { key: "read_credentials", label: "Read your credentials and certificates", scope: "read", duration: "This session only", sensitive: false },
    ],
    prerequisites: [],
    steps: [
      { id: "s1", order: 1, label: "Identify current evidence", description: "Collect all existing evidence for the chosen skill from your profile", isExternal: false, requiresApproval: false },
      { id: "s2", order: 2, label: "Identify evidence gaps", description: "Show what is missing or weak in the current evidence", isExternal: false, requiresApproval: false },
      { id: "s3", order: 3, label: "Connect supporting evidence", description: "Link relevant projects, credentials, assessments, and endorsements", isExternal: false, requiresApproval: false, outputProduced: "Evidence package draft" },
      { id: "s4", order: 4, label: "Your review", description: "You review and can add, remove, or annotate evidence items", isExternal: false, requiresApproval: true },
      { id: "s5", order: 5, label: "Submit to process (if requested)", description: "Package submitted to the verification or badge process — AI does not issue the outcome", isExternal: true, requiresApproval: true },
    ],
    warningKinds: ["requires_explicit_approval"],
    approvalPolicy: {
      required: true,
      requiredFor: ["Submit evidence package to verification or badge process"],
      displayLabel: "Requires your approval before submission",
    },
    outputs: [
      { type: "evidence_package", label: "Skill Evidence Package", saveLocation: "Outputs / Evidence", linkedToCase: false, exportable: true, editableByUser: true },
    ],
    caseCreated: false,
    caseBehavior: "none",
    externalSideEffects: ["Evidence package may be submitted to independent verification or badge process"],
    followUpActions: ["Track submission status", "Add additional evidence if requested"],
    errorStates: [
      { code: "no_skill_evidence", label: "No evidence found", description: "No profile content supports this skill claim", recoveryAction: "Add projects, credentials, or assessments that demonstrate this skill" },
    ],
    estimatedCredits: 6,
    entitlementRequired: "free",
    canIssueBadge: NEVER,
    canIssueVerification: NEVER,
    canModifyTrustScore: NEVER,
    canModifyProfessionalPower: NEVER,
    canHireOrRejectCandidate: NEVER,
    canSendWithoutApproval: NEVER,
    availabilityStatus: "published",
    knownLimitations: ["AI prepares the package but cannot approve verification or issue badges", "Badge eligibility is evaluated independently"],
  },

  // ── 7. LEARNING PLAN ─────────────────────────────────────────────────────────
  {
    id: "wf_learning_plan",
    slug: "learning-plan",
    version: "1.0",
    name: "Build a learning plan for a skill gap",
    outcome: "A structured, milestone-based learning plan using active Hamrahe Learning resources — connected to your career goal.",
    category: "Learning & Assessment",
    categoryIcon: "BookOpen",
    audience: "personal",
    requiresOrgContext: false,
    supportedIntents: ["learning plan", "upskill", "close skill gap", "learn skill", "build learning path"],
    supportedContextEntityTypes: ["skill", "goal", "learning_path"],
    entryPoints: ["for_me", "workflows", "assistant", "learning"],
    requiredInputs: [
      { key: "skill_gap", label: "Skill to develop", type: "text", required: true, placeholder: "e.g. System design, Figma Auto Layout, Data storytelling" },
      { key: "timeframe", label: "Your available timeframe", type: "select", required: true, options: ["2 weeks", "1 month", "6 weeks", "3 months", "6 months", "Flexible"] },
    ],
    optionalInputs: [
      { key: "goal_id", label: "Link to career goal", type: "entity_select", entityType: "goal", required: false },
      { key: "current_level", label: "Your current level", type: "select", required: false, options: ["Complete beginner", "Some exposure", "Intermediate", "Advanced — deepening"] },
      { key: "learning_style", label: "Preferred learning style", type: "multi_select", required: false, options: ["Video courses", "Reading / articles", "Hands-on projects", "Assessments and quizzes", "Live sessions"] },
      { key: "time_per_week", label: "Hours available per week", type: "select", required: false, options: ["1–2 hours", "3–5 hours", "5–10 hours", "10+ hours"] },
    ],
    dataSources: [
      { id: "ds_learning_history", label: "Learning history → Completed courses and activities", entity: "learning_item", fields: ["title", "skill", "completed_at", "score"], purpose: "Avoid repeating completed content", canExclude: true, currentlyAvailable: false },
      { id: "ds_assessments", label: "Assessment results → Skill scores", entity: "assessment", fields: ["skill", "score", "date"], purpose: "Calibrate starting level", canExclude: true, currentlyAvailable: false },
      { id: "ds_goal", label: "Active goal → Target role and milestones", entity: "goal", fields: ["target_role", "milestones", "evidence_coverage"], purpose: "Align learning plan to career goal", canExclude: true, currentlyAvailable: true },
    ],
    requiredPermissions: [
      { key: "read_learning_history", label: "Read your learning and course history", scope: "read", duration: "This session only", sensitive: false },
    ],
    prerequisites: [],
    steps: [
      { id: "s1", order: 1, label: "Assess current level", description: "Evaluate your starting point from learning history and assessments", isExternal: false, requiresApproval: false },
      { id: "s2", order: 2, label: "Map skill gap to learning resources", description: "Select active Hamrahe Learning content covering the gap", isExternal: false, requiresApproval: false },
      { id: "s3", order: 3, label: "Build milestones and tasks", description: "Create a time-based plan with weekly milestones and specific tasks", isExternal: false, requiresApproval: false, outputProduced: "Learning plan draft" },
      { id: "s4", order: 4, label: "Your review", description: "Review and adjust the plan before saving", isExternal: false, requiresApproval: true },
      { id: "s5", order: 5, label: "Save and track", description: "Plan saved to your Learning section for progress tracking", isExternal: false, requiresApproval: false },
    ],
    warningKinds: [],
    approvalPolicy: {
      required: false,
      requiredFor: [],
      displayLabel: "No approval required — plan is private to you",
    },
    outputs: [
      { type: "learning_plan", label: "Learning Plan", saveLocation: "Learning / My Plans", linkedToCase: false, exportable: false, editableByUser: true },
    ],
    caseCreated: false,
    caseBehavior: "none",
    externalSideEffects: [],
    followUpActions: ["Track completed learning activities", "Update goal evidence coverage when activities are completed", "Suggest Assessment Center assessment when ready"],
    errorStates: [
      { code: "no_resources", label: "No matching learning resources", description: "No active Hamrahe Learning content was found for this skill", recoveryAction: "Try a broader skill description or browse Learning directly" },
    ],
    estimatedCredits: 5,
    entitlementRequired: "free",
    canIssueBadge: NEVER,
    canIssueVerification: NEVER,
    canModifyTrustScore: NEVER,
    canModifyProfessionalPower: NEVER,
    canHireOrRejectCandidate: NEVER,
    canSendWithoutApproval: NEVER,
    availabilityStatus: "published",
    knownLimitations: ["Plan completion does not automatically change Professional Power — only real completed activities count", "Assessment Center is separate from Learning"],
  },

  // ── 8. NETWORKING MESSAGE ────────────────────────────────────────────────────
  {
    id: "wf_networking_message",
    slug: "networking-message",
    version: "1.0",
    name: "Draft a message to a connection",
    outcome: "Thoughtful, relevant message variants ready for your review and approval before sending.",
    category: "Networking & Intro",
    categoryIcon: "MessageCircle",
    audience: "personal",
    requiresOrgContext: false,
    supportedIntents: ["message a connection", "reach out to someone", "network outreach", "send introduction", "follow up with contact"],
    supportedContextEntityTypes: ["connection", "person"],
    entryPoints: ["for_me", "workflows", "assistant", "messages"],
    requiredInputs: [
      { key: "recipient_id", label: "Select Recipient", type: "entity_select", entityType: "connection", required: true },
      { key: "message_purpose", label: "Purpose of the message", type: "select", required: true, options: ["Introduction / connect request", "Informational interview request", "Referral request", "Collaboration proposal", "Following up after meeting", "Thank you", "Advice request"] },
    ],
    optionalInputs: [
      { key: "tone", label: "Tone", type: "select", required: false, options: ["Warm and personal", "Professional", "Concise", "Enthusiastic"] },
      { key: "specific_ask", label: "Your specific ask (if any)", type: "textarea", required: false, placeholder: "e.g. 20-minute call, introduction to hiring manager" },
      { key: "shared_context", label: "Shared context to reference", type: "textarea", required: false, placeholder: "e.g. We met at XYZ event, you commented on my post" },
    ],
    dataSources: [
      { id: "ds_relationship", label: "Relationship context → Connection history and mutual activity", entity: "connection", fields: ["connection_date", "mutual_connections", "recent_interactions"], purpose: "Make the message relevant and personal", permissionKey: "read_relationship_context", canExclude: false, currentlyAvailable: false },
      { id: "ds_recipient_profile", label: "Recipient profile → Public information only", entity: "person", fields: ["headline", "current_role", "public_skills"], purpose: "Reference relevant background without using private data", canExclude: true, currentlyAvailable: false },
    ],
    requiredPermissions: [
      { key: "read_relationship_context", label: "Read the visible relationship context for this connection", scope: "read", duration: "This session only", sensitive: true },
    ],
    prerequisites: ["Recipient must be an existing connection"],
    steps: [
      { id: "s1", order: 1, label: "Load relationship context", description: "Read connection history and mutual context — only with your permission", isExternal: false, requiresApproval: false },
      { id: "s2", order: 2, label: "Generate message variants", description: "Create 2–3 message options with different tones", isExternal: false, requiresApproval: false, outputProduced: "Message variants" },
      { id: "s3", order: 3, label: "Your review and edit", description: "Review variants, edit, and select the one you want to send", isExternal: false, requiresApproval: true },
      { id: "s4", order: 4, label: "Preview recipient and final message", description: "Final preview before sending — shows exactly who receives what", isExternal: false, requiresApproval: true },
      { id: "s5", order: 5, label: "Send message", description: "Message sent only after your explicit confirmation", isExternal: true, requiresApproval: true, outputProduced: "Sent message record" },
    ],
    warningKinds: ["sends_or_publishes", "affects_another_person", "uses_sensitive_info", "requires_explicit_approval"],
    approvalPolicy: {
      required: true,
      requiredFor: ["Send message to recipient"],
      displayLabel: "Requires your approval before sending",
    },
    outputs: [
      { type: "message_draft", label: "Message Draft", saveLocation: "Messages / Drafts", linkedToCase: false, exportable: false, editableByUser: true },
    ],
    caseCreated: false,
    caseBehavior: "none",
    externalSideEffects: ["Sends a message to the selected connection after approval"],
    followUpActions: ["Save interaction to relationship history", "Set follow-up reminder if no reply"],
    errorStates: [
      { code: "not_a_connection", label: "Recipient is not a connection", description: "You can only message existing connections with this workflow", recoveryAction: "Connect with the person first or use the connection request flow" },
      { code: "permission_denied", label: "Relationship context permission denied", description: "Message will be generated without relationship context", recoveryAction: "Grant permission or continue without context" },
    ],
    estimatedCredits: 4,
    entitlementRequired: "free",
    canIssueBadge: NEVER,
    canIssueVerification: NEVER,
    canModifyTrustScore: NEVER,
    canModifyProfessionalPower: NEVER,
    canHireOrRejectCandidate: NEVER,
    canSendWithoutApproval: NEVER,
    availabilityStatus: "published",
    knownLimitations: ["AI never sends a message automatically — you must confirm", "Relationship context is only used with your explicit permission"],
  },

  // ── 9. CONTENT AND PROFESSIONAL BRAND ───────────────────────────────────────
  {
    id: "wf_content_brand",
    slug: "content-brand",
    version: "1.0",
    name: "Create professional content for my brand",
    outcome: "An outline and multiple content drafts — ready for your review, editing, and approval before publishing.",
    category: "Content & Brand",
    categoryIcon: "PenTool",
    audience: "personal",
    requiresOrgContext: false,
    supportedIntents: ["write a post", "create content", "article draft", "professional article", "thought leadership", "share insight"],
    supportedContextEntityTypes: ["post", "article", "goal"],
    entryPoints: ["for_me", "workflows", "assistant"],
    requiredInputs: [
      { key: "topic", label: "Topic or core idea", type: "textarea", required: true, placeholder: "What insight, lesson, or perspective do you want to share?" },
      { key: "content_type", label: "Content format", type: "select", required: true, options: ["Short post (LinkedIn-style)", "Long-form article", "Carousel outline", "Newsletter section", "Opinion piece"] },
      { key: "audience", label: "Intended audience", type: "text", required: true, placeholder: "e.g. Product managers, early-career engineers, startup founders" },
    ],
    optionalInputs: [
      { key: "goal_connection", label: "Connect to career goal", type: "entity_select", entityType: "goal", required: false },
      { key: "key_points", label: "Key points to include", type: "textarea", required: false, placeholder: "Specific arguments, examples, or data points" },
      { key: "tone", label: "Tone", type: "select", required: false, options: ["Authoritative", "Conversational", "Storytelling", "Data-driven", "Inspirational"] },
      { key: "sources", label: "Sources to reference", type: "textarea", required: false, placeholder: "Articles, research, or experiences you want to cite" },
    ],
    dataSources: [
      { id: "ds_expertise", label: "Your profile → Expertise areas and work history", entity: "personal_profile", fields: ["headline", "skills", "work_history", "published_articles"], purpose: "Connect content to your genuine expertise", canExclude: true, currentlyAvailable: true },
    ],
    requiredPermissions: [
      { key: "read_profile_expertise", label: "Read your headline, skills, and expertise areas", scope: "read", duration: "This session only", sensitive: false },
    ],
    prerequisites: [],
    steps: [
      { id: "s1", order: 1, label: "Understand your angle", description: "Clarify the core insight and audience", isExternal: false, requiresApproval: false },
      { id: "s2", order: 2, label: "Detect unsupported claims", description: "Flag any claims that lack sourcing before drafting", isExternal: false, requiresApproval: false },
      { id: "s3", order: 3, label: "Generate outline", description: "Create a structured outline for your review", isExternal: false, requiresApproval: false, outputProduced: "Content outline" },
      { id: "s4", order: 4, label: "Draft content variants", description: "Generate 1–2 draft versions", isExternal: false, requiresApproval: false, outputProduced: "Content drafts" },
      { id: "s5", order: 5, label: "Your review and edit", description: "Review drafts, make edits, and select or combine", isExternal: false, requiresApproval: true },
      { id: "s6", order: 6, label: "Publish or schedule", description: "Content published or scheduled only after your confirmation", isExternal: true, requiresApproval: true },
    ],
    warningKinds: ["sends_or_publishes", "requires_explicit_approval"],
    approvalPolicy: {
      required: true,
      requiredFor: ["Publish or schedule content"],
      displayLabel: "Requires your approval before publishing",
    },
    outputs: [
      { type: "content_draft", label: "Content Draft", saveLocation: "Outputs / Content", linkedToCase: false, exportable: true, editableByUser: true },
    ],
    caseCreated: false,
    caseBehavior: "none",
    externalSideEffects: ["Publishes or schedules content after approval"],
    followUpActions: ["Track post performance in Analytics", "Schedule follow-up content"],
    errorStates: [
      { code: "unsupported_claim", label: "Unsupported claim flagged", description: "Draft includes a claim that lacks evidence or sourcing", recoveryAction: "Remove or add a source for the flagged claim" },
    ],
    estimatedCredits: 8,
    entitlementRequired: "free",
    canIssueBadge: NEVER,
    canIssueVerification: NEVER,
    canModifyTrustScore: NEVER,
    canModifyProfessionalPower: NEVER,
    canHireOrRejectCandidate: NEVER,
    canSendWithoutApproval: NEVER,
    availabilityStatus: "published",
    knownLimitations: ["AI flags unsupported claims but cannot verify all factual sources", "Content is not published automatically — you must confirm"],
  },

  // ── 10. FREELANCE PROPOSAL ───────────────────────────────────────────────────
  {
    id: "wf_freelance_proposal",
    slug: "freelance-proposal",
    version: "1.0",
    name: "Prepare a freelance proposal",
    outcome: "A structured proposal with scope, approach, timeline, and pricing — submitted only after your approval.",
    category: "Projects & Freelancing",
    categoryIcon: "Rocket",
    audience: "personal",
    requiresOrgContext: false,
    supportedIntents: ["prepare proposal", "bid on project", "freelance application", "write a proposal", "project bid"],
    supportedContextEntityTypes: ["freelance_opportunity", "project"],
    entryPoints: ["for_me", "workflows", "assistant", "project_page"],
    requiredInputs: [
      { key: "project_id", label: "Select Project", type: "entity_select", entityType: "freelance_opportunity", required: true },
    ],
    optionalInputs: [
      { key: "rate_type", label: "Rate type", type: "select", required: false, options: ["Fixed project fee", "Hourly rate", "Milestone-based", "Retainer"] },
      { key: "proposed_rate", label: "Proposed rate", type: "currency", required: false, placeholder: "Your proposed rate or fee" },
      { key: "availability", label: "Your availability", type: "select", required: false, options: ["Immediately", "Within 1 week", "Within 2 weeks", "Negotiable"] },
      { key: "relevant_work", label: "Most relevant work to reference", type: "textarea", required: false, placeholder: "Describe past work that best applies to this project" },
    ],
    dataSources: [
      { id: "ds_profile", label: "Current profile → Skills, projects, and experience", entity: "personal_profile", fields: ["skills", "projects", "work_history", "headline"], purpose: "Build proposal from real evidence", canExclude: false, currentlyAvailable: true },
      { id: "ds_project", label: "Selected project → Requirements and scope", entity: "freelance_opportunity", fields: ["title", "description", "requirements", "budget_range", "timeline"], purpose: "Align proposal to project expectations", canExclude: false, currentlyAvailable: false },
    ],
    requiredPermissions: [
      { key: "read_profile_portfolio", label: "Read your profile, projects, and skills", scope: "read", duration: "This session only", sensitive: false },
    ],
    prerequisites: [],
    steps: [
      { id: "s1", order: 1, label: "Analyze project requirements", description: "Extract scope, deliverables, and requirements from the project listing", isExternal: false, requiresApproval: false },
      { id: "s2", order: 2, label: "Compare to your evidence", description: "Identify strong matches and gaps in your profile vs. project needs", isExternal: false, requiresApproval: false },
      { id: "s3", order: 3, label: "Collect missing inputs", description: "Ask for rate, availability, and relevant work if not provided", isExternal: false, requiresApproval: false },
      { id: "s4", order: 4, label: "Draft proposal", description: "Generate scope, approach, timeline, assumptions, and proposal copy", isExternal: false, requiresApproval: false, outputProduced: "Proposal draft" },
      { id: "s5", order: 5, label: "Your review", description: "Review and edit the complete proposal", isExternal: false, requiresApproval: true },
      { id: "s6", order: 6, label: "Submit proposal", description: "Submitted only after your explicit confirmation", isExternal: true, requiresApproval: true },
    ],
    warningKinds: ["sends_or_publishes", "requires_explicit_approval"],
    approvalPolicy: {
      required: true,
      requiredFor: ["Submit proposal to project owner"],
      displayLabel: "Requires your approval before submission",
    },
    outputs: [
      { type: "proposal", label: "Freelance Proposal", saveLocation: "Outputs / Projects", linkedToCase: false, exportable: true, editableByUser: true },
    ],
    caseCreated: false,
    caseBehavior: "none",
    externalSideEffects: ["Submits proposal after approval"],
    followUpActions: ["Track proposal status", "Follow up if no response in 5 days"],
    errorStates: [
      { code: "no_project", label: "No project selected", description: "A specific project must be selected", recoveryAction: "Browse Projects and select a freelance opportunity" },
    ],
    estimatedCredits: 7,
    entitlementRequired: "free",
    canIssueBadge: NEVER,
    canIssueVerification: NEVER,
    canModifyTrustScore: NEVER,
    canModifyProfessionalPower: NEVER,
    canHireOrRejectCandidate: NEVER,
    canSendWithoutApproval: NEVER,
    availabilityStatus: "published",
    knownLimitations: ["No financial custody, escrow, or payment processing — strictly proposal content only"],
  },

  // ── 11. ORGANIZATIONAL JOB AND HIRING WORKFLOW ───────────────────────────────
  {
    id: "wf_org_hiring",
    slug: "org-hiring-workflow",
    version: "1.0",
    name: "Prepare a job posting and analyze applicants",
    outcome: "A structured job posting and an evidence-based applicant review — with hiring and rejection decisions remaining human.",
    category: "Hiring & Recruiting",
    categoryIcon: "Users",
    audience: "organizational",
    requiresOrgContext: true,
    requiredOrgRole: "HR Manager / Talent Acquisition / Admin",
    supportedIntents: ["post a job", "review candidates", "screen applicants", "hiring workflow", "analyze applications"],
    supportedContextEntityTypes: ["organization", "job", "candidate", "job_application"],
    entryPoints: ["for_me", "workflows", "assistant"],
    requiredInputs: [
      { key: "org_context", label: "Organization", type: "entity_select", entityType: "organization", required: true },
      { key: "action", label: "What do you want to do", type: "select", required: true, options: ["Create a new job posting", "Review applicants for an existing job", "Both"] },
    ],
    optionalInputs: [
      { key: "job_id", label: "Existing Job (if reviewing)", type: "entity_select", entityType: "job", required: false },
      { key: "role_title", label: "Role Title (if creating)", type: "text", required: false, placeholder: "e.g. Senior Product Designer" },
      { key: "required_experience", label: "Required experience (years)", type: "number", required: false },
      { key: "must_have_skills", label: "Must-have skills", type: "multi_select", required: false, options: ["Figma", "System Design", "User Research", "Data Analysis", "Leadership", "Technical Writing"] },
      { key: "nice_to_have_skills", label: "Nice-to-have skills", type: "multi_select", required: false, options: ["Motion Design", "Accessibility", "Design Systems", "A/B Testing", "Agile"] },
    ],
    dataSources: [
      { id: "ds_org_profile", label: "Organization profile → Public company information", entity: "organization_profile", fields: ["about", "culture", "benefits", "team_size"], purpose: "Include accurate company context in job posting", canExclude: false, currentlyAvailable: true },
      { id: "ds_applicants", label: "Job applications → Applicant profile evidence", entity: "job_application", fields: ["profile_summary", "verified_skills", "work_history", "assessment_scores"], purpose: "Evidence-based, job-relevant candidate analysis", canExclude: false, currentlyAvailable: false },
    ],
    requiredPermissions: [
      { key: "read_org_profile", label: "Read your organization profile for job posting content", scope: "read", duration: "This session only", sensitive: false },
      { key: "read_applicant_evidence", label: "Read applicant job-relevant evidence (authorized HR role required)", scope: "read", duration: "This session only", sensitive: true },
    ],
    prerequisites: ["Must be operating in an organizational context", "Must have HR Manager, Talent Acquisition, or Admin role in the organization"],
    steps: [
      { id: "s1", order: 1, label: "Verify organizational authorization", description: "Confirm you have the required role in the selected organization", isExternal: false, requiresApproval: false },
      { id: "s2", order: 2, label: "Define role requirements", description: "Collect or read existing job requirements", isExternal: false, requiresApproval: false },
      { id: "s3", order: 3, label: "Prepare job content", description: "Generate complete job posting with requirements, description, and process details", isExternal: false, requiresApproval: false, outputProduced: "Job posting draft" },
      { id: "s4", order: 4, label: "Analyze applicants (if requested)", description: "Review applicants using job-relevant evidence only. Protected and irrelevant attributes are excluded.", isExternal: false, requiresApproval: false, outputProduced: "Candidate review" },
      { id: "s5", order: 5, label: "Your review and decisions", description: "Shortlist, interview, hire, and reject decisions are made by you — not by AI", isExternal: false, requiresApproval: true },
      { id: "s6", order: 6, label: "Contact candidates (if approved)", description: "Candidate contact requires your explicit authorization", isExternal: true, requiresApproval: true },
    ],
    warningKinds: ["requires_org_authorization", "affects_another_person", "requires_explicit_approval"],
    approvalPolicy: {
      required: true,
      requiredFor: ["Publish job posting", "Contact candidates"],
      displayLabel: "Organization approval required before publishing or contacting",
      approvingRole: "HR Manager / Talent Acquisition / Admin",
    },
    outputs: [
      { type: "job_posting", label: "Job Posting", saveLocation: "Outputs / Hiring", linkedToCase: true, exportable: true, editableByUser: true },
      { type: "candidate_review", label: "Applicant Evidence Review", saveLocation: "Outputs / Hiring", linkedToCase: true, exportable: false, editableByUser: false },
    ],
    caseCreated: true,
    caseBehavior: "create_new",
    externalSideEffects: ["Publishes job posting after authorization", "Sends candidate communications after authorization"],
    followUpActions: ["Track applicant responses", "Record hiring decisions"],
    errorStates: [
      { code: "no_org_role", label: "Organization role required", description: "You do not have the required role in this organization", recoveryAction: "Contact your organization admin to grant HR or Talent Acquisition access" },
      { code: "protected_attribute_detected", label: "Protected attribute excluded", description: "A protected or irrelevant attribute was detected and has been excluded from analysis", recoveryAction: "Review the candidate analysis with only job-relevant evidence" },
    ],
    estimatedCredits: 20,
    entitlementRequired: "enterprise",
    canIssueBadge: NEVER,
    canIssueVerification: NEVER,
    canModifyTrustScore: NEVER,
    canModifyProfessionalPower: NEVER,
    canHireOrRejectCandidate: NEVER,
    canSendWithoutApproval: NEVER,
    availabilityStatus: "published",
    knownLimitations: [
      "Hiring, shortlisting, and rejection decisions are human decisions — AI provides evidence summaries only",
      "Protected attributes (gender, age, religion, ethnicity, disability) are excluded from all analysis",
      "Candidate contact requires authorized human confirmation",
    ],
  },

  // ── 12. PARTNERSHIP OPPORTUNITY WORKFLOW ─────────────────────────────────────
  {
    id: "wf_partnership",
    slug: "partnership-opportunity",
    version: "1.0",
    name: "Prepare a partnership opportunity brief",
    outcome: "A structured opportunity brief, stakeholder questions, and a draft outreach message — sent only after your approval.",
    category: "B2B & Sales",
    categoryIcon: "Handshake",
    audience: "organizational",
    requiresOrgContext: true,
    requiredOrgRole: "Business Development / Executive / Admin",
    supportedIntents: ["prepare partnership brief", "business development", "partner outreach", "analyze opportunity", "partnership proposal"],
    supportedContextEntityTypes: ["organization", "organization_profile"],
    entryPoints: ["for_me", "workflows", "assistant", "company_page"],
    requiredInputs: [
      { key: "org_context", label: "Your Organization", type: "entity_select", entityType: "organization", required: true },
      { key: "target_org", label: "Target Organization or Partner", type: "text", required: true, placeholder: "e.g. Café Bazaar, Torob, a specific company" },
      { key: "partnership_type", label: "Partnership type", type: "select", required: true, options: ["Distribution / Channel", "Technology integration", "Co-marketing", "Strategic investment", "Joint product", "Reseller / Referral", "Other"] },
    ],
    optionalInputs: [
      { key: "known_contacts", label: "Known contacts at the target", type: "textarea", required: false, placeholder: "Names or roles of people you know there" },
      { key: "mutual_value", label: "What you offer them", type: "textarea", required: false, placeholder: "Your value proposition for this partner" },
      { key: "expected_outcome", label: "Expected business outcome", type: "textarea", required: false, placeholder: "Revenue, reach, product improvement..." },
      { key: "context_notes", label: "Relevant context or background", type: "textarea", required: false, placeholder: "Previous conversations, shared customers, competitive landscape" },
    ],
    dataSources: [
      { id: "ds_your_org", label: "Your organization profile → Products, services, and capabilities", entity: "organization_profile", fields: ["about", "products", "services", "team_size", "target_market"], purpose: "Build your side of the value proposition", canExclude: false, currentlyAvailable: true },
      { id: "ds_target_public", label: "Target organization → Public profile information", entity: "organization_profile", fields: ["about", "products", "news", "leadership"], purpose: "Understand their business and identify mutual value", canExclude: true, currentlyAvailable: false },
      { id: "ds_user_input", label: "Your input → Partnership context and notes", entity: "person", fields: ["known_contacts", "mutual_value", "expected_outcome"], purpose: "Personalize the brief and outreach", canExclude: false, currentlyAvailable: true },
    ],
    requiredPermissions: [
      { key: "read_org_profile_full", label: "Read your organization's profile and capabilities", scope: "read", duration: "This session only", sensitive: false },
    ],
    prerequisites: ["Must be operating in an authorized organizational context"],
    steps: [
      { id: "s1", order: 1, label: "Understand both organizations", description: "Read your organization and gather public information about the target", isExternal: false, requiresApproval: false },
      { id: "s2", order: 2, label: "Build opportunity brief", description: "Identify mutual value, synergies, and open questions", isExternal: false, requiresApproval: false, outputProduced: "Opportunity brief" },
      { id: "s3", order: 3, label: "Prepare stakeholder questions", description: "Generate discovery questions to ask in first conversation", isExternal: false, requiresApproval: false, outputProduced: "Stakeholder questions" },
      { id: "s4", order: 4, label: "Draft outreach message", description: "Create outreach variants for your review", isExternal: false, requiresApproval: false, outputProduced: "Outreach draft" },
      { id: "s5", order: 5, label: "Your review", description: "Review brief, questions, and outreach before any contact", isExternal: false, requiresApproval: true },
      { id: "s6", order: 6, label: "Send outreach", description: "Outreach sent only after your explicit confirmation", isExternal: true, requiresApproval: true },
    ],
    warningKinds: ["sends_or_publishes", "requires_org_authorization", "affects_another_person", "requires_explicit_approval"],
    approvalPolicy: {
      required: true,
      requiredFor: ["Send outreach to target organization"],
      displayLabel: "Organization approval required before sending outreach",
      approvingRole: "Business Development / Executive / Admin",
    },
    outputs: [
      { type: "opportunity_brief", label: "Partnership Opportunity Brief", saveLocation: "Outputs / Business Development", linkedToCase: true, exportable: true, editableByUser: true },
      { type: "message_draft", label: "Outreach Message Draft", saveLocation: "Outputs / Business Development", linkedToCase: true, exportable: true, editableByUser: true },
    ],
    caseCreated: true,
    caseBehavior: "create_new",
    externalSideEffects: ["Sends outreach message after approval"],
    followUpActions: ["Record response in case", "Schedule follow-up if no reply in 5 days", "Log meeting notes after first conversation"],
    errorStates: [
      { code: "no_org_context", label: "No organizational context", description: "This workflow requires an active organization context", recoveryAction: "Switch to an organization context using the context switcher" },
    ],
    estimatedCredits: 12,
    entitlementRequired: "pro",
    canIssueBadge: NEVER,
    canIssueVerification: NEVER,
    canModifyTrustScore: NEVER,
    canModifyProfessionalPower: NEVER,
    canHireOrRejectCandidate: NEVER,
    canSendWithoutApproval: NEVER,
    availabilityStatus: "published",
    knownLimitations: ["AI cannot access private company financials or internal data", "Target organization public information may be incomplete"],
  },
];

// ─── REGISTRY HELPERS ─────────────────────────────────────────────────────────

export function getWorkflowById(id: string): WorkflowContract | undefined {
  return WORKFLOW_REGISTRY.find((w) => w.id === id);
}

export function getWorkflowsByCategory(category: string): WorkflowContract[] {
  return WORKFLOW_REGISTRY.filter((w) => w.category === category && w.availabilityStatus === "published");
}

export function getPublishedWorkflows(): WorkflowContract[] {
  return WORKFLOW_REGISTRY.filter((w) => w.availabilityStatus === "published");
}

export function getWorkflowsByAudience(audience: "personal" | "organizational" | "shared"): WorkflowContract[] {
  return WORKFLOW_REGISTRY.filter((w) => w.audience === audience && w.availabilityStatus === "published");
}

export function getWorkflowsForEntryPoint(entryPoint: string): WorkflowContract[] {
  return WORKFLOW_REGISTRY.filter((w) => w.entryPoints.includes(entryPoint as any) && w.availabilityStatus === "published");
}

export function searchWorkflows(query: string): WorkflowContract[] {
  const q = query.toLowerCase();
  return WORKFLOW_REGISTRY.filter(
    (w) =>
      w.availabilityStatus === "published" &&
      (w.name.toLowerCase().includes(q) ||
        w.outcome.toLowerCase().includes(q) ||
        w.category.toLowerCase().includes(q) ||
        w.supportedIntents.some((i) => i.includes(q)))
  );
}

export const WORKFLOW_CATEGORIES = [
  "Jobs & Career",
  "Profile & Resume",
  "Interview Prep",
  "Skills & Evidence",
  "Networking & Intro",
  "Content & Brand",
  "Learning & Assessment",
  "Projects & Freelancing",
  "Hiring & Recruiting",
  "B2B & Sales",
] as const;
