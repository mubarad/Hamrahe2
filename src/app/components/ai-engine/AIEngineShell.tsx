import { useState, useRef, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import {
  Sparkles, Bot, Layers, Target, BarChart3, ShieldCheck, Briefcase,
  FileText, Shield, Zap, ChevronDown, Check,
  Building2, Rocket, X, Lock, Play
} from "lucide-react";
import { useAIEngine } from "../../context/AIEngineContext";
import { motion, AnimatePresence } from "motion/react";

import { getPublishedWorkflows } from "../../data/workflow-registry";

const AI_ENGINE_TABS = [
  { path: "/ai-engine/for-me", label: "For Me", icon: Sparkles },
  { path: "/ai-engine/assistant", label: "Assistant", icon: Bot },
  { path: "/ai-engine/tools", label: "Workflows", icon: Layers },
  { path: "/ai-engine/goals", label: "Goals", icon: Target },
  { path: "/ai-engine/analytics", label: "Analytics", icon: BarChart3 },
  { path: "/ai-engine/verification", label: "Verification & Evidence", icon: ShieldCheck },
  { path: "/ai-engine/cases", label: "Cases", icon: Briefcase },
  { path: "/ai-engine/outputs", label: "Outputs", icon: FileText },
  { path: "/ai-engine/memory", label: "Memory & Permissions", icon: Shield },
  { path: "/ai-engine/quota", label: "Usage", icon: Zap },
];

export function AIEngineShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    activeContext,
    switchContext,
    allContexts,
    goals,
    actionPreviewModal,
    closeActionPreviewModal,
    openContextualAssistant,
  } = useAIEngine();

  const [contextDropdownOpen, setContextDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setContextDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeGoal = goals.find((g) => g.id === activeContext.activeGoalId) || goals[0];

  const handleTabClick = (path: string) => {
    navigate(path);
  };

  const publishedCount = getPublishedWorkflows().length;

  return (
    <div className="space-y-4">
      {/* ── COMPACT AI ENGINE HEADER (integrated with Hamrahe design) ── */}
      <div className="bg-card border border-border/30 rounded-2xl px-5 py-3.5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Identity */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary/80 to-primary flex items-center justify-center shadow-sm">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold text-foreground">AI Engine</h1>
                {activeGoal && (
                  <button
                    onClick={() => navigate("/ai-engine/goals")}
                    className="hidden md:flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/8 border border-primary/15 text-[11px] font-medium text-primary cursor-pointer hover:bg-primary/12 transition-colors"
                  >
                    <Target className="w-3 h-3" />
                    <span className="truncate max-w-[160px]">{activeGoal.title}</span>
                  </button>
                )}
              </div>
              <p className="text-[11px] text-muted-foreground leading-tight">{activeContext.name} · {activeContext.subtitle}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Context Switcher */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setContextDropdownOpen(!contextDropdownOpen)}
                className="flex items-center gap-2 bg-muted/50 hover:bg-muted border border-border/30 px-3 py-1.5 rounded-xl cursor-pointer transition-all text-xs"
              >
                <div className="w-5 h-5 rounded-full overflow-hidden bg-muted flex items-center justify-center shrink-0">
                  {activeContext.type === "personal" ? (
                    <img src={activeContext.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : activeContext.type === "startup" ? (
                    <Rocket className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <Building2 className="w-3 h-3 text-primary" />
                  )}
                </div>
                <span className="font-medium text-foreground hidden sm:block">{activeContext.type === "personal" ? "Personal" : activeContext.name}</span>
                <ChevronDown className={`w-3 h-3 text-muted-foreground transition-transform ${contextDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {contextDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.12 }}
                    className="absolute right-0 top-full mt-2 w-72 bg-card border border-border/40 rounded-2xl shadow-xl z-50 overflow-hidden"
                  >
                    <div className="px-4 py-2.5 border-b border-border/20">
                      <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Switch Context</p>
                    </div>
                    <div className="p-1.5 space-y-1">
                      {allContexts.map((ctx) => {
                        const isSelected = ctx.id === activeContext.id;
                        return (
                          <button
                            key={ctx.id}
                            onClick={() => { switchContext(ctx.id); setContextDropdownOpen(false); }}
                            className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-colors text-left cursor-pointer ${isSelected ? "bg-primary/8 border border-primary/20 text-foreground" : "hover:bg-muted/60 text-foreground"}`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center overflow-hidden shrink-0">
                                {ctx.type === "personal" ? (
                                  <img src={ctx.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                ) : ctx.type === "startup" ? (
                                  <Rocket className="w-3.5 h-3.5 text-emerald-600" />
                                ) : (
                                  <Building2 className="w-3.5 h-3.5 text-primary" />
                                )}
                              </div>
                              <div>
                                <p className="text-xs font-semibold leading-tight">{ctx.name}</p>
                                <p className="text-[10px] text-muted-foreground">{ctx.subtitle}</p>
                              </div>
                            </div>
                            {isSelected && <Check className="w-4 h-4 text-primary" />}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quota */}
            <button
              onClick={() => navigate("/ai-engine/quota")}
              className="flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200/60 px-2.5 py-1.5 rounded-xl cursor-pointer transition-all text-xs text-amber-700 font-semibold"
            >
              <Zap className="w-3 h-3 text-amber-500" />
              <span className="hidden sm:block">{activeContext.quotaRemaining}</span>
            </button>

          </div>
        </div>
      </div>

      {/* Internal AI Engine Sub-navigation */}
      <div className="bg-card rounded-2xl p-1.5 border border-border/30 shadow-sm flex items-center gap-1 overflow-x-auto scrollbar-none">
        {AI_ENGINE_TABS.map((tab) => {
          const isActive = location.pathname === tab.path || (tab.path === "/ai-engine/for-me" && location.pathname === "/ai-engine");
          const badge = tab.label === "Workflows" ? String(publishedCount) : undefined;
          return (
            <button
              key={tab.path}
              onClick={() => handleTabClick(tab.path)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-primary text-white shadow-sm shadow-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              }`}
            >
              <tab.icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-muted-foreground"}`} />
              <span>{tab.label}</span>
              {badge && (
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${isActive ? "bg-white/20 text-white" : "bg-primary/10 text-primary"}`}>
                  {badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Sub-view Content Area */}
      <div className="min-h-[500px]">
        <Outlet />
      </div>

      {/* ACTION PREVIEW & HUMAN APPROVAL MODAL */}
      <AnimatePresence>
        {actionPreviewModal.isOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-border/30 space-y-5"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">Human Approval Required</h3>
                    <p className="text-xs text-muted-foreground">AI Engine Sensitive Action Preview</p>
                  </div>
                </div>
                <button
                  onClick={closeActionPreviewModal}
                  className="p-1.5 rounded-full hover:bg-muted text-muted-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-muted/40 rounded-2xl p-4 border border-border/20 space-y-3">
                <div>
                  <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">Action</span>
                  <p className="text-sm font-bold text-foreground">{actionPreviewModal.actionName}</p>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">Destination Section</span>
                  <p className="text-xs font-semibold text-primary">{actionPreviewModal.destination}</p>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">Data Disclosed</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {actionPreviewModal.dataDisclosed.map((d, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-white border border-border/30 text-[11px] text-foreground">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-border/20">
                  <span className="text-muted-foreground">Estimated Quota Cost</span>
                  <span className="font-bold text-amber-600">{actionPreviewModal.quotaCost} Credits</span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200/60 rounded-2xl p-3 flex items-start gap-2 text-xs text-blue-800">
                <Lock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <p>
                  No external message or data modification will happen automatically without this explicit confirmation.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={closeActionPreviewModal}
                  className="px-4 py-2.5 rounded-xl border border-border/40 text-xs font-semibold hover:bg-muted transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={actionPreviewModal.onConfirm}
                  className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-all shadow-md shadow-primary/20 flex items-center gap-2 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Confirm & Execute Action</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
