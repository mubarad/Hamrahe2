import { HelpCircle, Clock, CheckCircle2, TrendingUp } from "lucide-react";

export function SupportOpsView() {
  return (
    <div className="space-y-6 text-slate-100">
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
        <h1 className="text-xl font-bold text-white">Support Operations & SLA Center</h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage user and org support tickets, monitor agent quality, and track first-response time (SLA/OLA)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {[
          { label: "Open Tickets", value: "38", sub: "Across all support queues", color: "text-blue-400", icon: <HelpCircle className="w-4 h-4" /> },
          { label: "Avg. First Response Time", value: "4 min", sub: "Well within SLA target of 15 min", color: "text-emerald-400", icon: <Clock className="w-4 h-4" /> },
          { label: "Support CSAT Score", value: "98.4%", sub: "Based on last 500 resolutions", color: "text-indigo-400", icon: <TrendingUp className="w-4 h-4" /> },
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
          <h2 className="text-sm font-bold text-white">Ticket Queue Breakdown</h2>
          <div className="space-y-2 text-xs">
            {[
              { category: "Account / Login Issues", count: 14, pct: "37%" },
              { category: "Payment & Billing", count: 9, pct: "24%" },
              { category: "Job Listing Disputes", count: 8, pct: "21%" },
              { category: "Profile / Verification", count: 7, pct: "18%" },
            ].map(({ category, count, pct }) => (
              <div key={category} className="flex items-center gap-3">
                <span className="text-slate-400 w-44 truncate">{category}</span>
                <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: pct }} />
                </div>
                <span className="text-slate-200 font-mono">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
          <h2 className="text-sm font-bold text-white">SLA Compliance</h2>
          <div className="space-y-2 text-xs">
            {[
              { tier: "P0 (Critical)", target: "< 5 min", status: "Met", ok: true },
              { tier: "P1 (High)", target: "< 15 min", status: "Met", ok: true },
              { tier: "P2 (Normal)", target: "< 2 hours", status: "Met", ok: true },
              { tier: "P3 (Low)", target: "< 24 hours", status: "1 at risk", ok: false },
            ].map(({ tier, target, status, ok }) => (
              <div key={tier} className="flex items-center justify-between p-2.5 bg-slate-950/60 border border-slate-800 rounded-xl">
                <span className="text-slate-300">{tier}</span>
                <span className="text-slate-500">{target}</span>
                <span className={`font-bold ${ok ? "text-emerald-400" : "text-amber-400"}`}>{status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
