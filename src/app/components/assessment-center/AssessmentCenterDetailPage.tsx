import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft, Brain, Clock, Shield, CheckCircle2, AlertCircle, ArrowRight,
  Eye, EyeOff, Download, Share2, Lock, QrCode, FileText, RefreshCw,
  ChevronRight, Play, BarChart3, Building2, Info, Timer, Briefcase,
} from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import {
  getAssessmentCenterItem,
  getUserAttempt,
  getAssessmentCenterResult,
  ASSESSMENT_CENTER_ITEMS,
  type VisibilityLevel,
  type SampleQuestion,
  type DimensionScore,
} from "../../data/assessment-center-data";
import { toast } from "sonner";

type Mode = "entry" | "running" | "result";

const TIMED_MODE_INFO = {
  "Untimed": "No time limit. Take as long as you need.",
  "Soft Timed": "A suggested time limit is shown, but you won't be auto-submitted if you go over.",
  "Strict Timed": "A hard time limit applies. You will be auto-submitted when time runs out.",
};

const VISIBILITY_OPTIONS: { value: VisibilityLevel; label: string; desc: string; icon: React.FC<any> }[] = [
  { value: "Only Me", label: "Only Me", desc: "Result is completely private", icon: Lock },
  { value: "Show Summary in Profile", label: "Show in Profile", desc: "Summary visible on your profile", icon: Eye },
  { value: "Share with Selected Company", label: "Share with Company", desc: "Share with a specific company", icon: Building2 },
  { value: "Share Only During Application", label: "During Application", desc: "Auto-shared when you apply to a job", icon: FileText },
  { value: "Time-limited Link", label: "Time-limited Link", desc: "Create a shareable link with expiry", icon: Share2 },
];

