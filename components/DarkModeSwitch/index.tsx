import React from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'
import useCurrentTheme from '../../hooks/useCurrentTheme'

export default function DarkModeSwitch() {
  const [currentTheme, setTheme] = useCurrentTheme()

  return (
    <button
      type="button"
      className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    >
      {currentTheme === 'dark' ? (
        <FaMoon onClick={() => setTheme('light')} />
      ) : (
        <FaSun onClick={() => setTheme('dark')} />
      )}
    </button>
  )
}
