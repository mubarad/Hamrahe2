// Mock data for Hamrahe platform
import ahmadPhoto from "../../imports/photo_1322455563730881281_c.jpg";

export const IMAGES = {
  avatars: {
    ahmad: ahmadPhoto,
    ali: "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdCUyMGhlYWRzaG90fGVufDF8fHx8MTc3NTY1OTc5N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    reza: "https://images.unsplash.com/photo-1622902141397-a89655353bec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMGFzaWFuJTIwbWFuJTIwc3VpdHxlbnwxfHx8fDE3NzU2NDQwMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    mina: "https://images.unsplash.com/photo-1758518729459-235dcaadc611?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGdsYXNzZXMlMjBzbWlsaW5nfGVufDF8fHx8MTc3NTY3OTM5Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    developer: "https://images.unsplash.com/photo-1630332458839-5ece43363621?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMGRldmVsb3BlciUyMGNvZGluZ3xlbnwxfHx8fDE3NzU2NzkzODZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    designer: "https://images.unsplash.com/photo-1752650733757-bcb151bc2045?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGRlc2lnbmVyJTIwY3JlYXRpdmV8ZW58MXx8fHwxNzc1Njc5Mzg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  posts: {
    office: "https://images.unsplash.com/photo-1748346918817-0b1b6b2f9bab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2UlMjB0ZWFtfGVufDF8fHx8MTc3NTYwMDAyOXww&ixlib=rb-4.1.0&q=80&w=1080",
    startup: "https://images.unsplash.com/photo-1702047048032-e734daa2473d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwdGVjaG5vbG9neSUyMGNvbXBhbnl8ZW58MXx8fHwxNzc1Njc5Mzg1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    conference: "https://images.unsplash.com/photo-1762968269894-1d7e1ce8894e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbmZlcmVuY2UlMjBwcmVzZW50YXRpb258ZW58MXx8fHwxNzc1Njc5Mzg1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    building: "https://images.unsplash.com/photo-1760246964044-1384f71665b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBidWlsZGluZyUyMGV4dGVyaW9yJTIwbW9kZXJufGVufDF8fHx8MTc3NTY3OTM4Nnww&ixlib=rb-4.1.0&q=80&w=1080",
  },
};

export interface User {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  verified: boolean;
  location?: string;
  connectionCount?: number;
  professionalScore?: number;
  responseRate?: number;
  responseTime?: string;
  workStatus?: WorkStatus[];
}

export type WorkStatus = "fulltime" | "parttime" | "project" | "consulting" | "hiring";

export interface Post {
  id: string;
  author: User;
  content: string;
  image?: string;
  type: "text" | "image" | "video";
  likes: number;
  comments: number;
  shares: number;
  timeAgo: string;
  liked: boolean;
  saved: boolean;
}

export interface JobPost {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: "Full-time" | "Part-time" | "Remote" | "Freelance" | "Contract";
  salary?: string;
  matchScore: number;
  postedAgo: string;
  applicants: number;
  description: string;
  requirements: string[];
  skills: string[];
  isPromoted?: boolean;
  isSaved?: boolean;
  applied?: boolean;
  gapAnalysis?: GapItem[];
  smartTips?: string[];
}

export interface GapItem {
  skill: string;
  status: "have" | "partial" | "missing";
  tip?: string;
}

export interface Skill {
  name: string;
  endorsements: number;
  verified: boolean;
  verifiedBy?: "test" | "project" | "peer";
  testScore?: number;
  topEndorsers?: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  logo?: string;
  startDate: string;
  endDate: string;
  description: string;
  verified: boolean;
  verifiedByCompany?: boolean;
  verifiedByColleague?: string;
  colleagueCount?: number;
}

export interface Recommendation {
  id: string;
  author: User;
  text: string;
  relationship: string;
  date: string;
  weight?: "high" | "medium" | "low";
  skills?: string[];
}

export interface Project {
  id: string;
  title: string;
  company: string;
  companyAvatar: string;
  budget: string;
  duration: string;
  type: "freelance" | "consulting" | "short-term";
  skills: string[];
  description: string;
  applicants: number;
  matchScore: number;
  postedAgo: string;
  urgent?: boolean;
}

