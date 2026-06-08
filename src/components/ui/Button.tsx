import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-inter text-base font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-50";

const VARIANT_CLASSES = {
  // Primary teal button — on hover it inverts to white bg / primary text.
  primary: "bg-primary text-white hover:bg-white hover:text-primary",
  // White button — on hover it inverts to primary bg / white text.
  inverted: "bg-white text-primary hover:bg-primary hover:text-white",
} as const;

type CommonProps = {
  /** Show the trailing arrow-in-circle icon */
  withArrow?: boolean;
  /** Visual style — `inverted` is white bg / primary text */
  variant?: keyof typeof VARIANT_CLASSES;
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

export function Button({
  withArrow = false,
  variant = "primary",
  children,
  className,
  ...props
}: ButtonProps) {
  const classes = cn(BASE_CLASSES, VARIANT_CLASSES[variant], className);

  if (typeof props.href === "string") {
    const anchorProps = props as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a className={classes} {...anchorProps}>
        <Content withArrow={withArrow}>{children}</Content>
      </a>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...buttonProps}>
      <Content withArrow={withArrow}>{children}</Content>
    </button>
  );
}
