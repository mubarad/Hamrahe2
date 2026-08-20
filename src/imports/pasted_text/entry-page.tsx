Use Claude Sonnet 4.6 if available.

Create the first entry page of the Hamrahe website/app.

This page is extremely important because it is the first screen users see after entering the website address. It is not a traditional landing page, but it must still create a powerful first impression. It should feel like the gateway to the user’s professional future, not just another boring sign-up form.

Important routing rule:
When a user opens Hamrahe for the first time, this page must be the first screen they see.
The only exception is when the user is already logged in and their session is saved. In that case:
- Individual users should be redirected to their personal feed or profile completion flow.
- Organization users should be redirected to their organization dashboard.
- Startup users should be redirected to their startup dashboard.
If the user is not logged in, always show this entry page first.

Language and direction:
- English only
- Left-to-right layout
- Do not use Persian or RTL in this version

Product context:
Hamrahe is a professional networking platform for individuals, companies, and startups.
It is in the same broad category as LinkedIn, but it must not copy LinkedIn.
Hamrahe separates individual accounts and organization accounts from the beginning.
Companies and startups do not need to create a personal profile first.
They can create an independent organization account and later add individual users as admins with specific permissions.

Core tagline:
“Hamrahe; Where Opportunity Moves With You”

Main emotional goal:
The page should make users feel:
“This is not just a sign-up page. This is where I start building my professional future.”

Main product goal:
The page must act as a single central gateway for:
1. Individual sign up
2. Individual login
3. Organization / startup sign up
4. Organization login

Do not create a long landing page.
Do not create multiple marketing sections.
Do not create a scrolling website with many sections.
Keep it as one premium gateway screen with interactive forms, panels, modals, or cards.

Design direction:
- Premium
- Modern
- Professional
- Inspiring
- Clean
- High-end SaaS / professional network feel
- Visually impressive as the first website screen
- Not childish
- Not too corporate or boring
- Not an old login form
- Not generic startup illustration style
- Avoid cartoonish people illustrations
- Use polished cards, subtle gradients, soft shadows, glass-like depth if appropriate, and clean hierarchy
- Use a futuristic but trustworthy visual language
- The design should feel serious, credible, and aspirational
- Match the current Hamrahe demo style as much as possible
- Keep forms short and low-friction
- Heavy actions should happen later inside the dashboard

Suggested layout:
Use a split or centered premium gateway layout.

Top:
- Hamrahe logo on the top-left
- Small “Log In” action on the top-right

Main hero:
Headline:
“Hamrahe; Where Opportunity Moves With You”

Subheadline:
“Build your professional identity, showcase your credibility, and connect with real opportunities through people, companies, and startups.”

Supporting emotional line:
“Create your path, build trust, and move toward better opportunities.”

Main visual idea:
Create a premium network-style visual showing the connection between:
- Individual profile
- Company page
- Startup page
- Opportunity card
- Trust badge
- Employer brand
- Hiring / career path

The visual should make the page feel like a professional future gateway, not just a form.

Default gateway state:
Show two main path cards:

Card 1:
Title:
“For Individuals”

Description:
“Build your professional profile, showcase your skills and experience, grow your network, and connect with better career opportunities.”

Primary CTA:
“Create Individual Account”

Secondary CTA:
“Log in as Individual”

Card 2:
Title:
“For Organizations & Startups”

Description:
“Create your company or startup page, build your employer brand, showcase your team and culture, and attract the right talent.”

Primary CTA:
“Register Company or Startup”

Secondary CTA:
“Log in as Organization”

Important note under the cards:
“Companies and startups do not need to create a personal profile first. Create an independent organization account and add admins later.”

Trust cards at the bottom:
Create three small trust cards.

Trust Card 1:
Title:
“Professional Identity”
Text:
“Build your profile, skills, experience, and credibility.”

Trust Card 2:
Title:
“Employer Brand”
Text:
“Showcase your company, culture, team, and opportunities.”

Trust Card 3:
Title:
“Layered Trust”
Text:
“National company ID for registered companies, flexible trust levels for startups.”

Interaction model:
The page should support these states:
1. Default gateway state
2. Individual sign up
3. Individual login
4. Organization / startup sign up choice
5. Registered company sign up
6. Startup or early team sign up
7. Organization login
8. Mobile verification
9. Organization access recovery
10. Success states
11. Duplicate company state

