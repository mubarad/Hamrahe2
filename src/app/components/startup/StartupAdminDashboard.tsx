import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/badge";
import {
  Rocket,
  Users,
  Briefcase,
  Eye,
  Edit,
  Plus,
  Calendar,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  Target,
  Award,
  UserPlus,
  FileText,
  Zap,
  Bell,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

const STARTUP_DATA = {
  name: "NextGen Startup",
  logo: "https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?w=200",
  tagline: "Building the next generation of professional tools",
  stage: "Building Product",
  industry: "Technology",
  location: "Tehran, Iran",
  teamSize: "4–10",
  followers: 142,
  openJobs: 3,
  trustLevel: "Startup — Early Trust",
};

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

const nextBestActions = [
  { icon: Users, text: "Add your team members to the page", priority: "high" },
  { icon: Target, text: "Describe your product or service in detail", priority: "high" },
  { icon: Briefcase, text: "Post your first job opening", priority: "medium" },
  { icon: Award, text: "Apply for startup trust verification", priority: "medium" },
  { icon: FileText, text: "Publish a startup update post", priority: "low" },
  { icon: Bell, text: "Enable job alert notifications", priority: "low" },
];

export function StartupAdminDashboard() {
  const navigate = useNavigate();
  const startup = STARTUP_DATA;
  const completedSteps = setupSteps.filter((s) => s.done).length;
  const progressPct = Math.round((completedSteps / setupSteps.length) * 100);

  return (
    <div className="max-w-[1050px] mx-auto space-y-5">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-border/30 shadow-sm bg-emerald-100 flex items-center justify-center">
            <Rocket className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg text-foreground" style={{ fontWeight: 800 }}>{startup.name}</h1>
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">{startup.stage}</Badge>
            </div>
            <p className="text-xs text-muted-foreground">Startup Admin Dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate("/startup/nextgen/admin")}>
            Manage Startup Page
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" size="sm" onClick={() => navigate("/startup/nextgen")}>
            <Eye className="w-4 h-4" />
            View Public Profile
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: "Profile", value: `${progressPct}%`, sub: "Complete", color: "text-amber-500", bg: "bg-amber-50 border-amber-100" },
          { label: "Trust Level", value: "Early", sub: "Startup", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
          { label: "Team Size", value: startup.teamSize, sub: "people", color: "text-foreground", bg: "bg-muted/50 border-border/30" },
          { label: "Open Jobs", value: `${startup.openJobs}`, sub: "open roles", color: "text-primary", bg: "bg-primary/5 border-primary/10" },
          { label: "Followers", value: `${startup.followers}`, sub: "on Hamrahe", color: "text-violet-600", bg: "bg-violet-50 border-violet-100" },
          { label: "Applications", value: "7", sub: "received", color: "text-blue-600", bg: "bg-blue-50 border-blue-100" },
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
              { icon: Eye, label: "View Startup Page", action: () => navigate("/startup/nextgen/admin"), color: "text-emerald-600", bg: "bg-emerald-50 hover:bg-emerald-100" },
              { icon: Edit, label: "Edit Profile", action: () => {}, color: "text-foreground", bg: "bg-muted/50 hover:bg-muted" },
              { icon: Plus, label: "Post a Job", action: () => {}, color: "text-primary", bg: "bg-primary/5 hover:bg-primary/10" },
              { icon: Users, label: "Add Team Member", action: () => {}, color: "text-violet-600", bg: "bg-violet-50 hover:bg-violet-100" },
              { icon: Calendar, label: "Create Event", action: () => {}, color: "text-amber-600", bg: "bg-amber-50 hover:bg-amber-100" },
              { icon: FileText, label: "Publish Post", action: () => {}, color: "text-blue-600", bg: "bg-blue-50 hover:bg-blue-100" },
              { icon: Award, label: "Apply for Trust", action: () => {}, color: "text-emerald-600", bg: "bg-emerald-50 hover:bg-emerald-100" },
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

        {/* Startup Health */}
        <Card className="p-5">
          <h2 className="text-sm text-foreground mb-4" style={{ fontWeight: 700 }}>Startup Health</h2>
          <div className="space-y-3">
            {[
              { label: "Profile Completion", value: progressPct, color: "bg-amber-500" },
              { label: "Trust Level", value: 30, color: "bg-emerald-500" },
              { label: "Team Completeness", value: 45, color: "bg-violet-500" },
              { label: "Job Quality Score", value: 60, color: "bg-primary" },
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
            <div className="flex items-center gap-2 p-2 bg-emerald-50 rounded-lg border border-emerald-100">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <p className="text-xs text-emerald-700">Growth trend: Positive</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Setup Journey */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm text-foreground" style={{ fontWeight: 700 }}>Startup Setup Journey</h2>
            <Badge variant="secondary">{completedSteps}/{setupSteps.length} done</Badge>
          </div>
          <div className="mb-3">
            <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
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
                  priority === "high" ? "bg-emerald-50" : priority === "medium" ? "bg-violet-50" : "bg-muted/50"
                }`}>
                  <Icon className={`w-4 h-4 ${priority === "high" ? "text-emerald-600" : priority === "medium" ? "text-violet-600" : "text-muted-foreground"}`} />
                </div>
                <span className="text-sm text-foreground flex-1">{text}</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
