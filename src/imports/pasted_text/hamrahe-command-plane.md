Work inside the existing Hamrahe Figma Make project:

https://www.figma.com/make/VFeT3DsPhfvONcByoXsVuP/hamrahe?p=f&t=hVH9QwQ8gRdMepm3-0

Before making any changes, inspect the entire existing project structure, pages, routes, components, design system, colors, typography, layouts, contexts, and source code.

Do not delete, simplify, replace, or redesign any existing Hamrahe page, feature, route, component, or user flow.

The goal is not to create an isolated traditional admin dashboard.

The goal is to build:

Hamrahe Global Owner Command & Operations Control Plane

This system must operate as the central command, control, governance, and operations layer for the entire Hamrahe platform.

It must connect to all existing and future Hamrahe modules, including:

- Users
- Organizations
- Company administrators
- Recruiters
- Jobs
- Applications
- Candidates
- Resumes
- Talent pools
- Professional growth
- Skills
- Badges
- Learning
- Assessments
- Content
- Posts
- Comments
- Messaging
- Events
- Projects
- Products
- Services
- B2B opportunities
- Trust
- Risk
- Verification
- Support
- Revenue
- Billing
- AI
- Data
- Privacy
- Integrations
- Security
- Infrastructure
- Incidents
- Changes

The final result must be a functional, high-fidelity, enterprise-grade internal control system, not a decorative dashboard with a few charts and meaningless counters.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. CRITICAL REQUIREMENT: BUILD IT AS A SUBDOMAIN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Build the admin and command system as a separate application hosted on a dedicated subdomain.

Production domain:

https://command.hamrahe.com

Staging domain:

https://command-staging.hamrahe.com

Local development domain:

http://command.localhost

Do not use the following as the primary admin location:

/admin

Do not build the main admin application under:

hamrahe.com/admin

or:

app.hamrahe.com/admin

The command system must have:

- An independent application shell
- Independent routing
- Independent deployment capability
- An independent security boundary
- Separate internal authentication policies
- Shared platform APIs
- Shared domain entities
- Shared design language
- Shared event infrastructure
- Shared identity provider where appropriate

Recommended domain architecture:

app.hamrahe.com
Main product experience for users, organizations, startups, and professionals

command.hamrahe.com
Internal owner command and operations platform

api.hamrahe.com
Shared platform APIs

auth.hamrahe.com
Shared Identity Provider and authentication services

Inside the current Figma Make prototype, simulate host-based routing.

However, organize the code and application architecture so that command.hamrahe.com can later be deployed independently from app.hamrahe.com without major restructuring.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. FULL INTEGRATION WITH THE ENTIRE HAMRAHE PLATFORM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The command application must not create duplicate users, organizations, jobs, messages, assessments, payments, or cases.

All entities must come from shared Hamrahe domain services.

Every entity must be created once and consumed in multiple applications.

Shared entities include:

User Entity

Organization Entity

Job Entity

Application Entity

Candidate Entity

Resume Entity

Conversation Entity

Message Entity

Assessment Entity

Learning Entity

Skill Entity

Badge Entity

Payment Entity

Subscription Entity

Case Entity

Incident Entity

The command platform must integrate with all areas of the main Hamrahe application:

- Home
- Profile
- Network
- Jobs
- Applications
- Companies
- Startups
- Messages
- Notifications
- Learning
- Career Paths
- Assessments
- Assessment Center
- Certificates
- Projects
- Events
- Search
- Analytics
- Premium
- Settings
- Company Admin
- Startup Admin
- B2B Workspace
- Talent Pools
- Resume Bank
- Professional Growth
- Support
- Billing

Any action performed inside command.hamrahe.com must affect the relevant entity and experience inside app.hamrahe.com.

Examples:

If a job is restricted inside command.hamrahe.com, that job must immediately become restricted inside app.hamrahe.com.

If an organization is suspended, its public pages, company workspace, job posting access, advertising access, recruiter access, and relevant integrations must be restricted according to policy.

If a user is suspended, their active sessions must be revoked and their product access must stop.

If content is restored, its state must update inside the main feed.

If a Feature Flag changes, the change must affect the main platform.

If an assessment rule changes, affected assessment experiences must use the new approved version.

If a subscription is revoked, corresponding entitlements must update across the platform.

Every important change must:

- Produce a platform event
- Create an audit record
- Record the actor
- Record the reason
- Record the affected entity
- Record the previous state
- Record the new state
- Record the request and trace identifiers

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. SHARED AUTHENTICATION AND SSO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The command platform must use the shared Hamrahe Identity Provider, but internal admin identity must remain separate from normal users and organization administrators.

Do not combine these identity types:

Platform User
A normal Hamrahe user

Organization Admin
A user who manages one organization

Internal Admin
An internal Hamrahe operator

Service Account
A non-human system account

External Auditor
A restricted external reviewer

Do not use the existing public accountType field as the internal admin authorization model.

Create dedicated internal claims:

- isInternalAdmin
- internalRoles
- permissions
- team
- clearanceLevel
- allowedCountries
- allowedScopes
- sessionRisk
- mfaVerified
- deviceTrustLevel
- employmentStatus
- accessReviewStatus

The command.hamrahe.com login flow must include:

1. Internal Admin Login
2. MFA Verification
3. Device Trust Check
4. Session Risk Evaluation
5. Role and Permission Loading
6. Policy Acceptance Validation
7. Access Review Validation
8. Redirect to Command Center

Do not create public sign-up for internal administrators.

The internal admin login page must:

- Follow the current Hamrahe authentication visual language
- Use the Hamrahe logo
- Clearly display the environment
- Display “Internal Access Only”
- Include security and session policy messaging
- Not include public account creation
- Support MFA
- Support recovery through approved internal processes
- Show device and suspicious login alerts
- Be fully RTL and LTR compatible

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. GLOBAL OWNER COMMAND LAYER INSIDE THE MAIN PRODUCT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Although the primary command application is hosted on command.hamrahe.com, it must remain visually and operationally integrated with the main Hamrahe application.

Add an Owner Command Launcher to the existing main application Layout.

