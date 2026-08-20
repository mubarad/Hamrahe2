export interface CompanyData {
  id: string;
  name: string;
  logo: string;
  cover: string;
  tagline: string;
  industry: string;
  subIndustry: string;
  size: string;
  founded: string;
  headquarters: string;
  website: string;
  workModel: string;
  verified: boolean;
  badges: string[];
  followers: number;
  confirmedEmployees: number;
  openJobs: number;
  activityStatus: string;
  responseTime: string;
  responseRate: number;
  lastUpdated: string;
  about: string;
  mission: string;
  story: { start: string; building: string; future: string };
  whyWorkHere: string[];
  companyStandards: { general: string[]; product: string[] };
  workplaceSignals: Record<string, string>;
  openTo: string[];
  specialties: string[];
  companyGraph: Record<string, number>;
  companyActivity: Record<string, string | number>;
}

export interface JobData {
  id: string;
  title: string;
  department: string;
  location: string;
  workType: string;
  model: string;
  seniority: string;
  salaryRange: string | null;
  matchScore: number;
  readinessScore: number;
  requiredAssessment: string;
  recommendedLearning: string;
  applicants: number;
  postedDate: string;
  responseTime: string;
  jobQuality: number;
  sponsored: boolean;
  hiringTeam: { name: string; role: string; avatar: string }[];
}

export interface LearningPath {
  id: string;
  title: string;
  duration: string;
  level: string;
  related: string[];
  completed: boolean;
  progress: number;
}

export interface Assessment {
  id: string;
  title: string;
  type: string;
  duration: string;
  required: boolean;
  completed: boolean;
  relatedRoles: string[];
}

export interface EventData {
  id: string;
  title: string;
  type: string;
  date: string;
  time: string;
  mode: string;
  registrations: number;
  relatedJobs: string[];
  recommendedBefore: string[];
  featured: boolean;
}

export interface PersonData {
  name: string;
  role: string;
  avatar: string;
  verified?: boolean;
  badge?: string;
  mutual?: number;
}

export interface PostData {
  id: string;
  type: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  reshares: number;
  sponsored: boolean;
  image?: string;
}

export const SNAPP: CompanyData = {
  id: "snapp",
  name: "Snapp",
  logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&auto=format",
  cover: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format",
  tagline: "Iran's Leading Super App",
  industry: "Technology",
  subIndustry: "Super App · Ride-hailing · Fintech",
  size: "1,000+ employees",
  founded: "2014",
  headquarters: "Tehran, Iran",
  website: "snapp.ir",
  workModel: "Hybrid",
  verified: true,
  badges: ["Verified Company", "Trusted Employer", "Fast Responder", "Assessment Ready"],
  followers: 24530,
  confirmedEmployees: 436,
  openJobs: 12,
  activityStatus: "Actively Hiring",
  responseTime: "Usually within 5 days",
  responseRate: 68,
  lastUpdated: "3 days ago",
  about:
    "Snapp started with a mission to make urban transportation easier and more accessible. Today, our teams are building a super app that connects millions of people to everyday services — from rides and food delivery to financial services and logistics. We operate at a scale few Iranian technology companies have reached, and we're just getting started.",
  mission: "Connecting people to everyday services through technology",
  story: {
    start:
      "We started in 2014 with a simple idea: make getting a ride in Tehran as easy as tapping your phone. What began as a ride-hailing service quickly grew into something much larger.",
    building:
      "Today, our teams are building Snapp's super app ecosystem — connecting millions of users to transportation, food delivery, logistics, and financial services. We operate at a scale few Iranian tech companies have reached.",
    future:
      "We're expanding into new verticals, deepening our AI and data capabilities, and building the infrastructure that powers Iran's digital economy.",
  },
  whyWorkHere: [
    "Work on products used by millions of people every day",
    "Join experienced, diverse, and product-focused teams",
    "Hybrid work model with real flexibility",
    "Clear career growth paths and structured development support",
    "Competitive compensation and strong benefits package",
    "High-ownership culture with fast decision-making",
  ],
  companyStandards: {
    general: ["Clear communication", "Product thinking", "Ownership", "Learning mindset", "Collaboration"],
    product: ["Portfolio quality", "Research thinking", "Problem-solving", "Cross-functional communication"],
  },
  workplaceSignals: {
    "Work Style": "Fast-paced",
    "Team Structure": "Cross-functional",
    "Work Model": "Hybrid",
    "Hiring Process": "Structured",
    "Learning Culture": "Active",
    "Response Behavior": "Good",
    "Collaboration Style": "High ownership",
  },
  openTo: ["Hiring", "Partnerships", "Internships", "University collaboration", "Events"],
  specialties: ["Ride-hailing", "Food Delivery", "Fintech", "Logistics", "AI & Data", "Product Engineering"],
  companyGraph: {
    employees: 436,
    followers: 24530,
    openJobs: 12,
    learningPaths: 8,
    activeAssessments: 6,
    upcomingEvents: 3,
    products: 14,
    showcasePages: 5,
  },
  companyActivity: {
    lastProfileUpdate: "3 days ago",
    lastPost: "2 days ago",
    lastJobPosted: "1 week ago",
    lastEvent: "3 weeks ago",
    hiringStatus: "Actively hiring",
    activityScore: 82,
    moderationStatus: "Clean",
  },
};

