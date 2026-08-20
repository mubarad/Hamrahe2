import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "destructive" | "gradient";
  size?: "sm" | "md" | "lg" | "icon";
  children: ReactNode;
}

const variants = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm shadow-primary/20",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
  outline: "border border-primary/30 text-primary hover:bg-primary/5",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  gradient: "bg-gradient-to-r from-[#0066FF] to-[#7c3aed] text-white hover:opacity-90 shadow-md shadow-primary/25",
};

const sizeClasses = {
  sm: "px-3.5 py-1.5 text-sm rounded-xl",
  md: "px-5 py-2.5 rounded-xl",
  lg: "px-6 py-3 rounded-xl",
  icon: "p-2.5 rounded-xl",
};

export function Button({ variant = "primary", size = "md", children, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none cursor-pointer ${variants[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
