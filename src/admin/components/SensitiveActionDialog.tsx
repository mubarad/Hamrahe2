import { useState } from "react";
import { AlertTriangle, ShieldAlert, CheckCircle2, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function SensitiveActionDialog({
  open,
  onClose,
  title,
  impactDescription,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  impactDescription: string;
  onConfirm: (reason: string, caseId: string) => void;
}) {
  const [step, setStep] = useState<number>(1);
  const [reason, setReason] = useState("");
  const [caseId, setCaseId] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  if (!open) return null;

  const handleNext = () => {
    if (step === 1) setStep(2);
    else if (step === 2) {
      if (!reason || !caseId) return;
      setStep(3);
    } else if (step === 3) {
      setIsCompleted(true);
      onConfirm(reason, caseId);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setReason("");
    setCaseId("");
    setIsCompleted(false);
    onClose();
  };

  const stepLabels = ["Action Summary", "Justification", "Final Confirmation"];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#0f172a] border border-slate-700/80 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden text-slate-100 p-6 space-y-5"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2 text-red-400">
              <ShieldAlert className="w-5 h-5" />
              <span className="font-bold text-sm">Sensitive Action — Maker-Checker Flow</span>
            </div>
            <button onClick={resetAndClose} className="p-1 text-slate-500 hover:text-slate-200 cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>

          {!isCompleted ? (
            <>
              {/* Step indicator */}
              <div className="flex items-center gap-2">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-2 flex-1">
                    <div
                      className={`w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 transition-colors ${
                        step >= s
                          ? "bg-blue-600 text-white"
                          : "bg-slate-800 text-slate-500"
                      }`}
                    >
                      {s}
                    </div>
                    {s < 3 && <div className={`h-px flex-1 transition-colors ${step > s ? "bg-blue-600" : "bg-slate-800"}`} />}
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400">Step {step} of 3 — <span className="text-slate-300 font-semibold">{stepLabels[step - 1]}</span></p>

              {step === 1 && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                    <h3 className="font-bold text-sm text-white">{title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{impactDescription}</p>
                  </div>
                  <div className="p-3 bg-red-950/40 border border-red-800/40 rounded-xl text-xs text-red-300 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <p>This action generates an immutable audit log entry and will be visible to all senior administrators.</p>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 block">Reference Case ID *</label>
                    <input
                      type="text"
                      value={caseId}
                      onChange={(e) => setCaseId(e.target.value)}
                      placeholder="e.g. CASE-2026-8812"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500 font-mono transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 block">Legal / Security Justification *</label>
                    <textarea
                      rows={3}
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="State the explicit reason and relevant policy clause..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4 text-xs">
                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-slate-400 shrink-0">Case ID</span>
                      <span className="text-white font-mono">{caseId}</span>
                    </div>
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-slate-400 shrink-0">Justification</span>
                      <span className="text-white text-right">{reason}</span>
                    </div>
                  </div>
                  <p className="text-slate-300">Are you sure you want to apply and log this action to the platform?</p>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
                <button
                  onClick={resetAndClose}
                  className="px-4 py-2 rounded-xl text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleNext}
                  disabled={step === 2 && (!reason || !caseId)}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white transition-all shadow-md shadow-red-600/30 cursor-pointer"
                >
                  {step === 3 ? "Confirm & Log Action" : "Continue"}
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Action successfully executed and logged</h3>
                <p className="text-xs text-slate-400 font-mono mt-1">Audit Receipt: AUDIT-2026-99214</p>
              </div>
              <button
                onClick={resetAndClose}
                className="px-6 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white cursor-pointer transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
