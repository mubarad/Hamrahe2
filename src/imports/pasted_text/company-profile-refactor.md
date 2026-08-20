Fix the current Hamrahe company and startup profile experience.

Do not redesign the whole product from scratch.
Do not rebuild the company profile content.
Do not remove the existing Company Profile sections.
Do not change the current Hamrahe visual style and components.
Only fix the structure, routing, account identity, view logic, company profile behavior, and interactions.

Language and direction:
- English only
- Left-to-right layout
- Do not use Persian or RTL in this version
- Keep the UI professional, modern, clean, and premium
- Keep the experience similar to a professional network profile page, not a back-office system

The current implementation is wrong.

Current wrong behavior:
1. After company login, the product still shows an individual/personal profile identity in the top-right area.
2. A separate button called “Company Portal” appears next to the personal profile.
3. A separate “Company Dashboard” or “Organization Portal” page was created.
4. Company tools are separated into that dashboard/portal.
5. Company Profile and Company Dashboard are treated as two different destinations.
6. Company names/logos across the product are not consistently clickable.
7. Buttons inside the Company Profile are static and do not perform their own actions.

This is wrong.

Correct product model:
There must be no separate Company Portal.
There must be no separate Company Dashboard.
There must be no Organization Portal.
There must be no back-office dashboard as the main company destination.

The company profile itself is the company account home, workspace, and management area.

Company Login must route directly to:
Company Profile in Owner/Admin Mode

Startup Login must route directly to:
Startup Profile in Owner/Admin Mode

Individual Login must route to:
Individual Home / Feed or Individual Personal Profile

Important:
A company account must not use the individual personal profile as its main identity.
When logged in as a company, the top-right identity must show the company identity, not the personal user identity.

Replace the wrong top-right identity:

Wrong:
[Personal avatar] Ahmad
[Company Portal]

Correct:
[Company logo] Snapp
Company Account
[View as Public] [Settings]

For startup accounts:
[Startup logo] Startup Name
Startup Account
[View as Public] [Settings]

If an admin person is associated with the company account, show that person only inside an account/admin menu.
Do not show the person as the main profile identity for a company account.

Remove or stop using these elements:
- Company Portal button
- Organization Portal label
- Separate Company Dashboard as a main page
- Separate back-office style dashboard
- Personal profile avatar/name as the main identity for company accounts
- Any route from company login to Individual Profile
- Any route from company login to Individual Home / Feed

Core structure:
There is ONE main Company Profile page.
This same Company Profile page has two modes:

1. Public Mode
Shown to:
- Individual users
- Job seekers
- Logged-out visitors
- Other companies
- Startup accounts
- Anyone clicking a company name/logo

2. Owner/Admin Mode
Shown only when the logged-in account owns or manages that company.

Important:
Owner/Admin Mode is not a separate portal.
Owner/Admin Mode is the same Company Profile page with admin tools, admin tabs, and management cards visible.

Company Profile Owner/Admin Mode:
This is the main destination after company login.

It must look like a company profile page first, not like a system dashboard.

The top hero must include:
- Cover image
- Company logo
- Company name
- Verified Company badge
- Company type
- Industry
- Location
- Company size
- Work model
- Followers
- Confirmed employees
- Open jobs
- Response time
- Activity status

Inside the same profile page, show admin controls:
- View as Public
- Edit Profile
- Create Job
- Attach Assessment
- Create Event
- Publish Post
- Start Verification
- Invite Admin
- Manage Applicants
- Manage Talent Pool
- Messages
- Analytics
- Privacy
- Settings

Do not place these tools inside a separate dashboard.
Show them inside the Company Profile page as:
- Admin action bar
- Owner/Admin tabs
- Cards inside Overview
- Side panels
- Modals
- Management sections

Company Profile tabs:
Use one tab system inside the same Company Profile page.

Public/base tabs:
- Overview
- Jobs
- Learning
- Events
- People
- Posts
- Newsletter
- Products
- Trust

Extra tabs visible only in Owner/Admin Mode:
- Applicants
- Talent Pool
- Messages
- Analytics
- Admins
- Privacy
- Audit Log
- Moderation
- Legal
- Integrations
- Billing
- Settings

These extra tabs are not separate dashboard pages.
They are tabs or sections inside the same Company Profile page.

Owner/Admin Overview:
Merge all useful dashboard cards into the Overview tab of the Company Profile Owner/Admin Mode.

Inside the Overview tab, show admin summary cards:
- Profile Completion: 64%
- Employer Brand Score: 42/100
- Trust Level: Basic Verified
- Company Profile Health: 74/100
- Company Reputation: Good
- Moderation Status: Clean
- Active Jobs: 12
- Pending Applicants: 28
- Talent Pool: 340
- Business Inquiries: 12
- Upcoming Events: 1

Also show Admin Next Best Actions inside the same Company Profile page:
- Complete Why Work Here section
- Add hiring process details
- Attach assessments to active jobs
- Improve job quality score
- Invite employees to confirm profiles
- Publish newsletter
- Enable contact routing
- Review privacy settings
- Accept hiring policies

