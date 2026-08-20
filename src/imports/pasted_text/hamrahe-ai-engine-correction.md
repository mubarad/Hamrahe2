# HAMRAHE AI ENGINE

## Corrective Product Architecture and Implementation Prompt for the Existing Figma Make Project

Work directly inside the current Hamrahe project.

This is a corrective implementation task, not a request to create a new standalone concept, redesign the entire product, generate another static dashboard, or write a product document.

Read this specification completely before changing anything.

Do not merely summarize it.

Do not create a second AI Engine.

Do not restart the project.

Do not delete or replace working Hamrahe pages.

Inspect the existing routes, components, data structures, design tokens, tool definitions, AI Engine implementation, shared details modal, and navigation before modifying files.

The attached Hamrahe screens and the current project are the visual and structural source of truth.

---

# 1. CURRENT FAILURE THAT MUST BE CORRECTED

The current AI Engine Tool section is not an operational tool system.

It is currently a visual catalog containing tool names, icons, cards, repeated metadata, and one generic shared details panel.

This does not count as implementation.

The current implementation has these fundamental problems:

* Tools are mostly names and icons
* Nearly all tools open the same generic details panel
* Each tool lacks a unique product contract
* Required data is not connected to real Hamrahe entities
* Inputs are not editable or validated
* Data sources are vague or duplicated
* Missing information is not detected
* Permissions are not granular
* Tools are not connected to goals, cases, outputs, analytics, jobs, profiles, messages, learning, assessments, organizations, or other relevant modules
* No real execution path exists
* No versioned output is created
* No result returns to the originating Hamrahe section
* No action preview or approval flow exists
* Execution history is missing
* Error, incomplete-data, revoked-permission, and failed-action states are missing
* The interface forces the user to browse a large catalog instead of letting AI select the right capabilities
* The visible count is inconsistent because capability totals are hard-coded
* Personal and organizational capabilities are mixed
* Verification and Badges are incorrectly combined
* Technical terms such as Tool Registry, Context, Sensitivity, and Capabilities are overexposed to ordinary users
* Repeated LOW RISK labels create noise
* The current dark oversized AI Engine header makes the section feel disconnected from Hamrahe
* Persian RTL context is sometimes shown with English LTR content
* Many buttons are decorative and do not complete a meaningful flow

Do not fix this by only changing colors, spacing, copy, cards, or icons.

Rebuild the capability architecture and execution experience.

---

# 2. CORE PRODUCT DEFINITION

AI Engine is Hamrahe’s shared intelligence and action layer.

It is not:

* A chatbot-only product
* A dashboard-only product
* A marketplace of disconnected AI tools
* A second personal profile
* A second company profile
* A replacement for Jobs, Learning, Assessment, Analytics, Messages, Profiles, or Company Pages
* An autonomous system that can act without user control

The correct model is:

User intent
→ active Hamrahe context
→ recommended workflow
→ required data and permissions
→ execution plan
→ one or more capabilities
→ reviewable output
→ user approval when required
→ action or save
→ case and source-module update
→ history, analytics, and follow-up

The user should normally describe what they want to achieve.

AI Engine must determine which capabilities should be orchestrated.

The user must not be forced to understand or manually select from more than 180 internal capabilities.

---

# 3. NON-NEGOTIABLE DOMAIN RULES

These rules must be enforced in both interface behavior and data architecture:

1. AI Engine must have an independent item in the existing main Hamrahe navigation.

2. Its exact English product name is `AI Engine`.

3. Do not call it Dashboard or AI Center.

4. Use the authenticated Hamrahe account as the active identity.

5. Do not create another personal or organizational profile inside AI Engine.

6. Personal and organizational contexts must remain separate.

7. Organizational information must be isolated by organization, membership, role, and permission.

8. Identity, organization ownership, organization representation, membership, and sensitive-role verification must exist before Trust or Badge evaluation.

9. Verification is a state supported by evidence. Verification is not a badge.

10. Verification, Trust, Badges, and Credentials are separate systems.

11. Personal badges and organizational badges are separate systems.

12. AI may explain requirements and prepare evidence, but it cannot issue verification.

13. AI may prepare a badge evidence package, but it cannot issue or approve a badge.

14. AI may interpret Professional Power, but it cannot directly change its score or rules.

15. AI activity alone must never increase Professional Power, Trust, Match Score, or Badge eligibility.

