import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  MapPin, Users, Globe, Briefcase, Bell, BellOff, Share2, Flag, Star,
  Settings, Plus, Eye, CheckCircle2, ChevronRight, MessageSquare, Rocket,
  Calendar, FileText, UserPlus, Award, TrendingUp, Target, X, BarChart3,
  DollarSign, Shield, Zap, BookOpen, Package, Lock, AlertTriangle,
  ClipboardList, Link2, ReceiptText, Edit3, Search, Filter, Download,
  Mail, Phone, Send, ChevronDown,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

const STARTUP_MOCK = {
  name: "NextGen Startup",
  tagline: "Building the next generation of professional tools",
  stage: "Building Product",
  industry: "Technology · SaaS · HR Tech",
  location: "Tehran, Iran",
  teamSize: "4–10",
  website: "nextgenstartup.io",
  followers: 142,
  openJobs: 3,
  trustLevel: "Startup — Early Trust",
  activityStatus: "Active this week",
  cover: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=400&fit=crop",
  responseTime: "< 2 days",
};

type TabId =
  | "overview" | "jobs" | "team" | "posts" | "products" | "events"
  | "applicants" | "talent-pool" | "analytics" | "admins"
  | "privacy" | "audit-log" | "moderation" | "legal"
  | "integrations" | "billing" | "settings-tab" | "verification";

type ModalType =
  | "contact" | "share" | "report" | "join-talent-pool" | "edit-profile"
  | "create-job" | "create-event" | "publish-post" | "invite-admin"
  | "start-verification" | "edit-cover" | "edit-logo" | "success" | null;

const PUBLIC_TABS: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "jobs", label: "Jobs" },
  { id: "team", label: "Team" },
  { id: "events", label: "Events" },
  { id: "posts", label: "Posts" },
  { id: "products", label: "Products" },
];

const ADMIN_TABS: { id: TabId; label: string; adminOnly?: boolean }[] = [
  { id: "overview", label: "Overview" },
  { id: "jobs", label: "Jobs" },
  { id: "team", label: "Team" },
  { id: "events", label: "Events" },
  { id: "posts", label: "Posts" },
  { id: "products", label: "Products" },
  { id: "applicants", label: "Applicants", adminOnly: true },
  { id: "talent-pool", label: "Talent Pool", adminOnly: true },
  { id: "analytics", label: "Analytics", adminOnly: true },
  { id: "admins", label: "Admins", adminOnly: true },
  { id: "verification", label: "Verification", adminOnly: true },
  { id: "privacy", label: "Privacy", adminOnly: true },
  { id: "audit-log", label: "Audit Log", adminOnly: true },
  { id: "moderation", label: "Moderation", adminOnly: true },
  { id: "legal", label: "Legal", adminOnly: true },
  { id: "integrations", label: "Integrations", adminOnly: true },
  { id: "billing", label: "Billing", adminOnly: true },
  { id: "settings-tab", label: "Settings", adminOnly: true },
];

const setupSteps = [
  { label: "Add startup identity and tagline", done: true },
  { label: "Add logo and cover image", done: true },
  { label: "Add team members", done: false },
  { label: "Describe your product or service", done: false },
  { label: "Add first job opening", done: false },
  { label: "Connect official mobile number", done: true },
  { label: "Apply for startup trust verification", done: false },
  { label: "Publish a startup update post", done: false },
];

function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
        <motion.div
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md z-10 overflow-hidden"
          initial={{ scale: 0.95, y: 12 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 12 }}
          transition={{ duration: 0.18 }}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-border/20">
            <h2 className="text-base text-foreground" style={{ fontWeight: 700 }}>{title}</h2>
            <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-muted/60 flex items-center justify-center transition-colors">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
          <div className="p-5">{children}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function SuccessModal({ open, onClose, title, message }: { open: boolean; onClose: () => void; title: string; message: string }) {
  return (
    <Modal open={open} onClose={onClose} title="">
      <div className="text-center py-4">
        <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-7 h-7 text-emerald-600" />
        </div>
        <h3 className="text-foreground mb-2" style={{ fontWeight: 700 }}>{title}</h3>
        <p className="text-sm text-muted-foreground mb-5">{message}</p>
        <Button onClick={onClose} className="bg-emerald-600 hover:bg-emerald-700 text-white w-full">Done</Button>
      </div>
    </Modal>
  );
}

