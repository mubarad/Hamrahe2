import { Terminal, CheckCircle2, Clock, Zap, AlertTriangle } from "lucide-react";

export function ConfigurationView() {
  return (
    <div className="space-y-6 text-slate-100">
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
        <h1 className="text-xl font-bold text-white">Configuration, Feature Flags & Automation</h1>
        <p className="text-xs text-slate-400 mt-1">
          Percentage rollouts, emergency kill switches, notification rules, and automated workflow triggers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {[
          { label: "Active Feature Flags", value: "24", sub: "Flags enabled in production", color: "text-indigo-400", icon: <Terminal className="w-4 h-4" /> },
          { label: "Ongoing Rollouts", value: "3", sub: "Percentage-based deployments", color: "text-blue-400", icon: <Clock className="w-4 h-4" /> },
          { label: "Kill Switch Status", value: "All Clear", sub: "No emergency shutoffs active", color: "text-emerald-400", icon: <Zap className="w-4 h-4" /> },
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
          <h2 className="text-sm font-bold text-white">Active Rollouts</h2>
          <div className="space-y-3 text-xs">
            {[
              { name: "Matching Engine v3.2", pct: 10, status: "Pending approval" },
              { name: "New profile editor UI", pct: 50, status: "Running" },
              { name: "AI résumé critique beta", pct: 25, status: "Running" },
            ].map(({ name, pct, status }) => (
              <div key={name} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-200 font-semibold">{name}</span>
                  <span className={`text-[10px] font-bold ${status === "Running" ? "text-emerald-400" : "text-amber-400"}`}>{status}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-slate-400 font-mono w-8 text-right">{pct}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
          <h2 className="text-sm font-bold text-white">Kill Switches</h2>
          <div className="space-y-2 text-xs">
            {[
              { name: "Payment Gateway Failover", armed: false },
              { name: "AI Model Emergency Shutdown", armed: false },
              { name: "Guest Registration Block", armed: false },
              { name: "Job Listing Freeze", armed: false },
            ].map(({ name, armed }) => (
              <div key={name} className="flex items-center justify-between p-2.5 bg-slate-950/60 border border-slate-800 rounded-xl">
                <span className="text-slate-300">{name}</span>
                <span className={`text-[10px] font-bold flex items-center gap-1 ${armed ? "text-red-400" : "text-emerald-400"}`}>
                  <span className={`w-1.5 h-1.5 rounded-full inline-block ${armed ? "bg-red-400 animate-pulse" : "bg-emerald-400"}`} />
                  {armed ? "Armed" : "Normal"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
