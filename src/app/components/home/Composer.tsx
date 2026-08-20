import { useState, useRef, useEffect } from "react";
import { Avatar } from "../ui/Avatar";
import { Button } from "../ui/Button";
import { useApp } from "../../context/AppContext";
import {
  ImageIcon, Video, FileText, X, Lightbulb, Briefcase, TrendingUp,
  Users, HelpCircle, ChevronDown, Rocket, Megaphone, Building2,
  BarChart2, Plus, Trash2, Hash, AtSign, Globe, Lock, Clock, Sparkles,
  Calendar, Award, MoreHorizontal, FileCheck, Save, Check
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

import { MediaAttachment, LinkPreviewData, StructuredPostData, PostDraft, Collaborator, ProfessionalEvidence, StructuredPostType } from "../../types/post-types";
import { saveDraft, getSavedDrafts, setRecoveredBuffer } from "../../utils/post-drafts";
import { ComposerMoreMenu } from "../posts/ComposerMoreMenu";
import { ComposerDraftManager } from "../posts/ComposerDraftManager";
import { ComposerScheduleDialog } from "../posts/ComposerScheduleDialog";
import { ComposerAIAssist } from "../posts/ComposerAIAssist";
import { VideoEditorModal, DocumentEditorModal } from "../posts/MediaUploadManager";
import { LinkPreviewEditor } from "../posts/LinkPreviewEditor";
import { StructuredPostFlow } from "../posts/StructuredPostFlow";
import { CelebrateFlow } from "../posts/CelebrateFlow";
import { CollaboratorManager } from "../posts/CollaboratorManager";
import { ProfessionalEvidenceManager } from "../posts/ProfessionalEvidenceManager";

interface ComposerProps {
  onPost?: (content: string, extraData?: any) => void;
}

const INDIVIDUAL_CONTENT_TYPES = [
  { id: "insight", label: "Insight", icon: Lightbulb, color: "text-violet-600", bg: "bg-violet-50 border-violet-200", activeBg: "bg-violet-500", placeholder: "Share a professional insight or lesson learned from your work..." },
  { id: "update", label: "Work Update", icon: TrendingUp, color: "text-primary", bg: "bg-primary/5 border-primary/20", activeBg: "bg-primary", placeholder: "What did you ship, achieve, or learn recently?" },
  { id: "case", label: "Case Study", icon: FileText, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200", activeBg: "bg-emerald-500", placeholder: "Walk through a project, challenge, or solution in depth..." },
  { id: "hiring", label: "We're Hiring", icon: Briefcase, color: "text-amber-600", bg: "bg-amber-50 border-amber-200", activeBg: "bg-amber-500", placeholder: "Describe the role, team culture, and what makes this opportunity stand out..." },
  { id: "question", label: "Ask Network", icon: HelpCircle, color: "text-pink-600", bg: "bg-pink-50 border-pink-200", activeBg: "bg-pink-500", placeholder: "Ask a question and get answers from professionals in your field..." },
];

const COMPANY_CONTENT_TYPES = [
  { id: "company_update", label: "Company Update", icon: TrendingUp, color: "text-primary", bg: "bg-primary/5 border-primary/20", activeBg: "bg-primary", placeholder: "Share news, milestones, or updates about your company..." },
  { id: "job_opening", label: "Job Opening", icon: Briefcase, color: "text-amber-600", bg: "bg-amber-50 border-amber-200", activeBg: "bg-amber-500", placeholder: "Describe the role, requirements, and why candidates should apply..." },
  { id: "product_news", label: "Product News", icon: Rocket, color: "text-violet-600", bg: "bg-violet-50 border-violet-200", activeBg: "bg-violet-500", placeholder: "Announce a new product, feature launch, or major release..." },
  { id: "announcement", label: "Announcement", icon: Megaphone, color: "text-pink-600", bg: "bg-pink-50 border-pink-200", activeBg: "bg-pink-500", placeholder: "Share an important company announcement with your network..." },
  { id: "team_story", label: "Team Story", icon: Users, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200", activeBg: "bg-emerald-500", placeholder: "Highlight your team, culture, or employee stories..." },
];

const STARTUP_CONTENT_TYPES = [
  { id: "startup_update", label: "Startup Update", icon: TrendingUp, color: "text-primary", bg: "bg-primary/5 border-primary/20", activeBg: "bg-primary", placeholder: "Share your latest progress, milestones, or traction..." },
  { id: "hiring", label: "We're Hiring", icon: Briefcase, color: "text-amber-600", bg: "bg-amber-50 border-amber-200", activeBg: "bg-amber-500", placeholder: "Describe the role, startup culture, and equity opportunity..." },
  { id: "product_launch", label: "Product Launch", icon: Rocket, color: "text-violet-600", bg: "bg-violet-50 border-violet-200", activeBg: "bg-violet-500", placeholder: "Tell the world about your product launch or beta release..." },
  { id: "funding", label: "Funding News", icon: Building2, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200", activeBg: "bg-emerald-500", placeholder: "Announce a funding round, partnership, or major deal..." },
  { id: "team_story", label: "Team Story", icon: Users, color: "text-pink-600", bg: "bg-pink-50 border-pink-200", activeBg: "bg-pink-500", placeholder: "Highlight your founding team, culture, or co-founder story..." },
];

export function Composer({ onPost }: ComposerProps) {
  const { currentUser: appUser } = useApp();

  const isCompany = appUser?.accountType === "company";
  const isStartup = appUser?.accountType === "startup";
  const isOrg = isCompany || isStartup;

  const CONTENT_TYPES = isCompany ? COMPANY_CONTENT_TYPES : isStartup ? STARTUP_CONTENT_TYPES : INDIVIDUAL_CONTENT_TYPES;

  const [expanded, setExpanded] = useState(false);
  const [content, setContent] = useState("");
  const [posting, setPosting] = useState(false);
  const [selectedType, setSelectedType] = useState(CONTENT_TYPES[0]);
  const [showTypeMenu, setShowTypeMenu] = useState(false);

  // Autosave / Draft status
  const [autosaveStatus, setAutosaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [activeDraftId, setActiveDraftId] = useState<string | null>(null);

  // Modal dialog states
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showDraftManager, setShowDraftManager] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [showAIAssist, setShowAIAssist] = useState(false);
  const [showCelebrateFlow, setShowCelebrateFlow] = useState(false);
  const [showStructuredFlow, setShowStructuredFlow] = useState<StructuredPostType | null>(null);
  const [showCollaboratorManager, setShowCollaboratorManager] = useState(false);
  const [showEvidenceManager, setShowEvidenceManager] = useState(false);

  // Media attachments
  const [attachments, setAttachments] = useState<MediaAttachment[]>([]);
  const [activeMediaEdit, setActiveMediaEdit] = useState<MediaAttachment | null>(null);
  const [linkPreview, setLinkPreview] = useState<LinkPreviewData | undefined>(undefined);
  const [scheduledAt, setScheduledAt] = useState<string | undefined>(undefined);

  // Structured post details & attachments
  const [structuredData, setStructuredData] = useState<StructuredPostData | undefined>(undefined);
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [evidence, setEvidence] = useState<ProfessionalEvidence[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  // Poll state
  const [showPoll, setShowPoll] = useState(false);
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState(["", ""]);
  const [pollDuration, setPollDuration] = useState("1 week");

  // Autosave logic
  useEffect(() => {
    if (!expanded || (!content.trim() && attachments.length === 0)) return;
    setAutosaveStatus("saving");
    const timer = setTimeout(() => {
      const saved = saveDraft({
        id: activeDraftId || undefined,
        content,
        media: attachments,
        linkPreview,
        structuredData,
        collaborators,
        evidence,
        scheduledAt,
      });
      setActiveDraftId(saved.id);
      setAutosaveStatus("saved");
    }, 1000);
    return () => clearTimeout(timer);
  }, [content, attachments, linkPreview, structuredData, collaborators, evidence, scheduledAt, expanded]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { toast.error("Image must be under 10MB"); return; }
    const reader = new FileReader();
    reader.onload = () => {
      const newAtt: MediaAttachment = {
        id: `img_${Date.now()}`,
        type: "image",
        url: reader.result as string,
        name: file.name,
      };
      setAttachments([...attachments, newAtt]);
    };
    reader.readAsDataURL(file);
  };

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const newAtt: MediaAttachment = {
      id: `vid_${Date.now()}`,
      type: "video",
      url: URL.createObjectURL(file),
      name: file.name,
      autoPlay: true,
    };
    setAttachments([...attachments, newAtt]);
    setActiveMediaEdit(newAtt);
  };

  const handleDocSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const newAtt: MediaAttachment = {
      id: `doc_${Date.now()}`,
      type: "document",
      url: "",
      name: file.name,
      title: file.name.replace(/\.[^/.]+$/, ""),
      allowDownload: true,
      pageCount: 5,
    };
    setAttachments([...attachments, newAtt]);
    setActiveMediaEdit(newAtt);
  };

  const handlePost = () => {
    if (!content.trim() && attachments.length === 0 && !(showPoll && pollQuestion.trim())) return;
    setPosting(true);
    setTimeout(() => {
      onPost?.(content, {
        attachments,
        linkPreview,
        structuredData,
        collaborators,
        evidence,
        scheduledAt,
      });
      handleClose();
      setPosting(false);
    }, 800);
  };

  const handleClose = () => {
    if (content.trim()) {
      setRecoveredBuffer({ content, media: attachments });
    }
    setExpanded(false);
    setContent("");
    setAttachments([]);
    setLinkPreview(undefined);
    setStructuredData(undefined);
    setCollaborators([]);
    setEvidence([]);
    setScheduledAt(undefined);
    setShowPoll(false);
    setPollQuestion("");
    setPollOptions(["", ""]);
    setShowTypeMenu(false);
    setSelectedType(CONTENT_TYPES[0]);
    setActiveDraftId(null);
  };

  const handleLoadDraft = (draft: PostDraft) => {
    setContent(draft.content || "");
    setAttachments(draft.media || []);
    setLinkPreview(draft.linkPreview);
    setStructuredData(draft.structuredData);
    setCollaborators(draft.collaborators || []);
    setEvidence(draft.evidence || []);
    setScheduledAt(draft.scheduledAt);
    setActiveDraftId(draft.id);
    setExpanded(true);
  };

  const addPollOption = () => {
    if (pollOptions.length < 4) setPollOptions([...pollOptions, ""]);
  };

  const removePollOption = (idx: number) => {
    if (pollOptions.length <= 2) return;
    setPollOptions(pollOptions.filter((_, i) => i !== idx));
  };

  const updatePollOption = (idx: number, value: string) => {
    const updated = [...pollOptions];
    updated[idx] = value;
    setPollOptions(updated);
  };

  const SelectedIcon = selectedType.icon;

  const displayName = appUser?.name ?? "Ahmad Parvizi";
  const displaySubtitle = isCompany ? "Company Account" : isStartup ? "Startup Account" : (appUser?.title ?? "Senior Product Designer");
  const displayAvatar = appUser?.avatar ?? "";

  const quickActions = isOrg
    ? [
        { icon: TrendingUp, label: "Update", color: "text-primary", hover: "hover:bg-primary/5 hover:text-primary", type: CONTENT_TYPES[0] },
        { icon: Briefcase, label: "Job", color: "text-amber-500", hover: "hover:bg-amber-50 hover:text-amber-600", type: CONTENT_TYPES[1] },
        { icon: Rocket, label: "Launch", color: "text-violet-500", hover: "hover:bg-violet-50 hover:text-violet-600", type: CONTENT_TYPES[2] },
        { icon: Users, label: "Team", color: "text-emerald-500", hover: "hover:bg-emerald-50 hover:text-emerald-600", type: CONTENT_TYPES[4] },
      ]
    : [
        { icon: Lightbulb, label: "Insight", color: "text-violet-500", hover: "hover:bg-violet-50 hover:text-violet-600", type: CONTENT_TYPES[0] },
        { icon: TrendingUp, label: "Update", color: "text-primary", hover: "hover:bg-primary/5 hover:text-primary", type: CONTENT_TYPES[1] },
        { icon: ImageIcon, label: "Photo", color: "text-emerald-500", hover: "hover:bg-emerald-50 hover:text-emerald-600", type: CONTENT_TYPES[1] },
        { icon: BarChart2, label: "Poll", color: "text-amber-500", hover: "hover:bg-amber-50 hover:text-amber-600", type: CONTENT_TYPES[4] },
      ];

  const canPost = (content.trim() || attachments.length > 0 || (showPoll && pollQuestion.trim() && pollOptions.filter(o => o.trim()).length >= 2));

  const composerPlaceholder = isOrg
    ? "Share a company update, job opening, or announcement..."
    : "Share a professional insight or update...";

  return (
    <div className="bg-card border border-border/30 rounded-2xl shadow-sm overflow-hidden relative">
      {/* Collapsed state */}
      {!expanded && (
        <div className="p-4">
          <div className="flex items-center gap-3">
            <Avatar src={displayAvatar} name={displayName} size="md" />
            <button
              onClick={() => setExpanded(true)}
              className="flex-1 text-left px-4 py-2.5 bg-muted/50 hover:bg-muted/70 rounded-xl text-sm text-muted-foreground transition-colors cursor-pointer border border-border/20"
            >
              {composerPlaceholder}
            </button>
          </div>
          <div className="flex items-center gap-1 mt-3 pt-3 border-t border-border/20">
            {quickActions.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setSelectedType(item.type);
                  if (item.label === "Photo") { setExpanded(true); setTimeout(() => fileInputRef.current?.click(), 100); }
                  else if (item.label === "Poll") { setExpanded(true); setTimeout(() => setShowPoll(true), 100); }
                  else setExpanded(true);
                }}
                className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-2 text-xs text-muted-foreground ${item.hover} rounded-xl transition-all cursor-pointer`}
              >
                <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Expanded state */}
      {expanded && (
        <div>
          {/* Header */}
          <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-border/20">
            <div className="flex items-center gap-2.5">
              <Avatar src={displayAvatar} name={displayName} size="sm" />
              <div>
                <p className="text-sm text-foreground" style={{ fontWeight: 500 }}>{displayName}</p>
                <p className="text-[10px] text-muted-foreground">{displaySubtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Draft status indicator */}
              <button
                onClick={() => setShowDraftManager(true)}
                className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground px-2 py-1 bg-muted/30 rounded-lg cursor-pointer"
              >
                {autosaveStatus === "saving" ? (
                  <span className="flex items-center gap-1 text-amber-600">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    Saving...
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Save className="w-3 h-3 text-muted-foreground" />
                    Draft
                  </span>
                )}
              </button>

              {/* Content type dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowTypeMenu(!showTypeMenu)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition-all cursor-pointer ${selectedType.bg} ${selectedType.color}`}
                >
                  <SelectedIcon className="w-3.5 h-3.5" />
                  {selectedType.label}
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </button>
                {showTypeMenu && (
                  <div className="absolute top-full right-0 mt-1 w-44 bg-card border border-border/30 rounded-xl shadow-lg overflow-hidden z-20">
                    {CONTENT_TYPES.map((type) => {
                      const Icon = type.icon;
                      return (
                        <button key={type.id} onClick={() => { setSelectedType(type); setShowTypeMenu(false); }}
                          className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs hover:bg-muted/40 transition-colors cursor-pointer text-left ${type.color} ${selectedType.id === type.id ? "bg-muted/30" : ""}`}>
                          <Icon className="w-3.5 h-3.5 shrink-0" />
                          {type.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <button onClick={handleClose} className="p-1.5 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Scheduled Banner */}
          {scheduledAt && (
            <div className="mx-4 mt-3 p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-between text-xs text-blue-600 dark:text-blue-400">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Scheduled for: {new Date(scheduledAt).toLocaleString()}</span>
              </div>
              <button onClick={() => setScheduledAt(undefined)} className="hover:underline cursor-pointer">
                Remove schedule
              </button>
            </div>
          )}

          {/* Textarea */}
          <div className="px-4 py-3">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={selectedType.placeholder}
              className="w-full min-h-[110px] bg-transparent resize-none focus:outline-none text-sm placeholder:text-muted-foreground/50 leading-relaxed"
              autoFocus={!showPoll}
            />
          </div>

          {/* Link Preview Detector */}
          <LinkPreviewEditor content={content} onPreviewChange={setLinkPreview} />

          {/* Media Attachments Preview Grid */}
          {attachments.length > 0 && (
            <div className="mx-4 mb-3 space-y-2">
              <p className="text-xs font-medium text-foreground">Attached Media ({attachments.length})</p>
              <div className="flex flex-wrap gap-2">
                {attachments.map((att) => (
                  <div key={att.id} className="relative group bg-muted/30 border border-border/20 rounded-xl p-2 flex items-center gap-2 pr-8">
                    <span className="text-xs text-foreground font-medium truncate max-w-[160px]">{att.name || att.type}</span>
                    <button
                      onClick={() => setActiveMediaEdit(att)}
                      className="text-[10px] text-primary hover:underline cursor-pointer font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setAttachments(attachments.filter(a => a.id !== att.id))}
                      className="absolute right-1.5 top-2 text-muted-foreground hover:text-red-500 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Poll builder */}
          <AnimatePresence>
            {showPoll && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mx-4 mb-3 p-4 bg-muted/20 rounded-xl border border-border/20">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <BarChart2 className="w-4 h-4 text-amber-500" />
                      <span className="text-sm text-foreground" style={{ fontWeight: 500 }}>Create a poll</span>
                    </div>
                    <button onClick={() => setShowPoll(false)} className="p-1 hover:bg-muted rounded-lg cursor-pointer">
                      <X className="w-3.5 h-3.5 text-muted-foreground" />
                    </button>
                  </div>

                  <input
                    value={pollQuestion}
                    onChange={e => setPollQuestion(e.target.value)}
                    placeholder="Ask a question..."
                    className="w-full px-3 py-2.5 bg-white border border-border/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 mb-3"
                  />

                  <div className="space-y-2 mb-3">
                    {pollOptions.map((option, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          value={option}
                          onChange={e => updatePollOption(idx, e.target.value)}
                          placeholder={`Option ${idx + 1}`}
                          className="flex-1 px-3 py-2 bg-white border border-border/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                        {pollOptions.length > 2 && (
                          <button onClick={() => removePollOption(idx)} className="p-1.5 hover:bg-red-50 rounded-lg cursor-pointer transition-colors">
                            <Trash2 className="w-3.5 h-3.5 text-red-400" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {pollOptions.length < 4 && (
                    <button onClick={addPollOption} className="flex items-center gap-1.5 text-xs text-primary cursor-pointer hover:underline mb-3">
                      <Plus className="w-3.5 h-3.5" /> Add option
                    </button>
                  )}

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Duration:</span>
                    {["1 day", "3 days", "1 week", "2 weeks"].map(d => (
                      <button key={d} onClick={() => setPollDuration(d)}
                        className={`px-2.5 py-1 rounded-lg text-xs cursor-pointer transition-colors ${
                          pollDuration === d ? "bg-primary text-white" : "bg-muted/50 text-muted-foreground hover:bg-muted/80"
                        }`}>
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hidden file inputs */}
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
          <input ref={videoInputRef} type="file" accept="video/*" className="hidden" onChange={handleVideoSelect} />
          <input ref={docInputRef} type="file" accept=".pdf,.ppt,.pptx" className="hidden" onChange={handleDocSelect} />

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-border/20">
            <div className="flex gap-0.5 items-center">
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={showPoll}
                className="p-2 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer group disabled:opacity-30 disabled:cursor-not-allowed"
                title="Add photo"
              >
                <ImageIcon className="w-4 h-4 text-emerald-500" />
              </button>
              <button
                onClick={() => videoInputRef.current?.click()}
                className="p-2 hover:bg-red-50 rounded-lg transition-colors cursor-pointer group"
                title="Add video"
              >
                <Video className="w-4 h-4 text-red-400" />
              </button>
              <button
                onClick={() => docInputRef.current?.click()}
                className="p-2 hover:bg-primary/5 rounded-lg transition-colors cursor-pointer"
                title="Attach document"
              >
                <FileText className="w-4 h-4 text-primary/60" />
              </button>
              <button
                onClick={() => { setShowPoll(p => !p); }}
                disabled={attachments.length > 0}
                className={`p-2 rounded-lg transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${showPoll ? "bg-amber-100" : "hover:bg-amber-50"}`}
                title="Create poll"
              >
                <BarChart2 className={`w-4 h-4 ${showPoll ? "text-amber-600" : "text-amber-400"}`} />
              </button>

              <button
                onClick={() => setShowAIAssist(true)}
                className="p-2 hover:bg-violet-50 rounded-lg transition-colors cursor-pointer text-violet-500"
                title="AI Writing Assistant"
              >
                <Sparkles className="w-4 h-4" />
              </button>

              <button
                onClick={() => setShowScheduleDialog(true)}
                className="p-2 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer text-blue-500"
                title="Schedule Post"
              >
                <Calendar className="w-4 h-4" />
              </button>

              {/* Single Organized "More" Menu Button */}
              <button
                onClick={() => setShowMoreMenu(true)}
                className="p-2 hover:bg-muted/40 rounded-lg transition-colors cursor-pointer text-muted-foreground"
                title="More actions (Celebrate, Event, Job, Article, Collaborators, Evidence)"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              {content.length > 0 && (
                <span className={`text-xs ${content.length > 2800 ? "text-red-500" : "text-muted-foreground/50"}`}>
                  {content.length}/3000
                </span>
              )}
              <Button
                variant="gradient"
                size="sm"
                disabled={!canPost || posting}
                onClick={handlePost}
              >
                {posting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Publishing...
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <SelectedIcon className="w-3.5 h-3.5" />
                    {scheduledAt ? "Schedule" : "Publish"}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Dialog Modals */}
      {showMoreMenu && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <ComposerMoreMenu
            onSelectOption={(opt) => {
              if (opt === "milestone") setShowCelebrateFlow(true);
              else if (opt === "collaborators") setShowCollaboratorManager(true);
              else if (opt === "evidence") setShowEvidenceManager(true);
              else setShowStructuredFlow(opt as StructuredPostType);
            }}
            onClose={() => setShowMoreMenu(false)}
          />
        </div>
      )}

      {showDraftManager && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <ComposerDraftManager
            onLoadDraft={handleLoadDraft}
            onClose={() => setShowDraftManager(false)}
            currentContent={content}
          />
        </div>
      )}

      {showScheduleDialog && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <ComposerScheduleDialog
            initialScheduledAt={scheduledAt}
            onSchedule={(iso) => setScheduledAt(iso)}
            onClose={() => setShowScheduleDialog(false)}
          />
        </div>
      )}

      {showAIAssist && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <ComposerAIAssist
            currentText={content}
            onApplyText={(txt) => setContent(txt)}
            onAddHashtags={(tags) => setContent(c => `${c}\n\n${tags.join(" ")}`)}
            onClose={() => setShowAIAssist(false)}
          />
        </div>
      )}

      {showCelebrateFlow && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <CelebrateFlow
            onSave={(data) => setStructuredData(data)}
            onClose={() => setShowCelebrateFlow(false)}
          />
        </div>
      )}

      {showStructuredFlow && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <StructuredPostFlow
            type={showStructuredFlow}
            onSave={(data) => setStructuredData(data)}
            onClose={() => setShowStructuredFlow(null)}
          />
        </div>
      )}

      {showCollaboratorManager && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <CollaboratorManager
            collaborators={collaborators}
            onUpdate={(collabs) => setCollaborators(collabs)}
            onClose={() => setShowCollaboratorManager(false)}
          />
        </div>
      )}

      {showEvidenceManager && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <ProfessionalEvidenceManager
            evidence={evidence}
            onUpdate={(ev) => setEvidence(ev)}
            onClose={() => setShowEvidenceManager(false)}
          />
        </div>
      )}

      {/* Media Edit Modals */}
      {activeMediaEdit && activeMediaEdit.type === "video" && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <VideoEditorModal
            media={activeMediaEdit}
            onSave={(updated) => {
              setAttachments(attachments.map(a => a.id === updated.id ? updated : a));
              setActiveMediaEdit(null);
            }}
            onClose={() => setActiveMediaEdit(null)}
          />
        </div>
      )}

      {activeMediaEdit && activeMediaEdit.type === "document" && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <DocumentEditorModal
            media={activeMediaEdit}
            onSave={(updated) => {
              setAttachments(attachments.map(a => a.id === updated.id ? updated : a));
              setActiveMediaEdit(null);
            }}
            onClose={() => setActiveMediaEdit(null)}
          />
        </div>
      )}
    </div>
  );
}
