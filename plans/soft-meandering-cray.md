# Plan: Add Missing B2B/Business & Services Tabs to Company Profile

## Context
The company profile spec defines a comprehensive "Smart Organization Hub." The current implementation has 9 public tabs (overview, jobs, learning, events, people, posts, newsletter, products, trust). Comparing against the spec, two public-facing sections are entirely missing — never built, not removed:

1. **Business / B2B tab** — the public B2B layer (user specifically called this out)
2. **Services tab** — public service listings with request flow

No existing tab files cover these areas. The 7 current tab files (Overview, Jobs, Learning, Events, People, Posts, Trust) will not be touched.

## What Will Be Added

### 1. `src/app/components/company/tabs/BusinessTab.tsx` (new file)
Public B2B tab visible to all visitors. Sections (scoped to essentials from spec):

- **Business Snapshot** — what the company offers, industries served, markets, business model
- **Capabilities** — capability cards with evidence levels (member-backed, project-backed, client-confirmed). Show 3–4 capability cards with confidence %, evidence count, related tech
- **Tech Stack** — technology categories (Frontend, Backend, Cloud, Data/AI) with logos/badges and verification source
- **Business Open To** — structured cards for what the company is open to: Partnership, Pilot, Investment, Distribution — each with target industry, timeline, responsible contact
- **Clients & Partners** — logos of key clients/partners with relationship type badge and a "Confirmed by both parties" indicator
- **Case Studies** — 2 compact case study cards (client, challenge, outcome, result metrics)
- **Business Contacts** — decision-maker cards (role, verified membership, contact CTA)
- **Business Trust** — trust signals specific to B2B: verified legal entity, confirmed clients, response rate, verified domain

Props: `viewMode: ViewMode`

### 2. `src/app/components/company/tabs/ServicesTab.tsx` (new file)
Public services listing. Sections:

- **Services grid** — service cards with: name, category, target industry, delivery model (on-site/remote/hybrid), pricing model, availability, portfolio count
- **Service detail expand** — clicking a card expands inline: description, work samples teaser, team members, reviews count, CTA buttons
- **Request Service CTA** — modal: request type, need description, budget range, timeline, company name, confidentiality toggle, submit
- **Service Trust** — response time, verified provider badge

Props: `viewMode: ViewMode`

### 3. `CompanyPage.tsx` — updates

**Tab list changes:**
- Add `{ id: "business", label: "Business" }` to `PUBLIC_TABS` after "overview"
- Add `{ id: "services", label: "Services" }` to `PUBLIC_TABS` after "products"
- Add `{ id: "business", label: "Business" }` to `ADMIN_TABS` after "overview" (so admins can see the public-facing business tab too)

**TabId union type:** add `"business" | "services"`

**Tab content:** add `{activeTab === "business" && <BusinessTab viewMode={viewMode} />}` and `{activeTab === "services" && <ServicesTab viewMode={viewMode} />}` in the AnimatePresence block

**Imports:** add `import { BusinessTab } from "./tabs/BusinessTab"` and `import { ServicesTab } from "./tabs/ServicesTab"`

## Mock Data Pattern
Both tabs will use inline static mock data (same pattern as existing tabs — no new exports needed in companyMockData.ts). Mock data will use realistic Persian company names and Iranian market context (Snapp's actual clients/partners: Digikala, Cafe Bazaar, Hamrahe, etc.)

## Files Modified
| File | Change |
|------|--------|
| `src/app/components/company/tabs/BusinessTab.tsx` | **Create new** |
| `src/app/components/company/tabs/ServicesTab.tsx` | **Create new** |
| `src/app/components/company/CompanyPage.tsx` | Add tabs to PUBLIC_TABS/ADMIN_TABS, TabId, imports, tab content |

## Files NOT Modified
All existing tab files (Overview, Jobs, Learning, Events, People, Posts, Trust) are untouched. The spec sections that were previously in the codebase and removed (if any) are not added back.

## Verification
1. Navigate to `/company/snapp` — Business and Services tabs appear in the tab bar
2. Click Business tab — B2B content renders with capabilities, clients, case studies
3. Click Services tab — service cards render, expand on click, request modal opens
4. Switch to admin mode (`/company/snapp/admin`) — Business tab visible in admin tabs
5. All existing tabs still work normally
