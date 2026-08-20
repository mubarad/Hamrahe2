You’re right. The prompt should have been entirely in English. Use the following English version in Figma Make:

```text
MASTER IMPLEMENTATION PROMPT
HAMRAHE — AI ENGINE

Design and implement a complete, production-grade, fully clickable AI Engine inside the existing Hamrahe project.

Do not create a separate concept, isolated prototype, new application, or disconnected dashboard. Work directly inside the current Hamrahe project and integrate the AI Engine with all existing pages, components, navigation, user profiles, organization profiles, data structures, and interaction patterns.

The attached Hamrahe screenshots are the primary visual references. Preserve the recognizable Hamrahe identity while upgrading the experience to the quality expected from a world-class professional network and intelligent work platform in 2026.

The implementation must be functional, responsive, accessible, bilingual, theme-aware, and connected to the rest of the product.

Do not stop at explaining the design. Build it inside the current project.

---

# 1. Inspect the Existing Project First

Before creating or modifying anything:

- Inspect the complete existing project structure
- Identify the framework, routing system, state management, data layer, styling approach, component library, icons, fonts, tokens, themes, and responsive rules
- Inspect all existing pages and routes
- Identify existing personal and organization profiles
- Identify existing Home, Feed, Network, Jobs, Projects, Learning, Assessment, Messages, Events, Groups, Search, Alerts, Premium, Settings, Verification, Analytics, and Admin experiences
- Identify reusable cards, buttons, inputs, modals, drawers, tabs, tables, navigation elements, badges, score indicators, filters, timelines, and empty states
- Identify existing mock data and application entities
- Preserve all existing capabilities
- Reuse existing components whenever appropriate
- Extend the current system instead of rebuilding it inconsistently
- Do not duplicate pages, components, profiles, or business logic
- Do not remove or arbitrarily redesign existing Hamrahe functionality
- Do not break existing routes or clickable prototype flows

Create the AI Engine only after understanding the current product structure.

---

# 2. Product Definition

The name of this product area must be exactly:

AI Engine

Do not use:

- AI Center
- Intelligence Center
- Smart Center
- Professional Dashboard
- AI Dashboard
- Career Dashboard
- Copilot Center
- Command Center

AI Engine is a primary product page inside Hamrahe.

It is not a separate website, a separate application, or a second user account environment.

It must combine:

- A complete intelligent assistant
- Contextual assistants across the entire product
- A structured tool registry
- Goals and professional growth
- Professional analytics
- Verification guidance
- Trust explanation
- Badge and credential journeys
- Cases
- Saved outputs
- Memory
- Consent and permissions
- AI usage and quotas
- Personal and organizational modes
- Version history
- Human approvals
- Auditability
- Bidirectional integration with the entire Hamrahe platform

AI Engine must not become a generic chatbot with a blank text box.

It must behave like an intelligent professional operating layer built into Hamrahe.

---

# 3. Core Product Philosophy

Hamrahe is a professional growth platform.

Every meaningful user or organization activity must generate a structured event.

Use this conceptual flow:

User or organization activity
→ Event collection
→ Permission and context validation
→ Identity and evidence validation
→ Relevant professional engine
→ Explainable analysis
→ Recommendation
→ Preview
→ Human approval
→ Action in the relevant Hamrahe section
→ Result collection
→ Case timeline update
→ Future recommendation improvement

Do not calculate important scores independently inside visual components.

Pages display results produced from structured events, evidence, rules, and authorized data sources.

No major Hamrahe service should operate as an isolated product island.

---

# 4. Non-Duplication and Active Context

Do not create:

- A second personal profile
- A second company profile
- A separate AI-specific identity
- A second professional score system
- A parallel job application system
- A parallel messaging system
- A parallel organization management system
- A duplicate Analytics product
- A duplicate Verification product

AI Engine must work on the existing personal profile or organization profile.

The active context comes from the user’s primary Hamrahe account.

Supported contexts include:

- Personal context
- Organization context for organizations the user is authorized to represent
- Startup context as an organization subtype when supported by the existing project

The context switcher must:

- Display the current personal or organization identity
- Display the user’s role in the selected organization
- Show whether the user is authorized to use organization data
- Prevent accidental cross-organization data access
- Warn before switching context when unsaved work exists
- Preserve separate cases, memories, permissions, outputs, and quotas for each context
- Never silently merge personal and organization information

Do not create a new profile during context switching.

---

# 5. Navigation and Routing

Add AI Engine as an independent item in the existing primary Hamrahe navigation.

Preserve all existing navigation items.

The label must be:

AI Engine

Use a restrained, recognizable AI-related icon that is visually consistent with the existing Hamrahe icon system.

Recommended route structure:

- /ai-engine
- /ai-engine/for-me
- /ai-engine/assistant
- /ai-engine/tools
- /ai-engine/goals
- /ai-engine/analytics
- /ai-engine/verification
- /ai-engine/cases
- /ai-engine/outputs
- /ai-engine/memory
- /ai-engine/usage

Use the project’s existing routing conventions if they differ.

Internal AI Engine navigation should include:

- For Me
- Assistant
- Tools
- Goals
- Analytics
- Verification
- Cases
- Outputs
- Memory & Permissions
- Usage

Do not label the default page “Dashboard.”

The default page must be named:

For Me

---

# 6. Shared AI Engine Shell

Create a shared AI Engine shell containing:

- Existing global Hamrahe header
- Existing logo and global search
- Existing primary navigation
- Active context switcher
- AI Engine internal navigation
- Current goal indicator
- AI usage indicator
- Privacy and data-source shortcut
- Notification or pending-approval indicator
- Contextual help
- Responsive content container

The shell must feel like a native continuation of Hamrahe.

The user must always understand:

- Which identity or organization is active
- Which goal is active
- Which data sources are currently authorized
- Which case is being worked on
- Whether an action is only a draft or ready to execute
- Whether human approval is required
- How much AI quota may be consumed

---

# 7. “For Me” Experience

The “For Me” page is the action-oriented starting point of AI Engine.

It must not look like an admin dashboard or a wall of statistics.

Create a prioritized experience containing:

## Primary next action

Show one clearly prioritized next action based on:

- Active goal
- Open cases
- Deadlines
- Missing evidence
- Relevant opportunities
- Pending approvals
- Professional growth priorities

Include:

- Why this action is recommended
- Which data sources were used
- Estimated effort
- Expected outcome
- Related case
- Primary action
- Dismiss or postpone option

## Recommended actions

Display a small set of prioritized recommendations such as:

- Improve a specific profile section
- Verify a professional claim
- Apply for a relevant position
- Continue interview preparation
- Follow up with a professional contact
- Complete a learning unit
- Add project evidence
- Continue a proposal
- Respond to an organization lead

Do not show meaningless generic recommendations.

## Active goals

Show:

- Goal title
- Target role or outcome
- Deadline
- Current stage
- Evidence coverage
- Next milestone
- Related missions
- Open case

## Open cases

Show the most important active cases with:

- Status
- Last activity
- Next action
- Due date
- Required approval
- Related output

## Recent outputs

Show recent structured outputs created by AI Engine, not only chat messages.

## Growth missions

Show relevant missions connected to real goals, skills, verification, badges, learning, jobs, or networking.

## Signals requiring attention

Examples:

- Expiring consent
- Contradictory profile information
- Unverified experience
- Missing organization permission
- Stalled job application
- Unanswered lead
- Incomplete badge evidence
- Failed external action
- Quota warning

## Continue working

Allow the user to resume the last case, output, draft, or conversation without losing state.

---

# 8. Full Assistant

Create a complete Assistant page, not a single empty conversation window.

The desktop layout should support:

- Conversation navigation
- Main conversation area
- Structured output panel
- Source and evidence panel
- Case information
- Tool-run information
- Approval status

The assistant must support:

- Asking questions
- Structured analysis
- Planning
- Draft creation
- Editing
- Comparison
- Summarization
- Opportunity analysis
- Profile improvement
- Resume generation
- Job application preparation
- Interview preparation
- Networking
- Content creation
- Learning guidance
- Verification preparation
- Badge evidence preparation
- Organization hiring
- B2B development
- Market research
- Follow-up planning

Each assistant response may contain structured blocks such as:

- Explanation
- Recommendation
- Evidence
- Missing information
- Risks
- Proposed action
- Editable draft
- Preview
- Approval request
- Saved output
- Case update
- Follow-up question

The assistant must clearly distinguish:

- AI-generated content
- User-provided information
- Hamrahe platform data
- Organization data
- External data
- Verified evidence
- Unverified claims
- Inference
- Human decisions

Important outputs must be saved outside the conversation.

The user must be able to:

- Save an answer as an output
- Attach it to a case
- Create a new version
- Compare versions
- Continue editing
- Export it
- Share it selectively
- Send it to the relevant Hamrahe section

---

# 9. Contextual Assistant Across Hamrahe

Add a contextual assistant launcher to all relevant Hamrahe pages.

On desktop, it may open as a side panel.

On mobile, it must open as a bottom sheet or full-screen experience.

The assistant must receive explicit page context such as:

- Current profile
- Current organization
- Current post
- Current conversation
- Current job
- Current project
- Current course
- Current assessment
- Current event
- Current group
- Current search result
- Current alert

Example actions:

## Personal profile

- Improve headline
- Rewrite About section
- Detect unsupported claims
- Suggest missing evidence
- Build resume
- Analyze profile completeness
- Prepare verification evidence

## Organization profile

- Improve company description
- Analyze profile quality
- Draft product or service content
- Create a hiring plan
- Review organization evidence
- Prepare B2B messaging

## Feed and posts

- Draft a post
- Rewrite content
- Suggest relevant audience
- Analyze performance
- Create follow-up content
- Save the post as an output

## Network

- Explain why a connection is relevant
- Prepare a connection message
- Identify warm introductions
- Create a follow-up plan
- Track the networking result

## Jobs

- Analyze fit
- Explain the fit score
- Identify evidence gaps
- Create a tailored resume
- Create a cover note
- Prepare interview questions
- Start an application case

## Projects

- Analyze project fit
- Prepare a proposal
- Define scope
- Estimate required effort
- Save proposal as an output
- Create a project application case

## Messages

- Analyze a selected conversation
- Draft a reply
- Suggest follow-up
- Extract decisions
- Save an outcome
- Create a case

The assistant must never silently send, publish, apply, message, approve, reject, hire, or modify external data.

Every external action requires:

- Preview
- Data disclosure
- Destination
- Expected quota consumption
- User confirmation
- Recorded result

Closing the assistant must not delete drafts.

---

# 10. Tool Registry

Create a complete registry containing at least 180 genuinely distinct AI capabilities.

Do not reach the required number by duplicating the same tool with slightly different names.

Organize tools into categories such as:

- Profile and resume
- Jobs and career
- Professional growth
- Skills and evidence
- Verification
- Trust
- Badges and credentials
- Networking
- Messaging
- Content and communication
- Projects and proposals
- Learning and assessments
- Interviews
- Meetings and collaboration
- Organization profile
- Hiring and recruiting
- Talent management
- B2B development
- Sales and lead management
- Market and company research
- Events and groups
- Analytics
- Search and discovery
- Productivity and planning
- Privacy and data control

Every tool must include:

- Unique ID
- Name
- Clear description
- Category
- Supported context
- Required inputs
- Optional inputs
- Authorized data sources
- Expected output type
- Estimated quota use
- Sensitivity level
- Whether approval is required
- Whether external action is possible
- Whether verification or organization authority is required
- Example use
- Related pages
- Save or favorite state
- Recent-use state
- Availability based on plan or entitlement

Tool Registry interactions must work:

- Search
- Category filters
- Personal or organization context filter
- Input-type filter
- Output-type filter
- Sensitivity filter
- Plan filter
- Save tool
- Unsave tool
- Start tool
- View details
- View required data
- View quota estimate
- View recent tools

Do not leave tool cards as decorative elements.

---

# 11. Goals, Growth and Professional Missions

Create a complete Goals area.

A goal must include:

- Title
- Goal type
- Active context
- Target role or outcome
- Current state
- Target state
- Time frame
- Priority
- Evidence requirements
- Skill requirements
- Milestones
- Missions
- Related cases
- Related outputs
- Relevant opportunities
- Progress history
- Risks
- Next action
- Version history

Supported examples:

- Become a Product Lead
- Find a Senior Product Designer position
- Build verified professional credibility
- Improve professional network quality
- Obtain a Network badge
- Complete a learning path
- Win a design project
- Hire a Senior Product Designer
- Build a B2B opportunity pipeline

Missions must be connected to actual product actions and evidence.

Do not use arbitrary gamification.

A mission may lead to:

- Profile improvement
- Evidence collection
- Learning activity
- Assessment
- Networking action
- Job application
- Project proposal
- Content publication
- Verification step
- Badge requirement
- Organization action

AI may recommend missions, but it cannot directly change professional scores, verification status, trust, badges, or credentials.

---

# 12. Analytics, Verification, Trust, Badges and Credentials

Create a complete Analytics area inside AI Engine while reusing the existing Hamrahe analytics domain and data sources.

Do not create a conflicting second analytics system.

## Analytics

Support:

- Professional power analysis
- Score dimensions
- Historical trends
- Evidence coverage
- Profile strength
- Activity quality
- Trust signals
- Skill strength
- Experience quality
- Responsiveness
- Network quality
- Content performance
- Opportunity performance
- Goal progress
- Mission progress
- Comparison over time
- Explanation of changes
- Missing data
- Data sources
- Confidence or coverage where genuinely measurable
- Recommended next actions

Do not display invented percentages.

If a result does not have a real measurable percentage, use a qualitative state instead.

AI can:

- Explain a score
- Analyze its contributing events
- Identify missing evidence
- Recommend actions
- Simulate possible scenarios without changing the official score

AI cannot:

- Directly change Professional Power
- Directly change Pro Score
- Manipulate Match Score
- Increase Trust
- Issue Verification
- Issue a Badge
- Issue a Credential

## Identity, Ownership and Representation

Create an independent identity and authority subsystem before Trust and Badges.

It must support:

- Individual identity verification
- Organization verification
- Organization ownership verification
- Organization representative verification
- Organization membership verification
- Sensitive-role verification
- Evidence status
- Expiration
- Renewal
- Rejection
- Appeal
- Review history

Verification is a status and evidence source.

Verification must not be displayed as a badge.

## Trust

Trust must be calculated from authorized signals and verified evidence.

Show:

- Trust signals
- Evidence sources
- Missing signals
- Contradictions
- Expired evidence
- Review history
- Appeal status
- Impact explanation

## Badges

Keep personal and organization badge systems separate.

Personal examples:

- Network
- Top Voice
- Specialized Top Voice categories

Organization examples:

- Leading Company in an Industry
- Responsible Hiring
- Data Transparency
- Social Impact

Verification may be a prerequisite, but it is not itself a badge.

Each badge journey must show:

- Eligibility
- Prerequisites
- Required evidence
- Completed requirements
- Missing requirements
- Submission
- Review
- Issuance or rejection
- Visibility controls
- Expiration or renewal
- Appeal
- Premium reward where applicable

A badge may reward one month of Premium, but Premium must not make the badge easier to obtain.

## Credentials

Credentials must remain separate from badges and verification.

Credentials may come from:

- Learning completion
- Assessments
- Verified projects
- Authorized partners
- Professional institutions

Show issuer, evidence, date, expiration, verification method, status, and visibility.

---

# 13. Cases

Build a complete Case system.

A case is a persistent, structured workspace for achieving a specific outcome.

Example personal cases:

- Application for Senior Product Designer at Snapp
- Growth plan for Product Lead
- Sara Ahmadi profile improvement
- Network badge journey
- Interview preparation
- Design project proposal

Example organization cases:

- Hiring a Senior Product Designer
- Recruitment funnel analysis
- Target account development
- Partnership proposal
- Lead requiring follow-up

Each case must include:

- Objective
- Active context
- Inputs
- Data used
- Evidence
- Outputs
- Versions
- Related conversations
- Tools executed
- Approvals
- Actions performed
- Result
- Next action
- Permissions
- History
- Audit log
- Appeal or review

Supported statuses:

- Not started
- Information required
- Processing
- Draft ready
- Approval required
- Ready to execute
- Executed
- Following up
- Completed
- Paused
- Failed
- Review required
- Disputed

Use a versioned timeline for the case detail page.

Every timeline event must show:

- Event type
- Actor
- Date and time
- Data source
- Previous state
- New state
- Related output
- Related action
- Approval
- Audit information

---

# 14. Outputs

Important outputs must not remain only inside conversations.

The Outputs page must include:

- Search
- Type filter
- Case filter
- Date filter
- Status filter
- Sorting
- Recent outputs
- Shared outputs
- Drafts
- Previous versions

Each output must include:

- Title
- Type
- Related case
- Version
- Creator
- Date
- Data sources
- Status
- Sharing permissions
- Change history
- Edit option
- Version comparison
- Version restoration
- Export option
- Selective sharing
- Send to the relevant Hamrahe section

Output examples:

- Resume
- Cover note
- Job-fit analysis
- Interview plan
- Profile rewrite
- Professional growth plan
- Project proposal
- Networking message
- Follow-up message
- Content draft
- Hiring criteria
- Job description
- Candidate analysis
- Target account brief
- Partnership proposal
- Meeting brief
- Learning plan
- Evidence package

---

# 15. Bidirectional Integration with the Entire Platform

Every integration must be real and visible.

| Hamrahe section | Input to AI Engine | Output returned |
|---|---|---|
| Home | Activity, priorities, open cases and alerts | Missions, next actions and case continuation |
| Personal Profile | Experience, skills, projects and evidence | Profile improvements, resume and analysis |
| Organization Profile | Company data, services, members and opportunities | Profile improvements, content, hiring and sales |
| Feed | Posts, interactions and audience | Drafts, rewrites and performance analysis |
| Network | Connections, mutual connections and groups | Warm introductions, messages and follow-ups |
| Jobs | Job descriptions, criteria and application state | Fit analysis, resume and interview preparation |
| Projects | Project description, budget, time and skills | Proposal, scope and follow-up |
| Learning | Courses, exercises, projects and progress | Adaptive learning path and skill evidence |
| Assessment | Assessment, result and validity | Gap analysis and credentials |
| Messages | Selected conversation | Reply, follow-up and result recording |
| Events and Groups | Topic, people and attendance | Networking plan and follow-up |
| Search | Query, filters and results | Semantic search and alerts |
| Alerts | Events and deadlines | Prioritization and direct action |
| Calendar | Availability and meetings | Time suggestions, agenda and follow-up |
| Premium | Plan and quota | Usage estimate and upgrade |
| Settings | Consent, memory and sharing | Analysis limitations and permissions |
| Verification | Status, evidence and appeal | Journey, missing items and evidence package |
| Admin | Rules, errors, risk and capacity | Control, audit and suspension |

Data cycle:

User activity
→ Event recording
→ Authorized data entry
→ Relevant engine analysis
→ Recommendation
→ Preview
→ User approval
→ Action in the primary Hamrahe section
→ Result collection
→ Case update
→ Future recommendation refinement

No Hamrahe section should remain isolated.

---

# 16. Memory, Data and Permissions

Build a complete Memory & Permissions page.

Supported memory items:

- Professional goal
- Target role
- Preferred tone
- Area of expertise
- Geographic scope
- Collaboration type
- Private compensation floor
- Schedule
- Important contacts
- Target companies
- Learning preferences
- Content preferences

Users must be able to:

- View memory
- Edit each memory item
- Delete each memory item
- Clear all memory
- Temporarily disable memory
- Create a temporary conversation
- Control each data source
- Control output sharing
- Set consent expiration
- Revoke consent
- View the impact of revocation

Every consent record must show:

- What data is used
- Purpose
- Tool using the data
- Related case
- Person or organization receiving the data
- Expiration
- Whether it can be revoked
- Effect of revocation

Personal and organization consent must remain separated.

Never allow one organization to access another organization’s data.

---

# 17. Usage, Plans and Payments

AI Engine usage credit is not a financial wallet.

It cannot be withdrawn or transferred as money.

The Usage page must include:

- Remaining quota
- Consumed quota
- Personal usage
- Organization usage
- Estimated consumption before execution
- Consumption confirmation
- Usage history
- Active plan
- Restricted capabilities
- Upgrade option
- Premium rewards received from badges

Payments or Premium must never:

- Change Professional Power
- Increase Trust
- Make Verification easier
- Generate a Badge
- Manipulate Match Score
- Make a weaker user appear to be a better candidate
- Override evidence requirements
- Override organization permissions

Use the project’s existing Product Catalog and Entitlement logic where available.

---

# 18. Required Clickable Flows

Implement at least the following complete clickable flows.

## First entry

Enter AI Engine
→ Explain value and data control
→ Detect active context
→ Select goal
→ Select data sources
→ Upload resume if required
→ Confirm extracted information
→ Perform first analysis
→ Present three actions
→ Configure memory and notifications
→ Enter “For Me”

## Goal to outcome

Define goal
→ Select target role
→ Review evidence
→ Identify gaps
→ Build growth plan
→ Find opportunity
→ Analyze fit
→ Build application package
→ Preview
→ Confirm and simulate submission
→ Prepare for interview
→ Record result
→ Refine the path

## Job application

Open job
→ Open contextual assistant
→ Analyze fit
→ View explanation
→ View gaps
→ Build tailored resume
→ Build cover note
→ Edit
→ Preview shared data
→ Confirm
→ Record application
→ Create case
→ Follow up on result

## Badge journey

Select badge
→ Review Verification status
→ View requirements
→ View evidence
→ Complete action
→ Build evidence package
→ Submit for review
→ Issue badge or report missing requirements
→ Control profile visibility
→ Apply reward
→ Renew or appeal

## Organization hiring

Define hiring need
→ Build criteria
→ Create opportunity description
→ Source candidates
→ Apply hard requirements
→ Show explainable matching
→ Evaluate
→ Interview
→ Human decision
→ Notify
→ Record result
→ Refine criteria

## Business development

Select market
→ Create target account
→ Analyze company
→ Identify decision-maker
→ Build stakeholder map
→ Create value proposition
→ Draft message
→ Preview
→ Confirm
→ Record outreach
→ Follow up
→ Record result
→ Analyze pipeline

---

# 19. Required Interface States

Design these states for important components and flows:

- New user
- Empty state
- Insufficient data
- Contradictory data
- Unsupported claim
- Processing
- Result ready
- Approval required
- Permission unavailable
- Insufficient quota
- AI service unavailable
- Sensitive action
- Failed action
- Expired result
- Review required
- Suspension
- Appeal
- Cross-section integration error
- No search results
- Offline
- Invalid file upload
- Unauthorized organization data
- Context switch with unsaved work

Use:

- Skeletons
- Limited spinners
- Clear status messages
- Retry actions
- Recovery paths

Do not display invented processing percentages when real progress data does not exist.

---

# 20. Visual Language and 2026 Design Quality

The design must satisfy both conditions:

1. It must clearly continue the current Hamrahe visual identity
2. It must elevate Hamrahe to the quality of world-class professional, intelligent, and work products in 2026

Modern design does not mean adding unnecessary visual effects.

Use:

- Calm, professional and trustworthy interfaces
- Action-oriented structures
- Progressive disclosure
- Strong information hierarchy
- Chat beside structured outputs
- Contextual panels
- Natural-language command input
- Adaptive cards
- Limited and purposeful Bento structures
- Sufficient white space
- Controlled information density
- Short micro-interactions
- Smooth functional motion
- Immediate action feedback
- Explainable charts
- Clear data-source visibility
- Preview before execution
- Visible history and versioning

Avoid:

- Direct LinkedIn imitation
- Excessive glassmorphism
- Gradients on every card
- Heavy shadows
- Excessively rounded cards
- Too many pills
- Decorative icons without meaning
- Show
```


