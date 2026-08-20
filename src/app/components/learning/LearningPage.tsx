import { motion } from "motion/react";
import { useNavigate } from "react-router";
import {
  Brain, Zap, Target, Award, ArrowRight, Wallet, Building2,
  Shield, ChevronRight, TrendingUp, Bell, Gauge, Compass, BarChart3,
} from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import {
  CAREER_PATHS, ASSESSMENTS, AI_PRACTICES, CERTIFICATES, READINESS_SCORES,
  WALLET, PARTNER_OPPORTUNITIES, LEARNING_NOTIFICATIONS, SKILL_GAPS,
} from "../../data/learning-data";
import {
  CareerPathCard, AssessmentEntryCard, AIPracticeCard, CertificateCard,
  ReadinessRing, AINativeBadge, PrivacyNotice, SkillGapCard, StatusPill,
} from "./shared";

export function LearningPage() {
  const navigate = useNavigate();

  const recommendedPaths = CAREER_PATHS.filter((p) => p.progress > 0).slice(0, 3);
  const primaryAssessment = ASSESSMENTS.find((a) => a.id === "pd-readiness")!;
  const recommendedPractices = AI_PRACTICES.filter((p) => p.recommended).slice(0, 4);
  const activeCerts = CERTIFICATES.slice(0, 3);
  const topPartner = PARTNER_OPPORTUNITIES[0];

  return (
    <div className="max-w-[1100px] mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center shadow-md shadow-primary/20">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-foreground" style={{ fontWeight: 700, fontSize: 24 }}>
                Learning &amp; Assessments
              </h1>
              <AINativeBadge />
            </div>
            <p className="text-sm text-muted-foreground">
              Start with an Assessment. Find your Career Path. Practice with AI. Get measured. Connect to opportunity — on your terms.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Two-column layout */}
      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="space-y-6 min-w-0">
          {/* Assessment Center Banner */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 }}>
            <button
              onClick={() => navigate("/assessment-center")}
              className="w-full flex items-center gap-4 p-4 rounded-2xl border border-violet-200/60 bg-gradient-to-r from-violet-50 to-primary/5 hover:border-violet-300 hover:shadow-sm transition-all text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-primary flex items-center justify-center shrink-0 shadow-md shadow-primary/20">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm text-foreground" style={{ fontWeight: 700 }}>Assessment Center</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-violet-100 text-violet-700" style={{ fontWeight: 700 }}>NEW</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Personality, behavior, EQ, AI readiness, and more. English-first, report-driven, privacy-first.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-violet-700 shrink-0" style={{ fontWeight: 600 }}>
                <BarChart3 className="w-3.5 h-3.5" />
                Open
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          </motion.div>

          {/* Primary card — Start with Assessment */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <Card className="bg-gradient-to-br from-primary/[0.07] via-white to-violet-50 border-primary/20 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-violet-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-primary" />
                  <span className="text-xs text-primary" style={{ fontWeight: 700, letterSpacing: 0.5 }}>
                    START HERE
                  </span>
                </div>
                <h2 className="text-foreground mb-2" style={{ fontWeight: 700, fontSize: 22 }}>
                  Start with an Assessment
                </h2>
                <p className="text-sm text-muted-foreground mb-5 max-w-2xl leading-relaxed">
                  We measure your current level first — then recommend the right Career Path, AI practices, and next step for you.
                  No content firehose. Just a clear path tied to outcomes.
                </p>

                <div className="grid sm:grid-cols-5 gap-2 mb-5">
                  {[
                    { icon: Target, label: "Role Logic" },
                    { icon: Brain, label: "Foundational Skills" },
                    { icon: Zap, label: "AI Working Ability" },
                    { icon: Gauge, label: "AI Output Critique" },
                    { icon: Compass, label: "Path Readiness" },
                  ].map((d) => (
                    <div key={d.label} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white/70 border border-border/30">
                      <d.icon className="w-4 h-4 text-primary" />
                      <span className="text-[10px] text-center text-muted-foreground leading-tight" style={{ fontWeight: 600 }}>
                        {d.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <Button variant="gradient" onClick={() => navigate("/learning/assessments/initial-diagnostic")}>
                    <Target className="w-4 h-4" />
                    Start Assessment
                  </Button>
                  <Button variant="ghost" onClick={() => navigate("/learning/paths")}>
                    Or explore Career Paths
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Recommended Next Step */}
          <Section
            title="Recommended Next Step"
            icon={<ArrowRight className="w-4 h-4 text-primary" />}
            description="Based on your latest assessment result."
          >
            <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-violet-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-foreground mb-0.5" style={{ fontWeight: 700 }}>
                    Complete Login Form Critique Practice
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Your AI-Generated UI Critique Assessment showed gaps in Accessibility Judgment and Form Usability.
                    This 12-minute practice closes both.
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700" style={{ fontWeight: 600 }}>
                      +5% UI Reasoning
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700" style={{ fontWeight: 600 }}>
                      +4% Application Readiness
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700" style={{ fontWeight: 600 }}>
                      Unlocks 2 job matches
                    </span>
                  </div>
                </div>
                <Button size="sm" onClick={() => navigate("/learning/critique/login-critique")}>
                  Start
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </Card>
          </Section>

          {/* Your Career Paths */}
          <Section
            title="Your Career Paths"
            icon={<Target className="w-4 h-4 text-primary" />}
            action={
              <button onClick={() => navigate("/learning/paths")} className="text-xs text-primary inline-flex items-center gap-1 hover:underline" style={{ fontWeight: 600 }}>
                Explore all paths <ChevronRight className="w-3.5 h-3.5" />
              </button>
            }
          >
            <div className="space-y-3">
              {recommendedPaths.map((p) => (
                <CareerPathCard key={p.id} path={p} compact />
              ))}
            </div>
          </Section>

          {/* Recommended AI Practices */}
          <Section
            title="Recommended AI Practices"
            icon={<Zap className="w-4 h-4 text-violet-600" />}
            description="Closing your detected skill gaps with hands-on AI practice."
          >
            <div className="grid sm:grid-cols-2 gap-3">
              {recommendedPractices.map((p) => (
                <AIPracticeCard key={p.id} practice={p} />
              ))}
            </div>
          </Section>

          {/* Skill Gaps */}
          <Section
            title="Detected Skill Gaps"
            icon={<TrendingUp className="w-4 h-4 text-amber-600" />}
            description="From your most recent assessments. Each gap is tied to a recommended practice."
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {SKILL_GAPS.slice(0, 6).map((g) => (
                <SkillGapCard key={g.name} gap={g} />
              ))}
            </div>
          </Section>

          {/* Certificates */}
          <Section
            title="Certificates"
            icon={<Award className="w-4 h-4 text-amber-600" />}
            action={
              <button onClick={() => navigate("/learning/certificates")} className="text-xs text-primary inline-flex items-center gap-1 hover:underline" style={{ fontWeight: 600 }}>
                View all <ChevronRight className="w-3.5 h-3.5" />
              </button>
            }
          >
            <div className="grid sm:grid-cols-2 gap-3">
              {activeCerts.map((c) => (
                <CertificateCard key={c.id} cert={c} />
              ))}
            </div>
          </Section>

          {/* Partner Opportunities */}
          <Section
            title="Partner Opportunities"
            icon={<Building2 className="w-4 h-4 text-emerald-600" />}
            description="Optional. Visibility under your control. Eligibility requires Work-Ready certificate."
          >
            <Card className="border-emerald-200/60 bg-gradient-to-r from-emerald-50/60 to-transparent">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-foreground" style={{ fontWeight: 700 }}>
                    {topPartner.role} at {topPartner.company}
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    {topPartner.level} · Match {topPartner.matchScore}%
                  </div>
                  <p className="text-xs text-muted-foreground/90 mb-2">
                    Unlock by completing: {topPartner.requirements.join(" · ")}
                  </p>
                </div>
                <Button size="sm" variant="outline" onClick={() => navigate("/learning/partner")}>
                  Manage Visibility
                </Button>
              </div>
            </Card>
          </Section>

          {/* Privacy Reminder */}
          <PrivacyNotice>
            Your assessment results, AI feedback, and learning progress are <span style={{ fontWeight: 700 }}>private by default</span>.
            They are shared with a company only when you apply, accept an invitation, or explicitly grant consent.
            Hamrahe never uses AI to auto-reject candidates.
          </PrivacyNotice>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Your Readiness */}
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Gauge className="w-4 h-4 text-primary" />
              <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>Your Readiness</h3>
            </div>
            <div className="space-y-3">
              <ReadinessRing value={READINESS_SCORES.productDesigner} size={72} stroke={7} label="Product Designer" status="Improving" />
              <ReadinessRing value={READINESS_SCORES.applicationReadiness} size={56} stroke={6} label="Application Readiness" status="Building" />
              <ReadinessRing value={READINESS_SCORES.partnerEligibility} size={56} stroke={6} label="Partner Eligibility" status="Not Started" />
            </div>
            <button
              onClick={() => navigate("/learning/paths/product-designer")}
              className="mt-4 w-full text-xs text-primary inline-flex items-center justify-center gap-1 py-2 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors"
              style={{ fontWeight: 600 }}
            >
              Improve Readiness
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Card>

          {/* AI Credits Wallet */}
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200/60">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-amber-700" />
                <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>AI Credits</h3>
              </div>
              <button onClick={() => navigate("/learning/wallet")} className="text-[11px] text-amber-700 hover:underline" style={{ fontWeight: 600 }}>
                Manage
              </button>
            </div>
            <div className="text-amber-900 mb-1" style={{ fontWeight: 700, fontSize: 28 }}>
              {WALLET.balance.toLocaleString()}
            </div>
            <p className="text-[11px] text-amber-800/80 leading-relaxed">
              Credits reward meaningful progress, not empty clicks. Use them for AI sessions, roleplays, and assessment retakes.
            </p>
          </Card>

          {/* Active Assessments */}
          <Card>
            <h3 className="text-sm text-foreground mb-3" style={{ fontWeight: 700 }}>Active Assessments</h3>
            <div className="space-y-2">
              {ASSESSMENTS.slice(0, 3).map((a) => (
                <button
                  key={a.id}
                  onClick={() => navigate(`/learning/assessments/${a.id}`)}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-muted/40 transition-colors group"
                >
                  <div className="text-xs text-foreground line-clamp-1 mb-0.5" style={{ fontWeight: 600 }}>{a.title}</div>
                  <div className="flex items-center gap-1.5">
                    <StatusPill status={a.status} />
                    <span className="text-[10px] text-muted-foreground">{a.estimatedMinutes} min</span>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Notifications */}
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Bell className="w-4 h-4 text-primary" />
              <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>Next Best Actions</h3>
            </div>
            <div className="space-y-2">
              {LEARNING_NOTIFICATIONS.slice(0, 4).map((n) => (
                <div key={n.id} className="p-2.5 rounded-xl border border-border/30 bg-white">
                  <div className="text-xs text-foreground mb-0.5" style={{ fontWeight: 600 }}>{n.title}</div>
                  <p className="text-[11px] text-muted-foreground line-clamp-2 mb-1.5">{n.body}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground">{n.time}</span>
                    <button
                      onClick={() => {
                        if (n.icon === "cert") navigate("/learning/certificates");
                        else if (n.icon === "partner") navigate("/learning/partner");
                        else if (n.icon === "ai") navigate(`/learning/critique/${n.targetId}`);
                        else navigate(`/learning/assessments/${n.targetId}`);
                      }}
                      className="text-[10px] text-primary hover:underline"
                      style={{ fontWeight: 600 }}
                    >
                      {n.action}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Consent Quick Link */}
          <Card>
            <div className="flex items-start gap-3">
              <Shield className="w-4 h-4 text-slate-600 mt-0.5" />
              <div className="flex-1">
                <div className="text-sm text-foreground mb-0.5" style={{ fontWeight: 700 }}>Privacy &amp; Consent</div>
                <p className="text-[11px] text-muted-foreground mb-2 leading-relaxed">
                  Control what is shared, with whom, and when. Nothing leaves your profile without your action.
                </p>
                <button
                  onClick={() => navigate("/learning/partner")}
                  className="text-[11px] text-primary hover:underline"
                  style={{ fontWeight: 600 }}
                >
                  Manage consent →
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  icon,
  description,
  action,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            {icon}
            <h2 className="text-foreground" style={{ fontWeight: 700, fontSize: 16 }}>{title}</h2>
          </div>
          {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