16. Premium plans must not improve matching, ranking, Trust, Verification, Professional Power, or hiring outcomes.

17. Payment and entitlement may only control access, quotas, usage, or advanced features.

18. Hiring and rejection decisions must remain human decisions.

19. AI may prepare candidate analysis but must not automatically hire, reject, shortlist, or contact a candidate without authorized human review.

20. Every external or sensitive action requires a preview and explicit confirmation.

21. Important outputs must be saved outside the conversation as versioned artifacts.

22. Learning is an active Hamrahe product area and must not be shown as Coming Soon.

23. Assessment Center is separate from Learning.

24. Do not fabricate scores, percentages, processing progress, data sources, verification states, or completed actions.

25. Do not hard-code subscription prices or capability totals.

26. Do not introduce wallets, escrow, stored balances, project settlement, or financial custody.

---

# 4. PRESERVE THE EXISTING HAMRAHE PRODUCT

Keep the existing Hamrahe main shell and all current capabilities, including where already present:

* Home
* Network
* Personal Profile
* Company Profile
* Jobs
* Job Applications
* Projects and Freelance Opportunities
* Learning
* Assessment Center
* Messages
* Notifications
* Content and Posts
* Events
* Products
* Services
* Analytics
* Verification
* Trust
* Badges
* Credentials
* Premium
* Settings
* Support

Do not delete current routes.

Do not rename unrelated routes.

Do not duplicate existing entities.

If an existing AI Engine route conflicts with the new structure, preserve compatibility through an alias or redirect.

AI Engine must connect to these modules bidirectionally.

For example:

* A job workflow reads a selected job and application
* Its outputs are saved to the related application case
* Approved updates return to the application
* Resulting events appear in Analytics
* Follow-up tasks appear in For Me
* The same case can be resumed from the Job page, AI Engine, or contextual assistant

---

# 5. INFORMATION ARCHITECTURE

Use a compact AI Engine shell integrated with the existing Hamrahe header.

Remove the oversized dark hero header and decorative edition labels.

The AI Engine page header should contain only:

* AI Engine title
* Active personal or organizational context
* Current goal when one exists
* Usage or quota summary
* Context-switch control for users authorized to access organizations

Use a compact internal sidebar or responsive navigation with these destinations:

* For Me
* Assistant
* Workflows
* Cases
* Outputs
* Goals
* Analytics
* Verification & Evidence
* Memory & Permissions
* Usage

Preserve or create these compatible routes:

* `/ai-engine`
* `/ai-engine/assistant`
* `/ai-engine/tools`
* `/ai-engine/cases`
* `/ai-engine/outputs`
* `/ai-engine/goals`
* `/ai-engine/analytics`
* `/ai-engine/verification`
* `/ai-engine/memory`
* `/ai-engine/permissions`
* `/ai-engine/usage`

The user-facing label for `/ai-engine/tools` should be `Workflows` or `Capabilities`, not `Tool Registry`.

`Tool Registry` may remain an internal technical name.

Group secondary routes instead of showing ten competing horizontal tabs.

On mobile, convert the internal sidebar into a compact drawer or selector.

---

# 6. CORRECT WORKFLOWS PAGE

Replace the current tool catalog with an intent-first experience.

The default page order must be:

1. Natural-language task input
   “What do you want to accomplish?”

2. Up to three context-aware recommended workflows

3. Unfinished cases requiring attention

4. Six to eight task-oriented categories appropriate to the active context

5. Recently used and saved workflows

6. A secondary `View all capabilities` entry for advanced users

Do not show all capabilities on initial load.

Default filters must include only:

* Search
* Category

Put audience, data source, output type, entitlement, permissions, and action sensitivity inside `More filters`.

Do not repeat the active account context as another filter.

Do not show LOW RISK labels.

Only show a warning label when a workflow:

* Sends or publishes something
* Modifies important stored data
* Uses sensitive information
* Affects another person
* Requires organizational authorization
* Requires explicit approval

Use a label such as:

* `Requires your approval`
* `Organization approval required`
* `Sensitive data permission required`

---

# 7. USER-FACING WORKFLOW CARDS

A workflow card should contain only:

* Task name
* Clear result or user benefit
* Why it is recommended, when personalized
* Active context, when necessary
* Estimated credit or usage cost
* One primary action such as `Start` or `Continue`

The entire card may open its details.

