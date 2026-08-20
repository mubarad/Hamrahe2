import { useState } from "react";
import {
  Shield, Brain, Trash2, Edit2, Plus, AlertCircle, Lock, Key, CheckCircle2, X
} from "lucide-react";
import { useAIEngine } from "../../context/AIEngineContext";
import { MemoryItem } from "../../data/ai-engine-data";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

export function MemoryView() {
  const {
    memoryItems,
    consentRecords,
    activeContext,
    addMemoryItem,
    deleteMemoryItem,
    clearAllMemory,
    revokeConsent,
  } = useAIEngine();

  const [createMemModal, setCreateMemModal] = useState(false);
  const [newKey, setNewKey] = useState("");
  const [newLabel, setNewLabel] = useState("");
  const [newValue, setNewValue] = useState("");

  const contextMemory = memoryItems.filter((m) => m.contextId === activeContext.id);
  const contextConsents = consentRecords.filter((c) => c.contextId === activeContext.id);

  const handleAddMemorySubmit = () => {
    if (!newLabel.trim()) return;
    addMemoryItem({
      label: newLabel,
      key: newKey || newLabel.toLowerCase().replace(/\s+/g, "_"),
      value: newValue,
      category: "preferences",
    });
    setCreateMemModal(false);
    setNewLabel("");
    setNewValue("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 border border-border/30 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-foreground">AI Memory, Data & Granular Permissions</h2>
          <p className="text-xs text-muted-foreground">
            Full user control over stored facts, target role preferences, and granular tool data source consents.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={clearAllMemory}
            className="px-3.5 py-1.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold cursor-pointer transition-colors"
          >
            Clear All Context Memory
          </button>
          <button
            onClick={() => setCreateMemModal(true)}
            className="px-4 py-1.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 cursor-pointer transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Memory Fact</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. STORED AI MEMORY ITEMS */}
        <div className="bg-white rounded-2xl p-5 border border-border/30 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border/20">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Brain className="w-4 h-4 text-purple-600" />
              <span>Stored AI Memory ({contextMemory.length} Items)</span>
            </h3>
            <span className="text-[10px] text-muted-foreground font-semibold">Active Context: {activeContext.name}</span>
          </div>

          <div className="space-y-3">
            {contextMemory.map((mem) => (
              <div
                key={mem.id}
                className="p-3.5 rounded-xl border border-border/20 bg-muted/20 flex items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider block">
                    {mem.label}
                  </span>
                  <p className="font-bold text-foreground">{mem.value}</p>
                  <span className="text-[10px] text-muted-foreground block">Last updated: {mem.lastUpdated}</span>
                </div>

                <button
                  onClick={() => deleteMemoryItem(mem.id)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-50 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 2. GRANULAR DATA CONSENT & PERMISSIONS */}
        <div className="bg-white rounded-2xl p-5 border border-border/30 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border/20">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-600" />
              <span>Granular Data Consents ({contextConsents.length})</span>
            </h3>
            <span className="text-[10px] text-muted-foreground font-semibold">No Vague Permissions</span>
          </div>

          <div className="space-y-3">
            {contextConsents.map((cs) => (
              <div key={cs.id} className="p-3.5 rounded-xl border border-border/20 bg-muted/20 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground">{cs.dataSource}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    cs.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                  }`}>
                    {cs.status.toUpperCase()}
                  </span>
                </div>

                <p className="text-muted-foreground text-[11px]">Purpose: {cs.purpose}</p>

                <div className="p-2 bg-amber-50 text-amber-900 border border-amber-200/60 rounded-lg text-[10px] space-y-1">
                  <span className="font-bold block">Impact of Revocation:</span>
                  <p>{cs.impactOnRevocation}</p>
                </div>

                {cs.status === "active" && (
                  <button
                    onClick={() => revokeConsent(cs.id)}
                    className="w-full py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 font-bold text-[10px] cursor-pointer transition-colors"
                  >
                    Revoke Permission Access
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CREATE MEMORY FACT MODAL */}
      <AnimatePresence>
        {createMemModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-border/30 space-y-4 text-xs"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-foreground">Add Stored Memory Fact</h3>
                <button onClick={() => setCreateMemModal(false)} className="p-1 rounded-full hover:bg-muted">
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="font-bold text-foreground block mb-1">Memory Label</label>
                  <input
                    type="text"
                    value={newLabel}
                    onChange={(e) => setNewLabel(e.target.value)}
                    placeholder="e.g. Private Minimum Compensation Floor"
                    className="w-full p-2.5 rounded-xl border border-border/30 bg-muted/20"
                  />
                </div>

                <div>
                  <label className="font-bold text-foreground block mb-1">Memory Value</label>
                  <input
                    type="text"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    placeholder="e.g. 65,000,000 IRR / month"
                    className="w-full p-2.5 rounded-xl border border-border/30 bg-muted/20"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setCreateMemModal(false)}
                  className="px-4 py-2 rounded-xl border border-border/30 font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddMemorySubmit}
                  className="px-5 py-2 rounded-xl bg-primary text-white font-bold hover:bg-primary/90"
                >
                  Save Fact
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