The launcher must:

- Only be visible to authorized Internal Admin users
- Never be visible to normal users
- Never be visible to Company Admin users
- Never be visible to Startup Admin users
- Only render after server-side permission validation
- Use a Command, Shield, or Control icon
- Match the existing navigation design
- Avoid interfering with the normal user experience
- Open command.hamrahe.com
- Transfer the current entity context

Examples:

Current public URL:

https://app.hamrahe.com/profile/user-123

Command destination:

https://command.hamrahe.com/entities/users/user-123

Current organization URL:

https://app.hamrahe.com/company/snapp

Command destination:

https://command.hamrahe.com/entities/organizations/snapp

Current job URL:

https://app.hamrahe.com/jobs/job-123

Command destination:

https://command.hamrahe.com/entities/jobs/job-123

Current event URL:

https://app.hamrahe.com/events/event-123

Command destination:

https://command.hamrahe.com/entities/events/event-123

Also create a Contextual Admin Drawer for major entities.

This drawer must only be available to authorized Internal Admin users.

Contextual actions may include:

- Open Entity 360
- View Trust and Risk
- View Active Cases
- Review Verification
- View Policy Restrictions
- View Audit History
- Create Case
- Open Support History
- Open in Command Center

The drawer must not display full sensitive information inside the public application.

It should only display a permission-safe summary and provide a secure link to the command subdomain.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. FOLLOW THE EXISTING HAMRAHE DESIGN SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Do not invent a new unrelated design system.

Reuse the current Hamrahe:

- Design language
- Component library
- Typography
- Colors
- Spacing
- Border radius
- Shadows
- Motion
- Iconography
- Layout conventions
- RTL behavior
- Responsive conventions

Inspect and reuse components and styles from:

src/app/components/ui
src/app/components/Layout.tsx
src/app/context/AppContext.tsx
src/app/routes.tsx
src/styles/theme.css
src/styles/fonts.css

Reuse the current shadcn-based component family where possible:

- Button
- Card
- Input
- Select
- Dialog
- Drawer
- Sheet
- Tabs
- Table
- Badge
- Alert
- Tooltip
- Command
- Dropdown
- Popover
- Skeleton
- Switch
- Checkbox
- Progress
- Pagination
- Sidebar
- Chart
- Calendar
- Breadcrumb
- Accordion
- Form
- Toast

Use Lucide Icons.

Use the current Motion system for subtle, short, functional animations.

Preserve the existing design tokens:

Font:
Vazirmatn

Background:
#f0f2f5

Foreground:
#1a1a2e

Card:
#ffffff

Primary:
#0066FF

Secondary:
#f0f4ff

Accent:
#7c3aed

Success:
#00C853

Warning:
#FF9800

Destructive:
#F44336

Muted Foreground:
#64748b

Border:
rgba(0, 0, 0, 0.06)

Main Radius:
16px

Logo Gradient:
#0066FF to #7c3aed

The admin platform may have a denser enterprise information layout, but it must still look like Hamrahe.

Do not make it look like:

- A cryptocurrency dashboard
- A banking application
- A cybersecurity command center from a movie
- A neon interface
- A completely black interface
- A glassmorphism experiment
- An unrelated enterprise SaaS template

Light Mode must be the default.

Dark Mode must be supported using existing theme tokens.

The default interface language must be Persian and RTL.

All interface text must pass through localization.

English and LTR must also be supported.

Use English names for:

- Components
- Routes
- Types
- Interfaces
- Variables
- Services
- Files
- API properties

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. ADMIN APPLICATION SHELL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Create an independent Admin App Shell.

The main experience must be Desktop-first.

Primary design width:

1440px

Supported desktop range:

1280px to 1920px

Main structure:

Collapsible Sidebar
Expanded width around 280px

Top Command Bar
Height around 64px

Main Content Area
Flexible full-width workspace

Optional Context Panel
Approximately 400px to 440px

Global Command Palette

Global Notification Center

Environment Badge

Internal Admin Identity

The sidebar must support:

- Collapse and expand
- Navigation grouping
- Menu search
- Open-item counters
- Pinned modules
- Recent pages
- Favorite views
- Permission-aware navigation
- Team-specific defaults
- Keyboard navigation
- Visible active route
- Saved workspace state

A user must not see a navigation module if they lack permission to access it.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
7. SIDEBAR INFORMATION ARCHITECTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Organize the sidebar into eight major groups.

01. Command

- Command Center
- Owner Snapshot
- My Work
- Critical Alerts
- Decision Center
- Platform Pulse
- Saved Views
- Custom Dashboards
- Executive Reports
- Global Command Search

02. Operations

- Unified Work Queues
- Case Management
- Support Operations
- Moderation Operations
- Verification Operations
- Legal Operations
- Privacy Requests
- Data Export Operations
- Approval Center
- Escalation Center
- SLA / OLA Center
- Runbooks & Playbooks
- Team Workspaces
- Knowledge Base

03. Platform Entities

- Users
- Organizations
- Organization Admins
- Recruiters
- Jobs
- Applications
- Candidates
- Resumes
- Talent Pools
- Conversations
- Messages
- Posts
- Comments
- Articles
- Newsletters
- Events
- Projects
- Products
- Services
- Learning Paths
- Learning Units
- Assessments
- Skills
- Badges
- Certificates
- Reports
- Tickets
- Cases

04. Trust, Safety & Compliance

- Trust Engine
- Risk Engine
- Abuse Graph
- Fraud Detection
- Scam Detection
- Spam Detection
- Content Compliance Center
- Communication Safety Center
- Job Safety
- Candidate Protection
- Organization Reputation
- Candidate Experience
- Policy Strikes
- Appeals
- Evidence Vault
- Legal Requests
- Iran Compliance
- Country Compliance

05. Intelligence & Growth

- Analytics Hub
- KPI Catalog
- Report Center
- Marketplace Health
- Marketplace Liquidity
- User Growth Analytics
- Organization Analytics
- Hiring Analytics
- Learning Analytics
- Assessment Analytics
- Professional Growth Control
- Skill Graph
- Badge Governance
- Search Analytics
- Ranking Control
- Matching Engine
- Recommendation Engine
- AI Governance
- AI Review Queue
- Experiments
- Forecasting

