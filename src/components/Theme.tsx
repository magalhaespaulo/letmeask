import { useState } from 'react'
import { useTheme } from 'next-themes'
import { ThemeSVG } from './svg/ThemeSVG'

const THEMES = ['purple', 'orange', 'blue']

export const Theme = () => {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const [currentTheme, currentMode] = theme?.split(' ') ?? ['purple', '']

  const handleTheme = (themeSelected: string) => {
    setIsOpen(!isOpen)

    if (currentMode === 'dark') {
      setTheme(`${themeSelected} dark`)
      return
    }

    setTheme(themeSelected)
  }

  return (
    <div className="relative">
      <button
        className="
          flex items-center justify-center
          w-8 h-8
          animate-hover
        "
        onClick={() => setIsOpen(!isOpen)}
        aria-label="alterar tema"
      >
        <ThemeSVG theme={currentTheme} />
      </button>
      {isOpen && (
        <ul
          className="
            absolute top-10 left-0
            flex items-center justify-center flex-col gap-3
            w-8
          "
        >
          {THEMES.map(
            (name, index) =>
              name !== currentTheme && (
                <li key={index} onClick={() => handleTheme(name)} className="flex">
                  <button className="animate-hover hover:text-secondary" aria-label={name}>
                    <ThemeSVG theme={name} />
                  </button>
                </li>
              )
          )}
        </ul>
      )}
    </div>
  )
}