Do not place competing `View Details` and `Start` buttons on every card.

Do not expose internal implementation terminology on the card.

Use task language, such as:

* Prepare me for this interview
* Tailor my resume to this job
* Build a learning plan for this skill gap
* Prepare a salary negotiation strategy
* Draft a message to this connection
* Analyze this partnership opportunity

Do not use vague labels such as:

* AI Analyzer
* Smart Optimizer
* Advanced Intelligence Tool
* General Assistant

---

# 8. WORKFLOW DETAILS EXPERIENCE

Replace the current generic shared modal.

Open a context-aware drawer or dedicated workflow start page.

Every workflow details experience must show information derived from its own definition:

* Intended outcome
* Why this workflow is relevant
* Selected Hamrahe context
* Required information
* Available information
* Missing information
* Exact data sources
* Permission requirements
* Planned execution steps
* Expected outputs
* Where outputs will be saved
* Whether a case will be created or updated
* Possible external actions
* Approval requirements
* Estimated usage
* Previous runs and outputs
* Known limitations

The primary action must adapt to readiness:

* `Complete required information`
* `Grant permission`
* `Select a job`
* `Review plan`
* `Start workflow`
* `Continue case`
* `Review output`
* `Approve action`

Never show `Run Tool` when context or required information is missing.

---

# 9. PRODUCT OBJECT MODEL

Do not treat every capability as a standalone page.

Implement these distinct objects:

## Workflow

A user-facing task that may orchestrate several capabilities.

Examples:

* Apply for a job
* Prepare for an interview
* Improve my profile for a target role
* Build a six-week learning plan
* Prepare a partnership proposal

## Capability

A reusable internal function with a specific input and output contract.

Examples:

* Extract job requirements
* Compare profile evidence with job requirements
* Generate interview questions
* Build an objection-response matrix
* Draft an email variant

## Case

A persistent container for multi-step work associated with a goal or entity.

## Execution Run

One attempt to execute a workflow or capability.

## Output Artifact

A versioned result saved outside chat.

## Action Intent

A proposed action that may modify data, send a message, publish content, apply for a job, or affect another person.

## Evidence Item

A source-backed item that may support Verification, Credentials, or Badge eligibility without allowing AI to issue them.

## Audit Event

A permanent record of important reads, writes, permissions, approvals, executions, failures, and reversals.

---

# 10. CAPABILITY CONTRACT

Inspect all existing tool or capability definitions.

Replace icon-only definitions with a typed schema-driven registry.

Each published capability must define at least:

* Unique stable ID
* Slug
* Version
* Localized name
* Localized outcome description
* Personal, organizational, or shared audience
* Category
* Supported user intents
* Supported context entity types
* Valid entry points
* Required inputs
* Optional inputs
* Input types and validation
* Exact readable data fields
* Exact writable data fields
* Data purpose
* Data freshness requirement
* Required permissions
* Required organizational role
* Prerequisites
* Workflow steps
* Output types
* Output save location
* Case behavior
* Internal side effects
* External side effects
* Approval policy
* Follow-up actions
* Error states
* Recovery actions
* Analytics events
* Evidence relationships
* Entitlement and quota behavior
* Availability status
* Audit requirements

Do not include a direct `Professional Power increase`, `Trust increase`, `Match increase`, or `Badge reward` property.

A capability may create evidence or record an actual completed outcome, but scoring systems must evaluate that outcome independently.

A capability is not considered implemented when it only has:

* A title
* An icon
* A description
* A generic input field
* A generic result panel
* A decorative start button

A published capability is implemented only when it can:

1. Resolve its context
2. Collect and validate required information
3. Request exact permissions
4. Identify missing or conflicting data
5. Create an execution plan
6. Produce its defined output
7. Save a versioned artifact
8. Return the result to the relevant case or Hamrahe module
9. Request confirmation before sensitive actions
10. Record the complete history and result

Capabilities that do not yet meet this contract must remain internal drafts and must not appear as ready-to-use tools.

---

# 11. DO NOT HARD-CODE CAPABILITY TOTALS

The current project may contain 180, 192, or another number of definitions.

Inspect and deduplicate them.

Two capabilities are not unique merely because they have different names or icons.

They must have materially different:

* Outcome
* Input contract
* Execution logic
* Output
* Context
* Or side effect

Compute visible totals from the actual registry.

