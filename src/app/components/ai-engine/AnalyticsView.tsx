import { useState } from "react";
import { motion } from "motion/react";
import {
  BarChart3, Eye, Users, ArrowUp, ArrowDown,
  Star, MessageCircle, Search, Globe,
  Download, TrendingUp, ShieldCheck, Sparkles,
  Layers, RefreshCw, CheckCircle2,
} from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router";
import { useAIEngine } from "../../context/AIEngineContext";

type Period = "7d" | "30d" | "90d";
type Tab = "profile" | "power";

// ─── Profile Analytics Data ───────────────────────────────────────────────────

const VIEWS_DATA: Record<Period, Array<{ day: string; views: number; searches: number }>> = {
  "7d": [
    { day: "Mon", views: 12, searches: 4 },
    { day: "Tue", views: 19, searches: 7 },
    { day: "Wed", views: 8, searches: 2 },
    { day: "Thu", views: 25, searches: 11 },
    { day: "Fri", views: 34, searches: 15 },
    { day: "Sat", views: 18, searches: 6 },
    { day: "Sun", views: 22, searches: 9 },
  ],
  "30d": [
    { day: "1", views: 14, searches: 4 }, { day: "2", views: 22, searches: 8 },
    { day: "3", views: 11, searches: 3 }, { day: "4", views: 28, searches: 12 },
    { day: "5", views: 19, searches: 6 }, { day: "6", views: 33, searches: 14 },
    { day: "7", views: 17, searches: 5 }, { day: "8", views: 24, searches: 9 },
    { day: "9", views: 31, searches: 13 }, { day: "10", views: 20, searches: 7 },
    { day: "11", views: 15, searches: 4 }, { day: "12", views: 27, searches: 11 },
    { day: "13", views: 38, searches: 16 }, { day: "14", views: 23, searches: 9 },
    { day: "15", views: 16, searches: 5 }, { day: "16", views: 29, searches: 12 },
    { day: "17", views: 41, searches: 17 }, { day: "18", views: 25, searches: 10 },
    { day: "19", views: 18, searches: 6 }, { day: "20", views: 32, searches: 13 },
    { day: "21", views: 22, searches: 8 }, { day: "22", views: 36, searches: 15 },
    { day: "23", views: 19, searches: 7 }, { day: "24", views: 28, searches: 11 },
    { day: "25", views: 43, searches: 18 }, { day: "26", views: 26, searches: 10 },
    { day: "27", views: 21, searches: 8 }, { day: "28", views: 34, searches: 14 },
    { day: "29", views: 30, searches: 12 }, { day: "30", views: 24, searches: 9 },
  ],
  "90d": [
    { day: "Wk 1", views: 72, searches: 28 }, { day: "Wk 2", views: 95, searches: 38 },
    { day: "Wk 3", views: 61, searches: 22 }, { day: "Wk 4", views: 118, searches: 47 },
    { day: "Wk 5", views: 84, searches: 33 }, { day: "Wk 6", views: 140, searches: 55 },
    { day: "Wk 7", views: 102, searches: 40 }, { day: "Wk 8", views: 76, searches: 29 },
    { day: "Wk 9", views: 128, searches: 51 }, { day: "Wk 10", views: 93, searches: 37 },
    { day: "Wk 11", views: 155, searches: 62 }, { day: "Wk 12", views: 110, searches: 44 },
  ],
};

const POST_IMPRESSIONS = [
  { post: "API latency reduction", impressions: 1240, likes: 89, comments: 23, type: "Work Update" },
  { post: "User research insights", impressions: 987, likes: 67, comments: 18, type: "Case Study" },
  { post: "Data science tip", impressions: 2340, likes: 156, comments: 45, type: "Insight" },
  { post: "Tech conference Tehran", impressions: 3120, likes: 234, comments: 78, type: "Post" },
  { post: "Product launch announcement", impressions: 890, likes: 45, comments: 12, type: "Work Update" },
];

