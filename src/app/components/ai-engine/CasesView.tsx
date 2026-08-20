import { useState } from "react";
import {
  Briefcase, Clock, CheckCircle2, AlertTriangle, FileText, ChevronRight,
  ShieldCheck, ArrowRight, User, Bot, Play, Filter, Plus
} from "lucide-react";
import { useAIEngine } from "../../context/AIEngineContext";
import { Case } from "../../data/ai-engine-data";
import { useNavigate } from "react-router";

export function CasesView() {
  const navigate = useNavigate();
  const { cases, activeContext, updateCaseStatus, requestActionApproval } = useAIEngine();

  const [selectedCaseId, setSelectedCaseId] = useState<string>(cases[0]?.id || "");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const filteredCases = cases.filter((c) => {
    const matchesContext = c.contextId === activeContext.id;
    const matchesStatus = statusFilter === "All" || c.status === statusFilter;
    return matchesContext && matchesStatus;
  });

  const activeCase = cases.find((c) => c.id === selectedCaseId) || filteredCases[0] || cases[0];

  const handleExecuteCaseAction = () => {
    if (!activeCase) return;
    requestActionApproval(
      `Execute Next Action for Case: ${activeCase.title}`,
      "Hamrahe Section Execution Layer",
      activeCase.dataSourcesUsed,
      15,
      () => {
        updateCaseStatus(activeCase.id, "executed", "Action executed and logged to audit trail.");
      }
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* CASES LIST SIDEBAR (4 Cols) */}
      <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-border/30 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border/20">
          <div>
            <h2 className="text-base font-bold text-foreground">Operational Cases</h2>
            <p className="text-[11px] text-muted-foreground">{activeContext.name}</p>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-[11px] bg-muted/50 border border-border/30 rounded-xl px-2 py-1 text-foreground"
          >
            <option value="All">All Statuses</option>
            <option value="approval_required">Approval Required</option>
            <option value="draft_ready">Draft Ready</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="space-y-2.5">
          {filteredCases.map((c) => {
            const isSelected = c.id === activeCase?.id;
            return (
              <div
                key={c.id}
                onClick={() => setSelectedCaseId(c.id)}
                className={`p-3.5 rounded-2xl border text-xs cursor-pointer transition-all space-y-2 ${
                  isSelected ? "bg-primary/10 border-primary/40 shadow-xs" : "bg-muted/20 border-border/20 hover:bg-white"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-foreground leading-tight">{c.title}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                    c.status === "approval_required" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
                  }`}>
                    {c.status.replace(/_/g, " ")}
                  </span>
                </div>
                <p className="text-muted-foreground text-[11px] line-clamp-1">{c.objective}</p>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1 border-t border-border/20">
                  <span>Version {c.currentVersion}</span>
                  <span>{c.updatedAt}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CASE DETAILS & VERSIONED TIMELINE (8 Cols) */}
      {activeCase && (
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-border/30 shadow-sm space-y-6">
          <div className="pb-4 border-b border-border/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary uppercase">
                Case Status: {activeCase.status.replace(/_/g, " ")}
              </span>
              <span className="text-xs text-muted-foreground font-semibold">Version {activeCase.currentVersion}</span>
            </div>

            <h2 className="text-xl font-bold text-foreground">{activeCase.title}</h2>
            <p className="text-xs text-muted-foreground">{activeCase.objective}</p>
          </div>

          {/* Next Action Box */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-2xl p-4 space-y-2 text-xs">
            <span className="font-bold text-blue-900 block">Next Recommended Action</span>
            <p className="text-blue-800 font-semibold">{activeCase.nextAction}</p>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[10px] text-blue-700 font-semibold">
                Data Sources: {activeCase.dataSourcesUsed.join(", ")}
              </span>
              <button
                onClick={handleExecuteCaseAction}
                className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-primary/20"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Execute Next Action</span>
              </button>
            </div>
          </div>

          {/* Versioned Case Timeline */}
          <div className="space-y-4 pt-2">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider text-muted-foreground">
              Versioned Activity Audit Timeline
            </h3>

            <div className="relative pl-6 space-y-4 border-l-2 border-border/30">
              {activeCase.timeline.map((evt) => (
                <div key={evt.id} className="relative space-y-1 text-xs">
                  <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-primary border-2 border-white shadow-xs" />

                  <div className="flex items-center justify-between text-muted-foreground text-[10px]">
                    <span className="font-bold text-foreground">{evt.eventType}</span>
                    <span>{evt.timestamp}</span>
                  </div>

                  <p className="font-semibold text-foreground text-xs">{evt.description}</p>

                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                    <span>Actor: {evt.actor} ({evt.actorType})</span>
                    {evt.dataSource && <span>• Source: {evt.dataSource}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
