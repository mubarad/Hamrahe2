import { Activity, Flame, ShieldCheck, CheckCircle2, AlertTriangle, Server } from "lucide-react";

export function SystemHealthView() {
  return (
    <div className="space-y-6 text-slate-100">
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
        <h1 className="text-xl font-bold text-white">System Health & Incident Management</h1>
        <p className="text-xs text-slate-400 mt-1">
          Infrastructure monitoring, API latency, service map health, SEV-1 to SEV-4 incident tracking, and change management
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        {[
          { label: "API Latency (p99)", value: "42ms", sub: "Target: < 100ms", color: "text-emerald-400" },
          { label: "HTTP 5xx Error Rate", value: "< 0.01%", sub: "All services nominal", color: "text-emerald-400" },
          { label: "Active Incidents", value: "1 SEV-3", sub: "Mellat PG — auto-mitigated", color: "text-amber-400" },
          { label: "Planned Changes", value: "2 RFCs", sub: "Scheduled for off-peak", color: "text-blue-400" },
        ].map(({ label, value, sub, color }) => (
          <div key={label} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
            <span className="text-[11px] text-slate-400 block">{label}</span>
            <p className={`text-xl font-bold ${color}`}>{value}</p>
            <p className="text-[10px] text-slate-500">{sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
          <h2 className="text-sm font-bold text-white">Service Health Map</h2>
          <div className="space-y-2 text-xs">
            {[
              { service: "API Gateway", status: "Operational", ok: true },
              { service: "Auth Service", status: "Operational", ok: true },
              { service: "AI Engine", status: "Operational", ok: true },
              { service: "Mellat Payment PG", status: "Degraded — SEV-3", ok: false },
              { service: "Saman Payment PG", status: "Operational (failover)", ok: true },
              { service: "CDN / Media Service", status: "Operational", ok: true },
            ].map(({ service, status, ok }) => (
              <div key={service} className="flex items-center justify-between p-2.5 bg-slate-950/60 border border-slate-800 rounded-xl">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${ok ? "bg-emerald-400" : "bg-amber-400 animate-pulse"}`} />
                  <span className="text-slate-300">{service}</span>
                </div>
                <span className={`text-[10px] font-semibold ${ok ? "text-emerald-400" : "text-amber-400"}`}>{status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
          <h2 className="text-sm font-bold text-white">Active Incident</h2>
          <div className="p-4 bg-amber-950/30 border border-amber-800/40 rounded-xl space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-300 flex items-center gap-1.5">
                <Flame className="w-4 h-4" /> SEV-3 — Payment Gateway
              </span>
              <span className="text-slate-400 font-mono">25 min ago</span>
            </div>
            <p className="text-amber-200">Mellat Bank PG experiencing elevated timeout rate (12%). Auto-failover to Saman gateway has been applied. Monitoring continues.</p>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Incident ID:</span>
              <span className="font-mono text-slate-200">INC-2026-0411</span>
            </div>
            <button className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold rounded-lg transition-colors cursor-pointer">
              View full incident timeline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
