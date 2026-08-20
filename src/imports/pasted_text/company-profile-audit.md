You are a world-class product architect, enterprise UX strategist, design-system expert, and senior product designer responsible for extending the existing Hamrahe Company Profile inside the current Figma file.

Your task is NOT to redesign the Company Profile from scratch.

A large and important part of the Company Profile has already been designed and implemented in this Figma file. You must first inspect the existing design, understand what already exists, identify gaps, and then add or extend only the missing parts.

This is a continuation and expansion project, not a replacement project.

====================================================================
CRITICAL RULE: DO NOT DUPLICATE EXISTING DESIGN
====================================================================

Before creating any new frame, page, component, flow, card, navigation item, modal, table, dashboard, or screen:

1. Inspect the entire existing Figma file.
2. Identify every existing Company Profile screen.
3. Identify existing public profile tabs.
4. Identify existing company admin screens.
5. Identify existing components and variants.
6. Identify existing design tokens, typography, color styles, spacing, grids, icons, cards, buttons, tables, charts, forms, tabs, sidebars, dialogs, drawers, tooltips, empty states, loading states, error states, and responsive patterns.
7. Identify existing interaction and prototype patterns.
8. Identify what is already complete, what is partially complete, and what is missing.
9. Reuse existing components and patterns wherever possible.
10. Extend existing screens in place when a feature already partially exists.
11. Do not create a second version of any screen or system that already exists.
12. Do not create parallel navigation, parallel messaging, parallel analytics, parallel AI, parallel trust, parallel search, parallel event, parallel jobs, or parallel member systems.
13. Do not delete, replace, rename, or radically redesign existing Company Profile sections unless required to integrate missing capabilities.
14. Preserve the existing visual identity and overall UX language.
15. Never hide or remove previously designed capabilities merely to simplify the new design.
16. If a feature already exists, improve and connect it instead of rebuilding it.
17. If a component exists but lacks a state or variant, add the required variant to the same component.
18. If an existing screen covers at least part of a new requirement, extend that screen rather than creating another one.
19. Do not change unrelated personal-profile, feed, job, event, learning, messaging, or platform screens.
20. Prevent duplication at both the UI level and product-architecture level.

Create a private design-audit page named:

00 — Company Profile Gap Audit

This audit page must categorize every major requirement as:

- Existing and reusable
- Existing but needs extension
- Missing and must be designed
- Shared platform component
- Integration dependency
- Future phase

This audit page is for the design team only and is not part of the user-facing product.

Do not stop after creating the audit. Continue and design all missing and incomplete areas.

====================================================================
PROJECT DEFINITION
====================================================================

Hamrahe Company Profile is not a static company page.

It is a Smart Organization Hub and a complete organization operating environment.

The final product must combine:

Public Company Identity
Employer Brand
Jobs and Hiring
Learning and Assessments
Events
People
Posts
Newsletter
Products
Services
B2B Business Network
Project Market
Workforce Intelligence
Trust and Reviews
Relationship Intelligence
Supplier Network
Company Intelligence
Analytics
Unified Operations
Central AI Intelligence

The strategic product definition is:

Hamrahe Company Profile
=
Public Identity
+
Employer Platform
+
Hiring Intelligence
+
Learning and Assessments
+
Business Network
+
Project Market
+
Workforce Intelligence
+
Products and Services
+
Content and Events
+
Trust and Reviews
+
Unified Operations
+
Verified Outcomes
+
Central Intelligence

The company must not merely be visible.

It must be able to:

- Build a verified professional identity
- Establish reputation and trust
- Manage its relationship with members
- Display and prove organizational capabilities
- Publish products and services
- Publish business needs and opportunities
- Discover customers, partners, suppliers, investors, and talent
- Recruit and manage candidates
- Develop current employees
- Run events and learning programs
- Publish content and newsletters
- Receive and route messages
- Track business and hiring outcomes
- Integrate with external enterprise systems
- Use Hamrahe’s central intelligent engine across all workflows

====================================================================
GLOBAL PRODUCT PRINCIPLES
====================================================================

1. One Organization, One Entity, One Profile

All organization types must use the same Organization entity:

- Company
- Startup
- Early-stage team
- Holding company
- Subsidiary
- Brand
- Branch
- Department
- Product unit
- University
- Research center
- Investment firm
- Accelerator
- Association
- Government institution
- Supplier
- Service provider
- Educational institution
- Ecosystem organization

Differences must be controlled through:

- Organization type
- Legal status
- Verification level
- Trust level
- Activated modules
- Plan entitlement
- Role permissions
- Visibility
- Policy status
- Moderation status
- Country and regional configuration

Do not create separate products or entirely separate profile systems for different organization types.

Use configurable organization templates instead.

2. Create Once, Manage Once, Display Everywhere

Every data entity must be created and managed in one source location and reused across the platform.

Examples:

A Product is managed in Products and may appear in:

- Overview
- Business
- Search
- Feed
- Ads
- Company comparison
- Lead generation
- Analytics
- Related jobs
- Related events
- Related experts

An Event is managed in Events and may appear in:

- Events tab
- Overview
- Feed
- Search
- Hiring
- Learning
- B2B networking
- Notifications
- Saved items
- Analytics

A Job is managed in Hiring and may appear in:

- Company Jobs tab
- Main Jobs product
- Search
- Feed
- Notifications
- Learning
- Talent pool
- Events
- Personal recommendations

A person has one Personal Profile.

The company relationship is represented by Organization Membership.

Do not create separate public employee records, workforce employee records, business-contact records, and hiring-team records for the same person.

3. Shared Engines Must Remain Shared

Hamrahe has only one of each:

- Organization Graph
- Professional Graph
- Skill Graph
- Trust Engine
- Opportunity Graph
- Search Engine
- Feed Engine
- Messaging Engine
- Notification Engine
- Analytics Engine
- Ads Engine
- Billing Engine
- Permission Engine
- Learning Engine
- Assessment Engine
- Saved Items Engine
- Audit Engine
- Integration Layer
- Hamrahe Intelligent Engine

Every workspace must use these shared services.

Do not create isolated engines inside individual modules.

4. Public Profile and Admin Console Are Different

Public Company Profile is for discovery, trust, decision-making, and external interaction.

Company Admin Console is for private management, operations, permissions, data, workflows, analytics, and configuration.

Never expose private administrative information in the public profile.

5. Capabilities Remain, Navigation Adapts

Do not remove any existing public Company Profile capability.

All of these capabilities remain part of the product:

- Overview
- Business
- Jobs
- Learning
- Events
- People
- Posts
- Newsletter
- Products
- Services
- Trust
- Showcase
- Organization Units
- Reviews
- Media

The navigation may adapt based on:

- Organization type
- Activated modules
- Available data
- Visitor intent
- User role
- Screen size

A capability may move under “More” when appropriate, but it must not be removed from the architecture.

6. AI Is Central, Not Fragmented

Do not create separate AI agents for:

- Company Profile
- B2B
- Hiring
- Workforce
- Learning
- Analytics

All AI capabilities must use:

Hamrahe Intelligent Engine

Each module provides its own context, permissions, and UI, but the intelligence engine is shared.

7. No Full Parallel CRM, HRMS, ERP, ATS, or Accounting Product

Hamrahe may provide:

- Lightweight opportunity pipeline
- Lightweight applicant pipeline
- Workforce relationship management
- Supplier discovery
- Integration management

Hamrahe must not recreate complete:

- CRM
- HRMS
- Payroll
- ERP
- Accounting
- Inventory
- Payment operations
- Procurement transactions
- Video conferencing
- Enterprise team chat

These must be supported through integrations.

====================================================================
VISUAL AND DESIGN-SYSTEM REQUIREMENTS
====================================================================

First reuse the current Hamrahe design system.

Do not invent a new visual language.

The final result must feel like a mature, premium, global professional platform.

The visual direction must be:

- Professional
- Trustworthy
- Modern
- Data-rich without feeling crowded
- Enterprise-ready
- Social-network aware
- Highly structured
- Clear and calm
- Scalable
- Suitable for Iran and future international markets
- More advanced than a simple LinkedIn Company Page
- Less visually overwhelming than traditional enterprise software

Do not use generic dashboard templates.

Do not fill every screen with unnecessary cards.

Use:

- Progressive disclosure
- Clear information hierarchy
- Contextual navigation
- Modular panels
- Reusable cards
- Responsive tables
- Meaningful empty states
- Semantic status colors
- Accessible charts
- Clear primary actions
- Consistent action placement
- Helpful inline explanations
- Intelligent defaults

Product UI language must be Persian and RTL.

Figma layer names, components, properties, variants, and technical annotations may use English for maintainability.

Use realistic Persian sample content and sample organization data rather than lorem ipsum.

Use Auto Layout everywhere.

Use variables and styles for:

- Colors
- Typography
- Spacing
- Radius
- Shadows
- Borders
- Grid
- Breakpoints
- Semantic states
- Trust levels
- Module status
- Charts

Use reusable components and variants.

Do not detach components without a clear reason.

====================================================================
FIGMA FILE ORGANIZATION
====================================================================

Organize or extend the file using these pages:

00 — Company Profile Gap Audit
01 — Company OS Architecture
02 — Public Company Profile
03 — Company Onboarding
04 — Company Operating System
05 — Admin Dashboard
06 — Public Profile Management
07 — Business Workspace
08 — Opportunity Marketplace
09 — Relationship Intelligence
10 — Hiring Workspace
11 — Workforce Hub
12 — Learning and Assessments
13 — Events Management
14 — People and Membership
15 — Content and Newsletter
16 — Products and Services
17 — Showcase and Organization Units
18 — Reviews and Reputation
19 — Trust and Verification
20 — Analytics
21 — Growth and Advertising
22 — Messages and Contact Routing
23 — Roles and Permissions
24 — Privacy and Consent
25 — Moderation and Legal
26 — Organization Lifecycle
27 — Integrations
28 — Billing and Entitlements
29 — Responsive and Mobile
30 — Components and Patterns
31 — User Flows and Prototype