const SEARCH_KEYWORDS = [
  { keyword: "Product Designer Tehran", appearances: 124 },
  { keyword: "Senior UX Designer", appearances: 89 },
  { keyword: "Design Systems", appearances: 67 },
  { keyword: "Product Design Digikala", appearances: 45 },
  { keyword: "UX Researcher Iran", appearances: 34 },
];

const VIEWER_COMPANIES = [
  { name: "Snapp", logo: "🚖", count: 23 },
  { name: "Cafe Bazaar", logo: "☕", count: 18 },
  { name: "Tapsi", logo: "🚕", count: 15 },
  { name: "Divar", logo: "📢", count: 12 },
  { name: "ZoodFood", logo: "🍔", count: 9 },
];

const VIEWER_ROLES = [
  { role: "Engineering Manager", percent: 28, color: "#0066FF" },
  { role: "Product Manager", percent: 22, color: "#7c3aed" },
  { role: "HR / Recruiter", percent: 19, color: "#ec4899" },
  { role: "CTO / Founder", percent: 16, color: "#f59e0b" },
  { role: "Designer", percent: 15, color: "#10b981" },
];

const CONNECTION_GROWTH = [
  { month: "Nov", connections: 780 },
  { month: "Dec", connections: 801 },
  { month: "Jan", connections: 821 },
  { month: "Feb", connections: 831 },
  { month: "Mar", connections: 840 },
  { month: "Apr", connections: 847 },
];

const STAT_CARDS = [
  { label: "Profile views", value: "234", change: "+12%", up: true, sub: "vs last period", icon: Eye, color: "text-primary", bg: "bg-primary/10", gradient: "from-primary to-violet-500" },
  { label: "Search appearances", value: "1,247", change: "+8%", up: true, sub: "in recruiter searches", icon: Search, color: "text-emerald-600", bg: "bg-emerald-50", gradient: "from-emerald-500 to-teal-500" },
  { label: "Post impressions", value: "8,581", change: "+34%", up: true, sub: "across all posts", icon: Globe, color: "text-amber-600", bg: "bg-amber-50", gradient: "from-amber-500 to-orange-500" },
  { label: "Connections", value: "847", change: "+67", up: true, sub: "total network size", icon: Users, color: "text-violet-600", bg: "bg-violet-50", gradient: "from-violet-500 to-purple-500" },
];

const TYPE_COLORS: Record<string, string> = {
  "Work Update": "bg-primary/10 text-primary",
  "Case Study": "bg-emerald-50 text-emerald-600",
  "Insight": "bg-violet-50 text-violet-600",
  "Post": "bg-muted/50 text-muted-foreground",
};

// ─── Shared chart components ──────────────────────────────────────────────────

