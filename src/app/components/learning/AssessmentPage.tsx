import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft, Brain, Clock, Sparkles, Target, CheckCircle2, AlertCircle,
  ArrowRight, Eye, EyeOff, RefreshCw, Award, TrendingUp,
} from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import {
  getAssessment, ASSESSMENT_RESULTS, getPath, getPractice,
} from "../../data/learning-data";
import { PrivacyChip, AINativeBadge, StatusPill, PrivacyNotice, ReadinessRing } from "./shared";
import { toast } from "sonner";

type Mode = "entry" | "running" | "result";

const SAMPLE_QUESTIONS = [
  {
    q: "When you receive an AI-generated UI for a login page, what's the first thing you evaluate?",
    options: [
      "How visually polished it looks",
      "Whether the hierarchy serves the primary task",
      "How many fields it has",
      "Whether it matches popular designs",
    ],
    correct: 1,
  },
  {
    q: "Which is most likely a weak spot in AI-generated UI?",
    options: ["Visual consistency", "Trust signals and error states", "Layout grids", "Use of color"],
    correct: 1,
  },
  {
    q: "A login form with no inline validation. Best critique?",
    options: [
      "It's fine; users will figure it out",
      "Add a single global error at top",
      "Inline validation reduces error recovery cost — required",
      "Move validation to a separate step",
    ],
    correct: 2,
  },
];

