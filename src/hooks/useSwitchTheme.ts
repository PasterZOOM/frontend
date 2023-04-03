import { useEffect } from 'react'

import { ETheme } from '@/enums/theme'
import { ThemeType } from '@/objects/theme/themes'
import { useUserSettings } from '@/store/useUserSettings'

export const useSwitchTheme = (activeTheme: ThemeType): void => {
  const theme = useUserSettings(state => state.theme)
  const setTheme = useUserSettings(state => state.setTheme)

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
