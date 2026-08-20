import { useState } from "react";
import { Calendar, Clock, Globe, AlertCircle, X, Check } from "lucide-react";
import { toast } from "sonner";

interface ComposerScheduleDialogProps {
  onSchedule: (scheduledIsoString: string) => void;
  onClose: () => void;
  initialScheduledAt?: string;
}

export function ComposerScheduleDialog({ onSchedule, onClose, initialScheduledAt }: ComposerScheduleDialogProps) {
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const defaultDate = tomorrow.toISOString().split("T")[0];
  const defaultTime = "10:00";

  const [date, setDate] = useState(initialScheduledAt ? initialScheduledAt.split("T")[0] : defaultDate);
  const [time, setTime] = useState(initialScheduledAt ? initialScheduledAt.split("T")[1]?.slice(0, 5) : defaultTime);
  const [timezone] = useState("GMT+3:30 (Tehran)");
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = () => {
    const selectedIso = `${date}T${time}:00`;
    const selectedTime = new Date(selectedIso).getTime();

    if (isNaN(selectedTime)) {
      setError("Please select a valid date and time.");
      return;
    }

    if (selectedTime <= Date.now()) {
      setError("Schedule time must be in the future.");
      return;
    }

    setError(null);
    onSchedule(selectedIso);
    toast.success(`Post scheduled for ${new Date(selectedIso).toLocaleString()}`);
    onClose();
  };

  return (
    <div className="p-4 bg-card border border-border/30 rounded-2xl shadow-xl max-w-md w-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border/20">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Schedule Post</h3>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-muted/50 rounded-xl transition-colors cursor-pointer">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {error && (
          <div className="p-2.5 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-xs text-red-500">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div>
          <label className="text-xs font-medium text-foreground block mb-1.5">Date</label>
          <input
            type="date"
            value={date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 bg-muted/30 border border-border/20 rounded-xl text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-foreground block mb-1.5">Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-3 py-2 bg-muted/30 border border-border/20 rounded-xl text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-foreground block mb-1.5">Timezone</label>
          <div className="flex items-center gap-2 px-3 py-2 bg-muted/20 border border-border/20 rounded-xl text-xs text-muted-foreground">
            <Globe className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <span>{timezone}</span>
          </div>
        </div>

        <div className="p-3 bg-muted/20 rounded-xl border border-border/20 text-xs text-muted-foreground leading-relaxed">
          <p className="font-medium text-foreground mb-0.5">Schedule Summary</p>
          Post will automatically publish on{" "}
          <strong className="text-foreground">
            {date} at {time}
          </strong>{" "}
          ({timezone}).
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/20">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted/40 rounded-xl cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-1.5 bg-primary text-white rounded-xl text-xs font-medium hover:bg-primary/90 cursor-pointer transition-colors flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            Schedule
          </button>
        </div>
      </div>
    </div>
  );
}
