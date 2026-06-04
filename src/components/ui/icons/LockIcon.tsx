interface IconProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  className?: string;
}

export default function LockIcon({
  width = 36,
  height = 36,
  color = "#57B7C0",
  className,
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M1.5 19H34M17.75 19V34M24 25.25V27.75M11.5 25.25V27.75M5.25 19V31.5C5.25 32.163 5.51339 32.7989 5.98223 33.2678C6.45107 33.7366 7.08696 34 7.75 34H27.75C28.413 34 29.0489 33.7366 29.5178 33.2678C29.9866 32.7989 30.25 32.163 30.25 31.5V19V14C30.25 10.6848 28.933 7.50537 26.5888 5.16116C24.2446 2.81696 21.0652 1.5 17.75 1.5C14.4348 1.5 11.2554 2.81696 8.91116 5.16116C6.56696 7.50537 5.25 10.6848 5.25 14V19Z"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
