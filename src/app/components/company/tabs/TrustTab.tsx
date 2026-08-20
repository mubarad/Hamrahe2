import { useState } from "react";
import { Card } from "../../ui/Card";
import { Button } from "../../ui/Button";
import {
  ShieldCheck,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Flag,
  Globe,
  Phone,
  Mail,
  Building2,
  Users,
  Briefcase,
  Calendar,
  MessageSquare,
  Clock,
  Star,
  Eye,
  Lock,
  ChevronRight,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { MOCK_TRUST } from "../companyMockData";

interface TrustTabProps {
  viewMode: "public" | "loggedIn" | "admin";
}

const REPUTATION_COLORS: Record<string, string> = {
  Verified: "text-emerald-600",
  Good: "text-blue-600",
  Medium: "text-amber-600",
  Active: "text-emerald-600",
  Strong: "text-emerald-600",
  Clean: "text-emerald-600",
  Moderate: "text-amber-600",
};

function VerificationStatus() {
  const signals = [
    { label: "Identity Verified", done: MOCK_TRUST.identityVerified, icon: ShieldCheck },
    { label: "Domain Verified", done: MOCK_TRUST.domainVerified, icon: Globe },
    { label: "Official Mobile Verified", done: MOCK_TRUST.mobileVerified, icon: Phone },
    { label: "National Company ID Checked", done: MOCK_TRUST.nationalIdChecked, icon: Building2 },
    { label: "Confirmed Employees", done: true, value: `${MOCK_TRUST.confirmedEmployees}`, icon: Users },
    { label: "Verified Recruiters", done: true, value: `${MOCK_TRUST.verifiedRecruiters}`, icon: Users },
    { label: "Active Hiring", done: MOCK_TRUST.activeHiring, icon: Briefcase },
    { label: "Fast Responder", done: MOCK_TRUST.fastResponder, icon: Clock },
    { label: "No Active Abuse Warning", done: MOCK_TRUST.noAbuseWarning, icon: Shield },
    { label: "Profile Updated Recently", done: MOCK_TRUST.profileUpdatedRecently, icon: Calendar },
  ];

  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
          <ShieldCheck className="w-5 h-5 text-emerald-500" />
        </div>
        <div>
          <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>
            Verification Status
          </h3>
          <p className="text-xs text-emerald-600" style={{ fontWeight: 600 }}>
            {MOCK_TRUST.verificationStatus}
          </p>
        </div>
        <div className="ml-auto bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-xl">
          <span className="text-xs text-emerald-700 dark:text-emerald-400" style={{ fontWeight: 700 }}>
            Trusted Employer
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {signals.map(({ label, done, value, icon: Icon }) => (
          <div key={label} className="flex items-center gap-3 py-1">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${done ? "bg-emerald-100 dark:bg-emerald-900/30" : "bg-muted"}`}>
              {done ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <X className="w-3 h-3 text-muted-foreground" />
              )}
            </div>
            <Icon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <span className={`text-sm flex-1 ${done ? "text-foreground" : "text-muted-foreground"}`}>
              {label}
            </span>
            {value && (
              <span className="text-sm text-foreground" style={{ fontWeight: 700 }}>
                {value}
              </span>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

function CompanyProof() {
  return (
    <Card>
      <h3 className="text-sm text-foreground mb-2" style={{ fontWeight: 700 }}>
        Why This Company is Trusted
      </h3>
      <p className="text-xs text-muted-foreground mb-4">Company Proof on Hamrahe</p>
      <div className="space-y-2.5">
        {[
          "Official company identity verified",
          "Official domain verified",
          `${MOCK_TRUST.confirmedEmployees} confirmed employees`,
          `${MOCK_TRUST.verifiedRecruiters} verified recruiters`,
          `Responded to ${MOCK_TRUST.responseRate}% of applicants in the last 30 days`,
          `${MOCK_TRUST.activeJobs} active job postings`,
          `${MOCK_TRUST.completedEvents} completed events`,
          "Active company newsletter",
        ].map((item) => (
          <div key={item} className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span className="text-sm text-muted-foreground">{item}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ReputationSystem() {
  return (
    <Card>
      <h3 className="text-sm text-foreground mb-4" style={{ fontWeight: 700 }}>
        Company Reputation
      </h3>
      <div className="space-y-3">
        {Object.entries(MOCK_TRUST.reputationScores).map(([key, { value, color }]) => (
          <div key={key} className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{key}</span>
            <span
              className={`text-sm ${REPUTATION_COLORS[value] || "text-muted-foreground"}`}
              style={{ fontWeight: 700 }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function HiringBehavior() {
  return (
    <Card>
      <h3 className="text-sm text-foreground mb-4" style={{ fontWeight: 700 }}>
        Hiring Behavior & Candidate Experience
      </h3>
      <div className="space-y-3">
        {[
          { label: "Average review time", value: "5 days", good: true },
          { label: "Response rate", value: "68%", good: true },
          { label: "Application tracking", value: "Available", good: true },
          { label: "Assessment transparency", value: "Yes", good: true },
          { label: "Feedback provided", value: "Partial", good: false },
          { label: "Interview steps visible", value: "Yes", good: true },
        ].map(({ label, value, good }) => (
          <div key={label} className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{label}</span>
            <div className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${good ? "bg-emerald-500" : "bg-amber-500"}`} />
              <span className="text-sm text-foreground" style={{ fontWeight: 600 }}>
                {value}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/30">
        {["Transparent Hiring", "Fast Responder", "Structured Hiring", "Candidate Friendly"].map((badge) => (
          <div
            key={badge}
            className="flex items-center gap-1 text-xs bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-lg"
          >
            <Star className="w-3 h-3" />
            {badge}
          </div>
        ))}
      </div>
    </Card>
  );
}

function ModerationStatus() {
  return (
    <Card>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
          <Shield className="w-4 h-4 text-emerald-500" />
        </div>
        <div>
          <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>
            Moderation Status
          </h3>
          <p className="text-xs text-emerald-600 dark:text-emerald-400" style={{ fontWeight: 600 }}>
            Clean · No warnings
          </p>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Last moderation check: {MOCK_TRUST.lastModerationCheck}. No policy violations, abuse reports, or restrictions found.
      </p>
    </Card>
  );
}

function ReportSection() {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const options = [
    "Report Company",
    "Report Fake Job",
    "Report Suspicious Recruiter",
    "Report Misuse of Assessment",
    "Report Impersonation",
    "Report Spam",
    "Report Privacy Violation",
  ];

  return (
    <>
      <Card>
        <div className="flex items-center gap-3">
          <Flag className="w-4 h-4 text-muted-foreground" />
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">
              See something suspicious or inaccurate?
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setShowModal(true)}>
            Report
          </Button>
        </div>
      </Card>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-2xl p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {!submitted ? (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-foreground" style={{ fontWeight: 700 }}>
                      Report an Issue
                    </h3>
                    <button onClick={() => setShowModal(false)}>
                      <X className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    What would you like to report about this company?
                  </p>
                  <div className="space-y-2 mb-4">
                    {options.map((opt) => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="report"
                          value={opt}
                          checked={selected === opt}
                          onChange={() => setSelected(opt)}
                          className="text-primary"
                        />
                        <span className="text-sm text-foreground">{opt}</span>
                      </label>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="gradient"
                      className="flex-1"
                      onClick={() => selected && setSubmitted(true)}
                    >
                      Submit Report
                    </Button>
                    <Button variant="outline" onClick={() => setShowModal(false)}>
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
                  <h3 className="text-foreground mb-2" style={{ fontWeight: 700 }}>
                    Report Submitted
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Thank you. Our moderation team will review your report.
                  </p>
                  <Button variant="outline" onClick={() => { setShowModal(false); setSubmitted(false); setSelected(null); }}>
                    Close
                  </Button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function TrustTab({ viewMode }: TrustTabProps) {
  return (
    <div className="space-y-4">
      <div className="grid lg:grid-cols-[1fr_300px] gap-4">
        <div className="space-y-4">
          <VerificationStatus />
          <CompanyProof />
          <HiringBehavior />
          <ReportSection />
        </div>
        <div className="space-y-4">
          <ReputationSystem />
          <ModerationStatus />
          <Card>
            <h3 className="text-sm text-foreground mb-3" style={{ fontWeight: 700 }}>
              Assessment Privacy
            </h3>
            <div className="flex items-start gap-2 mb-3">
              <Lock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Assessment results are only shared with this company when you apply, accept an invitation, or explicitly grant permission.
              </p>
            </div>
            {viewMode !== "public" && (
              <>
                <div className="pt-3 border-t border-border/30">
                  <p className="text-xs text-muted-foreground mb-2" style={{ fontWeight: 600 }}>
                    Data shared with Snapp:
                  </p>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">DISC Work Style</span>
                      <span className="text-emerald-600" style={{ fontWeight: 600 }}>Shared (May 14)</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Product Design Assessment</span>
                      <span className="text-muted-foreground">Not shared</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  <Eye className="w-3.5 h-3.5" />
                  Manage Consent
                </Button>
              </>
            )}
          </Card>
          <Card>
            <h3 className="text-sm text-foreground mb-2" style={{ fontWeight: 700 }}>
              External Verification
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Snapp is verified on Hamrahe. Companies can embed the verified badge on their website.
            </p>
            <div className="flex items-center gap-2 p-2 bg-primary/5 rounded-xl border border-primary/20">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="text-xs text-primary" style={{ fontWeight: 600 }}>
                Verified Company on Hamrahe
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
