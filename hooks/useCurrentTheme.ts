import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export default function useCurrentTheme() {
  const { systemTheme, theme, setTheme } = useTheme()
  const [currentTheme, setCurrentTheme] = useState('light')

  useEffect(() => {
    const currentTheme = theme === 'system' ? systemTheme : theme
    setCurrentTheme(currentTheme)
  }, [theme, systemTheme])

  return [currentTheme, setTheme]
}
