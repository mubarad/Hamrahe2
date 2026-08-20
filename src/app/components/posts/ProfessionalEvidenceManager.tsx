import { useState } from "react";
import { FileCheck, Link as LinkIcon, Upload, X, Check, ShieldCheck } from "lucide-react";
import { ProfessionalEvidence, EvidenceType, EvidenceState } from "../../types/post-types";
import { toast } from "sonner";

interface ProfessionalEvidenceManagerProps {
  evidence: ProfessionalEvidence[];
  onUpdate: (evidence: ProfessionalEvidence[]) => void;
  onClose: () => void;
}

export function ProfessionalEvidenceManager({ evidence, onUpdate, onClose }: ProfessionalEvidenceManagerProps) {
  const [title, setTitle] = useState("");
  const [urlOrFile, setUrlOrFile] = useState("");
  const [evidenceType, setEvidenceType] = useState<EvidenceType>("external_link");
  const [isPrivate, setIsPrivate] = useState(false);

  const handleAdd = () => {
    if (!title.trim()) {
      toast.error("Please enter evidence description or title");
      return;
    }
    const newEvidence: ProfessionalEvidence = {
      id: `ev_${Date.now()}`,
      type: evidenceType,
      state: "Evidence Attached",
      title: title.trim(),
      urlOrFile: urlOrFile.trim() || undefined,
      isPrivate,
    };
    onUpdate([...evidence, newEvidence]);
    setTitle("");
    setUrlOrFile("");
    toast.success("Professional evidence attached");
  };

  const handleRemove = (id: string) => {
    onUpdate(evidence.filter((e) => e.id !== id));
    toast.success("Evidence removed");
  };

  return (
    <div className="p-4 bg-card border border-border/30 rounded-2xl shadow-xl max-w-lg w-full max-h-[80vh] flex flex-col">
      <div className="flex items-center justify-between pb-3 border-b border-border/20">
        <div className="flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-violet-500" />
          <h3 className="text-sm font-semibold text-foreground">Attach Professional Evidence</h3>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-muted/50 rounded-xl cursor-pointer">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <div className="mt-3 space-y-3 overflow-y-auto pr-1 flex-1">
        <div>
          <label className="text-xs font-medium text-foreground block mb-1">Evidence Type</label>
          <select
            value={evidenceType}
            onChange={(e) => setEvidenceType(e.target.value as EvidenceType)}
            className="w-full px-3 py-2 bg-muted/30 border border-border/20 rounded-xl text-xs focus:outline-none"
          >
            <option value="external_link">External Link / Portfolio / Repository</option>
            <option value="uploaded_file">Uploaded Document / Certificate PDF</option>
            <option value="connected_project">Connected Project Record</option>
            <option value="colleague_confirmation">Colleague Confirmation Request</option>
            <option value="company_confirmation">Company Confirmation Request</option>
            <option value="client_confirmation">Client Confirmation Request</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-foreground block mb-1">Evidence Title / Description</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. GitHub Repository, Client Contract, Certificate Link"
            className="w-full px-3 py-2 bg-muted/30 border border-border/20 rounded-xl text-xs focus:outline-none"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-foreground block mb-1">Link URL or Document Reference</label>
          <input
            value={urlOrFile}
            onChange={(e) => setUrlOrFile(e.target.value)}
            placeholder="https://..."
            className="w-full px-3 py-2 bg-muted/30 border border-border/20 rounded-xl text-xs focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-between p-2.5 bg-muted/20 border border-border/20 rounded-xl">
          <div>
            <p className="text-xs font-medium text-foreground">Keep Evidence Document Private</p>
            <p className="text-[10px] text-muted-foreground">Validates status without exposing raw file publicly</p>
          </div>
          <button
            onClick={() => setIsPrivate(!isPrivate)}
            className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
              isPrivate ? "bg-primary text-white" : "bg-muted/50 text-muted-foreground"
            }`}
          >
            {isPrivate ? "Private" : "Public"}
          </button>
        </div>

        <button
          onClick={handleAdd}
          className="w-full py-2 bg-violet-600 text-white rounded-xl text-xs font-medium hover:bg-violet-700 cursor-pointer transition-colors"
        >
          Add Evidence Item
        </button>

        {/* Current Evidence List */}
        {evidence.length > 0 && (
          <div className="pt-3 border-t border-border/20 space-y-2">
            <p className="text-xs font-medium text-foreground">Attached Evidence</p>
            {evidence.map((e) => (
              <div key={e.id} className="flex items-center justify-between p-2 bg-violet-500/10 border border-violet-500/20 rounded-xl">
                <div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-violet-600" />
                    <span className="text-xs font-medium text-foreground">{e.title}</span>
                    <span className="text-[10px] px-1.5 py-0.5 bg-violet-500/20 text-violet-700 dark:text-violet-300 rounded">
                      {e.state}
                    </span>
                  </div>
                  {e.urlOrFile && <p className="text-[10px] text-muted-foreground truncate">{e.urlOrFile}</p>}
                </div>
                <button onClick={() => handleRemove(e.id)} className="p-1 hover:bg-red-500/10 rounded-lg text-red-500 cursor-pointer">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-end pt-3 border-t border-border/20 mt-3">
        <button onClick={onClose} className="px-4 py-1.5 bg-primary text-white rounded-xl text-xs font-medium cursor-pointer">
          Done
        </button>
      </div>
    </div>
  );
}
