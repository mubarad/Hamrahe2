import { Avatar } from "../ui/Avatar";
import { users, feedJobs } from "../../data/mock-data";
import {
  UserPlus, TrendingUp, ArrowRight, MapPin, Users,
  CheckCircle, AlertCircle, MessageCircle, Building2, Zap,
  Briefcase, Target, CheckCircle2, Clock, ChevronRight, Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useApp } from "../../context/AppContext";
import { useAIEngine } from "../../context/AIEngineContext";

// ─── GOAL & PATH WIDGET ───────────────────────────────────────────────────────

function GoalPathWidget({ goals, missions, onNavigate }: {
  goals: any[];
  missions: any[];
  onNavigate: (path: string) => void;
}) {
  const primaryGoal = goals[0];

  if (!primaryGoal) {
    return (
      <div className="bg-card border border-border/30 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-4 py-5 text-center space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-primary/8 border border-primary/15 flex items-center justify-center mx-auto">
            <Target className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">Set a career goal</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">AI Engine builds a personalized roadmap for your next milestone.</p>
          </div>
          <button
            onClick={() => onNavigate("/ai-engine/goals")}
            className="w-full px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-all cursor-pointer"
          >
            Create Goal
          </button>
        </div>
      </div>
    );
  }

  const completedCount = primaryGoal.milestones.filter((m: any) => m.completed).length;
  const totalCount = primaryGoal.milestones.length;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const nextMilestone = primaryGoal.milestones.find((m: any) => !m.completed);
  const goalMissions = missions.filter((m: any) => m.goalId === primaryGoal.id).slice(0, 2);

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (primaryGoal.evidenceCoverage / 100) * circumference;

  return (
    <div className="bg-card border border-border/30 rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-border/15">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
              <Target className="w-3.5 h-3.5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground leading-tight">Goal & Path</h3>
              <p className="text-[10px] text-muted-foreground">AI-powered career roadmap</p>
            </div>
          </div>
          {/* Evidence coverage ring */}
          <div className="flex flex-col items-center shrink-0">
            <svg width="44" height="44" viewBox="0 0 44 44" className="-rotate-90">
              <circle cx="22" cy="22" r={radius} fill="none" stroke="currentColor" strokeWidth="4" className="text-muted/30" />
              <circle
                cx="22" cy="22" r={radius} fill="none"
                stroke="url(#goalGrad)" strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-700"
              />
              <defs>
                <linearGradient id="goalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#0066FF" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-[9px] text-muted-foreground font-semibold -mt-1">Evidence</span>
            <span className="text-[10px] font-bold text-primary -mt-0.5">{primaryGoal.evidenceCoverage}%</span>
          </div>
        </div>
      </div>

      {/* Active goal */}
      <div className="px-4 py-3 border-b border-border/15">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-purple-100 text-purple-700 uppercase tracking-wide">{primaryGoal.goalType}</span>
          <span className="text-[10px] text-muted-foreground">· {primaryGoal.timeframe}</span>
        </div>
        <p className="text-xs font-bold text-foreground leading-snug">{primaryGoal.title}</p>
        <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{primaryGoal.targetRole}</p>

        {/* Milestone progress bar */}
        <div className="mt-2.5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground">Milestones</span>
            <span className="text-[10px] font-semibold text-foreground">{completedCount}/{totalCount}</span>
          </div>
          <div className="h-1.5 bg-muted/40 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-primary transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Milestone roadmap */}
      <div className="px-4 py-3 space-y-1.5 border-b border-border/15">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Milestone Roadmap</p>
        {primaryGoal.milestones.slice(0, 4).map((m: any, idx: number) => (
          <div key={m.id} className="flex items-start gap-2.5">
            <div className="flex flex-col items-center shrink-0 mt-0.5">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                m.completed
                  ? "bg-emerald-500"
                  : m.id === nextMilestone?.id
                  ? "bg-primary ring-2 ring-primary/25"
                  : "bg-muted/60 border border-border/40"
              }`}>
                {m.completed
                  ? <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                  : <span className="text-[8px] font-bold text-muted-foreground">{idx + 1}</span>
                }
              </div>
              {idx < Math.min(primaryGoal.milestones.length, 4) - 1 && (
                <div className={`w-px h-3 mt-0.5 ${m.completed ? "bg-emerald-300" : "bg-border/30"}`} />
              )}
            </div>
            <div className="flex-1 min-w-0 pb-1">
              <p className={`text-[11px] font-semibold leading-tight ${
                m.completed
                  ? "text-emerald-700 line-through decoration-emerald-400"
                  : m.id === nextMilestone?.id
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}>
                {m.title}
              </p>
              <p className="text-[10px] text-muted-foreground/70 mt-0.5">{m.dueDate}</p>
            </div>
            {m.id === nextMilestone?.id && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-primary/10 text-primary font-semibold shrink-0 mt-0.5">Next</span>
            )}
          </div>
        ))}
        {primaryGoal.milestones.length > 4 && (
          <p className="text-[10px] text-muted-foreground/60 pl-6">+{primaryGoal.milestones.length - 4} more milestones</p>
        )}
      </div>

      {/* Active missions */}
      {goalMissions.length > 0 && (
        <div className="px-4 py-3 border-b border-border/15 space-y-2">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Active Missions</p>
          {goalMissions.map((ms: any) => (
            <div key={ms.id} className="flex items-start justify-between gap-2 p-2.5 rounded-xl bg-muted/30 border border-border/20">
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold text-foreground leading-tight truncate">{ms.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">{ms.expectedImpact}</span>
                  <span className="text-[10px] text-muted-foreground">{ms.estimatedEffort}</span>
                </div>
              </div>
              <button
                onClick={() => ms.targetRoute && onNavigate(ms.targetRoute)}
                className="flex items-center gap-0.5 text-[10px] text-primary font-bold hover:underline cursor-pointer shrink-0 mt-0.5"
              >
                <Sparkles className="w-2.5 h-2.5" />
                Execute
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <button
        onClick={() => onNavigate("/ai-engine/goals")}
        className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs text-primary hover:bg-primary/5 transition-all cursor-pointer"
        style={{ fontWeight: 500 }}
      >
        <Target className="w-3 h-3" />
        Full roadmap
        <ChevronRight className="w-3 h-3" />
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

const CONNECTION_CONTEXT = [
  { mutuals: 3, context: "3 mutual connections", responded: true },
  { mutuals: 0, context: "Works at Cafe Bazaar", responded: false },
  { mutuals: 7, context: "7 mutual connections", responded: true },
  { mutuals: 1, context: "Viewed your profile", responded: false },
];

const PROFILE_PROMPTS = [
  {
    id: "skills",
    icon: CheckCircle,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    label: "Add 2 verified skills",
    desc: "+18% recruiter visibility",
    action: "Add Skills",
  },
  {
    id: "portfolio",
    icon: AlertCircle,
    color: "text-amber-500",
    bg: "bg-amber-50",
    label: "Add a portfolio project",
    desc: "Showcase real work",
    action: "Add Project",
  },
];

const COMPANY_PROMPTS = [
  {
    id: "description",
    icon: Building2,
    color: "text-primary",
    bg: "bg-primary/5",
    label: "Add a company description",
    desc: "+40% follower growth",
  },
  {
    id: "logo",
    icon: CheckCircle,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    label: "Upload a high-res logo",
    desc: "Build brand recognition",
  },
];

const COMPANIES_TO_FOLLOW = [
  { id: "c1", name: "Digikala", avatar: "", sector: "E-commerce · Tehran", followers: "12.4K" },
  { id: "c2", name: "Snapp", avatar: "", sector: "Transportation · Tehran", followers: "8.9K" },
  { id: "c3", name: "Torob", avatar: "", sector: "Price Comparison · Iran", followers: "3.2K" },
  { id: "c4", name: "Alopeyk", avatar: "", sector: "Logistics · Tehran", followers: "2.1K" },
];

const ORG_INDUSTRY_TOPICS = [
  { topic: "B2B SaaS in Iran", readers: "2.1K", delta: "+38%", color: "from-primary to-violet-500" },
  { topic: "Employer Branding", readers: "1.8K", delta: "+22%", color: "from-emerald-500 to-teal-500" },
  { topic: "Remote Hiring Trends", readers: "4.4K", delta: "+15%", color: "from-orange-500 to-amber-500" },
  { topic: "Iran Tech Ecosystem", readers: "1.5K", delta: "+41%", color: "from-pink-500 to-rose-500" },
];

const INDIVIDUAL_INDUSTRY_TOPICS = [
  { topic: "AI in Product Design", readers: "4.2K", delta: "+34%", color: "from-violet-500 to-primary" },
  { topic: "Design Systems at Scale", readers: "2.8K", delta: "+18%", color: "from-emerald-500 to-teal-500" },
  { topic: "Remote Work Patterns", readers: "6.1K", delta: "+12%", color: "from-orange-500 to-amber-500" },
  { topic: "Iran Tech Ecosystem", readers: "1.5K", delta: "+41%", color: "from-pink-500 to-rose-500" },
];

export function RightSidebar() {
  const navigate = useNavigate();
  const { currentUser: appUser } = useApp();
  const { goals, missions, activeContext } = useAIEngine();
  const [connectedUsers, setConnectedUsers] = useState<string[]>([]);
  const [followedCompanies, setFollowedCompanies] = useState<string[]>([]);
  const [dismissedPrompts, setDismissedPrompts] = useState<string[]>([]);

  const isCompany = appUser?.accountType === "company";
  const isStartup = appUser?.accountType === "startup";
  const isOrg = isCompany || isStartup;
  const orgPath = isCompany ? "/company/snapp/admin" : "/startup/nextgen/admin";

  const activePrompts = isOrg
    ? COMPANY_PROMPTS.filter(p => !dismissedPrompts.includes(p.id))
    : PROFILE_PROMPTS.filter(p => !dismissedPrompts.includes(p.id));

  const industryTopics = isOrg ? ORG_INDUSTRY_TOPICS : INDIVIDUAL_INDUSTRY_TOPICS;

  const personalGoals = goals.filter(g => g.contextId === activeContext.id);

  return (
    <div className="space-y-3 w-full">

      {/* Goal & Path Widget — individual users only */}
      {!isOrg && (
        <GoalPathWidget
          goals={personalGoals}
          missions={missions}
          onNavigate={navigate}
        />
      )}

      {/* Primary Discovery Module */}
      {isOrg ? (
        /* Company Mode: Companies/Startups to Follow */
        <div className="bg-card border border-border/30 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 pt-4 pb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-primary" />
              <h3 className="text-sm text-foreground" style={{ fontWeight: 600 }}>Companies in Your Space</h3>
            </div>
            <span className="text-[10px] text-muted-foreground/60 bg-muted/40 px-2 py-0.5 rounded-full">Tech · Iran</span>
          </div>
          <div className="px-2 pb-2">
            {COMPANIES_TO_FOLLOW.map((company) => {
              const isFollowed = followedCompanies.includes(company.id);
              const companySlug = company.name.toLowerCase().replace(/\s+/g, "-");
              return (
                <div
                  key={company.id}
                  className="flex items-center gap-2.5 px-3 py-2.5 hover:bg-muted/30 rounded-xl transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-violet-500/20 border border-border/30 flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4 text-primary" />
                  </div>
                  <button
                    onClick={() => navigate(`/company/${companySlug}`)}
                    className="flex-1 min-w-0 text-left cursor-pointer"
                  >
                    <p className="text-xs text-foreground truncate hover:text-primary transition-colors">{company.name}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{company.sector}</p>
                    <p className="text-[10px] text-muted-foreground/60 mt-0.5">{company.followers} followers</p>
                  </button>
                  <AnimatePresence mode="wait">
                    {isFollowed ? (
                      <motion.span
                        key="followed"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg shrink-0"
                      >
                        ✓ Following
                      </motion.span>
                    ) : (
                      <motion.button
                        key="follow"
                        initial={{ scale: 1 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setFollowedCompanies(prev => [...prev, company.id]);
                        }}
                        className="px-2.5 py-1 rounded-lg border border-primary/30 text-primary text-[10px] hover:bg-primary hover:text-white hover:border-primary transition-all cursor-pointer shrink-0"
                      >
                        Follow
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
          <button
            onClick={() => navigate("/network")}
            className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs text-muted-foreground hover:text-primary hover:bg-muted/20 border-t border-border/30 transition-all cursor-pointer"
          >
            Discover more companies <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      ) : (
        /* Individual Mode: People to Connect */
        <div className="bg-card border border-border/30 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 pt-4 pb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-violet-500" />
              <h3 className="text-sm text-foreground" style={{ fontWeight: 600 }}>People to Connect</h3>
            </div>
            <span className="text-[10px] text-muted-foreground/60 bg-muted/40 px-2 py-0.5 rounded-full">Based on your profile</span>
          </div>
          <div className="px-2 pb-2">
            {users.slice(0, 4).map((user, i) => {
              const ctx = CONNECTION_CONTEXT[i];
              const isConnected = connectedUsers.includes(user.id);
              return (
                <div
                  key={user.id}
                  className="flex items-center gap-2.5 px-3 py-2.5 hover:bg-muted/30 rounded-xl transition-colors group"
                >
                  <button
                    onClick={() => navigate(`/profile/${user.id}`)}
                    className="relative shrink-0 cursor-pointer"
                  >
                    <Avatar src={user.avatar} name={user.name} size="md" verified={user.verified} />
                  </button>
                  <button
                    onClick={() => navigate(`/profile/${user.id}`)}
                    className="flex-1 min-w-0 text-left cursor-pointer"
                  >
                    <p className="text-xs text-foreground truncate group-hover:text-primary transition-colors">{user.name}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{user.title}</p>
                    <p className="text-[10px] text-muted-foreground/60 flex items-center gap-1 mt-0.5">
                      {ctx.responded ? (
                        <MessageCircle className="w-2.5 h-2.5 text-emerald-500" />
                      ) : (
                        <Building2 className="w-2.5 h-2.5 text-primary/50" />
                      )}
                      {ctx.context}
                    </p>
                  </button>
                  <AnimatePresence mode="wait">
                    {isConnected ? (
                      <motion.span
                        key="connected"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg shrink-0"
                      >
                        ✓ Sent
                      </motion.span>
                    ) : (
                      <motion.button
                        key="connect"
                        initial={{ scale: 1 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setConnectedUsers(prev => [...prev, user.id]);
                        }}
                        className="w-7 h-7 rounded-full border border-primary/30 text-primary flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all cursor-pointer shrink-0"
                      >
                        <UserPlus className="w-3 h-3" />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
          <button
            onClick={() => navigate("/network")}
            className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs text-muted-foreground hover:text-primary hover:bg-muted/20 border-t border-border/30 transition-all cursor-pointer"
          >
            View all suggestions <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Improvement prompts */}
      {activePrompts.length > 0 && (
        <div className="bg-card border border-border/30 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 pt-4 pb-2 flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <h3 className="text-sm text-foreground" style={{ fontWeight: 600 }}>
              {isOrg ? "Complete Your Page" : "Boost Your Profile"}
            </h3>
          </div>
          <div className="px-3 pb-3 space-y-2">
            {activePrompts.map((prompt) => {
              const Icon = prompt.icon;
              return (
                <div
                  key={prompt.id}
                  className="flex items-start gap-3 p-3 rounded-xl border border-border/20 hover:border-border/40 transition-colors group cursor-pointer"
                  onClick={() => navigate(isOrg ? orgPath : "/profile")}
                >
                  <div className={`w-7 h-7 rounded-lg ${prompt.bg} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-3.5 h-3.5 ${prompt.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-foreground">{prompt.label}</p>
                    <p className="text-[10px] text-muted-foreground">{prompt.desc}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDismissedPrompts(prev => [...prev, prompt.id]);
                    }}
                    className="text-[10px] text-muted-foreground/50 hover:text-muted-foreground transition-colors cursor-pointer shrink-0 mt-0.5"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Job matches (individual) or Applicant overview (company) */}
      {isOrg ? (
        <div className="bg-card border border-border/30 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 pt-4 pb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5 text-amber-500" />
              <h3 className="text-sm text-foreground" style={{ fontWeight: 600 }}>Your Job Listings</h3>
            </div>
            <span className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">5 active</span>
          </div>
          <div className="px-3 pb-3 space-y-1">
            {feedJobs.slice(0, 3).map((job) => (
              <button
                key={job.id}
                onClick={() => navigate("/jobs")}
                className="w-full text-left flex items-center gap-3 px-3 py-2.5 hover:bg-muted/30 rounded-xl transition-colors cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center shrink-0">
                  <Briefcase className="w-4 h-4 text-amber-500" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-foreground truncate group-hover:text-primary transition-colors">{job.title}</p>
                  <p className="text-[10px] text-muted-foreground">{job.applicants} applicants</p>
                  <p className="text-[10px] text-muted-foreground/60 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-2.5 h-2.5" />
                    {job.location} · {job.type}
                  </p>
                </div>
                <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md shrink-0">
                  Active
                </span>
              </button>
            ))}
          </div>
          <button
            onClick={() => navigate("/jobs")}
            className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs text-muted-foreground hover:text-primary hover:bg-muted/20 border-t border-border/30 transition-all cursor-pointer"
          >
            Manage all job listings <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <div className="bg-card border border-border/30 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 pt-4 pb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
              <h3 className="text-sm text-foreground" style={{ fontWeight: 600 }}>Top Job Matches</h3>
            </div>
            <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">12 new</span>
          </div>
          <div className="px-3 pb-3 space-y-1">
            {feedJobs.slice(0, 3).map((job) => (
              <button
                key={job.id}
                onClick={() => navigate("/jobs")}
                className="w-full text-left flex items-center gap-3 px-3 py-2.5 hover:bg-muted/30 rounded-xl transition-colors cursor-pointer group"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white text-[10px]"
                  style={{
                    background: job.matchScore >= 80
                      ? "linear-gradient(135deg, #00C853, #0066FF)"
                      : job.matchScore >= 60
                      ? "linear-gradient(135deg, #FF9800, #F44336)"
                      : "linear-gradient(135deg, #F44336, #F44336)",
                    fontWeight: 700,
                  }}
                >
                  {job.matchScore}%
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-foreground truncate group-hover:text-primary transition-colors">{job.title}</p>
                  <p className="text-[10px] text-muted-foreground">{job.company}</p>
                  <p className="text-[10px] text-muted-foreground/60 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-2.5 h-2.5" />
                    {job.location}
                  </p>
                </div>
              </button>
            ))}
          </div>
          <button
            onClick={() => navigate("/jobs")}
            className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs text-muted-foreground hover:text-primary hover:bg-muted/20 border-t border-border/30 transition-all cursor-pointer"
          >
            Browse all matches <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Industry Pulse */}
      <div className="bg-card border border-border/30 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-4 pt-4 pb-2">
          <h3 className="text-sm text-foreground" style={{ fontWeight: 600 }}>In Your Industry</h3>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            {isOrg ? "Topics gaining traction among companies & recruiters" : "Topics gaining traction among Product & Design professionals"}
          </p>
        </div>
        <div className="px-3 pb-3 space-y-1">
          {industryTopics.map((item) => (
            <button
              key={item.topic}
              className="w-full text-left flex items-center gap-3 px-3 py-2 hover:bg-muted/30 rounded-xl transition-colors cursor-pointer group"
            >
              <div className={`w-1 h-7 rounded-full bg-gradient-to-b ${item.color} shrink-0`} />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-foreground group-hover:text-primary transition-colors truncate">{item.topic}</p>
                <p className="text-[10px] text-muted-foreground">{item.readers} readers</p>
              </div>
              <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md shrink-0">
                {item.delta}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-3 py-3 text-center">
        <div className="flex items-center justify-center gap-1.5 mb-2">
          <div className="w-4 h-4 rounded-md bg-gradient-to-br from-[#0066FF] to-[#7c3aed] flex items-center justify-center">
            <span className="text-white text-[8px]" style={{ fontWeight: 700 }}>H</span>
          </div>
          <span className="text-[10px] text-muted-foreground/60">Hamrahe © 2026</span>
        </div>
        <div className="flex flex-wrap justify-center gap-x-2 gap-y-0.5">
          {["About", "Help", "Privacy", "Terms"].map((l) => (
            <button key={l} className="text-[10px] text-muted-foreground/50 hover:text-primary cursor-pointer transition-colors">
              {l}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