function SvgAreaChart({
  data,
  series,
  height = 220,
  showGrid = true,
  showAxes = true,
}: {
  data: Array<Record<string, any>>;
  series: Array<{ key: string; color: string; label: string }>;
  height?: number;
  showGrid?: boolean;
  showAxes?: boolean;
}) {
  const W = 800;
  const H = height;
  const padL = showAxes ? 36 : 4;
  const padR = 4;
  const padT = 8;
  const padB = showAxes ? 28 : 8;
  const cW = W - padL - padR;
  const cH = H - padT - padB;

  const allVals = data.flatMap(d => series.map(s => Number(d[s.key]) || 0));
  const maxVal = Math.max(...allVals, 1);

  const gx = (i: number) => padL + (i / (data.length - 1)) * cW;
  const gy = (v: number) => padT + cH - (v / maxVal) * cH;

  const linePath = (key: string) =>
    data.map((d, i) => `${i === 0 ? "M" : "L"}${gx(i).toFixed(1)},${gy(Number(d[key]) || 0).toFixed(1)}`).join(" ");

  const areaPath = (key: string) => {
    const pts = data.map((d, i) => `${gx(i).toFixed(1)},${gy(Number(d[key]) || 0).toFixed(1)}`).join(" L");
    return `M${gx(0).toFixed(1)},${(padT + cH).toFixed(1)} L${pts} L${gx(data.length - 1).toFixed(1)},${(padT + cH).toFixed(1)} Z`;
  };

  const gridCount = 4;
  const grids = Array.from({ length: gridCount + 1 }, (_, i) => Math.round((maxVal / gridCount) * i));
  const maxLabels = 8;
  const step = Math.max(1, Math.ceil(data.length / maxLabels));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} style={{ overflow: "visible" }}>
      {showGrid && grids.map((v, i) => (
        <g key={`grid-${i}`}>
          <line x1={padL} y1={gy(v)} x2={padL + cW} y2={gy(v)} stroke="#f0f0f0" strokeWidth="1" />
          {showAxes && (
            <text x={padL - 4} y={gy(v)} textAnchor="end" fontSize="10" fill="#9ca3af" dominantBaseline="middle">{v}</text>
          )}
        </g>
      ))}
      {series.map(s => (
        <path key={`area-${s.key}`} d={areaPath(s.key)} fill={s.color} fillOpacity={0.1} />
      ))}
      {series.map(s => (
        <path key={`line-${s.key}`} d={linePath(s.key)} fill="none" stroke={s.color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      ))}
      {showAxes && data.map((d, i) => {
        if (i % step !== 0 && i !== data.length - 1) return null;
        return (
          <text key={`lbl-${i}`} x={gx(i)} y={H - 6} textAnchor="middle" fontSize="10" fill="#9ca3af">{d.day}</text>
        );
      })}
      {data.length <= 12 && series.map(s =>
        data.map((d, i) => (
          <circle key={`dot-${s.key}-${i}`} cx={gx(i)} cy={gy(Number(d[s.key]) || 0)} r="3" fill={s.color} />
        ))
      )}
    </svg>
  );
}

function DonutChart({ data }: { data: typeof VIEWER_ROLES }) {
  let cum = 0;
  const stops = data.map(d => {
    const start = cum;
    cum += d.percent;
    return `${d.color} ${start}% ${cum}%`;
  });
  return (
    <div className="relative w-[90px] h-[90px] shrink-0">
      <div className="w-full h-full rounded-full" style={{ background: `conic-gradient(${stops.join(", ")})` }} />
      <div className="absolute inset-[20px] bg-card rounded-full" />
    </div>
  );
}

