import { Dispatch, useEffect, useState } from 'react'

import { ETheme } from '@/enums/theme'
import { themes, ThemeType } from '@/objects/theme/themes'
import { selectSetTheme, selectTheme, useUserSettings } from '@/store/useUserSettings'

export const useSwitchTheme: UseSwitchThemeType = () => {
  const theme = useUserSettings(selectTheme)
  const setTheme = useUserSettings(selectSetTheme)

  const [activeTheme, setActiveTheme] = useState<ThemeType>(themes[theme])

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

  return { activeTheme, setActiveTheme }
}

type UseSwitchThemeType = () => { activeTheme: ThemeType; setActiveTheme: Dispatch<ThemeType> }