The forms should open on the same page as premium panels, right-side cards, or modal-style cards.
Do not navigate to separate landing pages.
Keep the brand context visible while forms are open.

State 1: Default Gateway
Show:
- Logo
- Hero headline
- Subheadline
- Two main cards
- Important note
- Three trust cards
- Premium background visual

State 2: Individual Sign Up
Triggered by:
“Create Individual Account”

Panel title:
“Create Individual Account”

Subtitle:
“Start building your professional identity and unlock your profile on Hamrahe.”

Fields:
- First Name
- Last Name
- Mobile Number
- Email Address (Optional)
- Password
- Confirm Password

Checkbox:
“I agree to Hamrahe’s Terms and Privacy Policy.”

Primary CTA:
“Create Account”

Secondary link:
“Already have an account? Log in”

After submission flow:
Create account → Mobile verification → Individual profile completion

Success state:
Title:
“Your account has been created”
Text:
“Complete your professional profile to start building credibility and connecting with opportunities.”
CTA:
“Complete My Profile”

State 3: Individual Login
Triggered by:
“Log in as Individual”

Panel title:
“Log in as Individual”

Subtitle:
“Access your professional profile, network, messages, and career opportunities.”

Fields:
- Mobile Number or Email Address
- Password

Options:
- Remember me
- Forgot password?

Primary CTA:
“Log In”

Alternative CTA:
“Log in with SMS Code”

Secondary link:
“Don’t have an account? Create Individual Account”

After login behavior:
- If profile is incomplete, redirect to profile completion.
- If profile is complete, redirect to feed or last active page.

State 4: Organization / Startup Sign Up Choice
Triggered by:
“Register Company or Startup”

Panel title:
“Create Organization Account”

Subtitle:
“Choose the type of page you want to create. You can complete your profile, employer brand, verification, and admin settings later from your dashboard.”

Show two option cards:

Option A:
Title:
“Registered Company”
Description:
“For companies that are officially registered and have a national company ID.”
CTA:
“Register Company”

Option B:
Title:
“Startup or Early Team”
Description:
“For startups, early-stage teams, and new brands that have not officially registered a company yet.”
CTA:
“Register Startup”

Secondary link:
“Already have an organization account? Log in”

State 5: Registered Company Sign Up
Triggered by:
“Register Company”

Panel title:
“Register Company”

Subtitle:
“Create your organization account. You can complete your company profile, employer brand, and full verification later from the dashboard.”

Fields:
- Company Name
- National Company ID
- Industry
- Main City
- Company Size
- Company Username
- Official Mobile Number
- Company Email Address (Optional)
- Password
- Confirm Password

Username preview:
“hamrahe.com/company/[username]”

Helper text under National Company ID:
“Your National Company ID is used to prevent fake or duplicate company pages. It will not be shown publicly on your company page.”

Checkbox:
“I confirm that I am authorized to create or manage this organization account.”

Primary CTA:
“Create Company Account”

Secondary link:
“Already have an organization account? Log in”

System behavior:
When National Company ID is entered, check if it already exists.

Duplicate company state:
Title:
“This company already exists on Hamrahe”

Text:
“If you are authorized to manage this company page, you can request access instead of creating a duplicate page.”

CTAs:
- “Request Access to Existing Company”
- “Edit Information”

After submission:
Send SMS verification code → Verify mobile number → Create company account → Redirect to company dashboard / profile setup

Success state:
Title:
“Your company account has been created”

Text:
“You can now complete your company profile, build your employer brand, and start the verification process to unlock hiring features.”

CTAs:
- “Go to Company Dashboard”
- “Complete Company Profile”
- “Start Verification”

State 6: Startup or Early Team Sign Up
Triggered by:
“Register Startup”

Panel title:
“Register Startup or Early Team”

Subtitle:
“Create an early organization page without official company registration. You can build your profile now and increase trust level later.”

Fields:
- Startup or Team Name
- Industry
- Stage
- Main City
- Page Username
- Mobile Number
- Email Address (Optional)
- Website or Official Page (Optional)
- Password
- Confirm Password

Stage dropdown options:
- Idea Stage
- Building Product
- Prototype / MVP
- Active Product
- Has Early Users or Customers
- Fundraising
- In Company Registration Process

Username preview:
“hamrahe.com/startup/[username]”

