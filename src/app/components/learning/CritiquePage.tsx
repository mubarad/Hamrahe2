import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { motion } from "motion/react";
import {
  ArrowLeft, Sparkles, CheckCircle2, AlertCircle, Brain, TrendingUp,
  GitCompare, Lightbulb, Send, Save, ArrowRight, Lock, User as UserIcon,
} from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { getPractice, CRITIQUE_CHECKLIST } from "../../data/learning-data";
import { AINativeBadge, PrivacyNotice, ReadinessRing } from "./shared";
import { toast } from "sonner";

export function CritiquePage() {
  const { unitId } = useParams();
  const navigate = useNavigate();
  const practice = getPractice(unitId || "") ?? {
    id: "login-critique",
    title: "Login Form Critique Practice",
    pathId: "product-designer",
    unitType: "Critique" as const,
    durationMin: 12,
    difficulty: "Practice" as const,
    skills: [],
    description: "",
    recommended: true,
    completed: false,
  };

  const [checked, setChecked] = useState<Record<string, "good" | "weak" | "missing" | null>>({});
  const [reasoning, setReasoning] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const toggle = (item: string, value: "good" | "weak" | "missing") => {
    setChecked((c) => ({ ...c, [item]: c[item] === value ? null : value }));
  };

  const completedCount = Object.values(checked).filter((v) => v !== null).length;
  const ready = completedCount >= 6 && reasoning.length >= 30;

  return (
    <div className="max-w-[1100px] mx-auto space-y-5">
      <button
        onClick={() => navigate(`/learning/paths/${practice.pathId}`)}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Career Path
      </button>

      <Card className="bg-gradient-to-br from-violet-50/40 via-white to-primary/5 border-violet-200/40">
        <div className="flex items-start gap-4 flex-wrap">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shrink-0">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <AINativeBadge />
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground" style={{ fontWeight: 600 }}>AI Output Critique</span>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground" style={{ fontWeight: 600 }}>{practice.durationMin} min</span>
            </div>
            <h1 className="text-foreground mb-1" style={{ fontWeight: 700, fontSize: 22 }}>{practice.title}</h1>
            <p className="text-sm text-muted-foreground">
              You'll critique an AI-generated login form. Your judgment trains your eye — and trains the AI feedback loop.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-5">
        {/* AI Output Preview */}
        <Card padding={false} className="overflow-hidden">
          <div className="p-3 border-b border-border/30 bg-muted/40 flex items-center justify-between">
            <div className="text-xs text-muted-foreground" style={{ fontWeight: 700, letterSpacing: 0.3 }}>AI-GENERATED OUTPUT</div>
            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-violet-100 text-violet-700" style={{ fontWeight: 600 }}>Variant B</span>
          </div>
          <div className="p-6 bg-gradient-to-br from-slate-50 to-white">
            {/* Mock login UI */}
            <div className="max-w-[320px] mx-auto bg-white rounded-2xl shadow-sm border border-border/30 p-6">
              <div className="text-center mb-5">
                <div className="w-10 h-10 mx-auto rounded-xl bg-gradient-to-br from-primary to-violet-500 mb-3" />
                <div className="text-foreground mb-0.5" style={{ fontWeight: 700, fontSize: 18 }}>Welcome back</div>
                <div className="text-xs text-muted-foreground">Sign in to your account</div>
              </div>

              <div className="flex gap-1 mb-4 p-1 bg-muted/40 rounded-xl">
                <button className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-white shadow-sm" style={{ fontWeight: 600 }}>Personal</button>
                <button className="flex-1 px-3 py-1.5 text-xs text-muted-foreground" style={{ fontWeight: 500 }}>Company</button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-[10px] text-muted-foreground" style={{ fontWeight: 600 }}>EMAIL</label>
                  <div className="mt-1 p-2.5 rounded-lg border border-border/40 bg-white text-xs text-muted-foreground/70">you@example.com</div>
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground" style={{ fontWeight: 600 }}>PASSWORD</label>
                  <div className="mt-1 p-2.5 rounded-lg border border-border/40 bg-white text-xs text-muted-foreground/70 flex items-center gap-2">
                    <Lock className="w-3 h-3" />
                    ••••••••
                  </div>
                </div>
                <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-primary to-violet-500 text-white text-xs" style={{ fontWeight: 600 }}>
                  Sign In
                </button>
                <div className="text-center text-[10px] text-muted-foreground">Forgot password?</div>
              </div>
            </div>

            <div className="mt-5 p-3 rounded-xl bg-amber-50/60 border border-amber-200">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-3.5 h-3.5 text-amber-600 mt-0.5" />
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  AI generated this variant. It hasn't been reviewed by a human. Your job: find what's missing, weak, or wrong.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Critique Panel */}
        <div className="space-y-4">
          <Card>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>Critique Checklist</h3>
              <div className="text-[11px] text-muted-foreground">{completedCount} / {CRITIQUE_CHECKLIST.length}</div>
            </div>
            <div className="space-y-2">
              {CRITIQUE_CHECKLIST.map((item) => (
                <div key={item} className="flex items-center justify-between p-2.5 rounded-xl bg-muted/30">
                  <span className="text-sm text-foreground">{item}</span>
                  <div className="flex items-center gap-1">
                    {(["good", "weak", "missing"] as const).map((v) => (
                      <button
                        key={v}
                        onClick={() => toggle(item, v)}
                        className={`text-[10px] px-2 py-1 rounded-md transition-all ${
                          checked[item] === v
                            ? v === "good"
                              ? "bg-emerald-500 text-white"
                              : v === "weak"
                              ? "bg-amber-500 text-white"
                              : "bg-red-500 text-white"
                            : "bg-white border border-border/40 text-muted-foreground hover:bg-muted/60"
                        }`}
                        style={{ fontWeight: 600 }}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-sm text-foreground mb-2" style={{ fontWeight: 700 }}>Your reasoning</h3>
            <p className="text-xs text-muted-foreground mb-2">
              Explain your decisions. Tie each to a user impact (recovery, trust, accessibility, conversion).
            </p>
            <textarea
              value={reasoning}
              onChange={(e) => setReasoning(e.target.value)}
              placeholder="The CTA hierarchy is strong, but the company tab is too easily missed. The error handling..."
              rows={6}
              className="w-full p-3 rounded-xl border border-border/40 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
            />
            <Button variant="gradient" className="mt-3 w-full" disabled={!ready} onClick={() => { setSubmitted(true); toast.success("Critique submitted. AI feedback ready below."); }}>
              <Send className="w-4 h-4" />
              Submit Critique
            </Button>
          </Card>
        </div>
      </div>

      {/* AI Feedback */}
      {submitted && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <Card className="bg-gradient-to-br from-violet-50/40 to-white border-violet-200/60">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-5 h-5 text-violet-600" />
              <h3 className="text-foreground" style={{ fontWeight: 700, fontSize: 17 }}>AI Feedback Panel</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-3 mb-4">
              <FeedbackTile kind="good" title="Strong calls" items={["Correctly flagged company tab visibility", "Tied CTA hierarchy to conversion", "Spotted missing inline validation"]} />
              <FeedbackTile kind="weak" title="Missed nuance" items={["Accessibility wasn't fully evaluated", "Trust signal placement not addressed", "No comment on focus order"]} />
              <FeedbackTile kind="suggest" title="Suggested improvements" items={["Specify 4.5:1 contrast for labels", "Define error recovery flow", "Decide on trust signal location"]} />
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-white border border-border/40">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs text-muted-foreground" style={{ fontWeight: 700, letterSpacing: 0.3 }}>RUBRIC SCORE</div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700" style={{ fontWeight: 600 }}>Improving</span>
                </div>
                <ReadinessRing value={74} size={80} stroke={8} />
                <p className="text-[11px] text-muted-foreground mt-3">
                  Strong logic, room for accessibility-first thinking. Re-critique after Accessibility Basics for a higher score.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-border/40">
                <div className="flex items-center gap-2 mb-2">
                  <GitCompare className="w-4 h-4 text-primary" />
                  <div className="text-xs text-muted-foreground" style={{ fontWeight: 700, letterSpacing: 0.3 }}>REVISION COMPARISON</div>
                </div>
                <div className="space-y-1.5 text-xs">
                  <CompareRow before="Generic error message" after="Inline, field-specific" />
                  <CompareRow before="Company tab equal weight" after="Stronger company tab" />
                  <CompareRow before="Trust below fold" after="Trust badges visible" />
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-emerald-50/60 border-emerald-200/60">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>Readiness Impact</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-2">
              {[
                { l: "UI Reasoning", d: 5 },
                { l: "AI-Assisted Design", d: 4 },
                { l: "Product Designer Readiness", d: 3 },
                { l: "Application Readiness · 2 saved jobs", d: 4 },
              ].map((it) => (
                <div key={it.l} className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-emerald-200">
                  <span className="text-sm text-emerald-900">{it.l}</span>
                  <span className="text-sm text-emerald-700" style={{ fontWeight: 700 }}>+{it.d}%</span>
                </div>
              ))}
            </div>
          </Card>

          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="gradient" onClick={() => navigate("/learning/unit/login-design")}>
              <ArrowRight className="w-4 h-4" />
              Continue with Practice Unit
            </Button>
            <Button variant="outline" onClick={() => toast.success("Saved to work samples.")}>
              <Save className="w-4 h-4" />
              Save as Work Sample
            </Button>
            <Button variant="ghost" onClick={() => navigate("/learning/assessments/ai-ui-critique")}>
              <Brain className="w-4 h-4" />
              Send to Assessment
            </Button>
          </div>
        </motion.div>
      )}

      <PrivacyNotice>
        Critique submissions, AI feedback, and rubric scores are private. Save as a work sample to share on your profile when you're ready.
      </PrivacyNotice>
    </div>
  );
}

function FeedbackTile({ kind, title, items }: { kind: "good" | "weak" | "suggest"; title: string; items: string[] }) {
  const styles = {
    good: { bg: "bg-emerald-50/60", border: "border-emerald-200", text: "text-emerald-700", icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> },
    weak: { bg: "bg-amber-50/60", border: "border-amber-200", text: "text-amber-700", icon: <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> },
    suggest: { bg: "bg-primary/5", border: "border-primary/20", text: "text-primary", icon: <Lightbulb className="w-3.5 h-3.5 text-primary" /> },
  }[kind];
  return (
    <div className={`p-3 rounded-xl border ${styles.bg} ${styles.border}`}>
      <div className="flex items-center gap-1.5 mb-2">
        {styles.icon}
        <span className={`text-xs ${styles.text}`} style={{ fontWeight: 700 }}>{title}</span>
      </div>
      <ul className="space-y-1">
        {items.map((it, i) => (
          <li key={i} className="text-xs text-foreground/90">• {it}</li>
        ))}
      </ul>
    </div>
  );
}

function CompareRow({ before, after }: { before: string; after: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="px-1.5 py-0.5 rounded bg-red-50 text-red-700 text-[10px]" style={{ fontWeight: 600 }}>BEFORE</span>
      <span className="text-foreground line-through opacity-60 truncate">{before}</span>
      <ArrowRight className="w-3 h-3 text-muted-foreground/50 shrink-0" />
      <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px]" style={{ fontWeight: 600 }}>AFTER</span>
      <span className="text-foreground truncate">{after}</span>
    </div>
  );
}