export const currentUser: User = {
  id: "me",
  name: "Ahmad Parvizi",
  title: "Senior Product Designer",
  company: "Digikala",
  avatar: ahmadPhoto,
  verified: true,
  location: "Tehran, Iran",
  connectionCount: 847,
  professionalScore: 82,
  responseRate: 94,
  responseTime: "< 2h",
  workStatus: ["fulltime", "consulting", "project"],
};

export const users: User[] = [
  { id: "1", name: "Ali Mohammadi", title: "Engineering Manager", company: "Snapp", avatar: IMAGES.avatars.ali, verified: true, responseRate: 88, responseTime: "< 4h" },
  { id: "2", name: "Reza Karimi", title: "Full Stack Developer", company: "Cafe Bazaar", avatar: IMAGES.avatars.reza, verified: false, responseRate: 45, responseTime: "~ 2d" },
  { id: "3", name: "Mina Hosseini", title: "Data Scientist", company: "Tapsi", avatar: IMAGES.avatars.mina, verified: true, responseRate: 92, responseTime: "< 1h" },
  { id: "4", name: "Amir Rahimi", title: "Frontend Developer", company: "Divar", avatar: IMAGES.avatars.developer, verified: false, responseRate: 60, responseTime: "~ 12h" },
  { id: "5", name: "Nazanin Farahani", title: "UX Researcher", company: "Snapp Food", avatar: IMAGES.avatars.designer, verified: true, responseRate: 97, responseTime: "< 30m" },
];

export const feedPosts: Post[] = [
  {
    id: "p1",
    author: users[0],
    content: "Excited to share that our team at Snapp just shipped a major infrastructure upgrade! We reduced API latency by 40% across all services. Proud of the engineering team for pulling this off in just 3 sprints. What's the biggest performance win your team has achieved recently?",
    type: "text",
    likes: 234,
    comments: 45,
    shares: 12,
    timeAgo: "2h",
    liked: false,
    saved: false,
  },
  {
    id: "p2",
    author: users[4],
    content: "Just wrapped up a fascinating user research study on how professionals in Iran navigate job searches differently than in Western markets. Key insight: trust signals and personal recommendations carry 3x more weight than formal qualifications. This is reshaping our entire product strategy.",
    image: IMAGES.posts.office,
    type: "image",
    likes: 189,
    comments: 67,
    shares: 34,
    timeAgo: "4h",
    liked: true,
    saved: false,
  },
  {
    id: "p3",
    author: users[2],
    content: "Data Science tip of the day: Don't start with the most complex model. In our latest project at Tapsi, a well-tuned gradient boosting model outperformed our deep learning approach while being 10x cheaper to run in production. Sometimes simple wins.",
    type: "text",
    likes: 412,
    comments: 89,
    shares: 56,
    timeAgo: "6h",
    liked: false,
    saved: true,
  },
  {
    id: "p4",
    author: users[1],
    content: "Attended an incredible tech conference in Tehran this weekend. The energy in the Iranian tech ecosystem is unmatched. Met so many talented developers building world-class products. The future is bright!",
    image: IMAGES.posts.conference,
    type: "image",
    likes: 567,
    comments: 123,
    shares: 78,
    timeAgo: "1d",
    liked: false,
    saved: false,
  },
];