Never hard-code `180 capabilities`, `192 tools`, or another marketing count.

Keep at least 180 genuinely unique capability definitions if they already exist in the project requirements, but do not sacrifice executable contracts merely to reach a number.

Do not create hundreds of shallow cards.

---

# 12. CAPABILITY EXECUTION ENGINE

Build one shared execution engine that can render genuinely different workflows from their definitions.

The execution engine must include:

* Intent resolution
* Active-context resolution
* Entity selection
* Data readiness checking
* Input collection
* Validation
* Source inspection
* Granular permission request
* Prerequisite checking
* Execution-plan preview
* Run status
* Step history
* Output creation
* Output editing
* Version management
* Case creation or update
* Action preview
* Explicit approval
* Action execution through an adapter
* Failure recovery
* Cancellation
* Audit logging
* Follow-up creation
* Analytics event emission

Use a state machine similar to:

* Draft
* Needs context
* Needs information
* Needs permission
* Ready
* Running
* Needs review
* Awaiting approval
* Approved
* Executing action
* Completed
* Partially completed
* Failed
* Cancelled
* Expired

Do not display fabricated processing percentages.

Use step-based status unless real measurable progress exists.

---

# 13. FRONTEND AND BACKEND HONESTY

Inspect the existing project to determine whether real services are available.

If real AI, messaging, job application, publishing, email, calendar, or data services are unavailable:

* Create typed service interfaces
* Create clear adapter boundaries
* Add connection states
* Use deterministic demo adapters for prototype flows
* Do not claim that an unavailable external action succeeded
* Show `Connection required` or `Demo simulation` where appropriate
* Keep the interface ready for later Supabase, API, AI-provider, messaging, email, or application-service integration

Do not scatter mocked responses directly inside UI components.

Keep mock or demo data behind adapters.

All primary prototype flows must remain clickable and coherent.

---

# 14. REQUIRED GOLD-STANDARD WORKFLOWS

Before migrating the entire capability registry, implement the shared execution engine and these reference workflows completely.

Do not create more static cards while these workflows remain incomplete.

## 14.1 Salary Negotiation Preparation

Context:

* Selected job
* Job application
* Interview process
* Offer or negotiation case

Required or optional information:

* Role
* Company
* Location
* Work model
* Hiring stage
* Current offer
* Target compensation
* Minimum acceptable compensation
* Benefits
* Personal priorities
* Alternative offers
* Negotiation deadline
* Relevant achievements
* Market information when a legitimate source is connected

Required outputs:

* Negotiation objective
* Opening anchor
* Supporting arguments
* Objection-response matrix
* Concession strategy
* Questions to ask
* Walk-away conditions
* Meeting script
* Message version
* Email version
* Follow-up plan

Behavior:

* Save outputs as versioned artifacts
* Attach artifacts to the related application case
* Allow user editing
* Require approval only before sending
* Record the final result and next action
* Update negotiation readiness and goal progress only from actual workflow completion
* Do not change Trust, Professional Power, Verification, or Badges

## 14.2 Job Application Package

* Select a real job
* Analyze requirements
* Compare profile evidence
* Identify gaps
* Tailor resume
* Draft cover note
* Prepare application answers
* Preview the package
* Save every artifact
* Require confirmation before application submission
* Return submission status to the application case

## 14.3 Resume Tailoring

* Select target job or target role
* Read the existing main profile and resume
* Never create a duplicate profile
* Show proposed changes as a comparison
* Preserve factual accuracy
* Require user review before applying changes
* Save previous and new versions

## 14.4 Interview Preparation

* Connect to the application and company
* Identify interview stage
* Build role-specific questions
* Create evidence-backed answer structures
* Create practice sessions
* Record user notes
* Produce a final preparation brief
* Save follow-up tasks

## 14.5 Professional Profile Improvement

* Read the existing primary profile
* Identify incomplete or weak evidence
* Connect recommendations to a target goal
* Preview every suggested profile change
* Apply only user-approved changes
* Never fabricate experience, skills, or achievements

## 14.6 Skill Evidence Preparation

* Select a skill
* Show current evidence
* Identify evidence gaps
* Connect relevant projects, assessments, credentials, recommendations, or work history
* Build an evidence package
* Allow submission to the independent verification or badge process
* Never issue verification or a badge

## 14.7 Learning Plan

