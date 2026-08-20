import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft, ArrowRight, Sparkles, Brain, Lightbulb, MessageSquare, Edit3,
  CheckCircle2, TrendingUp, Send, Save, Award, AlertCircle,
} from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { getPractice } from "../../data/learning-data";
import { AINativeBadge, PrivacyNotice } from "./shared";
import { toast } from "sonner";

type Step = 1 | 2 | 3 | 4 | 5 | 6;

const AI_LOGIN_OUTPUTS = [
  {
    id: "o1",
    title: "Variant A — Minimal Centered",
    note: "Centered card, single email + password, no separate company login.",
    issues: ["No path for company account", "Generic error message", "No password strength indicator"],
  },
  {
    id: "o2",
    title: "Variant B — Split Personal/Company",
    note: "Tabbed: Personal vs Company. Clear CTA hierarchy. Trust badges below fold.",
    issues: ["Tabs may be unclear on mobile", "Trust badges below fold", "Missing forgot-password emphasis"],
  },
  {
    id: "o3",
    title: "Variant C — Social-First",
    note: "Social login dominant, email is a fallback. Heavy reliance on third-party trust.",
    issues: ["Privacy concerns", "Slow for users without social accounts", "No company option visible"],
  },
];

const CRITIQUE_DIMS = [
  "Login path clarity",
  "Personal vs company differentiation",
  "CTA hierarchy",
  "Error states",
  "Trust signals",
  "Simplicity",
  "Accessibility",
  "Visual hierarchy",
  "Brand consistency",
];

