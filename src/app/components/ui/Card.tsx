interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
  onClick?: () => void;
  glass?: boolean;
}

export function Card({ children, className = "", padding = true, onClick, glass }: CardProps) {
  return (
    <div
      className={`${glass ? "bg-white/60 backdrop-blur-md" : "bg-card"} border border-border/30 rounded-2xl shadow-sm ${padding ? "p-5" : ""} ${onClick ? "cursor-pointer hover:shadow-md transition-shadow" : ""} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
