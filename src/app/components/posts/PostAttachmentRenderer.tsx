import { useState } from "react";
import { MediaAttachment, LinkPreviewData, StructuredPostData, ProfessionalEvidence } from "../../types/post-types";
import {
  FileText, ExternalLink, Download, Play, Pause, ChevronLeft, ChevronRight,
  Maximize2, Volume2, VolumeX, ShieldCheck, Award, Briefcase, Sparkles,
  Calendar, FolderKanban, Rocket, Globe
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface PostAttachmentRendererProps {
  attachments?: MediaAttachment[];
  linkPreview?: LinkPreviewData;
  structuredData?: StructuredPostData;
  evidence?: ProfessionalEvidence[];
}

export function PostAttachmentRenderer({
  attachments,
  linkPreview,
  structuredData,
  evidence,
}: PostAttachmentRendererProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="space-y-3 mt-3">
      {/* Evidence Badges */}
      {evidence && evidence.length > 0 && (
        <div className="flex flex-wrap gap-1.5 px-4">
          {evidence.map((ev) => (
            <span
              key={ev.id}
              className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-md text-[10px] font-medium"
            >
              <ShieldCheck className="w-3 h-3" />
              <span>{ev.title}</span>
              <span className="opacity-75 font-semibold">({ev.state})</span>
            </span>
          ))}
        </div>
      )}

      {/* Structured Post Card (Job, Event, Service, Milestone, etc.) */}
      {structuredData && (
        <div className="mx-4 p-3.5 bg-muted/20 border border-border/30 rounded-xl space-y-2">
          {structuredData.type === "milestone" && (
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-amber-500/10 text-amber-500 rounded-xl">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">{structuredData.milestoneTitle || "Career Milestone"}</p>
                <p className="text-[11px] text-muted-foreground">{structuredData.companyOrOrg || "Professional Update"}</p>
              </div>
            </div>
          )}

          {structuredData.type === "job_opening" && (
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="px-2 py-0.5 bg-amber-500/10 text-amber-600 rounded text-[10px] font-medium">Job Opening</span>
                  <span className="text-[10px] text-muted-foreground">{structuredData.workModel} · {structuredData.employmentType}</span>
                </div>
                <p className="text-xs font-semibold text-foreground">{structuredData.jobTitle || "Open Role"}</p>
                {structuredData.requiredSkills && (
                  <p className="text-[10px] text-muted-foreground mt-0.5">Skills: {structuredData.requiredSkills.join(", ")}</p>
                )}
              </div>
              <button className="px-3 py-1.5 bg-primary text-white rounded-xl text-xs font-medium hover:bg-primary/90 cursor-pointer">
                Apply Now
              </button>
            </div>
          )}

          {structuredData.type === "service" && (
            <div className="flex items-center justify-between">
              <div>
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 rounded text-[10px] font-medium">Service Offer</span>
                <p className="text-xs font-semibold text-foreground mt-1">{structuredData.serviceName || "Consulting Service"}</p>
              </div>
              <button className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-medium hover:bg-emerald-700 cursor-pointer">
                Request Quote
              </button>
            </div>
          )}

          {structuredData.type === "event" && (
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-violet-500" />
                  <span className="text-[10px] font-medium text-violet-600">{structuredData.eventFormat?.toUpperCase()} EVENT</span>
                </div>
                <p className="text-xs font-semibold text-foreground">{structuredData.eventTitle || "Upcoming Webinar"}</p>
              </div>
              <button className="px-3 py-1.5 bg-violet-600 text-white rounded-xl text-xs font-medium hover:bg-violet-700 cursor-pointer">
                Register
              </button>
            </div>
          )}
        </div>
      )}

      {/* Link Preview */}
      {linkPreview && (
        <a
          href={linkPreview.url}
          target="_blank"
          rel="noreferrer"
          className="block mx-4 bg-muted/20 border border-border/30 rounded-xl overflow-hidden hover:border-primary/40 transition-colors group"
        >
          <div className="flex flex-col sm:flex-row">
            {linkPreview.imageUrl && (
              <div className="sm:w-36 h-28 shrink-0 bg-muted">
                <img src={linkPreview.imageUrl} alt={linkPreview.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-3 min-w-0 flex-1">
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase font-semibold mb-1">
                <Globe className="w-3 h-3" />
                <span>{linkPreview.domain}</span>
              </div>
              <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {linkPreview.title}
              </p>
              <p className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5">{linkPreview.description}</p>
            </div>
          </div>
        </a>
      )}

      {/* Media Attachments (Images, Videos, Documents) */}
      {attachments && attachments.length > 0 && (
        <div className="space-y-2">
          {attachments.map((att) => {
            if (att.type === "video") {
              return (
                <div key={att.id} className="relative bg-black rounded-xl overflow-hidden mx-4 max-h-[350px]">
                  <video
                    src={att.url}
                    controls
                    className="w-full max-h-[350px] object-contain mx-auto"
                  />
                  {att.captions && (
                    <div className="p-2 bg-black/80 text-white text-[11px] text-center font-medium">
                      {att.captions}
                    </div>
                  )}
                </div>
              );
            }

            if (att.type === "document") {
              const totalPages = att.pageCount || 6;
              return (
                <div key={att.id} className="mx-4 p-4 bg-muted/30 border border-border/30 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-xs font-semibold text-foreground">{att.title || "Document Presentation"}</p>
                        <p className="text-[10px] text-muted-foreground">{totalPages} Pages PDF</p>
                      </div>
                    </div>
                    {att.allowDownload !== false && (
                      <button className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground cursor-pointer" title="Download PDF">
                        <Download className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Document Page Preview */}
                  <div className="bg-card border border-border/20 rounded-lg p-6 text-center shadow-inner relative">
                    <p className="text-xs font-semibold text-foreground mb-1">
                      {att.title || "Document Title"} - Page {currentPage} of {totalPages}
                    </p>
                    <p className="text-[11px] text-muted-foreground max-w-sm mx-auto line-clamp-3">
                      {att.description || "Comprehensive presentation deck covering strategy, market analysis, design system principles, and execution roadmap."}
                    </p>
                  </div>

                  {/* Pagination Controls */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                    <button
                      disabled={currentPage <= 1}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className="flex items-center gap-1 hover:text-foreground disabled:opacity-30 cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" /> Previous
                    </button>
                    <span>
                      Page {currentPage} / {totalPages}
                    </span>
                    <button
                      disabled={currentPage >= totalPages}
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      className="flex items-center gap-1 hover:text-foreground disabled:opacity-30 cursor-pointer"
                    >
                      Next <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            }

            return null;
          })}
        </div>
      )}
    </div>
  );
}