If any of these areas already exists, do not create a duplicate page. Extend or reorganize the existing page carefully.

====================================================================
PUBLIC COMPANY PROFILE
====================================================================

Preserve and extend the existing public Company Profile.

The full public architecture includes:

- Hero
- Featured for You
- Overview
- Business
- Jobs
- Learning
- Events
- People
- Posts
- Newsletter
- Products
- Services
- Trust
- Showcase
- Organization Units
- Reviews
- Media
- Contact and Inquiry
- Similar Companies
- Company Comparison

Do not remove Jobs, Learning, Events, Posts, Newsletter, Products, Services, People, Showcase, or Trust.

====================================================================
PUBLIC HERO
====================================================================

The Hero must support:

- Dynamic cover
- Company logo
- Company name
- Organization type
- Verification badge
- Industry
- Headquarters
- Company size
- Work model
- Followers
- Verified members
- Active jobs count
- Activity status
- Average response time
- Trust summary
- Follow
- Save
- Share
- Report
- Primary contextual CTA
- Sponsored label when relevant

Dynamic cover options:

- Single image
- Image gallery
- Slideshow
- Video cover
- Brand cover
- Product cover
- Hiring cover
- Event cover
- Business opportunity cover
- Investment cover
- Campaign cover

Contextual Hero CTA examples:

For a job seeker:

- View Jobs
- Check Company Match
- Improve Application Readiness
- Join Talent Pool

For a customer:

- View Products
- View Services
- Request Demo
- Request Pricing
- Contact Sales

For a partner:

- View Opportunities
- Request Partnership
- Request Introduction
- Book Meeting

For an investor:

- View Investment Information
- Contact Investor Relations
- Request Introduction

For a verified company member:

- Enter Workforce Hub
- View Assigned Learning
- View Internal Opportunities

Design variations for:

- Logged-out visitor
- Logged-in visitor
- Job seeker
- Business visitor
- Investor
- Company member
- Company admin
- Restricted company
- Verification pending
- Sponsored company

====================================================================
FEATURED FOR YOU
====================================================================

Design a personalized Featured for You section.

Supported cards:

- Featured Job
- Featured Product
- Featured Service
- Featured Event
- Featured Learning Path
- Featured Assessment
- Featured Post
- Featured Newsletter
- Featured Business Opportunity
- Featured Case Study
- Featured Review
- Sponsored item

Selection logic should be represented through UI annotations:

- Job match
- Skill gap
- Career intent
- Business intent
- Industry
- Location
- Network relationship
- Recent activity
- Follow status
- Company priority
- Sponsorship status

Paid items must always have explicit labels such as:

- Sponsored
- Promoted
- Featured by Company
- Paid Partnership

====================================================================
ADAPTIVE OVERVIEW
====================================================================

The Overview must be a decision-oriented summary, not a duplicate of all tabs.

Fixed sections:

- Company Snapshot
- Trust Summary
- About Preview
- Primary Action

Contextual sections:

For job seekers:

- Matching jobs
- Culture
- People
- Employee reviews
- Learning recommendations
- Hiring transparency

For customers:

- Products
- Services
- Case studies
- Business contacts
- Client reviews

For partners:

- Business Open To
- Opportunities
- Business networks
- Decision makers
- Relationship paths

For investors:

- Leadership
- Growth signals
- Funding
- Market activity
- Hiring trend

Time-sensitive modules:

- Upcoming Event
- New Product
- New Job
- Active Opportunity
- Latest Newsletter
- Recent Achievement

Ranking logic:

Relevance
+
Freshness
+
Trust
+
Visitor Intent
+
Company Priority

Company administrators may feature selected content, but they must not fully override organic relevance.

====================================================================
ABOUT AND COMPANY IDENTITY
====================================================================

Preserve or extend:

- Short company description
- Full About
- Company story
- Mission
- Vision
- Business model
- Markets
- Industries
- Locations
- Offices
- Founding date
- Size
- Work model
- Ownership structure
- Parent company
- Subsidiaries
- Brands
- History
- Achievements
- Certifications
- Patents
- Licenses
- Media features
- Awards
- Commitments
- Culture summary

Add Credibility Highlights with statuses:

- Self-reported
- Source confirmed
- Document verified
- Platform verified

Add Featured Testimonial types:

- Client testimonial
- Employee testimonial
- Partner testimonial
- Investor testimonial
- Candidate testimonial

Each testimonial must connect to a verified relationship where possible.

====================================================================
PUBLIC BUSINESS TAB
====================================================================

Business is the public B2B layer inside the Company Profile.

It is not a separate company profile.

Structure:

- Business Overview
- Products and Services Summary
- Capabilities
- Technologies and Tech Stack
- Industries Served
- Markets
- Business Open To
- Needs and Opportunities
- Projects and Consulting
- Clients
- Partners
- Suppliers
- Case Studies
- Business Networks
- Decision Makers
- Business Contacts
- Business Reviews
- Business Trust

Design the Business tab for:

- Buyer
- Seller
- Partner
- Supplier
- Investor
- Enterprise customer
- Government organization
- University
- Startup
- Service provider

====================================================================
PRODUCTS
====================================================================

Preserve Products as an independent public tab and admin module.

Product system must include:

- Product portfolio
- Flagship product
- Product categories
- Product detail page
- Product updates
- Product recommendations
- Product reviews
- Product comparison
- Pricing model
- Trial availability
- Demo
- Integrations
- Related experts
- Related clients
- Related jobs
- Related events
- Related content
- Lead form
- Request demo
- Request pricing

Product fields:

- Name
- Category
- Problem solved
- Target customer
- Target industry
- Target company size
- Delivery model
- Markets
- Pricing model
- Trial
- Demo
- Implementation time
- Integrations
- Media
- Related team
- Case studies
- Recommendations
- Reviews
- CTA
- Verification level

Product lifecycle states:

- Draft
- Internal review
- Ownership check
- Duplicate check
- Compliance check
- Published
- Restricted
- Suspended
- Archived
- Disputed

Create desktop and mobile product detail views.

====================================================================
SERVICES
====================================================================

Preserve Services as an independent public tab and admin module.

Service system must include:

- Service categories
- Service detail
- Target industries
- Target customers
- Delivery model
- Geography
- Pricing model
- Availability
- Capacity
- Portfolio
- Work samples
- Case studies
- Service team
- Response time
- Reviews
- Request Service
- Book Consultation

Service request flow:

Service Page
→
Service Request Form
→
Business Inbox
→
Lead Qualification
→
Opportunity Pipeline
→
Outcome

Service request form fields:

- Request type
- Need
- Industry
- Company
- Budget
- Timeline
- Location
- Files
- Confidentiality
- Contact person
- Consent

====================================================================
CAPABILITY GRAPH
====================================================================

Design organizational capability management.

Capability must not be a simple self-written text list.

Capability is built from:

People
+
Verified Skills
+
Teams
+
Projects
+
Technology
+
Products
+
Services
+
Certifications
+
Client Outcomes
+
Case Studies

Capability card example:

AI Development

Confidence: 92%

Evidence:

- 12 verified members
- 8 completed projects
- 3 active products
- 5 confirmed clients
- 4 assessment-backed skills

Technologies:

- Python
- TensorFlow
- Azure AI

Capability evidence levels:

- Self-reported
- Member-backed
- Assessment-backed
- Project-backed
- Client-confirmed
- Platform-verified

Design:

- Capability list
- Capability detail
- Evidence drawer
- Related members
- Related projects
- Related products
- Related services
- Related opportunities
- Trust explanation
- Missing evidence state
- Capability improvement suggestions

====================================================================
TECHNOLOGY STACK
====================================================================

Technology Stack is an organization-level capability.

It is not the same as individual skill.

Skill = individual ability

Technology Stack = technology used, adopted, or mastered by the organization

Technology fields:

- Technology name
- Category
- Usage context
- Product
- Team
- Start date
- Experience duration
- Related members
- Related projects
- Related jobs
- Related services
- Verification source

Design:

- Technology library
- Technology profile
- Company tech-stack view
- Add technology flow
- Evidence management
- Technology-to-member relationship
- Technology-to-project relationship
- Technology-to-product relationship
- Technology-to-job relationship
- Technology-to-capability relationship

====================================================================
BUSINESS OPEN TO
====================================================================

Design structured Business Open To management.

Types:

- Selling
- Buying
- Partnership
- Supplier collaboration
- Distribution
- Representation
- Outsourcing
- Pilot
- Investment
- Fundraising
- Acquisition
- University collaboration
- Research and development
- Government collaboration
- Sponsorship
- International partnership

Fields:

- Target industry
- Target market
- Target company size
- Location
- Budget
- Timeline
- Responsible contact
- Confidentiality
- Visibility
- Expiration
- Required trust level

Design public cards, management forms, filters, and expired states.

====================================================================
UNIFIED OPPORTUNITY ARCHITECTURE
====================================================================

Do not create separate opportunity systems for jobs, projects, B2B, suppliers, and internal mobility.

Use one shared Opportunity entity.

Opportunity types:

- Employment opportunity
- Internship
- Freelance project
- Consulting project
- Short-term contract
- Outsourcing request
- B2B opportunity
- Supplier request
- Partnership request
- Pilot opportunity
- Investment opportunity
- Fundraising opportunity
- Internal opportunity
- Research collaboration
- Sponsorship
- Distribution
- Representation
- Open innovation challenge

Targeting logic:

Target = Individual
→ Jobs and Project Opportunities

Target = Organization or Team
→ Business and B2B Opportunities

Target = Internal Member
→ Internal Talent Marketplace

Create a Unified Opportunity Composer.

Fields:

- Opportunity type
- Target audience
- Individual, team, or company
- Required skills
- Required capabilities
- Industry
- Budget
- Duration
- Work model
- Location
- Deliverables
- Deadline
- Required verification
- Confidentiality
- Responsible owner
- Response method
- Quality requirements

Opportunity states:

- Draft
- Pending review
- Active
- Paused
- Expired
- Closed
- Cancelled
- Reported
- Restricted
- Archived

Design:

- Create opportunity flow
- Opportunity detail
- Opportunity public card
- Matching recommendations
- Responses
- Shortlist
- Meeting
- Proposal
- Negotiation
- Outcome
- Verification
- Archive
- Report abuse

====================================================================
BUSINESS WORKSPACE
====================================================================

Business Workspace is the private operational layer behind the public Business tab.

It must not duplicate the public Company Profile.

Navigation:

- Business Dashboard
- Business Profile
- Products and Services
- Capabilities
- Technologies
- Business Open To
- Opportunities
- Project Market
- Company Discovery
- Business Networks
- Prospecting
- Saved Companies
- Saved Searches
- Smart Alerts
- Relationship Intelligence
- Warm Introductions
- Referrals
- Leads
- Business Inbox
- Pipeline
- Meetings
- Event Networking
- Clients and Partners
- Case Studies
- Supplier Management
- Business Analytics
- Reports
- CRM Integration

Business dashboard metrics:

- Profile views from companies
- Product views
- Service views
- Incoming inquiries
- Qualified leads
- Active opportunities
- Meetings
- Proposals
- Win rate
- Pipeline value
- Partner requests
- Supplier requests
- Referral conversion
- Event-generated leads
- Content-generated leads
- Response time
- Trust status

====================================================================
BUSINESS PIPELINE
====================================================================

Design a lightweight CRM-style pipeline.

Stages:

- New
- Qualified
- Contacted
- Meeting
- Proposal Requested
- Proposal Sent
- Negotiation
- Won
- Lost
- Archived

Each opportunity includes:

- Organization
- Contacts
- Source
- Type
- Value
- Probability
- Stage
- Owner
- Last interaction
- Next action
- Files
- Notes
- Relationship path
- Trust level
- Consent status

Design:

- Kanban view
- Table view
- Pipeline filters
- Opportunity detail drawer
- Timeline
- Activity history
- Assign owner
- Next-action creation
- Meeting scheduling
- Proposal upload
- Outcome verification
- CRM sync state

====================================================================
RELATIONSHIP INTELLIGENCE
====================================================================

Design Relationship Intelligence as a cross-module system.

Features:

- Decision makers
- Mutual connections
- Current colleagues
- Former colleagues
- Shared projects
- Shared clients
- Shared events
- Shared organizations
- Content interactions
- Relationship strength
- Last interaction
- Best introduction path
- Relationship history
- Relationship privacy

Warm Introduction flow:

Target Company
→
Target Person
→
Mutual Relationship
→
Introduction Request
→
Introducer Approval
→
Introduction
→
Conversation
→
Opportunity
→
Outcome

Referral statuses:

- Requested
- Accepted
- Introduced
- Connected
- Meeting
- Opportunity
- Outcome

Design:

- Relationship map
- Relationship path card
- Mutual-connection selector
- Introduction request modal
- Introducer approval screen
- Referral tracking
- Relationship timeline
- Privacy and permission states
- No available path state
- Suggested alternative contacts

====================================================================
BUSINESS NETWORKS AND ECOSYSTEM MANAGEMENT
====================================================================

Design structured organization networks.

Network types:

- Industry network
- Supplier network
- Holding network
- Export network
- Startup network
- Investor network
- University-industry network
- Technology network
- Regional network
- Government ecosystem
- Private enterprise network

Business Network structure:

- Owner
- Member organizations
- Representatives
- Opportunities
- Events
- Resources
- Discussions
- Programs
- Challenges
- Cohorts
- Analytics

Access levels:

- Public
- Request to join
- Invite only
- Private
- Verified members only

Create ecosystem dashboards for:

- Holdings
- Universities
- Technology parks
- Accelerators
- Venture funds
- Government organizations
- Associations
- Operators

====================================================================
SUPPLIER NETWORK
====================================================================

Design Supplier Network and Procurement Lite.

Capabilities:

- Supplier registration
- Supplier profile
- Supplier categories
- Supplier verification
- Certifications
- Compliance documents
- Supplier qualification
- Private supplier lists
- Sourcing events
- RFx response
- Bid comparison
- Supplier performance
- Approved supplier status

Do not design full:

- Purchase orders
- Invoices
- Payments
- Shipment
- Inventory
- Accounting

Represent these as external ERP or procurement integrations.

====================================================================
JOBS PUBLIC TAB
====================================================================

Preserve Jobs as an independent public tab.

Jobs must include:

- Open jobs
- Featured jobs
- Job categories
- Internships
- Remote jobs
- Contract roles
- Projects and consulting
- Role families
- Hiring process
- Company Match
- Application Readiness
- Required assessments
- Recommended learning
- Hiring team
- Talent Pool
- Salary transparency
- Benefits
- Candidate experience
- Hiring transparency
- Response rate
- Job quality

Compensation information:

- Salary range
- Equity range
- Bonus
- Benefits
- Contract type
- Remote policy
- Relocation support
- Visa support
- Verification status

Job states:

- Draft
- Pending review
- Active
- Paused
- Filled
- Expired
- Cancelled
- Restricted
- Archived

====================================================================
COMPANY MATCH AND APPLICATION READINESS
====================================================================

Company Match and Application Readiness are different.

Company Match:

How well the organization fits the user’s skills, goals, preferences, location, work style, and career interests.

Application Readiness:

How prepared the user is to apply to a specific company or role.

Design Company Match using:

- Skills
- Experience
- Industry
- Location
- Work model
- Seniority
- Career interests
- Completed learning
- Assessments
- Open jobs
- Network relationship

Design Application Readiness using:

- Profile completeness
- Resume
- Portfolio
- Required assessments
- Recommended learning
- Relevant skills
- Experience
- Documents
- Job requirements

Create:

- Match summary
- Why you match
- Missing items
- Improve match
- Improve readiness
- Best next action
- Company journey
- Apply-readiness panel
- Consent notice

====================================================================
HIRING WORKSPACE
====================================================================

Hiring Workspace is the private recruitment operating system.

Jobs remain public and shared.

Navigation:

- Hiring Dashboard
- Job and Role Map Builder
- Jobs
- Applicants
- Talent Discovery
- Advanced Recruiter Search
- Talent Radar
- Hiring Pipeline
- Talent Pool
- Assessments
- Interviews
- Hiring Team
- Collaborative Hiring
- Candidate Experience
- Hiring Analytics
- ATS Integration

====================================================================
JOB AND ROLE MAP BUILDER
====================================================================

Create an AI-assisted role and job creation experience.

Inputs:

- Job family
- Role
- Seniority
- Responsibilities
- Required skills
- Preferred skills
- Industry
- Company technology stack
- Work model
- Location
- Compensation
- Required assessments
- Recommended learning
- Required experience
- Hiring stages

Data sources:

- Role architecture
- Skill Graph
- Company Technology Stack
- Previous jobs
- Salary Insights
- Assessment library
- Learning paths
- Market demand
- Company capability graph

Outputs:

- Job title
- Job summary
- Responsibilities
- Required skills
- Preferred skills
- Assessment requirements
- Learning recommendations
- Salary guidance
- Hiring stages
- Evaluation criteria
- Interview questions
- Job-quality warnings

Flow:

Role Map
→
AI Draft
→
Human Review
→
Compliance Review
→
Publish

AI must not publish automatically.

====================================================================
APPLICANT PIPELINE
====================================================================

Applicant stages:

- New
- Screening
- Assessment
- Interview
- Shortlist
- Offer
- Hired
- Rejected
- Withdrawn
- Talent Pool

Design:

- Kanban
- Table
- Candidate card
- Candidate detail
- Timeline
- Resume
- Portfolio
- Shared assessment results
- Shared learning evidence
- Notes
- Ratings
- Assign reviewer
- Interview scheduling
- Decision log
- Consent status
- AI summary
- AI usage notice
- Export restrictions

====================================================================
VERIFIED HIRING TEAM
====================================================================

Hiring-team roles:

- Recruiter
- Hiring Manager
- Interviewer
- HR
- Department Manager
- Assessment Reviewer

Each member must have:

- Verified organization membership
- Defined hiring role
- Permission scope
- Allowed jobs
- Audit history
- Contact availability
- Verification status

Public Hiring Team and private permission management must use the same membership entity.

====================================================================
HIRING TRANSPARENCY
====================================================================

Design an explainable Hiring Transparency system.

Factors:

- Salary range published
- Hiring stages published
- Expected timeline published
- Assessment requirements published
- Interview count published
- Work model published
- Benefits published
- Candidate status updates
- Feedback policy
- Job closure behavior

Public display example:

- Salary range available
- Hiring process published
- Assessment requirements disclosed
- Average response time: 4 days
- Individual feedback not guaranteed

Do not show only an unexplained score.

Show:

- Components
- Confidence
- Sample size
- Data freshness

====================================================================
CANDIDATE RESPONSE RATE
====================================================================

Candidate Response Rate measures meaningful responses.

Meaningful response includes:

- Invitation
- Request for information
- Assessment invitation
- Interview invitation
- Rejection
- Talent Pool invitation

Automatic “application received” messages do not count.

Metrics:

