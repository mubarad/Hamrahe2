# Hamrahe Platform Architecture

## Overview

Hamrahe is a professional platform that integrates identity, trust, networking, and opportunity discovery into one cohesive system. This document outlines the technical architecture, design patterns, and strategic decisions that shape the platform.

---

## Technology Stack

### Core Framework
- **React 18+** with TypeScript
- **React Router** for navigation and routing
- **Motion (Framer Motion)** for animations and transitions
- **Tailwind CSS v4** for styling
- **Vite** for build tooling

### Key Libraries
- **lucide-react** - Icon system
- **date-fns** - Date manipulation
- Context API for state management

---

## Platform Strategy

### Phase 1: Web-First Foundation (Current)
**Objective:** Build a robust, desktop-optimized web platform that establishes core features and user patterns.

**Characteristics:**
- Desktop-first responsive design (1200px+ optimal)
- Rich information density and multi-column layouts
- Keyboard + mouse interaction patterns
- Professional workspace aesthetic

**Why Web First:**
- Faster iteration and deployment
- Lower barrier to entry (no app store friction)
- Better for content-heavy professional use cases
- Easier testing and refinement of core concepts
- Professional users primarily work on desktops

### Phase 2: Cross-Platform Evolution (Future)
**Objective:** Extend to native mobile apps while maintaining platform consistency.

**Approach:**
- Component architecture designed for adaptability
- Information hierarchy that scales across screen sizes
- Core data models platform-agnostic
- Shared design language with platform-specific optimizations

**Not Now:**
- ❌ Mobile-first design
- ❌ App-like web interfaces
- ❌ Touch-first interactions
- ❌ Simplified single-column layouts

**Later:**
- ✅ Native iOS/Android apps
- ✅ Platform-specific UI patterns
- ✅ Mobile-optimized workflows
- ✅ Offline capabilities

---

## Information Architecture

### Core Modules

```
Hamrahe Platform
├── Professional Identity (Profile)
│   ├── Personal Information
│   ├── Trust Score & Verification Status
│   ├── Work Experience (with company/peer verification)
│   ├── Skills (with endorsements and test verification)
│   ├── Education
│   ├── Recommendations
│   ├── Portfolio/Projects
│   └── Professional Scores
│
├── Professional Activity Hub (Home)
│   ├── Activity Overview Metrics
│   ├── Composer (Post Creation)
│   ├── Hybrid Feed (Posts + Job Recommendations)
│   ├── Professional Insights
│   └── Quick Actions
│
├── Opportunity Discovery (Jobs)
│   ├── Personalized Job Recommendations
│   ├── Skills-Based Match Scoring
│   ├── Application Tracking
│   ├── Saved Jobs & Alerts
│   └── Company Discovery
│
├── Professional Network
│   ├── Connections Management
│   ├── Invitations & Requests
│   ├── Company Following
│   ├── Groups (Future)
│   └── Endorsement Workflows
│
├── Messaging
│   ├── Direct Messages
│   ├── Professional Context
│   ├── Response Rate Tracking
│   └── Thread Management
│
├── Notifications & Alerts
│   ├── Activity Notifications
│   ├── Job Alerts
│   ├── Network Updates
│   └── Message Notifications
│
├── Settings & Preferences
│   ├── Account Settings
│   ├── Privacy Controls
│   ├── Notification Preferences
│   ├── Profile Visibility
│   └── Work Status Management
│
└── Learning (Future Core Module)
    ├── Course Catalog
    ├── Skill Development Paths
    ├── Certifications
    └── Integration with Profile Skills
```

---

## Component Architecture

### Design System Hierarchy

