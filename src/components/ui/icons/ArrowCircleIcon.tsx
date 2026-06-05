interface ArrowCircleIconProps {
  width?: number | string;
  height?: number | string;
  /** Stroke color of the circle outline + arrow */
  color?: string;
  /** Fill color of the circle background */
  fill?: string;
  className?: string;
}

export default function ArrowCircleIcon({
  width = 35,
  height = 35,
  color = "white",
  fill = "none",
  className,
}: ArrowCircleIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 35 35"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M17.5 34.1663C26.7047 34.1663 34.1667 26.7044 34.1667 17.4997C34.1667 8.29493 26.7047 0.833008 17.5 0.833008C8.29525 0.833008 0.833328 8.29493 0.833328 17.4997C0.833328 26.7044 8.29525 34.1663 17.5 34.1663Z"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.1667 10.833L20.8333 17.4997L14.1667 24.1663"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
