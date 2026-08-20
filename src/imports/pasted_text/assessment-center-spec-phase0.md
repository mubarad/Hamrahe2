Create the complete Phase 0 product specification for Hamrahe Assessment Center.

Context:
Hamrahe is a professional network for professionals, candidates, students, employees, companies, recruiters, and partner organizations.

Assessment Center is one of the core systems of Hamrahe. It is not a simple test page, not a course platform, not a badge system, and not a generic quiz library.

Assessment Center is a standardized, English-first, report-driven, privacy-first assessment infrastructure connected to the personal profile, company hiring flows, downloadable reports, controlled sharing, resume/export, and professional development.

Important:
This phase is ONLY for the master structure and infrastructure of Assessment Center.
Do NOT design the actual question banks for the first 10 assessments in this phase.
Do NOT create MBTI questions, DISC questions, Big Five questions, Holland questions, EQ questions, or any actual test content in this phase.
The detailed design of each assessment will be done in separate later phases.

The goal of this phase is to define:
- Product architecture
- Master assessment library
- Data model
- Default assessment model
- User flows
- Admin flows
- Profile integration
- Report model
- Company sharing model
- Privacy and consent model
- Timing and attempt model
- Quality status model
- Launch batch planning
- Future scalability

Language Rules:
- Assessment content must be English-only for now.
- Assessment names, descriptions, instructions, questions, answer options, result labels, analytical reports, PDF reports, and company summaries must be designed in English.
- Internal explanations and product documentation may include Persian explanations if needed.
- Later, after the full platform is localized, Persian versions of assessments and reports can be added.
- For now, define the system as English-first.

Core Product Rules:
1. Assessment Center is different from Career Path.
2. Role-specific technical or professional skill tests belong inside their related Career Path.
3. Assessment Center is for independent, general, standardized assessments such as personality, work style, communication, cognitive ability, career interest, emotional intelligence, general AI readiness, interview readiness, company-requested assessments, and employee development assessments.
4. Assessment results must not be treated mainly as badges.
5. Assessment results must appear inside a structured personal profile section called “Assessment & Reports”.
6. All assessment results are private by default.
7. Users control what they share with companies.
8. Every completed assessment must generate:
   - Full User Report
   - Company Summary
   - Profile Summary
   - Downloadable PDF
   - Verification Link / QR Code
   - Privacy and Sharing Controls
9. Every assessment must have standard timing rules.
10. Draft only applies before the user starts an assessment or inside admin setup.
11. Once the user starts an assessment, it becomes a UserAssessmentAttempt with an active status and timing rules.
12. Every attempt must track start time, remaining time, submit status, auto-submit status, expiry, abandonment, completion, and retake eligibility.
13. Companies can request assessments, but they cannot see sensitive raw results without user consent.
14. Companies cannot use personality or sensitive assessments as the sole basis for hiring decisions.
15. The system must support report download, report verification, controlled sharing, and resume/export integration.

Define the complete specification using the following structure:

1. Product Definition
Explain what Hamrahe Assessment Center is.
Explain its purpose.
Explain why it exists inside Hamrahe.
Explain how it creates value for:
- users
- job seekers
- students
- employees
- companies
- recruiters
- HR teams
- partner organizations

2. Boundary Between Assessment Center and Career Path
Clearly define:
- What belongs inside Assessment Center
- What belongs inside Career Path
- What must never be mixed

Assessment Center examples:
- MBTI
- DISC / DiSC
- Big Five Personality
- NEO
- Holland / RIASEC
- EQ
- Logical Reasoning
- Work Style Assessment
- Communication Style
- Interview Readiness
- General AI Readiness
- Company-requested general assessments
- Employee development assessments

Career Path examples:
- UI Design practice test
- Product Designer final readiness test
- Frontend coding test
- Sales pitch simulation
- Digital marketing campaign review
- Portfolio case study review
- Role-specific AI practice test

Make the rule explicit:
If the test validates a role-specific professional skill, it belongs inside the related Career Path.
If the test is independent, general, behavioral, psychological, cognitive, communication-based, AI-readiness-based, hiring-readiness-based, or company-requested, it belongs inside Assessment Center.

3. Competitive Positioning
Explain how Hamrahe Assessment Center should compete with:
- LinkedIn
- Iranian job platforms
- test websites
- HR assessment tools

Important strategic statement:
Tests are not the advantage.
The assessment infrastructure is the advantage.

Explain the competitive advantage:
- English-first reports
- structured profile integration
- verified downloadable PDFs
- consent-based company sharing
- company request flow
- privacy by default
- assessment recommendation engine
- resume/export integration
- report verification
- professional company summaries
- quality status and validation layer