```
Atoms (Base Components)
├── Button
├── Card
├── Badge
├── Avatar
├── Input
├── Skeleton
└── Modal/Dialog

Molecules (Composite Components)
├── Navigation Items
├── Search Bar
├── User Card
├── Skill Badge
├── Job Card
└── Post Card

Organisms (Complex Components)
├── Navigation Header
├── Sidebar Modules
├── Feed Composer
├── Profile Sections
├── Job Listings
└── Network Grids

Templates (Page Layouts)
├── Main Layout (with header + sidebars)
├── Auth Layout
├── Profile Layout
└── Settings Layout

Pages (Complete Views)
├── Home Feed
├── Profile Page
├── Jobs Page
├── Network Page
├── Messages Page
└── Settings Page
```

### Component Principles

1. **Reusability:** Components work across multiple contexts
2. **Composability:** Small components combine into larger ones
3. **Semantic:** Component names reflect purpose, not appearance
4. **Accessible:** ARIA labels, keyboard navigation, screen reader support
5. **Responsive:** Adapt to screen size while maintaining desktop-first approach
6. **Performant:** Lazy loading, memoization where appropriate

---

## Data Model

### Core Entities

```typescript
User {
  id: string
  name: string
  title: string
  company: string
  avatar: string
  verified: boolean
  isPremium: boolean
  identityVerified: boolean
  trustScore: number
  professionalScore: number
  connectionCount: number
  responseRate: number
  responseTime: string
  workStatus: WorkStatus | null
  customUrl: string
}

Experience {
  id: string
  role: string
  company: string
  startDate: string
  endDate: string
  description: string
  verified: boolean
  verifiedByCompany: boolean
  verifiedByColleague?: string
  colleagueCount: number
}

Skill {
  name: string
  endorsements: number
  verified: boolean
  verifiedBy: 'test' | 'project' | 'peer' | undefined
  testScore?: number
  topEndorsers?: string[]
}

Job {
  id: string
  title: string
  company: string
  location: string
  salary: string
  type: 'full-time' | 'part-time' | 'contract' | 'remote'
  matchScore: number
  skills: string[]
  postedDate: string
}

Post {
  id: string
  author: User
  content: string
  image?: string
  type: 'text' | 'image' | 'article'
  likes: number
  comments: number
  shares: number
  timeAgo: string
  liked: boolean
  saved: boolean
}
```

---

## State Management Strategy

### Current Approach: Context API
- **AppContext:** Global user state, authentication status
- **Local State:** Component-specific UI state
- **URL State:** Navigation and routing parameters

### Future Considerations:
- For complex data: Consider Redux Toolkit or Zustand
- For server state: Consider React Query or SWR
- For real-time: Consider WebSocket integration

---

## Routing Architecture

```
/ (Home Feed)
├── /profile (Own Profile)
├── /profile/:userId (Other User Profile)
├── /network (Network Management)
├── /jobs (Job Discovery)
│   └── /jobs/:jobId (Job Details)
├── /messages (Messaging)
│   └── /messages/:threadId (Message Thread)
├── /notifications (Notifications)
├── /learning (Learning Platform - Coming Soon)
├── /settings (Settings)
│   ├── /settings/account
│   ├── /settings/privacy
│   └── /settings/notifications
├── /premium (Premium Upgrade)
└── /auth (Authentication)
    ├── /auth/login
    └── /auth/register
```

---

## Design Token System

### Color Palette
```css
/* Brand Colors */
--color-primary: #0066FF        /* Primary Blue */
--color-success: #00C853        /* Success Green */
--color-warning: #FF9800        /* Warning Orange */
--color-danger: #F44336         /* Danger Red */

/* Gradients */
--gradient-primary: linear-gradient(135deg, #0066FF 0%, #7c3aed 100%)
--gradient-success: linear-gradient(135deg, #00C853 0%, #00E676 100%)
--gradient-premium: linear-gradient(135deg, #FFD700 0%, #FFA500 100%)

/* Semantic Colors */
--color-foreground: hsl(0 0% 10%)
--color-muted-foreground: hsl(0 0% 45%)
--color-background: hsl(0 0% 98%)
--color-card: hsl(0 0% 100%)
--color-border: hsl(0 0% 90%)
```

