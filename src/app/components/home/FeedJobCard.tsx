import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { MatchScore } from "../ui/MatchScore";
import type { JobPost } from "../../data/mock-data";
import { MapPin, Clock, Bookmark, Zap, Users, CheckCircle, AlertCircle, UserCheck } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router";

interface FeedJobCardProps {
  job: JobPost;
}

export function FeedJobCard({ job }: FeedJobCardProps) {
  const [saved, setSaved] = useState(job.isSaved || false);
  const navigate = useNavigate();

  // Pick one smart tip to show if available
  const topTip = job.smartTips?.[0];
  const referralTip = job.smartTips?.find(t => t.toLowerCase().includes("referral") || t.toLowerCase().includes("works here"));

  // Convert company name to URL slug
  const companySlug = job.company.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="bg-card border border-border/30 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 relative">
      {/* Top context label — feels native to feed, not like an ad */}
      <div className="px-5 pt-4 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Match score color-coded indicator */}
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: job.matchScore >= 80
                ? "#00C853"
                : job.matchScore >= 60
                ? "#FF9800"
                : "#F44336"
            }}
          />
          <span className="text-xs text-muted-foreground">
            {job.matchScore >= 80 ? "Strong match for your profile" : job.matchScore >= 60 ? "Partial match" : "Opportunity in your field"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {job.isPromoted && (
            <span className="text-[10px] text-muted-foreground/60 border border-border/30 px-1.5 py-0.5 rounded-md">
              Sponsored
            </span>
          )}
          <button
            onClick={() => setSaved(!saved)}
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
              saved ? "text-violet-500 bg-violet-50" : "text-muted-foreground/50 hover:text-muted-foreground hover:bg-muted/40"
            }`}
            title={saved ? "Remove from saved" : "Save job"}
          >
            <Bookmark className={`w-4 h-4 ${saved ? "fill-violet-500" : ""}`} />
          </button>
        </div>
      </div>

      <div className="px-5 pb-4">
        {/* Job header */}
        <div className="flex items-start justify-between gap-3">
          {/* Company logo placeholder */}
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div
              className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center text-white text-xs"
              style={{ background: "linear-gradient(135deg, #0066FF 0%, #7c3aed 100%)" }}
            >
              {job.company.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <button
                onClick={() => navigate("/jobs")}
                className="text-left cursor-pointer group"
              >
                <h3 className="text-sm text-foreground group-hover:text-primary transition-colors leading-snug">
                  {job.title}
                </h3>
              </button>
              <Link
                to={`/company/${companySlug}`}
                className="text-xs text-muted-foreground mt-0.5 hover:text-primary hover:underline transition-colors inline-block"
              >
                {job.company}
              </Link>
              <div className="flex items-center gap-3 mt-1.5 text-[11px] text-muted-foreground/70 flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {job.postedAgo}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {job.applicants} applied
                </span>
              </div>
            </div>
          </div>
          <MatchScore score={job.matchScore} size="md" />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          <Badge variant="primary" size="sm">{job.type}</Badge>
          {job.salary && <Badge variant="success" size="sm">{job.salary}</Badge>}
        </div>

        {/* Gap analysis — compact skill indicators */}
        {job.gapAnalysis && job.gapAnalysis.length > 0 && (
          <div className="mt-3 pt-3 border-t border-border/10">
            <p className="text-[10px] text-muted-foreground/70 mb-2 uppercase tracking-wide">Skill match</p>
            <div className="flex flex-wrap gap-1.5">
              {job.gapAnalysis.slice(0, 4).map((gap) => (
                <span
                  key={gap.skill}
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] ${
                    gap.status === "have"
                      ? "bg-emerald-50 text-emerald-600"
                      : gap.status === "partial"
                      ? "bg-amber-50 text-amber-600"
                      : "bg-red-50 text-red-500"
                  }`}
                >
                  {gap.status === "have" ? (
                    <CheckCircle className="w-2.5 h-2.5" />
                  ) : (
                    <AlertCircle className="w-2.5 h-2.5" />
                  )}
                  {gap.skill}
                </span>
              ))}
              {job.gapAnalysis.length > 4 && (
                <span className="text-[10px] text-muted-foreground/60 px-1 py-0.5">
                  +{job.gapAnalysis.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Smart contextual tip (referral tip gets priority) */}
        {(referralTip || topTip) && (
          <div className="mt-3 flex items-start gap-2 px-3 py-2 bg-primary/4 rounded-xl border border-primary/10">
            <UserCheck className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
            <p className="text-[11px] text-primary/80 leading-relaxed">
              {referralTip || topTip}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 mt-4">
          <Button
            variant="gradient"
            size="sm"
            className="flex-1"
            onClick={() => navigate("/jobs")}
          >
            <Zap className="w-3.5 h-3.5" />
            View & Apply
          </Button>
          <button
            onClick={() => navigate("/jobs")}
            className="px-3 py-2 text-xs text-muted-foreground hover:text-foreground border border-border/30 hover:border-border/60 rounded-xl transition-all cursor-pointer"
          >
            Learn more
          </button>
        </div>
      </div>
    </div>
  );
}