Company Public Mode:
This is the public version of the same Company Profile.

It must include:
- Company Hero
- Verification badge
- Follow
- View Jobs
- Join Talent Pool
- Contact
- Save
- Report
- Overview
- Jobs
- Learning
- Events
- People
- Posts
- Newsletter
- Products
- Trust

For logged-in individual users, also show:
- Company Match Score
- Application Readiness Score
- Best Next Step
- Decision Summary
- Featured for You
- Your Journey with this Company

Company Public Mode must NOT show:
- Edit Profile
- Create Job
- Attach Assessment
- Applicant Tracking
- Billing
- Audit Log
- Admin Roles
- Data Export
- Moderation Center
- Legal Settings
- Internal Team Mode
- Company Setup Journey
- Admin-only analytics
- Integration settings

Exception:
If the viewer is the owner/admin of this company, show a small button:
Admin View
or
Manage Page

Clicking this button switches the same Company Profile to Owner/Admin Mode.

View switching:
- View as Public from Owner/Admin Mode → same Company Profile in Public Mode
- Admin View from Public Mode → same Company Profile in Owner/Admin Mode, only if the viewer is the owner/admin

Startup Profile:
Apply the exact same model to startups.

Startup Login must route to:
Startup Profile in Owner/Admin Mode

Startup profile must not have:
- Separate Startup Portal
- Separate Startup Dashboard
- Personal profile as main identity

Startup Profile must have:
- Public Mode
- Owner/Admin Mode
- Same page, different visible permissions

Navigation behavior:
If logged in as individual:
Top-right identity shows individual profile.

If logged in as company:
Top-right identity shows company profile.

If logged in as startup:
Top-right identity shows startup profile.

Company account top navigation should include:
- Company Profile
- Jobs
- Applicants
- Learning & Assessments
- Events
- People
- Posts
- Newsletter
- Products
- Talent Pool
- Messages
- Analytics
- Trust
- Settings

Important:
These navigation items must route to tabs or sections inside the Company Profile page.
They must not route to a separate dashboard or portal.

Routing rules:
- Company Login submit → Company Profile, Owner/Admin Mode
- Startup Login submit → Startup Profile, Owner/Admin Mode
- Individual Login submit → Individual Home / Feed or Individual Personal Profile
- Clicking own company name/logo → Company Profile, Owner/Admin Mode or Public Mode with Admin View available
- Clicking any other company name/logo/card anywhere → that company’s Company Profile in Public Mode
- Clicking any startup name/logo/card anywhere → that startup’s Startup Profile in Public Mode
- Clicking “View as Public” from Owner/Admin Mode → same profile in Public Mode
- Clicking “Admin View” or “Manage Page” from Public Mode, only for owner/admin → same profile in Owner/Admin Mode

Company-to-company browsing:
Company accounts must be able to view other companies’ public profiles.

Example:
If Snapp is logged in:
- Clicking Snapp → Snapp Company Profile in Owner/Admin Mode or Public Mode with Admin View
- Clicking Digikala → Digikala Company Profile in Public Mode
- Clicking Behsa → Behsa Company Profile in Public Mode
- Clicking Hamrahe Aval → Hamrahe Aval Company Profile in Public Mode

Any company name/logo/card across the product must be clickable and open that specific company’s Public Mode.

Apply this clickable company rule to:
- Home Feed company post author
- Job cards employer name
- Job detail company name
- Search result company cards
- People profile experience section
- Event host company
- Newsletter author company
- Product / Service owner company
- Similar Companies cards
- Company comparison cards
- Messages company sender
- Notifications / Alerts mentioning company
- Saved Companies
- Talent Pool company references
- Learning recommendations related to companies

For every company entity:
Click → Open that company’s Company Profile in Public Mode

Do not route company entity clicks to:
- Individual profile
- Company Portal
- Company Dashboard
- Logged-in company’s own profile unless the clicked company is actually the logged-in company
- Empty page
- Generic company list

If existing Company Dashboard screen exists:
Do not use it as a separate destination.
Move its useful cards and sections into Company Profile Owner/Admin Mode, mostly inside Overview and Analytics tabs.
After merging, remove it from primary navigation and login routing.

If existing Company Portal button exists:
Remove it completely.
Do not show it beside the personal profile.
Do not show it beside the company profile either.

If existing Company Public View exists:
Keep it as Public Mode of the same Company Profile.

If existing Company Admin Dashboard exists:
Merge its content into Company Profile Owner/Admin Mode.
Do not keep it as a separate destination.

Rename screens if needed:
Use these exact screen names:
- Individual Home / Feed
- Individual Personal Profile
- Company Profile
- Company Profile / Public Mode
- Company Profile / Owner Admin Mode
- Startup Profile
- Startup Profile / Public Mode
- Startup Profile / Owner Admin Mode

Do not use these screen names:
- Company Portal
- Organization Portal
- Company Dashboard
- Admin Dashboard
- Back Office
- Organization Back Office