4. Master Assessment Library
Create the full master library of assessment families and assessments.

Assessment Families:

A. Personality & Psychology
- MBTI
- Big Five Personality
- NEO PI-R
- NEO-FFI
- HEXACO
- 16PF
- Enneagram
- Eysenck Personality Questionnaire
- California Psychological Inventory
- Self-awareness Profile

B. Work Style & Behavior
- DISC / DiSC
- Everything DiSC
- Thomas PPA
- Predictive Index Behavioral Assessment
- PAPI
- SHL OPQ
- Saville Wave
- Caliper Profile
- Birkman Method
- Work Style Assessment
- Communication Style
- Teamwork Style
- Conflict Style
- Feedback Style
- Decision-Making Style
- Stress Response
- Motivation Drivers
- Work Values

C. Career Interest & Career Direction
- Holland / RIASEC
- Strong Interest Inventory
- Self-Directed Search / SDS
- Schein Career Anchors
- Career Values Assessment
- Work Values Inventory
- Career Fit Assessment
- Career Direction Assessment
- Vocational Interest Assessment
- MAPP Career Assessment

D. Cognitive & Aptitude
- General Cognitive Ability
- IQ Test
- Raven Progressive Matrices
- Wonderlic
- CCAT
- Logical Reasoning
- Numerical Reasoning
- Verbal Reasoning
- Abstract Reasoning
- Inductive Reasoning
- Deductive Reasoning
- Diagrammatic Reasoning
- Spatial Reasoning
- Mechanical Reasoning
- Critical Thinking
- Watson-Glaser Critical Thinking
- Problem Solving
- Attention to Detail
- Pattern Recognition
- Learning Agility

E. Emotional & Social Intelligence
- Bar-On EQ-i
- EQ-i 2.0
- MSCEIT
- Emotional Intelligence Assessment
- Social Intelligence Assessment
- Empathy Assessment
- Self-awareness Assessment
- Self-regulation Assessment
- Relationship Management Assessment
- Stress Management Assessment
- Resilience Assessment

F. Communication & Soft Skills
- Professional Communication
- Workplace Writing
- Active Listening
- Feedback Giving & Receiving
- Presentation Style
- Interview Readiness
- Team Collaboration
- Ownership & Accountability
- Remote Work Readiness
- Adaptability
- Conflict Management
- Negotiation Style
- Customer Communication
- Leadership Communication

G. Hiring & Work Readiness
- Pre-employment General Assessment
- Job Fit General Assessment
- Work Readiness Assessment
- Professional Maturity Assessment
- Candidate Screening General Assessment
- Structured Interview Readiness
- Situational Judgment Test / SJT
- Work Ethics Assessment
- Reliability Assessment
- Integrity Test
- Safety Orientation Assessment
- Culture Add Profile

H. General AI Readiness
- General AI Literacy
- AI Readiness Assessment
- Prompt Thinking Assessment
- AI Output Judgment Assessment
- AI Ethics Awareness
- AI Bias Detection Assessment
- Human Judgment with AI
- AI-assisted Communication Assessment
- AI Workflow Awareness
- AI Tool Adoption Readiness
- AI Safety Awareness
- AI Productivity Style

I. Language & International Readiness
- English Level / CEFR-based
- Business English Assessment
- Workplace English Writing
- Email Writing Assessment
- Interview English Readiness
- Professional Vocabulary Assessment
- Reading Comprehension
- Listening Comprehension
- English Communication Confidence

J. Leadership & Management
- Leadership Style Assessment
- Manager Readiness
- New Manager Assessment
- Situational Leadership Assessment
- Transformational Leadership Assessment
- Servant Leadership Assessment
- Decision-Making Under Pressure
- Delegation Style Assessment
- Coaching Style Assessment
- Team Leadership Assessment
- Conflict Leadership Assessment
- Strategic Thinking Assessment
- Change Management Readiness
- People Management Assessment
- Performance Management Style

K. Team & Employee Development
- Belbin Team Roles
- Team Role Assessment
- Team Communication Style
- Team Conflict Style
- Team Decision Style
- Psychological Safety Perception
- Team Trust Assessment
- Team Dynamics Assessment
- Cross-functional Collaboration Assessment
- Internal Mobility Readiness
- Employee Development Assessment
- Feedback Culture Assessment

L. Work Wellbeing
- Burnout Risk Assessment
- Work Stress Profile
- Resilience Profile
- Wellbeing at Work
- Workload Pressure Assessment
- Emotional Exhaustion Screener
- Work-Life Balance Assessment

