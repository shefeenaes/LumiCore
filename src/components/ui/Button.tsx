import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-inter text-base font-medium text-white transition-all duration-200 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-50";

type CommonProps = {
  /** Show the trailing arrow-in-circle icon */
  withArrow?: boolean;
  children: React.ReactNode;
  className?: string;
};

// When `href` is provided the component renders an <a>, otherwise a <button>.
type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

function Content({ withArrow, children }: Pick<CommonProps, "withArrow" | "children">) {
  return (
    <>
      {children}
      {withArrow && (
        <span
          aria-hidden="true"
          className="flex h-6 w-6 items-center justify-center rounded-full border border-current"
        >
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      )}
    </>
  );
}

export function Button({ withArrow = false, children, className, ...props }: ButtonProps) {
  if (typeof props.href === "string") {
    const anchorProps = props as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a className={cn(BASE_CLASSES, className)} {...anchorProps}>
        <Content withArrow={withArrow}>{children}</Content>
      </a>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={cn(BASE_CLASSES, className)} {...buttonProps}>
      <Content withArrow={withArrow}>{children}</Content>
    </button>
  );
}
