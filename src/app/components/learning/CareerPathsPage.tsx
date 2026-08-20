import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowLeft, Search, Sparkles, Filter } from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { CAREER_PATHS } from "../../data/learning-data";
import { CareerPathCard, AINativeBadge } from "./shared";

export function CareerPathsPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "started" | "recommended">("all");

  const filtered = CAREER_PATHS.filter((p) => {
    if (filter === "started" && p.progress === 0) return false;
    if (filter === "recommended" && !p.aiNative) return false;
    return p.title.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div className="max-w-[1000px] mx-auto space-y-5">
      <button
        onClick={() => navigate("/learning")}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Learning &amp; Assessments
      </button>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-foreground" style={{ fontWeight: 700, fontSize: 24 }}>Career Paths</h1>
          <AINativeBadge />
        </div>
        <p className="text-sm text-muted-foreground">
          Recommended based on your latest assessment. Each path is AI-native, practice-first, and assessment-backed.
        </p>
      </motion.div>

      <Card padding={false} className="p-3">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 flex-1 min-w-[200px] bg-muted/50 rounded-xl px-3 py-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search career paths..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
            />
          </div>
          <div className="flex items-center gap-1.5">
            {(["all", "started", "recommended"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs px-3 py-1.5 rounded-lg capitalize transition-all ${filter === f ? "bg-primary text-white" : "bg-muted/50 text-muted-foreground hover:bg-muted"}`}
                style={{ fontWeight: 600 }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        {filtered.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <CareerPathCard path={p} />
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <Card className="text-center py-10">
            <p className="text-sm text-muted-foreground">No paths match your search.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
