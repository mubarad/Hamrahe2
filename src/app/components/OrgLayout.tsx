import { Outlet, useNavigate, useLocation } from "react-router";
import { useApp } from "../context/AppContext";
import {
  LayoutDashboard,
  Building2,
  Briefcase,
  Users,
  GraduationCap,
  Calendar,
  MessageCircle,
  Target,
  BarChart2,
  ShieldCheck,
  UserCog,
  Lock,
  FileText,
  Plug,
  CreditCard,
  Settings,
  LogOut,
  Rocket,
  ChevronRight,
} from "lucide-react";

const COMPANY_NAV = [
  { path: "/company-dashboard", icon: LayoutDashboard, label: "Company Dashboard" },
  { path: "/company/snapp/admin", icon: Building2, label: "Company Profile" },
  { path: "/company/snapp/admin", icon: Briefcase, label: "Jobs", sub: true },
  { path: "/company/snapp/admin", icon: Users, label: "Applicants", sub: true },
  { path: "/company/snapp/admin", icon: GraduationCap, label: "Learning & Assessments", sub: true },
  { path: "/company/snapp/admin", icon: Calendar, label: "Events", sub: true },
  { path: "/company/snapp/admin", icon: MessageCircle, label: "Messages", sub: true },
  { path: "/company/snapp/admin", icon: Target, label: "Talent Pool", sub: true },
  { path: "/company/snapp/admin", icon: BarChart2, label: "Analytics", sub: true },
  { path: "/company/snapp/admin", icon: ShieldCheck, label: "Verification", sub: true },
  { path: "/company/snapp/admin", icon: UserCog, label: "Admins", sub: true },
  { path: "/company/snapp/admin", icon: Lock, label: "Privacy", sub: true },
  { path: "/company/snapp/admin", icon: FileText, label: "Audit Log", sub: true },
  { path: "/company/snapp/admin", icon: Settings, label: "Settings", sub: true },
];

const STARTUP_NAV = [
  { path: "/startup-dashboard", icon: LayoutDashboard, label: "Startup Dashboard" },
  { path: "/startup/nextgen/admin", icon: Rocket, label: "Startup Profile" },
  { path: "/startup/nextgen/admin", icon: Briefcase, label: "Jobs", sub: true },
  { path: "/startup/nextgen/admin", icon: Users, label: "Team", sub: true },
  { path: "/startup/nextgen/admin", icon: MessageCircle, label: "Messages", sub: true },
  { path: "/startup/nextgen/admin", icon: Target, label: "Talent Pool", sub: true },
  { path: "/startup/nextgen/admin", icon: BarChart2, label: "Analytics", sub: true },
  { path: "/startup/nextgen/admin", icon: ShieldCheck, label: "Verification", sub: true },
  { path: "/startup/nextgen/admin", icon: UserCog, label: "Admins", sub: true },
  { path: "/startup/nextgen/admin", icon: Settings, label: "Settings", sub: true },
];

export function OrgLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout } = useApp();

  const isStartup = currentUser?.accountType === "startup";
  const navItems = isStartup ? STARTUP_NAV : COMPANY_NAV;

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-white border-r border-border/20 flex flex-col sticky top-0 h-screen overflow-y-auto">
        {/* Logo */}
        <div className="p-5 border-b border-border/20">
          <button
            onClick={() => navigate(isStartup ? "/startup-dashboard" : "/company-dashboard")}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#7c3aed] flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <div>
              <span className="font-bold text-foreground text-sm">Hamrahe</span>
              <p className="text-xs text-muted-foreground">{isStartup ? "Startup Portal" : "Company Portal"}</p>
            </div>
          </button>
        </div>

        {/* Account card */}
        <div className="px-4 py-3 border-b border-border/20">
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-muted/40">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${isStartup ? "bg-emerald-100" : "bg-primary/10"}`}>
              {isStartup ? <Rocket className="w-5 h-5 text-emerald-600" /> : <Building2 className="w-5 h-5 text-primary" />}
            </div>
            <div className="min-w-0">
              <p className="text-sm text-foreground truncate" style={{ fontWeight: 600 }}>{currentUser?.name || (isStartup ? "NextGen Startup" : "TechCorp Inc.")}</p>
              <p className="text-xs text-muted-foreground">{isStartup ? "Startup Account" : "Organization Account"}</p>
            </div>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map((item, i) => {
            const active = location.pathname === item.path;
            return (
              <button
                key={`${item.label}-${i}`}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl cursor-pointer transition-all text-left ${
                  active
                    ? isStartup ? "bg-emerald-50 text-emerald-700" : "bg-primary/5 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                } ${item.sub ? "pl-8" : ""}`}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                <span className="text-sm truncate" style={{ fontWeight: active ? 600 : 400 }}>{item.label}</span>
                {!item.sub && <ChevronRight className={`w-3.5 h-3.5 ml-auto opacity-30 ${active ? "opacity-60" : ""}`} />}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-border/20 space-y-1">
          <button
            onClick={() => { logout(); navigate("/auth"); }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span className="text-sm">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-border/20 px-6 h-[64px] flex items-center justify-between shadow-sm shadow-black/[0.02]">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {isStartup ? "Startup" : "Organization"} Portal
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(isStartup ? "/startup/nextgen" : "/company/snapp")}
              className="text-sm text-primary hover:underline flex items-center gap-1.5"
            >
              <Building2 className="w-4 h-4" />
              View Public Profile
            </button>
          </div>
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