- Response rate
- Median first-response time
- Final decision rate
- Unclosed applications
- Overdue applications
- Response rate by job

Badge:

Responsive Employer

Badge eligibility:

- Minimum sample size
- Minimum response rate
- Acceptable response time
- No serious hiring warnings
- Recent data

====================================================================
CANDIDATE EXPERIENCE
====================================================================

Candidate Experience dimensions:

- Job clarity
- Process transparency
- Communication quality
- Interview respect
- Assessment relevance
- Decision speed
- Feedback quality
- Process closure

Data sources:

- Hiring-process data
- Candidate reviews
- Response time
- Abandonment
- Complaints
- Hiring warnings

Display:

- Score
- Component breakdown
- Sample size
- Date range
- Trend
- Company response
- Unknown-data state

====================================================================
HIRING WARNINGS CENTER
====================================================================

Design Hiring Risk and Warnings inside:

- Trust and Governance
- Unified Action Center
- Hiring Dashboard

Warning types:

- Possible fake job
- Duplicate job
- Misleading salary
- Expired job still active
- Discriminatory language
- Unclear employment terms
- Excessive candidate delay
- Repeated job cancellation
- Candidate-data misuse
- Assessment misuse
- Unverified recruiter
- High complaint rate

Warning states:

- Detected
- Needs review
- Acknowledged
- Corrective action required
- Resolved
- Appealed
- Dismissed
- Escalated

Consequences:

Warning
→
Required correction
→
Temporary visibility reduction
→
Feature restriction
→
Badge suspension
→
Company restriction

====================================================================
TALENT DISCOVERY
====================================================================

Design Advanced Recruiter Search.

Filters:

- Verified identity
- Verified skills
- Assessment-backed skills
- Project-backed skills
- Learning-backed skills
- Experience
- Seniority
- Role
- Industry
- Location
- Work model
- Language
- Availability
- Compensation expectation
- Portfolio
- Career intent
- Open to Work
- Last active
- Certificate
- Role readiness

Privacy rules:

Only users who have enabled Talent Discovery and granted relevant visibility may appear.

Do not provide sensitive or discriminatory filters such as:

- Gender
- Marital status
- Ethnicity
- Religion
- Health information

====================================================================
TALENT RADAR
====================================================================

Create an AI recommendation dashboard:

- Daily recommendations
- Weekly recommendations
- New high-match candidates
- Recently available candidates
- Skill-verified candidates
- Candidates completing relevant learning
- Candidates with updated profiles
- Internal employees ready for mobility

Settings:

- Cadence
- Role
- Minimum match confidence
- Location
- Work model
- Experience
- Evidence requirement
- Exclusion list

Recommendation does not equal automatic contact.

AI must show match explanation.

====================================================================
TALENT POOL
====================================================================

Public user flow:

Interested in working here?
Join this company’s talent pool.

Admin features:

- Saved candidates
- Past applicants
- Followers matching roles
- Assessment-completed candidates
- Learning-ready candidates
- People interested in company
- Event attendees
- Newsletter subscribers
- Partner-eligible talent
- Talent segments
- Alerts
- Outreach with consent

Design:

- Join flow
- Consent
- Talent-pool dashboard
- Segments
- Filters
- Candidate detail
- Campaign
- Privacy status
- Leave Talent Pool flow

====================================================================
LEARNING PUBLIC TAB
====================================================================

Preserve Learning as an independent public tab.

Learning content is created, reviewed, standardized, and published by Hamrahe.

Companies may:

- Endorse existing Hamrahe paths
- Recommend paths
- Assign paths internally
- Create cohorts based on approved paths

Companies must not freely create unreviewed learning content.

Public Learning tab includes:

- Company learning programs
- Career paths
- Job preparation paths
- Technical learning
- Internship programs
- Employee development previews
- Assessments
- Certificates
- Mentors and instructors
- Learning events
- Employer-endorsed paths
- Public learning cohorts

====================================================================
EMPLOYER-ENDORSED LEARNING PATHS
====================================================================

Relationship:

Organization
+
Role or Job Family
+
Learning Path
=
Employer-Endorsed Learning Path

Fields:

- Target role
- Target seniority
- Learning path
- Required or recommended
- Endorsement date
- Expiration
- Path version
- Related assessment
- Related jobs
- Outcome evidence

Display in:

- Learning
- Jobs
- Careers
- Application Readiness
- Hiring Workspace

Mandatory disclaimer:

Completing this path may improve readiness but does not guarantee an interview or employment.

====================================================================
ORGANIZATION LEARNING COHORTS
====================================================================

Cohort types:

- Employee cohort
- Candidate cohort
- Internship cohort
- Partner cohort
- Customer-training cohort
- Supplier-training cohort
- Public academy cohort

Capabilities:

- Public or private
- Capacity
- Enrollment rules
- Start and end dates
- Instructor
- Mentor
- Learning path
- Custom approved content
- Assignments
- Assessments
- Attendance
- Progress
- Certificate
- Cohort analytics

Flow:

Skill Gap or Hiring Need
→
Create Cohort
→
Enroll
→
Learning
→
Assessment
→
Skill Evidence
→
Readiness

====================================================================
ASSESSMENTS
====================================================================

Assessment types:

- Skill assessment
- Role-fit assessment
- Work-style assessment
- Communication assessment
- Leadership assessment
- AI workflow assessment
- Human judgment assessment
- Project-readiness assessment
- Company assessment
- English-level assessment
- Technical screening
- Portfolio review
- Interview-readiness assessment

Rules:

- Sensitive results require consent
- Psychological results remain private
- Team reporting should be aggregated
- AI does not make final decisions
- Assessment is not the sole hiring or termination criterion
- Unrelated assessments must not be mandatory
- Assessment data must follow retention rules

====================================================================
CANDIDATE SKILL-GAP REPORTS
====================================================================

Create Hiring Analytics for Candidate Market Skill Gap.

Reports:

- Most missing skills
- Common assessment weaknesses
- Experience gaps
- Portfolio gaps
- Compensation expectation gaps
- Location and work-model gaps
- Job-requirement bottlenecks
- Unrealistic requirement warnings

Use cases:

- Improve job description
- Adjust requirements
- Create learning path
- Create cohort
- Modify assessment
- Decide between hiring and training
- Workforce planning

Privacy:

- Aggregate only
- Minimum cohort size
- No individual identification
- No sensitive-attribute analysis

====================================================================
SALARY INSIGHTS
====================================================================

Design Salary Insights and Compensation Benchmarks.

Dimensions:

- Role
- Seniority
- Industry
- Location
- Work model
- Company size
- Experience
- Employment type
- Currency
- Date

Output:

- Market median
- Lower range
- Upper range
- Sample size
- Data freshness
- Source type
- Confidence level

Integration:

Salary Insights
→
Job and Role Map Builder
→
Compensation recommendation
→
Human approval
→
Published Job

Do not expose individual salary data.

====================================================================
PEOPLE PUBLIC TAB
====================================================================

Preserve People as an independent public tab.

Public People includes:

- Founders
- Leadership
- Executives
- Verified employees
- Public teams
- Hiring team
- Business contacts
- Technical experts
- People you know
- Mutual connections
- Former employees
- Employee advocates

Difference:

People = public view

Workforce Hub = private organization management

Never mix the two concepts.

====================================================================
WORKFORCE HUB
====================================================================

Create a private internal workspace.

Navigation:

- Members
- Membership Verification
- Teams
- Departments
- Organization Chart
- Managers
- Roles
- Permissions
- Member Lifecycle
- Skills
- Learning
- Assessments
- Projects
- Internal Opportunities
- Employee Advocacy
- Alumni
- Workforce Analytics

Membership states:

- Invited
- Pending Verification
- Onboarding
- Active
- Inactive
- Role Changed
- Team Changed
- Notice Period
- Offboarding
- Former Member
- Access Revoked
- Disputed

Important ownership rule:

Personal Account belongs to the individual.

Organization Membership represents the relationship.

The company must not access:

- Personal messages
- Personal searches
- Private job applications
- Private learning
- Private assessments
- Personal connections
- Device activity
- Live location

====================================================================
ORGANIZATION CHART
====================================================================

Create interactive organization hierarchy:

Company
→
Departments
→
Teams
→
Managers
→
Members

Capabilities:

- Create department
- Create team
- Assign manager
- Assign member
- Multi-team membership
- Matrix teams
- Vacant role
- Structure history
- Public visibility configuration
- Holding and subsidiary hierarchy

====================================================================
WORKFORCE INTELLIGENCE
====================================================================

Features:

- Role architecture
- Skill taxonomy
- Skill inference
- Skill validation
- Skill-demand forecast
- Team capacity
- Critical-skill risk
- Workforce scenarios
- Succession readiness
- Internal project marketplace
- Mentor matching
- Career mobility
- Department readiness
- Capability coverage
- Hire, Train, Outsource, Buy, Partner decision support

Internal Talent Marketplace types:

- Internal job
- Internal project
- Temporary assignment
- Cross-team mission
- Mentorship
- Succession opportunity
- Innovation challenge
- Internal freelance task

Flow:

Internal Opportunity
→
Skill Match
→
Readiness
→
Recommended Learning
→
Manager Approval
→
Assignment

====================================================================
EVENTS PUBLIC TAB AND MANAGEMENT
====================================================================

Preserve Events as an independent public tab and management module.

Event types:

- Webinar
- Workshop
- Hiring Day
- Company Open Day
- Networking Session
- Product Demo
- Career Talk
- Community Meetup
- Learning Session
- Startup Pitch
- Conference
- Exhibition
- Panel Discussion
- Recruitment Event
- Portfolio Review
- Internal public event

Event management:

- Create Event
- Registration
- Tickets
- Attendees
- Speakers
- Agenda
- Sponsors
- Communications
- Networking
- Analytics
- Archive

