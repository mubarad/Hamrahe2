import { useState } from "react";
import { Card } from "../../ui/Card";
import { Button } from "../../ui/Button";
import {
  ChevronDown, ChevronUp, Send, X, Check, ShieldCheck, Clock,
  Users, Globe, Briefcase, Star, MapPin, Zap, MessageSquare,
  CheckCircle2, Award, FileText, Lock,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ViewMode } from "../CompanyPage";

// ─── Static mock data ──────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: 1,
    name: "Corporate Ride-Hailing",
    category: "Transportation",
    categoryColor: "bg-blue-50 text-blue-700",
    description: "Dedicated fleet management and centralized billing for corporate clients. Includes expense dashboards, employee travel policies, and priority booking for business accounts.",
    targetIndustry: "Enterprise, Government, Healthcare",
    deliveryModel: "On-demand + Scheduled",
    pricingModel: "Monthly subscription + per-ride",
    availability: "24/7 across 32 cities",
    portfolioCount: 12,
    reviewCount: 48,
    avgRating: 4.8,
    responseTime: "4 hours",
    verified: true,
    team: ["Kaveh Shirazi", "Sara Najafi"],
    workSamples: ["Fleet dashboard", "Expense reports", "Travel policy templates"],
    features: [
      "Centralized billing & invoicing",
      "Employee usage dashboards",
      "Custom travel policies",
      "Priority vehicle allocation",
      "Real-time tracking for all trips",
      "Dedicated account manager",
    ],
  },
  {
    id: 2,
    name: "Last-Mile Logistics API",
    category: "Logistics",
    categoryColor: "bg-amber-50 text-amber-700",
    description: "Enterprise-grade delivery infrastructure API enabling same-day and instant courier services. Used by e-commerce platforms, pharmacies, and food retailers across Iran.",
    targetIndustry: "E-commerce, Retail, Healthcare",
    deliveryModel: "API integration + SLA",
    pricingModel: "Volume-based, custom enterprise",
    availability: "API: 99.9% uptime SLA",
    portfolioCount: 8,
    reviewCount: 31,
    avgRating: 4.9,
    responseTime: "2 hours",
    verified: true,
    team: ["Ali Moradi", "Reza Tavakoli"],
    workSamples: ["API documentation", "Webhook specs", "Dashboard demo"],
    features: [
      "REST & WebSocket APIs",
      "Real-time delivery tracking",
      "Automated dispatch engine",
      "Webhook notifications",
      "SLA-backed delivery windows",
      "White-label option available",
    ],
  },
  {
    id: 3,
    name: "SnappPay B2B Payments",
    category: "Fintech",
    categoryColor: "bg-emerald-50 text-emerald-700",
    description: "Embedded payment infrastructure for businesses. Includes split payments, escrow, payout management, and reconciliation for marketplaces and platforms operating in Iran.",
    targetIndustry: "Fintech, Marketplace, Retail",
    deliveryModel: "SDK + API",
    pricingModel: "Transaction fee + monthly plan",
    availability: "Regulated by Central Bank of Iran",
    portfolioCount: 6,
    reviewCount: 22,
    avgRating: 4.7,
    responseTime: "6 hours",
    verified: true,
    team: ["Neda Jafari", "Hassan Ebrahimi"],
    workSamples: ["Payment flow docs", "SDK samples", "Reconciliation templates"],
    features: [
      "PCI DSS compliant infrastructure",
      "Split payment & escrow",
      "Payout management",
      "Fraud detection engine",
      "Shaparak & Shetab integration",
      "Real-time reconciliation",
    ],
  },
  {
    id: 4,
    name: "Food Delivery White-Label",
    category: "Food & Beverage",
    categoryColor: "bg-red-50 text-red-700",
    description: "Turnkey food delivery platform for restaurant chains and cloud kitchens. Includes order management, driver dispatch, customer app, and analytics — all under your brand.",
    targetIndustry: "Restaurant chains, Cloud kitchens",
    deliveryModel: "SaaS + managed ops",
    pricingModel: "Revenue share + setup fee",
    availability: "Available in 12 cities",
    portfolioCount: 4,
    reviewCount: 14,
    avgRating: 4.6,
    responseTime: "8 hours",
    verified: false,
    team: ["Leila Karimi"],
    workSamples: ["App demo", "Ops playbook"],
    features: [
      "Custom-branded customer app",
      "Order management system",
      "Driver dispatch & tracking",
      "Menu & pricing management",
      "Analytics dashboard",
      "Loyalty program integration",
    ],
  },
];

const SERVICE_TRUST = [
  { label: "Verified Service Provider", ok: true },
  { label: "200+ enterprise contracts delivered", ok: true },
  { label: "Average response time: 5 hours", ok: true },
  { label: "94% client satisfaction rate", ok: true },
  { label: "Central Bank registered (payments)", ok: true },
  { label: "ISO 27001 in progress", ok: false },
];

// ─── Service Request Modal ─────────────────────────────────────────────────────

