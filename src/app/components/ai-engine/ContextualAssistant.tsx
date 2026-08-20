import { useState } from "react";
import {
  Sparkles, X, Bot, ShieldCheck, ArrowRight, Save, Play, Lock, CheckCircle2, FileText, Send
} from "lucide-react";
import { useAIEngine } from "../../context/AIEngineContext";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

export function ContextualAssistant() {
  const {
    contextualDrawerOpen,
    setContextualDrawerOpen,
    contextualPageContext,
    activeContext,
    saveOutputArtifact,
    requestActionApproval,
  } = useAIEngine();

  const [prompt, setInputPrompt] = useState("");
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  if (!contextualDrawerOpen) return null;

  const entityTitle = contextualPageContext?.entityTitle || "Current Page Content";
  const entityType = contextualPageContext?.entityType || "general";

  const handleRunContextualAction = (actionName: string) => {
    let resultText = "";
    if (entityType === "job") {
      resultText = `CONTEXTUAL FIT ANALYSIS FOR "${entityTitle}":
• Overall Fit Score: 92%
• Verified Experience Match: 100% (4 years Digikala)
• Hard Requirement Gap: None.
• Recommendation: Generate Tailored Resume V2 focusing on multi-app design systems.`;
    } else if (entityType === "profile") {
      resultText = `PROFILE OPTIMIZATION FOR "${entityTitle}":
• Headline Suggestion: "Senior Product Designer @ Digikala | Design Systems & Multi-Platform Web Apps"
• Evidence Gap: Digikala design system project portfolio link is missing.`;
    } else {
      resultText = `CONTEXTUAL ANALYSIS FOR "${entityTitle}":
• Identified 3 key action items and verified background alignment.`;
    }

    setAnalysisResult(resultText);
    toast.success(`Contextual Assistant analyzed ${entityTitle}`);
  };

  const handleSaveOutput = () => {
    if (!analysisResult) return;
    saveOutputArtifact({
      title: `Contextual Output — ${entityTitle}`,
      type: "profile_revision",
      content: analysisResult,
    });
    setContextualDrawerOpen(false);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-white border-l border-border/30 shadow-2xl flex flex-col justify-between overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white">Contextual AI Assistant</h3>
            <p className="text-[10px] text-slate-300">Context: {entityTitle}</p>
          </div>
        </div>

        <button
          onClick={() => setContextualDrawerOpen(false)}
          className="p-1.5 rounded-full hover:bg-slate-800 text-slate-300 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {/* Data Disclosure Banner */}
        <div className="p-3 bg-blue-50 border border-blue-200/80 rounded-2xl text-blue-900 space-y-1">
          <div className="flex items-center gap-1.5 font-bold">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Authorized Data Ingestion</span>
          </div>
          <p className="text-[11px] text-blue-800">
            Currently inspecting context from "{entityTitle}" alongside active profile ({activeContext.name}). No external action will execute automatically.
          </p>
        </div>

        {/* Quick Context Actions */}
        <div className="space-y-2">
          <span className="font-bold text-foreground text-[11px] block uppercase tracking-wider">
            Quick Actions
          </span>

          {entityType === "job" && (
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => handleRunContextualAction("Analyze Fit")}
                className="p-2.5 rounded-xl border border-primary/30 text-primary hover:bg-primary/5 text-left font-bold transition-all flex items-center justify-between cursor-pointer"
              >
                <span>Analyze Job Fit & Explain Score</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleRunContextualAction("Tailor Resume")}
                className="p-2.5 rounded-xl border border-primary/30 text-primary hover:bg-primary/5 text-left font-bold transition-all flex items-center justify-between cursor-pointer"
              >
                <span>Build Tailored Resume Draft</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {entityType === "profile" && (
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => handleRunContextualAction("Improve Headline")}
                className="p-2.5 rounded-xl border border-primary/30 text-primary hover:bg-primary/5 text-left font-bold transition-all flex items-center justify-between cursor-pointer"
              >
                <span>Optimize Profile Headline</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Analysis Output Box */}
        {analysisResult && (
          <div className="p-4 bg-muted/40 rounded-2xl border border-border/30 space-y-3">
            <span className="font-bold text-foreground block">Analysis Result</span>
            <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed text-[11px]">
              {analysisResult}
            </p>

            <button
              onClick={handleSaveOutput}
              className="w-full py-2 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Result to Output Artifacts</span>
            </button>
          </div>
        )}
      </div>

      {/* Footer Prompt Input */}
      <div className="p-3 border-t border-border/20 bg-muted/20">
        <div className="flex items-center gap-2 bg-white rounded-xl p-2 border border-border/30">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Ask AI Engine about this page..."
            className="flex-1 bg-transparent text-xs text-foreground focus:outline-none px-1"
          />
          <button
            onClick={() => handleRunContextualAction("Prompt")}
            className="p-1.5 rounded-lg bg-primary text-white cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
