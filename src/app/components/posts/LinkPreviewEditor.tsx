import { useState, useEffect } from "react";
import { Link as LinkIcon, RefreshCw, X, Globe, EyeOff, RotateCcw } from "lucide-react";
import { LinkPreviewData } from "../../types/post-types";

interface LinkPreviewEditorProps {
  content: string;
  onPreviewChange: (preview: LinkPreviewData | undefined) => void;
}

export function LinkPreviewEditor({ content, onPreviewChange }: LinkPreviewEditorProps) {
  const [detectedUrl, setDetectedUrl] = useState<string | null>(null);
  const [preview, setPreview] = useState<LinkPreviewData | undefined>(undefined);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const matches = content.match(urlRegex);

    if (matches && matches.length > 0) {
      const url = matches[0];
      if (url !== detectedUrl) {
        setDetectedUrl(url);
        setRemoved(false);
        const domain = url.replace(/^https?:\/\//, "").split("/")[0];
        const newPreview: LinkPreviewData = {
          url,
          title: `Professional Insight & Article on ${domain}`,
          description: `Detailed analysis, benchmarks, and discussions surrounding ${domain}. Read key takeaways for Iran's tech ecosystem.`,
          domain,
          imageUrl: "https://images.unsplash.com/photo-1702047048032-e734daa2473d?auto=format&fit=crop&w=800&q=80",
          status: "loaded",
        };
        setPreview(newPreview);
        onPreviewChange(newPreview);
      }
    } else if (!matches && detectedUrl) {
      setDetectedUrl(null);
      setPreview(undefined);
      onPreviewChange(undefined);
    }
  }, [content]);

  const handleRemove = () => {
    setRemoved(true);
    onPreviewChange(undefined);
  };

  const handleRestore = () => {
    setRemoved(false);
    onPreviewChange(preview);
  };

  if (!preview || removed) {
    if (removed && detectedUrl) {
      return (
        <div className="mx-4 mb-3 flex items-center justify-between p-2 bg-muted/20 border border-border/20 rounded-xl text-xs text-muted-foreground">
          <span className="truncate pr-2">Link preview hidden ({detectedUrl})</span>
          <button onClick={handleRestore} className="flex items-center gap-1 text-primary hover:underline cursor-pointer font-medium">
            <RotateCcw className="w-3 h-3" /> Restore Preview
          </button>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="mx-4 mb-3 bg-muted/20 border border-border/30 rounded-xl overflow-hidden relative group">
      <button
        onClick={handleRemove}
        className="absolute top-2 right-2 w-6 h-6 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white cursor-pointer z-10 transition-colors"
        title="Remove link preview"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      <div className="flex flex-col sm:flex-row">
        {preview.imageUrl && (
          <div className="sm:w-36 h-28 shrink-0 bg-muted">
            <img src={preview.imageUrl} alt={preview.title} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="p-3 min-w-0 flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground mb-1 uppercase font-semibold">
            <Globe className="w-3 h-3" />
            <span>{preview.domain}</span>
          </div>
          <p className="text-xs font-semibold text-foreground line-clamp-1">{preview.title}</p>
          <p className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5">{preview.description}</p>
        </div>
      </div>
    </div>
  );
}
