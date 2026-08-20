import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { SNAPP } from "./companyMockData";
import {
  ShieldCheck,
  Building2,
  Users,
  Briefcase,
  BarChart2,
  Eye,
  Edit,
  Plus,
  Calendar,
  MessageSquare,
  Star,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Rocket,
  Target,
  Award,
  UserPlus,
  Settings,
  Lock,
  FileText,
  Zap,
  Bell,
} from "lucide-react";

const setupSteps = [
  { label: "Add company identity", done: true },
  { label: "Add logo and cover image", done: true },
  { label: "Start verification process", done: true },
  { label: "Add hiring process details", done: false },
  { label: "Attach assessments to jobs", done: false },
  { label: "Publish first newsletter", done: false },
  { label: "Invite employees to confirm profiles", done: false },
  { label: "Review privacy settings", done: false },
  { label: "Accept hiring policies", done: false },
];

const nextBestActions = [
  { icon: Target, text: "Complete Why Work Here section", priority: "high" },
  { icon: Briefcase, text: "Add hiring process details", priority: "high" },
  { icon: Zap, text: "Attach assessments to active jobs", priority: "medium" },
  { icon: Star, text: "Improve job quality score", priority: "medium" },
  { icon: Users, text: "Invite employees to confirm profiles", priority: "low" },
  { icon: Bell, text: "Enable contact routing", priority: "low" },
];

