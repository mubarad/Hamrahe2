import { useState } from "react";
import { Briefcase, Plus, ArrowUpRight } from "lucide-react";
import { mockCases } from "../../data/adminMockData";

export function CasesView() {
  const [selectedCaseNumber, setSelectedCaseNumber] = useState(mockCases[0]?.caseNumber || "");
  const activeCase = mockCases.find((c) => c.caseNumber === selectedCaseNumber) || mockCases[0];

  return (
    <div className="space-y-6 text-slate-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
        <div>
          <h1 className="text-xl font-bold text-white">Case 360 — Case Management</h1>
          <p className="text-xs text-slate-400 mt-1">
            Secure operational workspace for fraud, account takeover, employment scams, and identity claim cases
          </p>
        </div>

        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-md shadow-blue-600/30 transition-all shrink-0">
          <Plus className="w-4 h-4" />
          <span>New Legal / Security Case</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Cases sidebar */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-800">
            Active Cases
          </h2>

          <div className="space-y-2">
            {mockCases.map((c) => {
              const isSelected = c.caseNumber === activeCase?.caseNumber;
              return (
                <div
                  key={c.caseNumber}
                  onClick={() => setSelectedCaseNumber(c.caseNumber)}
                  className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all space-y-2 ${
                    isSelected
                      ? "bg-blue-600/20 border-blue-500/60"
                      : "bg-slate-950/60 border-slate-800 hover:bg-slate-800/60 text-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between font-mono">
                    <span className="font-bold text-blue-400">{c.caseNumber}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      c.severity === "Critical"
                        ? "bg-red-500/20 text-red-300 border border-red-500/30"
                        : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    }`}>
                      {c.severity}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-100 line-clamp-2 leading-snug">{c.title}</h3>
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>Status: {c.status}</span>
                    <span>Risk: {c.riskScore}/100</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Case workspace */}
        {activeCase && (
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="border-b border-slate-800 pb-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-blue-400 font-bold text-sm">{activeCase.caseNumber}</span>
                <span className="px-3 py-1 bg-red-950 text-red-300 border border-red-800/60 rounded-full font-bold text-[10px]">
                  {activeCase.confidentiality}
                </span>
              </div>

              <h2 className="text-base font-bold text-white leading-snug">{activeCase.title}</h2>
              <p className="text-xs text-slate-300 leading-relaxed">{activeCase.description}</p>

              <div className="flex items-center gap-4 text-[10px] text-slate-400 font-mono pt-1">
                <span>Opened: {activeCase.createdDate}</span>
                <span>Updated: {activeCase.lastUpdated}</span>
                <span>SLA: {activeCase.sla}</span>
              </div>
            </div>

            {/* Entities */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Entities Involved</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activeCase.entitiesInvolved.map((ent, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-1">
                    <span className="text-[10px] text-blue-400 font-mono font-bold block">{ent.type}</span>
                    <p className="font-bold text-white leading-snug">{ent.name}</p>
                    <span className="text-[10px] text-slate-500 font-mono">ID: {ent.id}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Immutable Case Timeline</h3>

              <div className="space-y-2 relative ml-3 border-l-2 border-slate-800 pl-4">
                {activeCase.timeline.map((item, idx) => (
                  <div key={item.id} className="relative">
                    <div className="absolute -left-[21px] top-3 w-2.5 h-2.5 rounded-full bg-slate-700 border-2 border-slate-800" />
                    <div className="p-3 bg-slate-950/80 border border-slate-800/80 rounded-xl text-xs space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                        <span>{item.timestamp}</span>
                        <span>{item.actor}</span>
                      </div>
                      <p className="font-semibold text-slate-200">{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">Case owner: <span className="text-slate-200 font-semibold">{activeCase.owner}</span></span>
              <button className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2">
                <span>Log action or close case</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
