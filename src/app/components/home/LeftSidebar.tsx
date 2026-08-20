import { Avatar } from "../ui/Avatar";
import { Bookmark, Users, FileText, Briefcase, TrendingUp, Zap, ArrowRight, Bell, BarChart2, UserPlus, Settings, Rocket } from "lucide-react";
import { useNavigate } from "react-router";
import { useApp } from "../../context/AppContext";

export function LeftSidebar() {
  const navigate = useNavigate();
  const { currentUser: appUser } = useApp();

  const isCompany = appUser?.accountType === "company";
  const isStartup = appUser?.accountType === "startup";
  const isOrg = isCompany || isStartup;

  const profilePath = isCompany
    ? "/company/snapp/admin"
    : isStartup
    ? "/startup/nextgen/admin"
    : "/profile";

  const displayName = appUser?.name ?? "Ahmad Parvizi";
  const displayTitle = isCompany ? "Company Account" : isStartup ? "Startup Account" : (appUser?.title ?? "Senior Product Designer");
  const displaySub = isOrg ? (isCompany ? "Technology · Tehran, Iran" : "Tech Startup · Tehran, Iran") : (appUser?.company ?? "Digikala");
  const displayAvatar = appUser?.avatar ?? "";

  // Workspace nav items vary by account type
  const workspaceItems = isOrg
    ? [
        { icon: Briefcase, label: "Post a Job", color: "text-amber-500", path: "/jobs", badge: null },
        { icon: BarChart2, label: "Analytics", color: "text-primary", path: profilePath, badge: null },
        { icon: Users, label: "Followers", color: "text-violet-500", path: "/network", badge: "12" },
        { icon: FileText, label: "Published Posts", color: "text-emerald-500", path: "/", badge: null },
        { icon: Bell, label: "Notifications", color: "text-pink-500", path: "/notifications", badge: "5" },
      ]
    : [
        { icon: Bookmark, label: "Saved Items", color: "text-amber-500", path: "/profile", badge: "3" },
        { icon: Users, label: "My Network", color: "text-violet-500", path: "/network", badge: null },
        { icon: Briefcase, label: "Job Alerts", color: "text-primary", path: "/jobs", badge: "5" },
        { icon: FileText, label: "Articles", color: "text-emerald-500", path: "/", badge: null },
        { icon: Bell, label: "Notifications", color: "text-pink-500", path: "/notifications", badge: "2" },
      ];

  const statLeft = isOrg
    ? { label: "Followers", value: isCompany ? "1.2k" : "348" }
    : { label: "Profile Views", value: "234" };

  const statRight = isOrg
    ? { label: isCompany ? "Employees" : "Team", value: isCompany ? "120" : "12", path: "/network" }
    : { label: "Connections", value: "847", path: "/network" };

  const scoreLabel = isOrg ? "Company Score" : "Pro Score";
  const scoreValue = isOrg ? 68 : 82;
  const scoreTip = isOrg
    ? "Add a company description to reach Verified status"
    : "Add 2 more skills to reach Expert level";
  const scoreAction = isOrg ? "Complete company profile" : "Improve profile";

  const weeklyStats = isOrg
    ? [
        { label: "Posts published", value: "4", color: "text-primary" },
        { label: "Page impressions", value: "1.8k", color: "text-emerald-600" },
        { label: "New followers", value: "23", color: "text-violet-600" },
      ]
    : [
        { label: "Posts published", value: "2", color: "text-primary" },
        { label: "Profile appearances", value: "48", color: "text-emerald-600" },
        { label: "New connections", value: "7", color: "text-violet-600" },
      ];

  return (
    <div className="space-y-3 w-full">
      {/* Profile Mini Card */}
      <div className="bg-card border border-border/30 rounded-2xl overflow-hidden shadow-sm">
        {/* Cover */}
        <div
          className="h-14 relative"
          style={{
            background: isOrg
              ? "linear-gradient(135deg, #0066FF 0%, #0ea5e9 50%, #7c3aed 100%)"
              : "linear-gradient(135deg, #0066FF 0%, #7c3aed 50%, #ec4899 100%)",
          }}
        >
          <div
            className="absolute inset-0 opacity-25"
            style={{
              background: "radial-gradient(circle at 20% 80%, #00C853 0%, transparent 50%), radial-gradient(circle at 80% 20%, #FF9800 0%, transparent 50%)",
            }}
          />
          {isOrg && (
            <div className="absolute top-2 right-2">
              <span className="text-[9px] text-white/80 bg-white/15 px-1.5 py-0.5 rounded-full">
                {isCompany ? "Company" : "Startup"}
              </span>
            </div>
          )}
        </div>
        <div className="px-4 pb-4 -mt-7 text-center">
          <button onClick={() => navigate(profilePath)} className="cursor-pointer inline-block">
            <Avatar
              src={displayAvatar}
              name={displayName}
              size="lg"
              verified={appUser?.verified}
              openToWork={!isOrg}
            />
          </button>
          <button
            onClick={() => navigate(profilePath)}
            className="block w-full mt-1.5 cursor-pointer"
          >
            <p className="text-sm text-foreground hover:text-primary transition-colors">
              {displayName}
            </p>
          </button>
          <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{displayTitle}</p>
          <p className="text-[11px] text-muted-foreground/60">{displaySub}</p>
          {isOrg && (
            <button
              onClick={() => navigate(profilePath)}
              className="mt-2 flex items-center justify-center gap-1 text-[10px] text-primary hover:underline mx-auto cursor-pointer"
            >
              <Settings className="w-3 h-3" />
              Manage page
            </button>
          )}
        </div>

        {/* Stats row */}
        <div className="border-t border-border/30 grid grid-cols-2 divide-x divide-border/30">
          <button
            onClick={() => navigate(profilePath)}
            className="py-2.5 text-center hover:bg-muted/40 transition-colors cursor-pointer group"
          >
            <p className="text-sm text-primary" style={{ fontWeight: 600 }}>{statLeft.value}</p>
            <p className="text-[10px] text-muted-foreground">{statLeft.label}</p>
          </button>
          <button
            onClick={() => navigate(statRight.path)}
            className="py-2.5 text-center hover:bg-muted/40 transition-colors cursor-pointer group"
          >
            <p className="text-sm text-primary" style={{ fontWeight: 600 }}>{statRight.value}</p>
            <p className="text-[10px] text-muted-foreground">{statRight.label}</p>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-card border border-border/30 rounded-2xl shadow-sm p-2">
        <p className="px-3 py-1.5 text-[10px] text-muted-foreground/60 uppercase tracking-wider">
          {isOrg ? "Company workspace" : "My workspace"}
        </p>
        {workspaceItems.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/40 rounded-xl transition-all cursor-pointer group"
          >
            <item.icon className={`w-4 h-4 shrink-0 ${item.color}`} />
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && (
              <span className="w-4 h-4 rounded-full bg-primary/10 text-primary text-[9px] flex items-center justify-center shrink-0">
                {item.badge}
              </span>
            )}
          </button>
        ))}
        {isOrg && (
          <button
            onClick={() => navigate(profilePath)}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/40 rounded-xl transition-all cursor-pointer group"
          >
            <UserPlus className="w-4 h-4 shrink-0 text-primary" />
            <span className="flex-1 text-left">Invite Team Member</span>
          </button>
        )}
      </div>

      {/* Score Card */}
      <div
        className="rounded-2xl p-4 text-white shadow-sm"
        style={{
          background: isOrg
            ? "linear-gradient(135deg, #0066FF 0%, #0ea5e9 100%)"
            : "linear-gradient(135deg, #0066FF 0%, #7c3aed 100%)",
        }}
      >
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            {isOrg ? <Rocket className="w-3.5 h-3.5" /> : <Zap className="w-3.5 h-3.5" />}
            <span className="text-xs" style={{ fontWeight: 600 }}>{scoreLabel}</span>
          </div>
          <span className="text-sm" style={{ fontWeight: 700 }}>{scoreValue}<span className="text-xs text-white/60">/100</span></span>
        </div>
        <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden mb-2">
          <div className="h-full bg-white/80 rounded-full transition-all" style={{ width: `${scoreValue}%` }} />
        </div>
        <p className="text-[10px] text-white/70 mb-2.5">{scoreTip}</p>
        <button
          onClick={() => navigate(profilePath)}
          className="w-full flex items-center justify-center gap-1 py-1.5 bg-white/15 hover:bg-white/25 rounded-xl text-[11px] text-white transition-colors cursor-pointer"
        >
          {scoreAction}
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Weekly Activity */}
      <div className="bg-card border border-border/30 rounded-2xl shadow-sm p-3">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
          <p className="text-xs text-foreground" style={{ fontWeight: 600 }}>This week</p>
        </div>
        <div className="space-y-1.5">
          {weeklyStats.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground">{item.label}</span>
              <span className={`text-[11px] ${item.color}`} style={{ fontWeight: 600 }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
