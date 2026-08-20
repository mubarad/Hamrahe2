import { Cpu, DollarSign, Activity, CheckCircle2, AlertTriangle } from "lucide-react";

export function AIGovernanceView() {
  return (
    <div className="space-y-6 text-slate-100">
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
        <h1 className="text-xl font-bold text-white">AI Governance & Model Registry</h1>
        <p className="text-xs text-slate-400 mt-1">
          Model catalog, prompt versioning, daily LLM costs, bias monitoring, and algorithmic decision oversight
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {[
          { label: "Active AI Models", value: "6", sub: "Claude, OpenAI GPT-4o, Local LLaMA", color: "text-indigo-400", icon: <Cpu className="w-4 h-4" /> },
          { label: "Daily Token Cost", value: "$412.50", sub: "85% of daily budget — alert threshold", color: "text-amber-400", icon: <DollarSign className="w-4 h-4" /> },
          { label: "Hallucination Rate", value: "< 0.05%", sub: "Below acceptable threshold", color: "text-emerald-400", icon: <Activity className="w-4 h-4" /> },
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
          <h2 className="text-sm font-bold text-white">Model Registry</h2>
          <div className="space-y-2 text-xs">
            {[
              { model: "claude-sonnet-4-6", use: "Resume summarizer", status: "Active", ok: true },
              { model: "gpt-4o", use: "Job matching engine", status: "Active", ok: true },
              { model: "llama-3-8b", use: "Spam classifier", status: "Active", ok: true },
              { model: "claude-opus-4-8", use: "Policy review", status: "Pending approval", ok: false },
            ].map(({ model, use, status, ok }) => (
              <div key={model} className="flex items-center justify-between p-2.5 bg-slate-950/60 border border-slate-800 rounded-xl">
                <div>
                  <p className="font-mono text-slate-200 text-[11px]">{model}</p>
                  <p className="text-slate-500 text-[10px]">{use}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  ok ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
                }`}>{status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
          <h2 className="text-sm font-bold text-white">Bias & Fairness Monitoring</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Matching Engine v3.2 pending approval shows a 9.5% reduction in demographic bias for junior-level applicants.
          </p>
          <div className="p-3 bg-amber-950/30 border border-amber-800/30 rounded-xl text-xs text-amber-300 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
            <p>Resumé Summarizer v2 approaching daily budget limit ($412 of $485 budget used).</p>
          </div>
        </div>
      </div>
    </div>
  );
}