function AdminOverview({ onTabChange }: { onTabChange: (tab: TabId) => void }) {
  const [showSetup, setShowSetup] = useState(false);
  const completedSteps = setupSteps.filter((s) => s.done).length;
  const percent = Math.round((completedSteps / setupSteps.length) * 100);

  const metrics = [
    { label: "Profile Complete", value: `${percent}%`, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Trust Level", value: "Early", sub: "Startup", color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Active Roles", value: "3", color: "text-primary", bg: "bg-primary/5" },
    { label: "Applications", value: "7", color: "text-violet-600", bg: "bg-violet-50" },
    { label: "Talent Pool", value: "48", color: "text-primary", bg: "bg-primary/5" },
    { label: "Team Members", value: "4", color: "text-foreground", bg: "bg-muted/40" },
    { label: "Followers", value: "142", color: "text-foreground", bg: "bg-muted/40" },
    { label: "Upcoming Events", value: "1", color: "text-orange-500", bg: "bg-orange-50" },
  ];

  const nextActions = [
    { text: "Add team members to profile", tab: "team" as TabId },
    { text: "Describe your product or service", tab: "products" as TabId },
    { text: "Publish your first job opening", tab: "jobs" as TabId },
    { text: "Apply for startup trust verification", tab: "verification" as TabId },
    { text: "Publish a startup update post", tab: "posts" as TabId },
    { text: "Create your first event", tab: "events" as TabId },
    { text: "Review privacy settings", tab: "privacy" as TabId },
    { text: "Connect integrations", tab: "integrations" as TabId },
  ];

  return (
    <div className="space-y-4 mb-6">
      {/* Metrics grid */}
      <div>
        <h3 className="text-sm text-foreground mb-3" style={{ fontWeight: 700 }}>Startup Overview</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {metrics.map(({ label, value, sub, color, bg }) => (
            <div key={label} className={`${bg} rounded-xl p-3`}>
              <p className="text-xs text-muted-foreground mb-1">{label}</p>
              <div className="flex items-baseline gap-1">
                <span className={`text-lg ${color}`} style={{ fontWeight: 800 }}>{value}</span>
                {sub && <span className="text-xs text-muted-foreground">{sub}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Setup Journey */}
      <div className="border border-border/20 rounded-xl overflow-hidden">
        <button
          onClick={() => setShowSetup(!showSetup)}
          className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
              <Rocket className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-left">
              <p className="text-sm text-foreground" style={{ fontWeight: 600 }}>Startup Setup Journey</p>
              <p className="text-xs text-muted-foreground">{completedSteps}/{setupSteps.length} steps completed · {percent}%</p>
            </div>
          </div>
          <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${showSetup ? "rotate-90" : ""}`} />
        </button>
        <AnimatePresence>
          {showSetup && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {setupSteps.map((step, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${step.done ? "bg-emerald-500" : "border-2 border-border/40"}`}>
                      {step.done && <CheckCircle2 className="w-3 h-3 text-white" />}
                    </div>
                    <span className={`text-xs ${step.done ? "text-muted-foreground line-through" : "text-foreground"}`}>{step.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Next Best Actions */}
      <div className="border border-border/20 rounded-xl p-4">
        <h4 className="text-sm text-foreground mb-3" style={{ fontWeight: 600 }}>Next Best Actions</h4>
        <div className="space-y-1.5">
          {nextActions.filter((a) => {
            const step = setupSteps.find((s) => s.label.toLowerCase().includes(a.text.split(" ")[0].toLowerCase()));
            return !step?.done;
          }).slice(0, 5).map((action, i) => (
            <button
              key={i}
              onClick={() => onTabChange(action.tab)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-emerald-50 transition-colors text-left group"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span className="text-xs text-foreground group-hover:text-emerald-700">{action.text}</span>
              <ChevronRight className="w-3 h-3 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminActionBar({ onModal, onTabChange }: { onModal: (m: ModalType) => void; onTabChange: (t: TabId) => void }) {
  const actions = [
    { label: "Edit Profile", icon: Edit3, action: () => onModal("edit-profile") },
    { label: "Create Job", icon: Briefcase, action: () => onModal("create-job") },
    { label: "Create Event", icon: Calendar, action: () => onModal("create-event") },
    { label: "Publish Post", icon: FileText, action: () => onModal("publish-post") },
    { label: "Start Verification", icon: Award, action: () => onModal("start-verification") },
    { label: "Invite Admin", icon: UserPlus, action: () => onModal("invite-admin") },
    { label: "Applicants", icon: ClipboardList, action: () => onTabChange("applicants") },
    { label: "Analytics", icon: BarChart3, action: () => onTabChange("analytics") },
  ];
  return (
    <div className="pt-3 mt-3 border-t border-border/20">
      <p className="text-xs text-muted-foreground mb-2" style={{ fontWeight: 600 }}>ADMIN ACTIONS</p>
      <div className="flex flex-wrap gap-2">
        {actions.map(({ label, icon: Icon, action }) => (
          <button
            key={label}
            onClick={action}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs transition-colors"
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

function ApplicantsTab() {
  const [search, setSearch] = useState("");
  const applicants = [
    { name: "Ali Rezaei", role: "Frontend Engineer", status: "Under Review", date: "May 14", match: 91 },
    { name: "Maryam Hosseini", role: "Product Designer", status: "Shortlisted", date: "May 13", match: 86 },
    { name: "Dariush Karimi", role: "Frontend Engineer", status: "New", date: "May 12", match: 78 },
    { name: "Fatemeh Ahmadi", role: "Growth Lead", status: "New", date: "May 11", match: 65 },
  ];
  const statusColor: Record<string, string> = {
    New: "bg-blue-50 text-blue-600",
    "Under Review": "bg-amber-50 text-amber-600",
    Shortlisted: "bg-emerald-50 text-emerald-600",
    Rejected: "bg-red-50 text-red-500",
  };
  const filtered = applicants.filter((a) => a.name.toLowerCase().includes(search.toLowerCase()) || a.role.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 flex-1 bg-muted/60 rounded-xl px-3 py-2">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search applicants..." className="bg-transparent text-sm focus:outline-none w-full" />
        </div>
        <Button variant="outline" size="sm"><Filter className="w-4 h-4" />Filter</Button>
        <Button variant="outline" size="sm"><Download className="w-4 h-4" />Export</Button>
      </div>
      <div className="space-y-2">
        {filtered.map((a, i) => (
          <div key={i} className="flex items-center justify-between p-4 border border-border/20 rounded-xl hover:border-emerald-200 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-xs" style={{ fontWeight: 700 }}>{a.name.split(" ").map((n) => n[0]).join("")}</div>
              <div>
                <p className="text-sm text-foreground" style={{ fontWeight: 600 }}>{a.name}</p>
                <p className="text-xs text-muted-foreground">{a.role} · {a.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs px-2.5 py-1 rounded-full ${statusColor[a.status] || "bg-muted/60 text-muted-foreground"}`} style={{ fontWeight: 500 }}>{a.status}</span>
              <span className="text-xs text-primary" style={{ fontWeight: 700 }}>{a.match}% match</span>
              <Button size="sm" variant="outline">View</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TalentPoolTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>Talent Pool</h3>
          <p className="text-xs text-muted-foreground mt-0.5">48 saved candidates</p>
        </div>
        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white"><Plus className="w-4 h-4" />Add Candidate</Button>
      </div>
      <div className="space-y-2">
        {["Frontend Engineer", "Product Designer", "Backend Engineer", "Growth Lead"].map((role, i) => (
          <div key={i} className="flex items-center justify-between p-4 border border-border/20 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-primary flex items-center justify-center text-white text-xs" style={{ fontWeight: 700 }}>{String.fromCharCode(65 + i)}</div>
              <div>
                <p className="text-sm text-foreground" style={{ fontWeight: 600 }}>Candidate {i + 1}</p>
                <p className="text-xs text-muted-foreground">{role} · Added May {10 + i}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline"><MessageSquare className="w-3.5 h-3.5" /></Button>
              <Button size="sm" variant="outline">View</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsTab() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: "Profile Views", value: "1,204", change: "+18%", up: true },
          { label: "Job Views", value: "347", change: "+9%", up: true },
          { label: "Applications", value: "7", change: "+3", up: true },
          { label: "Talent Pool", value: "48", change: "+12", up: true },
          { label: "Followers", value: "142", change: "+6", up: true },
          { label: "Avg Match Score", value: "78%", change: "–", up: true },
        ].map(({ label, value, change, up }) => (
          <div key={label} className="border border-border/20 rounded-xl p-4">
            <p className="text-xs text-muted-foreground mb-2">{label}</p>
            <p className="text-2xl text-foreground" style={{ fontWeight: 800 }}>{value}</p>
            <span className={`text-xs ${up ? "text-emerald-600" : "text-red-500"}`}>{change} this month</span>
          </div>
        ))}
      </div>
      <div className="border border-border/20 rounded-xl p-4">
        <h4 className="text-sm text-foreground mb-4" style={{ fontWeight: 600 }}>Top Traffic Sources</h4>
        {[
          { source: "Hamrahe Search", pct: 62 },
          { source: "Direct / Link", pct: 21 },
          { source: "Job Feed", pct: 11 },
          { source: "Other", pct: 6 },
        ].map(({ source, pct }) => (
          <div key={source} className="flex items-center gap-3 mb-2">
            <span className="text-xs text-muted-foreground w-36 shrink-0">{source}</span>
            <div className="flex-1 h-2 bg-muted/40 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${pct}%` }} />
            </div>
            <span className="text-xs text-foreground w-8 text-right" style={{ fontWeight: 600 }}>{pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminsTab({ onModal }: { onModal: (m: ModalType) => void }) {
  const admins = [
    { name: "Sara Ahmadi", role: "Owner", email: "sara@nextgen.io", since: "Jan 2024" },
    { name: "Reza Mohammadi", role: "Admin", email: "reza@nextgen.io", since: "Feb 2024" },
  ];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>Startup Admins</h3>
        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => onModal("invite-admin")}>
          <UserPlus className="w-4 h-4" />Invite Admin
        </Button>
      </div>
      <div className="space-y-2">
        {admins.map((a, i) => (
          <div key={i} className="flex items-center justify-between p-4 border border-border/20 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-sm" style={{ fontWeight: 700 }}>{a.name.split(" ").map((n) => n[0]).join("")}</div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-foreground" style={{ fontWeight: 600 }}>{a.name}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${a.role === "Owner" ? "bg-amber-50 text-amber-600" : "bg-primary/5 text-primary"}`} style={{ fontWeight: 500 }}>{a.role}</span>
                </div>
                <p className="text-xs text-muted-foreground">{a.email} · Since {a.since}</p>
              </div>
            </div>
            {a.role !== "Owner" && <Button size="sm" variant="outline">Remove</Button>}
          </div>
        ))}
      </div>
    </div>
  );
}

function SimpleAdminTab({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  return (
    <div className="text-center py-12">
      <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mx-auto mb-3">
        <Icon className="w-6 h-6 text-emerald-600" />
      </div>
      <p className="text-sm text-foreground" style={{ fontWeight: 600 }}>{title}</p>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </div>
  );
}

export function StartupPage() {
  const { startupId } = useParams<{ startupId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useApp();

  const isAdminView = location.pathname.endsWith("/admin");
  const isStartupAdmin = currentUser?.accountType === "startup";

  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [following, setFollowing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [modal, setModal] = useState<ModalType>(null);
  const [successMsg, setSuccessMsg] = useState({ title: "", message: "" });

  const startup = STARTUP_MOCK;
  const tabs = isAdminView ? ADMIN_TABS : PUBLIC_TABS;

  const openModal = (m: ModalType) => setModal(m);
  const closeModal = () => setModal(null);

  const showSuccess = (title: string, message: string) => {
    closeModal();
    setSuccessMsg({ title, message });
    setModal("success");
  };

  const switchTab = (tab: TabId) => {
    setActiveTab(tab);
    closeModal();
  };

  return (
    <div className="max-w-[1050px] mx-auto space-y-0">
      {/* Modals */}
      <Modal open={modal === "contact"} onClose={closeModal} title="Contact NextGen Startup">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Choose how you'd like to reach out.</p>
          <button className="w-full flex items-center gap-3 p-3 rounded-xl border border-border/20 hover:border-emerald-200 hover:bg-emerald-50 transition-colors">
            <Mail className="w-4 h-4 text-emerald-600" /><span className="text-sm text-foreground">Send Message</span>
          </button>
          <button className="w-full flex items-center gap-3 p-3 rounded-xl border border-border/20 hover:border-emerald-200 hover:bg-emerald-50 transition-colors">
            <Phone className="w-4 h-4 text-emerald-600" /><span className="text-sm text-foreground">Request a Call</span>
          </button>
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white mt-1" onClick={() => showSuccess("Message Sent", "Your message has been sent to NextGen Startup.")}>
            <Send className="w-4 h-4" />Send
          </Button>
        </div>
      </Modal>

      <Modal open={modal === "share"} onClose={closeModal} title="Share Startup Profile">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Share NextGen Startup's profile with your network.</p>
          <div className="flex items-center gap-2 bg-muted/60 rounded-xl px-3 py-2">
            <span className="text-xs text-muted-foreground flex-1 truncate">hamrahe.io/startup/nextgen</span>
            <button className="text-xs text-primary" style={{ fontWeight: 600 }} onClick={() => showSuccess("Link Copied", "Profile link copied to clipboard.")}>Copy</button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {["LinkedIn", "Telegram", "WhatsApp"].map((p) => (
              <button key={p} className="p-2.5 rounded-xl border border-border/20 hover:bg-muted/40 text-xs text-foreground transition-colors">{p}</button>
            ))}
          </div>
        </div>
      </Modal>

      <Modal open={modal === "report"} onClose={closeModal} title="Report Startup">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Help us keep Hamrahe professional and trustworthy.</p>
          {["Fake or fraudulent startup", "Misleading information", "Inappropriate content", "Spam", "Other"].map((r) => (
            <label key={r} className="flex items-center gap-3 p-3 rounded-xl border border-border/20 hover:bg-muted/30 cursor-pointer transition-colors">
              <input type="radio" name="report" className="accent-emerald-600" />
              <span className="text-sm text-foreground">{r}</span>
            </label>
          ))}
          <Button className="w-full bg-red-500 hover:bg-red-600 text-white mt-1" onClick={() => showSuccess("Report Submitted", "Thank you. Our team will review this report.")}>
            Submit Report
          </Button>
        </div>
      </Modal>

      <Modal open={modal === "join-talent-pool"} onClose={closeModal} title="Join Talent Pool">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Join NextGen Startup's talent pool to be considered for future openings.</p>
          <div className="bg-emerald-50 rounded-xl p-3 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
            <p className="text-xs text-emerald-700">Your profile and skills will be visible to the startup's hiring team.</p>
          </div>
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => showSuccess("Joined Talent Pool", "You're now in NextGen Startup's talent pool.")}>
            <Rocket className="w-4 h-4" />Join Talent Pool
          </Button>
        </div>
      </Modal>

      <Modal open={modal === "edit-profile"} onClose={closeModal} title="Edit Startup Profile">
        <div className="space-y-3">
          {[{ label: "Startup Name", val: startup.name }, { label: "Tagline", val: startup.tagline }, { label: "Stage", val: startup.stage }, { label: "Location", val: startup.location }, { label: "Website", val: startup.website }].map(({ label, val }) => (
            <div key={label}>
              <label className="text-xs text-muted-foreground mb-1 block">{label}</label>
              <input defaultValue={val} className="w-full border border-border/30 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200" />
            </div>
          ))}
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white mt-1" onClick={() => showSuccess("Profile Updated", "Your startup profile has been saved.")}>
            Save Changes
          </Button>
        </div>
      </Modal>

      <Modal open={modal === "create-job"} onClose={closeModal} title="Create Job Opening">
        <div className="space-y-3">
          {[{ label: "Job Title", placeholder: "e.g. Frontend Engineer" }, { label: "Location", placeholder: "e.g. Tehran / Remote" }, { label: "Type", placeholder: "e.g. Full-time" }].map(({ label, placeholder }) => (
            <div key={label}>
              <label className="text-xs text-muted-foreground mb-1 block">{label}</label>
              <input placeholder={placeholder} className="w-full border border-border/30 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200" />
            </div>
          ))}
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Description</label>
            <textarea placeholder="Describe the role..." rows={3} className="w-full border border-border/30 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 resize-none" />
          </div>
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white mt-1" onClick={() => { showSuccess("Job Published", "Your job opening is now live on Hamrahe."); switchTab("jobs"); }}>
            Publish Job
          </Button>
        </div>
      </Modal>

      <Modal open={modal === "create-event"} onClose={closeModal} title="Create Event">
        <div className="space-y-3">
          {[{ label: "Event Title", placeholder: "e.g. Startup Demo Day" }, { label: "Date", placeholder: "e.g. June 10, 2026" }, { label: "Location", placeholder: "e.g. Online / Tehran" }].map(({ label, placeholder }) => (
            <div key={label}>
              <label className="text-xs text-muted-foreground mb-1 block">{label}</label>
              <input placeholder={placeholder} className="w-full border border-border/30 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200" />
            </div>
          ))}
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white mt-1" onClick={() => { showSuccess("Event Created", "Your event has been published."); switchTab("events"); }}>
            Publish Event
          </Button>
        </div>
      </Modal>

      <Modal open={modal === "publish-post"} onClose={closeModal} title="Publish Startup Post">
        <div className="space-y-3">
          <textarea placeholder="Share a startup update, milestone, or announcement..." rows={5} className="w-full border border-border/30 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 resize-none" />
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => { showSuccess("Post Published", "Your update is now live."); switchTab("posts"); }}>
            <Send className="w-4 h-4" />Publish
          </Button>
        </div>
      </Modal>

      <Modal open={modal === "start-verification"} onClose={closeModal} title="Startup Trust Verification">
        <div className="space-y-4">
          <div className="bg-emerald-50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-5 h-5 text-emerald-600" />
              <span className="text-sm text-foreground" style={{ fontWeight: 600 }}>Early Trust Verification</span>
            </div>
            <p className="text-xs text-emerald-700">Verifying your startup builds credibility with job seekers and investors on Hamrahe.</p>
          </div>
          {["Business registration document", "Founder ID verification", "Official domain email", "Social media presence"].map((req, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border-2 border-border/40 flex items-center justify-center shrink-0" />
              <span className="text-xs text-foreground">{req}</span>
            </div>
          ))}
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => showSuccess("Verification Started", "Your verification request has been submitted. We'll review it within 3–5 business days.")}>
            Start Verification
          </Button>
        </div>
      </Modal>

      <Modal open={modal === "invite-admin"} onClose={closeModal} title="Invite Admin">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Invite a team member to help manage this startup profile.</p>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Email Address</label>
            <input type="email" placeholder="teammate@company.com" className="w-full border border-border/30 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Role</label>
            <select className="w-full border border-border/30 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200">
              <option>Admin</option>
              <option>Editor</option>
              <option>Viewer</option>
            </select>
          </div>
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white mt-1" onClick={() => showSuccess("Invitation Sent", "An invitation has been sent to the email address.")}>
            Send Invitation
          </Button>
        </div>
      </Modal>

      {/* Edit Cover Image */}
      <Modal open={modal === "edit-cover"} onClose={closeModal} title="Edit Cover Image">
        <div className="space-y-4">
          <div className="aspect-[3/1] w-full rounded-xl overflow-hidden bg-muted/50 border border-border/20">
            <ImageWithFallback src={startup.cover} alt="Current cover" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground mb-1 block" style={{ fontWeight: 600 }}>Upload New Cover Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full border border-border/30 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 file:mr-3 file:px-3 file:py-1.5 file:rounded-lg file:border-0 file:bg-emerald-50 file:text-emerald-700 file:text-xs file:cursor-pointer hover:file:bg-emerald-100"
            />
            <p className="text-xs text-muted-foreground">Recommended size: 1200x400px. Max 5MB.</p>
          </div>
          <div className="flex gap-3">
            <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => showSuccess("Cover Updated!", "Your startup cover image has been updated.")}>
              Save Cover Image
            </Button>
            <Button variant="outline" onClick={closeModal}>Cancel</Button>
          </div>
        </div>
      </Modal>

      {/* Edit Logo */}
      <Modal open={modal === "edit-logo"} onClose={closeModal} title="Edit Profile Logo">
        <div className="space-y-4">
          <div className="w-32 h-32 mx-auto rounded-xl overflow-hidden bg-emerald-100 border border-border/20 flex items-center justify-center">
            <Rocket className="w-10 h-10 text-emerald-600" />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground mb-1 block" style={{ fontWeight: 600 }}>Upload New Logo</label>
            <input
              type="file"
              accept="image/*"
              className="w-full border border-border/30 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 file:mr-3 file:px-3 file:py-1.5 file:rounded-lg file:border-0 file:bg-emerald-50 file:text-emerald-700 file:text-xs file:cursor-pointer hover:file:bg-emerald-100"
            />
            <p className="text-xs text-muted-foreground">Recommended: Square image, 500x500px. Max 2MB.</p>
          </div>
          <div className="flex gap-3">
            <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => showSuccess("Logo Updated!", "Your startup logo has been updated.")}>
              Save Logo
            </Button>
            <Button variant="outline" onClick={closeModal}>Cancel</Button>
          </div>
        </div>
      </Modal>

      <SuccessModal
        open={modal === "success"}
        onClose={closeModal}
        title={successMsg.title}
        message={successMsg.message}
      />

      {/* Hero Card */}
      <Card padding={false} className="overflow-hidden mb-4">
        <div className="h-52 relative group">
          <ImageWithFallback src={startup.cover} alt={startup.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          {isAdminView && (
            <>
              <div className="absolute top-4 left-4">
                <div className="flex items-center gap-1.5 bg-emerald-600/90 backdrop-blur-sm px-3 py-1.5 rounded-xl">
                  <Settings className="w-3.5 h-3.5 text-white" />
                  <span className="text-xs text-white" style={{ fontWeight: 600 }}>Owner / Admin Mode</span>
                </div>
              </div>
              <button
                onClick={() => openModal("edit-cover")}
                className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-white"
              >
                <Edit3 className="w-3.5 h-3.5 text-foreground" />
                <span className="text-xs text-foreground" style={{ fontWeight: 600 }}>Edit Cover</span>
              </button>
            </>
          )}
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-xl">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-white" style={{ fontWeight: 600 }}>{startup.activityStatus}</span>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="-mt-16 flex items-end justify-between mb-4">
            <div className="flex items-end gap-4">
              <div className="relative group/logo">
                <div className="p-1.5 bg-white rounded-2xl shadow-xl border border-border/30">
                  <div className="w-28 h-28 rounded-xl bg-emerald-100 overflow-hidden flex items-center justify-center">
                    <Rocket className="w-10 h-10 text-emerald-600" />
                  </div>
                </div>
                {isAdminView && (
                  <button
                    onClick={() => openModal("edit-logo")}
                    className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-2xl opacity-0 group-hover/logo:opacity-100 transition-opacity cursor-pointer"
                  >
                    <div className="flex flex-col items-center gap-1">
                      <Edit3 className="w-5 h-5 text-white" />
                      <span className="text-xs text-white" style={{ fontWeight: 600 }}>Edit</span>
                    </div>
                  </button>
                )}
              </div>
              <div className="pb-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl text-foreground" style={{ fontWeight: 800 }}>{startup.name}</h1>
                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">{startup.stage}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{startup.tagline}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 shrink-0">
              {isAdminView ? (
                <Button variant="outline" size="sm" onClick={() => navigate(`/startup/${startupId}`)}>
                  <Eye className="w-4 h-4" />View as Public
                </Button>
              ) : (
                <>
                  {isStartupAdmin && (
                    <Button variant="outline" size="sm" onClick={() => navigate(`/startup/${startupId}/admin`)}>
                      <Settings className="w-4 h-4" />Admin View
                    </Button>
                  )}
                  <Button
                    size="sm"
                    className={following ? "bg-muted text-foreground hover:bg-muted/80" : "bg-emerald-600 hover:bg-emerald-700 text-white"}
                    onClick={() => setFollowing(!following)}
                  >
                    {following ? <BellOff className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                    {following ? "Following" : "Follow"}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setSaved(!saved)}>
                    <Star className={`w-4 h-4 ${saved ? "fill-amber-500 text-amber-500" : ""}`} />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => openModal("share")}><Share2 className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => openModal("report")}><Flag className="w-4 h-4" /></Button>
                </>
              )}
            </div>
          </div>

          {/* Meta info */}
          <div className="flex items-center flex-wrap gap-x-4 gap-y-1.5 text-sm text-muted-foreground mb-3">
            <span className="flex items-center gap-1.5"><Rocket className="w-3.5 h-3.5" />{startup.industry}</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{startup.location}</span>
            <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" />{startup.teamSize} people</span>
            <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" />{startup.trustLevel}</span>
            <a href={`https://${startup.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-primary hover:underline">
              <Globe className="w-3.5 h-3.5" />{startup.website}
            </a>
          </div>

          {/* Stats */}
          <div className="flex items-center flex-wrap gap-x-5 gap-y-1 text-sm mb-4">
            <span><span className="text-foreground" style={{ fontWeight: 700 }}>{startup.followers}</span> <span className="text-muted-foreground">followers</span></span>
            <span><span className="text-foreground" style={{ fontWeight: 700 }}>{startup.openJobs}</span> <span className="text-muted-foreground">open roles</span></span>
            <span className="text-muted-foreground">Response: {startup.responseTime}</span>
          </div>

          {/* CTAs */}
          {!isAdminView && (
            <div className="flex items-center flex-wrap gap-2">
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => switchTab("jobs")}>View Roles</Button>
              <Button variant="outline" size="sm" onClick={() => openModal("join-talent-pool")}><Rocket className="w-4 h-4" />Join Talent Pool</Button>
              <Button variant="outline" size="sm" onClick={() => openModal("contact")}><MessageSquare className="w-4 h-4" />Contact</Button>
            </div>
          )}

          {/* Admin Action Bar */}
          {isAdminView && <AdminActionBar onModal={openModal} onTabChange={switchTab} />}
        </div>
      </Card>

      {/* Tabs */}
      <div className="bg-white border border-border/20 rounded-2xl overflow-hidden">
        <div className="relative border-b border-border/20">
          {/* Fade right for overflow hint */}
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="flex items-center gap-0 px-2" style={{ overflowX: "auto", scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3.5 text-sm whitespace-nowrap transition-colors relative shrink-0 ${
                  activeTab === tab.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
                } ${"adminOnly" in tab && tab.adminOnly ? "text-emerald-600" : ""}`}
                style={{ fontWeight: activeTab === tab.id ? 600 : 400 }}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div layoutId="startup-tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {isAdminView && <AdminOverview onTabChange={switchTab} />}
              <div>
                <h3 className="text-base text-foreground mb-3" style={{ fontWeight: 700 }}>About {startup.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  NextGen Startup is building a new generation of professional tools focused on collaboration, transparency, and trust. We believe the future of work is about real connections, not just resumes.
                </p>
              </div>
              <div>
                <h3 className="text-base text-foreground mb-3" style={{ fontWeight: 700 }}>What We're Building</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Our core product is a professional networking layer that combines trust signals, skill verification, and contextual job matching in one unified experience.
                </p>
              </div>
              <div>
                <h3 className="text-base text-foreground mb-3" style={{ fontWeight: 700 }}>Current Stage</h3>
                <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <Rocket className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="text-sm text-emerald-800" style={{ fontWeight: 600 }}>Building Product</p>
                    <p className="text-xs text-emerald-600 mt-0.5">Actively developing core features. Looking for early adopters and team members.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "jobs" && (
            <div className="space-y-3">
              {isAdminView && (
                <div className="flex justify-end mb-2">
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => openModal("create-job")}>
                    <Plus className="w-4 h-4" />Post a Job
                  </Button>
                </div>
              )}
              {[
                { title: "Frontend Engineer", type: "Full-time", location: "Remote", match: 88 },
                { title: "Product Designer", type: "Full-time", location: "Tehran / Remote", match: 72 },
                { title: "Growth & Marketing Lead", type: "Part-time", location: "Tehran", match: 61 },
              ].map((job, i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-border/20 rounded-xl hover:border-emerald-200 transition-colors cursor-pointer">
                  <div>
                    <p className="text-sm text-foreground" style={{ fontWeight: 600 }}>{job.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{job.type} · {job.location}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {!isAdminView && (
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Match</p>
                        <p className="text-sm text-emerald-600" style={{ fontWeight: 700 }}>{job.match}%</p>
                      </div>
                    )}
                    <Button size="sm" className={isAdminView ? "" : "bg-emerald-600 hover:bg-emerald-700 text-white"}>
                      {isAdminView ? "Manage" : "Apply"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "team" && (
            <div>
              {isAdminView && (
                <div className="flex justify-end mb-4">
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => openModal("invite-admin")}>
                    <UserPlus className="w-4 h-4" />Add Member
                  </Button>
                </div>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { name: "Sara Ahmadi", role: "Co-founder & CEO", avatar: "SA" },
                  { name: "Reza Mohammadi", role: "Co-founder & CTO", avatar: "RM" },
                  { name: "Neda Karimi", role: "Lead Designer", avatar: "NK" },
                  { name: "Amir Hosseini", role: "Backend Engineer", avatar: "AH" },
                ].map((member, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 p-4 border border-border/20 rounded-xl hover:border-emerald-200 transition-colors cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-sm" style={{ fontWeight: 700 }}>{member.avatar}</div>
                    <p className="text-sm text-foreground text-center" style={{ fontWeight: 600 }}>{member.name}</p>
                    <p className="text-xs text-muted-foreground text-center">{member.role}</p>
                    {!isAdminView && <Button size="sm" variant="outline" className="w-full mt-1">View Profile</Button>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "events" && (
            <div className="space-y-3">
              {isAdminView && (
                <div className="flex justify-end mb-2">
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => openModal("create-event")}>
                    <Plus className="w-4 h-4" />Create Event
                  </Button>
                </div>
              )}
              {[
                { title: "NextGen Demo Day", date: "June 15, 2026", type: "Online", attendees: 42 },
                { title: "Founder AMA Session", date: "June 28, 2026", type: "Tehran", attendees: 18 },
              ].map((evt, i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-border/20 rounded-xl hover:border-emerald-200 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm text-foreground" style={{ fontWeight: 600 }}>{evt.title}</p>
                      <p className="text-xs text-muted-foreground">{evt.date} · {evt.type} · {evt.attendees} attending</p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">Register</Button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "posts" && (
            <div className="space-y-4">
              {isAdminView && (
                <div className="flex justify-end mb-2">
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => openModal("publish-post")}>
                    <Plus className="w-4 h-4" />Publish Post
                  </Button>
                </div>
              )}
              {["We just hit 100 users! 🎉 Thank you to everyone who believed in us.", "We're hiring a Frontend Engineer. Join us in building the future of professional networking."].map((text, i) => (
                <div key={i} className="p-4 border border-border/20 rounded-xl space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <Rocket className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm text-foreground" style={{ fontWeight: 600 }}>NextGen Startup</p>
                      <p className="text-xs text-muted-foreground">{i === 0 ? "May 10" : "May 8"}</p>
                    </div>
                  </div>
                  <p className="text-sm text-foreground">{text}</p>
                  <div className="flex gap-3 text-xs text-muted-foreground pt-1">
                    <span>12 likes</span><span>3 comments</span><span>5 shares</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "products" && (
            <div className="space-y-3">
              {[
                { name: "Hamrahe Core", desc: "Professional networking layer with trust signals and contextual job matching.", tag: "Beta" },
                { name: "TrustGraph API", desc: "Skill verification and reputation API for HR tech integrations.", tag: "Coming Soon" },
              ].map((p, i) => (
                <div key={i} className="p-4 border border-border/20 rounded-xl">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-foreground" style={{ fontWeight: 600 }}>{p.name}</p>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">{p.tag}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{p.desc}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline">Learn More</Button>
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">Request Demo</Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "applicants" && <ApplicantsTab />}
          {activeTab === "talent-pool" && <TalentPoolTab />}
          {activeTab === "analytics" && <AnalyticsTab />}
          {activeTab === "admins" && <AdminsTab onModal={openModal} />}
          {activeTab === "verification" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border/20 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                    <Award className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground" style={{ fontWeight: 600 }}>Startup Trust Verification</p>
                    <p className="text-xs text-muted-foreground">Current level: Early Trust</p>
                  </div>
                </div>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => openModal("start-verification")}>Start Verification</Button>
              </div>
              <SimpleAdminTab icon={Award} title="Verification Center" description="Complete the requirements above to earn your verified startup badge." />
            </div>
          )}
          {activeTab === "privacy" && <SimpleAdminTab icon={Lock} title="Privacy Settings" description="Control who can see your startup profile and contact your team." />}
          {activeTab === "audit-log" && <SimpleAdminTab icon={ClipboardList} title="Audit Log" description="View a record of all admin actions and profile changes." />}
          {activeTab === "moderation" && <SimpleAdminTab icon={AlertTriangle} title="Moderation" description="Review flagged content and moderation actions on your profile." />}
          {activeTab === "legal" && <SimpleAdminTab icon={ReceiptText} title="Legal & Compliance" description="Review policies, terms, and compliance requirements." />}
          {activeTab === "integrations" && <SimpleAdminTab icon={Link2} title="Integrations" description="Connect your ATS, HR tools, and other platforms." />}
          {activeTab === "billing" && <SimpleAdminTab icon={DollarSign} title="Billing & Plan" description="Manage your Hamrahe subscription and payment details." />}
          {activeTab === "settings-tab" && <SimpleAdminTab icon={Settings} title="Profile Settings" description="Manage notifications, visibility, and account preferences." />}
        </div>
      </div>
    </div>
  );
}
