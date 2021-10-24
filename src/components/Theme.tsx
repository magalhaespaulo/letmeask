import { HTMLAttributes, useState } from 'react'
import { useTheme } from 'next-themes'
import { ThemeSVG } from './svg/ThemeSVG'

const themes = ['purple', 'orange', 'blue']

type DarkModeProps = HTMLAttributes<HTMLElement>

export const Theme = (props: DarkModeProps) => {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const handleTheme = (themeSelected: string) => {
    setIsOpen(!isOpen)

    if (!theme) {
      setTheme('purple')
      return
    }

    const currentMode = theme.split(' ')[1]

    if (currentMode === 'dark') {
      setTheme(themeSelected + ' dark')
    } else {
      setTheme(themeSelected)
    }
  }

  return (
    <div className="relative">
      <button
        className="
          flex items-center justify-center
          w-8 h-8
          animate-hover"
        onClick={() => {
          setIsOpen(!isOpen)
        }}
        aria-label="alterar tema"
      >
        <ThemeSVG theme={theme?.split(' ')[0]} />
      </button>
      {isOpen && (
        <ul
          className="
            absolute top-10 left-0
            flex items-center justify-center flex-col gap-3
            w-8"
        >
          {themes.map((name, index) => {
            if (name !== theme?.split(' ')[0])
              return (
                <li
                  key={index}
                  onClick={() => handleTheme(name)}
                  className="flex"
                >
                  <button
                    className="animate-hover hover:text-secondary"
                    aria-label={name}
                  >
                    <ThemeSVG theme={name} />
                  </button>
                </li>
              )
          })}
        </ul>
      )}
    </div>
  )
}