export function CompanyAdminDashboard() {
  const navigate = useNavigate();
  const company = SNAPP;
  const completedSteps = setupSteps.filter((s) => s.done).length;
  const progressPct = Math.round((completedSteps / setupSteps.length) * 100);

  return (
    <div className="max-w-[1050px] mx-auto space-y-5">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-border/30 shadow-sm">
            <ImageWithFallback src={company.logo} alt={company.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg text-foreground" style={{ fontWeight: 800 }}>{company.name}</h1>
              <div className="flex items-center gap-1 bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-lg">
                <ShieldCheck className="w-3 h-3" />
                <span className="text-xs" style={{ fontWeight: 700 }}>Verified</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Company Admin Dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate("/company/snapp/admin")}>
            <Settings className="w-4 h-4" />
            Manage Company Page
          </Button>
          <Button variant="gradient" size="sm" onClick={() => navigate("/company/snapp")}>
            <Eye className="w-4 h-4" />
            View Public Profile
          </Button>
        </div>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: "Profile", value: `${progressPct}%`, sub: "Complete", color: "text-amber-500", bg: "bg-amber-50 border-amber-100" },
          { label: "Brand Score", value: "42", sub: "/ 100", color: "text-primary", bg: "bg-primary/5 border-primary/10" },
          { label: "Trust Level", value: "Verified", sub: "Basic", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
          { label: "Active Jobs", value: `${company.openJobs}`, sub: "open roles", color: "text-foreground", bg: "bg-muted/50 border-border/30" },
          { label: "Pending Applicants", value: "28", sub: "to review", color: "text-violet-600", bg: "bg-violet-50 border-violet-100" },
          { label: "Talent Pool", value: "340", sub: "candidates", color: "text-blue-600", bg: "bg-blue-50 border-blue-100" },
        ].map(({ label, value, sub, color, bg }) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl p-4 border ${bg}`}
          >
            <p className="text-xs text-muted-foreground mb-1">{label}</p>
            <div className="flex items-baseline gap-1">
              <span className={`text-xl ${color}`} style={{ fontWeight: 800 }}>{value}</span>
              <span className="text-xs text-muted-foreground">{sub}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Quick Actions */}
        <Card className="p-5 lg:col-span-2">
          <h2 className="text-sm text-foreground mb-4" style={{ fontWeight: 700 }}>Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { icon: Eye, label: "View Company Profile", action: () => navigate("/company/snapp/admin"), color: "text-primary", bg: "bg-primary/5 hover:bg-primary/10" },
              { icon: Edit, label: "Edit Profile", action: () => {}, color: "text-foreground", bg: "bg-muted/50 hover:bg-muted" },
              { icon: Plus, label: "Create Job", action: () => {}, color: "text-emerald-600", bg: "bg-emerald-50 hover:bg-emerald-100" },
              { icon: Zap, label: "Attach Assessment", action: () => {}, color: "text-violet-600", bg: "bg-violet-50 hover:bg-violet-100" },
              { icon: Calendar, label: "Create Event", action: () => {}, color: "text-amber-600", bg: "bg-amber-50 hover:bg-amber-100" },
              { icon: FileText, label: "Publish Post", action: () => {}, color: "text-blue-600", bg: "bg-blue-50 hover:bg-blue-100" },
              { icon: Award, label: "Start Verification", action: () => {}, color: "text-primary", bg: "bg-primary/5 hover:bg-primary/10" },
              { icon: UserPlus, label: "Invite Admin", action: () => {}, color: "text-foreground", bg: "bg-muted/50 hover:bg-muted" },
            ].map(({ icon: Icon, label, action, color, bg }) => (
              <button
                key={label}
                onClick={action}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl ${bg} transition-colors cursor-pointer text-center`}
              >
                <Icon className={`w-5 h-5 ${color}`} />
                <span className="text-xs text-foreground leading-tight" style={{ fontWeight: 500 }}>{label}</span>
              </button>
            ))}
          </div>
        </Card>

        {/* Company Health */}
        <Card className="p-5">
          <h2 className="text-sm text-foreground mb-4" style={{ fontWeight: 700 }}>Company Health</h2>
          <div className="space-y-3">
            {[
              { label: "Profile Completion", value: progressPct, color: "bg-amber-500" },
              { label: "Employer Brand Score", value: 42, color: "bg-primary" },
              { label: "Trust Level", value: 65, color: "bg-emerald-500" },
              { label: "Job Quality Score", value: 58, color: "bg-violet-500" },
            ].map(({ label, value, color }) => (
              <div key={label}>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-muted-foreground">{label}</span>
                  <span className="text-xs text-foreground" style={{ fontWeight: 600 }}>{value}%</span>
                </div>
                <div className="h-1.5 bg-muted/50 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${color} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border/30">
            <div className="flex items-center gap-2 p-2 bg-amber-50 rounded-lg border border-amber-100">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <p className="text-xs text-amber-700">Moderation status: Clean</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Setup Journey */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm text-foreground" style={{ fontWeight: 700 }}>Company Setup Journey</h2>
            <Badge variant="secondary">{completedSteps}/{setupSteps.length} done</Badge>
          </div>
          <div className="mb-3">
            <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-violet-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">{progressPct}% complete</p>
          </div>
          <div className="space-y-2">
            {setupSteps.map((step, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${step.done ? "bg-emerald-500" : "bg-muted/50 border-2 border-border/40"}`}>
                  {step.done && <CheckCircle2 className="w-3 h-3 text-white" />}
                </div>
                <span className={`text-sm ${step.done ? "text-muted-foreground line-through" : "text-foreground"}`}>{step.label}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Next Best Actions */}
        <Card className="p-5">
          <h2 className="text-sm text-foreground mb-4" style={{ fontWeight: 700 }}>Next Best Actions</h2>
          <div className="space-y-2">
            {nextBestActions.map(({ icon: Icon, text, priority }, i) => (
              <button
                key={i}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors text-left group cursor-pointer"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  priority === "high" ? "bg-primary/10" : priority === "medium" ? "bg-violet-50" : "bg-muted/50"
                }`}>
                  <Icon className={`w-4 h-4 ${priority === "high" ? "text-primary" : priority === "medium" ? "text-violet-600" : "text-muted-foreground"}`} />
                </div>
                <span className="text-sm text-foreground flex-1">{text}</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-5">
        <h2 className="text-sm text-foreground mb-4" style={{ fontWeight: 700 }}>Recent Activity</h2>
        <div className="space-y-3">
          {[
            { icon: Briefcase, text: "3 new applications for Senior React Developer", time: "2 hours ago", type: "applications" },
            { icon: Users, text: "5 new candidates joined your Talent Pool", time: "Yesterday", type: "talent" },
            { icon: MessageSquare, text: "2 new business inquiries in your inbox", time: "2 days ago", type: "messages" },
            { icon: Building2, text: "Profile viewed by 84 people this week", time: "This week", type: "views" },
          ].map(({ icon: Icon, text, time, type }, i) => (
            <div key={i} className="flex items-start gap-3 py-2 border-b border-border/20 last:border-0">
              <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0 mt-0.5">
                <Icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-foreground">{text}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