* Connect to a real skill gap or career goal
* Use active Learning resources
* Keep Assessment Center separate
* Build milestones and tasks
* Track completed learning activities
* Update goal progress from actual completion
* Do not display Learning as Coming Soon

## 14.8 Networking Message

* Select a person or connection
* Use visible relationship context only with permission
* Explain why the connection is relevant
* Generate message variants
* Allow editing
* Preview recipient and final message
* Require confirmation before sending
* Save the interaction to the relationship history

## 14.9 Content and Professional Brand

* Connect to user expertise, audience, and goal
* Create an outline and content versions
* Preserve source provenance
* Detect unsupported claims
* Save drafts
* Require confirmation before publishing
* Return published or scheduled status to the related case

## 14.10 Freelance Proposal

* Select a project
* Compare requirements with profile evidence
* Identify missing inputs
* Create scope, approach, timeline, assumptions, and proposal copy
* Do not introduce escrow or project payment custody
* Require confirmation before submission

## 14.11 Organizational Job and Hiring Workflow

* Operate only within an authorized organization context
* Create or select a job
* Define role requirements
* Prepare job content
* Analyze applicants using job-relevant evidence
* Show data provenance and uncertainty
* Prevent protected or irrelevant attributes from influencing analysis
* Keep shortlist, interview, hire, and reject decisions human
* Require authorized confirmation before contacting candidates

## 14.12 Partnership Opportunity Workflow

* Select an organization or lead
* Connect to the authorized organizational context
* Build an opportunity brief
* Identify mutual value
* Prepare stakeholder questions
* Draft outreach
* Save versions
* Require preview and approval before outreach
* Record responses and follow-up in the case

Use these workflows as quality references for the rest of the registry.

Do not reuse their exact steps where the workflow meaning is different.

---

# 15. MODULE CONNECTIONS

Every workflow must explicitly declare which Hamrahe entities it reads and writes.

Supported contextual entities should include where relevant:

* Person
* Personal profile
* Organization
* Organization profile
* Organization membership
* Job
* Job application
* Candidate
* Connection
* Conversation
* Message
* Post
* Article
* Comment
* Project
* Freelance opportunity
* Learning item
* Learning path
* Assessment
* Skill
* Credential
* Verification evidence
* Badge evidence
* Event
* Product
* Service
* Goal
* Mission
* Case
* Output artifact

Do not use a vague source label such as `Hamrahe Data Layer`.

Show exact user-readable sources, such as:

* Current profile → Experience
* Selected application → Job requirements
* Selected company → Public company information
* User input → Minimum acceptable salary
* Conversation with X → Messages authorized for this case
* Learning history → Completed courses

Allow the user to inspect, exclude, update, or revoke data sources when appropriate.

---

# 16. FOR ME

The `For Me` page must be a calm action-oriented home for AI Engine.

Show:

* Current goal
* Up to three best next actions
* Cases requiring attention
* Outputs awaiting review
* Actions awaiting approval
* Missing data blocking progress
* Recent results
* A concise activity summary

Do not fill the page with unrelated statistics.

Do not use fabricated performance scores.

Do not repeat the full Tool Registry.

Recommendations must explain why they are shown.

---

# 17. FULL ASSISTANT

Build a complete AI Engine Assistant, but do not reduce AI Engine to chat.

Assistant must be able to:

* Understand the active personal or organizational context
* Reference visible Hamrahe entities
* Ask for missing information
* Recommend a workflow
* Start a workflow
* Create or update a case
* Produce versioned outputs
* Show data sources
* Request permission
* Present an action preview
* Ask for approval
* Return the result to the relevant module

Important outputs must not remain trapped inside conversation messages.

Allow users to convert a useful response into:

* Output
* Case
* Task
* Goal action
* Profile-change proposal
* Message draft
* Job-application artifact
* Learning-plan item

---

# 18. CONTEXTUAL ASSISTANT

Create a compact contextual assistant entry point on relevant existing Hamrahe pages.

It must receive the actual active entity instead of asking the user to find it again.

Examples:

* On a Job page: analyze fit, tailor resume, prepare application, prepare interview
* On a Person page: prepare an introduction, understand relationship context, draft a message
* On a Company page: research company, prepare outreach, analyze opportunity
* On a Profile page: improve profile, review evidence, prepare resume
* On a Learning page: build a learning plan, connect learning to a skill gap
* On a Project page: analyze project fit, prepare proposal
* In Messages: summarize authorized context, draft reply, create follow-up
* In Analytics: explain changes, identify evidence, suggest next actions

