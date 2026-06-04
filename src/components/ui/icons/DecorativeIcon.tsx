interface DecorativeIconProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  className?: string;
}

export default function DecorativeIcon({
  width = 236,
  height = 235,
  color = "#797777",
  className,
}: DecorativeIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 236 235"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <g clipPath="url(#clip0_1_851)">
        <mask
          id="mask0_1_851"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="-2"
          y="0"
          width="238"
          height="235"
        >
          <path d="M-2 235H236V0H-2V235Z" fill="white" />
        </mask>
        <g mask="url(#mask0_1_851)">
          <g opacity="0.5">
            <mask
              id="mask1_1_851"
              style={{ maskType: "luminance" }}
              maskUnits="userSpaceOnUse"
              x="-192"
              y="-1"
              width="429"
              height="427"
            >
              <g opacity="0.5">
                <path d="M-191.264 425.407H236.151V-0.0657654H-191.264V425.407Z" fill="white" />
              </g>
            </mask>
            <g mask="url(#mask1_1_851)">
              <path
                d="M22.4432 424.513L235.251 212.67L22.4432 0.826891L-190.364 212.67L22.4432 424.513Z"
                stroke={color}
                strokeMiterlimit="10"
              />
            </g>
            <path
              d="M9.96755 389.224L199.783 225.046L34.8566 36.0897L-154.959 200.268L9.96755 389.224Z"
              stroke={color}
              strokeWidth="1.00018"
              strokeMiterlimit="10"
            />
            <path
              d="M-2.5114 353.811L164.314 237.42L47.3946 71.3514L-119.431 187.742L-2.5114 353.811Z"
              stroke={color}
              strokeWidth="1.00012"
              strokeMiterlimit="10"
            />
            <path
              d="M-14.8501 318.593L128.847 249.795L59.7372 106.751L-83.9602 175.548L-14.8501 318.593Z"
              stroke={color}
              strokeMiterlimit="10"
            />
            <path
              d="M-27.2807 283.285L93.3801 262.169L72.1679 142.057L-48.493 163.173L-27.2807 283.285Z"
              stroke={color}
              strokeMiterlimit="10"
            />
            <path
              d="M57.9123 274.544L84.5985 177.364L-13.0246 150.798L-39.7108 247.978L57.9123 274.544Z"
              stroke={color}
              strokeMiterlimit="10"
            />
            <path
              d="M22.4451 286.919L97.0305 212.67L22.4426 138.422L-52.1421 212.672L22.4451 286.919Z"
              stroke={color}
              strokeMiterlimit="10"
            />
          </g>
        </g>
      </g>
      <defs>
        <clipPath id="clip0_1_851">
          <rect width="238" height="235" fill="white" transform="matrix(-1 0 0 -1 236 235)" />
        </clipPath>
      </defs>
    </svg>
  );
}