Important:
Work Wellbeing assessments are sensitive.
They must not be used for direct hiring.
They require stronger privacy and clear usage limitations.

M. Profile & Career Presentation
- Resume Readiness
- Profile Strength Assessment
- Hamrahe Profile Review
- LinkedIn Profile Review
- Interview Story Assessment
- Portfolio Presentation Readiness
- Personal Branding Readiness
- Career Story Assessment

5. Launch Batch Planning
Define the first 10 assessments that will be designed and launched first.

Launch Batch:
1. MBTI
2. DISC / DiSC
3. Big Five Personality
4. Holland / RIASEC
5. Work Style Assessment
6. Communication Style
7. Emotional Intelligence / EQ
8. General AI Readiness
9. Interview Readiness
10. Logical Reasoning

Important:
In this phase, only define why these 10 are selected, their high-level role in the product, and their launch priority.
Do NOT create their questions yet.
Do NOT create detailed scoring models yet.
Detailed assessment design will happen in separate phases.

Explain why these 10 are selected:
- market familiarity
- profile value
- hiring relevance
- international usability
- company understanding
- user self-awareness
- coverage across personality, behavior, career interest, communication, AI readiness, interview readiness, and cognitive ability

6. Default Assessment Model
Create the standard model that every assessment must follow.

Fields:

1. Basic Information
- Assessment ID
- Official Name
- Display Name EN
- Family
- Category
- Description
- Primary Use Case
- Secondary Use Cases
- Restricted Uses

2. Status
- Library Status
- Content Status
- Scoring Status
- Report Status
- QA Status
- Publish Status

3. Structure & Timing
- Question Count
- Estimated Duration
- Time Limit
- Timed Mode: Untimed / Soft Timed / Strict Timed
- Countdown Enabled
- Auto-submit Rule
- Pause Allowed
- Resume Policy
- Expires After Start
- Attempt Expiry
- Timeout Status
- Question Types
- Sections
- Dimensions
- Version
- Language: English
- Retake Rule
- Validity Period

4. Scoring
- Dimension Mapping
- Raw Score
- Dimension Score
- Composite Score
- Type Mapping
- Interpretation Bands
- Consistency Check
- Result Confidence

5. Report
- User Full Report
- Company Summary
- Profile Summary
- Downloadable PDF
- English PDF
- Verification Link
- QR Code

6. Profile Integration
- Assessment & Reports Section
- Profile Assessment Card
- Profile Assessment Signal
- Visibility Options
- Suggested Next Assessments
- Retake Prompt
- Report Access

7. Company Integration
- Can Company Request?
- Can Be Required for Job?
- Can Be Used for Hiring?
- Use Limitation
- Candidate Consent
- Company Summary
- Anti-abuse Rules
- Assessment Load Level

8. Privacy
- Private by Default
- Share with Selected Company
- Share When Applying
- Show Summary Only
- Show Report Link
- Expiry for Shared Link
- Consent Log

9. International Use
- English Report
- Report ID
- Verification QR
- Usage Limitation Statement

7. Timing & Attempt Logic
Define the complete timing system.

Each assessment must have:
- estimated_duration
- time_limit
- timed_mode
- countdown_enabled
- auto_submit
- pause_allowed
- resume_policy
- expires_after_start
- attempt_expiry
- timeout_status
- retake_rule

Timed modes:
- Untimed
- Soft Timed
- Strict Timed

Explain each mode.

Important rule:
Draft only applies before the user starts an assessment or inside admin setup.
Once the user starts, create a UserAssessmentAttempt.
After Start, the attempt status becomes In Progress.
After Start, Draft must never be shown to the user.

UserAssessmentAttempt statuses:
- Not Started
- Ready to Start
- Requested by Company
- In Progress
- Paused
- Submitted
- Auto-submitted
- Expired
- Abandoned
- Completed
- Retake Available

Define UserAssessmentAttempt object with:
- id
- user_id
- assessment_id
- assessment_version_id
- status
- started_at
- submitted_at
- expires_at
- time_limit_minutes
- estimated_duration_minutes
- time_spent_seconds
- remaining_time_seconds
- countdown_enabled
- auto_submit_enabled
- auto_submitted
- pause_allowed
- paused_at
- resume_count
- resume_deadline
- abandoned_at
- expired_at
- timeout_status
- score_status
- report_status
- created_at
- updated_at

8. Standard Timing for Launch Batch
Define high-level timing rules for the first 10 assessments without designing their questions.

