import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  label?: string;
  title: string;
  subtitle?: React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
  titleClassName?: string;
};

export function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
  className,
  titleClassName,
}: SectionHeadingProps) {
  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[align];

  return (
    <div className={cn("mb-10", alignClass, className)}>
      {label && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-teal">
          {label}
        </p>
      )}
      <h2 className={cn("text-3xl font-bold text-white sm:text-4xl", titleClassName)}>{title}</h2>
      {subtitle && <div className="mt-3 text-gray-300">{subtitle}</div>}
    </div>
  );
}
