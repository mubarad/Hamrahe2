import { useState } from "react";
import { Zap, ShieldCheck, Crown, ArrowUpRight, History, CreditCard, Sparkles } from "lucide-react";
import { useAIEngine } from "../../context/AIEngineContext";
import { toast } from "sonner";

export function QuotaView() {
  const { activeContext } = useAIEngine();

  const handleSimulateUpgrade = () => {
    toast.success("Active Plan upgraded to AI Engine Pro (+5,000 Monthly Credits added).");
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-amber-500 to-amber-700 text-white p-5 rounded-2xl shadow-md space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold opacity-80 uppercase">Remaining Credit Quota</span>
            <Zap className="w-4 h-4 fill-white" />
          </div>
          <span className="text-3xl font-black block">{activeContext.quotaRemaining}</span>
          <p className="text-[11px] opacity-90">Resets on the 1st of next month.</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-border/30 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-bold">
            <span>Total Monthly Limit</span>
            <CreditCard className="w-4 h-4" />
          </div>
          <span className="text-3xl font-black text-foreground">{activeContext.quotaTotal}</span>
          <p className="text-[11px] text-muted-foreground">Included in Pro Plan entitlement.</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-border/30 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-bold">
            <span>Badge Reward Credits</span>
            <Crown className="w-4 h-4 text-amber-500" />
          </div>
          <span className="text-3xl font-black text-emerald-600">+300</span>
          <p className="text-[11px] text-muted-foreground">Earned from Verified Network Top Voice Badge.</p>
        </div>
      </div>

      {/* Plan Details & Upgrade Simulator */}
      <div className="bg-white rounded-2xl p-6 border border-border/30 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/20">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-foreground">Active Plan: AI Engine Pro</h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">
                PRO ACTIVE
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Credits are operational usage units for AI analysis, tailoring, and case execution. Non-financial, non-withdrawable.
            </p>
          </div>

          <button
            onClick={handleSimulateUpgrade}
            className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-primary/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>Upgrade Plan / Add Credits</span>
          </button>
        </div>

        {/* Ledger History */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-foreground uppercase tracking-wider text-muted-foreground">
            Recent Quota Consumption Ledger
          </h4>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-muted/20 border border-border/20 flex items-center justify-between">
              <div>
                <span className="font-bold text-foreground block">Tailored Resume Generation</span>
                <span className="text-[10px] text-muted-foreground">Case: Application for Senior Product Designer at Snapp</span>
              </div>
              <span className="font-bold text-amber-600">-25 Credits</span>
            </div>

            <div className="p-3 rounded-xl bg-muted/20 border border-border/20 flex items-center justify-between">
              <div>
                <span className="font-bold text-foreground block">Job Fit Analysis & Gap Report</span>
                <span className="text-[10px] text-muted-foreground">Snapp Job Listing ID #8831</span>
              </div>
              <span className="font-bold text-amber-600">-20 Credits</span>
            </div>

            <div className="p-3 rounded-xl bg-muted/20 border border-border/20 flex items-center justify-between">
              <div>
                <span className="font-bold text-foreground block">Badge Evidence Package Assembly</span>
                <span className="text-[10px] text-muted-foreground">Verified Network Top Voice Badge</span>
              </div>
              <span className="font-bold text-amber-600">-15 Credits</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
