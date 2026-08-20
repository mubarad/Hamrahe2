import { ShieldCheck, Clock, CheckCircle2, AlertTriangle, ArrowUpRight, FileText } from "lucide-react";

export function VerificationView() {
  return (
    <div className="space-y-6 text-slate-100">
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
        <h1 className="text-xl font-bold text-white">Verification Operations</h1>
        <p className="text-xs text-slate-400 mt-1">
          Review official documents, company gazettes, user identity claims, and organizational authorization requests
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {[
          { label: "Pending Requests Today", value: "14", sub: "Across all verification types", color: "text-amber-400", icon: <Clock className="w-4 h-4" /> },
          { label: "Avg. Review Time", value: "18 min", sub: "Target: < 30 min", color: "text-blue-400", icon: <ShieldCheck className="w-4 h-4" /> },
          { label: "Automated Signal Rate", value: "78.4%", sub: "Auto-approved without manual review", color: "text-emerald-400", icon: <CheckCircle2 className="w-4 h-4" /> },
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
          <h2 className="text-sm font-bold text-white">Verification Queue</h2>
          <div className="space-y-2 text-xs">
            {[
              { id: "WQ-1001", entity: "Innovatech Data Solutions", type: "Company Gazette", priority: "P0", sla: "45 min" },
              { id: "VER-441", entity: "Mehdi Rostami", type: "Identity Claim", priority: "P1", sla: "2 hours" },
              { id: "VER-442", entity: "GreenTech Startup", type: "Organization", priority: "P1", sla: "3 hours" },
            ].map(({ id, entity, type, priority, sla }) => (
              <div key={id} className="p-3 bg-slate-950/80 border border-slate-800 hover:border-slate-700 rounded-xl transition-all space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-blue-400 font-bold">{id}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    priority === "P0" ? "bg-red-500/20 text-red-300" : "bg-amber-500/20 text-amber-300"
                  }`}>{priority}</span>
                </div>
                <p className="font-semibold text-slate-200">{entity}</p>
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>{type}</span>
                  <span className="flex items-center gap-1 text-amber-400 font-bold">
                    <Clock className="w-3 h-3" /> SLA: {sla}
                  </span>
                </div>
                <button className="w-full py-1.5 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-300 text-[11px] font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1">
                  <span>Review documents</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
          <h2 className="text-sm font-bold text-white">Verification Type Breakdown</h2>
          <div className="space-y-2 text-xs">
            {[
              { type: "Company Official Gazette", count: 5, pct: "36%" },
              { type: "Individual Identity", count: 4, pct: "29%" },
              { type: "Organization Authorization", count: 3, pct: "21%" },
              { type: "Professional Credential", count: 2, pct: "14%" },
            ].map(({ type, count, pct }) => (
              <div key={type} className="flex items-center gap-3">
                <span className="text-slate-400 w-48 truncate">{type}</span>
                <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: pct }} />
                </div>
                <span className="text-slate-200 font-mono">{count}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800">
            <div className="p-3 bg-emerald-950/30 border border-emerald-800/30 rounded-xl text-xs text-emerald-300 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <p>78.4% of requests are auto-cleared by document signal analysis before reaching manual review.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
