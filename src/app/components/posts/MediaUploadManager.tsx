import { useState, useRef } from "react";
import {
  Video, FileText, Image as ImageIcon, X, Play, Pause, RefreshCw, Upload,
  Crop, RotateCw, Trash2, Plus, Move, Check, FileCheck, Eye, Download,
  Volume2, VolumeX, AlertTriangle
} from "lucide-react";
import { MediaAttachment } from "../../types/post-types";
import { toast } from "sonner";

interface VideoEditorModalProps {
  media: MediaAttachment;
  onSave: (updated: MediaAttachment) => void;
  onClose: () => void;
}

export function VideoEditorModal({ media, onSave, onClose }: VideoEditorModalProps) {
  const [trimStart, setTrimStart] = useState(media.trimStart || 0);
  const [trimEnd, setTrimEnd] = useState(media.trimEnd || 60);
  const [captions, setCaptions] = useState(media.captions || "Auto-generated captions: Exciting update on product design and UX improvements.");
  const [altText, setAltText] = useState(media.altText || "");
  const [autoPlay, setAutoPlay] = useState(media.autoPlay ?? true);

  const handleSave = () => {
    onSave({
      ...media,
      trimStart,
      trimEnd,
      captions,
      altText,
      autoPlay,
    });
    toast.success("Video settings saved");
    onClose();
  };

  return (
    <div className="p-4 bg-card border border-border/30 rounded-2xl shadow-xl max-w-lg w-full">
      <div className="flex items-center justify-between pb-3 border-b border-border/20">
        <div className="flex items-center gap-2">
          <Video className="w-4 h-4 text-red-500" />
          <h3 className="text-sm font-semibold text-foreground">Video Editor & Settings</h3>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-muted/50 rounded-xl cursor-pointer">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <div className="mt-4 space-y-4 max-h-[70vh] overflow-y-auto pr-1">
        {/* Trim sliders */}
        <div>
          <label className="text-xs font-medium text-foreground block mb-1">
            Trim Video (Start: {trimStart}s - End: {trimEnd}s)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={0}
              max={30}
              value={trimStart}
              onChange={(e) => setTrimStart(Number(e.target.value))}
              className="w-full"
            />
            <input
              type="range"
              min={30}
              max={120}
              value={trimEnd}
              onChange={(e) => setTrimEnd(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        {/* Captions */}
        <div>
          <label className="text-xs font-medium text-foreground block mb-1">Video Captions</label>
          <textarea
            value={captions}
            onChange={(e) => setCaptions(e.target.value)}
            rows={2}
            className="w-full p-2.5 bg-muted/30 border border-border/20 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Accessibility Alt Text */}
        <div>
          <label className="text-xs font-medium text-foreground block mb-1">Accessibility Description</label>
          <input
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            placeholder="Describe the video for screen readers..."
            className="w-full px-3 py-2 bg-muted/30 border border-border/20 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Autoplay Preference */}
        <div className="flex items-center justify-between p-2.5 bg-muted/20 border border-border/20 rounded-xl">
          <span className="text-xs font-medium text-foreground">Autoplay in Feed</span>
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
              autoPlay ? "bg-primary text-white" : "bg-muted/50 text-muted-foreground"
            }`}
          >
            {autoPlay ? "Enabled" : "Disabled"}
          </button>
        </div>
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

interface DocumentEditorModalProps {
  media: MediaAttachment;
  onSave: (updated: MediaAttachment) => void;
  onClose: () => void;
}

export function DocumentEditorModal({ media, onSave, onClose }: DocumentEditorModalProps) {
  const [title, setTitle] = useState(media.title || media.name || "Document Presentation");
  const [description, setDescription] = useState(media.description || "");
  const [allowDownload, setAllowDownload] = useState(media.allowDownload ?? true);
  const [altText, setAltText] = useState(media.altText || "");

  const handleSave = () => {
    onSave({
      ...media,
      title,
      description,
      allowDownload,
      altText,
    });
    toast.success("Document settings saved");
    onClose();
  };

  return (
    <div className="p-4 bg-card border border-border/30 rounded-2xl shadow-xl max-w-lg w-full">
      <div className="flex items-center justify-between pb-3 border-b border-border/20">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Document Details</h3>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-muted/50 rounded-xl cursor-pointer">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <div className="mt-4 space-y-4">
        <div>
          <label className="text-xs font-medium text-foreground block mb-1">Document Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 bg-muted/30 border border-border/20 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-foreground block mb-1">Description (Optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full p-2.5 bg-muted/30 border border-border/20 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-foreground block mb-1">Accessibility Description</label>
          <input
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            placeholder="Describe key points for screen readers..."
            className="w-full px-3 py-2 bg-muted/30 border border-border/20 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="flex items-center justify-between p-2.5 bg-muted/20 border border-border/20 rounded-xl">
          <div>
            <p className="text-xs font-medium text-foreground">Allow Download</p>
            <p className="text-[10px] text-muted-foreground">Allow readers to download PDF</p>
          </div>
          <button
            onClick={() => setAllowDownload(!allowDownload)}
            className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
              allowDownload ? "bg-primary text-white" : "bg-muted/50 text-muted-foreground"
            }`}
          >
            {allowDownload ? "Allowed" : "Disabled"}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pt-3 border-t border-border/20 mt-4">
        <button onClick={onClose} className="px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted/40 rounded-xl cursor-pointer">
          Cancel
        </button>
        <button onClick={handleSave} className="px-4 py-1.5 bg-primary text-white rounded-xl text-xs font-medium cursor-pointer">
          Save
        </button>
      </div>
    </div>
  );
}