### Typography
```css
/* Font Family */
font-family: Vazirmatn, system-ui, sans-serif

/* Font Weights */
--font-normal: 400
--font-medium: 500
--font-semibold: 600
--font-bold: 700

/* Type Scale */
--text-xs: 0.75rem      /* 12px */
--text-sm: 0.875rem     /* 14px */
--text-base: 1rem       /* 16px */
--text-lg: 1.125rem     /* 18px */
--text-xl: 1.25rem      /* 20px */
--text-2xl: 1.5rem      /* 24px */
--text-3xl: 1.875rem    /* 30px */
```

### Spacing
```css
/* Based on 4px grid */
--spacing-1: 0.25rem    /* 4px */
--spacing-2: 0.5rem     /* 8px */
--spacing-3: 0.75rem    /* 12px */
--spacing-4: 1rem       /* 16px */
--spacing-5: 1.25rem    /* 20px */
--spacing-6: 1.5rem     /* 24px */
--spacing-8: 2rem       /* 32px */
```

### Border Radius
```css
--radius-sm: 0.5rem     /* 8px */
--radius-md: 0.75rem    /* 12px */
--radius-lg: 1rem       /* 16px */
--radius-xl: 1.5rem     /* 24px */
--radius-full: 9999px   /* Pill shape */
```

---

## Performance Optimization

### Code Splitting
- Route-based code splitting (React.lazy)
- Dynamic imports for heavy components
- Lazy loading images and media

### Rendering Optimization
- React.memo for expensive components
- useMemo/useCallback where appropriate
- Virtual scrolling for long lists (future)

### Asset Optimization
- Image optimization with WebP/AVIF
- SVG icons via lucide-react (tree-shakeable)
- Font subsetting for Vazirmatn

---

## Accessibility Standards

### WCAG 2.1 Level AA Compliance
- ✅ Semantic HTML structure
- ✅ ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ Focus management
- ✅ Color contrast ratios
- ✅ Alt text for images
- ✅ Screen reader compatibility

---

## Future Technical Considerations

### Scalability
- API integration (currently mock data)
- Database design for user data
- Caching strategies
- CDN for static assets

### Real-Time Features
- WebSocket for messaging
- Live notifications
- Presence indicators
- Collaborative features

### Advanced Features
- AI-powered job matching
- Skill assessment algorithms
- Trust score calculation
- Recommendation engine

---

## Development Workflow

### File Structure
```
src/
├── app/
│   ├── components/
│   │   ├── ui/              # Base components
│   │   ├── home/            # Home feed components
│   │   ├── profile/         # Profile components
│   │   ├── jobs/            # Jobs components
│   │   ├── network/         # Network components
│   │   ├── messages/        # Messaging components
│   │   └── Layout.tsx       # Main layout
│   ├── context/             # React Context providers
│   ├── data/                # Mock data and types
│   ├── routes.tsx           # Route definitions
│   └── App.tsx              # Root component
├── styles/
│   ├── theme.css            # Design tokens
│   ├── fonts.css            # Font imports
│   └── app.css              # Global styles
└── imports/                 # Static assets
```

### Naming Conventions
- **Components:** PascalCase (`ProfilePage.tsx`)
- **Utilities:** camelCase (`formatDate.ts`)
- **Constants:** SCREAMING_SNAKE_CASE (`API_BASE_URL`)
- **Types:** PascalCase with type suffix (`UserType`, `PostData`)

---

## Summary

Hamrahe is architected as a **desktop-first, web-based professional platform** with a clear path to cross-platform expansion. Every technical decision supports the vision of an integrated system where professional identity, trust, networking, and opportunity discovery work together seamlessly.

The current phase establishes the foundation. Future phases will build upon this architecture to create native mobile experiences, real-time collaboration, and AI-powered professional intelligence.
