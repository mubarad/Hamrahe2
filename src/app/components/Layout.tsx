import { Outlet, useNavigate, useLocation } from "react-router";
import {
  Home, Users, Briefcase, MessageCircle, Bell, Search, X,
  Settings, Crown, GraduationCap, ChevronDown, LogOut, Building2,
  Rocket, Eye, User, Command, Sparkles,
} from "lucide-react";
import { currentUser } from "../data/mock-data";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useApp } from "../context/AppContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { GlobalSearch, useGlobalSearch } from "./GlobalSearch";
import { ScrollToTop } from "./ScrollToTop";

const INDIVIDUAL_NAV = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/ai-engine", icon: Sparkles, label: "AI Engine" },
  { path: "/network", icon: Users, label: "Network" },
  { path: "/jobs", icon: Briefcase, label: "Jobs" },
  { path: "/learning", icon: GraduationCap, label: "Learning" },
  { path: "/messages", icon: MessageCircle, label: "Messages", unread: 3 },
  { path: "/notifications", icon: Bell, label: "Alerts", unread: 4 },
];

const COMPANY_NAV = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/ai-engine", icon: Sparkles, label: "AI Engine" },
  { path: "/network", icon: Users, label: "Network" },
  { path: "/jobs", icon: Briefcase, label: "Jobs" },
  { path: "/learning", icon: GraduationCap, label: "Learning" },
  { path: "/messages", icon: MessageCircle, label: "Messages", unread: 2 },
  { path: "/notifications", icon: Bell, label: "Alerts", unread: 4 },
];

const STARTUP_NAV = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/ai-engine", icon: Sparkles, label: "AI Engine" },
  { path: "/network", icon: Users, label: "Network" },
  { path: "/jobs", icon: Briefcase, label: "Jobs" },
  { path: "/learning", icon: GraduationCap, label: "Learning" },
  { path: "/messages", icon: MessageCircle, label: "Messages", unread: 1 },
  { path: "/notifications", icon: Bell, label: "Alerts", unread: 4 },
];

