import { Eye, Lock, RefreshCw, AlertTriangle, CheckCircle2 } from "lucide-react";

export function ModerationView() {
  return (
    <div className="space-y-6 text-slate-100">
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
        <h1 className="text-xl font-bold text-white">Content Compliance & Communication Safety</h1>
        <p className="text-xs text-slate-400 mt-1">
          Review flagged posts, listings, and reported messages with privacy-first access controls (Private by Default)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {[
          { label: "Posts & Listings in Review Queue", value: "12", sub: "Pending content review", color: "text-blue-400", icon: <Eye className="w-4 h-4" /> },
          { label: "Reported Chat Messages", value: "4", sub: "Requires restricted viewer access", color: "text-amber-400", icon: <Lock className="w-4 h-4" /> },
          { label: "Appeal Requests", value: "2", sub: "Awaiting moderator decision", color: "text-emerald-400", icon: <RefreshCw className="w-4 h-4" /> },
        ].map(({ label, value, sub, color, icon }) => (
          <div key={label} className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
            <div className={`flex items-center gap-2 ${color}`}>
              {icon}
              <span className="text-slate-400 text-[11px]">{label}</span>
            </div>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-slate-500 text-[11px]">{sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
        <h2 className="text-sm font-bold text-white">Access Policy Reminder</h2>
        <div className="p-3 bg-amber-950/30 border border-amber-800/30 rounded-xl text-xs text-amber-300 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p>
            Accessing reported private messages requires elevated clearance and a linked case ID. All access is session-logged and immutably audited.
          </p>
        </div>
      </div>
    </div>
  );
}
