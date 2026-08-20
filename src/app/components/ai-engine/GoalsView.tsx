import { useState } from "react";
import {
  Target, Plus, CheckCircle2, Clock, Sparkles, ArrowRight, Briefcase,
  ShieldCheck, GraduationCap, ChevronRight, X, Play
} from "lucide-react";
import { useAIEngine } from "../../context/AIEngineContext";
import { Goal } from "../../data/ai-engine-data";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";

export function GoalsView() {
  const navigate = useNavigate();
  const { goals, missions, createGoal, activeContext } = useAIEngine();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newTargetRole, setNewTargetRole] = useState("");
  const [newTimeframe, setNewTimeframe] = useState("Q4 2026");

  const activeGoals = goals.filter((g) => g.contextId === activeContext.id);

  const handleCreateGoalSubmit = () => {
    if (!newTitle.trim()) return;
    createGoal({
      title: newTitle,
      targetRole: newTargetRole || "Senior Lead Role",
      timeframe: newTimeframe,
      priority: "high",
    });
    setCreateModalOpen(false);
    setNewTitle("");
    setNewTargetRole("");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-5 border border-border/30 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-foreground">Goals & Growth Missions</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-700">
              Active Strategy
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Structured career and organizational outcomes connected to concrete platform events and evidence.
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-primary/20"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Goal</span>
        </button>
      </div>

      {/* Goals List */}
      <div className="space-y-6">
        {activeGoals.map((goal) => (
          <div key={goal.id} className="bg-white rounded-2xl p-6 border border-border/30 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border/20">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700 uppercase">
                    {goal.goalType}
                  </span>
                  <span className="text-xs font-semibold text-muted-foreground">• Target: {goal.timeframe}</span>
                </div>
                <h3 className="text-base font-bold text-foreground">{goal.title}</h3>
                <p className="text-xs text-muted-foreground">Target Role / Outcome: {goal.targetRole}</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[10px] text-muted-foreground block font-semibold">Evidence Coverage</span>
                  <span className="text-sm font-bold text-primary">{goal.evidenceCoverage}%</span>
                </div>
                <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary flex items-center justify-center text-[10px] font-bold text-primary">
                  {goal.evidenceCoverage}%
                </div>
              </div>
            </div>

            {/* Milestone Timeline */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider text-muted-foreground">
                Milestone Roadmap
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {goal.milestones.map((m, idx) => (
                  <div
                    key={m.id}
                    className={`p-3 rounded-xl border text-xs space-y-1.5 ${
                      m.completed ? "bg-emerald-50/60 border-emerald-200 text-emerald-900" : "bg-muted/30 border-border/30 text-foreground"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[10px] text-muted-foreground">Milestone {idx + 1}</span>
                      {m.completed ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Clock className="w-3.5 h-3.5 text-muted-foreground" />}
                    </div>
                    <p className="font-bold text-xs">{m.title}</p>
                    <span className="text-[10px] text-muted-foreground block">Due: {m.dueDate}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Connected Growth Missions */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider text-muted-foreground">
                Active Growth Missions
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {missions.filter((ms) => ms.goalId === goal.id).map((ms) => (
                  <div key={ms.id} className="p-3.5 rounded-xl border border-border/20 bg-muted/20 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-foreground">{ms.title}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-primary/10 text-primary">
                        {ms.expectedImpact}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{ms.reason}</p>
                    <div className="flex items-center justify-between pt-1 text-[11px] text-muted-foreground">
                      <span>Effort: {ms.estimatedEffort}</span>
                      <button
                        onClick={() => ms.targetRoute && navigate(ms.targetRoute)}
                        className="text-primary font-bold hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <span>Execute Mission</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE GOAL MODAL */}
      <AnimatePresence>
        {createModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-border/30 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-foreground">Create New Goal</h3>
                <button onClick={() => setCreateModalOpen(false)} className="p-1 rounded-full hover:bg-muted">
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-foreground block mb-1">Goal Title</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Become Senior Design Lead at Snapp"
                    className="w-full p-2.5 rounded-xl border border-border/30 bg-muted/20"
                  />
                </div>

                <div>
                  <label className="font-bold text-foreground block mb-1">Target Role / Outcome</label>
                  <input
                    type="text"
                    value={newTargetRole}
                    onChange={(e) => setNewTargetRole(e.target.value)}
                    placeholder="e.g. Lead Product Designer"
                    className="w-full p-2.5 rounded-xl border border-border/30 bg-muted/20"
                  />
                </div>

                <div>
                  <label className="font-bold text-foreground block mb-1">Timeframe</label>
                  <select
                    value={newTimeframe}
                    onChange={(e) => setNewTimeframe(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-border/30 bg-muted/20"
                  >
                    <option value="Q3 2026">Q3 2026</option>
                    <option value="Q4 2026">Q4 2026</option>
                    <option value="2027">2027</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-border/30 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateGoalSubmit}
                  className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90"
                >
                  Save Goal
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
