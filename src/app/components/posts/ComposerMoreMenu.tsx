import { useState } from "react";
import {
  Award, Calendar, Briefcase, Sparkles, Search, FolderKanban, Rocket,
  Compass, BookOpen, Mail, Radio, Users, Handshake, Link as LinkIcon,
  Search as SearchIcon, X, ChevronRight, FileCheck, HelpCircle
} from "lucide-react";
import { StructuredPostType } from "../../types/post-types";

interface ComposerMoreMenuProps {
  onSelectOption: (type: StructuredPostType | "collaborators" | "evidence" | "partnership") => void;
  onClose: () => void;
}

export function ComposerMoreMenu({ onSelectOption, onClose }: ComposerMoreMenuProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const SECTIONS = [
    {
      title: "Professional Content",
      items: [
        { id: "milestone", label: "Celebrate / Professional Milestone", icon: Award, color: "text-amber-500", desc: "Job change, promotion, anniversary, launch" },
        { id: "event", label: "Event / Webinar", icon: Calendar, color: "text-violet-500", desc: "Online webinar or local meetup" },
        { id: "job_opening", label: "Job Opening", icon: Briefcase, color: "text-blue-500", desc: "Hire top talent for your team" },
        { id: "service", label: "Offer a Service", icon: Sparkles, color: "text-emerald-500", desc: "Consulting or professional services" },
        { id: "expert", label: "Find an Expert", icon: Search, color: "text-pink-500", desc: "Post a challenge or advisory need" },
        { id: "project", label: "Project or Collaboration", icon: FolderKanban, color: "text-indigo-500", desc: "Invite co-builders or partners" },
        { id: "product_update", label: "Product Update", icon: Rocket, color: "text-orange-500", desc: "Announce new feature or release" },
        { id: "opportunity", label: "Professional Opportunity", icon: Compass, color: "text-teal-500", desc: "Grants, RFP, or partnerships" },
      ],
    },
    {
      title: "Long-form Publishing",
      items: [
        { id: "article", label: "Article", icon: BookOpen, color: "text-purple-500", desc: "In-depth article or research" },
        { id: "newsletter", label: "Newsletter Issue", icon: Mail, color: "text-sky-500", desc: "Publish to subscribers" },
      ],
    },
    {
      title: "Live & Collaboration",
      items: [
        { id: "live_session", label: "Live Session", icon: Radio, color: "text-red-500", desc: "Audio/video stream with Q&A" },
        { id: "collaborators", label: "Add Collaborators", icon: Users, color: "text-amber-600", desc: "Co-author with colleagues or partners" },
        { id: "partnership", label: "Paid Partnership Tag", icon: Handshake, color: "text-emerald-600", desc: "Disclose commercial endorsement" },
      ],
    },
    {
      title: "Professional Context & Evidence",
      items: [
        { id: "evidence", label: "Add Professional Evidence", icon: FileCheck, color: "text-violet-600", desc: "Attach links, files or verifications" },
      ],
    },
  ];

  const filteredSections = SECTIONS.map((section) => ({
    ...section,
    items: section.items.filter(
      (item) =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter((section) => section.items.length > 0);

  return (
    <div className="p-4 bg-card border border-border/30 rounded-2xl shadow-xl max-w-lg w-full max-h-[80vh] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border/20">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Advanced Post Actions</h3>
          <p className="text-xs text-muted-foreground">Select a structured post format or context</p>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-muted/50 rounded-xl transition-colors cursor-pointer">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Search */}
      <div className="mt-3 relative">
        <SearchIcon className="w-3.5 h-3.5 absolute left-3 top-3 text-muted-foreground" />
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search post actions..."
          className="w-full pl-9 pr-3 py-2 bg-muted/30 border border-border/20 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* List */}
      <div className="mt-3 overflow-y-auto space-y-4 pr-1 flex-1">
        {filteredSections.map((section) => (
          <div key={section.title}>
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-2">
              {section.title}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectOption(item.id as any);
                      onClose();
                    }}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl border border-border/20 hover:border-primary/30 hover:bg-muted/40 transition-all text-left cursor-pointer group"
                  >
                    <div className={`p-2 rounded-lg bg-muted/30 group-hover:bg-card ${item.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">
                        {item.label}
                      </p>
                      <p className="text-[10px] text-muted-foreground line-clamp-1 mt-0.5">{item.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