Event Networking:

Before event:

- Participating companies
- Representatives
- Suggested connections
- Meeting requests
- Personal meeting list

During event:

- QR connection
- Save contact
- Add note
- Create lead
- Request introduction

After event:

- Follow-up
- Create opportunity
- Add applicant
- Add talent
- Send content
- Analyze outcome

Event states:

- Draft
- Scheduled
- Published
- Registration Open
- Live
- Completed
- Cancelled
- Restricted
- Archived

====================================================================
POSTS AND CONTENT STUDIO
====================================================================

Preserve Posts as an independent public tab.

Post types:

- Company update
- Hiring post
- Culture post
- Product update
- Service update
- Event post
- Learning post
- Employee story
- Announcement
- Article
- Business update
- Sponsored post

Content workflow:

Idea
→
Draft
→
Assigned
→
Review
→
Approval
→
Scheduled
→
Published
→
Archived

Features:

- Content calendar
- Drafts
- Collaboration
- Internal comments
- Version history
- Approval
- Scheduling
- Featured content
- Pin content
- Target audience
- Comment controls
- Employee notification
- Paid Partnership label
- RSS import
- Blog import
- Press-room import
- Product changelog import
- Review queue

Do not automatically publish imported external content by default.

====================================================================
NEWSLETTER
====================================================================

Preserve Newsletter as an independent public tab and admin module.

Features:

- Multiple newsletter series
- Issues
- Topics
- Authors
- Subscription
- Archive
- In-app delivery
- Email delivery
- Subscribe link
- Website subscribe widget
- Analytics
- Sponsored newsletter
- Follower invitation on first issue
- Employee advocacy
- Product attribution
- Job attribution
- Business lead attribution

Analytics:

- Subscribers
- Open rate
- Read rate
- Click rate
- Unsubscribe rate
- Follower conversion
- Product visits
- Business leads
- Job applications

====================================================================
SHOWCASE AND ORGANIZATION UNITS
====================================================================

Preserve Showcase as an independent capability.

Sub-page types:

- Product page
- Brand page
- Department page
- Branch page
- Subsidiary page
- Regional page
- Campaign page
- Community page
- Research unit

Each sub-page may have:

- Followers
- Content
- Admins
- Analytics
- Messages
- Events
- CTA
- Verification
- Parent trust inheritance

The parent organization relationship must always be visible.

Organization units include:

- Holding
- Subsidiary
- Brand
- Branch
- Department
- Product unit
- Region
- Research unit
- Joint venture

Use Organization Graph.

Do not duplicate organization data.

====================================================================
REVIEWS AND REPUTATION
====================================================================

Review contexts must remain separate:

- Employee Review
- Former Employee Review
- Candidate Review
- Interview Review
- Product Review
- Service Review
- Business Relationship Review
- Event Review
- Learning Review

Do not combine all reviews into one meaningless score.

Review structure:

- Context
- Reviewer
- Relationship verification
- Period
- Structured rating
- Written review
- Evidence
- Privacy
- Visibility
- Moderation
- Company response
- Dispute
- Appeal

Review states:

- Draft
- Submitted
- Pending Verification
- Published
- Reported
- Under Review
- Restricted
- Removed
- Appealed
- Restored

The company cannot directly delete a negative review.

It may:

- Respond
- Report
- Provide evidence
- Open dispute
- Appeal moderation

====================================================================
TRUST
====================================================================

Trust must be explainable.

Trust dimensions:

- Identity Trust
- Business Trust
- Hiring Trust
- Workforce Trust
- Content Trust
- Product Trust
- Service Trust
- Compliance Trust

Public trust explanation may include:

- Verified legal identity
- Verified domain
- Confirmed executives
- Confirmed employees
- Confirmed clients
- Confirmed partners
- Response behavior
- Verified outcomes
- Unresolved reports
- Data freshness

Trust structure:

- Score
- Confidence
- Evidence count
- Data freshness
- Risk flags
- Unknown areas

Rule:

Unknown does not equal negative.

Do not punish organizations simply because some data is unavailable.

====================================================================
BADGES
====================================================================

Badge examples:

- Verified Company
- Trusted Employer
- Verified Supplier
- Verified Service Provider
- Verified Decision Maker
- Client Confirmed
- Candidate Friendly
- Fast Responder
- Reliable Proposal
- Pilot Ready
- Export Ready
- Enterprise Ready
- Learning Friendly
- Assessment Ready
- Verified Hiring Team
- Trusted Partner
- Responsive Employer

Badges must be earned through data, evidence, and behavior.

Badges must not be directly purchasable.

Paid plans may unlock access to verification workflows but cannot buy trust.

====================================================================
OUTCOME VERIFICATION
====================================================================

Outcome verification levels:

- Self-reported
- Counterparty confirmed
- Document confirmed
- Platform observed
- System integrated
- Audited

Hiring verification flow:

Applicant marked Hired
→
Candidate confirms
→
Membership created
→
Verified Hire

Business outcome verification:

Opportunity Won
→
Counterparty confirms
→
Project or contract evidence
→
Verified Business Outcome

Learning outcome verification:

Learning completed
→
Assessment passed
→
Skill updated
→
Verified Skill Outcome

Design confirmation requests, evidence uploads, disputes, and audit states.

====================================================================
COMPANY OPERATING SYSTEM
====================================================================

Design a unified operating layer connecting every workspace.

Components:

- Unified Action Center
- Unified Inbox
- Unified Search
- Unified Tasks
- Unified Calendar
- Unified Approvals
- Unified Notifications
- Unified Analytics
- Unified Intelligent Context

Example integrated workflow:

Business opportunity requires a new capability
→
Workforce checks internal capacity
→
Learning suggests a development path
→
Hiring suggests recruitment
→
Business suggests outsourcing or partnership
→
Action Center presents options

Options:

- Hire
- Train
- Outsource
- Buy
- Partner

This is real integration.

Do not merely place links between disconnected modules.

====================================================================
UNIFIED ACTION CENTER
====================================================================

Sections:

- Needs Approval
- Needs Response
- Needs Verification
- Due Today
- Overdue
- Assigned to Me
- Waiting for Others
- Critical
- Suggested Actions

Each action includes:

- Title
- Source module
- Owner
- Assignee
- Priority
- Deadline
- Status
- Required permission
- Escalation
- Deep link
- AI explanation when applicable

Action examples:

- Verify company domain
- Complete product information
- Respond to candidate
- Approve membership
- Review business opportunity
- Correct hiring warning
- Approve newsletter
- Review consent request
- Renew integration
- Update outdated information

====================================================================
UNIFIED MESSAGING AND CONTACT ROUTING
====================================================================

Use one Messaging Engine.

Conversation contexts:

- Personal
- Business
- Hiring
- Event
- Support
- Moderation

Workspace inboxes are filtered views of the same threads.

Contact topics:

- General Inquiry
- Sales
- Services
- Partnership
- Supplier
- Investment
- Careers
- Media
- Events
- Support
- Legal
- Security

Routing flow:

Topic
→
Responsible Team
→
Responsible Admin
→
SLA
→
Escalation

Features:

- Enable or disable messaging
- Topic filters
- Assign conversation
- Internal notes
- Saved replies
- Response time
- Auto acknowledgement
- API integration
- Out of office
- Escalation
- Search
- Attachments
- Consent
- Archive
- Audit history

AI may draft responses but must not send external messages without human approval.

====================================================================
NOTIFICATION ARCHITECTURE
====================================================================

Notification categories:

- Critical
- Action Required
- Business
- Hiring
- Workforce
- Content
- Events
- Trust
- Billing
- Suggestions
- Digest

Delivery options:

- Immediate
- Daily Digest
- Weekly Digest
- In-App
- Email
- Push
- Muted

Each notification must include:

- Reason
- Source
- Required action
- Deadline
- Deep link
- Permission context

Avoid notification overload.

====================================================================
ADMIN DASHBOARD
====================================================================

Design a high-quality executive dashboard.

Header metrics:

- Profile Completion
- Company Health
- Trust Level
- Reputation
- Moderation Status
- Active Members
- Active Jobs
- Pending Applicants
- Talent Pool
- Business Leads
- Active Opportunities
- Upcoming Events
- Learning Progress
- Content Performance
- New Messages

Sections:

- Today’s Actions
- Critical Alerts
- AI Insights
- Profile status
- Trust status
- Business summary
- Hiring summary
- Workforce summary
- Learning summary
- Content summary
- Event summary
- Growth summary
- Integration health
- Billing and usage

AI Insight examples:

- Hiring conversion dropped 18%
- Most visitors come from technology companies
- AI Engineering is the fastest-growing capability
- Product capability lacks verified client evidence
- Candidate-response time is increasing
- Three opportunities may require new talent
- A product page has high views but low demo conversion

====================================================================
PUBLIC PROFILE MANAGEMENT
====================================================================

Private management sections:

- Identity
- About
- Company story
- Cover
- Logo
- Brand assets
- Public members
- Public contacts
- Featured content
- Contextual CTA
- Audience variants
- Page preview
- Visibility
- Languages
- Organization units
- Company lifecycle
- Credibility highlights
- Testimonials

Preview modes:

- Public visitor
- Job seeker
- Client
- Partner
- Investor
- Employee
- Logged-out visitor
- Mobile
- Tablet
- Desktop

====================================================================
AUDIENCE VARIANTS
====================================================================

One profile may provide contextual experiences.

Variant configuration:

- Target audience
- Custom cover
- Custom headline
- Custom About
- Featured product
- Featured opportunity
- Featured job
- Featured people
- Featured review
- Primary CTA

Target criteria:

- Language
- Country
- City
- Industry
- Profession
- Seniority
- Company size
- Career intent
- Business intent
- Skills
- Network relationship
- Follower status

Audience variants are contextual views of one profile, not duplicate profiles.

====================================================================
ORGANIZATION SOCIAL IDENTITY AND GROWTH
====================================================================

Company may follow:

- Companies
- Institutions
- Business networks
- Products
- Event series
- Topics

Authorized admins may act as company:

- Follow
- React
- Comment
- Repost
- Mention
- Save
- Message

All actions must be logged.

Company Feed includes:

- Followed companies
- Business opportunities
- Industry updates
- Employee content
- Partner updates
- Competitor updates
- Network announcements
- Events

Growth tools:

- Invite connections
- Invite employees
- Invite alumni
- Invite event attendees
- Invite clients
- Invite business contacts
- Auto-invite engagers
- Suggested similar audience
- Follower analytics

Rules:

- Rate limits
- No repeated invitation
- Relevance threshold
- Opt-out
- Reporting
- Exclusion list

====================================================================
ANALYTICS
====================================================================

Use one Analytics Engine.

Create views for:

- Profile Analytics
- Business Analytics
- Hiring Analytics
- Learning Analytics
- Event Analytics
- Content Analytics
- Newsletter Analytics
- Product Analytics
- Service Analytics
- Workforce Analytics
- Trust Analytics
- Growth Analytics
- Competitor Analytics

Every analytics screen should include:

- KPI summary
- Trend charts
- Comparison period
- Filters
- Date range
- Segmentation
- Export
- AI explanation
- Data source
- Confidence or estimated-data label when relevant
- Empty state
- Loading state
- Permission state

Profile analytics:

- Views
- Unique visitors
- Returning visitors
- Search appearances
- Search keywords
- Visitor companies
- Visitor industries
- Visitor roles
- Navigation paths
- CTA conversion

Follower analytics:

- New followers
- Lost followers
- Sources
- Industry
- Role
- Seniority
- Location
- Company size
- Organic versus paid
- Invite conversion

Business funnel:

Impression
→
Company Visit
→
Product or Service View
→
Business Action
→
Lead
→
Qualified Lead
→
Meeting
→
Proposal
→
Negotiation
→
Won or Lost

Business metrics:

- Profile-to-lead
- Product-to-demo
- Lead-to-meeting
- Meeting-to-proposal
- Proposal-to-win
- Average sales cycle
- Opportunity value
- Referral conversion
- Event conversion
- Content conversion

Hiring funnel:

Job Published
→
Qualified View
→
Application
→
Assessment
→
Interview
→
Offer
→
Hire
→
Membership

Workforce funnel:

Member Verified
→
Skills Added
→
Gap Detected
→
Learning Assigned
→
Learning Completed
→
Skill Validated
→
Internal Move

Activation funnel:

Claimed
→
Verified
→
Profile Completed
→
First Member
→
First Asset
→
First Interaction
→
First Outcome

====================================================================
COMPANY INTELLIGENCE
====================================================================

Design a connected Company Intelligence layer.

Information:

- Funding rounds
- Investors
- Acquisitions
- Headcount trend
- Hiring trend
- Growth signals
- Leadership changes
- Product launches
- Market activity
- Technology stack
- Geographic expansion
- Watchlists
- Alerts
- Ecosystem maps
- Compensation benchmarks

Data-source labels:

- Company reported
- Observed
- Estimated
- Third-party
- Verified

Company Intelligence is a shared platform service.

The Company Profile consumes it but does not own or duplicate it.

====================================================================
TRUST AND VERIFICATION CENTER
====================================================================

Verification types:

- Legal entity verification
- Domain verification
- Work email verification
- Executive verification
- Recruiter verification
- Business contact verification
- Supplier verification
- Certificate verification
- Location verification
- Workplace verification
- Advanced enterprise verification

Verification states:

- Unverified
- Pending
- Partially Verified
- Verified
- Advanced Verified
- Restricted
- Under Review

Create:

- Verification checklist
- Evidence upload
- Domain verification
- Work-email verification
- Admin review
- Verification timeline
- Rejection explanation
- Resubmission
- Appeal
- Expiration
- Badge effect
- Feature eligibility

====================================================================
ANTI-FRAUD AND ANTI-GAMING
====================================================================

Risks:

- Fake company
- Fake member
- Fake review
- Fake client
- Fake partnership
- Fake case study
- Spam opportunity
- Mass messaging
- Artificial engagement
- Badge farming
- Data scraping
- Impersonation
- Fake job
- Fake product
- Misleading advertising

Controls:

- Fraud risk score
- Relationship verification
- Behavior anomaly detection
- Rate limits
- Duplicate detection
- Evidence request
- Review sampling
- Manual investigation
- Appeal process
- Penalty history

Actions:

- Warning
- Visibility reduction
- Feature restriction
- Content removal
- Badge removal
- Verification removal
- Temporary suspension
- Permanent restriction
- Legal escalation

====================================================================
RANKING GOVERNANCE
====================================================================

Ranking signals:

- Relevance
- Trust
- Quality
- Freshness
- Response behavior
- Outcome history
- Network relationship
- Completeness
- Moderation risk
- User preference

Paid placement must not modify trust or organic quality scores.

Organic Ranking
≠
Paid Placement

All paid placements must have transparent labels.

Premium cannot override:

- Trust restrictions
- Safety restrictions
- Moderation penalties
- Severe quality problems

====================================================================
PRIVACY AND CONSENT
====================================================================

Create a complete Candidate Data Access Matrix.

Data categories:

- Profile
- Resume
- Portfolio
- Assessment results
- Learning records
- Salary expectation
- Interview notes
- References
- Application history
- Contact details

Each access grant includes:

- Data category
- Purpose
- Receiving organization
- Receiving role
- Access start
- Expiration
- Retention
- Revocation
- Audit history
- Export permission

After process completion:

Access expires
→
Data is restricted or deleted according to policy
→
Audit record remains

Design:

- User consent screen
- Company access request
- Consent history
- Revoke access
- Expired access
- Restricted data
- Data retention
- Sensitive-data warning
- AI usage notice
- Export notice

====================================================================
ROLES, SEATS, AND PERMISSIONS
====================================================================

Keep these concepts separate:

Seat = product usage capacity

Role = user responsibility

Permission = allowed action

Suggested ready roles:

- Owner
- Admin
- HR
- Recruiter
- Business
- Content
- Event
- Analyst
- Billing
- Viewer

Support Custom Roles for enterprise.

Permission actions:

- View
- Create
- Edit
- Publish
- Approve
- Assign
- Export
- Delete
- Manage Access

Permission scopes:

- Organization
- Subsidiary
- Department
- Team
- Product
- Opportunity
- Job
- Event

Recruiter Seat must not automatically grant access to Business or Workforce data.

Design:

- Role list
- Permission matrix
- Scope selector
- Custom-role builder
- Seat assignment
- Access review
- Invite admin
- Remove admin
- Temporary access
- Dormant admin
- Access audit
- Holding-level access

====================================================================
MULTI-ORGANIZATION AND HOLDING MANAGEMENT
====================================================================

Capabilities:

- Parent organization
- Subsidiaries
- Shared admins
- Central governance
- Local admins
- Shared brand assets
- Shared policies
- Consolidated analytics
- Cross-company opportunities
- Central billing
- Data separation
- Cross-company workforce insights
- Regional management

Roles:

- Group Owner
- Group Admin
- Company Admin
- Unit Admin
- Regional Admin
- Auditor

Parent organizations must not automatically receive all private subsidiary data.

Access must be permission-based.

====================================================================
ORGANIZATION LIFECYCLE
====================================================================

Lifecycle states:

- Unclaimed
- Claim Pending
- Claimed
- Active
- Verified
- Restricted
- Deactivated
- Merged
- Archived

Capabilities:

- Unclaimed organization record
- Claim page
- Duplicate detection
- Merge
- Name change
- Rebrand
- Acquisition
- Affiliation
- Deactivation
- Reactivation
- URL redirect
- Follower migration
- Employee mapping
- Content migration

Create detailed admin flows, confirmation dialogs, evidence requirements, public notices, and audit records.

====================================================================
INTEGRATIONS
====================================================================

Integration categories:

- CRM
- ATS
- HRMS
- Calendar
- Video Meeting
- Analytics
- ERP
- Procurement
- SSO
- SCIM
- API
- Webhooks
- Advertising accounts
- Owned applications
- Website
- Domains
- Publisher accounts

Integration Registry fields:

- Owner
- Scope
- Permissions
- Approved by
- Created at
- Last used
- Accessible data
- Status
- Revoke
- Audit history
- Sync errors

Create:

- Integration marketplace
- Connection flow
- Permission review
- Data mapping
- Sync status
- Error handling
- Disconnect
- Token expiration
- Audit
- Test connection

====================================================================
BILLING AND ENTITLEMENTS
====================================================================

Plans:

Free
Verified
Business Growth
Talent and Workforce
Business Pro
Enterprise

Free:

- Public profile
- Posts
- Basic products
- Basic services
- Basic jobs
- Basic events
- Basic people
- Basic analytics
- Receive messages

Verified:

- Verification
- Workplace verification
- Verified contacts
- Trust features
- Review response

Business Growth:

- Opportunities
- Lead forms
- Saved searches
- Pipeline
- Basic prospecting
- Basic business analytics

Talent and Workforce:

- Talent Pool
- Hiring Pipeline
- Learning assignment
- Skill Gap
- Workforce Hub
- Internal opportunities

Business Pro:

- Advanced matching
- Warm introductions
- Intent signals
- Custom reports
- CRM integration
- Team collaboration
- Advanced analytics

Enterprise:

- SSO
- SCIM
- ATS
- HRMS
- CRM
- API
- Private networks
- Holding management
- Advanced permissions
- Audit export
- Data residency

Entitlement variables:

- Admin seats
- Active jobs
- Active opportunities
- Lead forms
- Saved searches
- Monthly introductions
- Analytics retention
- Data export
- Audience variants
- Showcase pages
- Integrations
- AI usage
- Reports
- Workforce seats

Rule:

Paid plans unlock scale and intelligence.

Paid plans do not buy trust.

====================================================================
MODULE ACTIVATION
====================================================================

Module states:

- Unavailable
- Eligible
- Available
- Trial
- Active
- Restricted
- Suspended
- Expired
- Archived

Availability depends on:

Organization Type
×
Verification
×
Trust
×
Plan
×
Permission
×
Policy Status

Design activation flows for:

- Business
- Workforce
- Hiring Advanced
- Learning Organization
- Supplier Network
- Reviews
- Company Intelligence
- Showcase
- Ecosystem Management

When a module is disabled:

- Data is not deleted
- Active public items are paused when necessary
- Admin access is restricted
- Public visibility follows settings
- Reactivation remains possible

====================================================================
ORGANIZATION ONBOARDING
====================================================================

Create goal-based onboarding.

Step 1:

Create or Claim Organization

Step 2:

Basic identity

- Name
- Organization type
- Industry
- Location
- Size
- Website
- Domain
- Logo
- Short description

Step 3:

Choose goals

- Build public presence
- Hire talent
- Sell products or services
- Find partners
- Manage members
- Publish content
- Run events
- Develop employees
- Find suppliers
- Raise investment

Step 4:

Recommend modules

Step 5:

First action

- Publish first post
- Create first job
- Add first product
- Add first service
- Publish first opportunity
- Create first event
- Invite first member

Step 6:

First outcome

- First follower
- First message
- First applicant
- First lead
- First event registration
- First verified member
- First verified outcome

Design:

- Progress
- Save and resume
- Skip optional steps
- Goal selection
- Recommended setup
- Verification
- Module activation
- First-action guidance
- Completion summary
- Next Best Actions

====================================================================
ORGANIZATION TEMPLATES
====================================================================

Templates:

- Startup
- Enterprise
- Holding
- Product company
- Service provider
- Supplier
- Investment firm
- University
- Government organization
- Association

Templates determine:

- Recommended modules
- Important fields
- Default CTAs
- Default dashboards
- Navigation priorities
- Suggested first actions

Templates must not create separate data models.

====================================================================
HAMRAHE INTELLIGENT ENGINE
====================================================================

Use one central AI engine.

Profile capabilities:

- About draft
- Profile improvement
- CTA suggestion
- Audience variant
- Company summary
- Missing-information detection

Business capabilities:

- Company brief
- Opportunity analysis
- Match explanation
- Relationship path
- Lead prioritization
- Outreach draft
- Proposal review
- Next best action
- Pipeline summary

Hiring capabilities:

- Candidate summary
- Match explanation
- Interview suggestions
- Application gap
- Job draft
- Pipeline summary

Workforce capabilities:

- Skill gap
- Team readiness
- Learning recommendation
- Team composition
- Capacity analysis
- Hire, Train, Outsource, Buy, Partner recommendation

Content capabilities:

- Post draft
- Newsletter draft
- Content recommendation
- Performance explanation
- Audience suggestion

Analytics capabilities:

- Explain change
- Detect anomaly
- Summarize trend
- Recommend next action

AI rules:

- Permission-based access
- Human approval
- No autonomous external action
- No fabricated company claims
- No final commercial commitment
- No autonomous hiring decision
- Explainability
- Sensitive usage logging
- Clear AI-use labels
- Auditability
- User consent where required

Create reusable AI components:

- AI suggestion card
- AI explanation drawer
- AI-generated draft
- Review and approve
- Edit before use
- Dismiss
- Feedback
- Source data
- Confidence
- Permission warning
- AI history

====================================================================
REQUIRED PRODUCT STATES
====================================================================

Every major screen and component must include relevant states:

- Default
- Empty
- Loading
- Skeleton
- Error
- Success
- Draft
- Pending review
- Published
- Private
- Restricted
- Suspended
- Expired
- Archived
- Deleted
- Restored
- Disputed
- Under investigation
- Verification pending
- Permission denied
- Plan required
- Trial expired
- Integration disconnected
- Integration error
- No results
- Partial data
- Unknown trust
- Offline or network error

Do not design only the ideal happy path.

====================================================================
REQUIRED CORE FLOWS
====================================================================

Create visual user-flow maps and connected prototypes for:

1. Company creation and claim

Create or Claim
→
Verify identity
→
Complete core profile
→
Choose goals
→
Activate modules
→
Invite members
→
Publish first asset
→
Receive first interaction
→
Reach first outcome

2. B2B opportunity

Publish opportunity
→
Quality review
→
Matching
→
Response
→
Shortlist
→
Meeting
→
Proposal
→
Negotiation
→
Outcome
→
Verification
→
Case Study
→
Trust

3. Hiring to membership

Job
→
Applicant
→
Assessment
→
Interview
→
Offer
→
Hire
→
Membership
→
Onboarding
→
Workforce Hub

4. Skill to business capability

Member Skill
→
Team Capability
→
Company Capability
→
Business Match
→
Opportunity
→
Project
→
Outcome
→
Case Study
→
Trust

5. Content to business outcome

Post or Newsletter
→
Engagement
→
Product or Service Visit
→
Lead Form
→
Lead
→
Opportunity
→
Contract
→
ROI

6. Event to business or hiring

Event
→
Attendee
→
Connection
→
Meeting
→
Applicant or Lead
→
Pipeline
→
Outcome

7. Review to trust

Verified Relationship
→
Review
→
Moderation
→
Company Response
→
Trust Signal
→
Ranking

8. Learning to professional growth

Skill Gap
→
Learning
→
Practice
→
Assessment
→
Skill Update
→
Role Readiness
→
Internal or External Opportunity

9. Project-market routing

Unified Opportunity Composer
→
Target Individual
→
Jobs and Projects

Target Company
→
Business

Target Internal Member
→
Internal Talent Marketplace

10. Warm introduction

Target Company
→
Decision Maker
→
Mutual Relationship
→
Introduction Request
→
Approval
→
Introduction
→
Conversation
→
Opportunity

11. Service request

Service Page
→
Request Form
→
Business Inbox
→
Lead Qualification
→
Opportunity
→
Outcome

12. Product demo

Product Page
→
Request Demo
→
Contact Routing
→
Business Inbox
→
Lead
→
Meeting
→
Pipeline

13. Candidate consent

Apply
→
Select Shared Data
→
Consent
→
Hiring Team Access
→
Expiration
→
Restriction or Deletion
→
Audit

14. Module activation

Eligible
→
Review requirements
→
Accept policy
→
Select plan
→
Activate
→
Configure
→
Publish

====================================================================
RESPONSIVE DESIGN
====================================================================

Design all critical screens for:

- Desktop 1440 px
- Tablet 1024 px
- Mobile 390 px

Mobile priority:

- Action Center
- Inbox
- Notifications
- Approvals
- Quick Create
- Dashboard Summary
- Member Verification
- Lead Updates
- Applicant Updates
- Event Management
- Opportunity Pipeline
- Company Profile
- Public tabs
- Apply flow
- Consent

Complex configuration may remain desktop-first, but daily operations must work on mobile.

Use adaptive tables, card conversion, drawers, bottom sheets, sticky actions, and mobile filters.

====================================================================
ACCESSIBILITY
====================================================================

Apply:

- Keyboard navigation
- Screen-reader labels
- Sufficient color contrast
- Visible focus states
- Accessible charts
- RTL support
- LTR support
- Reduced motion
- Text scaling
- Image alt text
- Video captions
- Clear error messages
- Non-color status indicators
- Accessible modals
- Accessible tables
- Touch targets
- Semantic hierarchy

====================================================================
PERFORMANCE-AWARE DESIGN
====================================================================

Design for:

- Fast first load
- Image optimization
- Lazy loading
- Video controls
- Pagination
- Limited infinite scroll
- Analytics query limits
- Mobile data optimization
- Caching
- Skeleton loading
- Progressive loading
- Long-table virtualization
- Empty-data fallback

====================================================================
INTERNATIONALIZATION
====================================================================

The initial interface is Persian and RTL, but the architecture must support:

- Multilingual profiles
- Translated products
- Translated services
- Localized jobs
- Local currency
- Local dates
- Regional legal fields
- Country-specific company types
- Regional verification
- Data residency
- Local moderation
- Timezone-aware events

Translation status:

- Company written
- Human translated
- AI translated
- Verified translation

====================================================================
ENTERPRISE SECURITY
====================================================================

Design security-management screens for:

- SSO
- SCIM
- MFA enforcement
- IP allowlist
- Session management
- Device management
- Security logs
- Data retention
- Data residency
- Encryption
- Access review
- Admin approval
- Incident management
- API controls
- Dormant-admin detection
- Former-employee access removal
- Quarterly access review
- Integration-token rotation
- Suspicious-export detection

====================================================================
SUPPORT AND DISPUTES
====================================================================

Cases:

- Claim dispute
- Admin ownership dispute
- Membership dispute
- Review dispute
- Fake client claim
- Duplicate company
- Trademark complaint
- Data correction
- Privacy request
- Account recovery
- Verification appeal
- Moderation appeal

Case fields:

- Case ID
- Category
- Evidence
- Assigned team
- SLA
- Status
- Decision
- Appeal
- Audit trail

Design:

- Create case
- Upload evidence
- Case timeline
- Status tracking
- Decision
- Appeal
- Resolution
- Escalation

