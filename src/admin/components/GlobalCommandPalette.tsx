import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Search, Users, Building2, Briefcase, FileText, AlertTriangle, ShieldCheck,
  Flame, Terminal, X, CornerDownLeft
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function GlobalCommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (open) onClose();
        else setQuery("");
      }
      if (e.key === "Escape" && open) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const quickActions = [
    { title: "Create new security or legal case", icon: FileText, action: () => navigate("/command/cases") },
    { title: "Declare SEV-1 incident", icon: Flame, action: () => navigate("/command/system") },
    { title: "Review company verification queue", icon: ShieldCheck, action: () => navigate("/command/verification") },
    { title: "Review reported chat messages", icon: AlertTriangle, action: () => navigate("/command/moderation/chat") },
    { title: "Manage feature flags & rollouts", icon: Terminal, action: () => navigate("/command/configuration") },
    { title: "User 360 — Ahmad Rezaei", icon: Users, action: () => navigate("/command/entities/users/user-123") },
    { title: "Org 360 — Snapp", icon: Building2, action: () => navigate("/command/entities/organizations/snapp") },
  ];

  const filteredActions = query
    ? quickActions.filter((a) => a.title.toLowerCase().includes(query.toLowerCase()))
    : quickActions;

  const handleSelect = (act: () => void) => {
    act();
    onClose();
    setQuery("");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-start justify-center pt-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -8 }}
          transition={{ duration: 0.15 }}
          className="bg-[#0f172a] border border-slate-700/80 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden text-slate-100"
        >
          {/* Input */}
          <div className="p-4 border-b border-slate-800 flex items-center gap-3">
            <Search className="w-5 h-5 text-blue-400 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search users, orgs, cases, IPs, error codes..."
              className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
            />
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Actions */}
          <div className="p-3 max-h-[380px] overflow-y-auto space-y-1">
            <p className="px-3 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              Quick Commands
            </p>

            {filteredActions.length === 0 ? (
              <p className="px-3 py-4 text-xs text-slate-500 text-center">No results for "{query}"</p>
            ) : (
              filteredActions.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(item.action)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/80 transition-colors text-xs text-slate-200 group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400 group-hover:border-blue-500/40 transition-colors">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <span className="font-medium">{item.title}</span>
                  </div>
                  <CornerDownLeft className="w-3.5 h-3.5 text-slate-600 group-hover:text-blue-400 transition-colors" />
                </button>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-3 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Access is scoped to your current clearance level.</span>
            <span>
              Press <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-300 font-mono">Esc</kbd> to close
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
