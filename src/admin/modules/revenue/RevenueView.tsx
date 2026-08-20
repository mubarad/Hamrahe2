import { DollarSign, TrendingUp, FileText, RefreshCw } from "lucide-react";

export function RevenueView() {
  return (
    <div className="space-y-6 text-slate-100">
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
        <h1 className="text-xl font-bold text-white">Revenue & Commercial Control</h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage premium and enterprise subscriptions, job seat credits, invoices, refunds, and financial compliance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {[
          { label: "Monthly Recurring Revenue", value: "$1.15M", sub: "+6.8% vs last month", color: "text-emerald-400", icon: <DollarSign className="w-4 h-4" /> },
          { label: "Active Enterprise Subscriptions", value: "420 orgs", sub: "+12 new this month", color: "text-blue-400", icon: <TrendingUp className="w-4 h-4" /> },
          { label: "Refund Queue", value: "1 pending", sub: "Requires Maker-Checker approval", color: "text-amber-400", icon: <RefreshCw className="w-4 h-4" /> },
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
          <h2 className="text-sm font-bold text-white">Pending Decisions</h2>
          <div className="p-3 bg-slate-950/80 border border-amber-800/30 rounded-xl text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-amber-400 font-bold">DEC-301</span>
              <span className="text-slate-400">Pending Approval</span>
            </div>
            <p className="text-slate-200 font-semibold">Approve $5,400 refund — Digikala Enterprise plan</p>
            <p className="text-slate-400">Deducted from current month revenue; corrective invoice to be issued</p>
            <button className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold rounded-lg transition-colors cursor-pointer">
              Review & Approve
            </button>
          </div>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
          <h2 className="text-sm font-bold text-white">Revenue Breakdown</h2>
          <div className="space-y-2 text-xs">
            {[
              { plan: "Enterprise Plus", amount: "$620K", pct: "54%" },
              { plan: "Enterprise", amount: "$380K", pct: "33%" },
              { plan: "Premium Individual", amount: "$150K", pct: "13%" },
            ].map(({ plan, amount, pct }) => (
              <div key={plan} className="flex items-center gap-3">
                <span className="text-slate-400 w-36 truncate">{plan}</span>
                <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: pct }} />
                </div>
                <span className="text-slate-200 font-mono w-14 text-right">{amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
