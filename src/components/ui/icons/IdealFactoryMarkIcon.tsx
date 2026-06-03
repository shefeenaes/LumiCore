interface IdealFactoryMarkIconProps {
  width?: number | string;
  height?: number | string;
  primaryColor?: string;
  secondaryColor?: string;
  className?: string;
}

export default function IdealFactoryMarkIcon({
  width = 30,
  height = 30,
  primaryColor = "#57B7C0",
  secondaryColor = "#ffffff",
  className,
}: IdealFactoryMarkIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect x="2" y="5" width="9" height="30" rx="2" fill={primaryColor} />
      <rect x="15.5" y="12" width="9" height="23" rx="2" fill={primaryColor} />
      <rect x="29" y="2" width="9" height="36" rx="2" fill={secondaryColor} opacity="0.9" />
    </svg>
  );
}