You’re right. The previous prompt should have been entirely in English. Here is the full English version to paste into Figma Make:

```text
MASTER IMPLEMENTATION PROMPT
HAMRAHE AI ENGINE

Work directly inside the current Hamrahe project.

Do not create a separate concept, disconnected prototype, second product, or standalone AI website. Inspect the existing project structure, routes, components, design tokens, data models, interactions, and attached reference screens before changing anything.

Design and implement a complete, production-grade, clickable AI Engine inside the existing Hamrahe product.

The final result must be a coherent continuation of Hamrahe, not a generic AI interface.

────────────────────────────────────────
1. PRIMARY OBJECTIVE
────────────────────────────────────────

Create a new main product area named exactly:

AI Engine

AI Engine is a dedicated page and product environment inside Hamrahe.

It is not:

- A dashboard
- An AI Center
- A standalone chatbot
- A second personal profile
- A second organization profile
- An isolated analytics page
- A collection of decorative AI cards
- A separate website
- A replacement for existing Hamrahe pages

AI Engine must operate across the user’s existing personal profile, organization profiles, activities, relationships, jobs, projects, learning, assessments, messages, content, events, groups, verification, analytics, and other Hamrahe services.

Its purpose is to transform professional data, evidence, activities, goals, and opportunities into explainable recommendations, structured outputs, controlled actions, and measurable professional outcomes.

Implement the feature directly. Do not only describe it or provide an implementation plan.

────────────────────────────────────────
2. INSPECT THE CURRENT PROJECT FIRST
────────────────────────────────────────

Before implementing anything:

1. Inspect the existing project structure.
2. Identify the framework, routing system, components, tokens, typography, icons, states, mock data, and interaction patterns.
3. Identify all existing Hamrahe pages and features.
4. Identify the current personal and organization profile architecture.
5. Identify existing Analytics, Learning, Assessment, Jobs, Projects, Network, Messages, Alerts, Premium, Settings, Verification, and Admin structures.
6. Identify reusable components before creating new ones.
7. Preserve all existing functionality.
8. Do not duplicate existing pages, components, data models, or flows.
9. Do not remove or arbitrarily redesign any current Hamrahe screen.
10. Extend the current system through shared infrastructure and a single source of truth.

Use the attached Hamrahe screenshots as the primary visual continuity reference.

If the project already contains production-ready components, reuse and improve them instead of recreating them.

────────────────────────────────────────
3. PRODUCT PRINCIPLES
────────────────────────────────────────

Hamrahe is a professional growth platform, not only a social network or job board.

Every meaningful user action must be recorded as an event.

The architecture should follow this logic:

User Activity
→ Event Collection
→ Authorized Data Access
→ Professional Data Engine
→ Specialized Analysis
→ Explainable Recommendation
→ Preview
→ User Approval
→ Execution in the relevant Hamrahe section
→ Outcome Collection
→ Case Update
→ Future Recommendation Improvement

Do not calculate important metrics independently inside individual UI components.

All important metrics, states, recommendations, trust signals, missions, and outcomes must come from structured central data or service layers.

Core principles:

- Evidence before claims
- Identity before trust
- Human approval before external action
- Explainability before automation
- One profile per real entity
- One shared source of truth
- Explicit permissions
- Versioned decisions
- Auditable actions
- Structured outputs outside chat
- Personal and organization data isolation
- Human authority over hiring and sensitive decisions
- No Premium influence on trust, verification, professional power, or matching quality

────────────────────────────────────────
4. ACTIVE CONTEXT
────────────────────────────────────────

AI Engine must use the active account context from the main Hamrahe account.

Supported contexts:

- Personal
- Organization
- Startup, when it exists as an organization subtype

Do not create a new profile or duplicate organization environment inside AI Engine.

Add an always-visible context switcher showing:

- Active profile
- Profile type
- Role or permission level
- Data scope
- Current goal
- Connected organization, if applicable

When switching context:

- Personal data and organization data must remain isolated.
- Unsaved work must trigger a warning.
- Organization access must respect the user’s membership and representative permissions.
- The interface, available tools, outputs, cases, quota, and recommendations must adapt to the active context.
- A user must never silently access organization data without authorization.

────────────────────────────────────────
5. MAIN NAVIGATION AND ROUTES
────────────────────────────────────────

Add AI Engine as an independent option in the existing main Hamrahe navigation.

Preserve all existing navigation items.

Use a compact, recognizable AI-related icon consistent with the current icon system.

Recommended main route:

/ai-engine

Recommended internal routes:

/ai-engine/for-me
/ai-engine/assistant
/ai-engine/tools
/ai-engine/goals
/ai-engine/analytics
/ai-engine/verification
/ai-engine/cases
/ai-engine/outputs
/ai-engine/memory
/ai-engine/quota

Do not name any page “Dashboard.”

Desktop internal navigation may use a left rail, compact tabs, or a hybrid structure consistent with Hamrahe.

Mobile internal navigation should become:

- A horizontally scrollable tab bar
- Or an accessible navigation sheet

The active context switcher must remain accessible on every AI Engine screen.

────────────────────────────────────────
6. SHARED AI ENGINE SHELL
────────────────────────────────────────

Create a shared shell containing:

- AI Engine page identity
- Active context switcher
- Current goal
- Search or command input
- Internal navigation
- Contextual notifications
- Quota indicator
- Memory status
- Permission status
- Open cases indicator
- Recent output access
- Contextual assistant launcher

The shell must feel calm and professional.

Do not make it look like:

- A technical admin panel
- A cryptocurrency dashboard
- A generic chatbot
- A futuristic neon interface
- A collection of unrelated statistic cards

────────────────────────────────────────
7. “FOR ME” VIEW
────────────────────────────────────────

Create the default AI Engine view named:

For Me

This view must be action-oriented, not statistics-oriented.

Include:

- Current professional goal
- Next best action
- Three prioritized recommended actions
- Active missions
- Open cases
- Tasks awaiting approval
- Recently generated outputs
- Relevant opportunities
- Evidence gaps
- Verification or credential requirements
- Upcoming deadlines
- Recent outcomes
- Memory and permission notices
- AI quota status
- Continue previous work
- Dismissed or deferred recommendations
- Explanation of why each recommendation appears

Each recommendation must show:

- What is recommended
- Why it matters
- Which goal it supports
- Data sources used
- Evidence coverage
- Expected outcome
- Required permission
- Estimated quota usage
- Whether user confirmation is required
- Available actions
- Option to dismiss
- Option to postpone
- Option to provide feedback

Avoid overwhelming the user.

Use progressive disclosure and clear content hierarchy.

────────────────────────────────────────
8. FULL AI ASSISTANT
────────────────────────────────────────

Build a complete AI assistant inside AI Engine.

The assistant must contain:

- Conversation history
- New conversation
- Temporary conversation mode
- Search conversations
- Rename conversation
- Archive conversation
- Delete conversation
- Pin conversation
- Attach files
- Select Hamrahe data sources
- Select active case
- Select goal
- Select output type
- Select tools
- View sources
- View permissions
- View quota estimate
- Preview action
- Confirm action
- Cancel action
- Save output
- Create a case
- Add result to an existing case
- Send result to the relevant Hamrahe section
- View tool execution history
- View structured results beside the conversation

Recommended desktop structure:

- Conversation list
- Main conversation area
- Structured output or context panel

The output panel may contain:

- Generated resume
- Cover letter
- Job-fit analysis
- Growth plan
- Content draft
- Network map
- Candidate comparison
- Business proposal
- Meeting brief
- Evidence package
- Timeline
- Sources
- Versions
- Approval state

Important outputs must not remain only inside chat.

Every significant result must be savable as a structured Output Artifact.

The assistant must never:

- Send a message automatically
- Submit a job application automatically
- Publish a post automatically
- Contact a lead automatically
- Change profile information automatically
- Reject or hire a candidate automatically
- Issue verification automatically
- Issue a badge automatically
- Change Professional Power directly

All external or sensitive actions require preview and explicit user approval.

────────────────────────────────────────
9. CONTEXTUAL ASSISTANT ACROSS HAMRAHE
────────────────────────────────────────

Add a contextual AI assistant launcher across all relevant Hamrahe pages.

Desktop behavior:

- Open as a right-side panel
- Preserve the current page
- Show the active entity and current page context
- Allow controlled transfer of selected data

Mobile behavior:

- Open as a bottom sheet
- Or a full-screen assistant for complex tasks

The contextual assistant must understand the selected context, such as:

- Current profile
- Current organization
- Current job
- Current project
- Current post
- Current conversation
- Current candidate
- Current course
- Current event
- Current search result

It must not silently ingest everything.

Show:

- What data is being used
- Why it is being used
- Which tool is using it
- Whether it will be saved
- Whether it will be shared
- Required permission
- Option to remove a data source

Examples:

On a job page:
- Analyze fit
- Explain score
- Identify gaps
- Tailor resume
- Create cover note
- Prepare interview
- Find a referral

On a profile:
- Improve headline
- Improve About section
- Analyze evidence
- Identify missing information
- Build resume
- Suggest portfolio evidence

On Messages:
- Draft reply
- Summarize selected conversation
- Identify commitments
- Create follow-up
- Save outcome to a case

On an organization profile:
- Analyze the company
- Identify stakeholders
- Create value proposition
- Draft outreach
- Build target-account brief

Closing the panel must not delete unsaved work.

────────────────────────────────────────
10. TOOL REGISTRY
────────────────────────────────────────

Build a searchable and filterable Tool Registry with at least 180 genuinely distinct capabilities.

Do not inflate the count through duplicate labels or superficial variations.

Tool categories should include:

- Profile and resume
- Professional identity
- Goals and career growth
- Jobs and applications
- Interview preparation
- Networking
- Messaging and follow-up
- Content creation
- Content analysis
- Personal branding
- Skills and evidence
- Learning
- Assessments
- Projects and proposals
- Meetings and collaboration
- Research
- Market analysis
- Organization intelligence
- Business development
- Sales
- Hiring
- Candidate analysis
- Workforce development
- Events and groups
- Trust and verification preparation
- Analytics and reporting
- Documentation
- Data organization
- Accessibility and localization

Tool Registry capabilities:

- Search
- Category filter
- Context filter
- Goal filter
- Data-source filter
- Permission filter
- Free or Premium filter
- Saved tools
- Recently used
- Recommended tools
- Tool detail
- Start tool
- Add to case
- Share tool link
- View usage history

Each tool must have:

- Unique ID
- Name
- Short description
- Detailed description
- Category
- Supported contexts
- Required inputs
- Optional inputs
- Data sources
- Required permissions
- Expected output
- Estimated quota usage
- Risk level
- Approval requirement
- Destination inside Hamrahe
- Error states
- Empty states
- Example result
- Availability by plan

Tools must use a centralized structured registry.

Do not hardcode tool information separately inside individual components.

────────────────────────────────────────
11. GOALS, GROWTH, AND MISSIONS
────────────────────────────────────────

Build a complete Goals and Growth environment.

A goal may contain:

- Title
- Goal type
- Active context
- Target role
- Target industry
- Target organization
- Target market
- Location
- Collaboration type
- Private compensation threshold
- Target date
- Priority
- Required evidence
- Current gaps
- Milestones
- Missions
- Related cases
- Related outputs
- Progress history
- Status
- Version
- Owner
- Permissions

Goal states:

- Draft
- Active
- Paused
- At risk
- Completed
- Cancelled
- Needs review

Missions must be specific, actionable, and connected to professional outcomes.

Each mission must show:

- Goal relationship
- Reason
- Evidence required
- Due date
- Difficulty
- Expected effect
- Completion requirements
- Status
- Result
- Follow-up action

AI may recommend missions but must not fabricate completion or evidence.

────────────────────────────────────────
12. ANALYTICS, PROFESSIONAL POWER, VERIFICATION, TRUST, BADGES, AND CREDENTIALS
────────────────────────────────────────

These concepts must remain separate.

A. Identity, Ownership, and Representation Verification

This subsystem must come before Trust and Badges.

It includes:

- Individual identity verification
- Organization verification
- Organization ownership verification
- Authorized representative verification
- Organization membership verification
- Sensitive-role verification

Verification is a status and evidence source.

Verification is not a badge.

Do not display “Verify” as a badge.

AI may:

- Explain requirements
- Identify missing evidence
- Prepare an evidence package
- Guide the user through the process
- Explain rejection or suspension
- Help draft an appeal

AI must not approve verification.

B. Trust

Trust must be derived from authorized signals, evidence, behavior, history, and verified relationships.

Show:

- Trust dimensions
- Data sources
- Evidence coverage
- Confidence
- Contradictory data
- Expired evidence
- Suspended signals
- Explanation
- Appeal or review options

C. Professional Power Analytics

Create a full Analytics section inside AI Engine, connected to the existing Hamrahe Analytics domain and using the same source of truth.

Include:

- Professional Power overview
- Trends over time
- Dimension analysis
- Evidence coverage
- Profile strength
- Activity quality
- Skill evidence
- Experience evidence
- Responsiveness
- Network quality
- Opportunity readiness
- Goal progress
- Benchmark ranges
- Improvement opportunities
- Data-source explanation
- Version history

Do not show fabricated percentages.

When there is insufficient data, show that data is insufficient.

AI can explain Professional Power and recommend actions, but it must never directly change the score.

D. Badges

Maintain separate badge systems for:

- Personal profiles
- Organization profiles

Badge examples may include:

Personal:
- Network
- Top Voice
- Domain-specific Top Voice
- Evidence-based professional badges

Organization:
- Industry Leader
- Responsible Employer
- Data Transparency
- Social Impact
- Verified Service Quality

Verification may be a prerequisite, but verification itself is not a badge.

```


