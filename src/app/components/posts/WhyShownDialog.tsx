import { useState } from "react";
import { HelpCircle, Network, Users, Building2, TrendingUp, Sparkles, X } from "lucide-react";

interface WhyShownDialogProps {
  onClose: () => void;
}

export function WhyShownDialog({ onClose }: WhyShownDialogProps) {
  return (
    <div className="p-4 bg-card border border-border/30 rounded-2xl shadow-xl max-w-md w-full">
      <div className="flex items-center justify-between pb-3 border-b border-border/20">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Why am I seeing this post?</h3>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-muted/50 rounded-xl cursor-pointer">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <div className="mt-4 space-y-3">
        <div className="p-3 bg-primary/5 border border-primary/20 rounded-xl flex items-start gap-3">
          <Network className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-foreground">1st Degree Connection Activity</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Mina Hosseini and Ali Mohammadi reacted to or commented on this post.
            </p>
          </div>
        </div>

        <div className="p-3 bg-violet-500/5 border border-violet-500/20 rounded-xl flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-foreground">Followed Professional Interest</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              This post covers #ProductDesign and #UXLeadership, topics you actively follow.
            </p>
          </div>
        </div>

        <div className="p-3 bg-muted/20 border border-border/20 rounded-xl flex items-start gap-3">
          <Building2 className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-foreground">Industry Relevance</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              High engagement among Senior Product Designers in Tehran's tech ecosystem.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end pt-3 border-t border-border/20 mt-4">
        <button onClick={onClose} className="px-4 py-1.5 bg-primary text-white rounded-xl text-xs font-medium cursor-pointer">
          Got it
        </button>
      </div>
    </div>
  );
}
