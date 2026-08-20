import { useState } from "react";
import { Card } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { Badge } from "../../ui/Badge";
import { Avatar } from "../../ui/Avatar";
import {
  Briefcase,
  MapPin,
  Clock,
  Users,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  ChevronRight,
  Star,
  Zap,
  Shield,
  MessageSquare,
  Target,
  Award,
} from "lucide-react";
import { motion } from "motion/react";
import { JobData, MOCK_JOBS } from "../companyMockData";

interface JobsTabProps {
  viewMode: "public" | "loggedIn" | "admin";
}

function MatchBar({ score, color = "primary" }: { score: number; color?: string }) {
  const colorClass = color === "emerald" ? "bg-emerald-500" : color === "amber" ? "bg-amber-500" : "bg-primary";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-muted/60 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${colorClass} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
      <span className="text-xs text-foreground shrink-0" style={{ fontWeight: 700 }}>
        {score}%
      </span>
    </div>
  );
}

function JobCard({ job, viewMode }: { job: JobData; viewMode: "public" | "loggedIn" | "admin" }) {
  const [expanded, setExpanded] = useState(false);

  const matchColor = job.matchScore >= 85 ? "emerald" : job.matchScore >= 70 ? "primary" : "amber";

  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 flex-wrap mb-1">
            <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>
              {job.title}
            </h3>
            {job.sponsored && (
              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full" style={{ fontWeight: 600 }}>
                Sponsored
              </span>
            )}
          </div>
          <div className="flex items-center flex-wrap gap-2 text-xs text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <Briefcase className="w-3 h-3" />
              {job.department}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {job.location}
            </span>
            <span>·</span>
            <span>{job.model}</span>
            <span>·</span>
            <span>{job.workType}</span>
            <span>·</span>
            <span>{job.seniority}</span>
            {job.salaryRange && (
              <>
                <span>·</span>
                <span className="text-emerald-600" style={{ fontWeight: 600 }}>
                  {job.salaryRange}
                </span>
              </>
            )}
          </div>

          {viewMode !== "public" && (
            <div className="space-y-2 mb-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Your Match</span>
                </div>
                <MatchBar score={job.matchScore} color={matchColor} />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Application Readiness</span>
                </div>
                <MatchBar score={job.readinessScore} color={job.readinessScore >= 70 ? "emerald" : "amber"} />
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1.5 text-xs bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400 px-2.5 py-1 rounded-lg">
              <AlertCircle className="w-3 h-3" />
              <span>Assessment: {job.requiredAssessment}</span>
            </div>
            {viewMode !== "public" && (
              <div className="flex items-center gap-1.5 text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-2.5 py-1 rounded-lg">
                <BookOpen className="w-3 h-3" />
                <span>Learning: {job.recommendedLearning}</span>
              </div>
            )}
          </div>
        </div>

        <div className="text-right shrink-0">
          <div className="text-xs text-muted-foreground mb-1">{job.postedDate}</div>
          <div className="text-xs text-muted-foreground mb-3">{job.applicants} applicants</div>
          <div
            className={`text-sm px-2.5 py-1 rounded-xl text-center mb-1 ${
              job.jobQuality >= 85
                ? "bg-emerald-50 text-emerald-700"
                : "bg-amber-50 text-amber-700"
            }`}
            style={{ fontWeight: 600 }}
          >
            Quality {job.jobQuality}
          </div>
        </div>
      </div>

      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-4 pt-4 border-t border-border/30 space-y-3"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{job.responseTime}</span>
          </div>
          {job.hiringTeam.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground mb-2">Hiring Team</p>
              {job.hiringTeam.map((member) => (
                <div key={member.name} className="flex items-center gap-2">
                  <Avatar src={member.avatar} name={member.name} size="sm" />
                  <div>
                    <p className="text-sm text-foreground" style={{ fontWeight: 600 }}>
                      {member.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border/20">
        <Button variant="gradient" size="sm" className="flex-1">
          {viewMode !== "public" && job.readinessScore < 70 ? "Start Assessment First" : "View Job"}
        </Button>
        <Button variant="outline" size="sm" className="flex-1">
          Save
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-muted-foreground"
        >
          {expanded ? "Less" : "Details"}
        </Button>
      </div>
    </Card>
  );
}

function HiringProcess() {
  const stages = [
    { step: 1, label: "Resume Review", detail: "3–5 days" },
    { step: 2, label: "Assessment", detail: "Required" },
    { step: 3, label: "HR Interview", detail: "30 min" },
    { step: 4, label: "Technical Interview", detail: "60 min" },
    { step: 5, label: "Final Interview", detail: "45 min" },
    { step: 6, label: "Offer", detail: "1–3 days" },
  ];

  return (
    <Card>
      <h3 className="text-sm text-foreground mb-4" style={{ fontWeight: 700 }}>
        How to Get Hired Here
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Understand the hiring process, required assessments, and recommended learning paths before applying.
      </p>
      <div className="relative">
        <div className="absolute left-4 top-4 bottom-4 w-px bg-border/40" />
        <div className="space-y-3">
          {stages.map(({ step, label, detail }) => (
            <div key={step} className="flex items-center gap-3 relative">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 relative z-10 border-2 border-background">
                <span className="text-xs text-muted-foreground" style={{ fontWeight: 700 }}>
                  {step}
                </span>
              </div>
              <div className="flex-1">
                <span className="text-sm text-foreground" style={{ fontWeight: 600 }}>
                  {label}
                </span>
                <span className="text-xs text-muted-foreground ml-2">{detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function ApplicationTransparency() {
  const stats = [
    { label: "Average review time", value: "5 days", icon: Clock, color: "text-blue-600" },
    { label: "Response rate", value: "68%", icon: MessageSquare, color: "text-emerald-600" },
    { label: "Interview steps", value: "3", icon: Zap, color: "text-violet-600" },
    { label: "Application tracking", value: "Available", icon: Target, color: "text-primary" },
  ];

  return (
    <Card>
      <h3 className="text-sm text-foreground mb-4" style={{ fontWeight: 700 }}>
        Application Transparency
      </h3>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-muted/30 rounded-xl p-3">
            <Icon className={`w-4 h-4 ${color} mb-1`} />
            <p className="text-sm text-foreground" style={{ fontWeight: 700 }}>
              {value}
            </p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Transparent Hiring", "Fast Responder", "Structured Hiring"].map((badge) => (
          <div
            key={badge}
            className="flex items-center gap-1.5 text-xs bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-lg"
          >
            <Award className="w-3 h-3" />
            {badge}
          </div>
        ))}
      </div>
    </Card>
  );
}

function TalentPoolCTA() {
  const [joined, setJoined] = useState(false);

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-violet-500/5 border border-primary/20">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center shrink-0">
          <Users className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm text-foreground mb-1" style={{ fontWeight: 700 }}>
            No matching role right now?
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Join Snapp's talent pool and get notified when a role matching your skills opens up.
          </p>
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-3">
            <span>· 480 followers match open roles</span>
            <span>· 34 joined this month</span>
          </div>
          <Button
            variant={joined ? "outline" : "gradient"}
            size="sm"
            onClick={() => setJoined(!joined)}
          >
            {joined ? <CheckCircle2 className="w-4 h-4" /> : <Users className="w-4 h-4" />}
            {joined ? "In Talent Pool" : "Join Talent Pool"}
          </Button>
        </div>
      </div>
    </Card>
  );
}

export function JobsTab({ viewMode }: JobsTabProps) {
  const [filter, setFilter] = useState("all");
  const filters = ["all", "Product", "Engineering", "Data", "Design", "Marketing"];

  const filtered = filter === "all" ? MOCK_JOBS : MOCK_JOBS.filter((j) => j.department === filter);

  return (
    <div className="space-y-4">
      {viewMode !== "public" && (
        <Card className="bg-gradient-to-r from-primary/5 to-violet-500/5 border border-primary/20">
          <div className="flex items-center gap-3">
            <Star className="w-5 h-5 text-amber-500" />
            <div>
              <p className="text-sm text-foreground" style={{ fontWeight: 700 }}>
                3 roles match your skills
              </p>
              <p className="text-xs text-muted-foreground">
                Complete Product Thinking Assessment to apply for matching roles
              </p>
            </div>
            <Button variant="gradient" size="sm" className="ml-auto shrink-0">
              Start Assessment
            </Button>
          </div>
        </Card>
      )}

      <div className="flex items-center gap-2 flex-wrap">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-xl text-sm transition-colors ${
              filter === f
                ? "bg-primary text-white"
                : "bg-muted/40 text-muted-foreground hover:bg-muted/70"
            }`}
            style={{ fontWeight: filter === f ? 600 : 400 }}
          >
            {f === "all" ? "All Roles" : f}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_280px] gap-4">
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <Card className="text-center py-8">
              <Briefcase className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No open roles in this category.</p>
              <p className="text-xs text-muted-foreground mt-1">Join the talent pool to get notified when roles open.</p>
            </Card>
          ) : (
            filtered.map((job) => <JobCard key={job.id} job={job} viewMode={viewMode} />)
          )}
          <TalentPoolCTA />
        </div>
        <div className="space-y-4">
          <HiringProcess />
          <ApplicationTransparency />
        </div>
      </div>
    </div>
  );
}
