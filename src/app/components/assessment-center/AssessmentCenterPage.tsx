import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  Brain, Play, Clock, Shield, FileText, Building2, AlertCircle,
  ChevronRight, CheckCircle2, ArrowRight, Lock, BarChart3, Star,
  Search, Filter, Download, Eye, RefreshCw, Bell,
} from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import {
  ASSESSMENT_CENTER_ITEMS,
  USER_ATTEMPTS,
  ASSESSMENT_CENTER_RESULTS,
  ASSESSMENT_FAMILIES,
  getLaunchBatch,
  type AssessmentFamily,
  type AttemptStatus,
} from "../../data/assessment-center-data";

const TIMED_MODE_COLORS: Record<string, string> = {
  "Untimed": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Soft Timed": "bg-amber-50 text-amber-700 border-amber-200",
  "Strict Timed": "bg-red-50 text-red-700 border-red-200",
};

const ATTEMPT_STATUS_STYLES: Record<AttemptStatus, { label: string; color: string }> = {
  "Not Started": { label: "Not Started", color: "text-muted-foreground" },
  "Ready to Start": { label: "Ready", color: "text-blue-600" },
  "Requested by Company": { label: "Requested", color: "text-amber-600" },
  "In Progress": { label: "In Progress", color: "text-primary" },
  "Paused": { label: "Paused", color: "text-amber-600" },
  "Submitted": { label: "Submitted", color: "text-emerald-600" },
  "Auto-submitted": { label: "Auto-submitted", color: "text-emerald-600" },
  "Expired": { label: "Expired", color: "text-red-500" },
  "Abandoned": { label: "Abandoned", color: "text-slate-500" },
  "Completed": { label: "Completed", color: "text-emerald-600" },
  "Retake Available": { label: "Retake Available", color: "text-violet-600" },
};

