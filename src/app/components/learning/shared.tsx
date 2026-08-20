import { motion } from "motion/react";
import { Award, Sparkles, Lock, CheckCircle2, Circle, ArrowRight, Brain, Target, Shield } from "lucide-react";
import type { CareerPath, AssessmentDef, AIPractice, Certificate, SkillGap, ReadinessStatus } from "../../data/learning-data";
import { useNavigate } from "react-router";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";

// ---------------- ReadinessRing ----------------
export function ReadinessRing({
  value,
  size = 64,
  stroke = 6,
  label,
  status,
}: {
  value: number;
  size?: number;
  stroke?: number;
  label?: string;
  status?: ReadinessStatus;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  const color =
    value >= 75 ? "#10b981" : value >= 50 ? "#0066FF" : value >= 25 ? "#f59e0b" : "#94a3b8";
  return (
    <div className="flex items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} stroke="#e5e7eb" strokeWidth={stroke} fill="none" />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={color}
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm" style={{ fontWeight: 700, color }}>
            {value}%
          </span>
        </div>
      </div>
      {(label || status) && (
        <div>
          {label && <div className="text-sm text-foreground" style={{ fontWeight: 600 }}>{label}</div>}
          {status && (
            <div className="text-xs text-muted-foreground" style={{ fontWeight: 500 }}>
              {status}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ---------------- AINativeBadge ----------------
export function AINativeBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gradient-to-r from-violet-50 to-fuchsia-50 border border-violet-200/60 text-violet-700 text-[10px] ${className}`}
      style={{ fontWeight: 600 }}
    >
      <Sparkles className="w-2.5 h-2.5" />
      AI-Native
    </span>
  );
}

// ---------------- PrivacyChip ----------------
export function PrivacyChip({ kind = "private" }: { kind?: "private" | "shared" | "consent" }) {
  const map = {
    private: { label: "Private", bg: "bg-slate-100", text: "text-slate-700", icon: Lock },
    shared: { label: "Shared on Apply", bg: "bg-blue-50", text: "text-blue-700", icon: Shield },
    consent: { label: "Consent Required", bg: "bg-amber-50", text: "text-amber-700", icon: Shield },
  } as const;
  const cfg = map[kind];
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] ${cfg.bg} ${cfg.text}`} style={{ fontWeight: 600 }}>
      <Icon className="w-2.5 h-2.5" />
      {cfg.label}
    </span>
  );
}

// ---------------- StatusPill ----------------
export function StatusPill({ status }: { status: string }) {
  const colors: Record<string, string> = {
    "Not Started": "bg-slate-100 text-slate-600",
    "Building": "bg-amber-50 text-amber-700",
    "In Progress": "bg-blue-50 text-blue-700",
    "Improving": "bg-blue-50 text-blue-700",
    "Ready": "bg-emerald-50 text-emerald-700",
    "Strong": "bg-emerald-50 text-emerald-700",
    "Completed": "bg-emerald-50 text-emerald-700",
    "Eligible": "bg-emerald-50 text-emerald-700",
    "Issued": "bg-emerald-50 text-emerald-700",
    "Shared": "bg-violet-50 text-violet-700",
    "Not Eligible": "bg-slate-100 text-slate-500",
  };
  return (
    <span className={`px-2 py-0.5 rounded-md text-[10px] ${colors[status] || "bg-slate-100 text-slate-600"}`} style={{ fontWeight: 600 }}>
      {status}
    </span>
  );
}

// ---------------- CareerPathCard ----------------
export function CareerPathCard({ path, compact = false }: { path: CareerPath; compact?: boolean }) {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(`/learning/paths/${path.id}`)}
      className="hover:border-primary/40 transition-all group"
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-2xl ${path.iconBg} flex items-center justify-center shrink-0`}>
          <Target className={`w-6 h-6 ${path.iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="text-foreground" style={{ fontWeight: 700 }}>{path.title}</h3>
            {path.aiNative && <AINativeBadge />}
            <StatusPill status={path.status} />
          </div>
          <p className="text-xs text-muted-foreground mb-2">{path.tagline}</p>
          {!compact && (
            <p className="text-xs text-muted-foreground/90 leading-relaxed mb-3">
              <Sparkles className="w-3 h-3 inline text-violet-500 mr-1" />
              <span style={{ fontWeight: 600 }}>Recommended because</span> {path.recommendedReason}
            </p>
          )}

          <div className="flex items-center gap-4 flex-wrap">
            <ReadinessRing value={path.readiness} size={48} stroke={5} />
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 flex-1 min-w-[180px]">
              <Stat label="Progress" value={`${path.progress}%`} />
              <Stat label="Phase" value={path.currentPhase} />
              <Stat label="AI Practices" value={String(path.practiceCount)} />
              <Stat label="Assessments" value={String(path.assessmentCount)} />
              <Stat label="Related Jobs" value={String(path.relatedJobs)} />
              <Stat label="Companies" value={String(path.relatedCompanies)} />
            </div>
          </div>

          {!compact && (
            <div className="flex items-center gap-1.5 flex-wrap mt-3">
              {path.outcomes.map((o) => (
                <span key={o} className="text-[10px] px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground">
                  {o}
                </span>
              ))}
            </div>
          )}
        </div>
        <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
      </div>
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] text-muted-foreground uppercase tracking-wider" style={{ fontWeight: 600 }}>{label}</div>
      <div className="text-xs text-foreground" style={{ fontWeight: 600 }}>{value}</div>
    </div>
  );
}

// ---------------- AssessmentEntryCard ----------------
export function AssessmentEntryCard({
  assessment,
  variant = "default",
}: {
  assessment: AssessmentDef;
  variant?: "default" | "primary";
}) {
  const navigate = useNavigate();
  const isPrimary = variant === "primary";
  return (
    <Card
      onClick={() => navigate(`/learning/assessments/${assessment.id}`)}
      className={`${isPrimary ? "bg-gradient-to-br from-primary/[0.06] via-white to-violet-50 border-primary/20" : ""} hover:border-primary/40 transition-all group`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-2xl ${isPrimary ? "bg-gradient-to-br from-primary to-violet-500" : "bg-primary/10"} flex items-center justify-center shrink-0`}>
          <Brain className={`w-6 h-6 ${isPrimary ? "text-white" : "text-primary"}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="text-foreground" style={{ fontWeight: 700 }}>{assessment.title}</h3>
            <StatusPill status={assessment.status} />
            <PrivacyChip kind={assessment.privacy === "Private" ? "private" : "shared"} />
          </div>
          <p className="text-xs text-muted-foreground mb-2">{assessment.type} · ~{assessment.estimatedMinutes} min</p>
          <p className="text-xs text-muted-foreground/90 leading-relaxed mb-3">{assessment.description}</p>

          {assessment.requestedBy && (
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 mb-3">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span className="text-[11px] text-amber-700" style={{ fontWeight: 600 }}>
                Requested by {assessment.requestedBy.name}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 flex-wrap">
            {assessment.skills.slice(0, 3).map((s) => (
              <span key={s} className="text-[10px] px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground">{s}</span>
            ))}
            {assessment.aiSkills.slice(0, 2).map((s) => (
              <span key={s} className="text-[10px] px-2 py-0.5 rounded-md bg-violet-50 text-violet-700" style={{ fontWeight: 600 }}>
                <Sparkles className="w-2.5 h-2.5 inline mr-0.5" />
                {s}
              </span>
            ))}
          </div>

          {assessment.lastScore !== undefined && (
            <div className="mt-3 text-[11px] text-muted-foreground">
              Last score: <span className="text-foreground" style={{ fontWeight: 700 }}>{assessment.lastScore}%</span>
            </div>
          )}
        </div>
        <Button size="sm" variant={isPrimary ? "gradient" : "outline"}>
          {assessment.status === "Completed" ? "View Result" : "Start"}
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>
    </Card>
  );
}

// ---------------- AIPracticeCard ----------------
export function AIPracticeCard({ practice }: { practice: AIPractice }) {
  const navigate = useNavigate();
  const isCritique = practice.unitType === "Critique";
  const route = isCritique ? `/learning/critique/${practice.id}` : `/learning/unit/${practice.id}`;
  return (
    <Card
      onClick={() => navigate(route)}
      className="hover:border-violet-300 transition-all group"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-100 to-fuchsia-100 flex items-center justify-center shrink-0">
          <Sparkles className="w-5 h-5 text-violet-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
            <h4 className="text-sm text-foreground" style={{ fontWeight: 600 }}>{practice.title}</h4>
            {practice.recommended && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-700" style={{ fontWeight: 600 }}>Recommended</span>
            )}
          </div>
          <p className="text-[11px] text-muted-foreground mb-1.5">
            {practice.unitType} · {practice.durationMin} min · {practice.difficulty}
          </p>
          <p className="text-xs text-muted-foreground/90 leading-relaxed line-clamp-2">{practice.description}</p>
        </div>
        <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-violet-600 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
      </div>
    </Card>
  );
}

// ---------------- SkillGapCard ----------------
export function SkillGapCard({ gap }: { gap: SkillGap }) {
  const colors = {
    Critical: "bg-red-50 text-red-700 border-red-200",
    Moderate: "bg-amber-50 text-amber-700 border-amber-200",
    Minor: "bg-slate-50 text-slate-600 border-slate-200",
  };
  return (
    <div className={`p-3 rounded-xl border ${colors[gap.severity]}`}>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-sm" style={{ fontWeight: 600 }}>{gap.name}</span>
        {gap.aiNative && <AINativeBadge />}
      </div>
      <div className="text-[11px]" style={{ fontWeight: 500 }}>{gap.severity} gap</div>
    </div>
  );
}

// ---------------- CertificateCard ----------------
export function CertificateCard({ cert }: { cert: Certificate }) {
  const navigate = useNavigate();
  const done = cert.requirements.filter((r) => r.done).length;
  const total = cert.requirements.length;
  return (
    <Card
      onClick={() => navigate(`/learning/certificates`)}
      className="hover:border-amber-300 transition-all group"
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center shrink-0">
          <Award className="w-7 h-7 text-amber-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h4 className="text-sm text-foreground" style={{ fontWeight: 700 }}>{cert.title}</h4>
            <StatusPill status={cert.status} />
          </div>
          <p className="text-[11px] text-muted-foreground mb-2">{cert.type}</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
              <span>{done} of {total} requirements</span>
              <span style={{ fontWeight: 600 }}>{Math.round((done / total) * 100)}%</span>
            </div>
            <div className="h-1.5 bg-muted/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-400 to-amber-600"
                initial={{ width: 0 }}
                animate={{ width: `${(done / total) * 100}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

// ---------------- ConsentControl ----------------
export function ConsentControl({
  label,
  description,
  enabled,
  onChange,
}: {
  label: string;
  description: string;
  enabled: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl border border-border/30 bg-white">
      <div className="flex-1">
        <div className="text-sm text-foreground mb-0.5" style={{ fontWeight: 600 }}>{label}</div>
        <div className="text-xs text-muted-foreground leading-relaxed">{description}</div>
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative w-10 h-6 rounded-full transition-all shrink-0 ${enabled ? "bg-primary" : "bg-muted"}`}
      >
        <motion.div
          className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow"
          animate={{ x: enabled ? 18 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
    </div>
  );
}

// ---------------- PrivacyNotice ----------------
export function PrivacyNotice({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
      <Shield className="w-4 h-4 text-slate-600 mt-0.5 shrink-0" />
      <p className="text-xs text-slate-700 leading-relaxed">{children}</p>
    </div>
  );
}

// ---------------- PhaseTimeline ----------------
export function PhaseTimeline({ current }: { current: "Foundation" | "Practice & Execution" | "Readiness & Opportunity" }) {
  const phases = ["Foundation", "Practice & Execution", "Readiness & Opportunity"] as const;
  const currentIdx = phases.indexOf(current);
  return (
    <div className="flex items-center gap-2">
      {phases.map((p, i) => {
        const done = i < currentIdx;
        const active = i === currentIdx;
        return (
          <div key={p} className="flex items-center gap-2 flex-1">
            <div className="flex items-center gap-2 flex-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  done ? "bg-emerald-500 text-white" : active ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                }`}
              >
                {done ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-[10px]" style={{ fontWeight: 700 }}>{i + 1}</span>}
              </div>
              <div className="min-w-0">
                <div className={`text-xs ${active ? "text-foreground" : done ? "text-emerald-700" : "text-muted-foreground"}`} style={{ fontWeight: 600 }}>
                  {p}
                </div>
              </div>
            </div>
            {i < phases.length - 1 && <div className={`h-px flex-1 ${done ? "bg-emerald-300" : "bg-border/40"}`} />}
          </div>
        );
      })}
    </div>
  );
}

// ---------------- RequirementChecklist ----------------
export function RequirementChecklist({ items }: { items: { label: string; done: boolean }[] }) {
  return (
    <ul className="space-y-2">
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-2">
          {it.done ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
          ) : (
            <Circle className="w-4 h-4 text-muted-foreground/50 mt-0.5 shrink-0" />
          )}
          <span className={`text-sm ${it.done ? "text-foreground" : "text-muted-foreground"}`}>{it.label}</span>
        </li>
      ))}
    </ul>
  );
}
