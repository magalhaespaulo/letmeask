import { useEffect, useState } from 'react'

export const ThemeSVG = (props: { theme?: string }) => {
  const [color, setColor] = useState<string>()

  useEffect(() => {
    setColor(props.theme)
  }, [props.theme])

  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
    >
      <rect
        width="24"
        height="24"
        rx="12"
        fill={`url(#color_selected_${color})`}
      />
      <defs>
        <linearGradient
          id={`color_selected_${color}`}
          x1="8.1"
          y1="6.9"
          x2="22.5"
          y2="25"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            className={`
              ${color === 'purple' && 'text-purpleTheme-primary'}
              ${color === 'orange' && 'text-orangeTheme-primary'}
              ${color === 'blue' && 'text-blueTheme-primary'}
            `}
            stopColor="currentColor"
          />
          <stop
            offset=".9"
            className={`
              ${color === 'purple' && 'text-purpleTheme-secondary'}
              ${color === 'orange' && 'text-orangeTheme-secondary'}
              ${color === 'blue' && 'text-blueTheme-secondary'}
            `}
            stopColor="currentColor"
          />
        </linearGradient>
      </defs>
    </svg>
  )
}