06. Revenue & Commercial

- Revenue Overview
- Products & Plans
- Pricing Versions
- Subscriptions
- Entitlements
- Orders
- Payments
- Invoices
- Refunds
- Discounts
- Gift Access
- Organization Contracts
- Seats & Quotas
- Receivables
- Reconciliation
- Revenue Recognition
- Ads
- Boosts
- Campaigns
- Sponsored Content
- Commercial Risk

07. Governance & Configuration

- Internal Admin Users
- Teams
- Roles
- Permissions
- Permission Matrix
- Access Requests
- Temporary Access
- Sensitive Access
- Access Reviews
- Maker-Checker
- Separation of Duties
- Break-glass Access
- Admin Impersonation
- Policy Engine
- Policy Versions
- Terms Management
- Consent Management
- Data Governance
- Data Retention
- DLP
- Feature Flags
- Workflow Automation
- Notification Rules
- Dashboard Builder
- Report Builder
- Localization
- System Settings

08. System & Reliability

- System Health
- Observability
- Service Map
- Infrastructure
- API Management
- Integration Center
- Webhook Management
- API Keys
- Rate Limits
- OAuth Providers
- Payment Gateways
- Email & SMS Providers
- AI Providers
- Centralized Logs
- Security Monitoring
- Capacity Planning
- Cost Monitoring
- Deployments
- Change Management
- Incident Center
- Postmortems
- Backup
- Disaster Recovery

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
8. COMMAND CENTER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The default page of command.hamrahe.com must be the Command Center.

The owner must understand the current platform condition in less than 30 seconds.

The page must answer:

- Is the platform healthy?
- What critical alerts are active?
- Which decisions are waiting?
- Which queues are overloaded?
- Which teams are breaching SLA?
- Which users or organizations are high-risk?
- What is the current marketplace condition?
- What is the revenue condition?
- What is the current AI cost and risk?
- What is the infrastructure condition?
- What changed recently?
- What requires immediate action?

Top Command Bar:

- Global Time Range
- Country or Region
- Environment
- Live Status
- Last Data Refresh
- Global Search
- Create
- Emergency
- Notification Center
- Admin Profile

KPI Strip:

- Platform Health
- Active Users
- Active Organizations
- Open Jobs
- Applications Today
- Marketplace Health
- Critical Cases
- Moderation Backlog
- Support Backlog
- Verification Backlog
- Revenue Today
- MRR
- AI Cost Today
- System Uptime

Main sections:

1. Today’s Priorities

Each priority must include:

- Title
- Domain
- Severity
- Why It Matters
- Owner
- Team
- Due Time
- Recommended Action
- Related Case
- Expected Impact
- Current Status

2. Critical Alerts

Categories:

- Security
- Trust & Safety
- Legal
- Privacy
- Revenue
- AI Risk
- Marketplace
- Infrastructure
- Support
- Verification

3. Decision Center

Examples:

- Organization suspension
- Extended chat access
- Pricing change
- High-value refund
- Legal request approval
- AI model release
- Ranking algorithm change
- Policy change
- Country launch
- Moderation appeal reversal

4. Platform Pulse

- User Growth
- Activation
- Retention
- Organization Growth
- Job Supply
- Talent Supply
- Application Conversion
- Learning Engagement
- Trust Trend
- Risk Trend
- Revenue Trend
- System Reliability

5. Queue Health

6. Marketplace Health

7. Trust & Safety Summary

8. Revenue Summary

9. AI Governance Summary

10. System Health Summary

Every card must support drill-down.

Each card must link to its relevant:

- Module
- Work Queue
- Case
- Incident
- KPI Detail
- Entity 360
- Report

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
9. GLOBAL COMMAND PALETTE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Create a professional global Command Palette.

Keyboard shortcuts:

Command + K

Control + K

Searchable entities:

- Users
- Organizations
- Jobs
- Candidates
- Conversations
- Cases
- Tickets
- Reports
- Incidents
- Policies
- Internal Admin Users
- API Keys
- Feature Flags
- KPIs
- Payments
- Subscriptions

Quick actions:

- Create Case
- Declare Incident
- Open Work Queue
- Review Verification
- Search Audit Log
- Open System Health
- Request Sensitive Access
- Open Decision Center
- Create Report
- Open User 360
- Open Organization 360

All results and actions must be filtered by current permissions.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
10. UNIFIED WORK QUEUES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Create a unified work queue system.

Queues:

- Verification Queue
- Organization Ownership Queue
- Job Review Queue
- Content Review Queue
- Comment Review Queue
- Chat Review Queue
- Report Queue
- Appeal Queue
- Support Queue
- Privacy Request Queue
- Data Export Queue
- AI Review Queue
- Refund Queue
- Access Request Queue
- Change Approval Queue
- Incident Queue
- Sponsored Approval Queue
- Legal Request Queue

Every work item must include:

- Item ID
- Queue Type
- Priority
- Severity
- Risk Score
- Status
- Owner
- Team
- SLA Due
- Age
- Related Entity
- Related Case
- Trigger
- Required Permission
- Recommended Action
- Required Evidence
- Escalation Path

Capabilities:

- Search
- Filtering
- Sorting
- Saved Views
- Manual Assignment
- Automatic Assignment
- Skill-based Assignment
- Language-based Assignment
- Country-based Assignment
- Capacity-based Distribution
- Bulk Actions
- Merge Duplicates
- Snooze
- Watch
- Follow
- Internal Notes
- Escalation
- Second Opinion
- Lock Item
- SLA Warning
- Response Templates
- Assignment History

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
11. CASE MANAGEMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Build Case Management as the core operational workspace for complex issues.

Case types:

- Identity Fraud
- Duplicate Account Abuse
- Organization Ownership Dispute
- Fake Organization
- Fake Job
- Recruitment Scam
- Harassment
- Threat
- Data Leak
- Resume Misuse
- Assessment Misuse
- Content Violation
- Account Takeover
- Payment Dispute
- AI Harm
- Admin Misconduct
- Legal Request
- Coordinated Abuse
- Security Incident
- Privacy Complaint

