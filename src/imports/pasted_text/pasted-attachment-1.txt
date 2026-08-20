Review the entire existing Hamrahe Figma Make project and its source code before making any changes.

This is an existing product with an already implemented Home page, Composer, feed posts, post detail page, reactions, comments, reposting, sharing, saving, reporting, account-specific content types, and related post interactions.

Do not rebuild, duplicate, rename, or restyle any working post capability that already exists.

Before implementation, inspect at least these files:

- src/app/components/home/Composer.tsx
- src/app/components/home/FeedPost.tsx
- src/app/components/home/HomeFeed.tsx
- src/app/components/posts/PostDetailPage.tsx
- src/app/components/company/tabs/PostsTab.tsx
- src/app/data/mock-data.ts
- src/app/context/AppContext.tsx

Create an internal gap analysis from the current source, but do not create an audit page or documentation screen in the product.

Implement only capabilities that are genuinely missing or currently represented by non-functional placeholder buttons.

Preserve the current Hamrahe visual identity, design tokens, spacing, typography, colors, card style, border radius, responsiveness, light mode, dark mode, routes, layout, navigation, sidebars, and existing account behavior.

Do not redesign the Home page.

Do not change unrelated pages.

==================================================
HARD EXCLUSIONS
==================================================

Do not create a publishing identity selector.

Do not allow users to switch between personal, company, startup, brand, event, group, newsletter, or organization identities inside the Composer.

The post author must always be the currently authenticated account.

Keep the existing account context already provided by AppContext.

Do not create an audience selector.

Remove the current non-functional “Everyone” audience button from the Composer header.

Do not add Public, Connections Only, Followers Only, Selected People, Only Me, or similar audience controls.

All posts should use the platform’s default visibility behavior.

Do not add bilingual post publishing.

Do not add separate Persian and English versions of one post.

Do not add language-switching controls to the Composer.

Do not add admin dashboards, moderation queues, internal compliance tools, backend services, databases, or server-side interfaces.

Do not recreate capabilities already working in the current project.

==================================================
1. COMPOSER REFINEMENT
==================================================

Preserve the current collapsed and expanded Composer.

After removing the existing “Everyone” audience control, simplify the expanded Composer header to show:

- current account avatar
- current account name
- close button
- existing content type control, only if it remains useful

The Composer must remain fast and simple.

A normal user must always be able to:

- write a post
- optionally attach existing supported media
- publish immediately

Do not require:

- a professional goal
- a structured post type
- a project
- a skill
- evidence
- a CTA
- a profile update
- a multi-step form

Keep advanced features behind progressive disclosure.

Do not add many new permanent icons to the Composer footer.

Add only one compact “More” or “Add” action for capabilities that do not already have an existing working entry point.

==================================================
2. COMPLETE THE CURRENT PLACEHOLDER MEDIA ACTIONS
==================================================

The current Composer already contains video and document buttons, but they are not complete.

Convert the existing buttons into functional prototype flows instead of adding duplicate buttons.

Video flow:

- local video file selection
- upload progress state
- uploaded preview
- remove video
- replace video
- retry failed upload
- choose cover frame
- trim start and end
- add captions
- edit generated captions
- add accessibility description
- choose autoplay preference
- validation for unsupported format or excessive size
- publishing state
- video post preview

Document flow:

- PDF and presentation selection
- upload progress
- title
- optional description
- cover preview
- page count
- page thumbnail preview
- fullscreen preview
- allow or disable download
- accessibility description
- remove
- replace
- retry failed upload
- document carousel post preview

Extend the existing image capability without replacing it.

Add:

- multiple-image selection
- photo album preview
- image reordering
- choose cover image
- remove individual image
- crop
- rotate
- aspect ratio
- per-image alt text
- per-image caption
- per-image people or organization tags
- album validation and error states

Do not create a second independent image uploader.

==================================================
3. LINK PREVIEW
==================================================

Add automatic URL detection inside the existing Composer text area.