Final required header behavior:
When logged in as company:
Top-right identity must be company identity.

Correct:
[Company logo] Snapp
Company Account

Wrong:
[Personal avatar] Ahmad
Company Portal

When logged in as startup:
Top-right identity must be startup identity.

When logged in as individual:
Top-right identity must be individual identity.

Interactive button and action behavior:
All buttons, CTAs, tabs, cards, links, icons, dropdowns, and clickable elements inside the Company Profile must be functional in the prototype.

Do not leave any button as a static decorative element.
Every button must either:
1. Navigate to the correct screen/tab/state
2. Open the correct modal
3. Open the correct side panel
4. Trigger the correct UI state
5. Show a clear placeholder state if the full flow is not designed yet

Company Profile buttons must have their own specific actions.

Hero buttons:
- Follow → change to Following state
- View Jobs → scroll or switch to Jobs tab
- Join Talent Pool → open Join Talent Pool modal
- Contact → open Contact Routing modal
- Save → change to Saved state
- Report → open Report Company modal
- View as Public → switch to Public Mode
- Admin View / Manage Page → switch to Owner/Admin Mode
- Edit Profile → open Edit Company Profile modal or edit state

Admin action buttons:
- Create Job → open Create Job flow or modal
- Attach Assessment → open Assessment Library / Attach Assessment modal
- Create Event → open Create Event flow or modal
- Publish Post → open Create Post composer
- Start Verification → open Verification Center flow
- Invite Admin → open Invite Admin modal
- Manage Applicants → switch to Applicants tab
- Manage Talent Pool → switch to Talent Pool tab
- Messages → switch to Messages tab
- Analytics → switch to Analytics tab
- Privacy → switch to Privacy tab
- Settings → switch to Settings tab

Tab behavior:
All tabs inside the Company Profile must be clickable and must switch to their related content:
- Overview
- Jobs
- Applicants
- Learning & Assessments
- Events
- People
- Posts
- Newsletter
- Products
- Talent Pool
- Messages
- Analytics
- Trust
- Admins
- Privacy
- Audit Log
- Moderation
- Legal
- Integrations
- Billing
- Settings

Job actions:
- View Job → open Job Detail page/modal
- Apply → open Apply flow
- Save Job → change to Saved state
- Start Assessment → open required assessment flow
- Start Learning → open related learning path

Learning & Assessment actions:
- Start Preparation → open learning path detail
- Start Assessment → open assessment start screen
- View Result → open assessment result preview
- Change Visibility → open privacy/visibility selector

Event actions:
- Register → change to Registered state or open registration modal
- View Details → open event detail page/modal
- Add to Calendar → show calendar confirmation state

People actions:
- Message Hiring Team → open message composer
- View Profile → open person profile
- Confirm Employee → open employee confirmation flow
- Invite Employee → open invite employee modal

Posts and Newsletter actions:
- Subscribe → change to Subscribed state
- Read Issue → open newsletter issue
- Share → open share modal
- Publish Post → open post composer

Products and Services actions:
- Learn More → open product/service detail
- Contact Company → open Contact Routing modal
- Request Demo → open request demo modal
- Book Meeting → open booking modal

Trust actions:
- View Verification Details → open verification details panel
- Report Company → open report modal
- View Assessment Privacy → open assessment privacy panel

Admin and safety actions:
- Export Applicants → open Data Export modal
- View Audit Log → switch to Audit Log tab
- Appeal Moderation → open appeal modal
- Accept Policy → change checkbox/status to accepted
- Connect Integration → open integration connection modal

Company entity links:
Every company name, logo, card, employer name, event host, newsletter author, product owner, and similar company card must be clickable.
Clicking any company entity must open that specific company’s Company Profile in Public Mode.

State feedback:
Every click must provide visible feedback:
- Button state changes
- Modal opens
- Tab content changes
- Toast confirmation appears
- Status changes from default to active/selected/saved/registered/subscribed/following

If a full backend action cannot be simulated, create a clear prototype state such as:
- Success confirmation modal
- Saved state
- Following state
- Registered state
- Submitted state
- Pending review state

Final interaction requirement:
The Company Profile prototype must feel clickable and usable, not like a static mockup.
All major buttons and navigation elements must have meaningful prototype interactions.

Final required product logic:
There is one Company Profile page.
It has two modes:
- Public Mode
- Owner/Admin Mode

There is one Startup Profile page.
It has two modes:
- Public Mode
- Owner/Admin Mode

Company account home is the Company Profile in Owner/Admin Mode.
Startup account home is the Startup Profile in Owner/Admin Mode.
Individual account home is the Individual Home or Personal Profile.

Final requirement:
After company login, the user must land directly on the company profile itself in Owner/Admin Mode.
The top-right identity must show the company, not the individual user.
All company features must be inside the company profile page.
There must be no separate company portal.
There must be no separate dashboard.
Company tools must be integrated into the company profile, similar to a professional network company page experience.
Do not create dead buttons. Every visible button inside the Company Profile must have a prototype interaction, destination, modal, state change, or confirmation feedback.