export const MOCK_JOBS: JobData[] = [
  {
    id: "1",
    title: "Senior Product Designer",
    department: "Product",
    location: "Tehran",
    workType: "Full-time",
    model: "Hybrid",
    seniority: "Senior",
    salaryRange: "40M – 60M Toman",
    matchScore: 92,
    readinessScore: 64,
    requiredAssessment: "Product Design Assessment",
    recommendedLearning: "Portfolio Preparation Path",
    applicants: 47,
    postedDate: "5 days ago",
    responseTime: "Usually within 5 days",
    jobQuality: 88,
    sponsored: false,
    hiringTeam: [
      {
        name: "Sara Ahmadi",
        role: "Talent Acquisition Manager",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format",
      },
    ],
  },
  {
    id: "2",
    title: "Senior Backend Engineer",
    department: "Engineering",
    location: "Tehran",
    workType: "Full-time",
    model: "Hybrid",
    seniority: "Senior",
    salaryRange: null,
    matchScore: 74,
    readinessScore: 80,
    requiredAssessment: "Technical Problem Solving",
    recommendedLearning: "System Design Fundamentals",
    applicants: 83,
    postedDate: "1 week ago",
    responseTime: "Usually within 5 days",
    jobQuality: 92,
    sponsored: true,
    hiringTeam: [
      {
        name: "Ali Rezaei",
        role: "Engineering Lead",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format",
      },
    ],
  },
  {
    id: "3",
    title: "Product Manager",
    department: "Product",
    location: "Tehran",
    workType: "Full-time",
    model: "On-site",
    seniority: "Mid-level",
    salaryRange: "35M – 50M Toman",
    matchScore: 68,
    readinessScore: 52,
    requiredAssessment: "Product Thinking Assessment",
    recommendedLearning: "Product Management Foundations",
    applicants: 124,
    postedDate: "2 weeks ago",
    responseTime: "Usually within 5 days",
    jobQuality: 85,
    sponsored: false,
    hiringTeam: [],
  },
  {
    id: "4",
    title: "Data Scientist",
    department: "Data",
    location: "Tehran",
    workType: "Full-time",
    model: "Hybrid",
    seniority: "Mid-level",
    salaryRange: null,
    matchScore: 58,
    readinessScore: 70,
    requiredAssessment: "Problem Solving Assessment",
    recommendedLearning: "Data Analysis Foundations",
    applicants: 61,
    postedDate: "3 weeks ago",
    responseTime: "Usually within 5 days",
    jobQuality: 79,
    sponsored: false,
    hiringTeam: [],
  },
];

