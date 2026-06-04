interface IconProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  className?: string;
}

export default function DoorIcon({
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
        d="M6 31.5V10.5C6 6.258 6 4.1355 7.3185 2.8185C8.6355 1.5 10.758 1.5 15 1.5H18C22.242 1.5 24.3645 1.5 25.6815 2.8185C27 4.1355 27 6.258 27 10.5V31.5H6Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 31.5H30M16.5 6.5V18.2647M22.5 12.3824H10.5M10.5 15.3235V9.44118C10.5 7.00735 11.0175 6.5 13.5 6.5H19.5C21.9825 6.5 22.5 7.00735 22.5 9.44118V15.3235C22.5 17.7574 21.9825 18.2647 19.5 18.2647H13.5C11.0175 18.2647 10.5 17.7574 10.5 15.3235Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
