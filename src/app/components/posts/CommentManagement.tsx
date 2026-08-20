import { useState } from "react";
import { MessageCircle, Pin, MoreHorizontal, Flag, Trash2, Edit3, Link as LinkIcon, Lock, Check, X, Shield, Reply } from "lucide-react";
import { CommentPermission } from "../../types/post-types";
import { Avatar } from "../ui/Avatar";
import { toast } from "sonner";

interface CommentManagementProps {
  postAuthorId: string;
  currentUserId: string;
  commentPermissions: CommentPermission;
  onUpdatePermissions: (perm: CommentPermission) => void;
  onClosePermissionsDialog?: () => void;
}

export function CommentPermissionsDialog({
  commentPermissions,
  onUpdatePermissions,
  onClose,
}: {
  commentPermissions: CommentPermission;
  onUpdatePermissions: (perm: CommentPermission) => void;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState<CommentPermission>(commentPermissions);

  const OPTIONS: { id: CommentPermission; label: string; desc: string }[] = [
    { id: "everyone", label: "Everyone", desc: "Anyone on Hamrahe can comment" },
    { id: "followers_connections", label: "Followers and Connections", desc: "Only people following or connected with you" },
    { id: "connections", label: "Connections Only", desc: "1st degree connections only" },
    { id: "mentioned", label: "Mentioned People Only", desc: "Only people tagged in this post" },
    { id: "disabled", label: "Disable Comments", desc: "Turn off comments completely for this post" },
  ];

  const handleSave = () => {
    onUpdatePermissions(selected);
    toast.success("Comment permission updated");
    onClose();
  };

  return (
    <div className="p-4 bg-card border border-border/30 rounded-2xl shadow-xl max-w-md w-full">
      <div className="flex items-center justify-between pb-3 border-b border-border/20">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Who Can Comment?</h3>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-muted/50 rounded-xl cursor-pointer">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <div className="mt-3 space-y-2">
        {OPTIONS.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setSelected(opt.id)}
            className={`w-full flex items-start gap-3 p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
              selected === opt.id
                ? "bg-primary/10 border-primary/40 text-foreground"
                : "bg-muted/10 border-border/20 text-muted-foreground hover:bg-muted/30"
            }`}
          >
            <div className="mt-0.5">
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  selected === opt.id ? "border-primary bg-primary text-white" : "border-border"
                }`}
              >
                {selected === opt.id && <Check className="w-2.5 h-2.5" />}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">{opt.label}</p>
              <p className="text-[10px] text-muted-foreground">{opt.desc}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-end gap-2 pt-3 border-t border-border/20 mt-4">
        <button onClick={onClose} className="px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted/40 rounded-xl cursor-pointer">
          Cancel
        </button>
        <button onClick={handleSave} className="px-4 py-1.5 bg-primary text-white rounded-xl text-xs font-medium cursor-pointer">
          Save Settings
        </button>
      </div>
    </div>
  );
}
