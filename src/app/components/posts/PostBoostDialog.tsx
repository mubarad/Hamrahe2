import { useState } from "react";
import { Rocket, Target, Check, DollarSign, Calendar, Globe, X } from "lucide-react";
import { toast } from "sonner";

interface PostBoostDialogProps {
  postId: string;
  onClose: () => void;
}

export function PostBoostDialog({ postId, onClose }: PostBoostDialogProps) {
  const [objective, setObjective] = useState("Profile Views & Reach");
  const [industry, setIndustry] = useState("Software & Tech");
  const [role, setRole] = useState("Product Managers & UX Designers");
  const [budget, setBudget] = useState("$50");
  const [duration, setDuration] = useState(7);
  const [active, setActive] = useState(false);

  const handleConfirm = () => {
    setActive(true);
    toast.success("Boost promotion campaign launched!");
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="p-4 bg-card border border-border/30 rounded-2xl shadow-xl max-w-lg w-full">
      <div className="flex items-center justify-between pb-3 border-b border-border/20">
        <div className="flex items-center gap-2">
          <Rocket className="w-4 h-4 text-violet-500" />
          <h3 className="text-sm font-semibold text-foreground">Boost Post (Promoted Campaign)</h3>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-muted/50 rounded-xl cursor-pointer">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <div className="mt-4 space-y-3">
        <div>
          <label className="text-xs font-medium text-foreground block mb-1">Campaign Objective</label>
          <select
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            className="w-full px-3 py-2 bg-muted/30 border border-border/20 rounded-xl text-xs focus:outline-none"
          >
            <option value="Profile Views & Reach">Profile Views & Reach</option>
            <option value="CTA / Website Clicks">CTA / Link Clicks</option>
            <option value="Job Applicants">Job Applicants</option>
            <option value="Lead Generation">Lead Generation & Inquiries</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-foreground block mb-1">Target Professional Industry</label>
          <input
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full px-3 py-2 bg-muted/30 border border-border/20 rounded-xl text-xs focus:outline-none"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-foreground block mb-1">Target Job Titles / Roles</label>
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3 py-2 bg-muted/30 border border-border/20 rounded-xl text-xs focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs font-medium text-foreground block mb-1">Budget</label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full px-3 py-2 bg-muted/30 border border-border/20 rounded-xl text-xs focus:outline-none"
            >
              <option value="$25">$25 (~5,000 Impressions)</option>
              <option value="$50">$50 (~12,000 Impressions)</option>
              <option value="$100">$100 (~28,000 Impressions)</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-foreground block mb-1">Duration (Days)</label>
            <input
              type="number"
              min={1}
              max={30}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full px-3 py-2 bg-muted/30 border border-border/20 rounded-xl text-xs focus:outline-none"
            />
          </div>
        </div>

        <div className="p-3 bg-violet-500/10 border border-violet-500/20 rounded-xl text-xs text-violet-700 dark:text-violet-300 leading-relaxed">
          <p className="font-semibold mb-0.5">Transparency Labeling</p>
          Post will display a subtle <strong className="font-bold">"Promoted"</strong> badge to feed viewers. Sponsored status does not alter trust ratings or profile verification.
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pt-3 border-t border-border/20 mt-4">
        <button onClick={onClose} className="px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted/40 rounded-xl cursor-pointer">
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          disabled={active}
          className="px-4 py-1.5 bg-violet-600 text-white rounded-xl text-xs font-medium hover:bg-violet-700 cursor-pointer transition-colors flex items-center gap-1.5"
        >
          <Check className="w-3.5 h-3.5" />
          {active ? "Launching..." : "Launch Boost Campaign"}
        </button>
      </div>
    </div>
  );
}
