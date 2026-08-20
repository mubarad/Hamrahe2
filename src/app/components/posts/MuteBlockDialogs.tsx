import { useState } from "react";
import { EyeOff, UserMinus, ShieldAlert, Check, X } from "lucide-react";
import { toast } from "sonner";

interface MuteDialogProps {
  authorName: string;
  onConfirm: () => void;
  onClose: () => void;
}

export function MuteDialog({ authorName, onConfirm, onClose }: MuteDialogProps) {
  const handleMute = () => {
    onConfirm();
    toast.success(`Muted ${authorName}. Content will no longer appear in your feed.`);
    onClose();
  };

  return (
    <div className="p-4 bg-card border border-border/30 rounded-2xl shadow-xl max-w-md w-full">
      <div className="flex items-center justify-between pb-3 border-b border-border/20">
        <div className="flex items-center gap-2">
          <EyeOff className="w-4 h-4 text-amber-500" />
          <h3 className="text-sm font-semibold text-foreground">Mute {authorName}?</h3>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-muted/50 rounded-xl cursor-pointer">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <div className="mt-3 space-y-3 text-xs text-muted-foreground leading-relaxed">
        <p>Muting will hide posts, updates, and comments from {authorName} in your feed.</p>
        <p className="p-2.5 bg-muted/20 border border-border/20 rounded-xl">
          ✓ Does not disconnect or unfollow user.<br />
          ✓ {authorName} will not be notified.<br />
          ✓ You can unmute anytime in Settings.
        </p>
      </div>

      <div className="flex items-center justify-end gap-2 pt-3 border-t border-border/20 mt-4">
        <button onClick={onClose} className="px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted/40 rounded-xl cursor-pointer">
          Cancel
        </button>
        <button
          onClick={handleMute}
          className="px-4 py-1.5 bg-amber-500 text-white rounded-xl text-xs font-medium hover:bg-amber-600 cursor-pointer transition-colors"
        >
          Mute Author
        </button>
      </div>
    </div>
  );
}

interface BlockDialogProps {
  authorName: string;
  onConfirm: () => void;
  onClose: () => void;
}

export function BlockDialog({ authorName, onConfirm, onClose }: BlockDialogProps) {
  const handleBlock = () => {
    onConfirm();
    toast.success(`Blocked ${authorName}.`);
    onClose();
  };

  return (
    <div className="p-4 bg-card border border-border/30 rounded-2xl shadow-xl max-w-md w-full">
      <div className="flex items-center justify-between pb-3 border-b border-border/20">
        <div className="flex items-center gap-2">
          <UserMinus className="w-4 h-4 text-red-500" />
          <h3 className="text-sm font-semibold text-foreground">Block {authorName}?</h3>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-muted/50 rounded-xl cursor-pointer">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <div className="mt-3 space-y-2 text-xs text-muted-foreground leading-relaxed">
        <p className="font-medium text-foreground">Blocking will prevent {authorName} from:</p>
        <ul className="list-disc pl-4 space-y-1">
          <li>Viewing your profile or posts</li>
          <li>Sending connection requests or messages</li>
          <li>Mentioning or tagging you in posts</li>
        </ul>
      </div>

      <div className="flex items-center justify-end gap-2 pt-3 border-t border-border/20 mt-4">
        <button onClick={onClose} className="px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted/40 rounded-xl cursor-pointer">
          Cancel
        </button>
        <button
          onClick={handleBlock}
          className="px-4 py-1.5 bg-red-600 text-white rounded-xl text-xs font-medium hover:bg-red-700 cursor-pointer transition-colors"
        >
          Block Author
        </button>
      </div>
    </div>
  );
}