export const feedJobs: JobPost[] = [
  {
    id: "j1",
    title: "Senior Product Designer",
    company: "Snapp",
    location: "Tehran (Hybrid)",
    type: "Full-time",
    salary: "45-65M Toman",
    matchScore: 92,
    postedAgo: "2h ago",
    applicants: 34,
    description: "We're looking for a Senior Product Designer to lead the design of our next-generation ride-sharing experience. You'll work closely with engineering, product, and research teams to shape the future of urban mobility in the Middle East.",
    requirements: ["5+ years of product design experience", "Strong portfolio of shipped products", "Experience with design systems", "Figma proficiency", "User research experience"],
    skills: ["Product Design", "Figma", "Design Systems", "User Research", "Prototyping"],
    isPromoted: true,
    gapAnalysis: [
      { skill: "Product Design", status: "have" },
      { skill: "Figma", status: "have" },
      { skill: "Design Systems", status: "have" },
      { skill: "User Research", status: "have" },
      { skill: "Prototyping", status: "partial", tip: "Add more prototyping projects to your portfolio" },
    ],
    smartTips: [
      "Your profile is 92% matched — you're a top candidate!",
      "Mention your Digikala design system work in cover letter",
      "Ali Mohammadi works here — ask for a referral",
    ],
  },
  {
    id: "j2",
    title: "Full Stack Developer",
    company: "Digikala",
    location: "Tehran (On-site)",
    type: "Full-time",
    salary: "40-55M Toman",
    matchScore: 78,
    postedAgo: "1d ago",
    applicants: 89,
    description: "Join Digikala's platform team to build scalable e-commerce solutions serving millions of users. Work with React, Node.js, and microservices architecture.",
    requirements: ["3+ years full stack experience", "React & Node.js proficiency", "Database design skills", "API development", "Agile methodology"],
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "Docker"],
    gapAnalysis: [
      { skill: "React", status: "partial", tip: "Highlight any React project work" },
      { skill: "Node.js", status: "missing", tip: "Consider learning Node.js basics" },
      { skill: "TypeScript", status: "partial", tip: "Your JS skills transfer well" },
      { skill: "PostgreSQL", status: "missing", tip: "Take a SQL fundamentals course" },
      { skill: "Docker", status: "missing", tip: "Not critical — focus on other skills first" },
    ],
    smartTips: [
      "You work at Digikala — internal transfers have 3x acceptance rate",
      "Missing 3 key technical skills — this role may be a stretch",
      "Consider upskilling in Node.js before applying",
    ],
  },
  {
    id: "j3",
    title: "Data Scientist",
    company: "Tapsi",
    location: "Remote",
    type: "Remote",
    salary: "50-70M Toman",
    matchScore: 65,
    postedAgo: "3d ago",
    applicants: 56,
    description: "Lead data science initiatives for our demand forecasting and pricing optimization systems. Strong background in ML and statistical modeling required.",
    requirements: ["MSc in Computer Science or Statistics", "3+ years ML experience", "Python & SQL proficiency", "Production ML deployment", "A/B testing experience"],
    skills: ["Python", "Machine Learning", "SQL", "TensorFlow", "Statistics"],
    gapAnalysis: [
      { skill: "Python", status: "missing", tip: "Not your core skill set" },
      { skill: "Machine Learning", status: "missing", tip: "Requires significant ramp-up" },
      { skill: "SQL", status: "partial", tip: "Basic knowledge may help" },
      { skill: "TensorFlow", status: "missing", tip: "Deep learning framework — steep curve" },
      { skill: "Statistics", status: "partial", tip: "Design research stats transfer somewhat" },
    ],
    smartTips: [
      "This role requires different core skills than yours",
      "Consider a UX Data Analyst role instead for better fit",
      "Mina Hosseini works here — could give you insider info",
    ],
  },
  {
    id: "j4",
    title: "UX Researcher",
    company: "Cafe Bazaar",
    location: "Tehran (Hybrid)",
    type: "Full-time",
    salary: "35-50M Toman",
    matchScore: 85,
    postedAgo: "5h ago",
    applicants: 22,
    description: "Drive user research strategy for Iran's largest app store. Conduct mixed-methods research to uncover user needs and inform product decisions.",
    requirements: ["3+ years UX research experience", "Mixed methods expertise", "Strong stakeholder management", "Research tool proficiency"],
    skills: ["User Research", "Usability Testing", "Data Analysis", "Figma", "Survey Design"],
    gapAnalysis: [
      { skill: "User Research", status: "have" },
      { skill: "Usability Testing", status: "have" },
      { skill: "Data Analysis", status: "partial", tip: "Strengthen quantitative analysis" },
      { skill: "Figma", status: "have" },
      { skill: "Survey Design", status: "partial", tip: "Take a research methods course" },
    ],
    smartTips: [
      "Strong match — your design research background is highly relevant",
      "You worked at Cafe Bazaar before — mention your institutional knowledge",
      "Emphasize your mixed-methods research experience",
    ],
  },
  {
    id: "j5",
    title: "Frontend Engineer",
    company: "Divar",
    location: "Tehran (On-site)",
    type: "Full-time",
    salary: "38-52M Toman",
    matchScore: 71,
    postedAgo: "2d ago",
    applicants: 112,
    description: "Build the next generation of Iran's largest classifieds platform. Work on performance-critical features serving millions of daily users.",
    requirements: ["3+ years frontend experience", "React/Next.js expertise", "Performance optimization", "Responsive design"],
    skills: ["React", "Next.js", "TypeScript", "CSS", "Performance"],
    gapAnalysis: [
      { skill: "React", status: "partial", tip: "Design-to-code skills are valuable" },
      { skill: "Next.js", status: "missing", tip: "Modern React framework" },
      { skill: "TypeScript", status: "partial" },
      { skill: "CSS", status: "have" },
      { skill: "Performance", status: "missing", tip: "Web performance is specialized" },
    ],
    smartTips: [
      "Your design + frontend knowledge is a unique combo",
      "Amir Rahimi works here — get a referral",
      "Strong competition with 112 applicants",
    ],
  },
];