export function UnitPage() {
  const { unitId } = useParams();
  const navigate = useNavigate();
  const practice = getPractice(unitId || "");

  const [step, setStep] = useState<Step>(1);
  const [prompt, setPrompt] = useState("Generate 3 login page structures: 1) minimal personal, 2) tabbed personal/company, 3) social-first.");
  const [selectedOutput, setSelectedOutput] = useState<string | null>(null);
  const [critique, setCritique] = useState("");
  const [revision, setRevision] = useState("");

  if (!practice) {
    return (
      <div className="max-w-[800px] mx-auto py-12 text-center">
        <p className="text-muted-foreground">Practice unit not found.</p>
        <Button className="mt-4" onClick={() => navigate("/learning")}>Back to Learning</Button>
      </div>
    );
  }

  return (
    <div className="max-w-[960px] mx-auto space-y-5">
      <button
        onClick={() => navigate(`/learning/paths/${practice.pathId}`)}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Career Path
      </button>

      {/* Hero */}
      <Card className="bg-gradient-to-br from-violet-50/40 via-white to-primary/5 border-violet-200/40">
        <div className="flex items-start gap-4 flex-wrap">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shrink-0">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1 min-w-[260px]">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <AINativeBadge />
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground" style={{ fontWeight: 600 }}>{practice.unitType}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground" style={{ fontWeight: 600 }}>{practice.durationMin} min</span>
            </div>
            <h1 className="text-foreground mb-1" style={{ fontWeight: 700, fontSize: 22 }}>{practice.title}</h1>
            <p className="text-sm text-muted-foreground">{practice.description}</p>
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-1 mt-5">
          {[1, 2, 3, 4, 5, 6].map((s) => (
            <div key={s} className="flex-1">
              <div className={`h-1.5 rounded-full transition-all ${s <= step ? "bg-gradient-to-r from-primary to-violet-500" : "bg-muted/40"}`} />
              <div className={`text-[10px] mt-1.5 text-center ${s === step ? "text-primary" : "text-muted-foreground"}`} style={{ fontWeight: 600 }}>
                Step {s}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
        >
          {step === 1 && (
            <Card>
              <StepHeader icon={<Lightbulb className="w-5 h-5 text-amber-600" />} title="Step 1 — Understand the Logic" />
              <div className="text-sm text-foreground/90 leading-relaxed space-y-3 mb-5">
                <p>
                  <span style={{ fontWeight: 700 }}>What makes a login page effective?</span> Login is a high-stakes,
                  zero-creativity surface. The user's only goal is to access their account. Every gram of friction matters.
                </p>
                <p>An effective login page does five things:</p>
                <ol className="list-decimal pl-5 space-y-1.5 text-sm">
                  <li>Makes the primary path obvious within 500ms.</li>
                  <li>Handles different account types without forcing the user to think.</li>
                  <li>Catches errors inline and tells the user how to recover.</li>
                  <li>Signals trust without screaming it.</li>
                  <li>Provides an escape hatch for forgotten credentials.</li>
                </ol>
              </div>
              <Button variant="gradient" onClick={() => setStep(2)}>
                I'm ready to use AI <ArrowRight className="w-4 h-4" />
              </Button>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <StepHeader icon={<Sparkles className="w-5 h-5 text-violet-600" />} title="Step 2 — Use AI" />
              <p className="text-sm text-muted-foreground mb-3">Describe what you want and generate 3 login page structures.</p>

              <label className="text-xs text-foreground block mb-1.5" style={{ fontWeight: 600 }}>Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full p-3 rounded-xl border border-border/40 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                rows={3}
              />

              <Button variant="gradient" className="mt-3" onClick={() => toast.success("AI generated 3 outputs below.")}>
                <Send className="w-4 h-4" /> Generate
              </Button>

              <div className="text-xs text-muted-foreground mt-5 mb-2" style={{ fontWeight: 700, letterSpacing: 0.3 }}>AI OUTPUTS</div>
              <div className="space-y-2.5">
                {AI_LOGIN_OUTPUTS.map((o) => (
                  <div key={o.id} className="p-3 rounded-xl border border-border/40 bg-white">
                    <div className="text-sm text-foreground mb-1" style={{ fontWeight: 700 }}>{o.title}</div>
                    <p className="text-xs text-muted-foreground">{o.note}</p>
                  </div>
                ))}
              </div>

              <Button className="mt-4" variant="gradient" onClick={() => setStep(3)}>
                Critique the outputs <ArrowRight className="w-4 h-4" />
              </Button>
            </Card>
          )}

          {step === 3 && (
            <Card>
              <StepHeader icon={<MessageSquare className="w-5 h-5 text-primary" />} title="Step 3 — Critique" />
              <p className="text-sm text-muted-foreground mb-4">Select the AI output you want to critique, then evaluate it across the dimensions below.</p>

              <div className="grid sm:grid-cols-3 gap-2.5 mb-5">
                {AI_LOGIN_OUTPUTS.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => setSelectedOutput(o.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${selectedOutput === o.id ? "border-primary bg-primary/5" : "border-border/40 hover:border-primary/40"}`}
                  >
                    <div className="text-sm text-foreground mb-1" style={{ fontWeight: 600 }}>{o.title}</div>
                    <p className="text-[11px] text-muted-foreground line-clamp-2">{o.note}</p>
                  </button>
                ))}
              </div>

              <div className="text-xs text-foreground mb-2" style={{ fontWeight: 700 }}>Evaluate across these dimensions</div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {CRITIQUE_DIMS.map((d) => (
                  <span key={d} className="text-[11px] px-2.5 py-1 rounded-md bg-muted/60 text-muted-foreground" style={{ fontWeight: 600 }}>
                    {d}
                  </span>
                ))}
              </div>

              <label className="text-xs text-foreground block mb-1.5" style={{ fontWeight: 600 }}>Your critique</label>
              <textarea
                value={critique}
                onChange={(e) => setCritique(e.target.value)}
                placeholder="What works, what doesn't, and why. Reference the dimensions above."
                className="w-full p-3 rounded-xl border border-border/40 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                rows={5}
              />

              <Button className="mt-4" variant="gradient" disabled={!selectedOutput || critique.length < 20} onClick={() => setStep(4)}>
                Improve the output <ArrowRight className="w-4 h-4" />
              </Button>
            </Card>
          )}

          {step === 4 && (
            <Card>
              <StepHeader icon={<Edit3 className="w-5 h-5 text-emerald-600" />} title="Step 4 — Improve" />
              <p className="text-sm text-muted-foreground mb-4">Take the AI output you critiqued and revise it. Describe what you changed and why.</p>

              <textarea
                value={revision}
                onChange={(e) => setRevision(e.target.value)}
                placeholder="My revision: I changed [X] to [Y] because [reason]..."
                className="w-full p-3 rounded-xl border border-border/40 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                rows={6}
              />

              <Button className="mt-4" variant="gradient" disabled={revision.length < 20} onClick={() => setStep(5)}>
                Get AI Feedback <ArrowRight className="w-4 h-4" />
              </Button>
            </Card>
          )}

          {step === 5 && (
            <div className="space-y-3">
              <Card className="bg-gradient-to-br from-violet-50/40 to-white border-violet-200/60">
                <StepHeader icon={<Brain className="w-5 h-5 text-violet-600" />} title="Step 5 — AI Feedback" />
                <div className="space-y-3">
                  <FeedbackBlock kind="strength" title="Strengths">
                    <ul className="text-sm text-foreground/90 space-y-1.5">
                      <li>• Identified the company vs personal mismatch correctly.</li>
                      <li>• Strong reasoning about CTA hierarchy.</li>
                      <li>• Revision proposes inline validation — high impact.</li>
                    </ul>
                  </FeedbackBlock>
                  <FeedbackBlock kind="weakness" title="Weaknesses">
                    <ul className="text-sm text-foreground/90 space-y-1.5">
                      <li>• Accessibility (label contrast, focus rings) not addressed.</li>
                      <li>• Error recovery flow is mentioned but not specified.</li>
                    </ul>
                  </FeedbackBlock>
                  <FeedbackBlock kind="suggestion" title="Suggested Improvements">
                    <ul className="text-sm text-foreground/90 space-y-1.5">
                      <li>• Specify the contrast ratio target (4.5:1 minimum).</li>
                      <li>• Detail the error recovery: which fields, which message, where.</li>
                      <li>• Add a trust signal placement decision (above vs below fold).</li>
                    </ul>
                  </FeedbackBlock>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-border/40">
                    <div>
                      <div className="text-xs text-muted-foreground mb-0.5" style={{ fontWeight: 700, letterSpacing: 0.3 }}>RUBRIC SCORE</div>
                      <div className="text-foreground" style={{ fontWeight: 700, fontSize: 20 }}>74 / 100</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-emerald-700" style={{ fontWeight: 700 }}>+6 from initial critique</div>
                      <div className="text-[11px] text-muted-foreground">Revision moved score up</div>
                    </div>
                  </div>
                </div>
              </Card>

              <Button variant="gradient" onClick={() => setStep(6)}>
                See your progress <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-3">
              <Card className="bg-gradient-to-br from-emerald-50/60 to-white border-emerald-200/60">
                <StepHeader icon={<TrendingUp className="w-5 h-5 text-emerald-600" />} title="Step 6 — Progress" />
                <div className="grid sm:grid-cols-2 gap-2 mb-4">
                  {[
                    { l: "UI Reasoning", d: 5 },
                    { l: "AI-Assisted Design", d: 4 },
                    { l: "Product Designer Readiness", d: 3 },
                    { l: "Application Readiness · 2 saved jobs", d: 4 },
                  ].map((it) => (
                    <div key={it.l} className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
                      <span className="text-sm text-emerald-900">{it.l}</span>
                      <span className="text-sm text-emerald-700" style={{ fontWeight: 700 }}>+{it.d}%</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span className="text-sm text-amber-800">
                    Certificate progress: <span style={{ fontWeight: 700 }}>AI-Augmented UI Design Readiness · 38%</span>
                  </span>
                </div>
              </Card>

              <div className="flex items-center gap-2 flex-wrap">
                <Button variant="gradient" onClick={() => { toast.success("Saved. Continue with the next recommended unit."); navigate(`/learning/paths/${practice.pathId}`); }}>
                  <ArrowRight className="w-4 h-4" />
                  Continue Practice
                </Button>
                <Button variant="outline" onClick={() => toast.success("Saved to your work samples.")}>
                  <Save className="w-4 h-4" />
                  Save as Work Sample
                </Button>
                <Button variant="ghost" onClick={() => navigate("/learning/assessments/ai-ui-critique")}>
                  <Brain className="w-4 h-4" />
                  Send to Assessment
                </Button>
              </div>

              <PrivacyNotice>
                Your AI feedback, revisions, and rubric scores are private. Save as a work sample to share publicly on your profile when you're ready.
              </PrivacyNotice>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function StepHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="w-9 h-9 rounded-xl bg-white border border-border/40 flex items-center justify-center">{icon}</div>
      <h2 className="text-foreground" style={{ fontWeight: 700, fontSize: 17 }}>{title}</h2>
    </div>
  );
}

function FeedbackBlock({ kind, title, children }: { kind: "strength" | "weakness" | "suggestion"; title: string; children: React.ReactNode }) {
  const styles = {
    strength: { bg: "bg-emerald-50/50", border: "border-emerald-200", text: "text-emerald-700", icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" /> },
    weakness: { bg: "bg-amber-50/50", border: "border-amber-200", text: "text-amber-700", icon: <AlertCircle className="w-4 h-4 text-amber-600" /> },
    suggestion: { bg: "bg-primary/5", border: "border-primary/20", text: "text-primary", icon: <Lightbulb className="w-4 h-4 text-primary" /> },
  }[kind];
  return (
    <div className={`p-3 rounded-xl border ${styles.bg} ${styles.border}`}>
      <div className="flex items-center gap-1.5 mb-2">
        {styles.icon}
        <span className={`text-xs ${styles.text}`} style={{ fontWeight: 700 }}>{title}</span>
      </div>
      {children}
    </div>
  );
}
