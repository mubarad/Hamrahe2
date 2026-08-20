Fix the existing Hamrahe Company Profile visibility, routing, and view logic.

Do not redesign the whole product.
Do not rebuild the Company Profile from scratch.
Do not remove existing screens.
Do not change the existing Hamrahe visual style.
Do not simplify or delete the existing Company Profile content.

The Company Profile has already been designed and generated.
The problem is that it is not clearly accessible in the prototype, and company/startup login still routes to the individual profile or individual area.

Your task is only to:
1. Make the existing Company Profile visible and accessible.
2. Fix organization/company login routing.
3. Fix startup login routing.
4. Separate individual profile from company profile.
5. Create or repair the two company profile views:
   - Company Public View
   - Company Admin / Owner View
6. Add correct prototype links between login, dashboard, company profile, public view, and admin view.
7. Make clicking any company name/logo open the public company profile.

Language and direction:
- English only
- Left-to-right layout
- Keep the current Hamrahe design style
- Keep the existing components and layouts as much as possible
- Only fix missing routes, missing screens, visibility, and view states

Important account types:
Hamrahe has three account types:
1. Individual User
2. Organization / Company
3. Startup / Early Team

These account types must not share the same default profile destination.

Routing rules:
- Individual login must route to Individual Home / Feed or Personal Profile.
- Organization / Company login must route to Company Admin Dashboard.
- Startup / Early Team login must route to Startup Admin Dashboard.
- Organization / Company login must never route to Individual Home, Individual Feed, Personal Profile, or Personal Profile Dashboard.
- Startup login must never route to Individual Home, Individual Feed, Personal Profile, or Personal Profile Dashboard.

Fix this current issue:
When the user logs in as an organization/company, the prototype currently opens the normal individual user profile. This is wrong.
Set the destination of the organization login submit button to Company Admin Dashboard.

Organization Login:
Make sure the Organization Login form has this title:
Log in as Organization

Fields:
- Username, National Company ID, Email, or Mobile Number
- Password

Primary button:
Log In to Organization Dashboard

This button must route to:
Company Admin Dashboard

Other actions:
- Log in with SMS Code
- Recover Organization Access
- Register Company or Startup
- Log in as Individual

Startup Login:
Make sure the Startup Login form has this title:
Log in as Startup or Early Team

Fields:
- Startup username, email, or mobile number
- Password

Primary button:
Log In to Startup Dashboard

This button must route to:
Startup Admin Dashboard

Important:
Companies and startups do not need to create a personal profile first.
They create an independent organization/startup account and add admins later.

Add this explanatory copy near organization/startup registration:
Companies and startups do not need to create a personal profile first. Create an independent organization account and add admins later.

Now fix the Company Profile view logic.

Every company must have two separate views:

1. Company Public View
This is the public-facing company profile.
This is what other users see.

It is shown to:
- Individual users
- Job seekers
- Logged-out visitors
- Other companies
- Startup accounts
- Company admins when they choose “View as Public”

2. Company Admin / Owner View
This is the management view of the same company profile.
This is what the company owner or authorized admins use to manage the page.

It is shown only to:
- Owner of that company page
- Company admins
- Authorized organization roles

Do not merge these two views into one confusing screen.
Public View and Admin View must be separate screens or clearly separate states.

Company Public View:
This view must be accessible when any user clicks a company name, logo, company card, job employer name, event host, post author, newsletter author, product owner, or company search result.

Core rule:
Whenever any user clicks on a company name, company logo, company card, employer name, job company name, event host company, newsletter author company, product company, verified company badge, company search result, or similar company card, route them to the Company Public View of that company.

This rule applies from:
- Home Feed
- Job cards
- Job detail pages
- Search results
- People profiles
- Experience section on personal profiles
- Messages
- Events
- Learning recommendations
- Posts
- Newsletter cards
- Products & Services
- Similar Companies
- Notifications / Alerts
- Saved Items
- Talent Pool
- Company comparison cards