Checkbox:
“I confirm that I am authorized to create or manage this startup page.”

Primary CTA:
“Create Startup Account”

Secondary link:
“Already have an organization account? Log in”

After submission:
Send SMS verification code → Verify mobile number → Create startup account → Redirect to startup dashboard / profile setup

Success state:
Title:
“Your startup page has been created”

Text:
“You can now complete your startup profile, introduce your team and product, and increase your trust level over time. Once your company is officially registered, you can upgrade this page to a verified company account.”

CTAs:
- “Go to Startup Dashboard”
- “Complete Startup Profile”
- “Increase Trust Level”

Important startup logic:
Startups must not be forced to provide National Company ID.
Startup accounts should be positioned as early organization pages with trust level that can grow over time.
Do not call startups “verified companies”.
Use softer language like:
“Startup page”
“Early organization page”
“Trust level”
“Upgrade to verified company later”

State 7: Organization Login
Triggered by:
“Log in as Organization”

Panel title:
“Log in as Organization”

Subtitle:
“Access your company or startup account and manage your profile, employer brand, admins, and hiring tools.”

Fields:
- Username, National Company ID, Email, or Mobile Number
- Password

Options:
- Remember me
- Forgot password?

Primary CTA:
“Log In to Organization Dashboard”

Alternative CTA:
“Log in with SMS Code”

Links:
- “Register Company or Startup”
- “Recover Organization Access”
- “Log in as Individual”

Helper text:
“If email access is interrupted, you can use your registered mobile number and SMS code to log in.”

Important logic:
Organization login must not depend only on email, because in Iran users may face internet or email access issues.
Allow login using:
- Organization username
- National Company ID
- Email
- Registered mobile number

After login system behavior:
- If account setup is incomplete, continue setup.
- If mobile is not verified, show mobile verification.
- If company profile is incomplete, show company profile setup prompt.
- If verification is pending, show dashboard with verification notice.
- If account is active, show organization dashboard.
- If account is restricted, show restricted account screen.

State 8: Mobile Verification
Shared across all sign up paths.

Panel title:
“Verify Mobile Number”

Subtitle:
“Enter the code sent to your mobile number.”

Field:
- Verification Code

CTA:
“Verify and Continue”

Links:
- “Resend Code”
- “Change Mobile Number”

Error state:
“The code you entered is incorrect. Please try again.”

Success state:
“Mobile number verified successfully.”

State 9: Organization Access Recovery
Triggered by:
“Recover Organization Access”

Panel title:
“Recover Organization Access”

Subtitle:
“Use this if you no longer have access to the organization account, previous login credentials, or the person who created the account has left the company.”

Fields:
- Company or Startup Name
- National Company ID (If Registered Company)
- Registered Mobile Number or Contact Number
- Your Full Name
- Your Role
- Description of Request
- Supporting Document (Optional)

Primary CTA:
“Submit Access Recovery Request”

Success state:
Title:
“Your request has been submitted”

Text:
“Hamrahe’s support team will review your request and contact you if more information is needed.”

Visual requirements:
- The default gateway must feel visually impressive and inspiring.
- It must not look like a plain login page.
- It must not become a long landing page.
- It must feel like a premium professional gateway.
- The hero and forms should feel integrated.
- The user should feel that joining Hamrahe is a meaningful professional step.
- Use elegant motion or subtle interaction hints if possible.
- Use clean form validation states.
- Use polished success and error states.
- Use modern, premium UI components.
- Keep the interface focused and uncluttered.
- Avoid excessive text on screen.
- Avoid long scrolling sections.
- Avoid generic stock visuals.

Business and product rules:
- Individual accounts and organization accounts are separate from the beginning.
- Companies and startups do not need to create a personal profile first.
- Companies create independent organization accounts.
- Later, inside the organization dashboard, they can add personal accounts as admins with different access levels.
- Registered companies must provide National Company ID during sign up to prevent fake or duplicate company pages.
- Startups do not need National Company ID.
- Heavy actions must happen later inside the dashboard:
  - Full company verification
  - Employer brand setup
  - Admin management
  - Hiring tools
  - Payment plans
  - Detailed company profile completion

Final output:
Create a realistic, clickable, premium first-entry experience for the Hamrahe demo.
The result should include the default gateway screen and all major interactive states as connected prototype screens or panels.