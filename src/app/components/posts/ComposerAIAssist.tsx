import { useState } from "react";
import { Sparkles, Wand2, ArrowRight, Check, X, RefreshCw, Hash, AtSign, ArrowUpRight, HelpCircle } from "lucide-react";
import { toast } from "sonner";

interface ComposerAIAssistProps {
  currentText: string;
  onApplyText: (newText: string) => void;
  onAddHashtags?: (hashtags: string[]) => void;
  onClose: () => void;
}

export function ComposerAIAssist({ currentText, onApplyText, onAddHashtags, onClose }: ComposerAIAssistProps) {
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [suggestedText, setSuggestedText] = useState<string | null>(null);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const ACTIONS = [
    { id: "improve", label: "Improve writing", desc: "Refine grammar, clarity, and flow" },
    { id: "shorten", label: "Shorten", desc: "Make concise while keeping key message" },
    { id: "clarify", label: "Clarify main point", desc: "Sharpen key takeaway" },
    { id: "professional", label: "Make more professional", desc: "Tone for corporate/executive network" },
    { id: "conversational", label: "Make more conversational", desc: "Engaging & approachable style" },
    { id: "opening", label: "Improve opening hook", desc: "Hook attention in the first line" },
    { id: "hashtags", label: "Suggest hashtags", desc: "Relevant industry tags" },
    { id: "mentions", label: "Suggest mentions", desc: "Tag relevant companies or leaders" },
    { id: "cta", label: "Suggest Call-To-Action", desc: "Drive replies & engagement" },
  ];

  const handleRunAction = (actionId: string) => {
    setActiveAction(actionId);
    setLoading(true);
    setSuggestedText(null);
    setHashtags([]);

    setTimeout(() => {
      setLoading(false);
      const text = currentText.trim() || "Excited to share our team's latest milestone in product design and user experience.";

      if (actionId === "improve") {
        setSuggestedText(`Refined version: ${text} We focused on optimizing performance and user retention through data-driven iterations.`);
      } else if (actionId === "shorten") {
        setSuggestedText(text.slice(0, Math.floor(text.length * 0.7)) || "Here is our latest product update and key learnings.");
      } else if (actionId === "clarify") {
        setSuggestedText(`Key Takeaway: ${text}\n\n3 Lessons Learned:\n1. Focus on user feedback early\n2. Iterate rapidly\n3. Measure impact`);
      } else if (actionId === "professional") {
        setSuggestedText(`I am pleased to announce: ${text} This initiative reflects our ongoing commitment to technical excellence and operational impact.`);
      } else if (actionId === "conversational") {
        setSuggestedText(`Hey network! 👋 ${text} Would love to hear your thoughts on this!`);
      } else if (actionId === "opening") {
        setSuggestedText(`🚀 Here's what we learned building at scale:\n\n${text}`);
      } else if (actionId === "hashtags") {
        setHashtags(["#ProductDesign", "#UXDesign", "#TechInTehran", "#Startups", "#Leadership"]);
      } else if (actionId === "cta") {
        setSuggestedText(`${text}\n\nWhat has been your experience with this? Let's discuss in the comments below 👇`);
      } else if (actionId === "mentions") {
        setSuggestedText(`${text}\n\nCc: @Snapp @CafeBazaar @Digikala Tech Team`);
      }
    }, 600);
  };

  const handleApply = () => {
    if (suggestedText) {
      onApplyText(suggestedText);
      toast.success("AI suggestion applied!");
      onClose();
    }
  };

  const handleApplyHashtags = () => {
    if (hashtags.length > 0 && onAddHashtags) {
      onAddHashtags(hashtags);
      toast.success("Hashtags added!");
      onClose();
    }
  };

  return (
    <div className="p-4 bg-card border border-border/30 rounded-2xl shadow-xl max-w-lg w-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border/20">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-violet-500" />
          <h3 className="text-sm font-semibold text-foreground">AI Writing Assistant</h3>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-muted/50 rounded-xl transition-colors cursor-pointer">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Action buttons list */}
      {!suggestedText && hashtags.length === 0 && !loading && (
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-1">
          {ACTIONS.map((act) => (
            <button
              key={act.id}
              onClick={() => handleRunAction(act.id)}
              className="flex items-start gap-2 p-2.5 rounded-xl border border-border/20 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all text-left cursor-pointer group"
            >
              <Wand2 className="w-3.5 h-3.5 text-violet-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-foreground group-hover:text-violet-600 transition-colors">
                  {act.label}
                </p>
                <p className="text-[10px] text-muted-foreground">{act.desc}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="py-8 text-center space-y-2">
          <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-muted-foreground">Generating AI response...</p>
        </div>
      )}

      {/* Suggested text diff / comparison */}
      {suggestedText && !loading && (
        <div className="mt-3 space-y-3">
          <div className="p-3 bg-muted/20 border border-border/20 rounded-xl space-y-2 text-xs">
            <p className="text-[10px] font-semibold uppercase text-muted-foreground">Original Text</p>
            <p className="text-muted-foreground/80 line-clamp-2 italic">{currentText || "(Empty)"}</p>
          </div>

          <div className="p-3 bg-violet-500/10 border border-violet-500/20 rounded-xl space-y-2 text-xs">
            <p className="text-[10px] font-semibold uppercase text-violet-600 dark:text-violet-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> AI Suggestion
            </p>
            <p className="text-foreground whitespace-pre-wrap leading-relaxed">{suggestedText}</p>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/20">
            <button
              onClick={() => { setSuggestedText(null); setActiveAction(null); }}
              className="px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted/40 rounded-xl cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={handleApply}
              className="px-4 py-1.5 bg-violet-600 text-white rounded-xl text-xs font-medium hover:bg-violet-700 cursor-pointer transition-colors flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              Replace Content
            </button>
          </div>
        </div>
      )}

      {/* Suggested hashtags */}
      {hashtags.length > 0 && !loading && (
        <div className="mt-3 space-y-3">
          <p className="text-xs font-medium text-foreground">Suggested Hashtags</p>
          <div className="flex flex-wrap gap-1.5">
            {hashtags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-300 rounded-lg text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/20">
            <button
              onClick={() => { setHashtags([]); setActiveAction(null); }}
              className="px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted/40 rounded-xl cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={handleApplyHashtags}
              className="px-4 py-1.5 bg-violet-600 text-white rounded-xl text-xs font-medium hover:bg-violet-700 cursor-pointer transition-colors flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              Add Hashtags to Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