When a URL is detected, create an optional link preview containing:

- preview image
- page title
- short description
- domain
- destination URL

Allow the user to:

- remove the preview without removing the URL from the text
- restore the preview
- choose the primary preview when multiple links exist
- retry preview loading
- publish a post containing only a link
- see a broken-preview fallback state

Do not add a separate mandatory “Link Post” form.

==================================================
4. ORGANIZED MORE MENU
==================================================

Add one organized More menu for missing advanced capabilities.

Do not place items already available through working Composer buttons inside this menu.

The menu should contain only missing advanced actions:

Professional content:

- Celebrate / Professional Milestone
- Event
- Job Opening
- Service
- Find an Expert
- Project or Collaboration
- Product Update
- Professional Opportunity

Long-form publishing:

- Article
- Newsletter

Live and collaboration:

- Live Session
- Add Collaborators
- Paid Partnership

Professional context:

- Connect to Experience
- Connect to Project
- Connect to Portfolio
- Connect to Skill
- Connect to Certificate
- Connect to Job
- Connect to Event
- Connect to Product or Service
- Add Professional Evidence

Organize the menu into clear sections.

Add search inside the menu only if the number of items makes navigation difficult.

Use the current account type to determine which actions are applicable, but do not add any account-switching interface.

==================================================
5. DRAFT MANAGEMENT
==================================================

Add proper post draft management.

Required behavior:

- visible autosave status
- “Saving…”
- “Saved”
- “Unable to save”
- manual Save Draft action
- multiple saved drafts
- optional internal draft title
- last edited timestamp
- draft preview
- continue editing
- duplicate draft
- delete draft
- recover accidentally closed Composer content
- draft recovery notification
- distinguish personal draft from scheduled post

Do not create an entirely separate content-management dashboard.

Use a Composer drawer or dialog for draft selection.

Closing the Composer must not immediately erase recoverable content.

Only show a discard confirmation when the content cannot be recovered.

==================================================
6. POST SCHEDULING
==================================================

Add scheduling to the existing Composer.

Required fields and states:

- date
- time
- timezone
- schedule summary
- edit schedule
- remove schedule
- publish now instead
- scheduled state
- missed schedule error
- invalid past time validation
- publishing at scheduled time simulation
- list of scheduled posts
- edit scheduled post
- cancel scheduled post

Use local mock state only.

Do not build backend scheduling services.

==================================================
7. OPTIONAL AI WRITING ASSISTANCE
==================================================

Add a compact AI assistance menu inside the Composer.

AI actions:

- Improve writing
- Shorten
- Clarify
- Make more professional
- Make more conversational
- Improve the opening
- Suggest hashtags
- Suggest mentions
- Suggest a CTA
- Suggest image alt text
- Suggest video captions
- Detect an unsupported numerical claim
- Recommend adding a source
- Suggest connection to an existing project, experience, certificate, or professional item

AI suggestions must be:

- optional
- dismissible
- editable
- reversible
- non-blocking

AI must never:

- publish automatically
- create a profile record automatically
- change profile information automatically
- mark evidence as verified
- block normal publication
- reduce post reach because the user ignored a suggestion

Show before-and-after comparison for rewrite actions.

Use mock AI responses and local state.

==================================================
8. CELEBRATE AND PROFILE INTEGRATION
==================================================

Add a structured Celebrate / Professional Milestone flow.

Supported milestone types:

- New Position
- Promotion
- Work Anniversary
- Starting a Company
- Project Launch
- Project Completion
- Product Launch
- New Certification
- Educational Milestone
- Graduation
- Award
- Publication or Research
- Speaking Engagement
- Verified Professional Outcome

The user must be able to choose:

- publish only as a post
- connect to an existing profile item
- create a new profile item and publish the post

Before creating a new profile item:

- search the existing mock profile data
- detect possible duplicates
- show matching existing records
- let the user connect to an existing record
- allow creating a separate record only after confirmation