function ServiceRequestModal({
  open,
  onClose,
  serviceName,
}: {
  open: boolean;
  onClose: () => void;
  serviceName: string;
}) {
  const [sent, setSent] = useState(false);
  const [confidential, setConfidential] = useState(false);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg z-10 overflow-hidden max-h-[90vh] flex flex-col"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/20 shrink-0">
          <div>
            <h3 className="text-base text-foreground" style={{ fontWeight: 700 }}>Request Service</h3>
            <p className="text-xs text-muted-foreground">{serviceName}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {sent ? (
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                <Check className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-lg text-foreground mb-2" style={{ fontWeight: 700 }}>Request Submitted!</h3>
              <p className="text-sm text-muted-foreground mb-6">Snapp's team will review your request and respond within their stated response time.</p>
              <Button onClick={onClose} className="w-full">Done</Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground" style={{ fontWeight: 600 }}>Request type</label>
                <select className="w-full border border-border/40 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white">
                  <option>Request Pricing</option>
                  <option>Book a Demo</option>
                  <option>General Inquiry</option>
                  <option>Custom Requirements</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground" style={{ fontWeight: 600 }}>Describe your need</label>
                <textarea className="w-full border border-border/40 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none h-20" placeholder="What do you need and how will you use this service?" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground" style={{ fontWeight: 600 }}>Industry</label>
                  <input className="w-full border border-border/40 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="e.g. E-commerce" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground" style={{ fontWeight: 600 }}>Budget range</label>
                  <select className="w-full border border-border/40 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white">
                    <option>Under 50M Toman/mo</option>
                    <option>50–200M Toman/mo</option>
                    <option>200M–1B Toman/mo</option>
                    <option>Enterprise (custom)</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground" style={{ fontWeight: 600 }}>Company name</label>
                  <input className="w-full border border-border/40 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Your company" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground" style={{ fontWeight: 600 }}>Timeline</label>
                  <select className="w-full border border-border/40 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white">
                    <option>ASAP</option>
                    <option>Within 1 month</option>
                    <option>Within 3 months</option>
                    <option>Planning phase</option>
                  </select>
                </div>
              </div>
              <button
                onClick={() => setConfidential(!confidential)}
                className="w-full flex items-center gap-3 p-3 rounded-xl border border-border/20 hover:bg-muted/30 transition-colors text-left cursor-pointer"
              >
                <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${confidential ? "bg-primary" : "border-2 border-border/40"}`}>
                  {confidential && <Check className="w-3 h-3 text-white" />}
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-sm text-foreground">Keep this request confidential</span>
                </div>
              </button>
              <p className="text-xs text-muted-foreground">By submitting, you agree to Hamrahe's data sharing policy. Your information will only be shared with Snapp's business team.</p>
              <div className="flex gap-3">
                <Button className="flex-1" onClick={() => setSent(true)}>
                  <Send className="w-4 h-4" />Submit Request
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

// ─── Service Card ──────────────────────────────────────────────────────────────

function ServiceCard({ service }: { service: typeof SERVICES[0] }) {
  const [expanded, setExpanded] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);

  return (
    <>
      <Card className="overflow-hidden p-0">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-left px-5 py-4 hover:bg-muted/20 transition-colors cursor-pointer"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-violet-500/10 flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>{service.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-lg ${service.categoryColor}`} style={{ fontWeight: 600 }}>{service.category}</span>
                    {service.verified && (
                      <div className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-xs text-emerald-600" style={{ fontWeight: 600 }}>Verified</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{service.description}</p>
                </div>
                {expanded ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0 mt-1" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />}
              </div>
              <div className="flex items-center gap-4 mt-2.5 flex-wrap">
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="text-xs text-foreground" style={{ fontWeight: 600 }}>{service.avgRating}</span>
                  <span className="text-xs text-muted-foreground">({service.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-xs">{service.responseTime} response</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <FileText className="w-3.5 h-3.5" />
                  <span className="text-xs">{service.portfolioCount} portfolio items</span>
                </div>
              </div>
            </div>
          </div>
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 border-t border-border/20 pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {/* Details */}
                  <div className="space-y-2.5">
                    <p className="text-xs text-muted-foreground" style={{ fontWeight: 600 }}>Service Details</p>
                    {[
                      { label: "Target Industries", value: service.targetIndustry, icon: Globe },
                      { label: "Delivery Model", value: service.deliveryModel, icon: Zap },
                      { label: "Pricing", value: service.pricingModel, icon: Star },
                      { label: "Availability", value: service.availability, icon: MapPin },
                    ].map(({ label, value, icon: Icon }) => (
                      <div key={label} className="flex items-start gap-2">
                        <Icon className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground">{label}</p>
                          <p className="text-xs text-foreground" style={{ fontWeight: 500 }}>{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-2.5" style={{ fontWeight: 600 }}>What's Included</p>
                    <div className="space-y-1.5">
                      {service.features.map((f) => (
                        <div key={f} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                          <span className="text-xs text-foreground">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Team */}
                <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-2" style={{ fontWeight: 600 }}>Service Team</p>
                  <div className="flex gap-2">
                    {service.team.map((name) => (
                      <div key={name} className="flex items-center gap-2 bg-muted/40 rounded-xl px-3 py-1.5">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/20 to-violet-500/20 flex items-center justify-center">
                          <span className="text-xs text-primary" style={{ fontWeight: 700 }}>{name.split(" ").map((n) => n[0]).join("")}</span>
                        </div>
                        <span className="text-xs text-foreground" style={{ fontWeight: 500 }}>{name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Work samples teaser */}
                <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-2" style={{ fontWeight: 600 }}>Work Samples ({service.portfolioCount} available)</p>
                  <div className="flex gap-2 flex-wrap">
                    {service.workSamples.map((s) => (
                      <span key={s} className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-lg border border-primary/20 cursor-pointer hover:bg-primary/20 transition-colors" style={{ fontWeight: 500 }}>{s}</span>
                    ))}
                    <span className="text-xs bg-muted/60 text-muted-foreground px-2.5 py-1 rounded-lg cursor-pointer hover:bg-muted transition-colors" style={{ fontWeight: 500 }}>+ {service.portfolioCount - service.workSamples.length} more →</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex gap-2 flex-wrap">
                  <Button variant="gradient" size="sm" onClick={() => setRequestOpen(true)}>
                    <Send className="w-3.5 h-3.5" />Request Service
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setRequestOpen(true)}>
                    <MessageSquare className="w-3.5 h-3.5" />Book Consultation
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Star className="w-3.5 h-3.5" />See Reviews ({service.reviewCount})
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      <ServiceRequestModal
        open={requestOpen}
        onClose={() => setRequestOpen(false)}
        serviceName={service.name}
      />
    </>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export function ServicesTab({ viewMode }: { viewMode: ViewMode }) {
  const [generalRequestOpen, setGeneralRequestOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Transportation", "Logistics", "Fintech", "Food & Beverage"];
  const filtered = filter === "All" ? SERVICES : SERVICES.filter((s) => s.category === filter);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4 items-start">
      {/* Main column */}
      <div className="space-y-3">
        {/* Header */}
        <Card className="bg-gradient-to-br from-primary/5 to-violet-500/5 border-primary/20">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-base text-foreground mb-1" style={{ fontWeight: 700 }}>Snapp Services</h2>
              <p className="text-sm text-muted-foreground mb-3">
                Enterprise services built on Snapp's national-scale infrastructure. From corporate mobility to embedded payments — request pricing or book a consultation directly.
              </p>
              <div className="flex items-center gap-4 text-sm flex-wrap">
                <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-muted-foreground" /><span className="text-muted-foreground">200+ enterprise clients</span></span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-muted-foreground" /><span className="text-muted-foreground">Avg. 5hr response</span></span>
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /><span className="text-emerald-600" style={{ fontWeight: 600 }}>Verified Provider</span></span>
              </div>
            </div>
          </div>
        </Card>

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-xs px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${filter === cat ? "bg-primary text-white" : "bg-muted/50 text-muted-foreground hover:bg-muted"}`}
              style={{ fontWeight: filter === cat ? 600 : 400 }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Service cards */}
        {filtered.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      {/* Sidebar */}
      <div className="space-y-4 lg:sticky lg:top-[80px]">
        {/* Quick request */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-violet-500/5">
          <h3 className="text-sm text-foreground mb-1" style={{ fontWeight: 700 }}>Need a Custom Solution?</h3>
          <p className="text-xs text-muted-foreground mb-3">Tell us your requirements and we'll find the right fit or build a custom package.</p>
          <Button variant="gradient" className="w-full" onClick={() => setGeneralRequestOpen(true)}>
            <Send className="w-4 h-4" />Request a Service
          </Button>
        </Card>

        {/* Stats */}
        <Card>
          <h3 className="text-sm text-foreground mb-3" style={{ fontWeight: 700 }}>Service Overview</h3>
          <div className="space-y-2.5">
            {[
              { label: "Active Services", value: `${SERVICES.length}`, icon: Zap, color: "text-primary" },
              { label: "Enterprise Clients", value: "200+", icon: Users, color: "text-violet-600" },
              { label: "Total Reviews", value: `${SERVICES.reduce((a, s) => a + s.reviewCount, 0)}`, icon: Star, color: "text-amber-500" },
              { label: "Avg. Rating", value: "4.75", icon: Award, color: "text-emerald-600" },
              { label: "Response Time", value: "5 hours", icon: Clock, color: "text-blue-600" },
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

        {/* Trust */}
        <Card>
          <h3 className="text-sm text-foreground mb-3" style={{ fontWeight: 700 }}>Service Trust</h3>
          <div className="space-y-2">
            {SERVICE_TRUST.map(({ label, ok }) => (
              <div key={label} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${ok ? "bg-emerald-500" : "bg-muted/60 border-2 border-border/40"}`}>
                  {ok ? <Check className="w-2.5 h-2.5 text-white" /> : null}
                </div>
                <span className={`text-xs ${ok ? "text-foreground" : "text-muted-foreground"}`}>{label}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <ServiceRequestModal
        open={generalRequestOpen}
        onClose={() => setGeneralRequestOpen(false)}
        serviceName="Custom Service Request"
      />
    </div>
  );
}
