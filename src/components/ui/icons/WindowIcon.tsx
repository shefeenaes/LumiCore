interface IconProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  className?: string;
}

export default function WindowIcon({
  width = 33,
  height = 33,
  color = "#57B7C0",
  className,
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M16.5 32H1V2.47619C1 2.47619 3.95238 1 8.75 1C13.5476 1 16.5 2.47619 16.5 2.47619V32ZM16.5 32V17.2381H16.869C16.869 17.2381 19.4524 18.7143 24.25 18.7143C29.0476 18.7143 31.631 17.2381 31.631 17.2381H32V32H16.5ZM1 12.8095C1 12.8095 3.95238 11.3333 8.75 11.3333C13.5476 11.3333 16.5 12.8095 16.5 12.8095M4.69048 5.42857V8.38095M4.69048 15.0238V17.9762M26.0952 18.639V13.1786C26.0952 12.6892 25.9008 12.2198 25.5548 11.8738C25.2087 11.5277 24.7394 11.3333 24.25 11.3333C23.7606 11.3333 23.2913 11.5277 22.9452 11.8738C22.5992 12.2198 22.4048 12.6892 22.4048 13.1786V13.5476"
        stroke={color}
        strokeWidth="2"
      />
    </svg>
  );
}
