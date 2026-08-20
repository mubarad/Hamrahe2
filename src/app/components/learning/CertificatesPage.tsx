import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowLeft, Award, Eye, EyeOff, Share2, Download, Play, CheckCircle2 } from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { CERTIFICATES } from "../../data/learning-data";
import { currentUser as user } from "../../data/mock-data";
import { StatusPill, RequirementChecklist, PrivacyNotice, ConsentControl } from "./shared";
import { toast } from "sonner";

export function CertificatesPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"all" | "eligible" | "in-progress" | "issued">("all");
  const [selectedId, setSelectedId] = useState<string | null>(CERTIFICATES[1]?.id || null);
  const [shareOnProfile, setShareOnProfile] = useState(false);
  const [shareWithCompany, setShareWithCompany] = useState(false);

  const selected = CERTIFICATES.find((c) => c.id === selectedId);

  const filtered = CERTIFICATES.filter((c) => {
    if (filter === "eligible") return c.status === "Eligible";
    if (filter === "in-progress") return c.status === "In Progress";
    if (filter === "issued") return c.status === "Issued" || c.status === "Shared";
    return true;
  });

  return (
    <div className="max-w-[1100px] mx-auto space-y-5">
      <button onClick={() => navigate("/learning")} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Learning &amp; Assessments
      </button>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-1">
          <Award className="w-6 h-6 text-amber-600" />
          <h1 className="text-foreground" style={{ fontWeight: 700, fontSize: 24 }}>Certificates &amp; Verified Skills</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Earned through performance — assessments, AI practice, work samples, and review. Not by passive completion.
        </p>
      </motion.div>

      <div className="flex items-center gap-1.5 flex-wrap">
        {(["all", "eligible", "in-progress", "issued"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs px-3 py-1.5 rounded-lg capitalize transition-all ${filter === f ? "bg-primary text-white" : "bg-muted/50 text-muted-foreground hover:bg-muted"}`}
            style={{ fontWeight: 600 }}
          >
            {f.replace("-", " ")}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-5">
        {/* List */}
        <div className="space-y-2.5">
          {filtered.map((c) => {
            const done = c.requirements.filter((r) => r.done).length;
            const total = c.requirements.length;
            return (
              <Card
                key={c.id}
                onClick={() => setSelectedId(c.id)}
                className={`transition-all ${selectedId === c.id ? "border-amber-300 ring-1 ring-amber-200" : "hover:border-amber-200"}`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h4 className="text-sm text-foreground" style={{ fontWeight: 700 }}>{c.title}</h4>
                      <StatusPill status={c.status} />
                    </div>
                    <div className="text-[11px] text-muted-foreground mb-1">{c.type}</div>
                    <div className="text-[11px] text-muted-foreground">{done} of {total} requirements ({Math.round((done / total) * 100)}%)</div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Detail */}
        {selected && (
          <div className="space-y-4">
            {/* Certificate Preview */}
            <Card padding={false} className="overflow-hidden">
              <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 p-8 border-b border-amber-200/40 relative">
                <div className="absolute top-4 right-4 opacity-10">
                  <Award className="w-32 h-32 text-amber-600" />
                </div>
                <div className="relative">
                  <div className="text-[10px] text-amber-700 mb-2" style={{ fontWeight: 700, letterSpacing: 1 }}>HAMRAHE · {selected.type.toUpperCase()}</div>
                  <h2 className="text-foreground mb-3 max-w-sm" style={{ fontWeight: 700, fontSize: 22, lineHeight: 1.3 }}>{selected.title}</h2>
                  <div className="text-xs text-muted-foreground mb-1">Awarded to</div>
                  <div className="text-foreground mb-4" style={{ fontWeight: 700, fontSize: 18 }}>{user.name}</div>
                  <div className="flex items-center gap-4 flex-wrap text-[11px] text-muted-foreground">
                    <div>
                      <div style={{ fontWeight: 700 }} className="text-foreground">{selected.issuedDate || "Pending"}</div>
                      <div>Issue date</div>
                    </div>
                    <div className="h-8 w-px bg-amber-200" />
                    <div>
                      <div style={{ fontWeight: 700 }} className="text-foreground">HMR-{selected.id.slice(-6).toUpperCase()}</div>
                      <div>Verification ID</div>
                    </div>
                    <div className="h-8 w-px bg-amber-200" />
                    <div>
                      <StatusPill status={selected.status} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-sm text-foreground mb-3" style={{ fontWeight: 700 }}>Requirements</h3>
                <RequirementChecklist items={selected.requirements} />
              </div>
            </Card>

            {/* Visibility */}
            <Card>
              <h3 className="text-sm text-foreground mb-3" style={{ fontWeight: 700 }}>Visibility &amp; Sharing</h3>
              <div className="space-y-2">
                <ConsentControl
                  label="Show on my profile"
                  description="Anyone viewing your profile can see this certificate."
                  enabled={shareOnProfile}
                  onChange={(v) => { setShareOnProfile(v); toast.success(v ? "Visible on profile" : "Hidden from profile"); }}
                />
                <ConsentControl
                  label="Share with selected companies"
                  description="Pick specific companies to receive this certificate. Granular consent."
                  enabled={shareWithCompany}
                  onChange={(v) => { setShareWithCompany(v); toast.success(v ? "Sharing enabled" : "Sharing disabled"); }}
                />
              </div>
            </Card>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-wrap">
              {selected.status === "Eligible" && (
                <Button variant="gradient" onClick={() => toast.success("Certificate issued and saved to your profile.")}>
                  <Award className="w-4 h-4" />
                  Issue Certificate
                </Button>
              )}
              {(selected.status === "Issued" || selected.status === "Shared") && (
                <>
                  <Button variant="gradient" onClick={() => toast.success("Share link copied")}>
                    <Share2 className="w-4 h-4" /> Share
                  </Button>
                  <Button variant="outline" onClick={() => toast.success("Certificate downloaded (PDF)")}>
                    <Download className="w-4 h-4" /> Download PDF
                  </Button>
                </>
              )}
              {selected.status === "In Progress" && (
                <Button variant="gradient" onClick={() => navigate("/learning/unit/login-design")}>
                  <Play className="w-4 h-4" />
                  Continue Practice
                </Button>
              )}
              {selected.status === "Not Eligible" && (
                <Button variant="outline" onClick={() => navigate("/learning/paths/product-designer")}>
                  See requirements
                </Button>
              )}
            </div>

            <PrivacyNotice>
              Certificates and verified skills are public <span style={{ fontWeight: 700 }}>only with your consent</span>. Issued certificates can be revoked from visibility at any time without losing your earned credential.
            </PrivacyNotice>
          </div>
        )}
      </div>
    </div>
  );
}
