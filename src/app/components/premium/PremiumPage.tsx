import { useState } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import {
  Crown, Eye, Search, MessageCircle, Briefcase, TrendingUp,
  Check, X, Star, ChevronDown, ChevronUp, Zap,
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";

type PlanInterval = "monthly" | "annually";

const plans = [
  {
    id: "career",
    name: "Career",
    icon: Briefcase,
    description: "Stand out and get hired",
    monthlyPrice: "149,000",
    annualPrice: "119,000",
    color: "from-amber-400 to-orange-500",
    features: [
      "5 InMail messages per month",
      "See who viewed your profile",
      "Top applicant badge on jobs",
      "Salary insights",
      "Job insights & preparation tools",
      "Resume builder access",
    ],
  },
  {
    id: "business",
    name: "Business",
    icon: TrendingUp,
    description: "Grow and nurture your network",
    monthlyPrice: "249,000",
    annualPrice: "199,000",
    color: "from-[#0066FF] to-[#7c3aed]",
    popular: true,
    features: [
      "15 InMail messages per month",
      "Unlimited profile browsing",
      "Business insights & company data",
      "Advanced search filters",
      "Presentation mode",
      "All Career features",
    ],
  },
  {
    id: "recruiter",
    name: "Recruiter",
    icon: Search,
    description: "Find and hire top talent",
    monthlyPrice: "499,000",
    annualPrice: "399,000",
    color: "from-violet-500 to-pink-500",
    features: [
      "30 InMail messages per month",
      "Advanced recruiting tools",
      "Talent pool management",
      "Hiring insights & analytics",
      "Candidate tracking & pipeline",
      "All Business features",
    ],
  },
];

interface ComparisonRow {
  category: string;
  features: {
    name: string;
    free: string | boolean;
    career: string | boolean;
    business: string | boolean;
    recruiter: string | boolean;
  }[];
}

const comparisonData: ComparisonRow[] = [
  {
    category: "Messaging",
    features: [
      { name: "InMail messages/month", free: "0", career: "5", business: "15", recruiter: "30" },
      { name: "Message anyone (not connected)", free: false, career: true, business: true, recruiter: true },
      { name: "Message read receipts", free: true, career: true, business: true, recruiter: true },
    ],
  },
  {
    category: "Profile & Visibility",
    features: [
      { name: "See who viewed your profile", free: "5 viewers", career: "Full list", business: "Full list", recruiter: "Full list" },
      { name: "Top applicant badge", free: false, career: true, business: true, recruiter: true },
      { name: "Profile boost in search", free: false, career: true, business: true, recruiter: true },
      { name: "Custom profile URL", free: true, career: true, business: true, recruiter: true },
    ],
  },
  {
    category: "Job Search",
    features: [
      { name: "Job insights & preparation", free: false, career: true, business: true, recruiter: true },
      { name: "Salary insights", free: false, career: true, business: true, recruiter: true },
      { name: "Resume builder", free: false, career: true, business: true, recruiter: true },
      { name: "Applicant trend data", free: false, career: true, business: true, recruiter: true },
    ],
  },
  {
    category: "Network & Search",
    features: [
      { name: "Advanced people search", free: "Basic", career: "Advanced", business: "Advanced+", recruiter: "Full" },
      { name: "Unlimited profile browsing", free: false, career: false, business: true, recruiter: true },
      { name: "Company insights", free: false, career: false, business: true, recruiter: true },
      { name: "Market trends & analytics", free: false, career: false, business: true, recruiter: true },
    ],
  },
  {
    category: "Recruiting",
    features: [
      { name: "Talent pool management", free: false, career: false, business: false, recruiter: true },
      { name: "Candidate pipeline tracking", free: false, career: false, business: false, recruiter: true },
      { name: "Hiring analytics", free: false, career: false, business: false, recruiter: true },
      { name: "Bulk InMail campaigns", free: false, career: false, business: false, recruiter: true },
    ],
  },
];

function CellValue({ value }: { value: string | boolean }) {
  if (value === true) return <Check className="w-4 h-4 text-emerald-500 mx-auto" />;
  if (value === false) return <X className="w-4 h-4 text-muted-foreground/30 mx-auto" />;
  return <span className="text-xs text-foreground">{value}</span>;
}

export function PremiumPage() {
  const [interval, setInterval] = useState<PlanInterval>("monthly");
  const [expandedCategory, setExpandedCategory] = useState<string | null>("Messaging");
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleStartTrial = (planId: string) => {
    setLoadingPlan(planId);
    setTimeout(() => {
      setLoadingPlan(null);
      toast.success("Free trial started! Welcome to Premium.");
    }, 1200);
  };

  return (
    <div className="max-w-[900px] mx-auto">
      {/* Hero */}
      <div
        className="rounded-2xl p-8 text-white text-center mb-8 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0066FF 0%, #7c3aed 50%, #ec4899 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div className="relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
            <Crown className="w-8 h-8" />
          </div>
          <h1 className="text-2xl mb-2">Upgrade to Hamrahe Premium</h1>
          <p className="text-white/80 max-w-md mx-auto text-sm">
            Unlock powerful tools to advance your career, grow your network, and find the best opportunities.
          </p>
          <div className="flex items-center justify-center gap-6 mt-6">
            {[
              { value: "3x", label: "More profile views" },
              { value: "5x", label: "More job applications" },
              { value: "40%", label: "Faster hiring" },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl text-white" style={{ fontWeight: 700 }}>{stat.value}</p>
                <p className="text-white/70 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interval toggle */}
      <div className="flex justify-center mb-8">
        <div className="flex gap-1 bg-muted/50 rounded-xl p-1">
          {(["monthly", "annually"] as const).map(i => (
            <button
              key={i}
              onClick={() => setInterval(i)}
              className={`px-6 py-2 rounded-lg text-sm cursor-pointer transition-all ${
                interval === i ? "bg-white text-primary shadow-sm" : "text-muted-foreground"
              }`}
            >
              {i === "monthly" ? "Monthly" : "Annually"}
              {i === "annually" && (
                <span className="ml-1.5 px-1.5 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] rounded-full">Save 20%</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {plans.map(plan => (
          <div
            key={plan.id}
            className={`rounded-2xl border overflow-hidden transition-all hover:shadow-lg ${
              plan.popular ? "border-primary/40 shadow-md ring-2 ring-primary/10 scale-[1.02]" : "border-border/30 shadow-sm"
            }`}
          >
            {plan.popular && (
              <div className="bg-gradient-to-r from-[#0066FF] to-[#7c3aed] text-white text-center py-1.5 text-xs" style={{ fontWeight: 600 }}>
                <Star className="w-3 h-3 inline mr-1" />
                Most Popular
              </div>
            )}
            <div className="bg-card p-5">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-3`}>
                <plan.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-foreground text-lg">{plan.name}</h3>
              <p className="text-xs text-muted-foreground">{plan.description}</p>

              <div className="mt-4 mb-5">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl text-foreground" style={{ fontWeight: 700 }}>
                    {interval === "monthly" ? plan.monthlyPrice : plan.annualPrice}
                  </span>
                  <span className="text-xs text-muted-foreground">Toman/mo</span>
                </div>
                {interval === "annually" && (
                  <p className="text-[11px] text-emerald-600 mt-0.5">
                    Billed annually — saves{" "}
                    {Math.round((1 - parseInt(plan.annualPrice.replace(",", "")) / parseInt(plan.monthlyPrice.replace(",", ""))) * 100)}%
                  </p>
                )}
              </div>

              <button
                onClick={() => handleStartTrial(plan.id)}
                disabled={loadingPlan === plan.id}
                className={`w-full py-2.5 rounded-xl text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  plan.popular
                    ? "bg-gradient-to-r from-[#0066FF] to-[#7c3aed] text-white hover:opacity-90 shadow-sm"
                    : "border border-border/40 text-foreground hover:bg-muted/40"
                } disabled:opacity-70`}
              >
                {loadingPlan === plan.id ? (
                  <><Zap className="w-4 h-4 animate-pulse" /> Starting...</>
                ) : (
                  "Start free trial"
                )}
              </button>

              <div className="mt-5 space-y-2.5">
                {plan.features.map(f => (
                  <div key={f} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-xs text-muted-foreground">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full comparison table */}
      <Card padding={false} className="mb-8 overflow-hidden">
        <div className="p-5 border-b border-border/15">
          <h3 className="text-foreground">Full feature comparison</h3>
          <p className="text-xs text-muted-foreground mt-0.5">See exactly what's included in each plan</p>
        </div>

        {/* Table header */}
        <div className="grid grid-cols-[1fr_80px_80px_80px_80px] gap-0 border-b border-border/15 bg-muted/20 px-5 py-3">
          <div className="text-xs text-muted-foreground">Feature</div>
          {["Free", "Career", "Business", "Recruiter"].map(h => (
            <div key={h} className="text-center">
              <span className={`text-xs ${h === "Business" ? "text-primary" : "text-muted-foreground"}`} style={{ fontWeight: h === "Business" ? 600 : 400 }}>
                {h}
              </span>
              {h === "Business" && <div className="w-1 h-1 bg-primary rounded-full mx-auto mt-0.5" />}
            </div>
          ))}
        </div>

        {/* Categories */}
        {comparisonData.map(category => (
          <div key={category.category} className="border-b border-border/10 last:border-0">
            <button
              onClick={() => setExpandedCategory(expandedCategory === category.category ? null : category.category)}
              className="w-full grid grid-cols-[1fr_80px_80px_80px_80px] gap-0 px-5 py-3 hover:bg-muted/20 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2 text-left">
                <span className="text-sm text-foreground" style={{ fontWeight: 500 }}>{category.category}</span>
                {expandedCategory === category.category
                  ? <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" />
                  : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                }
              </div>
              <div className="col-span-4" />
            </button>

            <AnimatePresence initial={false}>
              {expandedCategory === category.category && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  {category.features.map((feat, i) => (
                    <div
                      key={feat.name}
                      className={`grid grid-cols-[1fr_80px_80px_80px_80px] gap-0 px-5 py-2.5 ${
                        i % 2 === 0 ? "bg-muted/10" : ""
                      }`}
                    >
                      <span className="text-xs text-muted-foreground">{feat.name}</span>
                      <div className="text-center"><CellValue value={feat.free} /></div>
                      <div className="text-center"><CellValue value={feat.career} /></div>
                      <div className="text-center"><CellValue value={feat.business} /></div>
                      <div className="text-center"><CellValue value={feat.recruiter} /></div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </Card>

      {/* Why Premium benefits */}
      <Card>
        <h3 className="text-sm text-foreground mb-4">Why go Premium?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Eye, title: "Profile visibility", desc: "Get 3x more profile views and appear higher in search results" },
            { icon: MessageCircle, title: "Direct messaging", desc: "Reach anyone with InMail, even if you're not connected" },
            { icon: Briefcase, title: "Job tools", desc: "Be a top applicant with resume builder and salary insights" },
            { icon: TrendingUp, title: "Business insights", desc: "Access company data and market trends for better decisions" },
          ].map(item => (
            <div key={item.title} className="p-4 bg-muted/20 rounded-xl">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-violet-100 flex items-center justify-center mb-3">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <h4 className="text-sm text-foreground mb-1">{item.title}</h4>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
