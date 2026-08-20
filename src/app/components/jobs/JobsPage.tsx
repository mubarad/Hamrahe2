import { useState, useEffect } from "react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { MatchScore } from "../ui/MatchScore";
import { JobSkeleton } from "../ui/Skeleton";
import { feedJobs, type JobPost } from "../../data/mock-data";
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Clock,
  Users,
  Bookmark,
  X,
  TrendingUp,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  Share2,
  ExternalLink,
  Check,
  Lightbulb,
  Target,
  Zap,
  AlertTriangle,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { toast } from "sonner";

type JobsState = "loading" | "active" | "empty";
type ApplyState = "idle" | "applying" | "success" | "error";
type ApplyStep = 1 | 2 | 3 | 4;

const JOB_TYPES = ["All", "Full-time", "Part-time", "Remote", "Freelance", "Contract"];

export function JobsPage() {
  const [state, setState] = useState<JobsState>("loading");
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<"match" | "recent">("match");
  const [selectedJob, setSelectedJob] = useState<JobPost | null>(null);
  const [applyState, setApplyState] = useState<ApplyState>("idle");
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applyStep, setApplyStep] = useState<ApplyStep>(1);
  const [coverNote, setCoverNote] = useState("");
  const [selectedResume, setSelectedResume] = useState<"auto" | "en" | "fa">("auto");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const t = setTimeout(() => {
      setJobs(feedJobs);
      setState("active");
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  // Auto-select first job on desktop
  useEffect(() => {
    if (state === "active" && !selectedJob && jobs.length > 0) {
      setSelectedJob(jobs[0]);
    }
  }, [state, jobs]);

  const toggleSave = (id: string) => {
    setSavedJobs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast("Job removed from saved");
      } else {
        next.add(id);
        toast.success("Job saved!");
      }
      return next;
    });
  };

  const filteredJobs = jobs
    .filter((j) => {
      if (selectedType !== "All" && j.type !== selectedType) return false;
      if (searchQuery && !j.title.toLowerCase().includes(searchQuery.toLowerCase()) && !j.company.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => (sortBy === "match" ? b.matchScore - a.matchScore : 0));

  const handleApply = () => {
    setApplyState("applying");
    setTimeout(() => {
      if (Math.random() > 0.1) {
        setApplyState("success");
        toast.success(`Application sent for ${selectedJob?.title} at ${selectedJob?.company}!`);
      } else {
        setApplyState("error");
        toast.error("Application failed. Please try again.");
      }
    }, 2000);
  };

  const handleSelectJob = (job: JobPost) => {
    setSelectedJob(job);
    setApplyState("idle");
    setShowApplyModal(false);
    setApplyStep(1);
    setCoverNote("");
    setPhone("");
  };

  const openApplyModal = () => {
    setApplyStep(1);
    setCoverNote("");
    setPhone("");
    setShowApplyModal(true);
  };

  const handleApplySubmit = () => {
    setApplyStep(4);
    handleApply();
  };

  return (
    <div>
      {/* Search & Filters Bar */}
      <div className="bg-card border border-border/30 rounded-2xl p-5 mb-5 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-2 bg-muted/50 rounded-2xl px-4 py-2.5 flex-1 border border-border/20 focus-within:ring-2 focus-within:ring-primary/20 focus-within:bg-white transition-all">
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jobs, companies..."
              className="flex-1 bg-transparent text-sm focus:outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="cursor-pointer">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>
          <div className="flex gap-1.5 bg-muted/50 rounded-xl p-1">
            {(["match", "recent"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className={`px-3.5 py-2 rounded-lg text-xs cursor-pointer transition-all ${
                  sortBy === s ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {s === "match" ? "Best Match" : "Most Recent"}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {JOB_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
                selectedType === type
                  ? "bg-gradient-to-r from-[#0066FF] to-[#7c3aed] text-white shadow-sm shadow-primary/20"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted border border-border/20"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {state === "loading" && (
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-5">
          <div className="space-y-3">
            <JobSkeleton />
            <JobSkeleton />
            <JobSkeleton />
          </div>
          <div className="hidden lg:block">
            <div className="bg-card border border-border/30 rounded-2xl p-8 h-96 animate-pulse" />
          </div>
        </div>
      )}

      {/* Active */}
      {state === "active" && (
        <>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-muted-foreground">{filteredJobs.length} jobs found</span>
            {savedJobs.size > 0 && (
              <span className="text-xs text-violet-500">{savedJobs.size} saved</span>
            )}
          </div>

          {filteredJobs.length === 0 ? (
            <Card className="text-center py-12">
              <Search className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-foreground">No jobs found</p>
              <p className="text-xs text-muted-foreground mt-1">Try adjusting your search or filters</p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-3"
                onClick={() => { setSearchQuery(""); setSelectedType("All"); }}
              >
                Clear filters
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-5">
              {/* Job List */}
              <div className="space-y-2 lg:max-h-[calc(100vh-220px)] lg:overflow-y-auto lg:pr-1">
                {filteredJobs.map((job, idx) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <div
                      onClick={() => handleSelectJob(job)}
                      className={`bg-card border rounded-2xl p-4 cursor-pointer transition-all hover:shadow-md relative overflow-hidden ${
                        selectedJob?.id === job.id
                          ? "border-primary/30 shadow-md ring-1 ring-primary/10"
                          : "border-border/30 shadow-sm"
                      }`}
                    >
                      {/* Match accent */}
                      <div
                        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                        style={{
                          background: job.matchScore >= 80
                            ? "linear-gradient(to bottom, #00C853, #0066FF)"
                            : job.matchScore >= 60
                            ? "linear-gradient(to bottom, #FF9800, #F44336)"
                            : "#F44336",
                        }}
                      />
                      {job.isPromoted && (
                        <div className="flex items-center gap-1.5 mb-2">
                          <TrendingUp className="w-3.5 h-3.5 text-violet-500" />
                          <span className="text-xs text-violet-600">Promoted</span>
                        </div>
                      )}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm text-foreground leading-snug">{job.title}</h3>
                          <Link
                            to={`/company/${job.company.toLowerCase().replace(/\s+/g, "-")}`}
                            className="text-sm text-muted-foreground hover:text-primary hover:underline transition-colors inline-block"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {job.company}
                          </Link>
                          <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{job.postedAgo}</span>
                          </div>
                        </div>
                        <MatchScore score={job.matchScore} size="sm" />
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        <Badge variant="primary" size="sm">{job.type}</Badge>
                        {job.salary && <Badge variant="success" size="sm">{job.salary}</Badge>}
                        <Badge variant="outline" size="sm"><Users className="w-3 h-3" />{job.applicants}</Badge>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Job Detail Panel */}
              <div className="hidden lg:block">
                {selectedJob ? (
                  <div className="bg-card border border-border/30 rounded-2xl shadow-sm sticky top-[76px] max-h-[calc(100vh-100px)] overflow-y-auto">
                    <div className="p-6 space-y-5">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{
                            background: "linear-gradient(135deg, rgba(0,102,255,0.15) 0%, rgba(124,58,237,0.15) 100%)"
                          }}>
                            <Briefcase className="w-7 h-7 text-primary" />
                          </div>
                          <div>
                            <h2 className="text-foreground">{selectedJob.title}</h2>
                            <Link
                              to={`/company/${selectedJob.company.toLowerCase().replace(/\s+/g, "-")}`}
                              className="text-sm text-muted-foreground hover:text-primary hover:underline transition-colors inline-block"
                            >
                              {selectedJob.company}
                            </Link>
                            <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{selectedJob.location}</span>
                              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{selectedJob.postedAgo}</span>
                              <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{selectedJob.applicants} applicants</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon"><Share2 className="w-4 h-4" /></Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleSave(selectedJob.id)}
                            className={savedJobs.has(selectedJob.id) ? "text-primary" : ""}
                          >
                            <Bookmark className={`w-4 h-4 ${savedJobs.has(selectedJob.id) ? "fill-primary" : ""}`} />
                          </Button>
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="primary">{selectedJob.type}</Badge>
                        {selectedJob.salary && <Badge variant="success">{selectedJob.salary}</Badge>}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        {applyState === "idle" && (
                          <Button variant="primary" size="md" className="flex-1" onClick={openApplyModal}>
                            Apply Now
                          </Button>
                        )}
                        {applyState === "applying" && (
                          <div className="flex-1 flex items-center justify-center gap-2 py-2 bg-muted rounded-xl">
                            <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                            <span className="text-sm text-muted-foreground">Submitting...</span>
                          </div>
                        )}
                        {applyState === "success" && (
                          <div className="flex-1 flex items-center justify-center gap-2 py-2 bg-emerald-50 rounded-xl text-emerald-600">
                            <CheckCircle2 className="w-5 h-5" />
                            <span className="text-sm">Application submitted!</span>
                          </div>
                        )}
                        {applyState === "error" && (
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-center gap-2 py-2 bg-red-50 rounded-xl text-red-600">
                              <AlertCircle className="w-4 h-4" />
                              <span className="text-sm">Failed. Please try again.</span>
                            </div>
                            <Button variant="primary" size="sm" className="w-full" onClick={handleApply}>Retry</Button>
                          </div>
                        )}
                      </div>

                      {/* Match Score */}
                      <div className="p-4 rounded-2xl border" style={{
                        background: "linear-gradient(135deg, rgba(0,102,255,0.04) 0%, rgba(124,58,237,0.04) 100%)",
                        borderColor: "rgba(0,102,255,0.1)"
                      }}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Target className="w-5 h-5 text-primary" />
                            <span className="text-sm text-foreground">Your Match Score</span>
                          </div>
                          <MatchScore score={selectedJob.matchScore} size="md" />
                        </div>
                        <div className="space-y-1.5">
                          {selectedJob.skills.slice(0, 3).map((skill) => (
                            <div key={skill} className="flex items-center gap-2 text-xs">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                              <span className="text-foreground">{skill}</span>
                              <span className="text-emerald-600">Match</span>
                            </div>
                          ))}
                          {selectedJob.skills.slice(3).map((skill) => (
                            <div key={skill} className="flex items-center gap-2 text-xs">
                              <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                              <span className="text-muted-foreground">{skill}</span>
                              <span className="text-amber-600">Missing</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Gap Analysis */}
                      {selectedJob.gapAnalysis && selectedJob.gapAnalysis.length > 0 && (
                        <div className="p-4 rounded-2xl border border-amber-200/50 bg-amber-50/30">
                          <div className="flex items-center gap-2 mb-3">
                            <Target className="w-5 h-5 text-amber-600" />
                            <span className="text-sm text-foreground" style={{ fontWeight: 600 }}>Gap Analysis</span>
                          </div>
                          <p className="text-xs text-muted-foreground mb-3">Here's how your skills match up with this role — and what you can improve.</p>
                          <div className="space-y-2">
                            {selectedJob.gapAnalysis.map(gap => (
                              <div key={gap.skill} className="flex items-start gap-2.5">
                                {gap.status === "have" && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />}
                                {gap.status === "partial" && <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />}
                                {gap.status === "missing" && <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />}
                                <div>
                                  <span className={`text-xs ${gap.status === "have" ? "text-emerald-700" : gap.status === "partial" ? "text-amber-700" : "text-red-600"}`} style={{ fontWeight: 500 }}>
                                    {gap.skill}
                                  </span>
                                  {gap.tip && <p className="text-[11px] text-muted-foreground mt-0.5">{gap.tip}</p>}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Smart Apply Tips */}
                      {selectedJob.smartTips && selectedJob.smartTips.length > 0 && (
                        <div className="p-4 rounded-2xl border border-violet-200/50 bg-violet-50/30">
                          <div className="flex items-center gap-2 mb-3">
                            <Lightbulb className="w-5 h-5 text-violet-600" />
                            <span className="text-sm text-foreground" style={{ fontWeight: 600 }}>Smart Apply Tips</span>
                          </div>
                          <div className="space-y-2">
                            {selectedJob.smartTips.map((tip, i) => (
                              <div key={i} className="flex items-start gap-2.5">
                                <Zap className="w-3.5 h-3.5 text-violet-500 shrink-0 mt-0.5" />
                                <p className="text-xs text-muted-foreground">{tip}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Description */}
                      <div>
                        <h3 className="text-sm text-foreground mb-2">About this role</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{selectedJob.description}</p>
                      </div>

                      {/* Requirements */}
                      <div>
                        <h3 className="text-sm text-foreground mb-2">Requirements</h3>
                        <ul className="space-y-2">
                          {selectedJob.requirements.map((req, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Skills */}
                      <div>
                        <h3 className="text-sm text-foreground mb-2">Required Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedJob.skills.map((skill) => {
                            const matched = selectedJob.skills.indexOf(skill) < 3;
                            return (
                              <Badge key={skill} variant={matched ? "primary" : "default"} size="md">
                                {matched && <Check className="w-3 h-3" />}
                                {skill}
                              </Badge>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Card className="flex items-center justify-center h-96">
                    <div className="text-center">
                      <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground">Select a job to view details</p>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {/* Multi-step Apply Modal */}
      <AnimatePresence>
        {showApplyModal && selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
            onClick={() => { if (applyStep < 4) setShowApplyModal(false); }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-2xl w-full max-w-lg mx-4 shadow-xl overflow-hidden"
            >
              {/* Progress header */}
              {applyStep < 4 && (
                <div className="px-6 pt-5 pb-4 border-b border-border/15">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-foreground text-sm" style={{ fontWeight: 600 }}>Apply · {selectedJob.title}</h3>
                      <p className="text-xs text-muted-foreground">{selectedJob.company} · {selectedJob.location}</p>
                    </div>
                    <button onClick={() => setShowApplyModal(false)} className="p-1.5 hover:bg-muted rounded-lg cursor-pointer">
                      <X className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </div>
                  {/* Step indicators */}
                  <div className="flex items-center gap-2">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="flex items-center gap-2 flex-1">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] shrink-0 transition-all ${
                          applyStep > step ? "bg-emerald-500 text-white" :
                          applyStep === step ? "bg-primary text-white" :
                          "bg-muted/50 text-muted-foreground"
                        }`} style={{ fontWeight: 600 }}>
                          {applyStep > step ? "✓" : step}
                        </div>
                        <span className={`text-[11px] hidden sm:block ${applyStep === step ? "text-foreground" : "text-muted-foreground/60"}`}>
                          {step === 1 ? "Cover Note" : step === 2 ? "Resume" : "Review"}
                        </span>
                        {step < 3 && <div className={`flex-1 h-px ${applyStep > step ? "bg-emerald-400" : "bg-border/30"}`} />}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {/* Step 1: Cover Note */}
                  {applyStep === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                      <div>
                        <h4 className="text-sm text-foreground mb-1" style={{ fontWeight: 500 }}>Cover note</h4>
                        <p className="text-xs text-muted-foreground mb-3">A personalized note increases your chances by 3x.</p>
                        <textarea
                          value={coverNote}
                          onChange={e => setCoverNote(e.target.value)}
                          maxLength={500}
                          placeholder={`Hi, I'm excited about the ${selectedJob.title} role at ${selectedJob.company}. My background in...`}
                          className="w-full bg-muted/30 border border-border/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[120px] resize-none"
                        />
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-[11px] text-muted-foreground/60">Optional but highly recommended</p>
                          <span className="text-[11px] text-muted-foreground/50">{coverNote.length}/500</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1.5 block">Phone number (optional)</label>
                        <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+98 912 000 0000"
                          className="w-full px-4 py-2.5 bg-muted/30 border border-border/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Resume select */}
                  {applyStep === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
                      <div>
                        <h4 className="text-sm text-foreground mb-1" style={{ fontWeight: 500 }}>Choose your resume</h4>
                        <p className="text-xs text-muted-foreground mb-4">Select the version of your resume to attach.</p>
                      </div>
                      {[
                        { id: "auto" as const, label: "Auto-generated (English)", desc: "Generated from your Hamrahe profile · Updated today", badge: "Recommended" },
                        { id: "en" as const, label: "Uploaded resume (English)", desc: "Ahmad_Parvizi_Resume_2024.pdf · 2.1 MB", badge: null },
                        { id: "fa" as const, label: "Auto-generated (فارسی)", desc: "نسخه فارسی رزومه از پروفایل شما · Updated today", badge: null },
                      ].map(opt => (
                        <button key={opt.id} onClick={() => setSelectedResume(opt.id)}
                          className={`w-full flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all text-left ${
                            selectedResume === opt.id ? "border-primary/40 bg-primary/5" : "border-border/30 hover:border-border/60 hover:bg-muted/20"
                          }`}>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                            selectedResume === opt.id ? "border-primary bg-primary" : "border-border/50"
                          }`}>
                            {selectedResume === opt.id && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-foreground" style={{ fontWeight: selectedResume === opt.id ? 500 : 400 }}>{opt.label}</span>
                              {opt.badge && <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] rounded-md border border-emerald-100">{opt.badge}</span>}
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}

                  {/* Step 3: Review */}
                  {applyStep === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                      <div>
                        <h4 className="text-sm text-foreground mb-1" style={{ fontWeight: 500 }}>Review your application</h4>
                        <p className="text-xs text-muted-foreground mb-4">Everything looks good? Submit when ready.</p>
                      </div>
                      <div className="space-y-3">
                        <div className="p-3 bg-muted/20 rounded-xl">
                          <p className="text-[10px] text-muted-foreground/60 uppercase tracking-wider mb-1">Applying for</p>
                          <p className="text-sm text-foreground" style={{ fontWeight: 500 }}>{selectedJob.title}</p>
                          <p className="text-xs text-muted-foreground">{selectedJob.company} · {selectedJob.location}</p>
                        </div>
                        <div className="p-3 bg-muted/20 rounded-xl">
                          <p className="text-[10px] text-muted-foreground/60 uppercase tracking-wider mb-1">Cover note</p>
                          {coverNote ? (
                            <p className="text-xs text-foreground leading-relaxed line-clamp-3">{coverNote}</p>
                          ) : (
                            <p className="text-xs text-muted-foreground/50 italic">No cover note added</p>
                          )}
                        </div>
                        <div className="p-3 bg-muted/20 rounded-xl">
                          <p className="text-[10px] text-muted-foreground/60 uppercase tracking-wider mb-1">Resume</p>
                          <p className="text-xs text-foreground">
                            {selectedResume === "auto" ? "Auto-generated (English)" : selectedResume === "en" ? "Uploaded resume" : "Auto-generated (فارسی)"}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-xl border border-primary/15">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                          <p className="text-xs text-foreground">Your Hamrahe profile will be attached ({selectedJob.matchScore}% match)</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Success */}
                  {applyStep === 4 && (
                    <motion.div key="step4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
                      {applyState === "applying" && (
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                          <p className="text-foreground" style={{ fontWeight: 500 }}>Submitting application...</p>
                          <p className="text-xs text-muted-foreground">This will just take a moment</p>
                        </div>
                      )}
                      {applyState === "success" && (
                        <div className="flex flex-col items-center gap-4">
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }}
                            className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                          </motion.div>
                          <div>
                            <p className="text-foreground" style={{ fontWeight: 600 }}>Application submitted!</p>
                            <p className="text-sm text-muted-foreground mt-1">{selectedJob.company} will review your application</p>
                          </div>
                          <div className="w-full p-3 bg-muted/20 rounded-xl text-left">
                            <p className="text-xs text-muted-foreground">
                              <span style={{ fontWeight: 500 }}>What's next:</span> Companies typically respond within 5-7 business days. We'll notify you of any updates.
                            </p>
                          </div>
                          <Button variant="gradient" className="w-full" onClick={() => { setShowApplyModal(false); setApplyStep(1); }}>
                            Done
                          </Button>
                        </div>
                      )}
                      {applyState === "error" && (
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                            <X className="w-8 h-8 text-red-500" />
                          </div>
                          <p className="text-foreground" style={{ fontWeight: 500 }}>Something went wrong</p>
                          <Button variant="primary" className="w-full" onClick={() => { setApplyState("idle"); setApplyStep(3); }}>Try again</Button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation footer */}
              {applyStep < 4 && (
                <div className="px-6 pb-5 flex items-center gap-3">
                  {applyStep > 1 && (
                    <Button variant="outline" className="flex-1" onClick={() => setApplyStep(s => (s - 1) as ApplyStep)}>
                      Back
                    </Button>
                  )}
                  {applyStep < 3 ? (
                    <Button variant="gradient" className="flex-1" onClick={() => setApplyStep(s => (s + 1) as ApplyStep)}>
                      Continue
                    </Button>
                  ) : (
                    <Button variant="gradient" className="flex-1" onClick={handleApplySubmit}>
                      Submit Application
                    </Button>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}