export function AssessmentCenterPage() {
  const navigate = useNavigate();
  const [familyFilter, setFamilyFilter] = useState<AssessmentFamily | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");

  const launchBatch = getLaunchBatch();
  const companyRequests = USER_ATTEMPTS.filter((a) => a.status === "Requested by Company");
  const completedAttempts = USER_ATTEMPTS.filter((a) => a.status === "Completed");

  const filteredItems = ASSESSMENT_CENTER_ITEMS.filter((item) => {
    const matchesFamily = familyFilter === "All" || item.family === familyFilter;
    const matchesSearch =
      !searchQuery ||
      item.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.family.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFamily && matchesSearch;
  });

  const recommendations = launchBatch
    .filter((a) => !USER_ATTEMPTS.find((u) => u.assessmentId === a.id))
    .slice(0, 5);

  return (
    <div className="max-w-[1100px] mx-auto space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-600 to-primary flex items-center justify-center shadow-md shadow-primary/20">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-foreground" style={{ fontWeight: 700, fontSize: 24 }}>
                  Assessment Center
                </h1>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 border border-violet-200" style={{ fontWeight: 700 }}>
                  PHASE 0
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Standardized, report-driven assessments for personality, behavior, cognition, and professional readiness.
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={() => navigate("/profile")} className="shrink-0">
            <BarChart3 className="w-4 h-4" />
            My Reports
          </Button>
        </div>
      </motion.div>

      {/* What is Assessment Center */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <Card className="bg-gradient-to-br from-violet-50 via-white to-primary/5 border-violet-200/50 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-500/10 to-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="relative grid md:grid-cols-4 gap-4">
            {[
              { icon: FileText, label: "Full Reports", desc: "Detailed PDF-grade reports for every assessment" },
              { icon: Shield, label: "Private by Default", desc: "You control what companies see, always" },
              { icon: Building2, label: "Company Sharing", desc: "Consent-based sharing — never auto-shared" },
              { icon: CheckCircle2, label: "Verified & Downloadable", desc: "Report ID, QR code, and verification link" },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-white border border-border/40 flex items-center justify-center shrink-0 shadow-sm">
                  <Icon className="w-4 h-4 text-violet-600" />
                </div>
                <div>
                  <div className="text-xs text-foreground" style={{ fontWeight: 700 }}>{label}</div>
                  <div className="text-[11px] text-muted-foreground leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      <div className="grid lg:grid-cols-[1fr_300px] gap-6">
        <div className="space-y-6 min-w-0">
          {/* Company Requests */}
          {companyRequests.length > 0 && (
            <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <SectionHeader
                icon={<Bell className="w-4 h-4 text-amber-600" />}
                title="Company Requests"
                badge={companyRequests.length}
              />
              <div className="space-y-3">
                {companyRequests.map((attempt) => {
                  const item = ASSESSMENT_CENTER_ITEMS.find((a) => a.id === attempt.assessmentId);
                  if (!item) return null;
                  const req = attempt.requestedByCompany!;
                  const deadline = new Date(req.deadline);
                  const daysLeft = Math.ceil((deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                  return (
                    <Card key={attempt.id} className="border-amber-200/60 bg-amber-50/40">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0`}>
                          <span className="text-white text-xs" style={{ fontWeight: 800 }}>{item.iconLabel}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-0.5">
                            <span className="text-sm text-foreground" style={{ fontWeight: 700 }}>{item.displayName}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200" style={{ fontWeight: 600 }}>
                              Requested by Company
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">
                            <span style={{ fontWeight: 600 }}>{req.name}</span> — {req.purpose}
                          </p>
                          <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {item.estimatedMinutes} min
                            </span>
                            <span className={`flex items-center gap-1 ${daysLeft <= 3 ? "text-red-600" : "text-amber-700"}`} style={{ fontWeight: 600 }}>
                              <AlertCircle className="w-3 h-3" />
                              {daysLeft} days left
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 shrink-0">
                          <Button size="sm" variant="gradient" onClick={() => navigate(`/assessment-center/${item.id}`)}>
                            Start Now
                          </Button>
                          <Button size="sm" variant="ghost" className="text-xs text-muted-foreground">
                            Decline
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </motion.section>
          )}

          {/* Completed Assessments */}
          {completedAttempts.length > 0 && (
            <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <SectionHeader
                icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                title="Completed Assessments"
                badge={completedAttempts.length}
              />
              <div className="space-y-2">
                {completedAttempts.map((attempt) => {
                  const item = ASSESSMENT_CENTER_ITEMS.find((a) => a.id === attempt.assessmentId);
                  const result = ASSESSMENT_CENTER_RESULTS[attempt.assessmentId];
                  if (!item) return null;
                  return (
                    <button
                      key={attempt.id}
                      onClick={() => navigate(`/assessment-center/${item.id}`)}
                      className="w-full text-left p-4 rounded-2xl border border-border/40 bg-white hover:border-primary/30 hover:bg-primary/[0.02] transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0`}>
                          <span className="text-white text-[11px]" style={{ fontWeight: 800 }}>{item.iconLabel}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm text-foreground" style={{ fontWeight: 700 }}>{item.displayName}</span>
                            {result && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200" style={{ fontWeight: 600 }}>
                                {result.overallProfile} · {result.overallLabel}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 mt-0.5 text-[11px] text-muted-foreground">
                            <span>{item.familyShort}</span>
                            {attempt.submittedAt && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                Last taken {new Date(attempt.submittedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                              </span>
                            )}
                            {result && (
                              <span className="flex items-center gap-1">
                                {result.visibility === "Only Me" ? (
                                  <><Lock className="w-3 h-3" /> Private</>
                                ) : (
                                  <><Eye className="w-3 h-3" /> {result.visibility}</>
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {result && (
                            <>
                              <span className="text-[10px] px-2 py-1 rounded-lg bg-muted/50 text-muted-foreground flex items-center gap-1" style={{ fontWeight: 600 }}>
                                <Download className="w-3 h-3" />
                                PDF
                              </span>
                              <span className="text-[10px] px-2 py-1 rounded-lg bg-violet-50 text-violet-700 border border-violet-200 flex items-center gap-1" style={{ fontWeight: 600 }}>
                                <RefreshCw className="w-3 h-3" />
                                Retake
                              </span>
                            </>
                          )}
                          <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.section>
          )}

          {/* Assessment Library */}
          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <SectionHeader
              icon={<Brain className="w-4 h-4 text-primary" />}
              title="Assessment Library"
              description="10 launch-batch assessments — standardized, report-driven, privacy-first."
            />

            {/* Search + Filter */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search assessments..."
                  className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-border/40 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
                />
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() => setFamilyFilter("All")}
                  className={`text-xs px-3 py-2 rounded-xl border transition-all ${familyFilter === "All" ? "bg-primary text-white border-primary" : "bg-white text-muted-foreground border-border/40 hover:border-primary/30"}`}
                  style={{ fontWeight: 600 }}
                >
                  All
                </button>
                {ASSESSMENT_FAMILIES.slice(0, 6).map((f) => (
                  <button
                    key={f.family}
                    onClick={() => setFamilyFilter(familyFilter === f.family ? "All" : f.family)}
                    className={`text-xs px-3 py-2 rounded-xl border transition-all ${familyFilter === f.family ? "bg-primary text-white border-primary" : "bg-white text-muted-foreground border-border/40 hover:border-primary/30"}`}
                    style={{ fontWeight: 600 }}
                  >
                    {f.family.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {filteredItems.map((item, i) => {
                const attempt = USER_ATTEMPTS.find((a) => a.assessmentId === item.id);
                const result = ASSESSMENT_CENTER_RESULTS[item.id];
                const isCompleted = attempt?.status === "Completed";
                const isRequested = attempt?.status === "Requested by Company";

                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => navigate(`/assessment-center/${item.id}`)}
                    className="w-full text-left p-4 rounded-2xl border border-border/40 bg-white hover:border-primary/30 hover:shadow-sm hover:shadow-primary/5 transition-all group"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0`}>
                        <span className="text-white text-[11px]" style={{ fontWeight: 800 }}>{item.iconLabel}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <span className="text-sm text-foreground" style={{ fontWeight: 700 }}>{item.displayName}</span>
                          {item.isLaunchBatch && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-primary/10 text-primary" style={{ fontWeight: 700 }}>LAUNCH</span>
                          )}
                        </div>
                        <span className="text-[11px] text-muted-foreground">{item.familyShort}</span>
                      </div>
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : isRequested ? (
                        <Bell className="w-4 h-4 text-amber-500 shrink-0" />
                      ) : null}
                    </div>

                    <p className="text-[11px] text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] px-2 py-1 rounded-lg bg-muted/50 text-muted-foreground flex items-center gap-1" style={{ fontWeight: 600 }}>
                        <Clock className="w-3 h-3" />
                        {item.estimatedMinutes} min
                      </span>
                      <span className={`text-[10px] px-2 py-1 rounded-lg border ${TIMED_MODE_COLORS[item.timedMode]}`} style={{ fontWeight: 600 }}>
                        {item.timedMode}
                      </span>
                      {item.sensitivityLevel === "Sensitive" && (
                        <span className="text-[10px] px-2 py-1 rounded-lg bg-slate-50 text-slate-600 border border-slate-200 flex items-center gap-1" style={{ fontWeight: 600 }}>
                          <Lock className="w-3 h-3" />
                          Sensitive
                        </span>
                      )}
                      {isCompleted && result && (
                        <span className="text-[10px] px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200" style={{ fontWeight: 600 }}>
                          {result.overallProfile}
                        </span>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Brain className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">No assessments match your search.</p>
              </div>
            )}
          </motion.section>

          {/* Assessment Families */}
          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <SectionHeader
              icon={<Filter className="w-4 h-4 text-muted-foreground" />}
              title="All Assessment Families"
              description="Full library — more assessments will be added in future phases."
            />
            <div className="grid sm:grid-cols-2 gap-2.5">
              {ASSESSMENT_FAMILIES.map((f) => (
                <button
                  key={f.family}
                  onClick={() => setFamilyFilter(f.family)}
                  className="flex items-center gap-3 p-3.5 rounded-2xl border border-border/40 bg-white hover:border-primary/30 hover:bg-primary/[0.02] transition-all text-left group"
                >
                  <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center shrink-0`}>
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-foreground" style={{ fontWeight: 700 }}>{f.family}</div>
                    <div className="text-[10px] text-muted-foreground">{f.description}</div>
                  </div>
                  <span className="text-[10px] text-muted-foreground/60 shrink-0">{f.count}+</span>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                </button>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Your Assessment Profile */}
          <Card>
            <h3 className="text-sm text-foreground mb-3" style={{ fontWeight: 700 }}>Your Assessment Profile</h3>
            {completedAttempts.length === 0 ? (
              <div className="text-center py-6">
                <Brain className="w-10 h-10 mx-auto mb-2 text-muted-foreground/30" />
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                  You have not completed any assessments yet. Start with standardized assessments to understand your personality, work style, and professional readiness.
                </p>
                <Button size="sm" variant="gradient" onClick={() => navigate("/assessment-center/mbti")}>
                  <Play className="w-3.5 h-3.5" />
                  Start First Assessment
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                {completedAttempts.map((attempt) => {
                  const item = ASSESSMENT_CENTER_ITEMS.find((a) => a.id === attempt.assessmentId);
                  const result = ASSESSMENT_CENTER_RESULTS[attempt.assessmentId];
                  if (!item || !result) return null;
                  return (
                    <button
                      key={attempt.id}
                      onClick={() => navigate(`/assessment-center/${item.id}`)}
                      className="w-full flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-muted/40 transition-colors text-left"
                    >
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0`}>
                        <span className="text-white text-[10px]" style={{ fontWeight: 800 }}>{item.iconLabel}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-foreground line-clamp-1" style={{ fontWeight: 600 }}>{item.displayName}</div>
                        <div className="text-[10px] text-emerald-600" style={{ fontWeight: 600 }}>{result.overallProfile} · {result.overallLabel}</div>
                      </div>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    </button>
                  );
                })}
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full text-[11px] text-primary py-2 text-center hover:underline"
                  style={{ fontWeight: 600 }}
                >
                  View full Assessment & Reports →
                </button>
              </div>
            )}
          </Card>

          {/* Recommended Next */}
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>Recommended for You</h3>
            </div>
            <div className="space-y-2">
              {recommendations.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(`/assessment-center/${item.id}`)}
                  className="w-full flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-muted/40 transition-colors text-left group"
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0`}>
                    <span className="text-white text-[10px]" style={{ fontWeight: 800 }}>{item.iconLabel}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-foreground line-clamp-1" style={{ fontWeight: 600 }}>{item.displayName}</div>
                    <div className="text-[10px] text-muted-foreground">{item.estimatedMinutes} min · {item.familyShort}</div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                </button>
              ))}
            </div>
          </Card>

          {/* Privacy Notice */}
          <Card className="bg-slate-50 border-slate-200/60">
            <div className="flex items-start gap-2.5">
              <Shield className="w-4 h-4 text-slate-600 mt-0.5 shrink-0" />
              <div>
                <div className="text-xs text-foreground mb-1" style={{ fontWeight: 700 }}>Privacy by Default</div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  All assessment results are private until you choose to share them. Companies cannot see your results without your explicit consent. Sensitive assessments cannot be used as the sole basis for hiring decisions.
                </p>
              </div>
            </div>
          </Card>

          {/* Retake reminder */}
          <Card>
            <div className="flex items-center gap-2 mb-2">
              <RefreshCw className="w-4 h-4 text-violet-600" />
              <h3 className="text-xs text-foreground" style={{ fontWeight: 700 }}>Retake Anytime</h3>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              You can retake any assessment whenever you want. Your latest result always appears on your profile. We recommend waiting 6–12 months between retakes for more meaningful insights.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({
  icon, title, description, badge,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
  badge?: number;
}) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div>
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="text-foreground" style={{ fontWeight: 700, fontSize: 16 }}>{title}</h2>
          {badge !== undefined && badge > 0 && (
            <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] flex items-center justify-center" style={{ fontWeight: 700 }}>
              {badge}
            </span>
          )}
        </div>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
      </div>
    </div>
  );
}