export const MOCK_LEARNING: LearningPath[] = [
  {
    id: "1",
    title: "Product Thinking Foundations",
    duration: "6 hours",
    level: "Intermediate",
    related: ["Product Manager", "Senior Product Designer"],
    completed: false,
    progress: 0,
  },
  {
    id: "2",
    title: "Portfolio Preparation Path",
    duration: "4 hours",
    level: "Beginner",
    related: ["Senior Product Designer"],
    completed: false,
    progress: 35,
  },
  {
    id: "3",
    title: "Interview Readiness",
    duration: "3 hours",
    level: "All levels",
    related: ["All roles"],
    completed: true,
    progress: 100,
  },
  {
    id: "4",
    title: "Design Thinking Workshop",
    duration: "5 hours",
    level: "Intermediate",
    related: ["Senior Product Designer", "UX Researcher"],
    completed: false,
    progress: 0,
  },
  {
    id: "5",
    title: "System Design Fundamentals",
    duration: "8 hours",
    level: "Advanced",
    related: ["Senior Backend Engineer"],
    completed: false,
    progress: 0,
  },
];

export const MOCK_ASSESSMENTS: Assessment[] = [
  {
    id: "1",
    title: "Product Design Assessment",
    type: "Skill Assessment",
    duration: "45 min",
    required: true,
    completed: false,
    relatedRoles: ["Senior Product Designer"],
  },
  {
    id: "2",
    title: "Product Thinking Assessment",
    type: "Skill Assessment",
    duration: "40 min",
    required: true,
    completed: false,
    relatedRoles: ["Product Manager"],
  },
  {
    id: "3",
    title: "DISC Work Style",
    type: "Work Style",
    duration: "20 min",
    required: false,
    completed: true,
    relatedRoles: ["All roles"],
  },
  {
    id: "4",
    title: "Communication Style",
    type: "Personality",
    duration: "25 min",
    required: false,
    completed: false,
    relatedRoles: ["All roles"],
  },
  {
    id: "5",
    title: "English Level Test",
    type: "Language",
    duration: "30 min",
    required: false,
    completed: false,
    relatedRoles: ["All roles"],
  },
];

export const MOCK_EVENTS: EventData[] = [
  {
    id: "1",
    title: "Product Design Hiring Day",
    type: "Hiring Day",
    date: "May 25, 2026",
    time: "10:00 AM",
    mode: "Online",
    registrations: 234,
    relatedJobs: ["Senior Product Designer", "UX Researcher"],
    recommendedBefore: ["Portfolio Preparation Path", "Interview Readiness"],
    featured: true,
  },
  {
    id: "2",
    title: "Tech Talks: Building at Scale",
    type: "Webinar",
    date: "June 3, 2026",
    time: "2:00 PM",
    mode: "Online",
    registrations: 89,
    relatedJobs: ["Senior Backend Engineer"],
    recommendedBefore: [],
    featured: false,
  },
  {
    id: "3",
    title: "Snapp Engineering Open Day",
    type: "Company Open Day",
    date: "June 15, 2026",
    time: "11:00 AM",
    mode: "On-site · Tehran",
    registrations: 156,
    relatedJobs: ["Senior Backend Engineer", "Product Manager"],
    recommendedBefore: ["Interview Readiness"],
    featured: false,
  },
];

export const MOCK_PEOPLE = {
  leadership: [
    {
      name: "Rasoul Jalilian",
      role: "CEO & Co-Founder",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format",
      verified: true,
    },
    {
      name: "Mostafa Sayyari",
      role: "CTO",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format",
      verified: true,
    },
  ],
  hiringTeam: [
    {
      name: "Sara Ahmadi",
      role: "Talent Acquisition Manager",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format",
      badge: "Verified Recruiter",
    },
    {
      name: "Mehdi Karimi",
      role: "Senior Recruiter",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format",
      badge: "Verified Recruiter",
    },
  ],
  employees: [
    {
      name: "Neda Hosseini",
      role: "Senior Product Designer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format",
      mutual: 2,
    },
    {
      name: "Reza Mohammadi",
      role: "Backend Engineer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format",
      mutual: 0,
    },
    {
      name: "Mina Sadeghi",
      role: "Product Manager",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format",
      mutual: 1,
    },
    {
      name: "Amir Taheri",
      role: "Data Scientist",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format",
      mutual: 3,
    },
    {
      name: "Zahra Moradi",
      role: "UX Researcher",
      avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&auto=format",
      mutual: 0,
    },
    {
      name: "Omid Rostami",
      role: "Engineering Manager",
      avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&auto=format",
      mutual: 1,
    },
  ],
};