The contextual assistant must not create duplicate entity records.

---

# 19. CASES

Cases are persistent multi-step workspaces.

Each case should include:

* Title
* Type
* Active context
* Related entities
* Goal
* Owner
* Collaborators when authorized
* Status
* Current stage
* Timeline
* Required information
* Workflow runs
* Outputs
* Approvals
* Tasks
* Decisions
* Notes
* History
* Next action
* Outcome

Support:

* Personal cases
* Organizational cases
* Draft cases
* Paused cases
* Completed cases
* Failed or blocked cases
* Archived cases

Organizational cases must enforce role-based access.

---

# 20. OUTPUTS

Build a persistent output library.

Outputs may include:

* Resume
* Cover note
* Message draft
* Email draft
* Interview brief
* Negotiation strategy
* Learning plan
* Content draft
* Proposal
* Company brief
* Candidate review
* Meeting brief
* Evidence package
* Analysis report

Every important output needs:

* Version history
* Creation source
* Related case
* Related entity
* Author
* Creation time
* Last edit time
* Data sources
* Approval state
* Export or apply actions where relevant
* Restore previous version
* Compare versions

Do not show destructive overwrite as the default behavior.

---

# 21. GOALS, MISSIONS, AND ANALYTICS

Goals define what the user or organization is trying to achieve.

Missions are concrete actions within a goal.

Capabilities are tools used to complete missions.

Do not confuse these objects.

Analytics must show:

* Goal progress from real completed events
* Evidence completeness
* Workflow outcomes
* Case progress
* Output usage
* Action results
* Trend changes
* Data freshness
* Confidence and missing-data notes
* Recommended next steps

The Professional Power dashboard belongs inside Analytics.

AI may interpret Professional Power and suggest actions.

AI must not edit its score, rules, weights, or source events.

Do not display an invented score merely because a workflow ran.

---

# 22. VERIFICATION, TRUST, BADGES, AND CREDENTIALS

The AI Engine interface may provide one navigation destination called `Verification & Evidence`, but inside it preserve four separate models:

## Verification

Identity, organization, representative, membership, or role verification supported by evidence.

## Trust

A separate computed interpretation based on approved evidence and platform behavior.

## Badges

Rule-based recognition with personal and organizational domains kept separate.

## Credentials

Certificates, licenses, assessments, qualifications, and other claims with issuer and evidence information.

AI may:

* Explain requirements
* Identify missing evidence
* Organize documents
* Extract claims for review
* Prepare a submission package
* Track process status

AI may not:

* Approve verification
* Issue credentials
* Issue badges
* Modify Trust
* Modify Professional Power
* Invent evidence

---

# 23. MEMORY AND PERMISSIONS

Memory must be visible and controllable.

Show:

* What AI remembers
* Why it remembers it
* Source
* Scope
* Personal or organizational ownership
* Last use
* Edit action
* Remove action
* Clear-all action where appropriate

Permissions must be granular.

Do not request broad access to the entire Hamrahe account when a workflow only needs a few fields.

Show:

* Requested source
* Exact fields
* Purpose
* Duration
* Read or write access
* External action access
* Organization role requirement
* Revocation control

Revoking permission must affect future runs and show a recoverable blocked state.

---

# 24. USAGE AND ENTITLEMENTS

Usage may show:

* Current plan
* Available quota
* Recent consumption
* Estimated workflow cost
* Limit reached state
* Upgrade path
* Organization allocation when applicable

Do not hard-code final prices.

Use the shared entitlement system.

Premium must never change:

* Match quality
* Professional Power
* Trust
* Verification
* Badge rules
* Hiring decision
* Candidate ranking fairness

---

# 25. REQUIRED STATES

Design and implement meaningful states for:

* No active goal
* No recommendations
* No cases
* No previous outputs
* No available context
* Missing required information
* Conflicting data
* Stale data
* Low-confidence result
* Unsupported claim detected
* Permission required
* Permission denied
* Permission revoked
* Organization role missing
* Verification required
* Quota reached
* Service not connected
* Demo simulation
* Execution queued
* Execution running
* Partial completion
* Execution failed
* External action failed
* Approval required
* Approval expired
* Unsaved changes
* Cancelled workflow
* Suspended account
* Appeal in progress
* Offline or connection lost

