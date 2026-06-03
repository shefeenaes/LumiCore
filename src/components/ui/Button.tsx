import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "outline" | "ghost" | "teal";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  withArrow?: boolean;
  children: React.ReactNode;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-white text-black hover:bg-gray-100 border border-white/20",
  outline:
    "bg-transparent text-white border border-white/50 hover:border-white hover:bg-white/10",
  ghost:
    "bg-transparent text-white hover:bg-white/10",
  teal:
    "bg-brand-teal text-black font-semibold hover:bg-brand-teal-dark border border-brand-teal",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  withArrow = false,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
      {withArrow && (
        <span
          aria-hidden="true"
          className="flex h-6 w-6 items-center justify-center rounded-full border border-current"
        >
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      )}
    </button>
  );
}
