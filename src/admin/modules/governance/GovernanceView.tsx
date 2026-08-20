import { Settings, Lock, ShieldCheck, UserCheck, CheckCircle2 } from "lucide-react";

export function GovernanceView() {
  return (
    <div className="space-y-6 text-slate-100">
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
        <h1 className="text-xl font-bold text-white">Identity & Access Governance</h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage internal operators, permission matrices (RBAC/ABAC), sensitive access requests, break-glass, and DLP policies
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {[
          { label: "Active Senior Operators", value: "18", sub: "Internal admin team", color: "text-blue-400", icon: <UserCheck className="w-4 h-4" /> },
          { label: "Pending Temporary Access", value: "2 requests", sub: "Awaiting Maker-Checker review", color: "text-amber-400", icon: <Lock className="w-4 h-4" /> },
          { label: "Audit Log Status", value: "Append-Only", sub: "Cannot be disabled or modified", color: "text-emerald-400", icon: <ShieldCheck className="w-4 h-4" /> },
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
          <h2 className="text-sm font-bold text-white">Operator Roles</h2>
          <div className="space-y-2 text-xs">
            {[
              { role: "SuperAdmin", count: 2, scope: "Full platform access" },
              { role: "TrustSafetyLead", count: 4, scope: "Trust, moderation, appeals" },
              { role: "ComplianceOfficer", count: 3, scope: "Legal, DLP, GDPR" },
              { role: "SupportLead", count: 9, scope: "Tickets, refunds, escalations" },
            ].map(({ role, count, scope }) => (
              <div key={role} className="flex items-center justify-between p-2.5 bg-slate-950/60 border border-slate-800 rounded-xl">
                <div>
                  <p className="font-semibold text-slate-200">{role}</p>
                  <p className="text-slate-500 text-[10px]">{scope}</p>
                </div>
                <span className="text-slate-300 font-mono">{count} ops</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
          <h2 className="text-sm font-bold text-white">Pending Access Requests</h2>
          <div className="space-y-2 text-xs">
            {[
              { who: "Mehdi Alavi (Lead DevOps)", type: "Break-glass DB access", duration: "1 hour", status: "Approved" },
              { who: "Neda Karimi (Legal)", type: "GDPR export read access", duration: "30 min", status: "Pending" },
            ].map(({ who, type, duration, status }) => (
              <div key={who} className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200">{who}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    status === "Approved" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
                  }`}>{status}</span>
                </div>
                <p className="text-slate-400">{type} · <span className="text-slate-500">{duration}</span></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
