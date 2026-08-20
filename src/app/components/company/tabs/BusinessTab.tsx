import { useState } from "react";
import { Card } from "../../ui/Card";
import { Button } from "../../ui/Button";
import {
  ShieldCheck, CheckCircle2, Building2, Globe, Users, Briefcase,
  TrendingUp, Zap, Star, ArrowRight, ChevronDown, ChevronUp,
  Code2, Cloud, Database, Cpu, Send, Clock, Award, Target,
  Handshake, Rocket, BarChart3, FileText, MessageSquare, ExternalLink,
  X, Check,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ViewMode } from "../CompanyPage";

// ─── Static mock data ──────────────────────────────────────────────────────────

const CAPABILITIES = [
  {
    name: "Mobile App Development",
    confidence: 96,
    color: "bg-primary/10 text-primary border-primary/20",
    evidence: [
      { label: "Verified members", value: 38 },
      { label: "Completed projects", value: 24 },
      { label: "Active products", value: 4 },
      { label: "Confirmed clients", value: 12 },
    ],
    level: "Platform-verified",
    levelColor: "bg-emerald-50 text-emerald-700",
    tech: ["React Native", "Flutter", "Swift", "Kotlin"],
  },
  {
    name: "AI & Machine Learning",
    confidence: 89,
    color: "bg-violet-50 text-violet-700 border-violet-200",
    evidence: [
      { label: "Verified members", value: 21 },
      { label: "Completed projects", value: 14 },
      { label: "Active products", value: 3 },
      { label: "Assessment-backed skills", value: 18 },
    ],
    level: "Client-confirmed",
    levelColor: "bg-blue-50 text-blue-700",
    tech: ["Python", "TensorFlow", "PyTorch", "Azure AI"],
  },
  {
    name: "Fintech & Payment Systems",
    confidence: 94,
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    evidence: [
      { label: "Verified members", value: 16 },
      { label: "Completed projects", value: 9 },
      { label: "Active products", value: 2 },
      { label: "Confirmed clients", value: 8 },
    ],
    level: "Platform-verified",
    levelColor: "bg-emerald-50 text-emerald-700",
    tech: ["PCI DSS", "Shaparak API", "Kotlin", "Go"],
  },
  {
    name: "Large-Scale Logistics Tech",
    confidence: 91,
    color: "bg-amber-50 text-amber-700 border-amber-200",
    evidence: [
      { label: "Verified members", value: 29 },
      { label: "Completed projects", value: 19 },
      { label: "Active products", value: 2 },
      { label: "Confirmed clients", value: 6 },
    ],
    level: "Project-backed",
    levelColor: "bg-amber-50 text-amber-700",
    tech: ["Go", "Kafka", "PostgreSQL", "Redis"],
  },
];

const TECH_STACK = [
  {
    category: "Frontend",
    icon: Code2,
    color: "bg-blue-50",
    iconColor: "text-blue-600",
    items: ["React", "Next.js", "TypeScript", "React Native"],
  },
  {
    category: "Backend",
    icon: Cpu,
    color: "bg-violet-50",
    iconColor: "text-violet-600",
    items: ["Go", "Node.js", "Python", "gRPC"],
  },
  {
    category: "Cloud & DevOps",
    icon: Cloud,
    color: "bg-sky-50",
    iconColor: "text-sky-600",
    items: ["AWS", "Kubernetes", "Terraform", "ArgoCD"],
  },
  {
    category: "Data & AI",
    icon: Database,
    color: "bg-emerald-50",
    iconColor: "text-emerald-600",
    items: ["Spark", "Flink", "TensorFlow", "Databricks"],
  },
];

const BUSINESS_OPEN_TO = [
  {
    type: "Technology Partnership",
    icon: Handshake,
    color: "bg-primary/5 border-primary/20",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    target: "SaaS & infrastructure companies",
    timeline: "Q3 2026",
    contact: "Partnerships Team",
    status: "Active",
  },
  {
    type: "Pilot Program",
    icon: Rocket,
    color: "bg-violet-50 border-violet-200",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    target: "Startups with logistics or fintech focus",
    timeline: "Ongoing",
    contact: "Business Development",
    status: "Active",
  },
  {
    type: "API Integration",
    icon: Zap,
    color: "bg-amber-50 border-amber-200",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    target: "E-commerce & delivery platforms",
    timeline: "Open",
    contact: "API Team",
    status: "Active",
  },
  {
    type: "B2B Sales Partnership",
    icon: TrendingUp,
    color: "bg-emerald-50 border-emerald-200",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    target: "Enterprise & corporate clients",
    timeline: "Q4 2026",
    contact: "Sales Team",
    status: "Active",
  },
];

