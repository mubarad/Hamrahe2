import { useState } from "react";
import {
  ShieldCheck, Shield, Sparkles, Building2, UserCheck, Award, ArrowRight,
  CheckCircle2, Clock, AlertTriangle, FileText, Lock, Plus, RefreshCw, X
} from "lucide-react";
import { useAIEngine } from "../../context/AIEngineContext";
import { Badge } from "../../data/ai-engine-data";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

export function VerificationView() {
  const { verificationState, badges, credentials, activeContext, requestActionApproval } = useAIEngine();

  const [activeTab, setActiveTab] = useState<"verification" | "trust" | "badges" | "credentials">("verification");
  const [selectedBadgeModal, setSelectedBadgeModal] = useState<Badge | null>(null);

  const personalBadges = badges.filter((b) => b.badgeType === "personal");
  const orgBadges = badges.filter((b) => b.badgeType === "organization");

  const handleApplyBadge = (badge: Badge) => {
    setSelectedBadgeModal(null);
    requestActionApproval(
      `Submit Badge Evidence Package for "${badge.title}"`,
      "Hamrahe Badge Governance Committee",
      badge.requiredEvidence,
      20,
      () => {
        toast.success(`Badge evidence package submitted for "${badge.title}". Pending official review.`);
      }
    );
  };

  return (
    <div className="space-y-6">
      {/* Header & Subsystem Navigation Tabs */}
      <div className="bg-white rounded-2xl p-5 border border-border/30 shadow-sm space-y-4">
        <div>
          <h2 className="text-lg font-bold text-foreground">Verification, Trust, Badges & Credentials</h2>
          <p className="text-xs text-muted-foreground">
            Identity verification precedes trust calculations. Badges and credentials represent distinct earned accolades.
          </p>
        </div>

        <div className="flex items-center gap-2 border-b border-border/20 pb-2">
          <button
            onClick={() => setActiveTab("verification")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "verification" ? "bg-primary text-white" : "text-muted-foreground hover:bg-muted"
            }`}
          >
            1. Identity & Role Verification
          </button>
          <button
            onClick={() => setActiveTab("trust")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "trust" ? "bg-primary text-white" : "text-muted-foreground hover:bg-muted"
            }`}
          >
            2. Trust Subsystem
          </button>
          <button
            onClick={() => setActiveTab("badges")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "badges" ? "bg-primary text-white" : "text-muted-foreground hover:bg-muted"
            }`}
          >
            3. Badges (Personal & Org)
          </button>
          <button
            onClick={() => setActiveTab("credentials")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "credentials" ? "bg-primary text-white" : "text-muted-foreground hover:bg-muted"
            }`}
          >
            4. Verified Credentials
          </button>
        </div>
      </div>

      {/* TAB 1: IDENTITY & REPRESENTATION VERIFICATION */}
      {activeTab === "verification" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-border/30 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-foreground flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  <span>Individual Identity Verification</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                  {verificationState.identityVerified ? "Verified" : "Pending"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Document Type: {verificationState.identityDocType || "Iran National ID"}
              </p>
              <div className="text-[11px] text-emerald-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200/60">
                Verified via Official Iranian Civil Registry API on {verificationState.identityVerifiedAt}.
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-border/30 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-foreground flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span>Organization Representative Verification</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">
                  {verificationState.representativeVerified ? "Authorized Rep" : "Member"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Authorized Role: {verificationState.representativeRole}
              </p>
              <div className="text-[11px] text-blue-800 bg-blue-50 p-2.5 rounded-xl border border-blue-200/60">
                Authorized to access company recruitment pipeline and post official job listings.
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-border/30 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider text-muted-foreground">
              Employment Claim Evidence Status
            </h3>

            <div className="space-y-2">
              {verificationState.evidenceStatus.map((ev, i) => (
                <div key={i} className="p-3.5 rounded-xl border border-border/20 bg-muted/20 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-foreground block">{ev.name}</span>
                    <span className="text-[11px] text-muted-foreground">{ev.note}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                    ev.verified ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                  }`}>
                    {ev.verified ? "Verified Claim" : "Document Required"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BADGES (SEPARATE PERSONAL & ORG BADGES) */}
      {activeTab === "badges" && (
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Personal Badges</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {personalBadges.map((badge) => (
                <div key={badge.id} className="bg-white p-5 rounded-2xl border border-border/30 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">{badge.title}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      badge.eligibilityStatus === "awarded" ? "bg-emerald-100 text-emerald-700" : "bg-purple-100 text-purple-700"
                    }`}>
                      {badge.eligibilityStatus.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Category: {badge.category}</p>
                  <div className="text-[11px] text-muted-foreground space-y-1 bg-muted/40 p-2.5 rounded-xl">
                    <span className="font-bold block text-foreground">Required Prerequisites:</span>
                    {badge.prerequisites.map((p, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>

                  {badge.eligibilityStatus !== "awarded" && (
                    <button
                      onClick={() => setSelectedBadgeModal(badge)}
                      className="w-full py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 cursor-pointer"
                    >
                      Start Badge Evidence Submission
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-border/20">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>Organization Badges</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {orgBadges.map((badge) => (
                <div key={badge.id} className="bg-white p-5 rounded-2xl border border-border/30 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">{badge.title}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">
                      {badge.eligibilityStatus.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Category: {badge.category}</p>
                  <button
                    onClick={() => setSelectedBadgeModal(badge)}
                    className="w-full py-2 rounded-xl border border-primary/30 text-primary text-xs font-bold hover:bg-primary/5 cursor-pointer"
                  >
                    Submit Org Workplace Evidence
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: VERIFIED CREDENTIALS */}
      {activeTab === "credentials" && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-border/30 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-foreground">Verified Learning & Skill Credentials</h3>

            <div className="space-y-3">
              {credentials.map((crd) => (
                <div key={crd.id} className="p-4 rounded-xl border border-border/20 bg-muted/20 flex items-center justify-between text-xs">
                  <div className="space-y-1">
                    <p className="font-bold text-foreground text-sm">{crd.title}</p>
                    <p className="text-muted-foreground">Issuer: {crd.issuer}</p>
                    <p className="text-[11px] text-blue-700 font-semibold">{crd.verificationMethod}</p>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                    {crd.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* BADGE SUBMISSION MODAL */}
      <AnimatePresence>
        {selectedBadgeModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-border/30 space-y-4 text-xs"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-foreground">Apply for Badge: {selectedBadgeModal.title}</h3>
                <button onClick={() => setSelectedBadgeModal(null)} className="p-1 rounded-full hover:bg-muted">
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <p className="text-muted-foreground">
                AI Engine will compile your verified experience proofs, assessment credentials, and network endorsements into an official submission package for review.
              </p>

              <div className="bg-muted/40 p-3 rounded-2xl border border-border/20 space-y-1">
                <span className="font-bold block text-foreground">Evidence Disclosed:</span>
                {selectedBadgeModal.requiredEvidence.map((ev, i) => (
                  <p key={i} className="text-muted-foreground">• {ev}</p>
                ))}
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setSelectedBadgeModal(null)}
                  className="px-4 py-2 rounded-xl border border-border/30 font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleApplyBadge(selectedBadgeModal)}
                  className="px-5 py-2 rounded-xl bg-primary text-white font-bold hover:bg-primary/90"
                >
                  Submit Evidence Package
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
