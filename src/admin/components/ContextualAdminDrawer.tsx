import { useNavigate } from "react-router";
import {
  ShieldAlert, X, Lock, ArrowUpRight, Users, Building2, Briefcase
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function ContextualAdminDrawer({
  open,
  onClose,
  entity,
}: {
  open: boolean;
  onClose: () => void;
  entity: {
    type: "User" | "Organization" | "Job" | "Event";
    id: string;
    title: string;
    trustScore?: number;
    riskScore?: number;
    activeCases?: number;
    verificationStatus?: string;
  } | null;
}) {
  const navigate = useNavigate();

  if (!open || !entity) return null;

  const getCommandDestination = () => {
    switch (entity.type) {
      case "User": return `/command/entities/users/${entity.id}`;
      case "Organization": return `/command/entities/organizations/${entity.id}`;
      case "Job": return `/command/entities/jobs/${entity.id}`;
      default: return `/command`;
    }
  };

  const EntityIcon = entity.type === "User" ? Users : entity.type === "Organization" ? Building2 : Briefcase;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-end">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="w-full max-w-md bg-[#0f172a] border-l border-slate-800 text-slate-100 h-full p-6 shadow-2xl flex flex-col overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider font-mono">
                Command Context
              </span>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 space-y-4">
            {/* Entity card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                  <EntityIcon className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-[10px] text-blue-300 font-bold">{entity.type}</span>
                </div>
                <span className="text-slate-500 font-mono text-[10px]">ID: {entity.id}</span>
              </div>
              <h3 className="text-base font-bold text-white">{entity.title}</h3>
            </div>

            {/* Trust & Risk */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-1">
                <span className="text-slate-400 text-[10px] block">Trust Score</span>
                <span className="text-xl font-bold text-emerald-400">{entity.trustScore ?? 92}</span>
                <span className="text-[10px] text-slate-500">/ 100</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-1">
                <span className="text-slate-400 text-[10px] block">Risk Score</span>
                <span className="text-xl font-bold text-amber-400">{entity.riskScore ?? 12}</span>
                <span className="text-[10px] text-slate-500">/ 100</span>
              </div>
            </div>

            {/* Status checklist */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-3 text-xs">
              <h4 className="font-bold text-slate-300 text-xs uppercase tracking-wider">Security Summary</h4>

              {[
                { label: "Verification", value: entity.verificationStatus ?? "Verified", color: "text-emerald-400" },
                { label: "Active Cases", value: `${entity.activeCases ?? 0} open`, color: "text-blue-400" },
                { label: "Restrictions", value: "None", color: "text-emerald-400" },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex items-center justify-between text-slate-300">
                  <span>{label}</span>
                  <span className={`font-bold ${color}`}>{value}</span>
                </div>
              ))}
            </div>

            {/* Security notice */}
            <div className="p-3 bg-amber-950/30 border border-amber-800/30 rounded-xl text-[11px] text-amber-300 flex items-start gap-2">
              <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p>Full audit logs and sensitive data are only accessible within the Command domain.</p>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-4 border-t border-slate-800 mt-4">
            <button
              onClick={() => {
                navigate(getCommandDestination());
                onClose();
              }}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold hover:from-blue-500 hover:to-indigo-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 cursor-pointer"
            >
              <span>Open full 360° view in Command</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
