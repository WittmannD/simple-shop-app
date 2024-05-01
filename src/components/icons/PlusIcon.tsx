export interface PlusIconProps {
  fill?: string
  size?: number
  width?: number
  height?: number
  label?: string
  [index: string]: unknown
}

export const PlusIcon = ({
  fill = 'currentColor',
  size,
  height,
  width,
  ...props
}: PlusIconProps) => {
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
        d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
        clipRule="evenodd"
      />
    </svg>
  )
}
