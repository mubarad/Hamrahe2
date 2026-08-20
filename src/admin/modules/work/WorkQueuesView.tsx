import { useState } from "react";
import { Clock, ArrowUpRight } from "lucide-react";
import { mockWorkQueue } from "../../data/adminMockData";

const QUEUE_TABS = ["All", "Verification", "Job Review", "Chat Safety", "Content Review", "Refund"];

export function WorkQueuesView() {
  const [selectedQueue, setSelectedQueue] = useState<string>("All");
  const [items, setItems] = useState(mockWorkQueue);

  const filteredItems = items.filter(
    (item) => selectedQueue === "All" || item.queueType === selectedQueue
  );

  return (
    <div className="space-y-6 text-slate-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
        <div>
          <h1 className="text-xl font-bold text-white">Unified Work Queues</h1>
          <p className="text-xs text-slate-400 mt-1">
            Smart triage and dispatch for verification, job review, communication safety, and report queues
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1.5 rounded-xl font-mono">
            {filteredItems.length} item{filteredItems.length !== 1 ? "s" : ""} in queue
          </span>
        </div>
      </div>

      {/* Queue Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {QUEUE_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedQueue(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedQueue === tab
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
            }`}
          >
            {tab === "All" ? "All Queues" : tab}
          </button>
        ))}
      </div>

      {/* Items */}
      {filteredItems.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">
          <p className="text-slate-400 text-sm">No items in this queue</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 space-y-3 transition-all text-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      item.priority === "P0"
                        ? "bg-red-500/20 text-red-300 border border-red-500/30"
                        : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    }`}
                  >
                    {item.priority} · {item.severity}
                  </span>
                  <span className="font-mono text-blue-400 font-bold">{item.id}</span>
                  <span className="text-slate-500">Queue: {item.queueType}</span>
                </div>

                <div className="flex items-center gap-4 text-[11px] text-slate-400 font-mono">
                  <span className="flex items-center gap-1 text-amber-400 font-bold">
                    <Clock className="w-3.5 h-3.5" /> SLA: {item.slaDue}
                  </span>
                  <span>Risk: {item.riskScore}/100</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-8 space-y-1.5">
                  <h3 className="text-sm font-bold text-white">{item.relatedEntity}</h3>
                  <p className="text-slate-300">
                    <span className="font-bold text-slate-400">Trigger: </span>{item.trigger}
                  </p>
                  <p className="text-blue-300 font-semibold bg-blue-950/30 p-2 rounded-xl border border-blue-900/30">
                    Recommended action: {item.recommendedAction}
                  </p>
                </div>

                <div className="md:col-span-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2">
                  <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold transition-all cursor-pointer text-center text-xs">
                    Assign to me
                  </button>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20 text-xs">
                    <span>Review & Act</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
