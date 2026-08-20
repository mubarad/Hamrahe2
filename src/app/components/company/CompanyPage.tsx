import { useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import { useApp } from "../../context/AppContext";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  CheckCircle2, ShieldCheck, Bell, BellOff, Share2, Flag, MapPin,
  Users, Globe, Building2, Briefcase, Clock, Zap, Star, Target,
  BookOpen, Calendar, MessageSquare, ChevronRight, Settings, Eye,
  Plus, Award, Lightbulb, ArrowRight, Edit, UserPlus, BarChart2,
  Lock, FileText, Plug, CreditCard, X, Check, Send, ExternalLink,
  AlertTriangle, TrendingUp, Clipboard, ChevronDown,
} from "lucide-react";
import { OverviewTab } from "./tabs/OverviewTab";
import { JobsTab } from "./tabs/JobsTab";
import { LearningTab } from "./tabs/LearningTab";
import { EventsTab } from "./tabs/EventsTab";
import { PeopleTab } from "./tabs/PeopleTab";
import { PostsTab } from "./tabs/PostsTab";
import { TrustTab } from "./tabs/TrustTab";
import { BusinessTab } from "./tabs/BusinessTab";
import { ServicesTab } from "./tabs/ServicesTab";
import { SNAPP } from "./companyMockData";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ViewMode = "public" | "loggedIn" | "admin";

type TabId =
  | "overview" | "business" | "jobs" | "learning" | "events" | "people" | "posts"
  | "newsletter" | "products" | "services" | "trust"
  | "applicants" | "talent-pool" | "messages" | "analytics" | "admins"
  | "privacy" | "audit-log" | "moderation" | "legal" | "integrations"
  | "billing" | "settings-tab";

const PUBLIC_TABS: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "business", label: "Business" },
  { id: "jobs", label: "Jobs" },
  { id: "learning", label: "Learning" },
  { id: "events", label: "Events" },
  { id: "people", label: "People" },
  { id: "posts", label: "Posts" },
  { id: "newsletter", label: "Newsletter" },
  { id: "products", label: "Products" },
  { id: "services", label: "Services" },
  { id: "trust", label: "Trust" },
];

const ADMIN_TABS: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "business", label: "Business" },
  { id: "jobs", label: "Jobs" },
  { id: "applicants", label: "Applicants" },
  { id: "learning", label: "Learning & Assessments" },
  { id: "events", label: "Events" },
  { id: "people", label: "People" },
  { id: "posts", label: "Posts" },
  { id: "newsletter", label: "Newsletter" },
  { id: "products", label: "Products" },
  { id: "talent-pool", label: "Talent Pool" },
  { id: "messages", label: "Messages" },
  { id: "analytics", label: "Analytics" },
  { id: "trust", label: "Trust" },
  { id: "admins", label: "Admins" },
  { id: "privacy", label: "Privacy" },
  { id: "audit-log", label: "Audit Log" },
  { id: "moderation", label: "Moderation" },
  { id: "legal", label: "Legal" },
  { id: "integrations", label: "Integrations" },
  { id: "billing", label: "Billing" },
  { id: "settings-tab", label: "Settings" },
];

const BADGE_STYLES: Record<string, string> = {
  "Verified Company": "bg-primary/10 text-primary border border-primary/20",
  "Trusted Employer": "bg-emerald-50 text-emerald-700 border border-emerald-200",
  "Fast Responder": "bg-amber-50 text-amber-700 border border-amber-200",
  "Assessment Ready": "bg-violet-50 text-violet-700 border border-violet-200",
};

// ─── Modal helper ─────────────────────────────────────────────────────────────

function Modal({
  open, onClose, title, children,
}: {
  open: boolean; onClose: () => void; title: string; children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg z-10 overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/20">
          <h3 className="text-base text-foreground" style={{ fontWeight: 700 }}>{title}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </motion.div>
    </div>
  );
}

function SuccessModal({ open, onClose, title, message }: { open: boolean; onClose: () => void; title: string; message: string }) {
  return (
    <Modal open={open} onClose={onClose} title="">
      <div className="text-center py-4">
        <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
          <Check className="w-7 h-7 text-emerald-600" />
        </div>
        <h3 className="text-lg text-foreground mb-2" style={{ fontWeight: 700 }}>{title}</h3>
        <p className="text-sm text-muted-foreground mb-6">{message}</p>
        <Button onClick={onClose} className="w-full">Done</Button>
      </div>
    </Modal>
  );
}

// ─── Setup steps & next actions ───────────────────────────────────────────────

const SETUP_STEPS = [
  { label: "Add company identity", done: true },
  { label: "Add logo and cover image", done: true },
  { label: "Start verification", done: true },
  { label: "Add hiring process", done: false },
  { label: "Attach assessments to jobs", done: false },
  { label: "Publish first newsletter", done: false },
  { label: "Invite employees to confirm profiles", done: false },
  { label: "Review privacy settings", done: false },
  { label: "Accept hiring policies", done: false },
];

const NEXT_ACTIONS = [
  { label: "Complete Why Work Here section", icon: Edit, tab: "overview" as TabId },
  { label: "Add hiring process details", icon: Briefcase, tab: "jobs" as TabId },
  { label: "Attach assessments to active jobs", icon: Zap, tab: "learning" as TabId },
  { label: "Improve job quality score", icon: TrendingUp, tab: "jobs" as TabId },
  { label: "Invite employees to confirm profiles", icon: UserPlus, tab: "people" as TabId },
  { label: "Enable contact routing", icon: MessageSquare, tab: "settings-tab" as TabId },
  { label: "Review privacy settings", icon: Lock, tab: "privacy" as TabId },
  { label: "Accept required hiring policies", icon: FileText, tab: "legal" as TabId },
];

// ─── Admin Overview ────────────────────────────────────────────────────────────

