import { useState } from "react";
import { Card } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { Badge } from "../../ui/Badge";
import { Avatar } from "../../ui/Avatar";
import {
  CheckCircle2,
  ChevronRight,
  Briefcase,
  Users,
  BookOpen,
  Calendar,
  Layers,
  ArrowRight,
  Zap,
  Target,
  Brain,
  BarChart3,
  MapPin,
  Globe,
  Building2,
  Clock,
  Activity,
  TrendingUp,
  MessageSquare,
  Lightbulb,
} from "lucide-react";
import { motion } from "motion/react";
import { CompanyData, MOCK_SIMILAR_COMPANIES, MOCK_PRODUCTS } from "../companyMockData";
import { useNavigate } from "react-router";

interface OverviewTabProps {
  company: CompanyData;
  viewMode: "public" | "loggedIn" | "admin";
  onTabChange: (tab: string) => void;
}

const ROLE_FAMILIES = [
  { name: "Product", icon: Layers, openJobs: 4, color: "bg-blue-50 text-blue-700" },
  { name: "Design", icon: Brain, openJobs: 2, color: "bg-violet-50 text-violet-700" },
  { name: "Engineering", icon: Zap, openJobs: 3, color: "bg-emerald-50 text-emerald-700" },
  { name: "Data", icon: BarChart3, openJobs: 1, color: "bg-amber-50 text-amber-700" },
  { name: "Marketing", icon: TrendingUp, openJobs: 1, color: "bg-pink-50 text-pink-700" },
  { name: "Operations", icon: Activity, openJobs: 1, color: "bg-slate-50 text-slate-700" },
];