====================================================================
RANKING, GROWTH, AND ADVERTISING
====================================================================

Use the shared Ads Engine.

Boost types:

- Boost Company
- Boost Post
- Boost Job
- Boost Product
- Boost Service
- Boost Event
- Boost Opportunity
- Sponsored Newsletter
- Featured Employer
- Featured Company

Flow:

Objective
→
Audience
→
Budget
→
Schedule
→
Preview
→
Moderation
→
Publish
→
Analytics

Objectives:

- Reach
- Followers
- Website visits
- Lead generation
- Demo requests
- Applications
- Event registrations
- Business inquiries

Every sponsored item must have a visible label.

====================================================================
DESIGN COMPONENTS TO CREATE OR EXTEND
====================================================================

Reuse existing components first.

Create or extend reusable components for:

- Public Company Hero
- Dynamic Cover
- Adaptive Tabs
- Company Card
- Job Card
- Candidate Card
- Person Card
- Product Card
- Service Card
- Opportunity Card
- Event Card
- Learning Path Card
- Assessment Card
- Review Card
- Case Study Card
- Capability Card
- Technology Card
- Trust Signal
- Trust Breakdown
- Verification Badge
- Status Badge
- Sponsored Label
- Module Status
- KPI Card
- Chart Card
- AI Insight Card
- AI Suggestion Panel
- Action Center Item
- Notification Item
- Message Thread
- Contact Routing
- Lead Card
- Pipeline Card
- Kanban Column
- Filter Bar
- Search Bar
- Advanced Filter Drawer
- Saved Search
- Relationship Path
- Introduction Request
- Consent Panel
- Permission Matrix
- Role Card
- Member Row
- Organization Tree
- Integration Card
- Billing Plan
- Entitlement Limit
- Warning Card
- Moderation Case
- Audit Entry
- Evidence Item
- Empty State
- Error State
- Loading Skeleton
- Success State
- Permission Denied
- Upgrade Required
- Verification Pending
- Archive State

All components must include:

- Default
- Hover
- Focus
- Active
- Disabled
- Loading
- Error
- Selected
- Mobile variant where relevant

====================================================================
PROTOTYPE REQUIREMENTS
====================================================================

Create clickable prototype connections for critical workflows.

At minimum prototype:

- Public profile navigation
- Adaptive Overview
- Product request demo
- Service request
- Contact routing
- Company onboarding
- Module activation
- Create B2B opportunity
- Opportunity pipeline
- Warm introduction
- Create job with Role Builder
- Applicant pipeline
- Candidate consent
- Talent Radar
- Join Talent Pool
- Approve membership
- Learning assignment
- Event networking
- Review response and dispute
- Trust verification
- Action Center
- Unified Inbox
- Roles and permissions
- Integration connection
- Billing upgrade
- Moderation warning and appeal

Use realistic transitions and avoid decorative animation that adds no value.

====================================================================
DESIGN ANNOTATIONS
====================================================================

Add concise product annotations for:

- Data source
- Entity owner
- Permission requirement
- Trust requirement
- Module dependency
- Shared-engine dependency
- Analytics event
- Mobile behavior
- Empty state
- Error state
- AI behavior
- Human-approval requirement
- Privacy requirement
- Moderation requirement

Do not fill user-facing screens with technical annotations.

Place annotations in dedicated documentation areas beside the relevant screens.

====================================================================
PHASE IMPLEMENTATION
====================================================================

All phases must be represented in Figma, but clearly labeled by phase.

Phase 0 — Architecture and Foundation

- Entity relationship foundations
- State machines
- Permission matrix
- Analytics taxonomy
- Trust model
- Action Center foundation
- Messaging integration
- Notification architecture
- Audit foundation
- Design-system extensions

Phase 1 — Core Company Profile

- Overview
- Jobs
- Learning
- Events
- People
- Posts
- Newsletter
- Products
- Services
- Trust
- Showcase
- Basic verification
- Basic membership
- Messages
- Basic analytics
- Goal-based onboarding

Phase 2 — B2B and Workforce

- Business
- Capabilities
- Technology Stack
- Business Open To
- Opportunities
- Project Market
- Business Inbox
- Pipeline
- Workforce Hub
- Teams
- Organization Chart
- Skills
- Job and Role Map Builder
- Advanced Recruiter Search
- Talent Radar
- Action Center

Phase 3 — Competitive Depth

- Reviews
- Hiring Transparency
- Candidate Response Rate
- Hiring Warnings
- Salary Insights
- Employer-Endorsed Paths
- Learning Cohorts
- Candidate Gap Reports
- Product Comparison
- Service Comparison
- Warm Introduction
- Business Networks
- Supplier Qualification
- Internal Talent Marketplace
- Audience Variants
- Growth Tools
- Advanced Analytics

Phase 4 — Enterprise and Intelligence

- Company Intelligence
- Private Networks
- CRM integration
- ATS integration
- HRMS integration
- SSO
- SCIM
- API
- Advanced Workforce Planning
- Procurement Lite
- Holding Management
- Internationalization
- Enterprise Security
- Data Residency

Use visual phase labels and status tags in the design documentation.

Do not create duplicate future versions of existing screens.

Add future-phase modules as extensions of the same architecture.

====================================================================
SOURCE OF TRUTH
====================================================================

Use these ownership rules:

Organization
Managed in Public Profile Management
Displayed across the product

Membership
Managed in Workforce Hub
Displayed in People, Business, Hiring, and Organization Graph

Technology
Managed in Capabilities
Displayed in Business, Jobs, Products, and Company Intelligence

Product
Managed in Products
Displayed in Overview, Business, Search, Feed, Ads, and Analytics

Service
Managed in Services
Displayed in Overview, Business, Search, and Lead flows

Opportunity
Managed in Business or Hiring based on target
Displayed in Business, Jobs, Search, Feed, Networks, and Saved Items

Job
Managed in Hiring
Displayed in Jobs, Search, Feed, Learning, Events, and Talent Pool

Learning Path
Managed by Learning Engine
Displayed in Learning, Jobs, Workforce, and Company Profile

Assessment
Managed by Assessment Engine
Displayed in Jobs, Learning, Workforce, and Hiring

Event
Managed in Events
Displayed in Overview, Business, Hiring, Learning, Feed, and Search

Content
Managed in Content Studio
Displayed in Posts, Feed, Overview, Business, and Search

Newsletter
Managed in Newsletter
Displayed in Newsletter, Feed, Email, and Overview

Review
Managed by Review Engine
Displayed in Trust, Jobs, Products, Services, and Comparison

Message
Managed by Messaging Engine
Displayed in all contextual inboxes

Trust Signal
Managed by Trust Engine
Displayed in Hero, Trust, Cards, Ranking, and Search

Action
Managed by Action Engine
Displayed in Dashboard, Action Center, and Workspaces

Analytics Event
Managed by Analytics Engine
Displayed across all dashboards

AI Output
Managed by Intelligent Engine
Displayed in the relevant context

====================================================================
PRODUCT SUCCESS AND GUARDRAILS
====================================================================

North Star:

Verified Organizational Outcomes

Examples:

- Verified hire
- Qualified business meeting
- Verified proposal
- Contract
- Supplier match
- Partnership
- Project
- Learning completion
- Internal mobility
- Investment
- Successful introduction
- Verified case study

Guardrails:

- Spam rate
- Unwanted messages
- Fake review rate
- False match rate
- Notification opt-out
- Company block rate
- Application abandonment
- Lead response delay
- Privacy complaints
- AI error reports
- Data export abuse
- Assessment misuse
- Candidate complaints
- Moderation warnings

Represent key metrics in dashboards and documentation.

====================================================================
FINAL ACCEPTANCE CRITERIA
====================================================================

The work is complete only when:

1. Existing Company Profile screens have been inspected.
2. Existing components are reused.
3. No major existing feature has been removed.
4. No duplicate Company Profile has been created.
5. No duplicate Jobs, Events, Learning, Products, Services, People, Messaging, Analytics, Trust, AI, or Opportunity system exists.
6. All missing public Company Profile sections are designed or extended.
7. All private admin workspaces are designed.
8. Business Workspace is integrated with the public Business tab.
9. Workforce Hub is separate from public People.
10. Hiring Workspace manages jobs without duplicating public Jobs.
11. Events remain independent and integrated.
12. Learning remains independent and integrated.
13. Products and Services remain independent and are consumed by Business.
14. Opportunity uses one unified data model.
15. AI uses one central intelligent engine.
16. Messaging uses one shared engine.
17. Analytics uses one shared event model.
18. Trust is explainable.
19. Reviews remain context-specific.
20. Consent and privacy are visible in relevant flows.
21. Human approval is required for sensitive AI actions.
22. Every major screen includes non-happy-path states.
23. Desktop, tablet, and mobile critical screens exist.
24. Accessibility rules are applied.
25. The design system is reusable and consistent.
26. Critical flows are prototyped.
27. Phase labels are clear.
28. Entity ownership is documented.
29. Integrations are shown instead of rebuilding full external enterprise products.
30. The final result feels like one integrated product, not a collection of disconnected dashboards.

====================================================================
FINAL INSTRUCTION
====================================================================

Do not begin by generating new screens blindly.

First inspect the existing Figma file.

Reuse what exists.

Extend what is incomplete.

Create only what is missing.

Do not remove previous Company Profile capabilities.

Do not create parallel systems.

Maintain one source of truth.

Connect every module to the relevant shared Hamrahe engines.

Use progressive disclosure to control complexity.

Design every module as part of one coherent Organization Operating System.

The final output must look and behave like a mature global professional and enterprise platform that can eventually compete beyond LinkedIn, while preserving Hamrahe’s unique identity, professional graph, skill graph, trust graph, opportunity graph, learning system, and verified-outcome model.