Case 360 tabs:

- Overview
- Timeline
- Entities
- Evidence
- Tasks
- Decisions
- Communications
- Approvals
- Access Log
- Appeals
- Related Cases
- Resolution

Case header:

- Case Number
- Type
- Severity
- Risk Score
- Status
- Confidentiality
- Owner
- Team
- Jurisdiction
- SLA
- Created Date
- Last Updated

State Machine:

- New
- Triage
- Assigned
- In Review
- Waiting for Evidence
- Waiting for External Response
- Escalated
- Decision Pending
- Action Taken
- Appealed
- Resolved
- Archived

Do not allow a case to be closed without:

- Resolution code
- Resolution summary
- Responsible reviewer
- Decision timestamp
- Required evidence
- Required approvals

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
12. EVIDENCE VAULT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Create an Evidence Vault.

Evidence types:

- Content Snapshot
- Reported Message
- File
- Image
- Identity Document
- User Report
- Transaction
- Technical Log
- AI Output
- Before and After State
- Legal Document
- Verification Evidence
- System Event

Evidence properties:

- Evidence ID
- Case ID
- Type
- Source
- Hash
- Timestamp
- Submitted By
- Collected By
- Chain of Custody
- Retention Policy
- Legal Hold
- Access Level
- Export Restrictions
- Audit History

Evidence must become immutable after case closure.

All evidence access must be audited.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
13. ENTITY 360 TEMPLATES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Create a shared Entity 360 design pattern.

Common structure:

- Entity Header
- Status
- Trust Score
- Risk Score
- Primary Actions
- Tabs
- Related Cases
- Timeline
- Internal Notes
- Audit Log

User 360:

- Overview
- Profile
- Identity & Verification
- Account Security
- Professional Data
- Professional Growth
- Skills & Badges
- Learning
- Assessments
- Jobs & Applications
- Content
- Communication Risk
- Reports & Strikes
- Cases
- Subscription & Payments
- Privacy & Consent
- Sessions
- Activity Timeline
- Audit Log

Organization 360:

- Overview
- Identity & Verification
- Ownership & Representation
- Admins
- Members
- Public Profile
- Jobs
- Applications
- Recruiters
- Candidate Experience
- Resume Access
- Talent Pools
- Learning & Assessments
- Content
- Events
- Products & Services
- B2B Activity
- Messages & Reports
- Trust & Risk
- Policy Strikes
- Revenue & Billing
- Ads & Boosts
- Legal & Compliance
- Cases
- Audit Log

Job 360:

- Overview
- Organization
- Job Quality
- Skills
- Assessments
- Learning Recommendations
- Applications
- Candidate Funnel
- Hiring Team
- Response Behavior
- Reports
- Moderation
- Boost
- Analytics
- Cases
- Audit Log

Candidate 360:

- Identity
- Credibility
- Profile
- Resume
- Skills
- Experience
- Learning
- Assessments
- Certificates
- Applications
- Job Match
- Readiness
- Consent
- Shared Data
- Recruiter Access
- Reports
- Cases

Conversation 360:

- Metadata
- Participants
- Conversation Type
- Message Count
- Last Activity
- Risk Score
- Report Status
- Restrictions
- Limited Context
- Related Cases
- Access Log

Conversation 360 must not display the full conversation by default.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
14. VERIFICATION OPERATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Build a dedicated Verification Operations module.

Verification domains:

- Individual Identity Verification
- Organization Verification
- Page Ownership Verification
- Organization Representation
- Employment Relationship Verification
- Sensitive Role Verification

State Machine:

- Not Started
- In Progress
- Submitted
- Automated Review
- Manual Review
- Additional Evidence Required
- Approved
- Rejected
- Expired
- Suspended
- Appealed
- Restored

Verification Detail must include:

- Applicant
- Verification Type
- Submitted Data
- Evidence
- Automated Signals
- Fraud Risk
- Reviewer
- Decision History
- Appeal
- Audit Log

Rules:

- Sensitive verification decisions require human review
- Appeals must not be reviewed by the original reviewer
- Identity documents must be encrypted
- Every document view must be audited
- Paid plans must not affect verification results
- Verification must have an expiration and review policy
- Verification and Trust must remain separate concepts

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
15. TRUST, RISK, AND ABUSE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Design Trust and Risk as separate systems.

Trust Score:
Proven reliability and credibility

Risk Score:
Current probability or severity of harm

Trust Engine dashboard:

- Trust Distribution
- Trust Trend
- Verified Evidence
- Trust Factors
- Score Version
- Appeals
- Manual Adjustments with Audit

Risk Engine dashboard:

- High-Risk Entities
- Risk Trend
- Active Signals
- Fraud Signals
- Scam Signals
- Suspicious Sessions
- Resume Export Risk
- Messaging Risk
- Payment Risk
- AI Risk

Abuse Graph nodes:

- User
- Organization
- Recruiter
- Job
- Conversation
- Message
- Device
- IP
- Domain
- Payment Account
- Resume Export
- Report
- Case

Relations:

- OWNS
- MANAGES
- LOGGED_IN_FROM
- MESSAGED
- POSTED
- REPORTED
- EXPORTED
- PAID_WITH
- SHARED_DEVICE
- SHARED_DOMAIN
- RELATED_CASE

The graph must support:

- Zoom
- Expand
- Filter
- Time Range
- Relationship Type
- Risk Highlighting
- Case Creation
- Entity Opening
- Export Restrictions

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
16. CONTENT COMPLIANCE CENTER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Supported content types:

- Posts
- Comments
- Articles
- Newsletters
- Profile Content
- Organization Content
- Jobs
- Events
- Products
- Services
- Images
- Videos
- Files
- Links
- Public AI Outputs

Moderation pipeline:

Content Created
→ File Scan
→ Malware Scan
→ Language Detection
→ Rule-based Scan
→ AI Classification
→ Risk Score