function IndividualProfileDropdown({
  onNavigate,
  logout,
  user,
  location,
}: {
  onNavigate: (path: string) => void;
  logout: () => void;
  user: { avatar?: string; isPremium?: boolean; name?: string } | null;
  location: { pathname: string };
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isProfileActive =
    location.pathname === "/profile" ||
    location.pathname === "/settings" ||
    location.pathname === "/premium";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 pl-1.5 pr-2.5 py-1.5 rounded-full cursor-pointer transition-all duration-200 ${
          isProfileActive
            ? "bg-primary/5 ring-2 ring-primary/20"
            : open
            ? "bg-muted/60"
            : "hover:bg-muted/60"
        }`}
      >
        <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white shadow-sm relative">
          <img
            src={user?.avatar || currentUser.avatar}
            alt="Me"
            className="w-full h-full object-cover"
          />
          {user?.isPremium && (
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center border border-white">
              <Crown className="w-2 h-2 text-white" />
            </div>
          )}
        </div>
        <span className="text-sm text-foreground hidden xl:block" style={{ fontWeight: 500 }}>
          Ahmad
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-border/20 z-50 overflow-hidden"
          >
            {/* Profile header */}
            <div className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 border-b border-border/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white shadow-sm relative shrink-0">
                  <img
                    src={user?.avatar || currentUser.avatar}
                    alt="Ahmad"
                    className="w-full h-full object-cover"
                  />
                  {user?.isPremium && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center border border-white">
                      <Crown className="w-2.5 h-2.5 text-white" />
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-foreground truncate" style={{ fontWeight: 700 }}>
                    Ahmad Rezaei
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    Senior Software Engineer
                  </p>
                </div>
              </div>
            </div>

            <div className="p-2">
              {/* View Profile */}
              <button
                onClick={() => { onNavigate("/profile"); setOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted/50 text-left transition-colors"
              >
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">View Profile</span>
              </button>

              <div className="h-px bg-border/30 my-1" />

              {/* Premium */}
              <button
                onClick={() => { onNavigate("/premium"); setOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-amber-50 text-left transition-colors group"
              >
                <Crown className="w-4 h-4 text-amber-500 group-hover:text-amber-600" />
                <div className="flex-1">
                  <span className="text-sm text-foreground">
                    {user?.isPremium ? "Manage Premium" : "Try Premium"}
                  </span>
                </div>
                {!user?.isPremium && (
                  <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full" style={{ fontWeight: 600 }}>
                    Upgrade
                  </span>
                )}
              </button>

              {/* Settings */}
              <button
                onClick={() => { onNavigate("/settings"); setOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted/50 text-left transition-colors"
              >
                <Settings className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">Settings & Privacy</span>
              </button>

              <div className="h-px bg-border/30 my-1" />

              {/* Log out */}
              <button
                onClick={() => { logout(); setOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 text-left transition-colors"
              >
                <LogOut className="w-4 h-4 text-red-500" />
                <span className="text-sm text-red-600">Log Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function OrgIdentityDropdown({
  isStartup,
  onNavigate,
  logout,
}: {
  isStartup: boolean;
  onNavigate: (path: string) => void;
  logout: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const profilePath = isStartup ? "/startup/nextgen/admin" : "/company/snapp/admin";
  const publicPath = isStartup ? "/startup/nextgen" : "/company/snapp";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full cursor-pointer transition-all duration-200 hover:bg-muted/60 ${open ? "bg-muted/60" : ""}`}
      >
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isStartup ? "bg-emerald-100" : "bg-primary/10"}`}>
          {isStartup
            ? <Rocket className="w-4 h-4 text-emerald-600" />
            : <Building2 className="w-4 h-4 text-primary" />
          }
        </div>
        <div className="hidden xl:block text-left">
          <p className="text-sm text-foreground leading-tight" style={{ fontWeight: 600 }}>
            {isStartup ? "NextGen Startup" : "Snapp"}
          </p>
          <p className="text-xs text-muted-foreground leading-tight">
            {isStartup ? "Startup Account" : "Company Account"}
          </p>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-border/20 z-50 overflow-hidden"
          >
            <div className={`p-4 ${isStartup ? "bg-emerald-50" : "bg-primary/5"} border-b border-border/20`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isStartup ? "bg-emerald-100" : "bg-primary/10"}`}>
                  {isStartup ? <Rocket className="w-5 h-5 text-emerald-600" /> : <Building2 className="w-5 h-5 text-primary" />}
                </div>
                <div>
                  <p className="text-sm text-foreground" style={{ fontWeight: 700 }}>
                    {isStartup ? "NextGen Startup" : "Snapp"}
                  </p>
                  <p className="text-xs text-muted-foreground">{isStartup ? "Startup Account" : "Organization Account"}</p>
                </div>
              </div>
            </div>

            <div className="p-2">
              <button
                onClick={() => { onNavigate(profilePath); setOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted/50 text-left transition-colors"
              >
                {isStartup ? <Rocket className="w-4 h-4 text-emerald-600" /> : <Building2 className="w-4 h-4 text-primary" />}
                <span className="text-sm text-foreground">Manage {isStartup ? "Startup" : "Company"} Profile</span>
              </button>
              <button
                onClick={() => { onNavigate(publicPath); setOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted/50 text-left transition-colors"
              >
                <Eye className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">View Public Profile</span>
              </button>
              <button
                onClick={() => { onNavigate("/settings"); setOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted/50 text-left transition-colors"
              >
                <Settings className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">Account Settings</span>
              </button>
              <div className="h-px bg-border/30 my-1" />
              <button
                onClick={() => { logout(); setOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 text-left transition-colors"
              >
                <LogOut className="w-4 h-4 text-red-500" />
                <span className="text-sm text-red-600">Log Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser: appUser, logout } = useApp();
  const { open: searchOpen, setOpen: setSearchOpen } = useGlobalSearch();

  const isCompany = appUser?.accountType === "company";
  const isStartup = appUser?.accountType === "startup";
  const isOrg = isCompany || isStartup;

  const navItems = isCompany ? COMPANY_NAV : isStartup ? STARTUP_NAV : INDIVIDUAL_NAV;

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />
      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-border/20 shadow-sm shadow-black/[0.02]">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center h-[64px] gap-4">
          {/* Logo */}
          <button
            onClick={() => navigate(isCompany ? "/company/snapp/admin" : isStartup ? "/startup/nextgen/admin" : "/")}
            className="shrink-0 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0066FF] to-[#7c3aed] flex items-center justify-center shadow-md shadow-primary/20 group-hover:shadow-lg group-hover:shadow-primary/30 transition-shadow">
              <span className="text-white text-xl" style={{ fontWeight: 700 }}>H</span>
            </div>
          </button>

          {/* Search trigger */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 bg-muted/70 hover:bg-muted rounded-full px-4 py-2 transition-all duration-200 w-[240px] hover:w-[260px] group"
          >
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <span className="text-sm text-muted-foreground/70 flex-1 text-left">Search...</span>
            <div className="hidden sm:flex items-center gap-0.5 bg-white/70 border border-border/20 rounded-md px-1.5 py-0.5">
              <Command className="w-3 h-3 text-muted-foreground/50" />
              <span className="text-[10px] text-muted-foreground/50">K</span>
            </div>
          </button>

          <div className="flex-1" />

          {/* Nav Items */}
          <nav className="flex items-center gap-1 bg-muted/50 rounded-2xl p-1">
            {navItems.map((item) => {
              const active = isActive(item.path);
              const unread = (item as any).unread as number | undefined;
              return (
                <button
                  key={item.path + item.label}
                  onClick={() => navigate(item.path)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    active
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/60"
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white rounded-xl shadow-sm"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <item.icon className={`w-[18px] h-[18px] relative z-10 ${active ? "stroke-[2.5]" : ""}`} />
                  <span className="text-xs relative z-10 hidden xl:block">{item.label}</span>
                  {unread && unread > 0 && (
                    <span className="absolute -top-0.5 right-1.5 min-w-[16px] h-4 px-1 bg-[#F44336] text-white text-[10px] rounded-full z-10 flex items-center justify-center leading-none">
                      {unread > 9 ? "9+" : unread}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {isOrg ? (
            <OrgIdentityDropdown
              isStartup={isStartup}
              onNavigate={navigate}
              logout={logout}
            />
          ) : (
            <IndividualProfileDropdown
              onNavigate={navigate}
              logout={logout}
              user={appUser}
              location={location}
            />
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1200px] mx-auto px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
}