function AdminOverview({ onTabChange }: { onTabChange: (tab: TabId) => void }) {
  const completedSteps = SETUP_STEPS.filter((s) => s.done).length;
  const progressPct = Math.round((completedSteps / SETUP_STEPS.length) * 100);
  const [showSetup, setShowSetup] = useState(false);

  return (
    <div className="space-y-4 mb-6">
      {/* Metrics strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {[
          { label: "Profile", value: `${progressPct}%`, sub: "Complete", color: "text-amber-500", bg: "bg-amber-50 border-amber-100" },
          { label: "Brand Score", value: "42", sub: "/ 100", color: "text-primary", bg: "bg-primary/5 border-primary/10" },
          { label: "Trust Level", value: "Verified", sub: "Basic", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
          { label: "Profile Health", value: "74", sub: "/ 100", color: "text-foreground", bg: "bg-muted/50 border-border/30" },
          { label: "Active Jobs", value: "12", sub: "open", color: "text-foreground", bg: "bg-muted/50 border-border/30" },
          { label: "Applicants", value: "28", sub: "pending", color: "text-violet-600", bg: "bg-violet-50 border-violet-100" },
          { label: "Talent Pool", value: "340", sub: "candidates", color: "text-blue-600", bg: "bg-blue-50 border-blue-100" },
          { label: "Inquiries", value: "12", sub: "business", color: "text-foreground", bg: "bg-muted/50 border-border/30" },
        ].map(({ label, value, sub, color, bg }) => (
          <div key={label} className={`rounded-xl p-3 border ${bg}`}>
            <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
            <div className="flex items-baseline gap-0.5">
              <span className={`text-base ${color}`} style={{ fontWeight: 800 }}>{value}</span>
              <span className="text-xs text-muted-foreground">{sub}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Setup Journey */}
        <Card className="p-4">
          <button
            onClick={() => setShowSetup(!showSetup)}
            className="flex items-center justify-between w-full mb-3 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Clipboard className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground" style={{ fontWeight: 700 }}>Company Setup Journey</span>
              <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">{completedSteps}/{SETUP_STEPS.length}</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showSetup ? "rotate-180" : ""}`} />
          </button>
          <div className="h-2 bg-muted/50 rounded-full overflow-hidden mb-1">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-violet-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <p className="text-xs text-muted-foreground mb-3">{progressPct}% complete</p>
          <AnimatePresence>
            {showSetup && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="space-y-2">
                {SETUP_STEPS.map((step, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${step.done ? "bg-emerald-500" : "bg-muted/50 border-2 border-border/40"}`}>
                      {step.done && <CheckCircle2 className="w-3 h-3 text-white" />}
                    </div>
                    <span className={`text-sm ${step.done ? "text-muted-foreground line-through" : "text-foreground"}`}>{step.label}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Next Best Actions */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span className="text-sm text-foreground" style={{ fontWeight: 700 }}>Next Best Actions</span>
          </div>
          <div className="space-y-1.5">
            {NEXT_ACTIONS.slice(0, 5).map(({ label, icon: Icon, tab }, i) => (
              <button
                key={i}
                onClick={() => onTabChange(tab)}
                className="w-full flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-muted/50 transition-colors text-left group cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-primary/5 flex items-center justify-center shrink-0">
                  <Icon className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-sm text-foreground flex-1">{label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── Admin tab content stubs ───────────────────────────────────────────────────

function ApplicantsTab() {
  const statuses = ["New", "Reviewed", "Interview", "Offer", "Rejected"];
  const applicants = [
    { name: "Sara Ahmadi", role: "Senior React Developer", status: "Interview", score: 88, date: "2 days ago" },
    { name: "Ali Rezaei", role: "Product Designer", status: "New", score: 76, date: "Today" },
    { name: "Mona Hosseini", role: "Senior React Developer", status: "Reviewed", score: 92, date: "3 days ago" },
    { name: "Reza Karimi", role: "DevOps Engineer", status: "Offer", score: 85, date: "5 days ago" },
    { name: "Neda Jafari", role: "Product Designer", status: "New", score: 71, date: "Today" },
  ];
  const statusColors: Record<string, string> = {
    New: "bg-blue-100 text-blue-700", Reviewed: "bg-amber-100 text-amber-700",
    Interview: "bg-violet-100 text-violet-700", Offer: "bg-emerald-100 text-emerald-700",
    Rejected: "bg-red-100 text-red-700",
  };
  return (
    <Card className="overflow-hidden p-0">
      <div className="px-5 py-4 border-b border-border/20 flex items-center justify-between">
        <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>Applicants · 28 pending</h3>
        <div className="flex gap-2">
          {statuses.map((s) => (
            <button key={s} className="text-xs text-muted-foreground hover:text-primary transition-colors">{s}</button>
          ))}
          <Button size="sm" variant="outline"><FileText className="w-3.5 h-3.5" />Export</Button>
        </div>
      </div>
      <div className="divide-y divide-border/20">
        {applicants.map((a, i) => (
          <div key={i} className="flex items-center gap-4 px-5 py-3.5 hover:bg-muted/30 transition-colors">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/20 to-violet-500/20 flex items-center justify-center shrink-0">
              <span className="text-xs text-primary" style={{ fontWeight: 700 }}>{a.name.split(" ").map(n => n[0]).join("")}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground" style={{ fontWeight: 600 }}>{a.name}</p>
              <p className="text-xs text-muted-foreground">{a.role} · {a.date}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-primary" style={{ fontWeight: 700 }}>{a.score}%</p>
              <p className="text-xs text-muted-foreground">Match</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-lg ${statusColors[a.status]}`} style={{ fontWeight: 600 }}>{a.status}</span>
            <Button size="sm" variant="ghost">View</Button>
          </div>
        ))}
      </div>
    </Card>
  );
}

