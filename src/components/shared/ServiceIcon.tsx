import { cn } from "@/lib/utils";

type ServiceIconProps = {
  id: string;
  className?: string;
};

export function ServiceIcon({ id, className }: ServiceIconProps) {
  const base = cn("shrink-0", className);

  switch (id) {
    case "building":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <rect x="3" y="3" width="7" height="18" rx="1" />
          <rect x="14" y="8" width="7" height="13" rx="1" />
          <path d="M7 7h0M17 12h0" strokeLinecap="round" />
          <rect x="5" y="11" width="3" height="3" rx="0.5" />
          <rect x="16" y="16" width="3" height="3" rx="0.5" />
        </svg>
      );
    case "lock":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 1 1 8 0v4" />
          <circle cx="12" cy="16" r="1.5" fill="currentColor" />
        </svg>
      );
    case "door":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <rect x="4" y="2" width="16" height="20" rx="1" />
          <path d="M4 22h16" />
          <circle cx="16" cy="12" r="1" fill="currentColor" />
          <path d="M8 7h3M8 11h3M8 15h3" strokeLinecap="round" />
        </svg>
      );
    case "window":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 12h18M12 3v18" />
          <path d="M6 6h3M15 6h3M6 15h3M15 15h3" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}