const CLIENTS_PARTNERS = [
  { name: "Digikala", type: "Client", initials: "DK", color: "bg-red-100 text-red-700", confirmed: true },
  { name: "Cafe Bazaar", type: "Technology Partner", initials: "CB", color: "bg-emerald-100 text-emerald-700", confirmed: true },
  { name: "ZarinPal", type: "Payment Partner", initials: "ZP", color: "bg-violet-100 text-violet-700", confirmed: true },
  { name: "Alibaba.ir", type: "Client", initials: "AL", color: "bg-blue-100 text-blue-700", confirmed: true },
  { name: "Tap30", type: "Integration Partner", initials: "T3", color: "bg-amber-100 text-amber-700", confirmed: false },
  { name: "Asan Pardakht", type: "Payment Partner", initials: "AP", color: "bg-sky-100 text-sky-700", confirmed: true },
];

const CASE_STUDIES = [
  {
    client: "Digikala",
    clientInitials: "DK",
    clientColor: "bg-red-100 text-red-700",
    challenge: "Scaling last-mile delivery for 12M annual orders with real-time tracking",
    outcome: "40% reduction in delivery time · 98.2% on-time rate",
    metrics: [
      { label: "Delivery Time", value: "−40%" },
      { label: "On-time Rate", value: "98.2%" },
      { label: "Orders/day", value: "35K" },
    ],
    verified: true,
    year: "2025",
  },
  {
    client: "Cafe Bazaar",
    clientInitials: "CB",
    clientColor: "bg-emerald-100 text-emerald-700",
    challenge: "Building a unified payment SDK across Android, iOS, and web for 45M users",
    outcome: "3× conversion lift · Integrated in 120+ partner apps within 6 months",
    metrics: [
      { label: "Conversion Lift", value: "3×" },
      { label: "Partner Apps", value: "120+" },
      { label: "Integration Time", value: "2 weeks" },
    ],
    verified: true,
    year: "2024",
  },
];

const BUSINESS_CONTACTS = [
  { name: "Dariush Mehrabi", role: "CEO", dept: "Executive", initials: "DM", verified: true },
  { name: "Kaveh Shirazi", role: "VP Business Development", dept: "Business", initials: "KS", verified: true },
  { name: "Sara Najafi", role: "Head of Partnerships", dept: "Partnerships", initials: "SN", verified: true },
];

