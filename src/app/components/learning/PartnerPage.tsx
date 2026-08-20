import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Building2, Shield, Briefcase, CheckCircle2, AlertCircle, Award } from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { PARTNER_OPPORTUNITIES, CERTIFICATES } from "../../data/learning-data";
import { ConsentControl, PrivacyNotice, StatusPill } from "./shared";
import { toast } from "sonner";

export function PartnerPage() {
  const navigate = useNavigate();
  const [joined, setJoined] = useState(false);
  const [shares, setShares] = useState({
    certificate: true,
    finalProject: true,
    assessmentResults: false,
    publicProfile: true,
    workSample: true,
  });

  return (
    <div className="max-w-[1000px] mx-auto space-y-5">
      <button onClick={() => navigate("/learning")} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Learning &amp; Assessments
      </button>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="bg-gradient-to-br from-emerald-50/60 via-white to-emerald-50/40 border-emerald-200/60 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-emerald-300/20 to-teal-300/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-5 h-5 text-emerald-700" />
              <span className="text-xs text-emerald-800" style={{ fontWeight: 700, letterSpacing: 0.5 }}>PARTNER OPPORTUNITIES</span>
            </div>
            <h1 className="text-foreground mb-2" style={{ fontWeight: 700, fontSize: 24 }}>You may be eligible for partner opportunities</h1>
            <p className="text-sm text-muted-foreground max-w-2xl mb-4 leading-relaxed">
              You can share your certificate, final project, and selected assessment results with partner companies
              for internship, junior, or entry-level opportunities. This is optional. No guaranteed employment.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50 border border-amber-200">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span className="text-xs text-amber-800">
                Optional · You decide what's shared · You can revoke at any time
              </span>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Eligibility */}
      <Card>
        <div className="flex items-center gap-2 mb-3">
          <Award className="w-4 h-4 text-amber-600" />
          <h2 className="text-foreground" style={{ fontWeight: 700, fontSize: 16 }}>Your eligibility</h2>
        </div>
        <div className="space-y-2">
          {CERTIFICATES.slice(0, 4).map((c) => (
            <div key={c.id} className="flex items-center justify-between p-3 rounded-xl border border-border/30 bg-white">
              <div className="flex items-center gap-2.5 min-w-0">
                {c.status === "Eligible" || c.status === "Issued" || c.status === "Shared" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-muted-foreground shrink-0" />
                )}
                <span className="text-sm text-foreground truncate">{c.title}</span>
              </div>
              <StatusPill status={c.status} />
            </div>
          ))}
        </div>
      </Card>

      {/* Data sharing */}
      <Card>
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-4 h-4 text-primary" />
          <h2 className="text-foreground" style={{ fontWeight: 700, fontSize: 16 }}>What you'd share</h2>
        </div>
        <div className="space-y-2">
          <ConsentControl
            label="Certificate"
            description="Selected certificates only. Partner companies see what you've actually earned."
            enabled={shares.certificate}
            onChange={(v) => setShares({ ...shares, certificate: v })}
          />
          <ConsentControl
            label="Final project"
            description="The capstone project from your career path."
            enabled={shares.finalProject}
            onChange={(v) => setShares({ ...shares, finalProject: v })}
          />
          <ConsentControl
            label="Selected assessment results"
            description="Only the assessments you choose. Sensitive raw results stay private."
            enabled={shares.assessmentResults}
            onChange={(v) => setShares({ ...shares, assessmentResults: v })}
          />
          <ConsentControl
            label="Public profile"
            description="Your existing public profile, exactly as you've configured it."
            enabled={shares.publicProfile}
            onChange={(v) => setShares({ ...shares, publicProfile: v })}
          />
          <ConsentControl
            label="Work samples"
            description="Selected work samples saved from your practice."
            enabled={shares.workSample}
            onChange={(v) => setShares({ ...shares, workSample: v })}
          />
        </div>
      </Card>

      {/* Opportunities */}
      <section>
        <h2 className="text-foreground mb-3" style={{ fontWeight: 700, fontSize: 16 }}>Available partner roles</h2>
        <div className="space-y-3">
          {PARTNER_OPPORTUNITIES.map((p) => (
            <Card key={p.id}>
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>{p.role}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground" style={{ fontWeight: 600 }}>{p.level}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700" style={{ fontWeight: 600 }}>Match {p.matchScore}%</span>
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">{p.company}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {p.requirements.map((r) => (
                      <span key={r} className="text-[10px] px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground" style={{ fontWeight: 500 }}>
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
                <Button size="sm" variant="outline" disabled={!joined}>
                  Express Interest
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <Card className="bg-gradient-to-br from-primary/[0.05] via-white to-violet-50 border-primary/20">
        <div className="flex items-start gap-3 flex-wrap">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center shrink-0">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-[240px]">
            <h3 className="text-foreground mb-1" style={{ fontWeight: 700 }}>
              {joined ? "You've joined the Partner Talent Pool" : "Join the Partner Talent Pool"}
            </h3>
            <p className="text-xs text-muted-foreground">
              Partner companies can see your shared profile and reach out. You always decide if and when to respond.
              No employment guarantee.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {!joined ? (
              <>
                <Button variant="ghost" onClick={() => navigate("/learning")}>Not now</Button>
                <Button variant="gradient" onClick={() => { setJoined(true); toast.success("Joined Partner Talent Pool. Visibility under your control."); }}>
                  Join Partner Talent Pool
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={() => { setJoined(false); toast.success("Removed from Partner Talent Pool."); }}>
                Leave Talent Pool
              </Button>
            )}
          </div>
        </div>
      </Card>

      <PrivacyNotice>
        Partner opportunities are <span style={{ fontWeight: 700 }}>optional and revocable</span>. Companies cannot
        see sensitive assessment results without consent, cannot use AI to auto-reject candidates, and cannot use your
        projects as free work.
      </PrivacyNotice>
    </div>
  );
}