When a user adds or updates a relevant profile item elsewhere in the existing product, show an optional prompt:

“Share this update with your network?”

Selecting this action must open the same existing Composer with the professional information prefilled.

Never publish automatically.

Never modify the profile without explicit confirmation.

Add an optional milestone-only setting:

“Notify my network about this milestone”

This is not an audience selector.

It only controls whether an important milestone generates an additional network notification.

Do not offer this option for minor edits such as correcting dates, links, descriptions, or spelling.

Prevent repeated notifications when the same professional item is edited several times.

==================================================
9. STRUCTURED PROFESSIONAL POST FLOWS
==================================================

Structured forms must appear only after the user deliberately selects the relevant post type.

Do not add structured fields to a normal post.

Job Opening:

- connect an existing job
- or create a lightweight new job draft
- job title
- company from current account context
- location
- work model
- employment type
- salary range optional
- required skills
- application deadline
- hiring team
- application CTA
- job card preview

Service:

- service name
- category
- description
- intended customer
- delivery model
- pricing model optional
- portfolio connection
- response time
- Request Quote CTA
- Book Meeting CTA
- Request Demo CTA
- View Portfolio CTA

Find an Expert:

- problem description
- expertise required
- expected output
- timeline
- collaboration model
- budget optional
- confidentiality option
- Send Proposal CTA
- Express Interest CTA
- Recommend an Expert CTA

Project or Collaboration:

- project title
- project type
- description
- project stage
- required skills
- timeline
- budget optional
- existing collaborators
- collaboration type
- Request to Join CTA
- Send Proposal CTA
- Recommend Someone CTA

Product Update:

- launch
- beta
- new version
- feature update
- customer outcome
- case study
- product connection
- demo CTA
- trial CTA
- pricing CTA
- contact sales CTA

Event:

- title
- cover
- description
- date
- time
- timezone
- online, in-person, or hybrid
- location or meeting link
- organizer from current account context
- speakers
- capacity
- registration link
- Add to Calendar CTA
- Register CTA

Professional Opportunity:

- opportunity type
- intended recipient
- description
- required capability
- deadline
- location
- collaboration model
- budget optional
- confidentiality
- Apply or Respond CTA

Article:

- title
- cover
- long-form editor
- headings
- quotes
- images
- links
- sources
- co-authors
- draft
- preview
- schedule

Newsletter:

- existing newsletter selection
- issue title
- issue editor
- cover
- preview
- subscriber notification
- archive link
- schedule

Live Session:

- title
- cover
- description
- go live now or schedule
- hosts
- speakers
- questions
- live poll
- recording state
- recorded version preview

Use one reusable StructuredPostFlow system rather than building unrelated forms for every type.

==================================================
10. COLLABORATIVE POSTS
==================================================

Add collaborative posting without changing the author identity model.

The current authenticated account remains the original author.

Allow the original author to invite:

- individuals
- companies
- project members
- event speakers

Required flow:

- search collaborator
- invite collaborator
- define contribution or role
- pending state
- accepted state
- rejected state
- remove invitation
- collaborator leaves post
- accepted collaborators appear on the post
- accepted collaborators see the post in their activity

Example contribution roles:

- Product Design
- Business Development
- Engineering
- Research
- Content
- Project Management
- Speaker
- Project Contributor

Do not automatically make mentioned users collaborators.

Do not allow role changes after acceptance without reconfirmation.

==================================================
11. PROFESSIONAL EVIDENCE AND CONTEXT
==================================================

Normal posts must never require evidence.

Allow optional evidence only when the user wants to support a professional claim or request a verified outcome.

Supported evidence:

- external link
- uploaded file
- connected project
- connected portfolio item
- colleague confirmation
- company confirmation
- client confirmation
- certificate issuer confirmation
- platform-recorded professional outcome

Evidence states:

- Claimed
- Evidence Attached
- Colleague Confirmed
- Company Confirmed
- Client Confirmed
- Issuer Confirmed
- Platform Recorded
- Externally Verified
- Disputed

Private evidence may validate a status without exposing the document publicly.

Display professional-context and evidence indicators subtly.

Do not fill the post header with decorative badges.

A post must not automatically create:

- Verified Skill
- Top Voice
- professional authority
- trust status
- professional score increase

==================================================
12. COMPLETE REPOST AND QUOTE POST BEHAVIOR
==================================================

The current project already contains initial repost actions.

Do not create another repost button or another separate share bar.

Complete the existing repost behavior.

Direct Repost:

- preserve the original post
- preserve the original author
- preserve original engagement
- add repost activity label
- allow Undo Repost
- update repost count
- aggregate repeated repost activity
- show unavailable state when the original post is deleted

Quote Post:

- open the existing Composer
- embed the original post
- allow new commentary
- allow optional new media
- create independent engagement
- create independent analytics
- notify the original author
- preserve original author attribution
- show unavailable-original state when needed

Rename the current user-facing label:

“Repost with your thoughts”

to:

“Quote Post”

Do not create another competing term elsewhere.

==================================================
13. COMPLETE COMMENT MANAGEMENT
==================================================

The project already contains comments, replies, and basic comment reactions.

Do not rebuild the comment system.

Add only the missing comment controls:

- sort by Relevant
- sort by Newest
- sort by Oldest
- edit own comment
- delete own comment
- report comment
- block commenter
- copy comment link
- share public comment
- quote a public comment with the original post attached
- pin comment by post author
- unpin comment
- collapse reply thread
- expand reply thread
- author label beside comments written by the post author

Add comment permission settings for the post author:

- Everyone can comment
- Followers and connections can comment
- Connections can comment
- Mentioned people can comment
- Comments disabled

Do not add post audience settings.

==================================================
14. REPOST AND QUOTE PERMISSIONS
==================================================

Add post-level controls for:

- Repost and Quote Post enabled
- Repost only
- Quote Post only
- both disabled

Allow the author to change these settings after publication.

When disabled:

- update the existing repost menu
- show a clear disabled explanation
- preserve existing reposts already created
- prevent new reposts or Quote Posts

Do not connect this control to a post audience system.

==================================================
15. SAVE COLLECTIONS
==================================================

The project already supports basic Save.

Do not add another Save button.

Extend the existing Save action with:

- Save directly
- Choose collection
- Create collection
- Rename collection
- remove from collection
- move between collections
- add a private note
- saved state
- collection count
- empty collection state

Save data and collection notes must remain private.

Do not reveal saved users or collection names to the post author.

==================================================
16. COMPLETE USER-FACING POST CONTROL MENU
==================================================

Extend the existing three-dot menu instead of creating a second menu.

For another user’s post, add only missing controls:

- Add to Collection
- Why am I seeing this?
- Not Interested
- Mute Author
- Mute Topic
- Mute Hashtag
- Block Author
- Report Account or Page

Preserve existing working options.

“Why am I seeing this?” should open an explanation panel showing relevant examples such as:

- professional connection
- followed topic
- followed company
- previous interaction
- related professional interest
- network activity
- promoted distribution

For the current user’s own post, create a context-aware menu:

- Edit
- Delete
- Archive
- Manage Comments
- Manage Repost and Quote Post Permissions
- Manage Post Notifications
- Connect to Professional Item
- View Analytics
- Boost
- Duplicate Post
- Create Follow-Up Post

Use destructive confirmation dialogs for Delete and Archive.

==================================================
17. FULL REPORT FLOW
==================================================

The current Report action is only a basic placeholder.

Replace the placeholder response with a complete user-facing report dialog.

Do not add any admin moderation interface.

Reportable items:

- post
- comment
- Quote Post
- Live Session
- Job
- Project
- Service
- Product
- Event
- Article
- account
- company page
- advertisement

Report reasons:

- Profanity or abusive language
- Insult
- Harassment or threat
- Hate or discrimination
- Misleading information
- Defamation
- Privacy violation
- Personal information exposure
- Impersonation
- Scam
- Phishing
- Fake opportunity
- Suspicious payment request
- Spam
- Unwanted advertising
- Intellectual property violation
- Violent content
- Child safety
- Content violating the laws and regulations of the Islamic Republic of Iran
- Undisclosed paid partnership
- Other

Flow:

- select reason
- optional additional explanation
- optional mute author
- optional block author
- submit
- success confirmation

Do not reveal reporter identity to the reported account.

==================================================
18. MUTE AND BLOCK FLOWS
==================================================

Add complete confirmation and result states.

Mute options:

- Mute Author
- Mute Company
- Mute Topic
- Mute Hashtag

Mute must:

- not disconnect users
- not notify the muted account
- immediately hide relevant future content in the prototype

Block must clearly explain that it will:

- stop mutual profile visibility
- stop following
- stop connection
- stop new messages
- stop mentions and tags
- stop new invitations
- hide each side’s posts

Add:

- Block confirmation
- Blocked state
- Undo immediately after blocking
- unblock path in settings mock state

==================================================
19. POST MANAGEMENT AFTER PUBLICATION
==================================================

Add author-side management without rebuilding the post card.

Editable fields:

- text
- hashtags
- mentions
- image alt text
- image captions
- video captions
- document description
- allowed CTA fields
- comment permissions
- repost and Quote Post permissions
- post notification preference
- professional connections

Show “Edited” after a meaningful edit.

Do not allow:

- changing the original author
- switching account identity
- replacing the original embedded post inside a Quote Post
- changing an accepted collaborator role without reconfirmation

Deletion behavior:

- direct reposts show unavailable content
- Quote Posts show “Original post is unavailable”
- connected profile data remains unless separately removed
- deleting a post must not automatically delete an experience, project, certificate, job, event, service, or product

Archive behavior:

- remove post from normal public display
- preserve it in the author’s archive
- allow restoration
- show archived state to the author only

==================================================
20. POST ANALYTICS
==================================================

Add an author-facing analytics entry point.

Do not create an admin analytics dashboard.

Use a drawer or dedicated post analytics view.

Base metrics:

- Impressions
- Unique Reach
- Reactions
- Reaction Types
- Comments
- Replies
- Reposts
- Quote Posts
- Saves
- Sends
- Link Clicks
- Profile Views
- New Followers
- Connection Requests
- CTA Clicks

Media metrics:

Video:

- Video Starts
- Unique Viewers
- Average Watch Time
- Completion Rate
- Replay Rate
- Drop-Off Points

Document:

- Document Opens
- Pages Viewed
- Average Pages Viewed
- Completion Rate
- Downloads

Poll:

- Votes
- Participation Rate
- Option Distribution

Event:

- Event Views
- Registrations
- Calendar Adds

Professional outcomes for individuals:

- Recruiter Views
- Portfolio Views
- Professional Messages
- Collaboration Requests
- Project Requests
- Interview Invitations
- Recommendations
- Skill Confirmations

Professional outcomes for organizations:

- Applicants
- Talent Pool Joins
- Leads
- Demo Requests
- Quote Requests
- Sales Contacts
- Event Registrations
- Product Views
- Service Inquiries
- B2B Opportunities
- Hires
- Contracts

Use polished realistic mock data.

Do not show identities behind private saves or message sends.

==================================================
21. BOOST AND SPONSORED TRANSPARENCY
==================================================

Add Boost only to eligible posts owned by the current account.

Boost flow:

- objective
- target professional interest
- industry
- role
- location
- duration
- budget
- CTA
- preview
- summary
- confirmation
- active campaign state
- completed campaign state

Do not add post audience selection to normal publishing.

Boost targeting exists only inside the paid promotion flow.

Clearly label paid content:

- Sponsored
- Promoted
- Paid Partnership
- Featured by Company

