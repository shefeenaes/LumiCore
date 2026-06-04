interface GridIconProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  className?: string;
}

export default function GridIcon({
  width = 33,
  height = 34,
  color = "white",
  className,
}: GridIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 33 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M28.5556 2H4.44444C2.54213 2 1 3.54213 1 5.44444V29.5556C1 31.4579 2.54213 33 4.44444 33H28.5556C30.4579 33 32 31.4579 32 29.5556V5.44444C32 3.54213 30.4579 2 28.5556 2Z"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 12.3333V22.6667M23.3889 22.6667V33M23.3889 2V12.3333M1 22.6667H32M1 12.3333H32M9.61111 22.6667V33M9.61111 2V12.3333"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