const BUSINESS_TRUST = [
  { label: "Verified Legal Entity", ok: true },
  { label: "Domain Verified (snapp.ir)", ok: true },
  { label: "Executives Confirmed", ok: true },
  { label: "12 Client Relationships Confirmed", ok: true },
  { label: "Response Rate: 94%", ok: true },
  { label: "Average Response Time: 6 hours", ok: true },
  { label: "No Active Disputes", ok: true },
  { label: "Verified Bank Account", ok: false },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function BusinessSnapshot() {
  return (
    <Card className="mb-4">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center shrink-0">
          <Building2 className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-base text-foreground mb-1" style={{ fontWeight: 700 }}>Business Profile</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Snapp operates as Iran's largest super-app platform, powering ride-hailing, food delivery, logistics, and digital payments at national scale. We partner with technology companies, e-commerce platforms, financial institutions, and government bodies to integrate our infrastructure and expand reach.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Business Model", value: "B2B + B2C Platform" },
              { label: "Industries Served", value: "Transport, Fintech, F&B" },
              { label: "Active Markets", value: "Iran (32 cities)" },
              { label: "Enterprise Clients", value: "200+ companies" },
            ].map(({ label, value }) => (
              <div key={label} className="bg-muted/40 rounded-xl p-3">
                <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
                <p className="text-sm text-foreground" style={{ fontWeight: 600 }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

function CapabilitiesSection() {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (
    <Card className="mb-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>Organizational Capabilities</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Built from people, projects, products, and verified client outcomes</p>
        </div>
        <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-1 rounded-lg" style={{ fontWeight: 600 }}>
          Platform-verified
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {CAPABILITIES.map((cap, i) => (
          <div
            key={i}
            className={`rounded-xl border p-4 cursor-pointer transition-all ${cap.color} ${expanded === i ? "ring-2 ring-primary/20" : "hover:shadow-sm"}`}
            onClick={() => setExpanded(expanded === i ? null : i)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <p className="text-sm" style={{ fontWeight: 700 }}>{cap.name}</p>
                <span className={`text-xs px-2 py-0.5 rounded-lg mt-1 inline-block ${cap.levelColor}`} style={{ fontWeight: 600 }}>{cap.level}</span>
              </div>
              <div className="text-right shrink-0 ml-3">
                <p className="text-2xl" style={{ fontWeight: 800 }}>{cap.confidence}%</p>
                <p className="text-xs opacity-70">confidence</p>
              </div>
            </div>
            <div className="h-1.5 bg-white/60 rounded-full overflow-hidden mb-3">
              <motion.div
                className="h-full bg-current rounded-full opacity-50"
                initial={{ width: 0 }}
                animate={{ width: `${cap.confidence}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
            <AnimatePresence>
              {expanded === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-2 border-t border-current/20 space-y-2">
                    <p className="text-xs font-semibold opacity-70 mb-1.5">Evidence</p>
                    {cap.evidence.map((e) => (
                      <div key={e.label} className="flex justify-between text-xs">
                        <span className="opacity-70">{e.label}</span>
                        <span style={{ fontWeight: 700 }}>{e.value}</span>
                      </div>
                    ))}
                    <p className="text-xs font-semibold opacity-70 mt-2 mb-1">Technologies</p>
                    <div className="flex flex-wrap gap-1">
                      {cap.tech.map((t) => (
                        <span key={t} className="text-xs bg-white/50 px-2 py-0.5 rounded-md" style={{ fontWeight: 500 }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="flex items-center justify-between mt-1">
              <div className="flex gap-1">
                {cap.evidence.map((e) => (
                  <div key={e.label} className="w-1.5 h-1.5 rounded-full bg-current opacity-40" title={e.label} />
                ))}
              </div>
              {expanded === i ? <ChevronUp className="w-3.5 h-3.5 opacity-50" /> : <ChevronDown className="w-3.5 h-3.5 opacity-50" />}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function TechStackSection() {
  return (
    <Card className="mb-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>Technology Stack</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Organization-level technologies — verified through member profiles and active products</p>
        </div>
        <span className="text-xs bg-primary/10 text-primary border border-primary/20 px-2 py-1 rounded-lg" style={{ fontWeight: 600 }}>
          Member-verified
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {TECH_STACK.map(({ category, icon: Icon, color, iconColor, items }) => (
          <div key={category} className={`rounded-xl p-3.5 ${color}`}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-white/70 flex items-center justify-center">
                <Icon className={`w-3.5 h-3.5 ${iconColor}`} />
              </div>
              <p className="text-xs" style={{ fontWeight: 700 }}>{category}</p>
            </div>
            <div className="space-y-1.5">
              {items.map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40" />
                  <span className="text-xs" style={{ fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function BusinessOpenToSection() {
  return (
    <Card className="mb-4">
      <div className="mb-4">
        <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>Business Open To</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Active collaboration opportunities from Snapp</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {BUSINESS_OPEN_TO.map(({ type, icon: Icon, color, iconBg, iconColor, target, timeline, contact, status }) => (
          <div key={type} className={`rounded-xl border p-4 ${color}`}>
            <div className="flex items-start gap-3 mb-3">
              <div className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center shrink-0`}>
                <Icon className={`w-4 h-4 ${iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm text-foreground" style={{ fontWeight: 700 }}>{type}</p>
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-lg" style={{ fontWeight: 600 }}>{status}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{target}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-xs text-muted-foreground"><span style={{ fontWeight: 600 }}>Timeline:</span> {timeline}</p>
                <p className="text-xs text-muted-foreground"><span style={{ fontWeight: 600 }}>Contact:</span> {contact}</p>
              </div>
              <Button size="sm" variant="outline">
                <Send className="w-3.5 h-3.5" />Inquire
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ClientsPartnersSection() {
  return (
    <Card className="mb-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>Clients & Partners</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Confirmed business relationships</p>
        </div>
        <span className="text-xs text-muted-foreground">6 relationships</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {CLIENTS_PARTNERS.map(({ name, type, initials, color, confirmed }) => (
          <div key={name} className="flex items-center gap-3 p-3 rounded-xl border border-border/20 hover:bg-muted/20 transition-colors">
            <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center shrink-0 text-sm`} style={{ fontWeight: 700 }}>
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground truncate" style={{ fontWeight: 600 }}>{name}</p>
              <p className="text-xs text-muted-foreground">{type}</p>
              {confirmed && (
                <div className="flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  <span className="text-xs text-emerald-600" style={{ fontWeight: 500 }}>Confirmed</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function CaseStudiesSection() {
  return (
    <Card className="mb-4">
      <div className="mb-4">
        <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>Case Studies</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Verified outcomes from real client projects</p>
      </div>
      <div className="space-y-4">
        {CASE_STUDIES.map((cs, i) => (
          <div key={i} className="rounded-xl border border-border/20 overflow-hidden">
            <div className="px-5 py-4 bg-muted/20 flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg ${cs.clientColor} flex items-center justify-center text-sm shrink-0`} style={{ fontWeight: 700 }}>
                {cs.clientInitials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm text-foreground" style={{ fontWeight: 700 }}>{cs.client}</p>
                  {cs.verified && (
                    <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded-lg">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span className="text-xs text-emerald-700" style={{ fontWeight: 600 }}>Verified</span>
                    </div>
                  )}
                  <span className="text-xs text-muted-foreground ml-auto">{cs.year}</span>
                </div>
              </div>
            </div>
            <div className="px-5 py-4">
              <p className="text-xs text-muted-foreground mb-1" style={{ fontWeight: 600 }}>Challenge</p>
              <p className="text-sm text-foreground mb-3">{cs.challenge}</p>
              <p className="text-xs text-muted-foreground mb-1" style={{ fontWeight: 600 }}>Outcome</p>
              <p className="text-sm text-emerald-700 mb-4" style={{ fontWeight: 500 }}>{cs.outcome}</p>
              <div className="grid grid-cols-3 gap-2">
                {cs.metrics.map(({ label, value }) => (
                  <div key={label} className="bg-muted/30 rounded-xl p-2.5 text-center">
                    <p className="text-base text-primary" style={{ fontWeight: 800 }}>{value}</p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function BusinessContactsSection({ onContact }: { onContact: () => void }) {
  return (
    <Card className="mb-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>Business Contacts</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Verified decision-makers open to business inquiries</p>
        </div>
      </div>
      <div className="space-y-2">
        {BUSINESS_CONTACTS.map(({ name, role, dept, initials, verified }) => (
          <div key={name} className="flex items-center gap-3 p-3 rounded-xl border border-border/20 hover:bg-muted/20 transition-colors">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-violet-500/20 flex items-center justify-center shrink-0">
              <span className="text-xs text-primary" style={{ fontWeight: 700 }}>{initials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-sm text-foreground" style={{ fontWeight: 600 }}>{name}</p>
                {verified && <ShieldCheck className="w-3.5 h-3.5 text-primary" />}
              </div>
              <p className="text-xs text-muted-foreground">{role} · {dept}</p>
            </div>
            <Button size="sm" variant="outline" onClick={onContact}>
              <MessageSquare className="w-3.5 h-3.5" />Contact
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}

function BusinessTrustSection() {
  const passedCount = BUSINESS_TRUST.filter((t) => t.ok).length;
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>Business Trust</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Verified signals for B2B confidence</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-xl">
          <Award className="w-4 h-4 text-emerald-600" />
          <span className="text-xs text-emerald-700" style={{ fontWeight: 700 }}>{passedCount}/{BUSINESS_TRUST.length} verified</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {BUSINESS_TRUST.map(({ label, ok }) => (
          <div key={label} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-muted/30">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${ok ? "bg-emerald-500" : "bg-muted/60 border-2 border-border/40"}`}>
              {ok ? <Check className="w-3 h-3 text-white" /> : <X className="w-3 h-3 text-muted-foreground/50" />}
            </div>
            <span className={`text-xs ${ok ? "text-foreground" : "text-muted-foreground"}`} style={{ fontWeight: ok ? 500 : 400 }}>{label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ─── Contact modal ─────────────────────────────────────────────────────────────

function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sent, setSent] = useState(false);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg z-10 overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/20">
          <h3 className="text-base text-foreground" style={{ fontWeight: 700 }}>Business Inquiry</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
        <div className="p-6">
          {sent ? (
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                <Check className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-lg text-foreground mb-2" style={{ fontWeight: 700 }}>Inquiry Sent!</h3>
              <p className="text-sm text-muted-foreground mb-6">Snapp's business team will respond within their stated response time of 6 hours.</p>
              <Button onClick={onClose} className="w-full">Done</Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground" style={{ fontWeight: 600 }}>Your name</label>
                  <input className="w-full border border-border/40 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Full name" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground" style={{ fontWeight: 600 }}>Company</label>
                  <input className="w-full border border-border/40 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Your company" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground" style={{ fontWeight: 600 }}>Inquiry type</label>
                <select className="w-full border border-border/40 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white">
                  <option>Technology Partnership</option>
                  <option>API Integration</option>
                  <option>Pilot Program</option>
                  <option>B2B Sales</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground" style={{ fontWeight: 600 }}>Message</label>
                <textarea className="w-full border border-border/40 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none h-24" placeholder="Describe your business need or opportunity..." />
              </div>
              <div className="flex gap-3">
                <Button className="flex-1" onClick={() => setSent(true)}>
                  <Send className="w-4 h-4" />Send Inquiry
                </Button>
                <Button variant="outline" onClick={onClose}>Cancel</Button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export function BusinessTab({ viewMode }: { viewMode: ViewMode }) {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="space-y-0">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4 items-start">
        {/* Main column */}
        <div>
          <BusinessSnapshot />
          <CapabilitiesSection />
          <TechStackSection />
          <BusinessOpenToSection />
          <CaseStudiesSection />
          <BusinessContactsSection onContact={() => setContactOpen(true)} />
          <BusinessTrustSection />
        </div>

        {/* Sidebar */}
        <div className="space-y-4 lg:sticky lg:top-[80px]">
          {/* Quick actions */}
          <Card>
            <h3 className="text-sm text-foreground mb-3" style={{ fontWeight: 700 }}>Business Actions</h3>
            <div className="space-y-2">
              {[
                { label: "Send Business Inquiry", icon: Send, action: () => setContactOpen(true), primary: true },
                { label: "View All Case Studies", icon: FileText, action: () => {}, primary: false },
                { label: "API Documentation", icon: ExternalLink, action: () => {}, primary: false },
              ].map(({ label, icon: Icon, action, primary }) => (
                <Button key={label} variant={primary ? "gradient" : "outline"} className="w-full justify-start gap-2" onClick={action}>
                  <Icon className="w-4 h-4" />{label}
                </Button>
              ))}
            </div>
          </Card>

          {/* Quick stats */}
          <Card>
            <h3 className="text-sm text-foreground mb-3" style={{ fontWeight: 700 }}>At a Glance</h3>
            <div className="space-y-3">
              {[
                { label: "Active Capabilities", value: "4", icon: Zap, color: "text-primary" },
                { label: "Confirmed Clients", value: "12", icon: Building2, color: "text-emerald-600" },
                { label: "Verified Partners", value: "6", icon: Handshake, color: "text-violet-600" },
                { label: "Response Time", value: "6 hrs", icon: Clock, color: "text-amber-600" },
                { label: "B2B Trust Score", value: "94%", icon: ShieldCheck, color: "text-emerald-600" },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center">
                    <Icon className={`w-4 h-4 ${color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </div>
                  <p className="text-sm text-foreground" style={{ fontWeight: 700 }}>{value}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Clients logos strip */}
          <Card>
            <h3 className="text-sm text-foreground mb-3" style={{ fontWeight: 700 }}>Key Clients</h3>
            <div className="flex flex-wrap gap-2">
              {CLIENTS_PARTNERS.filter((c) => c.type === "Client").map(({ name, initials, color }) => (
                <div key={name} className={`w-9 h-9 rounded-xl ${color} flex items-center justify-center text-xs`} style={{ fontWeight: 700 }} title={name}>
                  {initials}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2.5">And 200+ enterprise clients across Iran</p>
          </Card>
        </div>
      </div>

      <ClientsPartnersSection />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