export const profileSkills: Skill[] = [
  { name: "Product Design", endorsements: 47, verified: true, verifiedBy: "test", testScore: 94, topEndorsers: ["Ali Mohammadi", "Mina Hosseini", "Nazanin Farahani"] },
  { name: "Figma", endorsements: 39, verified: true, verifiedBy: "test", testScore: 88, topEndorsers: ["Reza Karimi", "Amir Rahimi"] },
  { name: "Design Systems", endorsements: 31, verified: true, verifiedBy: "project", topEndorsers: ["Ali Mohammadi"] },
  { name: "User Research", endorsements: 28, verified: true, verifiedBy: "peer", topEndorsers: ["Nazanin Farahani", "Mina Hosseini"] },
  { name: "Prototyping", endorsements: 24, verified: false },
  { name: "UI/UX Design", endorsements: 42, verified: true, verifiedBy: "test", testScore: 91, topEndorsers: ["Ali Mohammadi", "Reza Karimi", "Nazanin Farahani"] },
  { name: "Interaction Design", endorsements: 19, verified: false },
  { name: "Design Thinking", endorsements: 15, verified: false },
];

export const profileExperience: Experience[] = [
  {
    id: "e1",
    role: "Senior Product Designer",
    company: "Digikala",
    startDate: "Jan 2022",
    endDate: "Present",
    description: "Leading the design of core e-commerce experiences for Iran's largest online marketplace. Established the design system used across 12 product teams. Increased checkout conversion by 23% through data-driven design improvements.",
    verified: true,
    verifiedByCompany: true,
    verifiedByColleague: "HR Department",
    colleagueCount: 4,
  },
  {
    id: "e2",
    role: "Product Designer",
    company: "Snapp",
    startDate: "Mar 2019",
    endDate: "Dec 2021",
    description: "Designed the rider and driver experience for Snapp's ride-sharing platform. Led the redesign of the booking flow, reducing drop-off rate by 35%. Mentored 3 junior designers.",
    verified: true,
    verifiedByCompany: true,
    verifiedByColleague: "Ali Mohammadi (Manager)",
    colleagueCount: 3,
  },
  {
    id: "e3",
    role: "UI/UX Designer",
    company: "Cafe Bazaar",
    startDate: "Jun 2017",
    endDate: "Feb 2019",
    description: "Designed app store discovery experiences and developer tools. Created design guidelines for third-party app developers. Conducted regular usability testing sessions.",
    verified: false,
    verifiedByCompany: false,
    colleagueCount: 0,
  },
];

export const profileRecommendations: Recommendation[] = [
  {
    id: "r1",
    author: users[0],
    text: "Ahmad is one of the most talented designers I've had the pleasure of working with. His ability to translate complex business requirements into elegant, user-friendly experiences is remarkable. He consistently delivers work that exceeds expectations and has a natural ability to lead and inspire design teams.",
    relationship: "Managed Ahmad at Snapp",
    date: "March 2022",
    weight: "high",
    skills: ["Product Design", "Design Systems", "Leadership"],
  },
  {
    id: "r2",
    author: users[2],
    text: "Working with Ahmad on the data visualization project was an incredible experience. He has a rare combination of design skills and analytical thinking. His designs not only look beautiful but are grounded in solid research and user feedback.",
    relationship: "Collaborated on a project at Digikala",
    date: "November 2023",
    weight: "medium",
    skills: ["User Research", "Data Analysis", "Figma"],
  },
];