export function AssessmentCenterDetailPage() {
  const { assessmentId } = useParams();
  const navigate = useNavigate();
  const item = getAssessmentCenterItem(assessmentId || "");
  const attempt = getUserAttempt(assessmentId || "");
  const result = getAssessmentCenterResult(assessmentId || "");

  const [mode, setMode] = useState<Mode>(() => {
    if (attempt?.status === "Completed" && result) return "result";
    return "entry";
  });

  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (mode === "running" && item?.timedMode === "Strict Timed") {
      const totalSeconds = item.timeLimit * 60;
      setTimeRemaining(totalSeconds);
      timerRef.current = setInterval(() => {
        setTimeRemaining((t) => {
          if (t === null || t <= 1) {
            clearInterval(timerRef.current!);
            toast.warning("Time's up! Your assessment has been auto-submitted.");
            setTimeout(() => setMode("result"), 800);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
      return () => clearInterval(timerRef.current!);
    }
  }, [mode, item]);

  if (!item) {
    return (
      <div className="max-w-[800px] mx-auto py-12 text-center">
        <Brain className="w-12 h-12 mx-auto mb-4 text-muted-foreground/30" />
        <p className="text-muted-foreground mb-4">Assessment not found.</p>
        <Button onClick={() => navigate("/assessment-center")}>Back to Assessment Center</Button>
      </div>
    );
  }

  const questions = item.sampleQuestions;

  const handleStartAssessment = () => {
    setQIndex(0);
    setAnswers([]);
    setSelectedOption(null);
    setMode("running");
    toast.success("Assessment started. Good luck!");
  };

  const handleSelectOption = (i: number) => {
    setSelectedOption(i);
  };

  const handleNext = () => {
    if (selectedOption === null) {
      toast.error("Please select an answer before continuing.");
      return;
    }
    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (qIndex < questions.length - 1) {
      setQIndex(qIndex + 1);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      toast.success("Assessment submitted. Generating your report...");
      setTimeout(() => setMode("result"), 700);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="max-w-[900px] mx-auto space-y-5">
      <button
        onClick={() => navigate("/assessment-center")}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Assessment Center
      </button>

      <AnimatePresence mode="wait">
        {mode === "entry" && (
          <EntryView
            key="entry"
            item={item}
            attempt={attempt}
            result={result}
            onStart={handleStartAssessment}
            onViewResult={() => setMode("result")}
          />
        )}
        {mode === "running" && (
          <RunningView
            key="running"
            item={item}
            questions={questions}
            qIndex={qIndex}
            selectedOption={selectedOption}
            timeRemaining={timeRemaining}
            totalQuestions={questions.length}
            onSelect={handleSelectOption}
            onNext={handleNext}
            onPause={() => {
              if (timerRef.current) clearInterval(timerRef.current);
              setMode("entry");
              toast.message("Assessment paused. Your progress is saved.");
            }}
            formatTime={formatTime}
          />
        )}
        {mode === "result" && (
          <ResultView
            key="result"
            item={item}
            result={result}
            attempt={attempt}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Entry View ───────────────────────────────────────────────────────────────

function EntryView({ item, attempt, result, onStart, onViewResult }: {
  item: NonNullable<ReturnType<typeof getAssessmentCenterItem>>;
  attempt: ReturnType<typeof getUserAttempt>;
  result: ReturnType<typeof getAssessmentCenterResult>;
  onStart: () => void;
  onViewResult: () => void;
}) {
  const isCompleted = attempt?.status === "Completed";
  const isRequested = attempt?.status === "Requested by Company";

  return (
    <motion.div
      key="entry"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-5"
    >
      {/* Header card */}
      <Card className="bg-gradient-to-br from-violet-50/60 via-white to-primary/5 border-primary/20">
        <div className="flex items-start gap-4 mb-5">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0 shadow-lg`}>
            <span className="text-white" style={{ fontWeight: 900, fontSize: 18 }}>{item.iconLabel}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-[11px] text-violet-600 uppercase" style={{ fontWeight: 700, letterSpacing: 0.5 }}>
                {item.familyShort}
              </span>
              {item.isLaunchBatch && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-primary/10 text-primary" style={{ fontWeight: 700 }}>
                  LAUNCH BATCH #{item.launchPriority}
                </span>
              )}
              {isCompleted && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1" style={{ fontWeight: 600 }}>
                  <CheckCircle2 className="w-3 h-3" />
                  Completed
                </span>
              )}
              {isRequested && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1" style={{ fontWeight: 600 }}>
                  <AlertCircle className="w-3 h-3" />
                  Requested by {attempt?.requestedByCompany?.name}
                </span>
              )}
            </div>
            <h1 className="text-foreground mb-2" style={{ fontWeight: 700, fontSize: 24 }}>
              {item.displayName}
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
          </div>
        </div>

        {/* Timing info */}
        <div className="grid sm:grid-cols-4 gap-3 mb-5">
          <InfoTile
            icon={<Clock className="w-4 h-4 text-primary" />}
            label="Estimated"
            value={`${item.estimatedMinutes} min`}
          />
          <InfoTile
            icon={<Timer className="w-4 h-4 text-primary" />}
            label="Time Limit"
            value={item.timedMode === "Untimed" ? "None" : `${item.timeLimit} min`}
          />
          <InfoTile
            icon={<Brain className="w-4 h-4 text-primary" />}
            label="Questions"
            value={`${item.questionCount} questions`}
          />
          <InfoTile
            icon={<BarChart3 className="w-4 h-4 text-primary" />}
            label="Dimensions"
            value={`${item.dimensionCount} dimensions`}
          />
        </div>

        {/* Timed mode notice */}
        <div className={`flex items-start gap-3 p-3 rounded-xl mb-5 ${
          item.timedMode === "Strict Timed"
            ? "bg-red-50 border border-red-200"
            : item.timedMode === "Soft Timed"
            ? "bg-amber-50 border border-amber-200"
            : "bg-emerald-50 border border-emerald-200"
        }`}>
          <Info className={`w-4 h-4 mt-0.5 shrink-0 ${
            item.timedMode === "Strict Timed" ? "text-red-600"
            : item.timedMode === "Soft Timed" ? "text-amber-600"
            : "text-emerald-600"
          }`} />
          <div>
            <span className={`text-xs block mb-0.5 ${
              item.timedMode === "Strict Timed" ? "text-red-800"
              : item.timedMode === "Soft Timed" ? "text-amber-800"
              : "text-emerald-800"
            }`} style={{ fontWeight: 700 }}>
              {item.timedMode}
            </span>
            <span className={`text-[11px] ${
              item.timedMode === "Strict Timed" ? "text-red-700"
              : item.timedMode === "Soft Timed" ? "text-amber-700"
              : "text-emerald-700"
            }`}>
              {TIMED_MODE_INFO[item.timedMode]}
              {" "}
              {item.pauseAllowed
                ? `You can pause and resume within ${item.resumePolicy.toLowerCase()}.`
                : "Pausing is not allowed after you start."}
            </span>
          </div>
        </div>

        {/* Dimensions */}
        <div className="mb-5">
          <div className="text-xs text-foreground mb-2" style={{ fontWeight: 700 }}>Dimensions Measured</div>
          <div className="flex flex-wrap gap-2">
            {item.dimensions.map((d) => (
              <span key={d} className="text-[11px] px-3 py-1.5 rounded-xl bg-white border border-border/40 text-foreground" style={{ fontWeight: 500 }}>
                {d}
              </span>
            ))}
          </div>
        </div>

        {/* Usage labels */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {item.usageLabels.map((label) => (
            <span key={label} className="text-[10px] px-2.5 py-1 rounded-lg bg-muted/60 text-muted-foreground border border-border/30" style={{ fontWeight: 600 }}>
              {label}
            </span>
          ))}
        </div>

        {/* What you'll get */}
        <Card padding={false} className="p-4 bg-white/70 border-border/40 mb-5">
          <div className="text-xs text-muted-foreground mb-2" style={{ fontWeight: 700, letterSpacing: 0.5 }}>
            AFTER COMPLETION YOU WILL RECEIVE
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Full User Report with dimension analysis",
              "Downloadable PDF report",
              "Report ID & Verification QR code",
              "Company Summary (for consent-based sharing)",
              "Recommended next assessments",
              "Privacy & sharing controls",
            ].map((it) => (
              <div key={it} className="flex items-center gap-2 text-xs text-foreground">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                {it}
              </div>
            ))}
          </div>
        </Card>

        {/* Retake info if completed */}
        {isCompleted && result && attempt && (
          <div className="space-y-3 mb-5">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="flex-1">
                <div className="text-sm text-emerald-900" style={{ fontWeight: 700 }}>
                  {result.overallProfile} — {result.overallLabel}
                </div>
                <div className="text-[11px] text-emerald-700">
                  Last taken {new Date(attempt.submittedAt!).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </div>
                <div className="text-[11px] text-emerald-600 mt-0.5">
                  Report valid until {result.validUntil}
                </div>
              </div>
              <Button size="sm" variant="outline" onClick={onViewResult}>
                View Report
              </Button>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-violet-50 border border-violet-200">
              <RefreshCw className="w-5 h-5 text-violet-600 shrink-0" />
              <div className="flex-1">
                <div className="text-sm text-violet-900" style={{ fontWeight: 700 }}>
                  You can retake this assessment anytime
                </div>
                <div className="text-[11px] text-violet-700">
                  Your latest result will always appear on your profile. Recommended waiting period: {item.retakeRule}.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Company request info */}
        {isRequested && attempt?.requestedByCompany && (
          <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50 border border-amber-200 mb-5">
            <Building2 className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            <div className="flex-1">
              <div className="text-sm text-amber-900" style={{ fontWeight: 700 }}>
                Requested by {attempt.requestedByCompany.name}
              </div>
              <div className="text-[11px] text-amber-700 mb-1">{attempt.requestedByCompany.purpose}</div>
              <div className="text-[11px] text-amber-600">
                Deadline: {new Date(attempt.requestedByCompany.deadline).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Privacy notice */}
      <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
        <Shield className="w-4 h-4 text-slate-600 mt-0.5 shrink-0" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          Your results are <span style={{ fontWeight: 700 }}>private by default</span>. They are shared with a company only when you explicitly choose to share them. Companies cannot use this assessment as the sole basis for a hiring decision.
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between flex-wrap gap-3 sticky bottom-4">
        <div className="text-xs text-muted-foreground">
          {item.pauseAllowed
            ? `You can pause and resume within ${item.resumePolicy.toLowerCase()}.`
            : "Once started, this assessment cannot be paused."}
        </div>
        <div className="flex items-center gap-2">
          {isCompleted && (
            <Button variant="outline" onClick={onViewResult}>
              <FileText className="w-4 h-4" />
              View Report
            </Button>
          )}
          <Button variant="gradient" size="lg" onClick={onStart}>
            <Play className="w-4 h-4" />
            {isCompleted ? "Retake Assessment" : "Start Assessment"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Running View ─────────────────────────────────────────────────────────────

function RunningView({ item, questions, qIndex, selectedOption, timeRemaining, totalQuestions, onSelect, onNext, onPause, formatTime }: {
  item: NonNullable<ReturnType<typeof getAssessmentCenterItem>>;
  questions: SampleQuestion[];
  qIndex: number;
  selectedOption: number | null;
  timeRemaining: number | null;
  totalQuestions: number;
  onSelect: (i: number) => void;
  onNext: () => void;
  onPause: () => void;
  formatTime: (s: number) => string;
}) {
  const q = questions[qIndex];
  const progress = ((qIndex) / totalQuestions) * 100;
  const isLastQuestion = qIndex === totalQuestions - 1;
  const timerWarning = timeRemaining !== null && timeRemaining < 120;

  return (
    <motion.div
      key="running"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      {/* Progress bar + timer */}
      <Card padding={false} className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-xs text-muted-foreground mb-0.5" style={{ fontWeight: 600 }}>
              {item.displayName}
            </div>
            <div className="text-sm text-foreground" style={{ fontWeight: 700 }}>
              Question {qIndex + 1} of {totalQuestions}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {timeRemaining !== null && (
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${
                timerWarning ? "bg-red-50 border border-red-200 text-red-700" : "bg-muted/50 text-muted-foreground"
              }`}>
                <Clock className="w-3.5 h-3.5" />
                <span className="text-sm" style={{ fontWeight: 700 }}>{formatTime(timeRemaining)}</span>
              </div>
            )}
            {item.timedMode !== "Strict Timed" && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                {item.estimatedMinutes} min
              </div>
            )}
          </div>
        </div>

        <div className="h-1.5 bg-muted/40 rounded-full overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${item.color}`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </Card>

      {/* Question card */}
      <Card>
        {q.instruction && (
          <div className="text-[11px] text-muted-foreground mb-3 px-1 italic">{q.instruction}</div>
        )}
        <h2 className="text-foreground mb-5" style={{ fontWeight: 600, fontSize: 18, lineHeight: 1.5 }}>
          {q.text}
        </h2>

        <div className="space-y-2.5">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={`w-full text-left p-4 rounded-xl border transition-all group ${
                selectedOption === i
                  ? `border-primary bg-primary/5 ring-2 ring-primary/20`
                  : "border-border/40 hover:border-primary/40 hover:bg-primary/[0.02]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs transition-all shrink-0 ${
                  selectedOption === i
                    ? "border-primary bg-primary text-white"
                    : "border-border/60 text-muted-foreground group-hover:border-primary"
                }`} style={{ fontWeight: 700 }}>
                  {q.type === "likert" ? i + 1 : String.fromCharCode(65 + i)}
                </div>
                <span className="text-sm text-foreground leading-relaxed">{opt}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mt-5 pt-4 border-t border-border/20">
          {item.pauseAllowed ? (
            <button
              onClick={onPause}
              className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Pause & save progress
            </button>
          ) : (
            <div className="text-[11px] text-red-500 flex items-center gap-1">
              <Lock className="w-3 h-3" />
              Cannot pause — strict timed
            </div>
          )}
          <Button
            variant={selectedOption !== null ? "gradient" : "outline"}
            onClick={onNext}
            disabled={selectedOption === null}
          >
            {isLastQuestion ? "Submit Assessment" : "Next Question"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      {timerWarning && timeRemaining !== null && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-3 rounded-xl bg-red-50 border border-red-200"
        >
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span className="text-xs text-red-700" style={{ fontWeight: 600 }}>
            Less than 2 minutes remaining. Your assessment will be auto-submitted when time runs out.
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}

// ─── Result View ──────────────────────────────────────────────────────────────

function ResultView({ item, result, attempt }: {
  item: NonNullable<ReturnType<typeof getAssessmentCenterItem>>;
  result: ReturnType<typeof getAssessmentCenterResult>;
  attempt: ReturnType<typeof getUserAttempt>;
}) {
  const navigate = useNavigate();
  const [visibility, setVisibility] = useState<VisibilityLevel>(result?.visibility ?? "Only Me");
  const [showPdfModal, setShowPdfModal] = useState(false);

  const mockResult = result ?? {
    overallProfile: item.dimensions[0].split(" ")[0],
    overallLabel: "Your Profile",
    executiveSummary: `You have completed the ${item.displayName}. Your detailed report has been generated with dimension-by-dimension analysis, strengths, development areas, and workplace meaning. Your results are private until you choose to share them.`,
    dimensionScores: item.dimensions.map((d, i) => ({
      name: d,
      label: d,
      score: 60 + Math.floor(Math.random() * 30),
      description: `Your score on the ${d} dimension reflects moderate to high alignment with this profile area.`,
      dominance: "Moderate",
    })) as DimensionScore[],
    strengths: [
      "Strong analytical thinking and problem-solving ability",
      "Clear communication and articulation of ideas",
      "Adaptability in changing work environments",
    ],
    developmentAreas: [
      "Building deeper interpersonal connections at work",
      "Delegating tasks while maintaining quality standards",
    ],
    workplaceMeaning: [
      "You perform best in environments that value results and clear expectations",
      "You thrive when given autonomy and meaningful challenges",
    ],
    interviewTips: item.family === "Hiring & Work Readiness" ? [
      "Use the STAR method to structure your behavioral answers",
      "Research the company's values before the interview",
    ] : undefined,
    recommendedAssessments: item.isLaunchBatch
      ? ASSESSMENT_CENTER_ITEMS.filter((a) => a.id !== item.id && a.isLaunchBatch).slice(0, 3).map((a) => a.id)
      : [],
    reportId: `RPT-${item.id.toUpperCase()}-2026-DEMO`,
    verificationCode: `HMR-${item.id.toUpperCase().slice(0, 4)}-XXXX-XXXX`,
    validUntil: "2028-05-25",
    completedAt: new Date().toISOString(),
    durationMinutes: item.estimatedMinutes,
    submissionType: "User Submitted" as const,
    timedMode: item.timedMode,
    assessmentVersion: "1.0",
    visibility: "Only Me" as VisibilityLevel,
    sharedWith: [],
    attemptId: attempt?.id ?? "demo",
    assessmentId: item.id,
  };

  const displayResult = result ?? mockResult;

  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      {/* Hero result card */}
      <Card className="bg-gradient-to-br from-violet-50/60 via-white to-primary/5 border-primary/20">
        <div className="flex items-start gap-5 flex-wrap">
          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.color} flex flex-col items-center justify-center shrink-0 shadow-lg`}>
            <span className="text-white text-2xl leading-none" style={{ fontWeight: 900 }}>{displayResult.overallProfile}</span>
            {displayResult.overallLabel !== displayResult.overallProfile && (
              <span className="text-white/80 text-[9px] mt-0.5 text-center px-1">{displayResult.overallLabel}</span>
            )}
          </div>
          <div className="flex-1 min-w-[200px]">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1" style={{ fontWeight: 700 }}>
                <CheckCircle2 className="w-3 h-3" />
                Completed
              </span>
              <span className="text-[10px] text-muted-foreground">
                {displayResult.durationMinutes} min · {displayResult.submissionType} · {displayResult.timedMode}
              </span>
            </div>
            <h1 className="text-foreground mb-1" style={{ fontWeight: 700, fontSize: 22 }}>
              {item.displayName} — {displayResult.overallLabel}
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Report valid until <span style={{ fontWeight: 600 }} className="text-foreground">{displayResult.validUntil}</span>.
              Your result is <span style={{ fontWeight: 600 }} className="text-foreground">{visibility === "Only Me" ? "private" : "visible"}</span>.
            </p>
          </div>
          <div className="flex flex-col gap-2 shrink-0">
            <Button variant="gradient" size="sm" onClick={() => setShowPdfModal(true)}>
              <Download className="w-3.5 h-3.5" />
              Download PDF
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate("/profile")}>
              <BarChart3 className="w-3.5 h-3.5" />
              View on Profile
            </Button>
          </div>
        </div>
      </Card>

      {/* Executive Summary */}
      <Card>
        <div className="flex items-center gap-2 mb-3">
          <Brain className="w-4 h-4 text-primary" />
          <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>Executive Summary</h3>
        </div>
        <p className="text-sm text-foreground leading-relaxed">{displayResult.executiveSummary}</p>
      </Card>

      {/* Dimension Scores */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-4 h-4 text-primary" />
          <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>Dimension Scores</h3>
        </div>
        <div className="space-y-4">
          {displayResult.dimensionScores.map((dim) => (
            <div key={dim.name}>
              <div className="flex items-center justify-between mb-1.5">
                <div>
                  <span className="text-xs text-foreground" style={{ fontWeight: 700 }}>{dim.label}</span>
                  {dim.dominance && (
                    <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-md bg-primary/10 text-primary" style={{ fontWeight: 700 }}>
                      {dim.dominance}
                    </span>
                  )}
                </div>
                <span className="text-xs text-foreground" style={{ fontWeight: 700 }}>{dim.score}%</span>
              </div>
              <div className="h-2 bg-muted/40 rounded-full overflow-hidden mb-1.5">
                <motion.div
                  className={`h-full bg-gradient-to-r ${item.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${dim.score}%` }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                />
              </div>
              <p className="text-[11px] text-muted-foreground">{dim.description}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Strengths & Development Areas */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>Strengths</h3>
          </div>
          <ul className="space-y-2">
            {displayResult.strengths.map((s, i) => (
              <li key={i} className="text-sm text-foreground flex items-start gap-2">
                <span className="text-emerald-500 mt-1 shrink-0">●</span>
                {s}
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>Development Areas</h3>
          </div>
          <ul className="space-y-2">
            {displayResult.developmentAreas.map((s, i) => (
              <li key={i} className="text-sm text-foreground flex items-start gap-2">
                <span className="text-amber-500 mt-1 shrink-0">●</span>
                {s}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Workplace Meaning */}
      <Card>
        <div className="flex items-center gap-2 mb-3">
          <Briefcase className="w-4 h-4 text-violet-600" />
          <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>Workplace Meaning</h3>
        </div>
        <ul className="space-y-2">
          {displayResult.workplaceMeaning.map((w, i) => (
            <li key={i} className="text-sm text-foreground flex items-start gap-2">
              <span className="text-violet-400 mt-1 shrink-0">●</span>
              {w}
            </li>
          ))}
        </ul>
      </Card>

      {/* Interview Tips */}
      {displayResult.interviewTips && displayResult.interviewTips.length > 0 && (
        <Card className="border-amber-200/50 bg-amber-50/30">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>Interview Tips</h3>
          </div>
          <ul className="space-y-2">
            {displayResult.interviewTips.map((tip, i) => (
              <li key={i} className="text-sm text-foreground flex items-start gap-2">
                <span className="text-amber-500 mt-1 shrink-0">→</span>
                {tip}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Report Verification */}
      <Card className="border-slate-200/60 bg-slate-50/40">
        <div className="flex items-start gap-4 flex-wrap">
          <div className="w-16 h-16 rounded-xl bg-white border border-border/40 flex flex-col items-center justify-center shrink-0 shadow-sm">
            <QrCode className="w-8 h-8 text-slate-700" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <div className="text-xs text-foreground mb-1" style={{ fontWeight: 700 }}>Report Verification</div>
            <div className="grid sm:grid-cols-2 gap-2 text-[11px] text-muted-foreground">
              <div><span style={{ fontWeight: 600 }}>Report ID:</span> {displayResult.reportId}</div>
              <div><span style={{ fontWeight: 600 }}>Version:</span> {displayResult.assessmentVersion}</div>
              <div><span style={{ fontWeight: 600 }}>Language:</span> English</div>
              <div><span style={{ fontWeight: 600 }}>Valid Until:</span> {displayResult.validUntil}</div>
            </div>
            <div className="mt-2 p-2 rounded-lg bg-white border border-border/40 text-[11px] font-mono text-slate-600">
              {displayResult.verificationCode}
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => {
            navigator.clipboard.writeText(displayResult.verificationCode);
            toast.success("Verification code copied.");
          }}>
            Copy Code
          </Button>
        </div>
      </Card>

      {/* Privacy & Visibility */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-4 h-4 text-slate-600" />
          <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>Privacy & Visibility</h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-4">
          {VISIBILITY_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                setVisibility(opt.value);
                toast.success(`Visibility changed to "${opt.label}"`);
              }}
              className={`flex items-start gap-2.5 p-3 rounded-xl border text-left transition-all ${
                visibility === opt.value
                  ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                  : "border-border/40 bg-white hover:border-primary/20"
              }`}
            >
              <opt.icon className={`w-4 h-4 mt-0.5 shrink-0 ${visibility === opt.value ? "text-primary" : "text-muted-foreground"}`} />
              <div>
                <div className={`text-xs ${visibility === opt.value ? "text-primary" : "text-foreground"}`} style={{ fontWeight: 700 }}>
                  {opt.label}
                </div>
                <div className="text-[10px] text-muted-foreground">{opt.desc}</div>
              </div>
            </button>
          ))}
        </div>
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/60">
          <Shield className="w-3.5 h-3.5 text-slate-600 mt-0.5 shrink-0" />
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Companies cannot use this assessment as the sole basis for a hiring decision. Consent is logged and you can revoke access at any time. Time-limited links expire automatically.
          </p>
        </div>
      </Card>

      {/* Recommended next */}
      {displayResult.recommendedAssessments.length > 0 && (
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <ArrowRight className="w-4 h-4 text-primary" />
            <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>Recommended Next Assessments</h3>
          </div>
          <div className="space-y-2">
            {displayResult.recommendedAssessments.map((id) => {
              const rec = ASSESSMENT_CENTER_ITEMS.find((a) => a.id === id);
              if (!rec) return null;
              return (
                <button
                  key={id}
                  onClick={() => navigate(`/assessment-center/${id}`)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl border border-border/30 hover:border-primary/30 hover:bg-primary/[0.02] transition-all text-left group"
                >
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${rec.color} flex items-center justify-center shrink-0`}>
                    <span className="text-white text-[10px]" style={{ fontWeight: 800 }}>{rec.iconLabel}</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-foreground" style={{ fontWeight: 600 }}>{rec.displayName}</div>
                    <div className="text-[11px] text-muted-foreground">{rec.familyShort} · {rec.estimatedMinutes} min</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                </button>
              );
            })}
          </div>
        </Card>
      )}

      {/* Bottom actions */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <Button variant="ghost" onClick={() => navigate("/assessment-center")}>
          <ArrowLeft className="w-4 h-4" />
          Back to Assessment Center
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => toast.message("You can retake this assessment anytime. Recommended waiting period: " + item.retakeRule)}>
            <RefreshCw className="w-4 h-4" />
            Retake Policy
          </Button>
          <Button variant="outline" onClick={() => setShowPdfModal(true)}>
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* PDF Modal */}
      {showPdfModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-foreground" style={{ fontWeight: 700 }}>Download PDF Report</h3>
                <p className="text-xs text-muted-foreground">English · Verified · {displayResult.validUntil}</p>
              </div>
            </div>
            <div className="space-y-2 mb-5 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Report ID</span>
                <span style={{ fontWeight: 600 }} className="font-mono text-foreground">{displayResult.reportId}</span>
              </div>
              <div className="flex justify-between">
                <span>Assessment</span>
                <span style={{ fontWeight: 600 }} className="text-foreground">{item.displayName}</span>
              </div>
              <div className="flex justify-between">
                <span>Language</span>
                <span style={{ fontWeight: 600 }} className="text-foreground">English</span>
              </div>
              <div className="flex justify-between">
                <span>Valid Until</span>
                <span style={{ fontWeight: 600 }} className="text-foreground">{displayResult.validUntil}</span>
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground mb-5 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/60">
              This PDF includes your full report, dimension scores, executive summary, verification QR code, and usage limitation statement. It is valid for use in professional applications for the validity period shown.
            </p>
            <div className="flex items-center gap-2">
              <Button className="flex-1" variant="gradient" onClick={() => {
                setShowPdfModal(false);
                toast.success("PDF report download started.");
              }}>
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
              <Button variant="outline" onClick={() => setShowPdfModal(false)}>
                Cancel
              </Button>
            </div>
          </motion.div>
        </div>
      )}
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
