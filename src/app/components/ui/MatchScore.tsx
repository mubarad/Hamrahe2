interface MatchScoreProps {
  score: number;
  size?: "sm" | "md" | "lg";
}

export function MatchScore({ score, size = "md" }: MatchScoreProps) {
  const dim = size === "sm" ? 36 : size === "md" ? 48 : 64;
  const strokeW = size === "sm" ? 3 : size === "md" ? 3.5 : 4;
  const r = (dim - strokeW * 2) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (score / 100) * circumference;
  const gradientId = `match-grad-${size}-${score}`;

  const textColor = score >= 80 ? "text-emerald-600" : score >= 60 ? "text-amber-600" : "text-red-500";
  const startColor = score >= 80 ? "#00C853" : score >= 60 ? "#FF9800" : "#F44336";
  const endColor = score >= 80 ? "#0066FF" : score >= 60 ? "#F44336" : "#F44336";

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: dim, height: dim }}>
      <svg width={dim} height={dim} className="-rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={startColor} />
            <stop offset="100%" stopColor={endColor} />
          </linearGradient>
        </defs>
        <circle cx={dim / 2} cy={dim / 2} r={r} fill="none" stroke="#f0f2f5" strokeWidth={strokeW} />
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={r}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeW}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span className={`absolute ${textColor} ${size === "sm" ? "text-[10px]" : size === "md" ? "text-xs" : "text-sm"}`} style={{ fontWeight: 700 }}>
        {score}
      </span>
    </div>
  );
}
