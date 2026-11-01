import React from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'
import useCurrentTheme from '../../hooks/useCurrentTheme'

export default function DarkModeSwitch() {
  const [currentTheme, setTheme] = useCurrentTheme()
  const isDark = currentTheme === 'dark'

  return (
    <button
      type="button"
      aria-label="Cambiar tema de color"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="inline-flex items-center justify-center w-9 h-9 text-sm text-neutral-600 rounded-lg border border-transparent hover:border-neutral-200 hover:bg-neutral-100 focus:outline-none dark:text-neutral-300 dark:hover:border-neutral-800 dark:hover:bg-neutral-800/80 transition-colors"
    >
      {isDark ? <FaSun className="w-4 h-4" /> : <FaMoon className="w-4 h-4" />}
    </button>
  )
}
