import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  ShieldAlert, LayoutDashboard, Briefcase, FileText, CheckCircle2,
  Users, Building2, ShieldCheck, Scale, BarChart3, DollarSign, Settings,
  Activity, ChevronRight, ChevronLeft, Search, Bell, AlertTriangle,
  Lock, Cpu, RefreshCw, FolderGit2, Terminal, ArrowUpRight, HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavGroup {
  id: string;
  title: string;
  items: {
    title: string;
    path: string;
    icon: any;
    badge?: string;
    badgeColor?: string;
  }[];
}

const SIDEBAR_GROUPS: NavGroup[] = [
  {
    id: "01-command",
    title: "01 · Command",
    items: [
      { title: "Command Center", path: "/command", icon: LayoutDashboard, badge: "LIVE", badgeColor: "bg-emerald-500 text-white" },
      { title: "My Work", path: "/command/my-work", icon: CheckCircle2, badge: "3" },
      { title: "Critical Alerts", path: "/command/alerts", icon: AlertTriangle, badge: "2", badgeColor: "bg-red-500 text-white" },
      { title: "Decision Center", path: "/command/decisions", icon: Scale },
    ],
  },
  {
    id: "02-operations",
    title: "02 · Operations",
    items: [
      { title: "Work Queues", path: "/command/work", icon: FileText, badge: "24" },
      { title: "Case 360", path: "/command/cases", icon: Briefcase, badge: "3" },
      { title: "Verification Ops", path: "/command/verification", icon: ShieldCheck },
      { title: "Support Ops", path: "/command/support", icon: HelpCircle },
    ],
  },
  {
    id: "03-entities",
    title: "03 · Entities",
    items: [
      { title: "Users", path: "/command/entities/users", icon: Users },
      { title: "Organizations", path: "/command/entities/organizations", icon: Building2 },
      { title: "Jobs", path: "/command/entities/jobs", icon: Briefcase },
    ],
  },
  {
    id: "04-trust-safety",
    title: "04 · Trust & Safety",
    items: [
      { title: "Trust & Risk Engine", path: "/command/trust", icon: ShieldAlert },
      { title: "Abuse Graph", path: "/command/abuse-graph", icon: FolderGit2 },
      { title: "Content Moderation", path: "/command/moderation/content", icon: Activity },
      { title: "Chat Safety", path: "/command/moderation/chat", icon: Lock },
      { title: "Appeals Center", path: "/command/appeals", icon: RefreshCw },
    ],
  },
  {
    id: "05-intelligence",
    title: "05 · AI & Analytics",
    items: [
      { title: "AI Governance", path: "/command/ai", icon: Cpu },
      { title: "Growth & Skills", path: "/command/growth", icon: BarChart3 },
      { title: "Learning & Assessments", path: "/command/learning", icon: Activity },
    ],
  },
  {
    id: "06-revenue",
    title: "06 · Revenue",
    items: [
      { title: "Revenue Overview", path: "/command/revenue", icon: DollarSign },
      { title: "Subscriptions & Invoices", path: "/command/revenue/subscriptions", icon: FileText },
    ],
  },
  {
    id: "07-governance",
    title: "07 · Governance",
    items: [
      { title: "Roles & Access", path: "/command/governance", icon: Settings },
      { title: "Feature Flags & Automation", path: "/command/configuration", icon: Terminal },
    ],
  },
  {
    id: "08-system",
    title: "08 · System",
    items: [
      { title: "System Health & Incidents", path: "/command/system", icon: Activity },
    ],
  },
];

export function CommandSidebar({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGroups = SIDEBAR_GROUPS.map((group) => ({
    ...group,
    items: group.items.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter((group) => group.items.length > 0);

  return (
    <aside
      className={`relative flex flex-col bg-[#111827] text-slate-200 border-r border-slate-800 transition-all duration-300 z-30 select-none ${
        collapsed ? "w-[64px]" : "w-[260px]"
      }`}
    >
      {/* Header branding */}
      <div className="h-[64px] px-4 flex items-center justify-between border-b border-slate-800 bg-[#0f172a]">
        {!collapsed && (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <ShieldAlert className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white tracking-tight leading-none">HAMRAHE</p>
              <p className="text-[10px] text-blue-400 font-mono tracking-wider">command.hamrahe.com</p>
            </div>
          </div>
        )}

        {collapsed && (
          <div className="w-8 h-8 mx-auto rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <ShieldAlert className="w-4 h-4 text-white" />
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer hidden md:flex items-center justify-center"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Return to main app */}
      <div className="p-3 border-b border-slate-800/80 bg-slate-900/50">
        <button
          onClick={() => navigate("/")}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800/40 hover:bg-slate-800 border border-slate-700/40 transition-all ${
            collapsed ? "justify-center" : ""
          }`}
          title="Back to app.hamrahe.com"
        >
          <ArrowUpRight className="w-4 h-4 text-blue-400 shrink-0" />
          {!collapsed && (
            <span className="flex-1 text-left truncate">Back to main app</span>
          )}
        </button>
      </div>

      {/* Search */}
      {!collapsed && (
        <div className="p-3 border-b border-slate-800/60">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search navigation..."
              className="w-full bg-slate-900 border border-slate-800 text-xs rounded-xl pl-8 pr-3 py-1.5 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
        {filteredGroups.map((group) => (
          <div key={group.id} className="space-y-0.5">
            {!collapsed && (
              <h4 className="px-3 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                {group.title}
              </h4>
            )}

            {group.items.map((item) => {
              const isActive =
                item.path === "/command"
                  ? location.pathname === "/command" || location.pathname === "/command/"
                  : location.pathname.startsWith(item.path);

              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium cursor-pointer transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                  } ${collapsed ? "justify-center" : ""}`}
                  title={item.title}
                >
                  <item.icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-slate-500"}`} />
                  {!collapsed && <span className="flex-1 text-left truncate">{item.title}</span>}

                  {!collapsed && item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold leading-none shrink-0 ${
                        item.badgeColor || "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer */}
      {!collapsed && (
        <div className="p-3 border-t border-slate-800 bg-slate-950/60 text-[11px] text-slate-400 flex items-center justify-between">
          <div>
            <p className="font-semibold text-slate-300">Production</p>
            <p className="text-[10px] text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
              All systems operational
            </p>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">v2026.8</span>
        </div>
      )}
    </aside>
  );
}