function TalentPoolTab() {
  const candidates = [
    { name: "Kamran Moradi", role: "Frontend Engineer", score: 91, joined: "1 week ago" },
    { name: "Leila Sadeghi", role: "Product Designer", score: 84, joined: "2 weeks ago" },
    { name: "Hassan Tavakoli", role: "Data Scientist", score: 78, joined: "3 weeks ago" },
    { name: "Zahra Ebrahimi", role: "Backend Engineer", score: 88, joined: "1 month ago" },
  ];
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Candidates", value: "340", sub: "in pool" },
          { label: "New This Month", value: "28", sub: "added" },
          { label: "Ready to Hire", value: "47", sub: "top match" },
        ].map(({ label, value, sub }) => (
          <Card key={label} className="p-4 text-center">
            <p className="text-2xl text-primary mb-0.5" style={{ fontWeight: 800 }}>{value}</p>
            <p className="text-xs text-muted-foreground">{sub} · {label}</p>
          </Card>
        ))}
      </div>
      <Card className="overflow-hidden p-0">
        <div className="px-5 py-4 border-b border-border/20">
          <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>Top Candidates</h3>
        </div>
        <div className="divide-y divide-border/20">
          {candidates.map((c, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-3.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-100 to-blue-100 flex items-center justify-center shrink-0">
                <span className="text-xs text-violet-700" style={{ fontWeight: 700 }}>{c.name.split(" ").map(n => n[0]).join("")}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-foreground" style={{ fontWeight: 600 }}>{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.role} · Joined {c.joined}</p>
              </div>
              <p className="text-sm text-primary" style={{ fontWeight: 700 }}>{c.score}%</p>
              <Button size="sm" variant="outline">Invite</Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function MessagesTab() {
  const threads = [
    { name: "Sara Ahmadi", preview: "Hi, I'm interested in the React Developer role...", time: "10 min ago", unread: true },
    { name: "Digikala HR", preview: "We'd like to discuss a potential partnership...", time: "2 hours ago", unread: true },
    { name: "Ali Rezaei", preview: "Thank you for the interview opportunity!", time: "Yesterday", unread: false },
    { name: "Startup Accelerator", preview: "Invitation to participate in demo day...", time: "2 days ago", unread: false },
  ];
  return (
    <Card className="overflow-hidden p-0">
      <div className="px-5 py-4 border-b border-border/20">
        <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>Messages · 2 unread</h3>
      </div>
      <div className="divide-y divide-border/20">
        {threads.map((t, i) => (
          <button key={i} className="w-full flex items-start gap-3 px-5 py-4 hover:bg-muted/30 transition-colors text-left cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/20 to-violet-500/20 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-xs text-primary" style={{ fontWeight: 700 }}>{t.name.split(" ").map(n => n[0]).join("")}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <p className="text-sm text-foreground" style={{ fontWeight: t.unread ? 700 : 500 }}>{t.name}</p>
                <span className="text-xs text-muted-foreground">{t.time}</span>
              </div>
              <p className="text-xs text-muted-foreground truncate">{t.preview}</p>
            </div>
            {t.unread && <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />}
          </button>
        ))}
      </div>
    </Card>
  );
}

function AnalyticsTab() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Profile Views", value: "1,284", change: "+12%", positive: true },
          { label: "Job Views", value: "3,420", change: "+24%", positive: true },
          { label: "Applications", value: "156", change: "+8%", positive: true },
          { label: "Follow Rate", value: "6.4%", change: "-1%", positive: false },
        ].map(({ label, value, change, positive }) => (
          <Card key={label} className="p-4">
            <p className="text-xs text-muted-foreground mb-1">{label}</p>
            <p className="text-2xl text-foreground mb-1" style={{ fontWeight: 800 }}>{value}</p>
            <span className={`text-xs ${positive ? "text-emerald-600" : "text-red-500"}`} style={{ fontWeight: 600 }}>{change} this month</span>
          </Card>
        ))}
      </div>
      <Card className="p-5">
        <h3 className="text-sm text-foreground mb-4" style={{ fontWeight: 700 }}>Employer Brand Score Trend</h3>
        <div className="flex items-end gap-1.5 h-24">
          {[30, 35, 32, 40, 38, 42, 41, 44, 42, 46, 43, 47].map((v, i) => (
            <div key={i} className="flex-1 bg-primary/20 rounded-t-sm" style={{ height: `${(v / 50) * 100}%` }} />
          ))}
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-muted-foreground">Jan</span>
          <span className="text-xs text-muted-foreground">Dec</span>
        </div>
      </Card>
    </div>
  );
}

