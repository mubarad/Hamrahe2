import { useState } from "react";
import { Card } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { Badge } from "../../ui/Badge";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Lock,
  Shield,
  ChevronRight,
  Play,
  RotateCcw,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { motion } from "motion/react";
import { MOCK_LEARNING, MOCK_ASSESSMENTS } from "../companyMockData";

interface LearningTabProps {
  viewMode: "public" | "loggedIn" | "admin";
}

function LearningPathCard({ path, showProgress }: { path: (typeof MOCK_LEARNING)[0]; showProgress: boolean }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
            path.completed
              ? "bg-emerald-50 dark:bg-emerald-900/20"
              : "bg-gradient-to-br from-primary/10 to-violet-500/10"
          }`}
        >
          {path.completed ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          ) : (
            <BookOpen className="w-5 h-5 text-primary" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="text-sm text-foreground" style={{ fontWeight: 700 }}>
                {path.title}
              </h4>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                <Clock className="w-3 h-3" />
                <span>{path.duration}</span>
                <span>·</span>
                <span>{path.level}</span>
              </div>
            </div>
            <Badge variant={path.completed ? "success" : "secondary"}>
              {path.completed ? "Completed" : path.progress > 0 ? "In Progress" : "Start"}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-2">
            {path.related.map((role) => (
              <span
                key={role}
                className="text-xs bg-muted/40 text-muted-foreground px-2 py-0.5 rounded-lg"
              >
                {role}
              </span>
            ))}
          </div>

          {showProgress && path.progress > 0 && !path.completed && (
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">Progress</span>
                <span className="text-xs text-foreground" style={{ fontWeight: 600 }}>
                  {path.progress}%
                </span>
              </div>
              <div className="h-1.5 bg-muted/60 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${path.progress}%` }}
                  transition={{ duration: 0.6 }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-border/20 flex gap-2">
        <Button variant={path.completed ? "outline" : "gradient"} size="sm" className="flex-1">
          {path.completed ? (
            <>
              <RotateCcw className="w-3.5 h-3.5" />
              Review
            </>
          ) : path.progress > 0 ? (
            <>
              <Play className="w-3.5 h-3.5" />
              Continue
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              Start Path
            </>
          )}
        </Button>
        <Button variant="ghost" size="sm">
          Save
        </Button>
      </div>
    </Card>
  );
}