Examples:
If an individual user clicks “Snapp” on a job card:
Route to Snapp Company Public View.

If an organization account clicks another company name:
Route to that other company’s Company Public View.

If a company admin clicks their own company name:
Route to Company Public View first, but show an “Admin View” or “Manage Company Page” button.

If a company admin clicks “Company Dashboard” or “Manage Company Page”:
Route to Company Admin / Owner View.

Company Public View must include:
- Company Hero
- Cover image
- Company logo
- Company name
- Verification badge
- Company type
- Industry
- Location / headquarters
- Company size
- Work model
- Followers
- Confirmed employees on Hamrahe
- Open jobs count
- Response time
- Activity status
- Follow button
- View Jobs button
- Join Talent Pool button
- Contact button
- Save button
- Report button

For logged-in individual users, also show:
- Company Match Score
- Application Readiness Score
- Best Next Step
- Decision Summary
- Featured for You
- Your Journey with this Company

Company Public View tabs:
- Overview
- Jobs
- Learning
- Events
- People
- Posts
- Newsletter
- Products
- Trust

Company Public View must not show admin-only tools.

Do not show these in Company Public View:
- Edit Profile
- Create Job
- Attach Assessment
- Applicant Tracking
- Company Admin Dashboard
- Billing
- Audit Log
- Admin Roles
- Data Export
- Moderation Center
- Legal Settings
- Internal Team Mode
- Company Setup Journey
- Admin Analytics
- Privacy admin controls
- Integration settings

Exception:
If the logged-in user is an admin of this company, show only a small button:
Admin View
or
Manage Company Page

This button must route to:
Company Admin / Owner View

Company Admin / Owner View:
This is the management view of the company profile.

It must include:
- Admin View label
- Company name and logo
- Verification status
- Profile Completion
- Employer Brand Score
- Trust Level
- Company Profile Health
- Company Reputation
- Moderation Status
- Active Jobs
- Pending Applications
- Talent Pool
- Business Inquiries
- Upcoming Events
- Admin actions

Admin actions:
- View as Public
- Edit Profile
- Create Job
- Attach Assessment
- Create Event
- Publish Post
- Start Verification
- Invite Admin

Company Admin / Owner View tabs:
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
- Verification
- Admins
- Privacy
- Audit Log
- Moderation
- Legal
- Integrations
- Billing
- Settings

Clicking “View as Public” from Company Admin / Owner View must route to:
Company Public View

Clicking “Admin View” from Company Public View must route back to:
Company Admin / Owner View

Company Admin Dashboard:
This must be the landing screen after organization login.

Company Admin Dashboard must be clearly different from Individual Home and Personal Profile.

Company Admin Dashboard must include:
- Company name
- Company logo
- Verification status
- Profile Completion
- Employer Brand Score
- Trust Level
- Company Profile Health
- Company Reputation
- Moderation Status
- Active Jobs
- Pending Applications
- Talent Pool
- Business Inquiries
- Upcoming Events
- Admin actions
- Setup Journey
- Next Best Actions

Admin actions:
- View Company Profile
- Edit Profile
- Create Job
- Attach Assessment
- Create Event
- Publish Post
- Start Verification
- Invite Admin

Clicking “View Company Profile” from Company Admin Dashboard must route to:
Company Admin / Owner View

Also include a “View as Public” button inside Company Admin / Owner View.

Organization account navigation:
Add or fix an organization sidebar/top navigation.

Organization navigation items:
- Company Dashboard
- Company Profile
- Jobs
- Applicants
- Learning & Assessments
- Events
- Messages
- Talent Pool
- Analytics
- Verification
- Admins
- Privacy
- Audit Log
- Moderation
- Legal
- Integrations
- Billing
- Settings

Rules:
- Clicking Company Dashboard routes to Company Admin Dashboard.
- Clicking Company Profile routes to Company Admin / Owner View.
- Clicking another company’s name from anywhere routes to that other company’s Company Public View, not admin view.
- Organization account must not show Personal Profile as its default destination.