Safe → Publish

Low Risk → Publish and Monitor

Medium Risk → Hold or Limit

High Risk → Human Review

Critical → Block and Create Case

Actions:

- Keep
- Warn
- Limit Distribution
- Hide
- Remove
- Strike
- Restrict Account
- Escalate to Legal

Pages:

- Content Compliance Dashboard
- Post Review Queue
- Comment Review Queue
- Job Review Queue
- Content Review Detail
- Policy Rule Builder
- Moderator Quality Dashboard
- Appeals Center

Every decision must include:

- Reason
- Policy Rule
- Reviewer
- Evidence
- Timestamp
- Appeal Eligibility
- Notification Status

Permanent removal or other high-impact actions must require Maker-Checker approval.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
17. COMMUNICATION SAFETY CENTER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Core principle:

Private Chat is Private by Default.

Review triggers:

- User Report
- Recruitment Scam
- Harassment
- Threat
- Suspicious Payment Request
- Malicious Link
- Spam
- Account Takeover
- Legal Request
- Dangerous Attachment
- Mass Messaging

Access levels:

Level 0:
No Content Access

Level 1:
Metadata Only

Level 2:
Reported Message and Limited Context

Level 3:
Extended Safety Context

Level 4:
Legal Scoped Access

Level 5:
Break-glass Emergency Access

Pages:

- Communication Safety Dashboard
- Chat Review Queue
- Reported Message Detail
- Conversation 360
- Chat Access Request
- Messaging Restriction Detail

Review Card fields:

- Conversation ID
- Participants
- Reporter
- Reported User
- Reported Message
- Limited Context
- Risk Category
- Risk Score
- Attachments
- Related Case
- Reviewer
- SLA

Extended access requires:

- Active Case ID
- Reason
- Approval
- Expiry
- Full Audit

AI must never grant extended chat access.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
18. SUPPORT OPERATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Pages:

- Support Operations Dashboard
- Ticket Queue
- Support Ticket 360
- Agent Workspace
- Support Quality
- Knowledge Base
- Agent Scorecard
- SLA / OLA Center

Ticket categories:

- Login & Security
- Profile
- Verification
- Organization
- Job
- Application
- Messages
- Payment
- Subscription
- Learning
- Assessment
- Badge
- Privacy
- Report
- Technical Issue
- Product Feedback

Support Agents must only see assigned or permitted tickets.

Support must not see:

- Full Private Chat
- Raw Assessment Results
- Full Identity Documents
- Full Legal Cases
- Sensitive Payment Data
- Sensitive Data Exports

Ticket 360 tabs:

- Overview
- Conversation
- Requester
- Related Entities
- Account Status
- Verification Summary
- Payment Summary
- Technical Context
- Internal Notes
- Escalations
- Temporary Access
- Timeline
- Resolution
- Audit Log

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
19. JOBS, APPLICATIONS, RESUME BANK, AND TALENT POOLS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Create:

- Jobs List
- Job 360
- Job Review
- Job Safety
- Job Quality Dashboard
- Application Pipeline
- Hiring Funnel
- Candidate Experience Dashboard
- Resume Bank Control
- Talent Pool Dashboard

Job Quality Score inputs:

- Clear title
- Clear responsibilities
- Required skills
- Seniority
- Employment type
- Location
- Work model
- Salary transparency where required
- Hiring steps
- Assessment clarity
- Expected response time
- No discrimination
- No payment request
- Organization credibility
- Recruiter credibility

Application states:

- Submitted
- Viewed
- Screening
- Assessment
- Interview
- Shortlisted
- Offer
- Hired
- Rejected
- Withdrawn
- Talent Pool

Resume Bank controls:

- Organization Access
- Recruiter Access
- Field Visibility
- View Quota
- Download Quota
- Export Permission
- User Consent
- Watermark
- Expiring Link
- Audit Log
- Suspicious Activity

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
20. PROFESSIONAL GROWTH, LEARNING, AND ASSESSMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Professional Growth Control must remain separate from user-facing Analytics.

Administrative control modules:

- Professional Power Engine
- Growth Engine
- Goal Models
- Competency Models
- Gap Analysis
- Mission Engine
- Badge Rules
- Skill Evidence
- Readiness Models
- Algorithm Versions
- Fraud Detection

Rules:

- Missions must not create points by themselves
- Badges must not be purchasable
- Badges must not increase the same metric that created them
- Goals must not alter the base Professional Power score
- Individual and Organization models must remain separate
- Every algorithm change must be versioned
- Every algorithm release must support rollback

Learning Operations:

- Career Paths
- Learning Units
- AI-native Skills
- Practice Scenarios
- Roleplays
- Work Simulations
- Projects
- Rubrics
- Certificates
- Versioning
- Learning Quality

Assessment Operations:

- Assessment Library
- Assessment Type
- Questions
- Rubrics
- Scoring
- Privacy Level
- Company Access
- Re-assessment
- Appeal
- Fraud Detection
- Human Review

Sensitive psychological or personality results must not be shown without separate permission and consent.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
21. AI GOVERNANCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Pages:

- AI Governance Dashboard
- AI Use Case Registry
- Model Registry
- Prompt Registry
- AI Decision Log
- AI Review Queue
- AI Cost Dashboard
- Bias Monitoring
- Hallucination Monitoring

AI Use Case fields:

- Use Case ID
- Name
- Business Owner
- Technical Owner
- Purpose
- Input Data
- Sensitive Data
- Model
- Prompt Version
- Risk Level
- Human Review Rule
- Consumers
- Retention
- Cost Center
- Status

Model Registry fields:

- Provider
- Model
- Version
- Region
- Data Policy
- Approved Uses
- Cost
- Latency
- Known Limitations
- Rollback Version
- Status

AI must not:

- Make final hiring decisions
- Automatically reject candidates
- Grant chat access
- Finalize sensitive verification
- Reject sensitive appeals
- Export sensitive data
- Close legal cases
- Permanently suspend users without human approval

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
22. REVENUE AND COMMERCIAL CONTROL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Pages:

- Revenue Dashboard
- Products & Plans
- Pricing Versions
- Subscriptions
- Entitlements
- Orders
- Payments
- Invoices
- Refund Queue
- Discounts
- Gift Access
- Organization Contracts
- Seats & Quotas
- Receivables
- Reconciliation
- Revenue Recognition
- Ads Dashboard
- Campaign Detail
- Sponsored Approval
- Commercial Risk

Metrics:

- MRR
- ARR
- New MRR
- Expansion MRR
- Contraction MRR
- Churned MRR
- ARPU
- ARPA
- LTV
- CAC
- Payback
- Gross Margin
- Trial Conversion
- Renewal Rate
- Refund Rate
- Payment Failure Rate
- Revenue by Product
- Revenue by Country
- Revenue by Segment

Rules:

- Active prices must not be edited directly
- Create a new Price Version
- Large refunds require Maker-Checker
- High-risk organizations cannot use Boost
- Sponsored Content must be clearly labeled
- Payment must not create Trust or Verification
- Hamrahe must not create a cash wallet or escrow system

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
23. DATA GOVERNANCE, CONSENT, AND DLP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Pages:

- Data Governance Center
- Data Registry
- Data Classification
- Consent Center
- Privacy Requests
- Data Export Queue
- Retention Policies
- Legal Hold
- DLP Dashboard
- Sensitive Access Log

Data classification:

- Public
- Internal
- Confidential
- Sensitive
- Highly Sensitive
- Legal Evidence

Every data type must define:

- Owner
- Steward
- Source
- Purpose
- Sensitivity
- Retention
- Storage Region
- Permissions
- Consent
- Export Rules
- Deletion Rules
- Legal Hold Rules

DLP controls:

- Field Masking
- Copy Restriction
- Watermark
- Download Restriction
- Bulk Export Limit
- Anomaly Detection
- Temporary Links
- Encryption
- Export Revocation
- Full Audit

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
24. IDENTITY AND ACCESS GOVERNANCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Pages:

- Internal Admin Users
- Teams
- Roles
- Permission Matrix
- Custom Role Builder
- Access Requests
- Temporary Access
- Sensitive Access
- Access Reviews
- Maker-Checker Queue
- Separation of Duties
- Break-glass Access
- Admin Impersonation
- Sensitive Access Log

Authorization model:

- RBAC
- ABAC
- Purpose-based Access
- Risk-based Access
- Field-level Permission
- JIT Access

Permission code format:

resource.action.scope.sensitivity

Examples:

user.view.basic.standard

user.view.identity.sensitive

conversation.view.reported_message.sensitive

data.export.resume.restricted

organization.suspend.global.critical

Sensitive actions requiring Maker-Checker:

- Permanent Suspension
- Organization Suspension
- Full Chat Access
- Sensitive Export
- Permission Change
- Policy Change
- Pricing Change
- Large Refund
- Permanent Content Removal
- Break-glass Access
- High-risk AI Release
- Legal Case Closure

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
25. AUDIT SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Sensitive audit logging must never be disabled.

Mandatory events:

- Admin Login
- Failed Login
- Role Change
- Permission Change
- Sensitive Data View
- Identity Document View
- Reported Message View
- Extended Chat Access
- Data Export
- Resume Download
- Content Removal
- User Suspension
- Organization Suspension
- Policy Change
- Price Change
- Refund
- Impersonation
- Break-glass
- AI Model Change
- Prompt Change
- Case Closure
- Evidence Change
- API Key Creation

Audit properties:

- Event ID
- Actor
- Role
- Team
- Session
- Device
- IP
- Resource
- Action
- Permission
- Purpose
- Case
- Reason
- Before
- After
- Risk
- Time
- Request ID
- Trace ID

Requirements:

- Append-only
- Tamper-evident
- Searchable
- Trace-linked
- Retention-aware
- SIEM-ready

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
26. ANALYTICS, KPI, AND DASHBOARD BUILDER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Data architecture:

Platform Events
→ Event Stream Processor
→ Validation
→ Deduplication
→ Enrichment
→ Privacy Filtering
→ Aggregation Layer
→ KPI Calculator
→ Dashboards
→ Reports
→ Alerts
→ APIs
→ Controlled Exports

KPI Catalog fields:

- KPI ID
- Name
- Business Definition
- Technical Formula
- Owner
- Source Events
- Dimensions
- Filters
- Freshness
- Calculation Window
- Target
- Warning Threshold
- Critical Threshold
- Data Quality Rule
- Privacy Level
- Drill-down Destination
- Recommended Action
- Version

Default dashboards:

- Owner Command Dashboard
- User & Growth Dashboard
- Marketplace & Hiring Dashboard
- Trust, Content & Communication Dashboard
- Support Operations Dashboard
- Revenue & Commercial Dashboard
- AI Governance Dashboard
- System Health Dashboard

Dashboard Builder features:

- Drag & Drop
- Widget Library
- Cross-module Widgets
- Role Defaults
- Real-time Data
- Global Filters
- Time Comparison
- Team Sharing
- Scheduled Delivery
- PDF Export
- CSV Export
- XLSX Export

Creating a dashboard must not create new data permissions.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
27. CONFIGURATION AND AUTOMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Feature Flags:

- Country
- Language
- Segment
- Plan
- Percentage Rollout
- Test Users
- Start and End Date
- Dependency
- Kill Switch
- Rollback
- Audit

Workflow Builder:

- Trigger
- Condition
- Action
- Approval
- Delay
- Escalation
- Failure Handling

Sensitive actions must not run fully automatically without an approval policy.

Notification Rule Builder:

- Threshold
- Severity
- Channel
- Recipients
- Quiet Hours
- On-call
- Escalation
- Deduplication
- Correlation
- Acknowledgement

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
28. API, INTEGRATIONS, AND WEBHOOKS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Pages:

- API Registry
- API Detail
- API Key Management
- Webhook Management
- Integration Center
- Integration Health
- OAuth Providers
- Payment Gateways
- Email Providers
- SMS Providers
- AI Providers

API Key properties:

- Scope
- Environment
- Expiry
- Rotation
- IP Restriction
- Last Used
- Revocation
- Audit

Raw secrets must only be shown once.

Integrations:

- Google OAuth
- Email
- SMS
- Payment
- AI Providers
- ATS
- HRMS
- CRM
- Calendar
- SSO
- SCIM
- SIEM
- Object Storage
- Verification Providers

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
29. SYSTEM HEALTH, INCIDENTS, AND CHANGE MANAGEMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

System Health:

- CPU
- Memory
- Disk
- Network
- Database
- Cache
- Queue
- Search
- API Latency
- Error Rate
- Email Delivery
- SMS Delivery
- Payment Gateway
- AI Provider
- Infrastructure Cost

Service Map:

- Service
- Dependency
- Status
- Version
- Owner
- Incident
- Deployment
- SLA
- Impact Radius

Incident severity:

- SEV-1 Critical
- SEV-2 High
- SEV-3 Medium
- SEV-4 Low

Incident states:

- Detected
- Declared
- Investigating
- Mitigating
- Monitoring
- Resolved
- Postmortem Pending
- Closed

Change Management domains:

- Permission
- Policy
- Pricing
- Ranking
- Matching
- AI Model
- Prompt
- Retention
- Data Residency
- Verification Rule
- Moderation Threshold
- Payment
- Feature Flag
- Integration

Every Change must include:

- Owner
- Reason
- Affected Systems
- Risk
- Security Review
- Privacy Review
- Legal Review
- Tests
- Rollout Plan
- Rollback Plan
- Approval
- Schedule
- Status

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
30. SHARED UX COMPONENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Create reusable components:

- Command Sidebar
- Top Command Bar
- Global Filter
- Command Palette
- KPI Card
- Trend Card
- Risk Badge
- Trust Badge
- Severity Badge
- SLA Badge
- Queue Item
- Case Card
- Case Timeline
- Entity Header
- Entity Relationship Panel
- Evidence Card
- Audit Log Row
- Permission Cell
- Access Scope Chip
- Sensitive Field Mask
- Temporary Access Timer
- Approval Card
- Break-glass Warning
- Limited Context Viewer
- Reported Message Card
- Moderation Action Panel
- Policy Rule Match
- Appeal Decision Panel
- Agent Workload Card
- Service Health Card
- Feature Flag Rollout
- Workflow Node
- Data Export Warning
- AI Model Card
- AI Review Card
- Revenue Metric Card
- Integration Health Card
- Empty State
- Permission Denied State
- Stale Data Warning
- Environment Badge

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
31. TABLE AND LIST PATTERN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Every list page must include:

- Search
- Advanced Filters
- Saved Views
- Custom Columns
- Server-side Sorting
- Server-side Pagination
- Bulk Actions
- Controlled Export
- Owner
- Status
- Risk
- SLA
- Last Updated

Use Cursor Pagination for large datasets.

All sensitive bulk actions require confirmation.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
32. SENSITIVE ACTION FLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Use a multi-step modal or drawer for sensitive actions.

Example: Suspend Organization

Step 1:
Summary

Step 2:
Reason and Policy

Step 3:
Impact Preview

Step 4:
Case ID

Step 5:
Approval Requirement

Step 6:
Final Confirmation

Step 7:
Audit Receipt

Shared sensitive-action fields:

- Reason
- Purpose
- Case ID
- Evidence
- Duration
- Impact
- User Notification
- Approval
- Rollback Possibility

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
33. UI STATES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Design all of these states:

- Loading
- Skeleton
- Empty
- Error
- No Permission
- Partial Permission
- Sensitive Access Required
- Approval Required
- Stale Data
- Offline
- SLA Breached
- Restricted
- Archived
- Expired Access
- Processing
- Success
- Rollback Available

Do not communicate status using color alone.

Use:

- Icons
- Labels
- Text
- Badges
- Tooltips

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
34. RESPONSIVE DESIGN AND ACCESSIBILITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The command platform is Desktop-first.

Primary support:

1280px to 1920px

Tablet behavior:

- Collapse sidebar
- Allow horizontal table scrolling
- Restrict sensitive actions where needed
- Preserve alert and approval access

Mobile behavior:

Do not attempt to reproduce the complete desktop control plane.

Provide a limited mobile experience for:

- Alerts
- Approvals
- My Work
- Incident Summary
- Emergency Status

Accessibility requirements:

- Keyboard Navigation
- Visible Focus States
- Screen Reader Labels
- Accessible Tables
- Sufficient Contrast
- No color-only communication
- Full RTL Support
- Full LTR Support

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
35. SUBDOMAIN ROUTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Primary domain:

command.hamrahe.com

Routes:

/auth
/mfa
/
/my-work
/alerts
/decisions
/work
/cases
/cases/:caseId

/entities/users
/entities/users/:userId

/entities/organizations
/entities/organizations/:organizationId

/entities/jobs
/entities/jobs/:jobId

/entities/candidates/:candidateId

/entities/conversations/:conversationId

/verification
/verification/:verificationId

/trust
/risk
/abuse-graph

/moderation/content
/moderation/content/:reviewId

/moderation/chat
/moderation/chat/:reviewId

/appeals

/support
/support/tickets/:ticketId

/growth
/learning
/assessments
/skills
/badges

/ai
/ai/use-cases
/ai/models
/ai/prompts
/ai/reviews

/revenue
/revenue/plans
/revenue/subscriptions
/revenue/orders
/revenue/payments
/revenue/refunds
/revenue/contracts

/governance/admin-users
/governance/roles
/governance/permissions
/governance/access
/governance/policies
/governance/data
/governance/consent
/governance/dlp

/configuration/feature-flags
/configuration/workflows
/configuration/notifications
/configuration/dashboards

/system/health
/system/services
/system/logs
/system/integrations
/system/api
/system/incidents
/system/changes
/system/backups

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
36. RECOMMENDED CODE STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Organize the code modularly.

Recommended structure:

src/
  app/
    ...

  admin/
    AdminApp.tsx
    AdminRoot.tsx
    AdminLayout.tsx
    adminRoutes.tsx

    components/
      CommandSidebar.tsx
      TopCommandBar.tsx
      GlobalCommandPalette.tsx
      ContextualAdminDrawer.tsx
      SensitiveActionDialog.tsx
      PermissionGate.tsx
      DataMask.tsx

    modules/
      command/
      work/
      cases/
      entities/
      verification/
      trust/
      moderation/
      support/
      growth/
      learning/
      assessments/
      ai/
      revenue/
      governance/
      configuration/
      system/

    context/
      AdminAuthContext.tsx
      PermissionContext.tsx
      CommandContext.tsx

    data/
      adminMockData.ts

    types/
      admin.ts
      permissions.ts
      entities.ts

    services/
      adminApi.ts
      auditService.ts
      permissionService.ts

  shared/
    design-system/
    auth/
    api/
    events/
    types/

Reuse current components.

Do not duplicate existing components without a valid reason.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
37. PROTOTYPE DATA AND INTERACTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Use realistic Persian mock data.

Include:

- Iranian and international users
- Startups
- Large organizations
- Jobs
- Candidates
- Cases
- Tickets
- Reports
- Incidents
- Payments
- AI models
- Verification requests
- Content reviews
- Support requests

All pages must be navigable.

Required interactions:

- Open Entity 360
- Filter Tables
- Save View
- Open Case
- Assign Queue Item
- Request Access
- Approve or Reject
- Execute Sensitive Action
- Open Context Drawer
- Use Command Palette
- Roll Out Feature Flag
- View Incident Timeline
- Display Audit Receipt
- Show Success and Error Toasts

Do not create only static screenshots or wireframes.

Create a high-fidelity functional prototype.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
38. FINAL SECURITY RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

These rules are non-negotiable:

1. No team receives full access by default.
2. The Admin App must be hosted on a secure subdomain.
3. Normal users must not receive the Admin application bundle.
4. Company Admin and Internal Admin are separate identity types.
5. Full private chat is not shown by default.
6. Sensitive data views are audited.
7. Extended access is time-limited.
8. Break-glass access requires re-authentication and MFA.
9. Super Admin must not have permanent raw database access.
10. Sensitive exports require approval.
11. Permanent actions require Maker-Checker.
12. AI must not make final sensitive decisions.
13. Sensitive audit logging cannot be disabled.
14. Impersonation is read-only by default.
15. Sensitive actions require Case ID and Reason.
16. Permissions must be enforced by the backend.
17. Hiding UI does not replace authorization.
18. Public App and Command App must not create duplicate entities.
19. Every admin change must create an event and audit record.
20. Revenue must not bypass Trust and Safety.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
39. DO NOT DO THESE THINGS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Do not build the platform admin inside Company Admin.
- Do not place the primary application under /admin.
- Do not deliver a simple dashboard with a few KPIs.
- Do not create an unrelated visual design.
- Do not invent new colors or fonts.
- Do not delete existing Hamrahe pages.
- Do not simplify existing features.
- Do not create duplicate entities.
- Do not create an unlimited Super Admin.
- Do not display private chat directly.
- Do not allow sensitive audit logs to be disabled.
- Do not execute sensitive actions without confirmation.
- Do not create a static dashboard with no navigation.
- Do not place every module on one crowded page.
- Do not create an ungrouped sidebar with hundreds of items.
- Do not render the Admin UI for normal users.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
40. IMPLEMENTATION ORDER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Implement the system in six waves, but define the complete architecture and routes from the beginning.

Wave 1:
Control Foundation

- Admin Auth
- MFA
- Admin Layout
- Sidebar
- Command Center
- Roles
- Permissions
- Audit
- Global Launcher
- Command Palette
- Work Queues
- Cases

Wave 2:
Trust, Safety & Support

- User 360
- Organization 360
- Verification
- Content Moderation
- Chat Review
- Evidence
- Appeals
- Support
- Sensitive Access

Wave 3:
Marketplace & Organization Operations

- Jobs
- Applications
- Candidates
- Resume Bank
- Talent Pool
- Candidate Experience
- Organization Operations
- B2B

Wave 4:
Growth, Learning & AI

- Professional Growth
- Skills
- Badges
- Learning
- Assessments
- AI Governance
- Matching
- Ranking

Wave 5:
Revenue, Data & Automation

- Revenue
- Payments
- Subscriptions
- Contracts
- Data Governance
- Consent
- DLP
- Feature Flags
- Workflow Builder
- Dashboard Builder

Wave 6:
Reliability & Global Scale

- Observability
- Incident Management
- Change Management
- Integrations
- API Management
- Country Compliance
- Backup
- Disaster Recovery
- Capacity Planning

After each wave, preserve all previous pages and code.

Continue building on the same architecture.

Do not ask for permission before moving to the next wave.

Do not stop until all major navigation, routes, core pages, shared components, and integration hooks are created.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
41. EXPECTED FINAL OUTPUT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The final project must include:

1. A complete independent Admin App for command.hamrahe.com
2. Shared SSO with the main product
3. Owner Command Launcher inside the main application
4. Contextual Admin Drawer for major entities
5. Complete admin navigation
6. Interactive Command Center
7. Unified Work Queues
8. Case Management
9. Entity 360 views
10. Verification Operations
11. Trust, Risk, and Abuse systems
12. Content and Communication Safety
13. Support Operations
14. Marketplace Operations
15. Growth, Learning, and Assessment control
16. AI Governance
17. Revenue and Billing control
18. Data Governance and DLP
19. Roles, Permissions, and Access Governance
20. Audit System
21. Dashboard Builder
22. Feature Flags and Workflow Automation
23. API and Integration Management
24. System Health
25. Incident and Change Management
26. Responsive states
27. Error, empty, permission, and sensitive-access states
28. Realistic mock data
29. Complete clickable routing
30. Full visual consistency with the Hamrahe website

The result must not be merely an Admin Dashboard.

The result must be a Global Owner Command & Operations Control Plane hosted on an independent secure subdomain while remaining fully integrated with the entire Hamrahe platform through shared identity, data, APIs, events, components, and operations.