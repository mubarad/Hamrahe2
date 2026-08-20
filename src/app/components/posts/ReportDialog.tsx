import { useState } from "react";
import { Flag, ShieldAlert, Check, X } from "lucide-react";
import { toast } from "sonner";

interface ReportDialogProps {
  itemType?: string;
  itemTitle?: string;
  onClose: () => void;
}

const REPORT_REASONS = [
  "Harassment or threat",
  "Profanity or abusive language",
  "Hate or discrimination",
  "Misleading or false information",
  "Scam or phishing",
  "Personal information exposure",
  "Impersonation",
  "Unwanted spam or ads",
  "Intellectual property violation",
  "Content violating laws of the Islamic Republic of Iran",
  "Undisclosed paid partnership",
  "Other reason",
];

export function ReportDialog({ itemType = "Post", itemTitle, onClose }: ReportDialogProps) {
  const [selectedReason, setSelectedReason] = useState(REPORT_REASONS[0]);
  const [explanation, setExplanation] = useState("");
  const [muteAuthor, setMuteAuthor] = useState(false);
  const [blockAuthor, setBlockAuthor] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    toast.success("Thank you for your report. Our team will review it.");
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="p-4 bg-card border border-border/30 rounded-2xl shadow-xl max-w-lg w-full">
      <div className="flex items-center justify-between pb-3 border-b border-border/20">
        <div className="flex items-center gap-2">
          <Flag className="w-4 h-4 text-red-500" />
          <h3 className="text-sm font-semibold text-foreground">Report {itemType}</h3>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-muted/50 rounded-xl cursor-pointer">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {!submitted ? (
        <div className="mt-4 space-y-3">
          <p className="text-xs text-muted-foreground">
            Why are you reporting this content? Your report is private and will not be disclosed to the author.
          </p>

          <div>
            <label className="text-xs font-medium text-foreground block mb-1">Select Primary Reason</label>
            <select
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value)}
              className="w-full px-3 py-2 bg-muted/30 border border-border/20 rounded-xl text-xs focus:outline-none"
            >
              {REPORT_REASONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-foreground block mb-1">Additional Details (Optional)</label>
            <textarea
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="Provide context or explanation..."
              rows={2}
              className="w-full p-2.5 bg-muted/30 border border-border/20 rounded-xl text-xs focus:outline-none"
            />
          </div>

          <div className="space-y-1.5 pt-2 border-t border-border/20">
            <label className="flex items-center gap-2 text-xs text-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={muteAuthor}
                onChange={(e) => setMuteAuthor(e.target.checked)}
                className="rounded border-border"
              />
              Also mute author's future content
            </label>
            <label className="flex items-center gap-2 text-xs text-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={blockAuthor}
                onChange={(e) => setBlockAuthor(e.target.checked)}
                className="rounded border-border"
              />
              Also block this author entirely
            </label>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-border/20 mt-4">
            <button onClick={onClose} className="px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted/40 rounded-xl cursor-pointer">
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-1.5 bg-red-600 text-white rounded-xl text-xs font-medium hover:bg-red-700 cursor-pointer transition-colors"
            >
              Submit Report
            </button>
          </div>
        </div>
      ) : (
        <div className="py-8 text-center space-y-2">
          <div className="w-10 h-10 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-5 h-5" />
          </div>
          <p className="text-sm font-semibold text-foreground">Report Submitted</p>
          <p className="text-xs text-muted-foreground">We appreciate your help in keeping Hamrahe safe.</p>
        </div>
      )}
    </div>
  );
}