Each error must include a useful recovery action.

Do not use generic `Something went wrong` as the only response.

---

# 26. VISUAL AND INTERACTION DIRECTION

Follow the existing Hamrahe design system.

Reuse existing:

* Header
* Navigation
* Typography
* Color tokens
* Surface colors
* Border styles
* Radii
* Spacing
* Inputs
* Buttons
* Modals
* Drawers
* Status patterns
* Empty states
* Loading patterns

The attached screens show the current Hamrahe product identity.

Improve its usability without replacing it with a different product identity.

Avoid:

* Generic SaaS dashboard templates
* Oversized dark hero areas
* Excessive purple-blue gradients
* Excessive glassmorphism
* Decorative statistic cards
* Dense three-column tool marketplaces
* Tiny text
* Repeated technical tags
* Stock illustrations
* Random icons
* LinkedIn copying
* Visually impressive but unusable layouts

Use gradients only as small controlled brand accents.

Keep hierarchy calm, professional, and information-driven.

All interface text must support:

* Persian RTL
* English LTR

Changing language must change both content and layout direction.

Do not mix RTL shell behavior with LTR content alignment.

Complete:

* Desktop
* Tablet
* Mobile
* Light Mode
* Dark Mode
* Keyboard navigation
* Visible focus states
* Accessible contrast
* Proper labels
* Reduced-motion behavior

No unwanted horizontal scrolling is allowed.

---

# 27. DATA CONSISTENCY

Use coherent realistic data across screens.

Do not use Lorem Ipsum.

Do not generate unrelated people, companies, jobs, and cases on every page.

If Sara Ahmadi is the active demo user, her:

* Profile
* Goals
* Applications
* Skills
* Cases
* Outputs
* Messages
* Learning history
* Permissions

must remain consistent throughout the prototype.

Organizational demo data must remain isolated from personal data.

All derived numbers must be computed from the actual demo state, not typed independently into cards.

---

# 28. IMPLEMENTATION ARCHITECTURE

Reuse the project’s current framework, routing, state management, and component conventions.

Do not add unnecessary dependencies.

Create shared typed modules for:

* Capability registry
* Workflow registry
* Context resolver
* Permission policies
* Execution state
* Cases
* Outputs
* Versions
* Action intents
* Approvals
* Evidence items
* Audit events
* Entitlements
* Service adapters
* Localization

Do not place the entire AI Engine inside one large component.

Do not duplicate workflow logic across cards, assistant, cases, and contextual assistant.

All entry points must use the same workflow definitions and execution engine.

A workflow started from a Job page and the same workflow started from AI Engine must create the same case and output structure.

---

# 29. IMPLEMENTATION ORDER

Implement in this order:

## Phase 0 — Audit

* Inspect all current AI Engine files
* Identify generic cards and shared modal logic
* Identify existing capability definitions
* Identify duplicated or hard-coded counts
* Identify current routes and integrations
* Preserve working behavior

Do not create a visible audit page.

## Phase 1 — Foundation

* Define product objects
* Create typed capability contracts
* Create workflow contracts
* Create execution states
* Create service adapters
* Create case and output models
* Create permission and approval policies

## Phase 2 — Shared Execution Experience

* Build the workflow start experience
* Build context selection
* Build input collection
* Build data readiness
* Build source inspection
* Build permission requests
* Build plan preview
* Build execution timeline
* Build output review
* Build action preview
* Build approval flow
* Build history

## Phase 3 — Correct Workflows Page

* Replace the catalog-first interface
* Build the intent input
* Build recommendations
* Build unfinished cases
* Build context-specific categories
* Build recent and saved workflows
* Move the full registry to a secondary advanced view

## Phase 4 — Reference Workflows

Fully implement the twelve gold-standard workflows.

Do not merely generate cards for them.

## Phase 5 — Registry Migration

* Audit every existing capability
* Deduplicate it
* Add its complete contract
* Connect it to the shared engine
* Keep incomplete definitions unpublished
* Derive totals from the registry

## Phase 6 — Cross-Product Integration

* Connect Profile
* Connect Jobs and Applications
* Connect Network
* Connect Messages
* Connect Learning
* Connect Assessment
* Connect Projects
* Connect Company Profile
* Connect Content
* Connect Events, Products, and Services
* Connect Analytics
* Connect Verification and Evidence

