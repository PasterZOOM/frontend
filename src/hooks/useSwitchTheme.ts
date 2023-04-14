import { useEffect } from 'react'

import { ETheme } from '@/enums/theme'
import { ThemeType } from '@/objects/theme/themes'
import { selectSetTheme, selectTheme, useUserSettings } from '@/store/useUserSettings'

export const useSwitchTheme: UseSwitchThemeType = activeTheme => {
  const theme = useUserSettings(selectTheme)
  const setTheme = useUserSettings(selectSetTheme)

  useEffect(() => {
    setTheme(activeTheme.value)
  }, [activeTheme])

  useEffect(() => {
    if (
      theme === ETheme.DARK ||
      (theme === ETheme.AUTO && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])
}

type UseSwitchThemeType = (activeTheme: ThemeType) => void