function AssessmentCard({ assessment }: { assessment: (typeof MOCK_ASSESSMENTS)[0] }) {
  const typeColors: Record<string, string> = {
    "Skill Assessment": "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
    "Work Style": "bg-violet-50 text-violet-700 dark:bg-violet-900/20 dark:text-violet-400",
    Personality: "bg-pink-50 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400",
    Language: "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
  };

  return (
    <div className="flex items-start gap-3 p-3 bg-muted/20 rounded-xl hover:bg-muted/40 transition-colors">
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
          assessment.completed ? "bg-emerald-50" : "bg-muted"
        }`}
      >
        {assessment.completed ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
        ) : (
          <AlertCircle className="w-4 h-4 text-muted-foreground" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm text-foreground" style={{ fontWeight: 600 }}>
              {assessment.title}
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`text-xs px-2 py-0.5 rounded-lg ${typeColors[assessment.type] || "bg-muted text-muted-foreground"}`}>
                {assessment.type}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {assessment.duration}
              </span>
              {assessment.required && (
                <span className="text-xs text-red-600 dark:text-red-400" style={{ fontWeight: 600 }}>
                  Required
                </span>
              )}
            </div>
          </div>
          <Button variant={assessment.completed ? "outline" : "gradient"} size="sm">
            {assessment.completed ? "Retake" : "Start"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function AssessmentPrivacyNotice() {
  const [expanded, setExpanded] = useState(false);
  const options = [
    { label: "Public", icon: Eye },
    { label: "Visible to recruiters", icon: Eye },
    { label: "Visible only to companies I apply to", icon: EyeOff },
    { label: "Private", icon: Lock },
  ];

  return (
    <Card className="border border-emerald-200/50 dark:border-emerald-800/30">
      <div className="flex items-start gap-3 mb-3">
        <Shield className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm text-foreground" style={{ fontWeight: 700 }}>
            Assessment Privacy
          </h4>
          <p className="text-sm text-muted-foreground mt-1">
            Assessment results are only shared with companies when you choose to apply, accept an invitation, or grant permission.
          </p>
        </div>
      </div>
      {expanded && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2 mt-3">
          <p className="text-xs text-muted-foreground" style={{ fontWeight: 600 }}>
            Visibility options:
          </p>
          {options.map(({ label, icon: Icon }) => (
            <label key={label} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="privacy" className="text-primary" />
              <Icon className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{label}</span>
            </label>
          ))}
        </motion.div>
      )}
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-xs text-primary flex items-center gap-0.5 mt-2 hover:underline"
      >
        {expanded ? "Hide options" : "Manage visibility"}
        <ChevronRight className={`w-3 h-3 transition-transform ${expanded ? "rotate-90" : ""}`} />
      </button>
    </Card>
  );
}

function PrepareForRole() {
  const roles = [
    { role: "Product Manager", learning: ["Product Thinking Foundations", "Roadmapping Basics", "Interview Readiness"], assessment: "Product Thinking Assessment" },
    { role: "Senior Product Designer", learning: ["Portfolio Preparation Path", "Design Thinking Workshop"], assessment: "Product Design Assessment" },
    { role: "Senior Backend Engineer", learning: ["System Design Fundamentals"], assessment: "Technical Problem Solving" },
  ];

  const [selected, setSelected] = useState(0);

  return (
    <Card>
      <h3 className="text-sm text-foreground mb-4" style={{ fontWeight: 700 }}>
        Prepare for Open Roles
      </h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {roles.map((r, i) => (
          <button
            key={r.role}
            onClick={() => setSelected(i)}
            className={`text-sm px-3 py-1.5 rounded-xl transition-colors ${
              selected === i ? "bg-primary text-white" : "bg-muted/40 text-muted-foreground hover:bg-muted/70"
            }`}
            style={{ fontWeight: selected === i ? 600 : 400 }}
          >
            {r.role}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        <div>
          <p className="text-xs text-muted-foreground mb-2" style={{ fontWeight: 600 }}>
            Recommended Learning:
          </p>
          <div className="space-y-1.5">
            {roles[selected].learning.map((l) => (
              <div key={l} className="flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="text-sm text-foreground">{l}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-2" style={{ fontWeight: 600 }}>
            Required Assessment:
          </p>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5 text-violet-500 shrink-0" />
            <span className="text-sm text-foreground">{roles[selected].assessment}</span>
          </div>
        </div>
        <Button variant="gradient" size="sm">
          Start Preparation
        </Button>
      </div>
    </Card>
  );
}

export function LearningTab({ viewMode }: LearningTabProps) {
  return (
    <div className="space-y-4">
      <div className="grid lg:grid-cols-[1fr_300px] gap-4">
        <div className="space-y-4">
          <Card>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-primary" />
              <h2 className="text-sm text-foreground" style={{ fontWeight: 700 }}>
                Learning
              </h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Recommended by Hamrahe — explore learning paths related to this company's roles, required skills, and career opportunities. These paths are created and curated by Hamrahe to help professionals prepare for better opportunities.
            </p>
          </Card>

          {viewMode !== "public" && <PrepareForRole />}

          <div>
            <h3 className="text-sm text-foreground mb-3" style={{ fontWeight: 700 }}>
              Recommended Paths
            </h3>
            <div className="space-y-3">
              {MOCK_LEARNING.map((path) => (
                <LearningPathCard key={path.id} path={path} showProgress={viewMode !== "public"} />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <h3 className="text-sm text-foreground mb-4" style={{ fontWeight: 700 }}>
              Assessments
            </h3>
            <div className="space-y-2">
              {MOCK_ASSESSMENTS.map((a) => (
                <AssessmentCard key={a.id} assessment={a} />
              ))}
            </div>
          </Card>

          {viewMode !== "public" && <AssessmentPrivacyNotice />}

          <Card>
            <h3 className="text-sm text-foreground mb-2" style={{ fontWeight: 700 }}>
              Skills This Company Often Looks For
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Product Thinking",
                "UX Design",
                "System Design",
                "Data Analysis",
                "Python",
                "Clear Communication",
                "Ownership",
                "Problem Solving",
                "Agile",
                "Cross-functional Work",
              ].map((skill) => (
                <Badge key={skill} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
