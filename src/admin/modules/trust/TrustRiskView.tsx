import { ShieldAlert, ShieldCheck, FolderGit2, TrendingDown, AlertTriangle } from "lucide-react";

export function TrustRiskView() {
  return (
    <div className="space-y-6 text-slate-100">
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
        <h1 className="text-xl font-bold text-white">Trust, Risk & Abuse Graph</h1>
        <p className="text-xs text-slate-400 mt-1">
          Trust vs. risk signal separation, hidden relationship discovery between violating accounts and shared devices
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {[
          { label: "Trusted Accounts", value: "96.2%", sub: "of all platform interactions", color: "text-emerald-400" },
          { label: "Active Risk Signals", value: "4", sub: "accounts under active monitoring", color: "text-amber-400" },
          { label: "Abuse Graph Clusters", value: "2", sub: "linked suspicious account groups", color: "text-red-400" },
        ].map(({ label, value, sub, color }) => (
          <div key={label} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
            <span className="text-slate-400">{label}</span>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-slate-500">{sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
          <h2 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            Trust Distribution
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            96.2% of all platform interactions are performed by verified, positively-rated accounts with no active risk signals.
          </p>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" style={{ width: "96.2%" }} />
          </div>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
          <h2 className="text-sm font-bold text-amber-400 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" />
            Risk Engine Signals
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            3 user groups identified with elevated risk behavior — anomalous messaging patterns and job fee solicitation.
          </p>
          <div className="space-y-1.5">
            {["Bulk messaging — user-88231", "Fee fraud — org-aria-capital", "IP anomaly — user-snapp-admin"].map((signal) => (
              <div key={signal} className="flex items-center gap-2 text-[11px] text-amber-300">
                <AlertTriangle className="w-3 h-3 shrink-0" />
                <span>{signal}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