Paid promotion must never influence:

- verification
- trust
- verified skills
- Top Voice
- professional credibility
- evidence status

==================================================
22. POST DISTRIBUTION AND RANKING PROTOTYPE
==================================================

Create a front-end mock ranking utility for post-related prototype behavior.

Do not build server infrastructure.

Add a configurable local scoring model.

Suggested initial positive weights:

- Qualified View: 0.1
- Meaningful Dwell: 0.5
- Reaction: 1
- Expand See More: 1
- Media or Document Open: 1.5
- Save: 3
- Short Comment: 2
- Meaningful Comment: 5
- Author Reply: 2
- Send in Message: 5
- Direct Repost: 6
- Meaningful Quote Post: 8
- Follow Author from Post: 6
- Connection Request from Post: 7
- Professional CTA Click: 8
- Apply or Collaboration Request: 12
- Verified Professional Outcome: 15

Suggested negative weights:

- Immediate Skip: -0.2
- Hide Post: -4
- Not Interested: -5
- Mute Author: -8
- Unfollow after Viewing: -8
- Report: -10 to -30 based on severity
- Detected Artificial Engagement: remove engagement weight and apply a penalty

Keep weights in one configurable local file.

Do not hard-code the same numbers across multiple components.

Use a simple local heuristic for distinguishing:

- short comment
- meaningful comment
- low-effort Quote Post
- meaningful Quote Post

Do not expose raw algorithm weights to end users.

==================================================
23. FEED MODES DIRECTLY RELATED TO POST DISTRIBUTION
==================================================

Do not redesign the Home page or existing feed layout.

Preserve the current post and opportunity filters.

Add one compact feed mode control:

- For You
- Following

Do not duplicate the current All Activity, Posts, and Opportunities filters.

For You:

- use the mock ranking score
- include network posts
- include relevant second-degree activity
- include relevant public professional posts
- allow clearly labeled promoted posts

Following:

- show eligible posts from followed people, connections, and followed organizations
- sort chronologically
- do not suppress posts based on low engagement
- still respect hidden, muted, blocked, and reported prototype states

Add optional post social context above relevant cards:

- Reposted by [name]
- [name] commented on this
- [name] reacted to this
- Suggested because you follow [topic]
- Suggested because you follow [company]
- Related to a saved professional opportunity

Aggregate repeated activity.

Do not create multiple duplicate cards for the same activity.

==================================================
24. REUSABLE POST CARD VARIANTS
==================================================

Extend the existing FeedPost architecture.

Do not create an unrelated second post-card system.

Create reusable attachment and professional-context variants for:

- Link Preview
- Photo Album
- Video
- Document Carousel
- Poll
- Event
- Celebrate
- Job Opening
- Service
- Find an Expert
- Project or Collaboration
- Product Update
- Professional Opportunity
- Article
- Newsletter
- Live Session
- Collaborative Post
- Verified Outcome
- Sponsored Post
- Direct Repost
- Quote Post
- Original Post Unavailable

Use only a representative mix in the visible Home feed.

Do not place every variant on the Home page at the same time.

==================================================
25. NOTIFICATION CONTROLS RELATED TO POSTS
==================================================

Add post-specific notification settings for the author:

- All activity
- Comments and replies only
- Important activity only
- Mute notifications for this post

Add notifications for:

- collaborator invitation
- collaborator acceptance
- comment reply
- Quote Post
- meaningful milestone notification
- newsletter publication
- Live Session start
- important professional outcome

Do not notify every follower about every normal post.

Do not add an audience selector.

==================================================
26. ACCESSIBILITY
==================================================

Add missing accessibility behavior to all new flows:

- alt text fields
- video captions
- accessible document descriptions
- keyboard navigation
- visible focus states
- screen-reader labels
- correct dialog focus trapping
- logical focus order
- appropriate contrast
- reduced motion support
- autoplay controls
- content warning
- field-level error messages
- loading states
- retry states

