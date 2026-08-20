import { useState } from "react";
import { StructuredPostType, StructuredPostData } from "../../types/post-types";
import { STRUCTURED_POST_CONFIGS, INITIAL_STRUCTURED_DATA } from "../../utils/post-structured-data";
import { X, Check, Plus, Trash2, Calendar, Clock, MapPin, Briefcase, Sparkles, Building2 } from "lucide-react";
import { toast } from "sonner";

interface StructuredPostFlowProps {
  type: StructuredPostType;
  onSave: (data: StructuredPostData) => void;
  onClose: () => void;
}

export function StructuredPostFlow({ type, onSave, onClose }: StructuredPostFlowProps) {
  const config = STRUCTURED_POST_CONFIGS[type];
  const [data, setData] = useState<StructuredPostData>(INITIAL_STRUCTURED_DATA[type] || { type });
  const [skillInput, setSkillInput] = useState("");

  const handleAddSkill = () => {
    if (!skillInput.trim()) return;
    const skills = data.requiredSkills || [];
    if (!skills.includes(skillInput.trim())) {
      setData({ ...data, requiredSkills: [...skills, skillInput.trim()] });
    }
    setSkillInput("");
  };

  const handleRemoveSkill = (skill: string) => {
    setData({
      ...data,
      requiredSkills: (data.requiredSkills || []).filter((s) => s !== skill),
    });
  };

  const handleConfirm = () => {
    onSave(data);
    toast.success(`${config.title} details added!`);
    onClose();
  };

  return (
    <div className="p-4 bg-card border border-border/30 rounded-2xl shadow-xl max-w-lg w-full max-h-[85vh] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border/20">
        <div>
          <h3 className="text-sm font-semibold text-foreground">{config.title}</h3>
          <p className="text-xs text-muted-foreground">{config.subtitle}</p>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-muted/50 rounded-xl transition-colors cursor-pointer">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Form Fields */}
      <div className="mt-4 space-y-4 overflow-y-auto pr-1 flex-1">
        {/* Job Opening Fields */}
        {type === "job_opening" && (
          <>
            <div>
              <label className="text-xs font-medium text-foreground block mb-1">Job Title</label>
              <input
                value={data.jobTitle || ""}
                onChange={(e) => setData({ ...data, jobTitle: e.target.value })}
                placeholder="e.g. Senior Frontend Engineer"
                className="w-full px-3 py-2 bg-muted/30 border border-border/20 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-medium text-foreground block mb-1">Work Model</label>
                <select
                  value={data.workModel || "Hybrid"}
                  onChange={(e) => setData({ ...data, workModel: e.target.value as any })}
                  className="w-full px-3 py-2 bg-muted/30 border border-border/20 rounded-xl text-xs focus:outline-none"
                >
                  <option value="On-site">On-site</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-foreground block mb-1">Employment Type</label>
                <select
                  value={data.employmentType || "Full-time"}
                  onChange={(e) => setData({ ...data, employmentType: e.target.value as any })}
                  className="w-full px-3 py-2 bg-muted/30 border border-border/20 rounded-xl text-xs focus:outline-none"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-foreground block mb-1">Required Skills</label>
              <div className="flex items-center gap-2 mb-2">
                <input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder="Add skill (e.g. React)..."
                  className="flex-1 px-3 py-1.5 bg-muted/30 border border-border/20 rounded-xl text-xs"
                />
                <button
                  onClick={handleAddSkill}
                  className="px-3 py-1.5 bg-primary text-white text-xs rounded-xl cursor-pointer"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(data.requiredSkills || []).map((skill) => (
                  <span key={skill} className="px-2.5 py-1 bg-primary/10 text-primary border border-primary/20 rounded-lg text-xs flex items-center gap-1">
                    {skill}
                    <button onClick={() => handleRemoveSkill(skill)} className="hover:text-red-500 cursor-pointer">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Service Fields */}
        {type === "service" && (
          <>
            <div>
              <label className="text-xs font-medium text-foreground block mb-1">Service Name</label>
              <input
                value={data.serviceName || ""}
                onChange={(e) => setData({ ...data, serviceName: e.target.value })}
                placeholder="e.g. UI/UX Design Audit & Design System"
                className="w-full px-3 py-2 bg-muted/30 border border-border/20 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground block mb-1">Call To Action (CTA)</label>
              <select
                value={data.ctaType || "request_quote"}
                onChange={(e) => setData({ ...data, ctaType: e.target.value as any })}
                className="w-full px-3 py-2 bg-muted/30 border border-border/20 rounded-xl text-xs focus:outline-none"
              >
                <option value="request_quote">Request Quote CTA</option>
                <option value="book_meeting">Book Meeting CTA</option>
                <option value="request_demo">Request Demo CTA</option>
                <option value="view_portfolio">View Portfolio CTA</option>
              </select>
            </div>
          </>
        )}

        {/* Event Fields */}
        {type === "event" && (
          <>
            <div>
              <label className="text-xs font-medium text-foreground block mb-1">Event Title</label>
              <input
                value={data.eventTitle || ""}
                onChange={(e) => setData({ ...data, eventTitle: e.target.value })}
                placeholder="e.g. Tehran Product Leadership Summit 2026"
                className="w-full px-3 py-2 bg-muted/30 border border-border/20 rounded-xl text-xs focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-medium text-foreground block mb-1">Format</label>
                <select
                  value={data.eventFormat || "online"}
                  onChange={(e) => setData({ ...data, eventFormat: e.target.value as any })}
                  className="w-full px-3 py-2 bg-muted/30 border border-border/20 rounded-xl text-xs"
                >
                  <option value="online">Online Webinar</option>
                  <option value="in_person">In-person</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-foreground block mb-1">Timezone</label>
                <input
                  value={data.timezone || "Tehran (GMT+3:30)"}
                  onChange={(e) => setData({ ...data, timezone: e.target.value })}
                  className="w-full px-3 py-2 bg-muted/30 border border-border/20 rounded-xl text-xs"
                />
              </div>
            </div>
          </>
        )}

        {/* Default fallback form for other types */}
        {type !== "job_opening" && type !== "service" && type !== "event" && (
          <div>
            <label className="text-xs font-medium text-foreground block mb-1">Title / Key Objective</label>
            <input
              value={data.articleTitle || data.productName || data.projectTitle || ""}
              onChange={(e) => setData({ ...data, articleTitle: e.target.value, productName: e.target.value, projectTitle: e.target.value })}
              placeholder={`Enter title for ${config.title}...`}
              className="w-full px-3 py-2 bg-muted/30 border border-border/20 rounded-xl text-xs focus:outline-none"
            />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-2 pt-3 border-t border-border/20 mt-4">
        <button onClick={onClose} className="px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted/40 rounded-xl cursor-pointer">
          Cancel
        </button>
        <button onClick={handleConfirm} className="px-4 py-1.5 bg-primary text-white rounded-xl text-xs font-medium cursor-pointer flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5" />
          {config.primaryCtaLabel}
        </button>
      </div>
    </div>
  );
}
