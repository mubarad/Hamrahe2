import { useNavigate } from "react-router";
import {
  Sparkles, ArrowRight, CheckCircle2, Clock, AlertTriangle, ShieldCheck,
  Target, Briefcase, FileText, Play, RotateCcw, ChevronRight, Eye, ShieldAlert, Zap
} from "lucide-react";
import { useAIEngine } from "../../context/AIEngineContext";
import { motion } from "motion/react";

export function ForMeView() {
  const navigate = useNavigate();
  const {
    activeContext,
    goals,
    missions,
    cases,
    outputs,
    consentRecords,
    requestActionApproval,
    updateCaseStatus,
  } = useAIEngine();

  const primaryGoal = goals.find((g) => g.id === activeContext.activeGoalId) || goals[0];
  const activeCase = cases.find((c) => c.id === activeContext.activeCaseId) || cases[0];
  const pendingMissions = missions.filter((m) => m.status !== "completed");
  const recentOutputs = outputs.slice(0, 3);

  const handleExecutePrimaryNextAction = () => {
    if (!activeCase) return;
    requestActionApproval(
      `Submit Tailored Application Package to Snapp HR`,
      "Jobs Section / Snapp SuperApp Recruitment Case",
      ["Personal Profile", "Tailored Resume V2", "Digikala Employment Verification"],
      15,
      () => {
        updateCaseStatus(activeCase.id, "ready_to_execute", "Human approval granted. Package submitted to Snapp.");
      }
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. PRIMARY NEXT ACTION CARD */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
          <Sparkles className="w-80 h-80" />
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-200 uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Primary Next Action</span>
            </div>
            <span className="text-xs text-blue-100/80">Goal: {primaryGoal?.title || "Career Advancement"}</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold leading-tight">
              {activeContext.type === "personal"
                ? "Review & Approve Application Package for Senior Product Designer at Snapp"
                : "Shortlist Top 3 Verified Candidates for Senior Product Designer"}
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 max-w-2xl">
              {activeContext.type === "personal"
                ? "AI Engine matched your 4 years of verified Digikala experience with Snapp's design system requirements. Your tailored resume and cover note are ready for approval."
                : "3 candidates achieved >90% match with 100% verified employment claims at Digikala and Café Bazaar."}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-black/20 p-3 rounded-2xl border border-white/10 text-xs">
            <div>
              <span className="text-blue-200/70 text-[10px] block uppercase">Why Recommended</span>
              <span className="font-semibold text-white">Match Score 92%</span>
            </div>
            <div>
              <span className="text-blue-200/70 text-[10px] block uppercase">Data Sources</span>
              <span className="font-semibold text-white">Profile & HR Proof</span>
            </div>
            <div>
              <span className="text-blue-200/70 text-[10px] block uppercase">Estimated Effort</span>
              <span className="font-semibold text-white">2 Minutes</span>
            </div>
            <div>
              <span className="text-blue-200/70 text-[10px] block uppercase">Expected Outcome</span>
              <span className="font-semibold text-emerald-300">Interview Invitation</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handleExecutePrimaryNextAction}
                className="px-5 py-2.5 rounded-xl bg-white text-blue-900 text-xs font-bold hover:bg-blue-50 transition-all shadow-lg shadow-black/20 flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-blue-900" />
                <span>Review & Execute Action</span>
              </button>
              <button
                onClick={() => navigate("/ai-engine/cases")}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                View Case Timeline
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-blue-200">
              <button className="hover:underline cursor-pointer">Postpone</button>
              <span>•</span>
              <button className="hover:underline cursor-pointer">Dismiss</button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. THREE PRIORITIZED RECOMMENDED ACTIONS & ACTIVE GOALS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommended Actions (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              <span>Prioritized Recommendations</span>
            </h3>
            <button
              onClick={() => navigate("/ai-engine/tools")}
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <span>Explore All Tools</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {pendingMissions.map((ms, idx) => (
              <div
                key={ms.id}
                className="bg-white rounded-2xl p-4 border border-border/30 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    idx === 0 ? "bg-amber-100 text-amber-600" : idx === 1 ? "bg-blue-100 text-blue-600" : "bg-purple-100 text-purple-600"
                  }`}>
                    {ms.actionType === "verification" ? <ShieldCheck className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-foreground">{ms.title}</h4>
                      <span className="px-2 py-0.2 rounded-full text-[10px] font-semibold bg-muted text-muted-foreground">
                        {ms.expectedImpact}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{ms.reason}</p>
                    <div className="flex items-center gap-3 mt-2 text-[11px] text-muted-foreground">
                      <span>Effort: {ms.estimatedEffort}</span>
                      <span>•</span>
                      <span>Requires: {ms.evidenceRequired}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => ms.targetRoute && navigate(ms.targetRoute)}
                  className="shrink-0 px-3.5 py-1.5 rounded-xl border border-primary/30 text-primary hover:bg-primary/5 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Start Action</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Active Goals Summary (1 Col) */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
            <Target className="w-4 h-4 text-purple-600" />
            <span>Active Goal Progress</span>
          </h3>

          {primaryGoal && (
            <div className="bg-white rounded-2xl p-5 border border-border/30 shadow-sm space-y-4">
              <div>
                <span className="text-[10px] font-semibold text-purple-600 uppercase tracking-wider">Goal Focus</span>
                <h4 className="text-sm font-bold text-foreground">{primaryGoal.title}</h4>
                <p className="text-xs text-muted-foreground">Target: {primaryGoal.targetRole}</p>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-muted-foreground">Evidence Coverage</span>
                  <span className="text-primary">{primaryGoal.evidenceCoverage}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" style={{ width: `${primaryGoal.evidenceCoverage}%` }} />
                </div>
              </div>

              <div className="bg-muted/40 p-3 rounded-xl border border-border/20 text-xs space-y-1">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase">Next Milestone</span>
                <p className="font-bold text-foreground">{primaryGoal.nextMilestone}</p>
              </div>

              <button
                onClick={() => navigate("/ai-engine/goals")}
                className="w-full py-2 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 text-xs font-bold transition-all text-center cursor-pointer"
              >
                Manage Goal & Milestones
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3. OPEN CASES & SIGNALS REQUIRING ATTENTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Open Cases */}
        <div className="bg-white rounded-2xl p-5 border border-border/30 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-600" />
              <span>Active Work Cases</span>
            </h3>
            <button onClick={() => navigate("/ai-engine/cases")} className="text-xs font-semibold text-primary hover:underline">
              View All
            </button>
          </div>

          <div className="space-y-3">
            {cases.map((c) => (
              <div
                key={c.id}
                onClick={() => navigate("/ai-engine/cases")}
                className="p-3.5 rounded-xl border border-border/20 hover:border-primary/40 bg-muted/20 hover:bg-white transition-all cursor-pointer space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">{c.title}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    c.status === "approval_required" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
                  }`}>
                    {c.status.replace(/_/g, " ")}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">{c.objective}</p>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1 border-t border-border/20">
                  <span>Due: {c.dueDate || "Ongoing"}</span>
                  <span>Version {c.currentVersion}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Signals Requiring Attention */}
        <div className="bg-white rounded-2xl p-5 border border-border/30 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>Signals Requiring Attention</span>
          </h3>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/60 flex items-start gap-3">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <p className="font-bold text-amber-900">Unverified Employment Claim</p>
                <p className="text-amber-800">Your experience claim at Digikala is missing verified HR co-sign proof. Adding evidence boosts Trust Score by +15 pts.</p>
                <button
                  onClick={() => navigate("/ai-engine/verification")}
                  className="font-bold text-amber-900 hover:underline cursor-pointer"
                >
                  Verify Now →
                </button>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200/60 flex items-start gap-3">
              <Zap className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <p className="font-bold text-blue-900">AI Quota Status</p>
                <p className="text-blue-800">You have consumed 160 of 1,000 monthly credits. 840 credits remain active for August.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