function StatCard({ label, value, change, up, sub, icon: Icon, color, bg, gradient }: typeof STAT_CARDS[0]) {
  return (
    <Card className="relative overflow-hidden">
      <div className={`absolute top-0 right-0 w-20 h-20 rounded-full -translate-y-6 translate-x-6 opacity-10 bg-gradient-to-br ${gradient}`} />
      <div className="flex items-start justify-between mb-3">
        <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center`}>
          <Icon className={`w-4 h-4 ${color}`} />
        </div>
        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${up ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>
          {up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
          {change}
        </div>
      </div>
      <p className="text-2xl text-foreground" style={{ fontWeight: 700 }}>{value}</p>
      <p className="text-sm text-foreground/80 mt-0.5">{label}</p>
      <p className="text-[11px] text-muted-foreground mt-0.5">{sub}</p>
    </Card>
  );
}

// ─── Profile Analytics Tab ────────────────────────────────────────────────────

function ProfileAnalyticsTab({ period, setPeriod }: { period: Period; setPeriod: (p: Period) => void }) {
  const navigate = useNavigate();
  const chartData = VIEWS_DATA[period];
  const totalViews = chartData.reduce((s, d) => s + d.views, 0);
  const totalSearches = chartData.reduce((s, d) => s + d.searches, 0);

  return (
    <div className="space-y-6">
      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map(card => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      {/* Area chart */}
      <Card>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-sm text-foreground" style={{ fontWeight: 600 }}>Profile activity</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{totalViews} views · {totalSearches} search appearances</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-primary" /><span className="text-muted-foreground">Views</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-violet-400" /><span className="text-muted-foreground">Searches</span></div>
          </div>
        </div>
        <SvgAreaChart
          data={chartData}
          height={220}
          series={[
            { key: "views", color: "#0066FF", label: "Views" },
            { key: "searches", color: "#7c3aed", label: "Searches" },
          ]}
        />
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Who viewed */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm text-foreground" style={{ fontWeight: 600 }}>Who viewed your profile</h3>
            <button onClick={() => navigate("/premium")} className="text-xs text-amber-600 cursor-pointer hover:underline flex items-center gap-1">
              Unlock all <ArrowUp className="w-3 h-3 rotate-45" />
            </button>
          </div>
          <div className="mb-4">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">By company</p>
            <div className="space-y-2">
              {VIEWER_COMPANIES.map((c, i) => (
                <div key={c.name} className="flex items-center gap-3">
                  <span className="text-lg">{c.logo}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs text-foreground">{c.name}</span>
                      <span className="text-xs text-muted-foreground">{c.count}</span>
                    </div>
                    <div className="h-1.5 bg-muted/40 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(c.count / VIEWER_COMPANIES[0].count) * 100}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                        className="h-full rounded-full bg-gradient-to-r from-primary to-violet-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-3">By role</p>
            <div className="flex gap-4 items-center">
              <DonutChart data={VIEWER_ROLES} />
              <div className="flex-1 space-y-1.5">
                {VIEWER_ROLES.map(r => (
                  <div key={r.role} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: r.color }} />
                    <span className="text-[11px] text-muted-foreground flex-1 truncate">{r.role}</span>
                    <span className="text-[11px] text-foreground" style={{ fontWeight: 500 }}>{r.percent}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Network + Keywords */}
        <div className="space-y-4">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm text-foreground" style={{ fontWeight: 600 }}>Network growth</h3>
              <span className="text-xs text-emerald-600 flex items-center gap-1"><ArrowUp className="w-3 h-3" /> +67 this period</span>
            </div>
            <SvgAreaChart
              data={CONNECTION_GROWTH.map(d => ({ day: d.month, connections: d.connections }))}
              height={100}
              series={[{ key: "connections", color: "#10b981", label: "Connections" }]}
              showGrid={false}
              showAxes={true}
            />
          </Card>
          <Card>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm text-foreground" style={{ fontWeight: 600 }}>Search keywords</h3>
              <span className="text-xs text-muted-foreground">How recruiters find you</span>
            </div>
            <div className="space-y-2.5">
              {SEARCH_KEYWORDS.map((k, i) => (
                <div key={k.keyword} className="flex items-center gap-3">
                  <span className="text-[11px] text-muted-foreground/60 w-4">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-foreground truncate">{k.keyword}</p>
                    <div className="h-1 bg-muted/40 rounded-full mt-1 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(k.appearances / SEARCH_KEYWORDS[0].appearances) * 100}%` }}
                        transition={{ duration: 0.8, delay: i * 0.08 }}
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                      />
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">{k.appearances}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Post performance */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm text-foreground" style={{ fontWeight: 600 }}>Post performance</h3>
          <button onClick={() => navigate("/")} className="text-xs text-primary cursor-pointer hover:underline">View all posts</button>
        </div>
        <div className="space-y-3">
          {POST_IMPRESSIONS.map((post) => {
            const maxImpressions = Math.max(...POST_IMPRESSIONS.map(p => p.impressions));
            return (
              <div key={post.post} className="flex items-center gap-4 p-3 bg-muted/20 rounded-xl hover:bg-muted/30 transition-colors cursor-pointer group">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm text-foreground truncate">{post.post}</p>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md shrink-0 ${TYPE_COLORS[post.type] || "bg-muted/50 text-muted-foreground"}`}>
                      {post.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{post.impressions.toLocaleString()}</span>
                    <span className="flex items-center gap-1"><Star className="w-3 h-3" />{post.likes}</span>
                    <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" />{post.comments}</span>
                  </div>
                </div>
                <div className="w-16 hidden sm:flex items-end justify-center h-8">
                  <div className="w-6 rounded-t-sm" style={{ height: `${(post.impressions / maxImpressions) * 100}%`, background: "rgba(0,102,255,0.45)" }} />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Premium upsell */}
      <div className="rounded-2xl p-5 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0066FF 0%, #7c3aed 100%)" }}>
        <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/10 rounded-full" />
        <div className="relative z-10 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-white" style={{ fontWeight: 600 }}>Unlock full analytics with Premium</p>
            <p className="text-white/70 text-sm mt-0.5">See who viewed your profile, unlock recruiter insights, and get AI-powered career recommendations.</p>
          </div>
          <Button variant="ghost" className="bg-white text-primary hover:bg-white/90 shrink-0" onClick={() => navigate("/premium")}>
            Try Premium →
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── AI Power Score Tab ───────────────────────────────────────────────────────

function AIPowerTab() {
  const { trustSignals } = useAIEngine();
  const [simulatedCert, setSimulatedCert] = useState(false);
  const [simulatedCoSign, setSimulatedCoSign] = useState(false);

  const basePowerScore = 84;
  const simBoost = (simulatedCert ? 8 : 0) + (simulatedCoSign ? 6 : 0);
  const totalSimulatedPower = basePowerScore + simBoost;

  const dimensions = [
    { label: "Identity & Trust", value: "95%", sub: "Backed by Code Melli & HR domain co-sign.", delta: "Verified", deltaColor: "text-emerald-600", icon: ShieldCheck, iconColor: "text-emerald-600" },
    { label: "Experience Quality", value: "88%", sub: "4 years at Digikala + SnappPay fintech design.", delta: "+12% vs 2025", deltaColor: "text-blue-600", icon: TrendingUp, iconColor: "text-blue-600" },
    { label: "Skill Evidence", value: "94%", sub: "Advanced UX Assessment Score: 94%", delta: "Passed", deltaColor: "text-purple-600", icon: Layers, iconColor: "text-purple-600" },
    { label: "Network Quality", value: "82%", sub: "12 verified endorsements from Tech Leads.", delta: "Top Voice", deltaColor: "text-amber-600", icon: Sparkles, iconColor: "text-amber-500" },
  ];

  return (
    <div className="space-y-6">
      {/* Overview card */}
      <div className="bg-white rounded-2xl p-5 border border-border/30 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg text-foreground" style={{ fontWeight: 700 }}>Professional Power Analytics</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-700" style={{ fontWeight: 700 }}>
              Explainable Metrics
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Multidimensional evaluation derived from verified identity, proof of experience, and platform engagement events.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-200/80 px-4 py-2 rounded-2xl text-right shrink-0">
          <span className="text-[10px] text-blue-600 uppercase tracking-wider block" style={{ fontWeight: 700 }}>Official Power Score</span>
          <span className="text-2xl text-blue-900" style={{ fontWeight: 900 }}>{basePowerScore} / 100</span>
        </div>
      </div>

      {/* Dimensions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dimensions.map(d => {
          const Icon = d.icon;
          return (
            <div key={d.label} className="bg-white p-4 rounded-2xl border border-border/30 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground" style={{ fontWeight: 700 }}>{d.label}</span>
                <Icon className={`w-4 h-4 ${d.iconColor}`} />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl text-foreground" style={{ fontWeight: 900 }}>{d.value}</span>
                <span className={`text-xs ${d.deltaColor}`} style={{ fontWeight: 700 }}>{d.delta}</span>
              </div>
              <p className="text-[11px] text-muted-foreground">{d.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Scenario Simulator */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl p-6 shadow-xl border border-white/10 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="text-base text-white" style={{ fontWeight: 700 }}>Power Score Scenario Simulator</h3>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Simulate potential score increases without changing your official Hamrahe score.
            </p>
          </div>
          <div className="bg-white/10 border border-white/15 px-4 py-2 rounded-2xl text-right shrink-0">
            <span className="text-[10px] text-slate-300 uppercase block" style={{ fontWeight: 700 }}>Simulated Score</span>
            <span className="text-2xl text-amber-300" style={{ fontWeight: 900 }}>{totalSimulatedPower} / 100</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <label className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between cursor-pointer hover:bg-white/10 transition-all">
            <div className="space-y-0.5">
              <span className="text-white block" style={{ fontWeight: 700 }}>Add Verified UX Certificate</span>
              <span className="text-slate-400 text-[11px]">Pass Proctored Interaction Design Assessment</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400" style={{ fontWeight: 700 }}>+8 pts</span>
              <input
                type="checkbox"
                checked={simulatedCert}
                onChange={(e) => setSimulatedCert(e.target.checked)}
                className="rounded text-primary cursor-pointer"
              />
            </div>
          </label>
          <label className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between cursor-pointer hover:bg-white/10 transition-all">
            <div className="space-y-0.5">
              <span className="text-white block" style={{ fontWeight: 700 }}>Obtain Peer Co-sign Endorsement</span>
              <span className="text-slate-400 text-[11px]">Request former Digikala Tech Lead endorsement</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400" style={{ fontWeight: 700 }}>+6 pts</span>
              <input
                type="checkbox"
                checked={simulatedCoSign}
                onChange={(e) => setSimulatedCoSign(e.target.checked)}
                className="rounded text-primary cursor-pointer"
              />
            </div>
          </label>
        </div>
      </div>

      {/* Trust Signals Audit */}
      <div className="bg-white rounded-2xl p-5 border border-border/30 shadow-sm space-y-4">
        <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>Verified Trust Signals Audit</h3>
        <div className="space-y-2">
          {trustSignals.map((ts) => (
            <div
              key={ts.id}
              className="p-3.5 rounded-xl border border-border/20 bg-muted/20 flex items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-0.5">
                <p className="text-foreground" style={{ fontWeight: 700 }}>{ts.name}</p>
                <p className="text-[11px] text-muted-foreground">Source: {ts.evidenceSource}</p>
              </div>
              <div className="text-right">
                <span className="text-emerald-600 block" style={{ fontWeight: 700 }}>{ts.impact}</span>
                <span className="text-[10px] text-muted-foreground uppercase" style={{ fontWeight: 600 }}>{ts.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export function AnalyticsView() {
  const [tab, setTab] = useState<Tab>("profile");
  const [period, setPeriod] = useState<Period>("30d");

  return (
    <div className="max-w-[900px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-foreground" style={{ fontWeight: 700 }}>Analytics</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {tab === "profile" ? "How your profile and content are performing" : "Your AI-verified professional power metrics"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {tab === "profile" && (
            <div className="flex gap-1 bg-muted/40 rounded-xl p-1">
              {(["7d", "30d", "90d"] as Period[]).map(p => (
                <button key={p} onClick={() => setPeriod(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs cursor-pointer transition-all ${period === p ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                  {p === "7d" ? "7 days" : p === "30d" ? "30 days" : "90 days"}
                </button>
              ))}
            </div>
          )}
          {tab === "profile" && (
            <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5" /> Export
            </Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted/40 rounded-2xl p-1 w-fit">
        <button
          onClick={() => setTab("profile")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm cursor-pointer transition-all ${
            tab === "profile" ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
          }`}
          style={{ fontWeight: tab === "profile" ? 600 : 400 }}
        >
          <BarChart3 className="w-4 h-4" />
          Profile Performance
        </button>
        <button
          onClick={() => setTab("power")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm cursor-pointer transition-all ${
            tab === "power" ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
          }`}
          style={{ fontWeight: tab === "power" ? 600 : 400 }}
        >
          <Sparkles className="w-4 h-4" />
          AI Power Score
        </button>
      </div>

      {/* Tab content */}
      {tab === "profile"
        ? <ProfileAnalyticsTab period={period} setPeriod={setPeriod} />
        : <AIPowerTab />
      }
    </div>
  );
}
