import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Activity, ShieldAlert, AlertTriangle, Scale, TrendingUp,
  DollarSign, Users, Cpu, ArrowUpRight, ChevronRight
} from "lucide-react";
import { adminKPIs, mockPriorities, mockCriticalAlerts, mockDecisions } from "../../data/adminMockData";

export function CommandCenter() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 text-slate-100">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h1 className="text-xl font-bold text-white tracking-tight">Global Command Center</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time platform monitoring, critical alerts, decision queues, and operational layer health
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-blue-400 shrink-0">
          <Activity className="w-4 h-4 text-emerald-400" />
          <span>SLA Status: 99.98% Healthy</span>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {adminKPIs.map((kpi) => (
          <div
            key={kpi.id}
            className="bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-4 space-y-2 transition-all"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] text-slate-400 truncate">{kpi.name}</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-800 text-slate-400 shrink-0">
                {kpi.category}
              </span>
            </div>

            <div className="flex items-baseline justify-between gap-2">
              <span className="text-base font-bold text-white tracking-tight truncate">{kpi.value}</span>
              <span
                className={`text-[11px] font-bold shrink-0 ${
                  kpi.trend === "up" ? "text-emerald-400" : kpi.trend === "down" ? "text-red-400" : "text-slate-400"
                }`}
              >
                {kpi.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today's Priorities */}
        <div className="lg:col-span-8 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              <h2 className="text-sm font-bold text-white">{"Today's Priorities"}</h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">3 actions require attention</span>
          </div>

          <div className="space-y-3">
            {mockPriorities.map((prio) => (
              <div
                key={prio.id}
                className="bg-slate-950/70 border border-slate-800 hover:border-amber-500/30 rounded-2xl p-4 space-y-3 transition-all text-xs"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] border ${
                        prio.severity === "Critical"
                          ? "bg-red-500/20 text-red-300 border-red-500/30"
                          : prio.severity === "High"
                          ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                          : "bg-blue-500/20 text-blue-300 border-blue-500/30"
                      }`}>
                        {prio.severity}
                      </span>
                      <span className="text-[11px] text-blue-400 font-semibold">{prio.domain}</span>
                    </div>
                    <h3 className="font-bold text-sm text-white leading-snug">{prio.title}</h3>
                  </div>

                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg shrink-0 font-mono whitespace-nowrap">
                    Due: {prio.dueTime}
                  </span>
                </div>

                <p className="text-slate-300 text-xs bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80">
                  <span className="font-bold text-amber-400">Why it matters: </span>{prio.whyItMatters}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="flex items-center gap-4 text-[11px] text-slate-400">
                    <span>Owner: {prio.owner}</span>
                    <span>Impact: {prio.expectedImpact}</span>
                  </div>

                  <button
                    onClick={() => navigate("/command/cases")}
                    className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                  >
                    <span>Take recommended action</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-4 space-y-5">
          {/* Critical Alerts */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <h2 className="text-sm font-bold text-white">Critical Alerts</h2>
              </div>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            </div>

            <div className="space-y-2.5 text-xs">
              {mockCriticalAlerts.map((alt) => (
                <div key={alt.id} className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className={`font-bold px-1.5 py-0.5 rounded border ${
                      alt.severity === "SEV-1"
                        ? "bg-red-950/60 text-red-300 border-red-800/40"
                        : alt.severity === "SEV-2"
                        ? "bg-amber-950/60 text-amber-300 border-amber-800/40"
                        : "bg-blue-950/60 text-blue-300 border-blue-800/40"
                    }`}>
                      {alt.severity}
                    </span>
                    <span className="text-slate-500">{alt.timestamp}</span>
                  </div>
                  <p className="font-bold text-slate-200">{alt.title}</p>
                  <p className="text-[11px] text-slate-400 line-clamp-2">{alt.details}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Decision Center */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-indigo-400" />
                <h2 className="text-sm font-bold text-white">Decision Center</h2>
              </div>
              <span className="text-[10px] bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded-full font-bold">
                Maker-Checker
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              {mockDecisions.map((dec) => (
                <div key={dec.id} className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-indigo-400 font-bold">{dec.domain}</span>
                    <span className={`font-semibold ${
                      dec.status === "Approved" ? "text-emerald-400" : "text-amber-400"
                    }`}>{dec.status}</span>
                  </div>
                  <p className="font-bold text-slate-200 leading-snug">{dec.title}</p>
                  <p className="text-[11px] text-slate-400">{dec.impactSummary}</p>
                  <button
                    onClick={() => navigate("/command/decisions")}
                    className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Review & approve decision
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sub-system Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        {[
          {
            path: "/command/trust",
            color: "text-blue-400",
            hoverBorder: "hover:border-blue-500/40",
            icon: <ShieldAlert className="w-4 h-4" />,
            title: "Trust & Risk Engine",
            body: "96.2% of users are classified as trusted, verified accounts with no active risk signals.",
            meta: "4 active risk signals",
          },
          {
            path: "/command/ai",
            color: "text-indigo-400",
            hoverBorder: "hover:border-indigo-500/40",
            icon: <Cpu className="w-4 h-4" />,
            title: "AI Governance",
            body: "All active AI models operating within platform ethical charter and budget limits.",
            meta: "Daily cost: $412.50",
          },
          {
            path: "/command/revenue",
            color: "text-emerald-400",
            hoverBorder: "hover:border-emerald-500/40",
            icon: <DollarSign className="w-4 h-4" />,
            title: "Revenue & Commercial",
            body: "6.8% MRR growth from enterprise and premium subscriptions this month.",
            meta: "MRR: $1.15M",
          },
          {
            path: "/command/system",
            color: "text-purple-400",
            hoverBorder: "hover:border-purple-500/40",
            icon: <Activity className="w-4 h-4" />,
            title: "Infrastructure & Stability",
            body: "All services at 99.98% availability with no critical disruptions.",
            meta: "p99 latency: 42ms",
          },
        ].map((card) => (
          <div
            key={card.path}
            onClick={() => navigate(card.path)}
            className={`bg-slate-900/80 border border-slate-800 ${card.hoverBorder} rounded-2xl p-4 space-y-2 cursor-pointer transition-all`}
          >
            <div className={`flex items-center justify-between font-bold ${card.color}`}>
              <span>{card.title}</span>
              {card.icon}
            </div>
            <p className="text-slate-300">{card.body}</p>
            <span className="text-[10px] text-slate-500 block font-mono">{card.meta}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