function DecisionSummary({ company }: { company: CompanyData }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border border-primary/20 bg-gradient-to-br from-primary/5 to-violet-500/5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center shrink-0">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-primary mb-1" style={{ fontWeight: 600 }}>
              Should you consider this company?
            </p>
            <h3 className="text-foreground mb-2" style={{ fontWeight: 700 }}>
              This company may be a strong fit for you.
            </h3>
            <ul className="space-y-1.5 mb-4">
              {[
                "82% match with your profile",
                "3 open roles match your skills",
                "Hybrid work model",
                "Fast hiring response",
                "One required assessment before applying",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
              <div>
                <span className="text-xs text-amber-700 dark:text-amber-400" style={{ fontWeight: 600 }}>
                  Recommended next step:{" "}
                </span>
                <span className="text-xs text-amber-700 dark:text-amber-400">
                  Complete Product Thinking Assessment
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function JourneyMap() {
  const steps = [
    { label: "Profile completed", done: true },
    { label: "82% company match calculated", done: true },
    { label: "Complete Product Thinking Assessment", done: false, active: true },
    { label: "Start Portfolio Preparation", done: false },
    { label: "Apply to Senior Product Designer", done: false },
    { label: "Track your application", done: false },
  ];

  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center">
          <MapPin className="w-3.5 h-3.5 text-white" />
        </div>
        <div>
          <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>
            Your Path to Snapp
          </h3>
          <p className="text-xs text-muted-foreground">6 steps · 2 completed</p>
        </div>
      </div>
      <div className="space-y-2">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-3">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                step.done
                  ? "bg-emerald-500"
                  : step.active
                  ? "bg-primary ring-2 ring-primary/30"
                  : "bg-muted border-2 border-border"
              }`}
            >
              {step.done && <CheckCircle2 className="w-3 h-3 text-white" />}
              {step.active && <div className="w-2 h-2 rounded-full bg-white" />}
            </div>
            <span
              className={`text-sm ${
                step.done
                  ? "text-muted-foreground line-through"
                  : step.active
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
              style={step.active ? { fontWeight: 600 } : {}}
            >
              {step.label}
            </span>
            {step.active && (
              <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full" style={{ fontWeight: 600 }}>
                Next
              </span>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

function CompanySnapshot({ company }: { company: CompanyData }) {
  const items = [
    { label: "Industry", value: company.industry, icon: Building2 },
    { label: "Size", value: company.size, icon: Users },
    { label: "Founded", value: company.founded, icon: Clock },
    { label: "Headquarters", value: company.headquarters, icon: MapPin },
    { label: "Work Model", value: company.workModel, icon: Briefcase },
    { label: "Open Jobs", value: `${company.openJobs} roles`, icon: Target },
    { label: "Response Time", value: company.responseTime, icon: MessageSquare },
    { label: "Last Updated", value: company.lastUpdated, icon: Activity },
  ];

  return (
    <Card>
      <h3 className="text-sm text-foreground mb-4" style={{ fontWeight: 700 }}>
        Company Snapshot
      </h3>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
        {items.map(({ label, value, icon: Icon }) => (
          <div key={label}>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-0.5">
              <Icon className="w-3 h-3" />
              <span>{label}</span>
            </div>
            <p className="text-sm text-foreground" style={{ fontWeight: 600 }}>
              {value}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t border-border/30">
        <a
          href={`https://${company.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm text-primary hover:underline"
        >
          <Globe className="w-3.5 h-3.5" />
          {company.website}
        </a>
      </div>
    </Card>
  );
}

function CompanyStory({ company }: { company: CompanyData }) {
  return (
    <Card>
      <h3 className="text-sm text-foreground mb-4" style={{ fontWeight: 700 }}>
        Company Story
      </h3>
      <div className="space-y-4">
        {[
          { heading: "How we started", text: company.story.start },
          { heading: "What we are building", text: company.story.building },
          { heading: "Where we are going", text: company.story.future },
        ].map(({ heading, text }) => (
          <div key={heading}>
            <p className="text-xs text-primary mb-1" style={{ fontWeight: 600 }}>
              {heading}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function WhyWorkHere({ company }: { company: CompanyData }) {
  return (
    <Card>
      <h3 className="text-sm text-foreground mb-2" style={{ fontWeight: 700 }}>
        Why Work Here
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Grow with real challenges, work with experienced teams, and build products used by millions of people.
      </p>
      <div className="grid grid-cols-1 gap-2">
        {company.whyWorkHere.map((item) => (
          <div key={item} className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span className="text-sm text-foreground">{item}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border/30">
        <p className="text-xs text-muted-foreground mb-3" style={{ fontWeight: 600 }}>
          What this company values in candidates:
        </p>
        <div className="flex flex-wrap gap-2">
          {company.companyStandards.general.map((s) => (
            <Badge key={s} variant="outline">
              {s}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}

function WorkplaceSignals({ company }: { company: CompanyData }) {
  return (
    <Card>
      <h3 className="text-sm text-foreground mb-4" style={{ fontWeight: 700 }}>
        Workplace Signals
      </h3>
      <p className="text-xs text-muted-foreground mb-3">
        Based on company input, confirmed employees, and platform behavior data.
      </p>
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(company.workplaceSignals).map(([key, value]) => (
          <div key={key} className="bg-muted/30 rounded-xl p-3">
            <p className="text-xs text-muted-foreground mb-0.5">{key}</p>
            <p className="text-sm text-foreground" style={{ fontWeight: 600 }}>
              {value}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function RoleFamilies({ onTabChange }: { onTabChange: (tab: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>
          Explore by Role Family
        </h3>
        <button
          onClick={() => onTabChange("jobs")}
          className="text-xs text-primary flex items-center gap-0.5 hover:underline"
        >
          All jobs <ChevronRight className="w-3 h-3" />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {ROLE_FAMILIES.map(({ name, icon: Icon, openJobs, color }) => (
          <button
            key={name}
            onClick={() => setSelected(selected === name ? null : name)}
            className={`p-3 rounded-xl text-left transition-all border ${
              selected === name
                ? "border-primary/30 bg-primary/5"
                : "border-transparent bg-muted/30 hover:bg-muted/50"
            }`}
          >
            <div className={`w-7 h-7 rounded-lg ${color} flex items-center justify-center mb-2`}>
              <Icon className="w-3.5 h-3.5" />
            </div>
            <p className="text-sm text-foreground" style={{ fontWeight: 600 }}>
              {name}
            </p>
            <p className="text-xs text-muted-foreground">{openJobs} open</p>
          </button>
        ))}
      </div>
      {selected && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-3 pt-3 border-t border-border/30"
        >
          <p className="text-sm text-foreground mb-2" style={{ fontWeight: 600 }}>
            {selected} at Snapp
          </p>
          <div className="flex flex-wrap gap-2">
            {["Open roles", "Learning paths", "Assessments", "Team members"].map((item) => (
              <button
                key={item}
                className="text-xs text-primary bg-primary/5 hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors"
                style={{ fontWeight: 600 }}
              >
                {item}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </Card>
  );
}

function OpenToSection({ company }: { company: CompanyData }) {
  return (
    <Card>
      <h3 className="text-sm text-foreground mb-3" style={{ fontWeight: 700 }}>
        Open To
      </h3>
      <div className="flex flex-wrap gap-2">
        {company.openTo.map((item) => (
          <span
            key={item}
            className="text-sm bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 px-3 py-1.5 rounded-xl"
            style={{ fontWeight: 600 }}
          >
            {item}
          </span>
        ))}
      </div>
    </Card>
  );
}

function ProductsPreview({ onTabChange }: { onTabChange: (tab: string) => void }) {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>
          Products & Services
        </h3>
        <button
          onClick={() => onTabChange("products")}
          className="text-xs text-primary flex items-center gap-0.5 hover:underline"
        >
          View all <ChevronRight className="w-3 h-3" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {MOCK_PRODUCTS.map((product) => (
          <div key={product.id} className="bg-muted/30 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary/20 to-violet-500/20 flex items-center justify-center">
                <Layers className="w-3 h-3 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground">{product.category}</span>
            </div>
            <p className="text-sm text-foreground mb-1" style={{ fontWeight: 600 }}>
              {product.name}
            </p>
            <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function AICompanyGuide() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);

  const suggestions = [
    "What jobs match me here?",
    "How can I prepare for this company?",
    "What assessments do I need?",
    "Is this company actively hiring?",
  ];

  const handleAsk = (q: string) => {
    setQuery(q);
    setAnswer(
      "Based on your profile, I recommend completing the Product Thinking Assessment before applying. You match 3 open roles at Snapp — Senior Product Designer, Product Manager, and UX Researcher. Snapp is actively hiring and usually responds within 5 days."
    );
  };

  return (
    <Card className="border border-violet-200/50 dark:border-violet-800/30">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
          <Brain className="w-3.5 h-3.5 text-white" />
        </div>
        <div>
          <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>
            Ask about this company
          </h3>
          <p className="text-xs text-muted-foreground">Powered by Hamrahe AI</p>
        </div>
      </div>
      {!answer ? (
        <>
          <div className="flex flex-wrap gap-2 mb-3">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => handleAsk(s)}
                className="text-xs bg-muted/40 hover:bg-muted/70 text-foreground px-3 py-1.5 rounded-xl transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything about Snapp..."
              className="flex-1 text-sm bg-muted/30 border border-border/40 rounded-xl px-3 py-2 outline-none focus:border-primary/50 transition-colors"
            />
            <Button variant="gradient" size="sm" onClick={() => query && handleAsk(query)}>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="bg-muted/30 rounded-xl p-3 mb-3">
            <p className="text-xs text-primary mb-1" style={{ fontWeight: 600 }}>
              {query}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">{answer}</p>
          </div>
          <button
            onClick={() => { setAnswer(null); setQuery(""); }}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Ask another question
          </button>
        </motion.div>
      )}
    </Card>
  );
}

function SimilarCompanies() {
  const navigate = useNavigate();

  return (
    <Card>
      <h3 className="text-sm text-foreground mb-4" style={{ fontWeight: 700 }}>
        Similar Companies
      </h3>
      <div className="space-y-3">
        {MOCK_SIMILAR_COMPANIES.map((c) => {
          const companySlug = c.name.toLowerCase().replace(/\s+/g, "-");
          return (
            <div key={c.name} className="flex items-center gap-3">
              <button
                onClick={() => navigate(`/company/${companySlug}`)}
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center shrink-0 cursor-pointer hover:bg-muted transition-colors"
              >
                <Building2 className="w-4 h-4 text-muted-foreground" />
              </button>
              <button
                onClick={() => navigate(`/company/${companySlug}`)}
                className="flex-1 min-w-0 text-left cursor-pointer"
              >
                <div className="flex items-center gap-1.5">
                  <p className="text-sm text-foreground hover:text-primary transition-colors" style={{ fontWeight: 600 }}>
                    {c.name}
                  </p>
                  {c.verified && <CheckCircle2 className="w-3.5 h-3.5 text-primary" />}
                </div>
                <p className="text-xs text-muted-foreground">
                  {c.industry} · {c.openJobs} open roles
                </p>
              </button>
              <Button variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>
                Follow
              </Button>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export function OverviewTab({ company, viewMode, onTabChange }: OverviewTabProps) {
  return (
    <div className="space-y-4">
      {viewMode !== "public" && <DecisionSummary company={company} />}
      {viewMode !== "public" && <JourneyMap />}

      <div className="grid lg:grid-cols-[1fr_300px] gap-4">
        <div className="space-y-4">
          <CompanyStory company={company} />
          <WhyWorkHere company={company} />
          <WorkplaceSignals company={company} />
          <RoleFamilies onTabChange={onTabChange} />
          <ProductsPreview onTabChange={onTabChange} />
          {viewMode !== "public" && <AICompanyGuide />}
        </div>
        <aside className="space-y-4">
          <CompanySnapshot company={company} />
          <OpenToSection company={company} />
          <Card>
            <h3 className="text-sm text-foreground mb-3" style={{ fontWeight: 700 }}>
              Specialties
            </h3>
            <div className="flex flex-wrap gap-2">
              {company.specialties.map((s) => (
                <Badge key={s} variant="secondary">
                  {s}
                </Badge>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="text-sm text-foreground mb-3" style={{ fontWeight: 700 }}>
              Company Network
            </h3>
            <div className="space-y-2.5">
              {[
                { label: "Confirmed Employees", value: company.companyGraph.employees, icon: Users },
                { label: "Followers", value: company.companyGraph.followers.toLocaleString(), icon: TrendingUp },
                { label: "Open Roles", value: company.companyGraph.openJobs, icon: Briefcase },
                { label: "Learning Paths", value: company.companyGraph.learningPaths, icon: BookOpen },
                { label: "Upcoming Events", value: company.companyGraph.upcomingEvents, icon: Calendar },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  <span className="text-sm text-muted-foreground flex-1">{label}</span>
                  <span className="text-sm text-foreground" style={{ fontWeight: 600 }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </Card>
          <SimilarCompanies />
        </aside>
      </div>
    </div>
  );
}
