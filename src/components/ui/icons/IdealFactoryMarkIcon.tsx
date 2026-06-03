interface IdealFactoryMarkIconProps {
  width?: number | string;
  height?: number | string;
  primaryColor?: string;
  secondaryColor?: string;
  className?: string;
}

export default function IdealFactoryMarkIcon({
  width = 40,
  height = 40,
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
      {/* Left bar */}
      <rect x="2" y="10" width="9" height="28" rx="2" fill={primaryColor} />
      {/* Middle bar */}
      <rect x="15.5" y="5" width="9" height="33" rx="2" fill={primaryColor} />
      {/* Right bar — tallest */}
      <rect x="29" y="2" width="9" height="36" rx="2" fill={secondaryColor} />
    </svg>
  );
}