Preserve existing responsive behavior.

==================================================
27. REQUIRED STATES
==================================================

Design and implement polished local prototype states for newly added capabilities.

Composer-related:

- autosaving
- saved draft
- recovered draft
- scheduled
- publishing
- media uploading
- upload failed
- upload retry
- AI suggestion
- structured flow
- collaborator pending
- professional evidence attached
- validation error

Post-related:

- direct reposted
- Undo Repost
- Quote Post
- edited
- archived
- sponsored
- comments disabled
- repost disabled
- reported confirmation
- muted
- blocked
- original unavailable
- analytics available
- boost active
- boost completed

Dialogs and drawers:

- Draft Manager
- Schedule
- AI Assistance
- Celebrate
- Structured Post
- Collaborators
- Evidence
- Report
- Mute
- Block
- Delete
- Archive
- Analytics
- Boost
- Save Collection
- Why Am I Seeing This?

==================================================
28. COMPONENT ARCHITECTURE
==================================================

Refactor carefully.

Do not rewrite unrelated files.

Do not create a second primitive component library.

Reuse the current shared Button, Card, Avatar, Badge, Dialog, Drawer, Dropdown, Popover, Tabs, Tooltip, Input, Textarea, Select, Sheet, Alert, and Toast patterns.

Suggested new reusable components:

ComposerMoreMenu
ComposerDraftManager
ComposerScheduleDialog
ComposerAIAssist
MediaUploadManager
VideoAttachmentEditor
DocumentAttachmentEditor
AlbumAttachmentEditor
LinkPreviewEditor
StructuredPostFlow
CelebrateFlow
CollaboratorManager
ProfessionalEvidenceManager

PostAttachmentRenderer
PostProfessionalContext
PostEvidenceIndicator
PostCTA
PostSocialContext
QuotePostCard
RepostActivityLabel
PostOwnerMenu
PostAnalyticsDrawer
PostBoostDialog
ReportDialog
MuteDialog
BlockDialog
SaveCollectionDialog
WhyShownDialog

Suggested support utilities:

post-types.ts
post-ranking.ts
post-drafts.ts
post-analytics-mock.ts
post-structured-data.ts

Do not duplicate logic between FeedPost and PostDetailPage.

Extract shared post behavior where practical without destabilizing current routes.

==================================================
29. MOCK DATA AND FRONT-END BEHAVIOR
==================================================

Use realistic local mock data for all new functionality.

Create or extend types for:

- Draft
- Schedule
- Media Attachment
- Link Preview
- Structured Post Data
- Professional Milestone
- Collaborator
- Evidence
- Professional Context
- CTA
- Quote Post
- Repost Activity
- Post Permissions
- Comment Permissions
- Notification Preference
- Saved Collection
- Report
- Mute
- Block
- Analytics
- Boost Campaign
- Distribution Reason
- Ranking Signals

Do not build backend calls.

Do not create fake API architecture merely to make the prototype appear more technical.

Use local state, existing context patterns, and current mock-data conventions.

==================================================
30. FINAL QUALITY RULES
==================================================

- Audit the current code before editing.
- Implement only missing capabilities.
- Never duplicate an existing working button, action, dialog, or post interaction.
- Extend placeholder actions instead of creating replacements.
- Preserve the existing Home layout.
- Preserve existing routes.
- Preserve existing account context.
- Do not add publishing identity switching.
- Do not add posting as another account or page.
- Do not add an audience selector.
- Remove the existing non-functional “Everyone” control.
- Do not add bilingual post publishing.
- Do not add internal moderation tools.
- Do not add backend infrastructure.
- Do not require structured forms for normal posts.
- Do not automatically update profile data.
- Do not automatically verify professional claims.
- Do not expose private save or message-recipient data.
- Do not place every post type in the visible feed simultaneously.
- Use reusable components and shared behavior.
- Keep the product mature, restrained, professional, and consistent with the current Hamrahe design system.