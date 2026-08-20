interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "success" | "warning" | "outline";
  size?: "sm" | "md";
  className?: string;
}

const variants = {
  default: "bg-muted/60 text-muted-foreground",
  primary: "bg-primary/8 text-primary",
  success: "bg-emerald-50 text-emerald-600",
  warning: "bg-amber-50 text-amber-600",
  outline: "bg-transparent border border-border/40 text-muted-foreground",
};

export function Badge({ children, variant = "default", size = "sm", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-lg px-2.5 ${
        size === "sm" ? "py-0.5 text-xs" : "py-1 text-sm"
      } ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
