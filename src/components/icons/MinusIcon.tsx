export interface MinusIconProps {
  fill?: string
  size?: number
  width?: number
  height?: number
  label?: string
  [index: string]: unknown
}

export const MinusIcon = ({
  fill = 'currentColor',
  size,
  height,
  width,
  ...props
}: MinusIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={fill}
      width={size || width || 24}
      height={size || height || 24}
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z"
        clipRule="evenodd"
      />
    </svg>
  )
}