## Phase 7 — AI Engine Areas

* Complete For Me
* Complete Assistant
* Complete Contextual Assistant
* Complete Cases
* Complete Outputs
* Complete Goals
* Complete Analytics
* Complete Verification & Evidence
* Complete Memory & Permissions
* Complete Usage

## Phase 8 — States and Quality

* Complete empty and error states
* Complete Persian RTL
* Complete English LTR
* Complete responsive layouts
* Complete Light and Dark Mode
* Complete accessibility
* Complete interaction testing
* Remove decorative or broken buttons

If the execution limit is reached, stop at a clean working checkpoint.

Do not create placeholder pages to pretend later phases are complete.

Do not mark a phase complete when it contains only static interface elements.

---

# 30. PROHIBITED RESULTS

Do not:

* Build another isolated AI page
* Build only a chatbot
* Build only a dashboard
* Build only statistic cards
* Keep the current generic details modal
* Create one shared generic workflow for every capability
* Generate more icon-only tool cards
* Hard-code capability totals
* Show all capabilities on the default page
* Mix personal and organization data
* Create a duplicate profile
* Combine Verification with Badges
* Represent Verification as a badge
* Allow AI to issue badges or verification
* Allow AI to modify Trust or Professional Power
* Change matching because of Premium
* Invent scores or progress
* Hide data sources
* Request unnecessarily broad permissions
* Execute external actions without confirmation
* Automatically send messages
* Automatically publish content
* Automatically apply for jobs
* Automatically hire or reject candidates
* Automatically change the primary profile
* Leave important outputs inside chat only
* Use Coming Soon for core AI Engine or Learning capabilities
* Use Lorem Ipsum
* Leave primary buttons without behavior
* Claim an unavailable backend action succeeded
* Rewrite unrelated Hamrahe files
* Replace the current design language
* Build only desktop
* Build only English
* Ignore RTL
* Use tiny text
* Stop after redesigning the tool cards

---

# 31. FINAL ACCEPTANCE TESTS

The correction is complete only when:

* AI Engine is integrated into the existing Hamrahe navigation
* No existing Hamrahe route has been removed
* No duplicate profile has been created
* The active context comes from the authenticated Hamrahe account
* The default Workflows page is intent-first
* The full capability registry is secondary
* Capability totals are derived from registry data
* Every published capability has a complete contract
* The generic shared details modal has been removed
* Workflow details change meaningfully by workflow
* Required inputs are editable and validated
* Missing information is detected
* Exact data sources are visible
* Permissions are granular
* Execution plans are reviewable
* Important outputs are versioned
* Outputs are connected to cases
* Results return to their originating Hamrahe module
* External actions require preview and approval
* Action failures can be recovered
* Cases preserve complete history
* Assistant can start and continue workflows
* Contextual assistant receives the current entity
* Personal and organization contexts remain isolated
* Verification, Trust, Badges, and Credentials remain separate
* Personal and organization badges remain separate
* AI does not issue verification or badges
* AI does not change Professional Power
* Premium does not affect fairness or professional scoring
* Hiring decisions remain human
* Learning is active
* Assessment remains separate
* Empty, incomplete, error, revoked-permission, and failed-action states exist
* Persian RTL and English LTR work correctly
* Desktop, tablet, and mobile work correctly
* Light and Dark Mode work correctly
* No unwanted horizontal scroll exists
* No core page remains empty
* No primary button is decorative
* No unavailable external action is represented as successfully completed

Before stopping:

* Test every modified route
* Test every primary interaction
* Test workflow continuation
* Test case creation and update
* Test output versioning
* Test permission revocation
* Test action preview
* Test approval expiration
* Test execution failure
* Test context switching
* Test organization isolation
* Test RTL
* Test Dark Mode
* Test responsive layouts
* Fix regressions before reporting completion

---

# 32. COMPLETION REPORT

At the end of the run, provide a precise implementation status containing:

1. Audited existing implementation
2. Completed phases
3. Fully operational workflows
4. Partially completed workflows
5. Unpublished incomplete capabilities
6. Routes modified
7. Components and registries created
8. Real service connections available
9. Demo or mock adapters still in use
10. Remaining work
11. Exact next implementation step

Do not say the AI Engine is complete if the work only consists of cards, icons, screens, or generic mocked output.

Start by auditing the existing project, then implement Phase 1 and continue in order.