export function AssessmentPage() {
  const { assessmentId } = useParams();
  const navigate = useNavigate();
  const assessment = getAssessment(assessmentId || "");
  const [mode, setMode] = useState<Mode>(assessment?.status === "Completed" ? "result" : "entry");
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  if (!assessment) {
    return (
      <div className="max-w-[800px] mx-auto py-12 text-center">
        <p className="text-muted-foreground">Assessment not found.</p>
        <Button className="mt-4" onClick={() => navigate("/learning")}>Back to Learning</Button>
      </div>
    );
  }

  const result = ASSESSMENT_RESULTS[assessment.id];
  const relatedPath = assessment.relatedPathId ? getPath(assessment.relatedPathId) : undefined;

  const submitAnswer = (i: number) => {
    const next = [...answers, i];
    setAnswers(next);
    if (qIndex < SAMPLE_QUESTIONS.length - 1) {
      setQIndex(qIndex + 1);
    } else {
      toast.success("Assessment submitted. Generating your result...");
      setTimeout(() => setMode("result"), 600);
    }
  };

  return (
    <div className="max-w-[900px] mx-auto space-y-5">
      <button
        onClick={() => navigate("/learning")}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Learning &amp; Assessments
      </button>

      <AnimatePresence mode="wait">
        {mode === "entry" && (
          <motion.div
            key="entry"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-5"
          >
            <Card className="bg-gradient-to-br from-primary/[0.06] via-white to-violet-50 border-primary/20">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center shrink-0">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-[11px] text-primary" style={{ fontWeight: 700, letterSpacing: 0.5 }}>
                      {assessment.type.toUpperCase()}
                    </span>
                    <StatusPill status={assessment.status} />
                    <PrivacyChip kind={assessment.privacy === "Private" ? "private" : "shared"} />
                  </div>
                  <h1 className="text-foreground mb-2" style={{ fontWeight: 700, fontSize: 24 }}>
                    {assessment.title}
                  </h1>
                  <p className="text-sm text-muted-foreground leading-relaxed">{assessment.description}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-3 mb-5">
                <InfoTile icon={<Clock className="w-4 h-4 text-primary" />} label="Estimated" value={`${assessment.estimatedMinutes} min`} />
                <InfoTile
                  icon={<Target className="w-4 h-4 text-primary" />}
                  label="Career Path"
                  value={relatedPath?.title || "Cross-role"}
                />
                <InfoTile
                  icon={<Sparkles className="w-4 h-4 text-violet-600" />}
                  label="AI-Native"
                  value={`${assessment.aiSkills.length} skills`}
                />
              </div>

              {assessment.requestedBy && (
                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50 border border-amber-200 mb-5">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span className="text-sm text-amber-800" style={{ fontWeight: 500 }}>
                    Requested by <span style={{ fontWeight: 700 }}>{assessment.requestedBy.name}</span>
                  </span>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4 mb-5">
                <SkillsList title="Skills measured" items={assessment.skills} />
                <SkillsList title="AI-native skills measured" items={assessment.aiSkills} ai />
              </div>

              <Card padding={false} className="p-4 bg-white/60 border-border/40">
                <div className="text-xs text-muted-foreground mb-2" style={{ fontWeight: 700, letterSpacing: 0.5 }}>
                  AFTER COMPLETION, HAMRAHE WILL SHOW
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    "Skill gaps",
                    "AI-native skill gaps",
                    "Recommended Career Path phase",
                    "Recommended AI practice",
                    "Readiness update",
                    "Certificate progress",
                    "Related jobs",
                  ].map((it) => (
                    <div key={it} className="flex items-center gap-2 text-xs text-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      {it}
                    </div>
                  ))}
                </div>
              </Card>
            </Card>

            <PrivacyNotice>
              Your result and AI feedback for this assessment are <span style={{ fontWeight: 700 }}>private by default</span>.
              They are shared with a company only when you apply, accept an invitation, or grant consent.
            </PrivacyNotice>

            <div className="flex items-center justify-between flex-wrap gap-3 sticky bottom-4">
              <div className="text-xs text-muted-foreground">
                You can pause and resume at any time.
              </div>
              <Button variant="gradient" size="lg" onClick={() => setMode("running")}>
                <Sparkles className="w-4 h-4" />
                Start Assessment
              </Button>
            </div>
          </motion.div>
        )}

        {mode === "running" && (
          <motion.div key="running" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <Card>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5" style={{ fontWeight: 600 }}>
                    Question {qIndex + 1} of {SAMPLE_QUESTIONS.length}
                  </div>
                  <h2 className="text-foreground" style={{ fontWeight: 600, fontSize: 18 }}>
                    {SAMPLE_QUESTIONS[qIndex].q}
                  </h2>
                </div>
                <div className="text-xs text-muted-foreground inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {assessment.estimatedMinutes} min
                </div>
              </div>

              <div className="h-1.5 bg-muted/40 rounded-full overflow-hidden mb-5">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-violet-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${((qIndex + 1) / SAMPLE_QUESTIONS.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              <div className="space-y-2.5">
                {SAMPLE_QUESTIONS[qIndex].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => submitAnswer(i)}
                    className="w-full text-left p-4 rounded-xl border border-border/40 hover:border-primary hover:bg-primary/5 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full border border-border/60 group-hover:border-primary group-hover:bg-primary group-hover:text-white text-xs flex items-center justify-center transition-all" style={{ fontWeight: 600 }}>
                        {String.fromCharCode(65 + i)}
                      </div>
                      <span className="text-sm text-foreground">{opt}</span>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            <button
              onClick={() => setMode("entry")}
              className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Pause and exit
            </button>
          </motion.div>
        )}

        {mode === "result" && result && (
          <ResultView result={result} assessmentTitle={assessment.title} />
        )}
      </AnimatePresence>
    </div>
  );
}

function ResultView({ result, assessmentTitle }: { result: any; assessmentTitle: string }) {
  const navigate = useNavigate();
  const [visibility, setVisibility] = useState<"Private" | "Profile" | "Shared">("Private");
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
      {/* Hero */}
      <Card className="bg-gradient-to-br from-primary/[0.06] via-white to-violet-50 border-primary/20">
        <div className="flex items-center gap-6 flex-wrap">
          <ReadinessRing value={result.score} size={120} stroke={10} />
          <div className="flex-1 min-w-[200px]">
            <div className="flex items-center gap-2 mb-1">
              <StatusPill status={result.status} />
              <AINativeBadge />
            </div>
            <h1 className="text-foreground mb-1" style={{ fontWeight: 700, fontSize: 22 }}>
              {assessmentTitle}
            </h1>
            <p className="text-sm text-muted-foreground">
              You scored <span style={{ fontWeight: 700 }} className="text-foreground">{result.score}%</span>.
              Status: <span style={{ fontWeight: 700 }} className="text-foreground">{result.status}</span>.
              This result is private until you choose otherwise.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Button variant="gradient" onClick={() => {
              const firstPractice = result.recommendedActions.find((a: any) => a.kind === "practice" || a.kind === "critique");
              if (firstPractice) navigate(firstPractice.kind === "critique" ? `/learning/critique/${firstPractice.targetId}` : `/learning/unit/${firstPractice.targetId}`);
            }}>
              <Sparkles className="w-4 h-4" />
              Start Recommended Practice
            </Button>
            <Button variant="outline" onClick={() => navigate(`/learning/paths/${result.recommendedActions.find((a: any) => a.kind === "path")?.targetId || "product-designer"}`)}>
              Continue Career Path
            </Button>
          </div>
        </div>
      </Card>

      {/* Strengths / Gaps */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>Strengths</h3>
          </div>
          <ul className="space-y-2">
            {result.strengths.map((s: string, i: number) => (
              <li key={i} className="text-sm text-foreground flex items-start gap-2">
                <span className="text-emerald-500 mt-1">●</span>
                {s}
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>Skill Gaps</h3>
          </div>
          <ul className="space-y-2">
            {result.gaps.map((s: string, i: number) => (
              <li key={i} className="text-sm text-foreground flex items-start gap-2">
                <span className="text-amber-500 mt-1">●</span>
                {s}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Recommended Actions */}
      <Card>
        <div className="flex items-center gap-2 mb-3">
          <ArrowRight className="w-4 h-4 text-primary" />
          <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>Recommended Next Actions</h3>
        </div>
        <div className="space-y-2">
          {result.recommendedActions.map((a: any) => (
            <button
              key={a.id}
              onClick={() => {
                if (a.kind === "practice") navigate(`/learning/unit/${a.targetId}`);
                else if (a.kind === "critique") navigate(`/learning/critique/${a.targetId}`);
                else if (a.kind === "path") navigate(`/learning/paths/${a.targetId}`);
                else navigate(`/learning/assessments/${a.targetId}`);
              }}
              className="w-full flex items-center gap-3 p-3 rounded-xl border border-border/30 hover:border-primary/40 hover:bg-primary/5 transition-all text-left group"
            >
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                {a.kind === "critique" || a.kind === "practice" ? (
                  <Sparkles className="w-4 h-4 text-primary" />
                ) : a.kind === "path" ? (
                  <Target className="w-4 h-4 text-primary" />
                ) : (
                  <RefreshCw className="w-4 h-4 text-primary" />
                )}
              </div>
              <div className="flex-1">
                <div className="text-sm text-foreground" style={{ fontWeight: 600 }}>{a.label}</div>
                <div className="text-[11px] text-muted-foreground capitalize">{a.kind}</div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
            </button>
          ))}
        </div>
      </Card>

      {/* Readiness Impact */}
      <Card>
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>Readiness Impact</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-2">
          {result.readinessImpact.map((r: any, i: number) => (
            <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
              <span className="text-sm text-emerald-900">{r.label}</span>
              <span className="text-sm text-emerald-700" style={{ fontWeight: 700 }}>+{r.delta}%</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Visibility */}
      <Card>
        <div className="flex items-center justify-between mb-3 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            {visibility === "Private" ? <EyeOff className="w-4 h-4 text-slate-600" /> : <Eye className="w-4 h-4 text-primary" />}
            <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>Result Visibility</h3>
          </div>
          <div className="flex items-center gap-1.5">
            {(["Private", "Profile", "Shared"] as const).map((v) => (
              <button
                key={v}
                onClick={() => {
                  setVisibility(v);
                  toast.success(`Visibility changed to ${v}`);
                }}
                className={`text-xs px-3 py-1.5 rounded-lg transition-all ${visibility === v ? "bg-primary text-white" : "bg-muted/50 text-muted-foreground hover:bg-muted"}`}
                style={{ fontWeight: 600 }}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
        <PrivacyNotice>
          Assessment results and AI feedback are shared with companies only when you apply, accept an invitation, or grant explicit consent. Companies cannot use AI to auto-reject candidates.
        </PrivacyNotice>
      </Card>

      <div className="flex items-center justify-between flex-wrap gap-3">
        <Button variant="ghost" onClick={() => navigate("/learning")}>
          <ArrowLeft className="w-4 h-4" />
          Back to Learning
        </Button>
        <Button variant="outline" onClick={() => toast.message("Re-assessment scheduled. We'll remind you after 3 practices.")}>
          <RefreshCw className="w-4 h-4" />
          Re-assess Later
        </Button>
      </div>
    </motion.div>
  );
}

function InfoTile({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="p-3 rounded-xl bg-white/70 border border-border/40">
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider" style={{ fontWeight: 600 }}>{label}</span>
      </div>
      <div className="text-sm text-foreground" style={{ fontWeight: 600 }}>{value}</div>
    </div>
  );
}

function SkillsList({ title, items, ai }: { title: string; items: string[]; ai?: boolean }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-2">
        {ai && <Sparkles className="w-3.5 h-3.5 text-violet-600" />}
        <span className="text-xs text-foreground" style={{ fontWeight: 700 }}>{title}</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {items.map((s) => (
          <span
            key={s}
            className={`text-[11px] px-2.5 py-1 rounded-md ${ai ? "bg-violet-50 text-violet-700" : "bg-muted/60 text-muted-foreground"}`}
            style={{ fontWeight: 600 }}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