export const MOCK_POSTS: PostData[] = [
  {
    id: "1",
    type: "Hiring Post",
    content:
      "We're looking for a Senior Product Designer to join our growing team. If you're passionate about building products used by millions, we'd love to hear from you. Check out the role and apply today.",
    timestamp: "2 days ago",
    likes: 234,
    comments: 47,
    reshares: 18,
    sponsored: false,
  },
  {
    id: "2",
    type: "Company Update",
    content:
      "Excited to announce that Snapp has reached 15 million registered users — a huge milestone for our team and a testament to the trust our users place in us every day. Thank you to every team member who made this possible.",
    timestamp: "1 week ago",
    likes: 1240,
    comments: 198,
    reshares: 312,
    sponsored: false,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format",
  },
  {
    id: "3",
    type: "Culture Post",
    content:
      "Last weekend, our entire engineering org came together for a 48-hour hackathon. The energy was incredible — and we're already moving 3 of the top projects into production. This is what building looks like at Snapp.",
    timestamp: "2 weeks ago",
    likes: 456,
    comments: 62,
    reshares: 43,
    sponsored: false,
  },
  {
    id: "4",
    type: "Product Update",
    content:
      "SnappFood now delivers in under 25 minutes in 12 new cities across Iran. We're committed to expanding access to fast, reliable food delivery for everyone.",
    timestamp: "3 weeks ago",
    likes: 892,
    comments: 134,
    reshares: 67,
    sponsored: false,
  },
];

export const MOCK_TRUST = {
  verificationStatus: "Verified Company",
  trustLevel: "Trusted Employer",
  identityVerified: true,
  domainVerified: true,
  mobileVerified: true,
  nationalIdChecked: true,
  confirmedEmployees: 436,
  verifiedRecruiters: 2,
  activeHiring: true,
  fastResponder: true,
  learningFriendly: true,
  assessmentReady: true,
  candidateFriendly: true,
  profileUpdatedRecently: true,
  noAbuseWarning: true,
  reputationScores: {
    "Identity Trust": { value: "Verified", color: "emerald" },
    "Hiring Behavior": { value: "Good", color: "blue" },
    "Candidate Experience": { value: "Medium", color: "amber" },
    "Activity Health": { value: "Active", color: "emerald" },
    "Employee Signals": { value: "Strong", color: "emerald" },
    "Policy Compliance": { value: "Clean", color: "emerald" },
  },
  moderationStatus: "Clean",
  lastModerationCheck: "May 10, 2026",
  responseRate: 68,
  activeJobs: 12,
  completedEvents: 2,
  newsletterActive: true,
};

export const MOCK_SIMILAR_COMPANIES = [
  { name: "Tapsi", industry: "Technology", openJobs: 8, followers: 12400, verified: true },
  { name: "Digikala", industry: "E-commerce", openJobs: 32, followers: 125000, verified: true },
  { name: "Cafe Bazaar", industry: "Technology", openJobs: 15, followers: 34200, verified: true },
  { name: "Aparat", industry: "Media & Tech", openJobs: 6, followers: 18900, verified: false },
];

export const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "SnappRide",
    category: "Transportation",
    description: "On-demand ride-hailing service connecting drivers and passengers across major Iranian cities.",
    cta: "Learn More",
  },
  {
    id: "2",
    name: "SnappFood",
    category: "Food Delivery",
    description: "Fast food delivery from thousands of restaurants in under 30 minutes.",
    cta: "Learn More",
  },
  {
    id: "3",
    name: "SnappPay",
    category: "Fintech",
    description: "Digital wallet and payment solution integrated across the Snapp super app ecosystem.",
    cta: "Learn More",
  },
  {
    id: "4",
    name: "SnappBox",
    category: "Logistics",
    description: "Same-day and scheduled package delivery for individuals and businesses.",
    cta: "Learn More",
  },
];