function AdminsTab({ onInviteAdmin }: { onInviteAdmin: () => void }) {
  const admins = [
    { name: "Dariush Mehrabi", role: "Owner", email: "dariush@snapp.ir", status: "Active" },
    { name: "Sara Najafi", role: "HR Admin", email: "sara@snapp.ir", status: "Active" },
    { name: "Kaveh Shirazi", role: "Talent Admin", email: "kaveh@snapp.ir", status: "Pending" },
  ];
  return (
    <Card className="overflow-hidden p-0">
      <div className="px-5 py-4 border-b border-border/20 flex items-center justify-between">
        <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>Admins & Roles · {admins.length} members</h3>
        <Button size="sm" onClick={onInviteAdmin}><UserPlus className="w-3.5 h-3.5" />Invite Admin</Button>
      </div>
      <div className="divide-y divide-border/20">
        {admins.map((a, i) => (
          <div key={i} className="flex items-center gap-4 px-5 py-3.5">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-xs text-primary" style={{ fontWeight: 700 }}>{a.name.split(" ").map(n => n[0]).join("")}</span>
            </div>
            <div className="flex-1">
              <p className="text-sm text-foreground" style={{ fontWeight: 600 }}>{a.name}</p>
              <p className="text-xs text-muted-foreground">{a.email}</p>
            </div>
            <span className="text-xs text-muted-foreground">{a.role}</span>
            <span className={`text-xs px-2 py-1 rounded-lg ${a.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`} style={{ fontWeight: 600 }}>{a.status}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function SimpleAdminTab({ icon: Icon, title, description, action, actionLabel }: {
  icon: React.ComponentType<{ className?: string }>;
  title: string; description: string; action?: () => void; actionLabel?: string;
}) {
  return (
    <Card className="p-8 text-center">
      <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
        <Icon className="w-6 h-6 text-muted-foreground" />
      </div>
      <h3 className="text-base text-foreground mb-2" style={{ fontWeight: 700 }}>{title}</h3>
      <p className="text-sm text-muted-foreground mb-5 max-w-sm mx-auto">{description}</p>
      {action && actionLabel && (
        <Button onClick={action}>{actionLabel}</Button>
      )}
    </Card>
  );
}

// ─── Hero match cards ──────────────────────────────────────────────────────────

function HeroMatchCard({ viewMode }: { viewMode: ViewMode }) {
  if (viewMode === "public" || viewMode === "admin") return null;
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 gap-3 mb-4">
      <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-2"><Target className="w-4 h-4 text-primary" /><span className="text-xs text-muted-foreground">Your Match</span></div>
        <div className="flex items-end gap-1"><span className="text-3xl text-primary" style={{ fontWeight: 800 }}>82</span><span className="text-lg text-primary mb-0.5" style={{ fontWeight: 700 }}>%</span></div>
        <div className="mt-2 h-1.5 bg-primary/10 rounded-full overflow-hidden">
          <motion.div className="h-full bg-primary rounded-full" initial={{ width: 0 }} animate={{ width: "82%" }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} />
        </div>
      </div>
      <div className="bg-gradient-to-br from-amber-500/5 to-amber-500/10 border border-amber-500/20 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-2"><Zap className="w-4 h-4 text-amber-500" /><span className="text-xs text-muted-foreground">App. Readiness</span></div>
        <div className="flex items-end gap-1"><span className="text-3xl text-amber-600" style={{ fontWeight: 800 }}>56</span><span className="text-lg text-amber-600 mb-0.5" style={{ fontWeight: 700 }}>%</span></div>
        <div className="mt-2 h-1.5 bg-amber-500/10 rounded-full overflow-hidden">
          <motion.div className="h-full bg-amber-500 rounded-full" initial={{ width: 0 }} animate={{ width: "56%" }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }} />
        </div>
      </div>
    </motion.div>
  );
}

function BestNextStep({ viewMode }: { viewMode: ViewMode }) {
  if (viewMode === "public" || viewMode === "admin") return null;
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200/50 rounded-2xl mb-4">
      <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-amber-700 mb-0.5" style={{ fontWeight: 700 }}>Your Best Next Step</p>
        <p className="text-sm text-amber-700">Complete Product Thinking Assessment to apply for 3 matching roles at Snapp.</p>
      </div>
      <Button variant="gradient" size="sm" className="shrink-0">Start</Button>
    </motion.div>
  );
}

// ─── Admin action bar (inside profile, admin mode only) ────────────────────────

function AdminActionBar({
  onEdit, onCreateJob, onCreateEvent, onPublishPost, onStartVerification, onInviteAdmin, onTabChange,
}: {
  onEdit: () => void; onCreateJob: () => void; onCreateEvent: () => void;
  onPublishPost: () => void; onStartVerification: () => void; onInviteAdmin: () => void;
  onTabChange: (tab: TabId) => void;
}) {
  return (
    <div className="mt-4 pt-4 border-t border-border/20">
      <p className="text-xs text-muted-foreground mb-2.5" style={{ fontWeight: 600 }}>Admin Actions</p>
      <div className="flex flex-wrap gap-2">
        {[
          { label: "Edit Profile", icon: Edit, action: onEdit },
          { label: "Create Job", icon: Plus, action: onCreateJob },
          { label: "Attach Assessment", icon: Zap, action: () => onTabChange("learning") },
          { label: "Create Event", icon: Calendar, action: onCreateEvent },
          { label: "Publish Post", icon: FileText, action: onPublishPost },
          { label: "Start Verification", icon: ShieldCheck, action: onStartVerification },
          { label: "Invite Admin", icon: UserPlus, action: onInviteAdmin },
          { label: "Manage Applicants", icon: Users, action: () => onTabChange("applicants") },
          { label: "Manage Talent Pool", icon: Target, action: () => onTabChange("talent-pool") },
          { label: "Analytics", icon: BarChart2, action: () => onTabChange("analytics") },
          { label: "Privacy", icon: Lock, action: () => onTabChange("privacy") },
          { label: "Settings", icon: Settings, action: () => onTabChange("settings-tab") },
        ].map(({ label, icon: Icon, action }) => (
          <button
            key={label}
            onClick={action}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground text-xs transition-colors cursor-pointer border border-border/20"
            style={{ fontWeight: 500 }}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Main CompanyPage ──────────────────────────────────────────────────────────

export function CompanyPage() {
  const { companyId } = useParams<{ companyId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useApp();

  const isAdminView = location.pathname.endsWith("/admin");
  const isCompanyAdmin = currentUser?.accountType === "company";
  const viewMode: ViewMode = isAdminView ? "admin" : currentUser ? "loggedIn" : "public";

  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [following, setFollowing] = useState(false);
  const [saved, setSaved] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);

  // Modal states
  const [modal, setModal] = useState<
    | "talent-pool" | "contact" | "report" | "share"
    | "edit-profile" | "create-job" | "create-event"
    | "publish-post" | "start-verification" | "invite-admin"
    | "edit-cover" | "edit-logo"
    | "success"
    | null
  >(null);
  const [successMsg, setSuccessMsg] = useState({ title: "", message: "" });
  const [talentPoolJoined, setTalentPoolJoined] = useState(false);
  const [reported, setReported] = useState(false);

  const company = SNAPP;
  const tabs = isAdminView ? ADMIN_TABS : PUBLIC_TABS;

  const scrollToTabs = () => tabsRef.current?.scrollIntoView({ behavior: "smooth" });

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    scrollToTabs();
  };

  const showSuccess = (title: string, message: string) => {
    setSuccessMsg({ title, message });
    setModal("success");
  };

  return (
    <div className="max-w-[1050px] mx-auto space-y-0">

      {/* ── Hero Card ──────────────────────────────────────────────────────── */}
      <Card padding={false} className="overflow-hidden mb-4">
        {/* Cover */}
        <div className="h-52 relative group">
          <ImageWithFallback src={company.cover} alt={company.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-xl">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-white" style={{ fontWeight: 600 }}>{company.activityStatus}</span>
            </div>
          </div>
          {isAdminView && (
            <>
              <div className="absolute top-4 left-4">
                <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-sm px-3 py-1.5 rounded-xl">
                  <Settings className="w-3.5 h-3.5 text-white/70" />
                  <span className="text-xs text-white/80" style={{ fontWeight: 600 }}>Owner / Admin Mode</span>
                </div>
              </div>
              <button
                onClick={() => setModal("edit-cover")}
                className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-white"
              >
                <Edit className="w-3.5 h-3.5 text-foreground" />
                <span className="text-xs text-foreground" style={{ fontWeight: 600 }}>Edit Cover</span>
              </button>
            </>
          )}
        </div>

        <div className="px-6 pb-6">
          {/* Logo + Name row */}
          <div className="-mt-16 flex items-end justify-between mb-4">
            <div className="flex items-end gap-4">
              <div className="relative group/logo">
                <div className="p-1.5 bg-white rounded-2xl shadow-xl border border-border/30">
                  <div className="w-28 h-28 rounded-xl bg-white overflow-hidden">
                    <ImageWithFallback src={company.logo} alt={company.name} className="w-full h-full object-cover" />
                  </div>
                </div>
                {isAdminView && (
                  <button
                    onClick={() => setModal("edit-logo")}
                    className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-2xl opacity-0 group-hover/logo:opacity-100 transition-opacity cursor-pointer"
                  >
                    <div className="flex flex-col items-center gap-1">
                      <Edit className="w-5 h-5 text-white" />
                      <span className="text-xs text-white" style={{ fontWeight: 600 }}>Edit</span>
                    </div>
                  </button>
                )}
              </div>
              <div className="pb-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl text-foreground" style={{ fontWeight: 800 }}>{company.name}</h1>
                  <div className="flex items-center gap-1 bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-lg">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span className="text-xs" style={{ fontWeight: 700 }}>Verified Company</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{company.tagline}</p>
              </div>
            </div>

            {/* Action buttons top-right */}
            <div className="flex items-center gap-2 pt-2 shrink-0">
              {isAdminView ? (
                <>
                  <Button variant="outline" size="sm" onClick={() => navigate(`/company/${companyId}`)}>
                    <Eye className="w-4 h-4" />
                    View as Public
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setModal("edit-profile")}>
                    <Edit className="w-4 h-4" />
                  </Button>
                </>
              ) : (
                <>
                  {isCompanyAdmin && (
                    <Button variant="outline" size="sm" onClick={() => navigate(`/company/${companyId}/admin`)}>
                      <Settings className="w-4 h-4" />
                      Manage Page
                    </Button>
                  )}
                  <Button
                    variant={following ? "outline" : "gradient"}
                    size="sm"
                    onClick={() => setFollowing(!following)}
                  >
                    {following ? <BellOff className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                    {following ? "Following" : "Follow"}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setSaved(!saved)} title={saved ? "Unsave" : "Save"}>
                    <Star className={`w-4 h-4 ${saved ? "fill-amber-500 text-amber-500" : ""}`} />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setModal("share")} title="Share">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setModal("report")} title="Report">
                    <Flag className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Meta info */}
          <div className="flex items-center flex-wrap gap-x-4 gap-y-1.5 text-sm text-muted-foreground mb-3">
            <span className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" />{company.industry}</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{company.headquarters}</span>
            <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" />{company.size}</span>
            <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" />{company.workModel}</span>
            <a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-primary hover:underline">
              <Globe className="w-3.5 h-3.5" />{company.website}
            </a>
          </div>

          {/* Stats */}
          <div className="flex items-center flex-wrap gap-x-5 gap-y-1 text-sm mb-4">
            <span><span className="text-foreground" style={{ fontWeight: 700 }}>{company.followers.toLocaleString()}</span> <span className="text-muted-foreground">followers</span></span>
            <span><span className="text-foreground" style={{ fontWeight: 700 }}>{company.confirmedEmployees}</span> <span className="text-muted-foreground">confirmed employees</span></span>
            <span><span className="text-foreground" style={{ fontWeight: 700 }}>{company.openJobs}</span> <span className="text-muted-foreground">open roles</span></span>
            <span className="flex items-center gap-1 text-muted-foreground"><Clock className="w-3.5 h-3.5" />{company.responseTime}</span>
            <span className="text-muted-foreground text-xs">Updated {company.lastUpdated}</span>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-2 mb-5">
            {company.badges.map((badge) => (
              <div key={badge} className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-xl ${BADGE_STYLES[badge] || "bg-muted text-muted-foreground border border-border/40"}`} style={{ fontWeight: 600 }}>
                {badge === "Verified Company" && <ShieldCheck className="w-3.5 h-3.5" />}
                {badge === "Trusted Employer" && <Award className="w-3.5 h-3.5" />}
                {badge === "Fast Responder" && <Zap className="w-3.5 h-3.5" />}
                {badge === "Assessment Ready" && <CheckCircle2 className="w-3.5 h-3.5" />}
                {badge}
              </div>
            ))}
          </div>

          {/* Match cards / Best next step (individual logged-in) */}
          <HeroMatchCard viewMode={viewMode} />
          <BestNextStep viewMode={viewMode} />

          {/* Primary CTAs */}
          <div className="flex flex-wrap gap-2">
            {viewMode === "loggedIn" && (
              <Button variant="gradient" onClick={() => handleTabChange("learning")}>
                <BookOpen className="w-4 h-4" />Start Assessment
              </Button>
            )}
            <Button variant={viewMode === "public" ? "gradient" : "outline"} onClick={() => handleTabChange("jobs")}>
              <Briefcase className="w-4 h-4" />View Jobs ({company.openJobs})
            </Button>
            {viewMode !== "admin" && (
              <Button variant="outline" onClick={() => setModal("talent-pool")}>
                <Users className="w-4 h-4" />{talentPoolJoined ? "In Talent Pool ✓" : "Join Talent Pool"}
              </Button>
            )}
            <Button variant="outline" onClick={() => setModal("contact")}>
              <MessageSquare className="w-4 h-4" />Contact
            </Button>
            {viewMode === "admin" && (
              <AdminActionBar
                onEdit={() => setModal("edit-profile")}
                onCreateJob={() => setModal("create-job")}
                onCreateEvent={() => setModal("create-event")}
                onPublishPost={() => setModal("publish-post")}
                onStartVerification={() => setModal("start-verification")}
                onInviteAdmin={() => setModal("invite-admin")}
                onTabChange={handleTabChange}
              />
            )}
          </div>
        </div>
      </Card>

      {/* ── Tabs ────────────────────────────────────────────────────────────── */}
      <div ref={tabsRef} className="bg-card border-b border-border/40 sticky top-[64px] z-40 rounded-2xl overflow-hidden mb-4">
        <div className="relative">
          {/* Fade gradient right edge for scroll hint */}
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none" />
          <div className="flex overflow-x-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {tabs.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`px-5 py-3.5 text-sm whitespace-nowrap transition-all border-b-2 shrink-0 ${
                  activeTab === id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                }`}
                style={{ fontWeight: activeTab === id ? 700 : 400 }}
              >
                {label}
                {id === "jobs" && (
                  <span className="ml-1.5 text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">{company.openJobs}</span>
                )}
                {id === "applicants" && (
                  <span className="ml-1.5 text-xs bg-violet-100 text-violet-700 px-1.5 py-0.5 rounded-full">28</span>
                )}
                {id === "messages" && (
                  <span className="ml-1.5 text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full">2</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tab Content ─────────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "overview" && (
            <>
              {viewMode === "admin" && <AdminOverview onTabChange={handleTabChange} />}
              <OverviewTab company={company} viewMode={viewMode} onTabChange={handleTabChange} />
            </>
          )}
          {activeTab === "business" && <BusinessTab viewMode={viewMode} />}
          {activeTab === "jobs" && <JobsTab viewMode={viewMode} />}
          {activeTab === "applicants" && <ApplicantsTab />}
          {activeTab === "learning" && <LearningTab viewMode={viewMode} />}
          {activeTab === "events" && <EventsTab viewMode={viewMode} />}
          {activeTab === "people" && <PeopleTab viewMode={viewMode} />}
          {activeTab === "posts" && <PostsTab viewMode={viewMode} />}
          {activeTab === "newsletter" && (
            <Card className="text-center py-12">
              <Bell className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-sm text-foreground" style={{ fontWeight: 600 }}>Newsletter</p>
              <p className="text-xs text-muted-foreground mt-1 mb-4">Follow this company to receive future newsletter issues.</p>
              <Button variant="gradient" size="sm" onClick={() => showSuccess("Subscribed!", "You'll receive Snapp's newsletter in your inbox.")}>Subscribe</Button>
            </Card>
          )}
          {activeTab === "products" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: "SnappRide", cat: "Transportation", desc: "On-demand ride-hailing service across Iran's major cities." },
                { name: "SnappFood", cat: "Food Delivery", desc: "Fast food delivery from thousands of restaurants in under 30 minutes." },
                { name: "SnappPay", cat: "Fintech", desc: "Digital wallet and payment solution integrated across Snapp." },
                { name: "SnappBox", cat: "Logistics", desc: "Same-day and scheduled package delivery for individuals and businesses." },
              ].map((p) => (
                <Card key={p.name} className="hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-violet-500/10 flex items-center justify-center shrink-0">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <div><h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>{p.name}</h3><p className="text-xs text-muted-foreground">{p.cat}</p></div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{p.desc}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => showSuccess("Request Sent", `Your demo request for ${p.name} has been submitted.`)}>Request Demo</Button>
                    <Button variant="ghost" size="sm" onClick={() => setModal("contact")}>Contact</Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
          {activeTab === "services" && <ServicesTab viewMode={viewMode} />}
          {activeTab === "trust" && <TrustTab viewMode={viewMode} />}
          {activeTab === "talent-pool" && <TalentPoolTab />}
          {activeTab === "messages" && <MessagesTab />}
          {activeTab === "analytics" && <AnalyticsTab />}
          {activeTab === "admins" && <AdminsTab onInviteAdmin={() => setModal("invite-admin")} />}
          {activeTab === "privacy" && (
            <SimpleAdminTab icon={Lock} title="Privacy Settings" description="Control who can see your company data, how your profile appears in search, and manage data export policies." actionLabel="Open Privacy Settings" action={() => showSuccess("Privacy Settings", "Privacy settings panel is available in production.")} />
          )}
          {activeTab === "audit-log" && (
            <Card className="overflow-hidden p-0">
              <div className="px-5 py-4 border-b border-border/20"><h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>Audit Log</h3></div>
              <div className="divide-y divide-border/20">
                {[
                  { action: "Job posted: Senior React Developer", user: "Sara Najafi", time: "2 hours ago" },
                  { action: "Admin invited: Kaveh Shirazi", user: "Dariush Mehrabi", time: "1 day ago" },
                  { action: "Company profile updated", user: "Sara Najafi", time: "3 days ago" },
                  { action: "Assessment attached to Product Designer role", user: "Sara Najafi", time: "5 days ago" },
                ].map((log, i) => (
                  <div key={i} className="flex items-center gap-4 px-5 py-3.5">
                    <div className="w-2 h-2 rounded-full bg-primary/60 shrink-0 mt-1" />
                    <div className="flex-1"><p className="text-sm text-foreground">{log.action}</p><p className="text-xs text-muted-foreground">by {log.user}</p></div>
                    <span className="text-xs text-muted-foreground">{log.time}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
          {activeTab === "moderation" && (
            <Card className="p-5">
              <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100 mb-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div><p className="text-sm text-emerald-800" style={{ fontWeight: 600 }}>Moderation Status: Clean</p><p className="text-xs text-emerald-600">No active violations or pending reviews.</p></div>
              </div>
              <SimpleAdminTab icon={AlertTriangle} title="Moderation Center" description="Review content flags, respond to reports, and manage your company's content compliance status." />
            </Card>
          )}
          {activeTab === "legal" && (
            <SimpleAdminTab icon={FileText} title="Legal & Policies" description="Review and accept Hamrahe's hiring policies, terms of service, and data processing agreements required to unlock all features." actionLabel="Review & Accept Policies" action={() => showSuccess("Policies Accepted", "Thank you. All required policies have been accepted.")} />
          )}
          {activeTab === "integrations" && (
            <SimpleAdminTab icon={Plug} title="Integrations" description="Connect your ATS, CRM, HRIS, or other tools to sync your data with Hamrahe automatically." actionLabel="Browse Integrations" action={() => showSuccess("Integration Store", "Integration marketplace is available in production.")} />
          )}
          {activeTab === "billing" && (
            <Card className="p-5 space-y-4">
              <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/10">
                <div><p className="text-sm text-foreground" style={{ fontWeight: 700 }}>Current Plan: Starter</p><p className="text-xs text-muted-foreground">Renews on Jan 1, 2027</p></div>
                <Button size="sm">Upgrade</Button>
              </div>
              <SimpleAdminTab icon={CreditCard} title="Billing & Payments" description="Manage your subscription, view invoices, update payment methods, and review your feature usage." actionLabel="Manage Billing" action={() => showSuccess("Billing Portal", "Billing management is available in production.")} />
            </Card>
          )}
          {activeTab === "settings-tab" && (
            <SimpleAdminTab icon={Settings} title="Company Account Settings" description="Update your company username, notification preferences, connected accounts, and advanced page settings." actionLabel="Open Settings" action={() => showSuccess("Settings", "Account settings panel is available in production.")} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── Modals ────────────────────────────────────────────────────────────── */}

      {/* Join Talent Pool */}
      <Modal open={modal === "talent-pool"} onClose={() => setModal(null)} title="Join Talent Pool">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Let Snapp know you're interested in future opportunities. Your profile will be visible to their talent team.</p>
          <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 space-y-2">
            <p className="text-xs text-muted-foreground" style={{ fontWeight: 600 }}>Your profile will share:</p>
            {["Name and headline", "Skills and experience", "Assessment results", "Preferred role types"].map((item) => (
              <div key={item} className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /><span className="text-xs text-foreground">{item}</span></div>
            ))}
          </div>
          <div className="flex gap-3">
            <Button className="flex-1" onClick={() => { setTalentPoolJoined(true); setModal(null); showSuccess("Joined Talent Pool!", "Snapp's talent team can now view your profile for future opportunities."); }}>
              Join Talent Pool
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => setModal(null)}>Cancel</Button>
          </div>
        </div>
      </Modal>

      {/* Contact */}
      <Modal open={modal === "contact"} onClose={() => setModal(null)} title="Contact Snapp">
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground" style={{ fontWeight: 600 }}>Your name</label>
            <input className="w-full border border-border/40 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Ahmad Parvizi" />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground" style={{ fontWeight: 600 }}>Subject</label>
            <select className="w-full border border-border/40 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white">
              <option>Job inquiry</option>
              <option>Partnership</option>
              <option>Press / Media</option>
              <option>General question</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground" style={{ fontWeight: 600 }}>Message</label>
            <textarea className="w-full border border-border/40 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none h-24" placeholder="Write your message..." />
          </div>
          <div className="flex gap-3">
            <Button className="flex-1" onClick={() => { setModal(null); showSuccess("Message Sent!", "Snapp's team will respond within their stated response time."); }}>
              <Send className="w-4 h-4" />Send Message
            </Button>
            <Button variant="outline" onClick={() => setModal(null)}>Cancel</Button>
          </div>
        </div>
      </Modal>

      {/* Report */}
      <Modal open={modal === "report"} onClose={() => setModal(null)} title="Report Company">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Help us keep Hamrahe trustworthy. Select the reason for your report.</p>
          <div className="space-y-2">
            {["Fake or fraudulent company", "Misleading job postings", "Inappropriate content", "Spam or scam activity", "Other"].map((reason) => (
              <label key={reason} className="flex items-center gap-3 p-3 border border-border/20 rounded-xl hover:bg-muted/30 cursor-pointer">
                <input type="radio" name="report-reason" className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground">{reason}</span>
              </label>
            ))}
          </div>
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground" style={{ fontWeight: 600 }}>Additional details (optional)</label>
            <textarea className="w-full border border-border/40 rounded-xl px-3 py-2.5 text-sm focus:outline-none resize-none h-20" />
          </div>
          <div className="flex gap-3">
            <Button className="flex-1" variant="destructive" onClick={() => { setReported(true); setModal(null); showSuccess("Report Submitted", "Thank you. Our trust team will review this report within 48 hours."); }}>
              Submit Report
            </Button>
            <Button variant="outline" onClick={() => setModal(null)}>Cancel</Button>
          </div>
        </div>
      </Modal>

      {/* Share */}
      <Modal open={modal === "share"} onClose={() => setModal(null)} title="Share Snapp's Profile">
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-muted/40 rounded-xl border border-border/20">
            <span className="text-xs text-muted-foreground flex-1 truncate">hamrahe.com/company/snapp</span>
            <Button size="sm" variant="outline" onClick={() => { navigator.clipboard?.writeText("hamrahe.com/company/snapp"); showSuccess("Copied!", "Profile link copied to clipboard."); setModal(null); }}>
              Copy Link
            </Button>
          </div>
          <div className="flex gap-3">
            {["LinkedIn", "Twitter / X", "Telegram", "WhatsApp"].map((platform) => (
              <button key={platform} onClick={() => { setModal(null); showSuccess("Shared!", `Profile shared on ${platform}.`); }} className="flex-1 flex flex-col items-center gap-1.5 p-3 border border-border/20 rounded-xl hover:bg-muted/30 transition-colors cursor-pointer">
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{platform}</span>
              </button>
            ))}
          </div>
        </div>
      </Modal>

      {/* Edit Profile */}
      <Modal open={modal === "edit-profile"} onClose={() => setModal(null)} title="Edit Company Profile">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1"><label className="text-xs text-muted-foreground" style={{ fontWeight: 600 }}>Company Name</label><input className="w-full border border-border/40 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" defaultValue="Snapp" /></div>
            <div className="space-y-1"><label className="text-xs text-muted-foreground" style={{ fontWeight: 600 }}>Industry</label><input className="w-full border border-border/40 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" defaultValue="Technology" /></div>
          </div>
          <div className="space-y-1"><label className="text-xs text-muted-foreground" style={{ fontWeight: 600 }}>Tagline</label><input className="w-full border border-border/40 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" defaultValue={company.tagline} /></div>
          <div className="space-y-1"><label className="text-xs text-muted-foreground" style={{ fontWeight: 600 }}>Website</label><input className="w-full border border-border/40 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" defaultValue={company.website} /></div>
          <div className="space-y-1"><label className="text-xs text-muted-foreground" style={{ fontWeight: 600 }}>Headquarters</label><input className="w-full border border-border/40 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" defaultValue={company.headquarters} /></div>
          <div className="flex gap-3">
            <Button className="flex-1" onClick={() => { setModal(null); showSuccess("Profile Updated!", "Your company profile changes have been saved."); }}>Save Changes</Button>
            <Button variant="outline" onClick={() => setModal(null)}>Cancel</Button>
          </div>
        </div>
      </Modal>

      {/* Create Job */}
      <Modal open={modal === "create-job"} onClose={() => setModal(null)} title="Create Job Opening">
        <div className="space-y-4">
          <div className="space-y-1"><label className="text-xs text-muted-foreground" style={{ fontWeight: 600 }}>Job Title</label><input className="w-full border border-border/40 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="e.g. Senior React Developer" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1"><label className="text-xs text-muted-foreground" style={{ fontWeight: 600 }}>Department</label><input className="w-full border border-border/40 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Engineering" /></div>
            <div className="space-y-1"><label className="text-xs text-muted-foreground" style={{ fontWeight: 600 }}>Work Model</label>
              <select className="w-full border border-border/40 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"><option>Hybrid</option><option>Remote</option><option>On-site</option></select>
            </div>
          </div>
          <div className="space-y-1"><label className="text-xs text-muted-foreground" style={{ fontWeight: 600 }}>Job Description</label><textarea className="w-full border border-border/40 rounded-xl px-3 py-2.5 text-sm focus:outline-none resize-none h-24" placeholder="Describe the role, responsibilities, and requirements..." /></div>
          <div className="flex gap-3">
            <Button className="flex-1" onClick={() => { setModal(null); showSuccess("Job Created!", "Your new job opening is now live on Snapp's profile."); }}>Publish Job</Button>
            <Button variant="outline" onClick={() => setModal(null)}>Save Draft</Button>
          </div>
        </div>
      </Modal>

      {/* Create Event */}
      <Modal open={modal === "create-event"} onClose={() => setModal(null)} title="Create Event">
        <div className="space-y-4">
          <div className="space-y-1"><label className="text-xs text-muted-foreground" style={{ fontWeight: 600 }}>Event Title</label><input className="w-full border border-border/40 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="e.g. Snapp Open Day 2026" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1"><label className="text-xs text-muted-foreground" style={{ fontWeight: 600 }}>Date</label><input type="date" className="w-full border border-border/40 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
            <div className="space-y-1"><label className="text-xs text-muted-foreground" style={{ fontWeight: 600 }}>Format</label><select className="w-full border border-border/40 rounded-xl px-3 py-2.5 text-sm focus:outline-none bg-white"><option>Online</option><option>In-person</option><option>Hybrid</option></select></div>
          </div>
          <div className="space-y-1"><label className="text-xs text-muted-foreground" style={{ fontWeight: 600 }}>Description</label><textarea className="w-full border border-border/40 rounded-xl px-3 py-2.5 text-sm focus:outline-none resize-none h-20" placeholder="Describe what attendees will experience..." /></div>
          <div className="flex gap-3">
            <Button className="flex-1" onClick={() => { setModal(null); showSuccess("Event Created!", "Your event is now published on Snapp's profile."); }}>Publish Event</Button>
            <Button variant="outline" onClick={() => setModal(null)}>Cancel</Button>
          </div>
        </div>
      </Modal>

      {/* Publish Post */}
      <Modal open={modal === "publish-post"} onClose={() => setModal(null)} title="Publish Company Post">
        <div className="space-y-4">
          <div className="space-y-1"><label className="text-xs text-muted-foreground" style={{ fontWeight: 600 }}>Post Type</label><select className="w-full border border-border/40 rounded-xl px-3 py-2.5 text-sm focus:outline-none bg-white"><option>Company Update</option><option>Hiring Announcement</option><option>Culture Post</option><option>Product News</option></select></div>
          <div className="space-y-1"><label className="text-xs text-muted-foreground" style={{ fontWeight: 600 }}>Content</label><textarea className="w-full border border-border/40 rounded-xl px-3 py-2.5 text-sm focus:outline-none resize-none h-28" placeholder="Write your post..." /></div>
          <div className="flex gap-3">
            <Button className="flex-1" onClick={() => { setModal(null); showSuccess("Post Published!", "Your post is now live on Snapp's company profile."); }}>Publish</Button>
            <Button variant="outline" onClick={() => setModal(null)}>Save Draft</Button>
          </div>
        </div>
      </Modal>

      {/* Start Verification */}
      <Modal open={modal === "start-verification"} onClose={() => setModal(null)} title="Start Verification">
        <div className="space-y-4">
          <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
            <div className="flex items-center gap-2 mb-2"><ShieldCheck className="w-5 h-5 text-primary" /><span className="text-sm text-primary" style={{ fontWeight: 700 }}>Verification Benefits</span></div>
            {["Verified Company badge on your profile", "Priority in search results", "Unlock Trusted Employer status", "Access to premium hiring features"].map((b) => (
              <div key={b} className="flex items-center gap-2 mt-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /><span className="text-xs text-foreground">{b}</span></div>
            ))}
          </div>
          <div className="space-y-1"><label className="text-xs text-muted-foreground" style={{ fontWeight: 600 }}>National Company ID</label><input className="w-full border border-border/40 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Enter your registered company ID" /></div>
          <div className="flex gap-3">
            <Button className="flex-1" onClick={() => { setModal(null); showSuccess("Verification Submitted!", "Your request is under review. You'll be notified within 3–5 business days."); }}>Submit for Verification</Button>
            <Button variant="outline" onClick={() => setModal(null)}>Later</Button>
          </div>
        </div>
      </Modal>

      {/* Invite Admin */}
      <Modal open={modal === "invite-admin"} onClose={() => setModal(null)} title="Invite Admin">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Invite a team member to manage this company page.</p>
          <div className="space-y-1"><label className="text-xs text-muted-foreground" style={{ fontWeight: 600 }}>Email Address</label><input type="email" className="w-full border border-border/40 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="colleague@company.com" /></div>
          <div className="space-y-1"><label className="text-xs text-muted-foreground" style={{ fontWeight: 600 }}>Role</label>
            <select className="w-full border border-border/40 rounded-xl px-3 py-2.5 text-sm focus:outline-none bg-white">
              <option>HR Admin</option><option>Talent Admin</option><option>Content Admin</option><option>Full Admin</option>
            </select>
          </div>
          <div className="flex gap-3">
            <Button className="flex-1" onClick={() => { setModal(null); showSuccess("Invitation Sent!", "An invitation has been sent. They'll appear as a pending admin until they accept."); }}>
              <Send className="w-4 h-4" />Send Invitation
            </Button>
            <Button variant="outline" onClick={() => setModal(null)}>Cancel</Button>
          </div>
        </div>
      </Modal>

      {/* Edit Cover Image */}
      <Modal open={modal === "edit-cover"} onClose={() => setModal(null)} title="Edit Cover Image">
        <div className="space-y-4">
          <div className="aspect-[3/1] w-full rounded-xl overflow-hidden bg-muted/50 border border-border/20">
            <ImageWithFallback src={company.cover} alt="Current cover" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground" style={{ fontWeight: 600 }}>Upload New Cover Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full border border-border/40 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 file:mr-3 file:px-3 file:py-1.5 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:text-xs file:cursor-pointer hover:file:bg-primary/20"
            />
            <p className="text-xs text-muted-foreground">Recommended size: 1200x400px. Max 5MB.</p>
          </div>
          <div className="flex gap-3">
            <Button className="flex-1" onClick={() => { setModal(null); showSuccess("Cover Updated!", "Your company cover image has been updated."); }}>
              Save Cover Image
            </Button>
            <Button variant="outline" onClick={() => setModal(null)}>Cancel</Button>
          </div>
        </div>
      </Modal>

      {/* Edit Logo */}
      <Modal open={modal === "edit-logo"} onClose={() => setModal(null)} title="Edit Profile Logo">
        <div className="space-y-4">
          <div className="w-32 h-32 mx-auto rounded-xl overflow-hidden bg-white border border-border/20 flex items-center justify-center">
            <ImageWithFallback src={company.logo} alt="Current logo" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground" style={{ fontWeight: 600 }}>Upload New Logo</label>
            <input
              type="file"
              accept="image/*"
              className="w-full border border-border/40 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 file:mr-3 file:px-3 file:py-1.5 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:text-xs file:cursor-pointer hover:file:bg-primary/20"
            />
            <p className="text-xs text-muted-foreground">Recommended: Square image, 500x500px. Max 2MB.</p>
          </div>
          <div className="flex gap-3">
            <Button className="flex-1" onClick={() => { setModal(null); showSuccess("Logo Updated!", "Your company logo has been updated."); }}>
              Save Logo
            </Button>
            <Button variant="outline" onClick={() => setModal(null)}>Cancel</Button>
          </div>
        </div>
      </Modal>

      {/* Success */}
      <SuccessModal
        open={modal === "success"}
        onClose={() => setModal(null)}
        title={successMsg.title}
        message={successMsg.message}
      />
    </div>
  );
}