Use this starting timing model:

MBTI:
Estimated duration: 15–25 minutes
Timed mode: Soft Timed
Suggested time limit: 30 minutes
Pause: Allowed
Resume: Within 24 hours

DISC / DiSC:
Estimated duration: 10–20 minutes
Timed mode: Soft Timed
Suggested time limit: 25 minutes
Pause: Allowed
Resume: Within 24 hours

Big Five Personality:
Estimated duration: 15–25 minutes
Timed mode: Soft Timed
Suggested time limit: 30 minutes
Pause: Allowed
Resume: Within 24 hours

Holland / RIASEC:
Estimated duration: 15–20 minutes
Timed mode: Soft Timed
Suggested time limit: 25 minutes
Pause: Allowed
Resume: Within 24 hours

Work Style Assessment:
Estimated duration: 10–15 minutes
Timed mode: Soft Timed
Suggested time limit: 20 minutes
Pause: Allowed
Resume: Within 24 hours

Communication Style:
Estimated duration: 10–15 minutes
Timed mode: Soft Timed
Suggested time limit: 20 minutes
Pause: Allowed
Resume: Within 24 hours

Emotional Intelligence / EQ:
Estimated duration: 20–30 minutes
Timed mode: Soft Timed
Suggested time limit: 35 minutes
Pause: Allowed
Resume: Within 24 hours

General AI Readiness:
Estimated duration: 15–20 minutes
Timed mode: Timed or Soft Timed
Suggested time limit: 25 minutes
Pause: Limited
Resume: Within same session or 2 hours

Interview Readiness:
Estimated duration: 10–15 minutes
Timed mode: Soft Timed
Suggested time limit: 20 minutes
Pause: Allowed
Resume: Within 24 hours

Logical Reasoning:
Estimated duration: 20–30 minutes
Timed mode: Strict Timed
Time limit: 30 minutes
Pause: Not allowed
Auto-submit: Yes
Resume: Not allowed after start

9. Profile Integration: Assessment & Reports
Define the structured profile section called:

Assessment & Reports

This section must be similar in seriousness and structure to:
- Experience
- Education
- Skills
- Projects
- Career Paths

Do not use Badge as the main output.

Assessment & Reports sections:
- Overview
- Completed Assessments
- Recommended Assessments
- Company Requested Assessments
- Downloadable Reports
- Shared Reports
- Expired / Retake Suggested
- Privacy & Consent
- Assessment History

Define:
- Empty state
- Completed state
- Recommended state
- Shared reports state
- Expired report state
- Company requested state
- Privacy settings state

Use English UI copy for assessment-related content.

Example empty state:
“You have not completed any assessments yet.
Start with standardized assessments to better understand your personality, work style, communication style, hiring readiness, and general AI readiness.”

Recommended to start:
- MBTI
- DISC / DiSC
- Work Style Assessment
- Communication Style Assessment
- General AI Readiness

CTA:
Start First Assessment

10. Report Output Model
Every completed assessment must produce:

- Executive Summary
- Result Overview
- Dimension Scores
- Detailed Interpretation
- Workplace Meaning
- Strengths
- Development Areas
- Interview Tips, if relevant
- Recommended Next Assessments
- Profile Summary
- Company Summary
- Downloadable PDF
- Shareable Link
- QR / Verification Code
- Privacy Settings
- Usage Limitations
- Attempt Details

Attempt Details must include:
- Assessment date
- Assessment version
- Duration spent
- Completion status
- Timed / Untimed
- Auto-submitted or user-submitted
- Validity period

11. Report Types
Define three report types:

1. Full User Report
For the user.
Detailed, educational, analytical, and useful for self-awareness and professional growth.

2. Company Summary
For companies.
Limited, role-relevant, non-sensitive, and visible only with user consent.

3. Profile Summary
For the personal profile.
Short, controlled, and visibility-based.

12. PDF & Verification Model
Define downloadable PDF reports.

Each PDF must include:
- Report ID
- Verification QR
- Verification Link
- Issue Date
- Validity Date
- Assessment Version
- Language
- Usage Limitation Statement

For now:
- English PDF only

Future:
- Persian PDF
- Bilingual PDF

13. Privacy & Consent Model
Define privacy as:

Private by Default

Visibility levels:
- Only Me
- Show Summary in Profile
- Share with Selected Company
- Share Only During Application
- Create Time-limited Share Link
- Download PDF
- Revoke Company Access

ConsentRecord fields:
- user_id
- assessment_attempt_id
- shared_with_type
- shared_with_id
- shared_report_type
- purpose
- job_id
- company_id
- visibility_level
- expires_at
- revoked_at
- created_at