Individual account navigation:
Keep the normal individual navigation:
- Home
- Network
- Jobs
- Learning
- Messages
- Alerts
- Profile

Do not show Company Admin navigation for individual users.

Startup account:
Startup accounts follow the same logic as company accounts.

Startup login must route to:
Startup Admin Dashboard

Startup Admin Dashboard must route to:
Startup Admin / Owner View

Startup Admin / Owner View must have:
- View as Public button
- Startup Public View route

Clicking startup name/logo anywhere must route to:
Startup Public View

Required screens to create or fix:
- Entry Gateway
- Individual Login
- Organization Login
- Startup Login
- Register Company or Startup
- Individual Home / Feed
- Individual Personal Profile
- Company Admin Dashboard
- Company Public View
- Company Admin / Owner View
- Startup Admin Dashboard
- Startup Public View
- Startup Admin / Owner View

Important:
If these screens already exist, do not duplicate them unnecessarily.
Instead, make them visible, clearly named, and correctly linked in the prototype.

Create or update the following route map screens:

1. Auth Routing Map

It must show:
Entry Gateway
→ Individual Login
→ Individual Home / Personal Profile

Entry Gateway
→ Organization Login
→ Company Admin Dashboard
→ Company Admin / Owner View
→ View as Public
→ Company Public View

Entry Gateway
→ Startup Login
→ Startup Admin Dashboard
→ Startup Admin / Owner View
→ View as Public
→ Startup Public View

2. Company Profile View Logic Map

It must show:
Any user clicks company name/logo/card
→ Company Public View

Individual user clicks company name
→ Company Public View

Organization account clicks another company
→ Other Company Public View

Company admin clicks own company name
→ Company Public View
→ Admin View button visible
→ Company Admin / Owner View

Organization login
→ Company Admin Dashboard
→ Company Admin / Owner View
→ View as Public
→ Company Public View

Startup login
→ Startup Admin Dashboard
→ Startup Admin / Owner View
→ View as Public
→ Startup Public View

Final prototype link requirements:
Make these prototype links functional:
- Entry Gateway → Individual Login
- Entry Gateway → Organization Login
- Entry Gateway → Startup Login
- Entry Gateway → Register Company or Startup
- Individual Login submit → Individual Home / Feed
- Organization Login submit → Company Admin Dashboard
- Startup Login submit → Startup Admin Dashboard
- Company Admin Dashboard → Company Admin / Owner View
- Company Admin / Owner View → View as Public → Company Public View
- Company Public View → Admin View → Company Admin / Owner View, only for company admin
- Startup Admin Dashboard → Startup Admin / Owner View
- Startup Admin / Owner View → View as Public → Startup Public View
- Startup Public View → Admin View → Startup Admin / Owner View, only for startup admin
- Any company name/logo/card anywhere → Company Public View
- Any startup name/logo/card anywhere → Startup Public View
- Organization sidebar Company Profile → Company Admin / Owner View
- Organization sidebar Company Dashboard → Company Admin Dashboard
- Organization account clicking another company → Other Company Public View
- Job card company name → Company Public View
- Event host company name → Company Public View
- Newsletter author company name → Company Public View
- Product owner company name → Company Public View
- Similar company card → that company’s Company Public View

Final checks:
- Company Profile must be visible in the prototype.
- Company Admin Dashboard must be visible in the prototype.
- Company Public View must be visible in the prototype.
- Company Admin / Owner View must be visible in the prototype.
- Organization login must not open Personal Profile.
- Startup login must not open Personal Profile.
- Clicking company names must open Company Public View.
- Public users must not see admin-only controls.
- Company admins must be able to switch between Public View and Admin View.
- Individual profile and company profile must be separate.
- Company Public View is what the world sees.
- Company Admin / Owner View is what the company owner manages.