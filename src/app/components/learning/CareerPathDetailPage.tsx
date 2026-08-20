import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft, ArrowRight, Zap, Target, Brain, Award, Briefcase,
  CheckCircle2, TrendingUp, AlertCircle, Workflow, Lightbulb, Eye, Building2, Play, GraduationCap,
} from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import {
  getPath, AI_PRACTICES, CERTIFICATES, ROLE_LOGIC_PD,
  AI_LITERACY_PD, TRADITIONAL_SKILLS_PD, AI_NATIVE_SKILLS_PD, PHASES_PD,
} from "../../data/learning-data";
import {
  ReadinessRing, AINativeBadge, StatusPill, PhaseTimeline,
  AIPracticeCard, CertificateCard, PrivacyNotice,
} from "./shared";

export function CareerPathDetailPage() {
  const { pathId } = useParams();
  const navigate = useNavigate();
  const path = getPath(pathId || "");
  const [activePhase, setActivePhase] = useState<"Foundation" | "Practice & Execution" | "Readiness & Opportunity">(
    path?.currentPhase || "Foundation",
  );

  if (!path) {
    return (
      <div className="max-w-[800px] mx-auto py-12 text-center">
        <p className="text-muted-foreground">Career Path not found.</p>
        <Button className="mt-4" onClick={() => navigate("/learning/paths")}>Back to Paths</Button>
      </div>
    );
  }

  const practices = AI_PRACTICES.filter((p) => p.pathId === path.id);
  const certs = CERTIFICATES.filter((c) => c.pathId === path.id);

  return (
    <div className="max-w-[1000px] mx-auto space-y-5">
      <button
        onClick={() => navigate("/learning/paths")}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Career Paths
      </button>

      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="bg-gradient-to-br from-primary/[0.05] via-white to-violet-50 border-primary/20 overflow-hidden relative">
          <div className={`absolute top-0 right-0 w-72 h-72 bg-gradient-to-br ${path.color} opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none`} />
          <div className="relative">
            <div className="flex items-start gap-4 flex-wrap">
              <div className={`w-16 h-16 rounded-2xl ${path.iconBg} flex items-center justify-center shrink-0`}>
                <Target className={`w-8 h-8 ${path.iconColor}`} />
              </div>
              <div className="flex-1 min-w-[260px]">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  {path.aiNative && <AINativeBadge />}
                  <StatusPill status={path.status} />
                  {path.partnerEligible && (
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700" style={{ fontWeight: 600 }}>
                      Partner-Eligible
                    </span>
                  )}
                </div>
                <h1 className="text-foreground mb-1" style={{ fontWeight: 700, fontSize: 26 }}>{path.title}</h1>
                <p className="text-sm text-muted-foreground mb-3">{path.tagline}</p>
                <p className="text-sm text-foreground/90 max-w-2xl mb-4">{path.description}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <Button variant="gradient" onClick={() => navigate(`/learning/unit/${practices[0]?.id || "login-design"}`)}>
                    <Play className="w-4 h-4" />
                    Continue Path
                  </Button>
                  <Button variant="outline" onClick={() => navigate("/learning/assessments/pd-readiness")}>
                    <Brain className="w-4 h-4" />
                    Take Path Assessment
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-3 items-center">
                <ReadinessRing value={path.readiness} size={100} stroke={9} />
                <div className="text-[11px] text-muted-foreground text-center">
                  Readiness · <span style={{ fontWeight: 700 }} className="text-foreground">{path.currentPhase}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
              <StatTile icon={<Zap className="w-4 h-4 text-violet-600" />} label="AI Practices" value={path.practiceCount} />
              <StatTile icon={<Brain className="w-4 h-4 text-primary" />} label="Assessments" value={path.assessmentCount} />
              <StatTile icon={<Briefcase className="w-4 h-4 text-emerald-600" />} label="Related Jobs" value={path.relatedJobs} />
              <StatTile icon={<Building2 className="w-4 h-4 text-amber-600" />} label="Companies" value={path.relatedCompanies} />
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Phase Timeline */}
      <Card>
        <PhaseTimeline current={path.currentPhase} />
      </Card>

      {/* Assessment Insight */}
      <Section title="Assessment Insight" icon={<Brain className="w-4 h-4 text-primary" />}>
        <Card>
          <p className="text-sm text-foreground/90 mb-4 leading-relaxed">
            You're entering this path based on your assessment result. Here's what stood out.
          </p>
          <div className="grid md:grid-cols-2 gap-3 mb-4">
            <InsightBlock title="Current strengths" items={["Visual reasoning", "Decision articulation", "Pattern recognition"]} kind="strength" />
            <InsightBlock title="Current gaps" items={["Accessibility judgment", "Error state design", "UX research depth"]} kind="gap" />
          </div>
          <div className="p-3 rounded-xl bg-primary/5 border border-primary/20">
            <div className="text-xs text-primary mb-1" style={{ fontWeight: 700, letterSpacing: 0.3 }}>RECOMMENDED PHASE</div>
            <div className="text-sm text-foreground mb-2" style={{ fontWeight: 600 }}>Continue with: {path.currentPhase}</div>
            <div className="text-xs text-muted-foreground">Next AI practice: Login Form Critique Practice (12 min)</div>
          </div>
        </Card>
      </Section>

      {/* Role Overview */}
      <Section title="Role Overview" icon={<Eye className="w-4 h-4 text-primary" />}>
        <Card>
          <p className="text-sm text-foreground/90 leading-relaxed">
            A Product Designer turns user problems into shipped product experiences. They frame the problem, design
            the structure of the experience, make and defend decisions, evaluate UI quality, and explain their work.
            In an AI-native world, the role expands: designers also direct AI, critique its output, and own the human
            judgment that AI cannot replace.
          </p>
        </Card>
      </Section>

      {/* Role Logic */}
      <Section title="Role Logic" icon={<Workflow className="w-4 h-4 text-primary" />}>
        <Card>
          <div className="grid sm:grid-cols-5 gap-2">
            {ROLE_LOGIC_PD.map((item, i) => (
              <div key={i} className="p-3 rounded-xl bg-muted/40">
                <div className="text-[10px] text-primary mb-1" style={{ fontWeight: 700 }}>STEP {i + 1}</div>
                <div className="text-xs text-foreground" style={{ fontWeight: 600 }}>{item}</div>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* AI Literacy */}
      <Section title="AI Literacy for This Role" icon={<GraduationCap className="w-4 h-4 text-violet-600" />}>
        <div className="grid sm:grid-cols-2 gap-3">
          {AI_LITERACY_PD.map((it, i) => (
            <Card key={i} className="bg-gradient-to-br from-violet-50/40 to-white border-violet-200/60">
              <div className="flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-violet-600 mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm text-foreground mb-1" style={{ fontWeight: 600 }}>{it.q}</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{it.a}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* AI-Augmented Workflow */}
      <Section title="AI-Augmented Workflow" icon={<Workflow className="w-4 h-4 text-primary" />}>
        <Card padding={false} className="p-4 overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max">
            {[
              "Problem",
              "AI Ideation",
              "AI Output",
              "Human Critique",
              "Revision",
              "Work Sample",
              "Assessment",
              "Readiness Update",
            ].map((node, i, arr) => (
              <div key={node} className="flex items-center gap-2">
                <div className={`px-3 py-2 rounded-xl text-xs ${i % 2 === 0 ? "bg-primary/10 text-primary" : "bg-violet-100 text-violet-700"}`} style={{ fontWeight: 600 }}>
                  {node}
                </div>
                {i < arr.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/50" />}
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* Skill Map */}
      <Section title="Skill Map" icon={<Target className="w-4 h-4 text-primary" />}>
        <div className="grid md:grid-cols-2 gap-3">
          <Card>
            <div className="text-xs text-muted-foreground mb-2" style={{ fontWeight: 700, letterSpacing: 0.3 }}>TRADITIONAL</div>
            <div className="flex flex-wrap gap-1.5">
              {TRADITIONAL_SKILLS_PD.map((s) => (
                <span key={s} className="text-xs px-2.5 py-1 rounded-md bg-muted/60 text-muted-foreground" style={{ fontWeight: 600 }}>{s}</span>
              ))}
            </div>
          </Card>
          <Card className="bg-gradient-to-br from-violet-50/40 to-white border-violet-200/60">
            <div className="flex items-center gap-1.5 mb-2">
              <Zap className="w-3.5 h-3.5 text-violet-600" />
              <div className="text-xs text-violet-700" style={{ fontWeight: 700, letterSpacing: 0.3 }}>AI-NATIVE</div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {AI_NATIVE_SKILLS_PD.map((s) => (
                <span key={s} className="text-xs px-2.5 py-1 rounded-md bg-violet-100 text-violet-700" style={{ fontWeight: 600 }}>{s}</span>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      {/* Three Phases */}
      <Section title="Path Phases" icon={<TrendingUp className="w-4 h-4 text-primary" />}>
        <Card padding={false}>
          <div className="flex border-b border-border/30">
            {(Object.keys(PHASES_PD) as (keyof typeof PHASES_PD)[]).map((phase) => (
              <button
                key={phase}
                onClick={() => setActivePhase(phase)}
                className={`flex-1 px-4 py-3 text-xs transition-all ${activePhase === phase ? "text-primary border-b-2 border-primary -mb-px" : "text-muted-foreground hover:text-foreground"}`}
                style={{ fontWeight: 600 }}
              >
                {phase}
              </button>
            ))}
          </div>
          <div className="p-5">
            <div className="grid sm:grid-cols-2 gap-2.5">
              {PHASES_PD[activePhase].map((item, i) => (
                <div key={i} className="flex items-start gap-2 p-3 rounded-xl bg-muted/30">
                  <div className="w-6 h-6 rounded-full bg-white border border-border/40 text-[10px] flex items-center justify-center shrink-0" style={{ fontWeight: 700 }}>
                    {i + 1}
                  </div>
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </Section>

      {/* AI Practices */}
      <Section title="AI Practices for This Path" icon={<Zap className="w-4 h-4 text-violet-600" />}>
        <div className="grid sm:grid-cols-2 gap-3">
          {practices.map((p) => (
            <AIPracticeCard key={p.id} practice={p} />
          ))}
        </div>
      </Section>

      {/* Certificates */}
      <Section title="Path Certificates" icon={<Award className="w-4 h-4 text-amber-600" />}>
        <div className="grid sm:grid-cols-2 gap-3">
          {certs.map((c) => (
            <CertificateCard key={c.id} cert={c} />
          ))}
        </div>
      </Section>

      <PrivacyNotice>
        Your progress on this Career Path is <span style={{ fontWeight: 700 }}>private by default</span>. Certificates and verified skills are public only with your control. Companies see your results only if you apply or grant explicit consent.
      </PrivacyNotice>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h2 className="text-foreground" style={{ fontWeight: 700, fontSize: 16 }}>{title}</h2>
      </div>
      {children}
    </section>
  );
}

function StatTile({ icon, label, value }: { icon: React.ReactNode; label: string; value: number | string }) {
  return (
    <div className="p-3 rounded-xl bg-white/70 border border-border/30">
      <div className="flex items-center gap-1.5 mb-1">
        {icon}
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider" style={{ fontWeight: 600 }}>{label}</span>
      </div>
      <div className="text-foreground" style={{ fontWeight: 700, fontSize: 18 }}>{value}</div>
    </div>
  );
}

function InsightBlock({ title, items, kind }: { title: string; items: string[]; kind: "strength" | "gap" }) {
  const isStrength = kind === "strength";
  return (
    <div className={`p-3 rounded-xl border ${isStrength ? "bg-emerald-50/50 border-emerald-200" : "bg-amber-50/50 border-amber-200"}`}>
      <div className="flex items-center gap-1.5 mb-2">
        {isStrength ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <AlertCircle className="w-3.5 h-3.5 text-amber-600" />}
        <span className={`text-xs ${isStrength ? "text-emerald-700" : "text-amber-700"}`} style={{ fontWeight: 700 }}>{title}</span>
      </div>
      <ul className="space-y-1">
        {items.map((it, i) => (
          <li key={i} className="text-xs text-foreground">• {it}</li>
        ))}
      </ul>
    </div>
  );
}