14. Company Request Flow
Define how companies request assessments.

Flow:
Company requests assessment
→ User receives request
→ User sees purpose, time limit, deadline, and sharing rules
→ User accepts or declines
→ User starts assessment
→ Timer starts
→ User completes or time ends
→ User reviews result
→ User chooses what to share
→ Company sees only the allowed version

Company-visible statuses:
- Assessment requested
- Candidate not started
- Candidate in progress
- Candidate submitted
- Candidate auto-submitted
- Candidate report shared
- Candidate declined
- Deadline expired

Company restrictions:
- Cannot see raw sensitive results by default
- Cannot use personality tests as the sole hiring decision
- Cannot force unrelated assessments
- Cannot export sensitive reports without consent
- Cannot use AI to auto-reject candidates
- Cannot request excessive assessment load

15. Assessment Load Warning
Define company-side assessment load warning.

Assessment Load levels:
- Low: under 20 minutes
- Moderate: 20–45 minutes
- High: 45–90 minutes
- Excessive: over 90 minutes

If the total required assessment time is excessive, show:
“This assessment setup may create excessive candidate burden. Consider reducing required assessments.”

16. Usage Labels
Every assessment must have usage labels.

Examples:
- Self-awareness
- Career guidance
- Hiring support
- Employee development
- Not for hiring decision alone
- Sensitive / private
- Company-requested
- International report available

Define usage labels and rules.

17. Quality Status Model
Every assessment must have quality status.

Statuses:
- Draft
- Structure Ready
- Questions Ready
- Scoring Ready
- Report Ready
- Internal Review
- Expert Reviewed
- Pilot Tested
- Calibrated
- Published
- Archived

For official licensed tests:
- Official Licensed Content
- Official Scoring Imported
- Official Report Guide Imported

For Hamrahe-native tests:
- Hamrahe Native
- Internal Review
- Pilot Tested
- Calibrated

18. Admin Import & Management System
Define the admin workflow.

Admin flow:
- Create Assessment
- Select Family
- Define Use Case
- Add Dimensions
- Add Questions
- Add Answer Options
- Map Questions to Dimensions
- Add Scoring Rules
- Add Report Template
- Set Profile Integration
- Set Privacy Rules
- Set Timing Rules
- Preview User Report
- Preview Company Summary
- QA Review
- Publish

For official tests:
- Upload Official Questions
- Upload Official Answer Options
- Upload Scoring Key
- Upload Report Guide
- Upload Norm Table, if available
- Map Imported Content
- Review
- Publish

19. Assessment Recommendation Engine
Define how the system recommends assessments.

Examples:
- To complete professional profile: Start MBTI
- For better job applications: Start Interview Readiness
- For AI-related roles: Start General AI Readiness
- For analytical roles: Start Logical Reasoning
- For team-based roles: Start Communication Style

Recommendation sources:
- incomplete profile
- saved jobs
- company requests
- user role interests
- career goals
- previous assessment results
- expired reports
- job application requirements

20. Resume / Export Integration
Define how assessments can be referenced in resumes or exported profiles.

Examples:
“Verified Assessment Reports:
MBTI · DISC / DiSC · Communication Style · General AI Readiness
Full reports available upon permission.
Verification available via Hamrahe report link.”

Include:
- export summary
- verified report link
- privacy control
- report validity
- selected report sharing

21. UX Copy Requirements
Create English UI copy for:
- Assessment card
- Start assessment screen
- In-progress screen
- Timer warning
- Auto-submit message
- Assessment completed screen
- Report ready screen
- Profile empty state
- Profile completed assessment card
- Recommended assessment card
- Company assessment request
- Consent message
- Share report modal
- Revoke access modal

Do not write actual test questions in this phase.

22. Final Output Format
Output the result as a complete product specification with these sections:
- Executive Summary
- Product Definition
- Strategic Positioning
- Assessment Center vs Career Path
- Language Rules
- Master Library
- Launch Batch
- Data Model / OOPS
- Default Assessment Model
- Timing & Attempt Model
- Profile Integration
- Report Model
- PDF & Verification
- Privacy & Consent
- Company Request Flow
- Assessment Load Warning
- Admin Management
- Quality Status
- Recommendation Engine
- Resume / Export Integration
- UX Copy
- Implementation Phases
- What is excluded from Phase 0

Important:
Exclude actual detailed question banks for the first 10 assessments.
The first 10 assessments will be designed in later phases, one assessment per phase.