You’re right. Here is the complete English version. Copy the entire prompt below into Figma Make.

```text
MASTER IMPLEMENTATION PROMPT — HAMRAHE AI ENGINE

Build and implement a complete, production-grade AI Engine inside the existing Hamrahe project.

Do not create a separate concept, standalone application, isolated dashboard, or disconnected chatbot. Work directly inside the current Hamrahe project and extend its existing product architecture, navigation, components, design system, data patterns, and interaction language.

The attached screenshots are visual references for the current Hamrahe interface.

The result must be a real, responsive, clickable, connected product experience—not merely a visual concept, wireframe, static mockup, or implementation plan.

────────────────────────────────────────
1. FIRST INSPECT THE EXISTING PROJECT
────────────────────────────────────────

Before creating or changing anything:

- Inspect the complete current project structure
- Identify all existing pages and routes
- Identify the current navigation
- Identify existing components
- Identify design tokens
- Identify typography, colors, spacing, radius, borders, shadows, buttons, forms, cards, modals, drawers, tables, tabs, charts, alerts, toasts, and status patterns
- Identify existing data models and mock data
- Identify the current personal profile
- Identify the current company profile
- Identify Home, Feed, Network, Jobs, Projects, Learning, Assessment, Messages, Events, Groups, Search, Alerts, Premium, Settings, Verification, Analytics, and Admin
- Identify existing responsive behavior
- Identify current language and theme handling
- Identify reusable components before creating new ones

Do not duplicate existing pages, profiles, features, routes, components, or flows.

Do not delete or weaken any existing Hamrahe feature.

Reuse and extend the existing system wherever possible.

If the existing architecture is incomplete, improve it without breaking the current interface or user journeys.

────────────────────────────────────────
2. PRODUCT DEFINITION
────────────────────────────────────────

The exact product name is:

AI Engine

Do not rename it to:

- AI Center
- Intelligence Center
- Smart Center
- AI Dashboard
- Professional Dashboard
- Career Copilot
- Assistant Center
- Command Center

AI Engine is an independent primary page inside Hamrahe.

It must have its own item in the main navigation while remaining fully connected to every other Hamrahe section.

AI Engine is not only a chatbot.

It is the integrated intelligence and execution layer of Hamrahe, combining:

- Conversational assistance
- Context-aware assistance
- Professional analysis
- Goals
- Growth plans
- Missions
- Tool registry
- Cases
- Structured outputs
- Version history
- Evidence
- Verification guidance
- Trust explanations
- Badge pathways
- Credentials
- Memory
- Consent
- Permissions
- Quota management
- Action previews
- Human approval
- Execution tracking
- Result tracking
- Personal intelligence
- Organizational intelligence

AI Engine must help users understand their professional position, make better decisions, create useful outputs, execute approved actions, and track results.

────────────────────────────────────────
3. CORE PRODUCT PRINCIPLES
────────────────────────────────────────

Hamrahe is a professional growth platform.

No major service should operate as an isolated feature.

All important activity across Hamrahe must generate structured events.

Use this logic:

User activity
→ Event collection
→ Authorized data ingestion
→ Evidence processing
→ Specialized analysis
→ Recommendation
→ Preview
→ User approval
→ Action in the relevant Hamrahe section
→ Result collection
→ Case update
→ Future recommendation improvement

Do not calculate important trust, matching, verification, badge, credential, or professional-power values directly inside presentation components.

Use structured services and centralized mock data when a real backend is unavailable.

AI Engine may analyze, explain, recommend, draft, organize, and prepare actions.

AI Engine must not:

- Issue identity verification
- Issue organization verification
- Issue badges
- Issue credentials
- Directly change Professional Power or Pro Score
- Directly change Trust Score
- Manipulate Match Score
- Automatically send external messages
- Automatically submit applications
- Automatically publish posts
- Automatically reject candidates
- Automatically hire candidates
- Approve sensitive actions without human confirmation
- Access unauthorized organizational data
- Hide its data sources
- fabricate evidence, experience, qualifications, or achievements

All consequential external actions require a preview and explicit user confirmation.

────────────────────────────────────────
4. ACTIVE CONTEXT
────────────────────────────────────────

AI Engine must use the active context from the user’s main Hamrahe account.

Do not create a second personal profile.

Do not create a second company profile.

Do not create a separate AI identity.

Supported contexts:

- Personal context
- Organization context for organizations the user is authorized to represent
- Startup context when the startup exists as an organization subtype

The context switcher must show:

- Active identity
- Profile or organization name
- User’s current role
- Authorization level
- Data scope
- Available tools
- Relevant quota
- Clear indication when switching context

Context switching must change:

- Available tools
- Goals
- Cases
- Outputs
- Memory
- Permissions
- Quota
- Data sources
- Analytics
- Recommendations
- Action destinations

Personal and organizational data must remain isolated.

Data from one organization must never be exposed to another organization.

If unsaved work exists, show a confirmation before changing context.

────────────────────────────────────────
5. NAVIGATION AND ROUTES
────────────────────────────────────────

Add AI Engine as an independent item in the existing primary navigation.

Preserve all current navigation items.

Suggested main route:

/ai-engine

Create internal routes or route-aware views for:

- /ai-engine/for-me
- /ai-engine/assistant
- /ai-engine/tools
- /ai-engine/goals
- /ai-engine/analytics
- /ai-engine/verification
- /ai-engine/cases
- /ai-engine/outputs
- /ai-engine/memory
- /ai-engine/quota

Use the project’s existing routing system.

The AI Engine shell must include:

- Page title: AI Engine
- Active-context switcher
- Global AI Engine search
- Internal navigation
- Quota indicator
- Memory status
- Permission status
- Notifications
- Contextual help
- Quick-create action

Do not use “Dashboard” as the page title.

Internal navigation can use tabs, a compact side rail, or an adaptive hybrid depending on viewport size, but it must remain consistent with Hamrahe’s current design.

────────────────────────────────────────
6. “FOR ME” VIEW
────────────────────────────────────────

Create a personalized default view named:

For Me

This must be action-oriented—not a collection of decorative statistics.

Include:

- Current active context
- Primary professional goal
- Next best action
- Three prioritized recommended actions
- Open cases
- Cases requiring approval
- Active growth missions
- Recent structured outputs
- Upcoming deadlines
- Important alerts
- Evidence gaps
- Verification requirements
- Badge progress
- Relevant opportunities
- Learning recommendations
- Recent professional changes
- Quota status
- Memory and permission summary

Each recommendation must explain:

- Why it is being shown
- Which data was used
- What evidence supports it
- Expected impact
- Required effort
- Potential risk
- Whether approval is required
- Where the result will be applied

Recommended actions must connect to real flows.

Examples:

- Improve Sara Ahmadi’s current profile
- Continue the Senior Product Designer application at Snapp
- Prepare for an interview
- Request verification of a Digikala experience
- Complete an Interaction Design assessment
- Add a portfolio artifact
- Follow up with a professional contact
- Draft a project proposal
- Review an organizational hiring funnel

Do not show fabricated certainty or artificial percentages.

────────────────────────────────────────
7. FULL ASSISTANT
────────────────────────────────────────

Build a complete conversational assistant inside AI Engine.

The assistant must contain:

- Conversation history
- New conversation
- Search conversations
- Pin conversation
- Rename conversation
- Archive conversation
- Temporary conversation
- Context indicator
- Data-source selector
- Memory indicator
- Tool selector
- File upload
- Structured prompt suggestions
- Message composer
- Draft preservation
- Source citations
- Evidence drawer
- Tool execution history
- Approval state
- Case association
- Structured output panel
- Version history
- Export actions
- “Send to Hamrahe section” actions

The desktop layout should support:

- Conversation navigation
- Main conversation
- Structured output or evidence panel

Do not make it look like an empty ChatGPT clone.

Chat must work beside structured product objects such as:

- Resume
- Cover letter
- Profile revision
- Growth plan
- Opportunity analysis
- Interview plan
- Project proposal
- Content draft
- Stakeholder map
- Candidate evaluation
- Hiring criteria
- Meeting agenda
- Follow-up plan

Important results must be saved outside chat as Output Artifacts.

Closing the assistant must not remove an unfinished draft.

────────────────────────────────────────
8. CONTEXTUAL ASSISTANT ACROSS HAMRAHE
────────────────────────────────────────

Create a contextual AI assistant available across all relevant Hamrahe pages.

It must be accessible through a consistent launcher.

Desktop behavior:

- Contextual side panel
- Does not unnecessarily block the current page
- Can inspect explicitly selected page content
- Can preview changes beside the original content

Mobile behavior:

- Bottom sheet for lightweight actions
- Full-screen view for complex or sensitive actions

The contextual assistant must understand:

- Current route
- Active context
- Selected entity
- Selected job
- Selected project
- Selected post
- Selected conversation
- Selected profile
- Selected organization
- User-authorized data sources

Examples:

On a personal profile:

- Improve headline
- Rewrite About section
- Detect unsupported claims
- Suggest missing evidence
- Build a resume
- Explain Professional Power signals

On a company profile:

- Improve company description
- Create a hiring post
- Analyze incomplete company information
- Prepare a B2B value proposition
- Draft company content
- Analyze organizational trust signals

On Jobs:

- Analyze fit
- Explain matched and missing requirements
- Build a tailored resume
- Draft a cover note
- Prepare for the interview
- Create an application case

On Projects:

- Analyze project fit
- Draft a proposal
- Define scope
- Identify risks
- Build a follow-up plan

On Network:

- Explain connection relevance
- Draft an introduction request
- Prepare a personalized message
- Create a follow-up reminder

On Messages:

- Summarize the selected conversation
- Draft a response
- Extract decisions
- Extract action items
- Register an outcome in a case

On Feed:

- Rewrite a post
- Generate content alternatives
- Analyze audience relevance
- Analyze performance
- Save the result as an output

Every contextual action must show the data being used.

────────────────────────────────────────
9. TOOL REGISTRY
────────────────────────────────────────

Build a searchable Tool Registry with at least 180 genuinely distinct capabilities.

Do not inflate the number by duplicating the same tool under different names.

Tool categories should include:

- Profile and resume
- Career planning
- Jobs and applications
- Interview preparation
- Networking
- Messaging
- Content and communication
- Professional growth
- Skills and evidence
- Learning
- Assessment
- Projects and freelancing
- Company intelligence
- B2B development
- Sales and partnerships
- Hiring
- Candidate evaluation
- Workforce development
- Meetings and collaboration
- Research and strategy
- Analytics
- Trust and verification guidance
- Badges and credentials
- Events and groups
- Personal productivity
- Organizational productivity

Every tool must include:

- Name
- Short description
- Category
- Supported context
- Input requirements
- Data sources
- Output type
- Estimated quota cost
- Permission requirements
- Sensitivity level
- Whether approval is required
- Destination inside Hamrahe
- Save option
- Favorite option
- Recent-use state
- Related tools

Registry features:

- Search
- Category filters
- Context filters
- Output filters
- Data-source filters
- Permission filters
- Free/Premium availability filters
- Saved tools
- Recent tools
- Recommended tools
- Tool details
- Start tool
- Continue related case

Every primary tool action must work in the prototype.

────────────────────────────────────────
10. GOALS, GROWTH, AND MISSIONS
────────────────────────────────────────

Create a complete Goals and Growth section.

A Goal includes:

- Title
- Goal type
- Active context
- Target role or outcome
- Starting state
- Target state
- Timeframe
- Priority
- Required evidence
- Identified gaps
- Milestones
- Missions
- Related opportunities
- Related learning
- Related cases
- Progress logic
- Data sources
- Version history

Goal types may include:

- Career advancement
- Role transition
- Skill development
- Network growth
- Profile improvement
- Job search
- Project acquisition
- Personal brand growth
- Hiring
- Team development
- Business development
- Partnership development
- Organizational growth

Missions must be concrete and executable.

Each mission includes:

- Action
- Reason
- Expected impact
- Required effort
- Deadline
- Evidence requirement
- Related tool
- Related Hamrahe section
- Completion status
- Review state

Do not gamify serious professional outcomes with meaningless points.

────────────────────────────────────────
11. ANALYTICS
────────────────────────────────────────

Create a complete Analytics section inside AI Engine while using the same underlying data and event architecture as Hamrahe’s existing Analytics domain.

Do not create a contradictory second scoring system.

Include:

- Professional Power overview
- Score composition
- Historical trend
- Evidence coverage
- Profile completeness
- Activity quality
- Trust signals
- Skills
- Experience
- Responsiveness
- Network quality
- Opportunity readiness
- Growth progress
- Goal progress
- Mission performance
- Application performance
- Content performance
- Learning progress
- Comparison with the user’s previous state
- Explainable peer benchmarks when legally and statistically valid
- Data-source visibility
- Confidence or coverage indicators
- Missing-data warnings
- Recommended next action

For organizational context include:

- Company profile quality
- Verified identity and representation
- Trust signals
- Hiring funnel
- Candidate pipeline
- Response performance
- Opportunity conversion
- B2B pipeline
- Content performance
- Team development
- Learning progress
- Permission and data coverage

AI Engine may explain the score and recommend actions.

AI Engine must not directly alter:

- Professional Power
- Pro Score
- Trust Score
- Match Score
- Verification state
- Badge eligibility result

Do not use invented percentages.

If real confidence, coverage, or progress cannot be calculated, show a qualitative state instead.

────────────────────────────────────────
12. VERIFICATION, TRUST, BADGES, AND CREDENTIALS
────────────────────────────────────────

These concepts must remain separate.

A. Identity, Ownership, and Representation

This is an independent subsystem that comes before Trust and Badges.

It includes:

- Individual identity verification
- Organization verification
- Organization ownership verification
- Organization representative verification
- Organizational membership verification
- Sensitive-role verification
- Evidence collection
- Review status
- Expiration
- Renewal
- Rejection reason
- Appeal
- Audit history

Verification is a state and source of evidence.

Verification is not a badge.

Do not display “Verify” as a badge.

B. Trust

Trust is derived from authorized evidence and verified events.

Show:

- Trust signals
- Evidence sources
- Missing signals
- Disputed signals
- Expired evidence
- Recommendations for strengthening evidence
- Appeal and review states

C. Badges

Personal and organizational badge systems must remain separate.

Personal badge examples:

- Network
- Top Voice in a defined professional field

Organizational badge examples:

- Industry Leader
- Responsible Hiring
- Data Transparency
- Social Impact

Verification can be a prerequisite for a badge but must not become the badge itself.

Badge details include:

- Eligibility rules
- Verification prerequisites
- Required evidence
- Completed requirements
- Missing requirements
- Review status
- Issue date
- Expiration date
- Renewal
- Display controls
- Appeal
- Premium reward when applicable

AI may guide the user and prepare an evidence package.

AI must not issue a badge.

D. Credentials

Credentials come from valid learning, assessment, institutions, employers, or approved evidence sources.

Show credentials separately from badges and verification.

────────────────────────────────────────
13. CASES
────────────────────────────────────────

A Case is the persistent operational record for a meaningful goal, task, or outcome.

Each case includes:

- Objective
- Active context
- Inputs
- Data used
- Evidence
- Outputs
- Versions
- Related conversations
- Executed tools
- Approvals
- Completed actions
- Result
- Next action
- Permissions
- History
- Audit trail
- Appeal or review

Case states:

- Not started
- Information required
- Processing
- Draft ready
- Approval required
- Ready to execute
- Executed
- Following up
- Completed
- Paused
- Failed
- Review required
- Disputed

Use a versioned timeline on the Case Details page.

The timeline must show:

- State changes
- User actions
- AI actions
- Tool runs
- Permission changes
- Approvals
- Output versions
- External actions
- Results
- Appeals
- Review decisions

────────────────────────────────────────
14. OUTPUTS
────────────────────────────────────────

Important outputs must not remain only inside chat.

Create an Outputs page with:

- Search
- Type filter
- Case filter
- Date filter
- Status filter
- Sorting
- Recent outputs
- Shared outputs
- Drafts
- Previous versions

Every output includes:

- Title
- Type
- Related case
- Version
- Creator
- Date
- Data sources
- Status
- Sharing permission
- Change history
- Edit action
- Version comparison
- Version restoration
- Export
- Selective sharing
- Send to the relevant Hamrahe section

Example output types:

- Resume
- Cover letter
- Profile revision
- Growth plan
- Interview plan
- Application package
- Project proposal
- Content draft
- Company description
- Hiring criteria
- Candidate summary
- B2B account plan
- Stakeholder map
- Meeting brief
- Follow-up plan
- Analytics report

────────────────────────────────────────
15. BIDIRECTIONAL CONNECTION WITH HAMRAHE
────────────────────────────────────────

All integrations must be real and visible.

Home:
Input: activity, priorities, open cases, alerts
Return: missions, next actions, case continuation

Personal Profile:
Input: experience, skills, projects, evidence
Return: profile improvements, resume, analysis

Organization Profile:
Input: company information, services, members, opportunities
Return: profile improvements, content, hiring, sales support

Feed:
Input: posts, engagement, audience
Return: drafts, rewrites, performance analysis

Network:
Input: connections, mutual connections, groups
Return: warm introductions, messages, follow-ups

Jobs:
Input: job description, criteria, application state
Return: fit analysis, tailored resume, interview preparation

Projects:
Input: description, budget, timeline, skills
Return: proposal, scope, follow-up

Learning:
Input: course, exercise, project, progress
Return: adaptive learning path, skill evidence

Assessment:
Input: assessment, result, validity
Return: gap analysis, credential guidance

Messages:
Input: explicitly selected conversation
Return: response, follow-up, registered result

Events and Groups:
Input: topic, people, attendance
Return: networking plan, follow-up

Search:
Input: query, filters, results
Return: semantic search, saved alert

Alerts:
Input: event, deadline
Return: prioritization, direct action

Calendar:
Input: availability, meetings
Return: suggested time, agenda, follow-up

Premium:
Input: plan and quota
Return: usage estimate and upgrade option

Settings:
Input: consent, memory, sharing
Return: applied analysis restrictions

Verification:
Input: state, evidence, appeal
Return: pathway, missing evidence, evidence package

Admin:
Input: rules, errors, risks, capacity
Return: governance, audit, suspension

No Hamrahe section should remain isolated.

────────────────────────────────────────
16. MEMORY, DATA, AND PERMISSIONS
────────────────────────────────────────

Create a complete Memory and Permissions page.

Storable memory types:

- Professional goal
- Target role
- Preferred tone
- Professional field
- Geographic scope
- Preferred collaboration type
- Private minimum compensation
- Time availability
- Important contacts
- Target companies
- Learning preferences
- Content preferences

User controls:

- View memory
- Edit each item
- Delete each item
- Clear all memory
- Temporarily disable memory
- Create a temporary conversation
- Control every data source
- Control output sharing
- Set permission expiration
- Revoke permission
- View the impact of revocation

Every consent record must show:

- Which data is used
- Why it is used
- Which tool uses it
- Which case uses it
- Which person or organization receives it
- Expiration date
- Whether it can be revoked
- Effect of revocation

Do not use vague permissions such as “Allow AI access to everything.”

Use granular, understandable permissions.

────────────────────────────────────────
17. QUOTA, PLAN, AND PAYMENT
────────────────────────────────────────

AI Engine credit is not a financial wallet.

It cannot be withdrawn or transferred as money.

The Quota page includes:

- Remaining quota
- Used quota
- Personal usage
- Organizational usage
- Estimated cost before execution
- Usage confirmation
- Usage history
- Active plan
- Limited capabilities
- Upgrade option
- Premium rewards earned through eligible badges

Payment or Premium must never:

- Change Professional Power
- Increase Trust
- Simplify verification
- Generate a badge
- Manipulate matching
- Make a weaker candidate appear stronger

Use the existing Hamrahe Product Catalog and Entitlement logic when available.

────────────────────────────────────────
18. REQUIRED CLICKABLE FLOWS
────────────────────────────────────────

Implement at least the following complete clickable flows.

A. First Entry

Open AI Engine
→ Explain value and data control
→ Detect active context
→ Select goal
→ Select data sources
→ Import resume when required
→ Confirm extracted information
→ Run first analysis
→ Present three actions
→ Configure memory and notifications
→ Enter For Me

B. Goal to Outcome

Define goal
→ Select target role
→ Review evidence
→ Identify gaps
→ Build growth plan
→ Find opportunity
→ Analyze fit
→ Create application package
→ Preview
→ Confirm and simulate submission
→ Prepare for interview
→ Register result
→ Adjust plan

C. Job Application

Open job
→ Open contextual assistant
→ Analyze fit
→ View reasoning
→ View gaps
→ Build tailored resume
→ Create cover note
→ Edit
→ Preview shared data
→ Confirm
→ Register application
→ Create case
→ Track outcome

D. Badge Pathway

Select badge
→ Check verification prerequisite
→ View requirements
→ View evidence
→ Complete required action
→ Build evidence package
→ Submit for review
→ Issue through the authorized non-AI process or show missing requirements
→ Control profile display
→ Apply reward
→ Renew or appeal

E. Organizational Hiring

Define hiring need
→ Build criteria
→ Create job description
→ Source candidates
→ Apply hard requirements
→ Run explainable matching
→ Evaluate
→ Interview
→ Human decision
→ Notify candidate
→ Register result
→ Improve criteria

F. Business Development

Select market
→ Build target account
→ Analyze company
→ Identify decision-maker
→ Create stakeholder map
→ Build value proposition
→ Draft message
→ Preview
→ Confirm
→ Register outreach
→ Follow up
→ Register result
→ Analyze pipeline

────────────────────────────────────────
19. REQUIRED INTERFACE STATES
────────────────────────────────────────

Design these states for all important components and flows:

- New user
- Empty state
- Insufficient data
- Conflicting data
- Unsupported claim
- Processing
- Result ready
- Approval required
- Permission unavailable
- Insufficient quota
- AI service unavailable
- Sensitive action
- Failed action
- Expired result
- Review required
- Suspended
- Disputed
- Integration error
- No search results
- Offline
- Invalid file upload
- Unauthorized organizational data
- Context change with unsaved work

Use:

- Skeleton loading
- Limited and purposeful spinners
- Clear status text

Never show fake progress percentages when real progress is unavailable.

────────────────────────────────────────
20. VISUAL LANGUAGE AND 2026 DESIGN QUALITY
────────────────────────────────────────

The design must satisfy two conditions simultaneously:

1. It must clearly continue Hamrahe’s current design
2. It must meet world-class 2026 standards for professional networks, intelligent products, and business software

Modern design does not mean adding unnecessary visual effects.

Use:

- Calm and professional interface
- Trustworthy appearance
- Action-oriented structure
- Progressive disclosure
- Clear content hierarchy
- Chat beside structured outputs
- Contextual panels
- Natural-language command input
- Adaptive cards
- Limited and purposeful Bento structures
- Generous but controlled whitespace
- Controlled information density
- Short micro-interactions
- Soft functional motion
- Immediate action feedback
- Explainable charts
- Visible data sources
- Preview before execution
- Visible version history

Avoid:

- Direct LinkedIn imitation
- Excessive glassmorphism
- Gradients on every card
- Heavy shadows
- Excessively rounded cards
- Too many pills
- Decorative icons without meaning
- Showy animations
- Irrelevant 3D elements
- Neon colors
- Low-contrast gray text
- Too many statistic cards
- Admin-panel appearance
- Empty ChatGPT-like page
- Generic slogans such as “Experience the power of AI”

────────────────────────────────────────
21. ALIGNMENT WITH CURRENT HAMRAHE DESIGN
────────────────────────────────────────

Preserve and improve these existing elements:

- Fixed white header
- Circular Hamrahe logo
- Main search bar
- Horizontal navigation
- Light neutral background
- White cards
- Subtle borders
- Minimal shadows
- Soft corners
- Existing blue, purple, and pink gradient
- Green for confirmation
- Amber for warning
- Red for errors and irreversible actions
- High-contrast dark text
- Appropriate multi-column layouts
- Existing card and button structure

Correct current weaknesses where they exist:

- Very small text
- Weak secondary-text contrast
- Overcrowded header
- Unbalanced whitespace
- Small touch targets
- Inconsistent shadows and borders
- Excessive radius variation
- Inconsistent status colors
- Reliance on color alone

If current tokens exist, reuse them.

If the token system is incomplete, create:

- 4px spacing grid
- Primary spacing: 8, 12, 16, 20, 24, 32, 40
- Card radius: 14–16px
- Input radius: 10–12px
- Primary button height: 44–48px
- Primary input height: 48px
- Desktop content width: approximately 1180–1280px
- Minimal natural shadow
- 1px neutral border
- Main gradient only for AI identity, primary action, or focus points
- Blue as primary color
- Purple as AI complementary color
- Status colors separated from brand colors

────────────────────────────────────────
22. TYPOGRAPHY AND LANGUAGE
────────────────────────────────────────

- Use the project’s existing font
- Use a professional Persian font such as IRANYekan or Vazirmatn if it already exists in the project
- Create a consistent typography scale
- Use clear but non-oversized page titles
- Main body text should be at least 14–16px
- Critical text must not be smaller than 14px
- Use appropriate line height
- Localize numbers, units, dates, and currencies
- Do not translate the brand name “AI Engine”
- English must use LTR
- Persian must use complete RTL
- Do not mix Persian and English unnecessarily within one language mode
- Established brand names and professional terms may remain in English

If the current project language is English, keep English as the default while implementing complete Persian and RTL support.

────────────────────────────────────────
23. RESPONSIVENESS
────────────────────────────────────────

Complete the design for:

- Large desktop: 1440–1600px
- Laptop: 1280px
- Tablet: 768–1024px
- Mobile: 360–430px

Rules:

- No unwanted horizontal scrolling on mobile
- Convert tables into cards or controlled scroll views
- Convert assistant side panels into bottom sheets or full-screen views
- Convert internal navigation into scrollable tabs or a sheet menu
- Keep primary actions thumb-accessible
- Minimum touch target: 44×44px
- Sensitive modals become full-screen on mobile
- Keep the context switcher accessible
- Keep text outputs editable on mobile
- Do not remove important functionality on mobile

────────────────────────────────────────
24. DARK MODE
────────────────────────────────────────

Because Dark Mode already exists in Hamrahe Settings, AI Engine must support complete Dark Mode.

Do not simply invert colors.

Define separate dark values for:

- Background
- Surface
- Elevated surface
- Border
- Primary text
- Secondary text
- Charts
- Status colors
- Focus
- Gradient

Maintain contrast.

Green, amber, and red states must remain distinguishable.

In Dark Mode, use borders and surface hierarchy instead of heavy shadows.

────────────────────────────────────────
25. ACCESSIBILITY
────────────────────────────────────────

Meet at least WCAG AA.

Include:

- Sufficient contrast
- Clear focus states
- Complete keyboard navigation
- Real labels for inputs
- Accessible icon descriptions
- No color-only meaning
- Screen-reader support
- Logical tab order
- Reduced-motion support
- Understandable error messages
- Field-level error association
- Two-step confirmation for irreversible actions

────────────────────────────────────────
26. MOCK DATA AND INTERFACE LOGIC
────────────────────────────────────────

If a real backend is unavailable, build a centralized, structured mock-data layer.

Do not scatter hardcoded data across components.

Core models:

- ActiveContext
- User
- Organization
- Goal
- Mission
- Case
- CaseTimelineEvent
- Conversation
- ToolDefinition
- ToolRun
- OutputArtifact
- OutputVersion
- Evidence
- Claim
- Consent
- Permission
- MemoryItem
- VerificationState
- TrustSignal
- Badge
- Credential
- QuotaLedger
- Approval
- AuditEvent
- Notification
- JobApplication
- ProjectProposal
- Candidate
- TargetAccount
- Lead

Use existing sample entities to maintain continuity:

- Sara Ahmadi
- Digikala
- Snapp
- Senior Product Designer

Create sample personal cases:

- Application for Senior Product Designer at Snapp
- Growth plan toward Product Lead
- Sara Ahmadi profile improvement
- Network badge pathway
- Interview preparation
- Design project proposal

Create sample organizational cases:

- Hiring a Senior Product Designer
- Hiring funnel analysis
- Organizational target account
- Partnership proposal
- Lead requiring follow-up

────────────────────────────────────────
27. FUNCTIONAL INTERACTIONS
────────────────────────────────────────

The following interactions must work:

- Switch personal and organizational context
- Change language
- Change theme
- Search tools
- Filter tools
- Save tools
- Start a tool
- Create a case
- Continue a case
- Open an output
- Edit an output
- Compare versions
- Restore a version
- Open data sources
- Grant permission
- Revoke permission
- Preview an action
- Confirm an action
- Cancel an action
- Submit an appeal
- View history
- View quota
- Simulate plan upgrade
- Open the contextual assistant from different pages
- Send assistant results to the relevant Hamrahe section
- Register results in a case timeline
- Show success and failure notifications
- Handle errors
- Close the assistant without losing a draft

No primary button may remain non-functional.

Avoid decorative cards or buttons that perform no action.

────────────────────────────────────────
28. AI ENGINE ADMINISTRATION
────────────────────────────────────────

This area must not be visible to normal users.

If the current project contains Admin, add AI Engine management inside the existing Admin.

Do not create a separate administration website.

Capabilities:

- Enable or disable features
- Experimental rollout
- Group-based rollout
- Country restrictions
- Language restrictions
- Role restrictions
- Capacity control
- Emergency stop
- Model and version management
- Fallback management
- Cost management
- Professional Power rule management
- Matching-rule management
- Mission management
- Badge management
- Response-time monitoring
- Error monitoring
- Queue monitoring
- Failed-action monitoring
- Security incident review
- Permission-violation review
- Complaint review
- Extraction-accuracy evaluation
- Fabricated-claim evaluation
- Detection of actions executed without confirmation
- Fairness and group-performance monitoring
- Complete audit logging

────────────────────────────────────────
29. IMPLEMENTATION ORDER
────────────────────────────────────────

Implement directly inside the current project in this order:

1. Inspect the current structure
2. Identify tokens and components
3. Add AI Engine route and navigation
4. Build the shared shell
5. Build For Me
6. Build the full assistant
7. Build the contextual assistant
8. Build the Tool Registry
9. Build Goals and Growth
10. Build Analytics
11. Build Verification, Badges, and Credentials
12. Build Cases
13. Build Outputs
14. Build Memory and Permissions
15. Build Quota and Usage
16. Build organizational context
17. Connect existing Hamrahe pages
18. Build clickable flows
19. Build error and empty states
20. Complete mobile, RTL, and Dark Mode
21. Test all routes and interactions
22. Validate all acceptance criteria

If everything cannot be completed in one generation, do not delete or simplify any requirement.

Preserve the complete architecture, routes, components, and data models, then continue implementation in connected phases.

────────────────────────────────────────
30. PROHIBITED RESULTS
────────────────────────────────────────

Do not:

- Build an isolated page
- Build only a chatbot
- Build only statistic cards
- Use “Dashboard” as the page title
- Use “AI Center” as the product name
- Create a second personal profile
- Create a second organization profile
- Delete current pages
- Delete current navigation
- Replace the entire Hamrahe visual identity
- Directly copy LinkedIn
- Overuse gradients
- Overuse glassmorphism
- Show fabricated scores
- Show fabricated processing percentages
- Send actions automatically
- Automatically hire or reject candidates
- Let AI issue badges
- Let AI issue verification
- Change matching because of Premium
- Hide data sources
- leave important outputs inside chat only
- Use Lorem Ipsum
- Leave buttons without behavior
- Use Coming Soon for core AI Engine capabilities
- Build only desktop
- Build only English or only Persian
- Ignore RTL
- Use very small text
- Create a visually impressive but unusable interface

Learning is an active Hamrahe product area and must not be represented as Coming Soon.

────────────────────────────────────────
31. FINAL ACCEPTANCE CRITERIA
────────────────────────────────────────

Work is complete only when all conditions below are satisfied:

- AI Engine has an independent item in the main navigation
- The exact page name is AI Engine
- The page is not called Dashboard
- No duplicate profile is created
- Active context comes from the main account
- Profile tools act on the existing primary profile
- Complete Analytics exists
- Complete chat exists
- Contextual assistant exists across relevant pages
- Tool Registry contains at least 180 genuinely unique capabilities
- Tool search and filters work
- Cases, outputs, versions, and history exist
- Personal and organizational badge systems remain separate
- Verification, Trust, Badges, and Credentials remain separate
- Verify is not displayed as a badge
- Verification precedes Trust and Badges
- AI does not change Professional Power
- AI does not issue badges
- AI does not issue verification
- Every external action has a preview
- User approval exists before execution
- All relevant sections exchange data bidirectionally
- Action results return to the related case and analysis
- Important outputs are saved outside chat
- Memory is visible, editable, and removable
- Permissions are controllable and revocable
- Organizational data remains isolated
- Hiring decisions remain human
- Premium does not affect matching, power, trust, or verification
- Empty, error, incomplete-data, suspension, and appeal states exist
- Important decisions are versioned and auditable
- The design remains consistent with current Hamrahe screens
- The interface meets professional 2026 product-design standards
- Desktop, tablet, and mobile are complete
- Persian RTL and English LTR are supported
- Light and Dark Mode exist
- Primary buttons work
- No broken route exists
- No major page remains empty
- No unwanted horizontal scroll exists
- No current Hamrahe capability has been removed

Before finishing:

- Test every route
- Test every primary interaction
- Test responsive layouts
- Test RTL
- Test Dark Mode
- Test error states
- Test permission states
- Test unsaved drafts
- Test context switching
- Test case updates
- Test action previews
- Test approval flows
- Test version restoration
- Validate every acceptance criterion
- Fix incomplete or broken elements before stopping

Do not merely explain the design.

Do not only provide an implementation plan.

Directly design and implement the complete AI Engine inside the current Hamrahe project.
```
