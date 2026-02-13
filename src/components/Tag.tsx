import {type ReactNode } from "react";
type TagVariant = "default" | "info" | "danger" | "success" | "warning";

interface TagProps {
  children: ReactNode
  variant?: TagVariant
}

export function Tag({ 
  children,
  variant = "default", 
}: TagProps) {
  const base = "px-3 py-1 text-xs font-mono rounded-full border";

  const variants: Record<TagVariant, string> = {
    default: "bg-white/5 text-white/40 border border-white/10",
    info: "bg-electric-500/10 text-electric-400 border-electric-500/20",
    danger: "bg-red-500/10 text-red-400 border-red-500/20",
    success: "bg-green-500/10 text-green-400 border-green-500/20",
    warning: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  };

  return (
    <span
      className={`${base} ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
