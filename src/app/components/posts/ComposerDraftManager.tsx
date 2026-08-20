import { useState, useEffect } from "react";
import { getSavedDrafts, deleteDraft, saveDraft, getRecoveredBuffer, setRecoveredBuffer } from "../../utils/post-drafts";
import { PostDraft } from "../../types/post-types";
import { FileText, Trash2, Copy, RefreshCw, X, Clock, Check, Save } from "lucide-react";
import { toast } from "sonner";

interface ComposerDraftManagerProps {
  onLoadDraft: (draft: PostDraft) => void;
  onClose: () => void;
  currentContent?: string;
}

export function ComposerDraftManager({ onLoadDraft, onClose, currentContent }: ComposerDraftManagerProps) {
  const [drafts, setDrafts] = useState<PostDraft[]>([]);
  const [recovered, setRecovered] = useState<Partial<PostDraft> | null>(null);

  useEffect(() => {
    setDrafts(getSavedDrafts());
    setRecovered(getRecoveredBuffer());
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteDraft(id);
    setDrafts(getSavedDrafts());
    toast.success("Draft deleted");
  };

  const handleDuplicate = (draft: PostDraft, e: React.MouseEvent) => {
    e.stopPropagation();
    saveDraft({
      internalTitle: `${draft.internalTitle || "Draft"} (Copy)`,
      content: draft.content,
      media: draft.media,
      linkPreview: draft.linkPreview,
      structuredData: draft.structuredData,
    });
    setDrafts(getSavedDrafts());
    toast.success("Draft duplicated");
  };

  const handleRestoreRecovered = () => {
    if (recovered && recovered.content) {
      onLoadDraft({
        id: `recovered_${Date.now()}`,
        content: recovered.content,
        media: recovered.media || [],
        lastEdited: Date.now(),
      });
      setRecoveredBuffer(null);
      setRecovered(null);
      toast.success("Recovered content loaded into Composer");
      onClose();
    }
  };

  const handleDismissRecovered = () => {
    setRecoveredBuffer(null);
    setRecovered(null);
  };

  return (
    <div className="p-4 bg-card border border-border/30 rounded-2xl shadow-xl max-w-lg w-full max-h-[80vh] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border/20">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Post Drafts</h3>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-muted/50 rounded-xl transition-colors cursor-pointer">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Recovered Banner */}
      {recovered && (
        <div className="mt-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-between">
          <div className="min-w-0 pr-2">
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-400">Unsaved Content Recovered</p>
            <p className="text-[11px] text-amber-600/80 dark:text-amber-300/80 truncate">{recovered.content}</p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleRestoreRecovered}
              className="px-2.5 py-1 bg-amber-500 text-white rounded-lg text-xs font-medium cursor-pointer hover:bg-amber-600 transition-colors"
            >
              Recover
            </button>
            <button
              onClick={handleDismissRecovered}
              className="p-1 hover:bg-amber-500/20 rounded-lg cursor-pointer text-amber-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Draft List */}
      <div className="mt-3 overflow-y-auto space-y-2 flex-1 pr-1">
        {drafts.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            <Clock className="w-8 h-8 mx-auto text-muted-foreground/40 mb-2" />
            <p className="text-xs">No saved drafts yet.</p>
            <p className="text-[11px] text-muted-foreground/60 mt-0.5">Drafts auto-save while you compose.</p>
          </div>
        ) : (
          drafts.map((draft) => (
            <div
              key={draft.id}
              onClick={() => {
                onLoadDraft(draft);
                onClose();
              }}
              className="p-3 bg-muted/20 hover:bg-muted/40 border border-border/20 hover:border-primary/30 rounded-xl cursor-pointer transition-all flex items-start justify-between group"
            >
              <div className="min-w-0 flex-1 pr-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">
                    {draft.internalTitle || "Untitled Draft"}
                  </span>
                  {draft.scheduledAt && (
                    <span className="text-[10px] px-2 py-0.5 bg-blue-500/10 text-blue-600 border border-blue-500/20 rounded-md">
                      Scheduled
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {draft.content || "(No text content)"}
                </p>
                <p className="text-[10px] text-muted-foreground/60 mt-1.5 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(draft.lastEdited).toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => handleDuplicate(draft, e)}
                  title="Duplicate draft"
                  className="p-1.5 hover:bg-card rounded-lg text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={(e) => handleDelete(draft.id, e)}
                  title="Delete draft"
                  className="p-1.5 hover:bg-red-500/10 rounded-lg text-red-500 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