export const projects: Project[] = [
  {
    id: "pr1",
    title: "E-commerce App Redesign",
    company: "ZarrinPal",
    companyAvatar: IMAGES.avatars.ali,
    budget: "15-25M Toman",
    duration: "2-3 months",
    type: "freelance",
    skills: ["Product Design", "Figma", "User Research"],
    description: "We need an experienced product designer to redesign our payment gateway dashboard. The project involves user research, wireframing, and high-fidelity prototyping.",
    applicants: 8,
    matchScore: 95,
    postedAgo: "3h ago",
    urgent: true,
  },
  {
    id: "pr2",
    title: "Design System Consultation",
    company: "Taaghche",
    companyAvatar: IMAGES.avatars.mina,
    budget: "8-12M Toman",
    duration: "4 weeks",
    type: "consulting",
    skills: ["Design Systems", "Figma", "Documentation"],
    description: "Looking for a design system expert to audit our current system and provide recommendations for scaling across multiple product teams.",
    applicants: 4,
    matchScore: 92,
    postedAgo: "1d ago",
  },
  {
    id: "pr3",
    title: "Mobile App UX Audit",
    company: "SnappFood",
    companyAvatar: IMAGES.avatars.designer,
    budget: "5-8M Toman",
    duration: "2 weeks",
    type: "consulting",
    skills: ["User Research", "Usability Testing", "UX Audit"],
    description: "Need a UX expert to conduct a comprehensive audit of our food delivery app and identify usability issues.",
    applicants: 12,
    matchScore: 88,
    postedAgo: "2d ago",
  },
  {
    id: "pr4",
    title: "Startup MVP Design",
    company: "HealthTech Startup",
    companyAvatar: IMAGES.avatars.developer,
    budget: "20-35M Toman",
    duration: "3-4 months",
    type: "freelance",
    skills: ["Product Design", "Prototyping", "Figma"],
    description: "Early-stage health-tech startup looking for a lead designer to create the MVP for a telemedicine platform from scratch.",
    applicants: 6,
    matchScore: 90,
    postedAgo: "6h ago",
    urgent: true,
  },
  {
    id: "pr5",
    title: "Workshop: Design Thinking for Teams",
    company: "Hamkaran System",
    companyAvatar: IMAGES.avatars.reza,
    budget: "3-5M Toman",
    duration: "2 days",
    type: "consulting",
    skills: ["Design Thinking", "Workshop Facilitation", "Team Training"],
    description: "Run a 2-day design thinking workshop for our product and engineering teams (30 people).",
    applicants: 3,
    matchScore: 78,
    postedAgo: "4d ago",
  },
];

export const iranCompanies = [
  { id: "ic1", name: "Snapp", industry: "Ride-hailing", employees: "3,000+", hq: "Tehran", openRoles: 23, logo: "S" },
  { id: "ic2", name: "Digikala", industry: "E-commerce", employees: "8,000+", hq: "Tehran", openRoles: 45, logo: "D" },
  { id: "ic3", name: "Tapsi", industry: "Transportation", employees: "1,500+", hq: "Tehran", openRoles: 12, logo: "T" },
  { id: "ic4", name: "Cafe Bazaar", industry: "App Marketplace", employees: "800+", hq: "Tehran", openRoles: 8, logo: "C" },
  { id: "ic5", name: "Divar", industry: "Classifieds", employees: "1,200+", hq: "Tehran", openRoles: 17, logo: "Di" },
  { id: "ic6", name: "Torob", industry: "Price Comparison", employees: "200+", hq: "Tehran", openRoles: 5, logo: "To" },
  { id: "ic7", name: "Fidibo", industry: "E-books", employees: "150+", hq: "Tehran", openRoles: 3, logo: "F" },
  { id: "ic8", name: "ZarrinPal", industry: "Fintech", employees: "300+", hq: "Tehran", openRoles: 9, logo: "Z" },
];

export const iranEvents = [
  { id: "ev1", title: "Tehran Tech Summit 2026", date: "May 15-16, 2026", location: "Milad Tower, Tehran", attendees: 2500, type: "Conference" },
  { id: "ev2", title: "Iran UX Conference", date: "June 8, 2026", location: "Pardis Technology Park", attendees: 800, type: "Conference" },
  { id: "ev3", title: "Startup Weekend Tehran", date: "April 25-27, 2026", location: "Sharif University", attendees: 300, type: "Hackathon" },
  { id: "ev4", title: "Product Design Meetup #42", date: "April 18, 2026", location: "WeWork Tehran", attendees: 120, type: "Meetup" },
];
