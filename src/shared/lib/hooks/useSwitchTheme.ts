import { Dispatch, useEffect, useState } from 'react'

import { themes } from 'objects/theme/themes'
import { ETheme } from 'shared/enums/theme'
import { useLocale } from 'shared/lib/hooks/useLocale'
import { SelectItemType } from 'shared/ui/selects/defaultSelectType'
import { selectSetTheme, selectTheme, useUserSettings } from 'store/useUserSettings'

export const useSwitchTheme: UseSwitchThemeType = () => {
  const locale = useLocale()
  const theme = useUserSettings(selectTheme)
  const setTheme = useUserSettings(selectSetTheme)

  const [activeTheme, setActiveTheme] = useState<SelectItemType>(themes[ETheme.AUTO])

  useEffect(() => {
    setTheme(activeTheme.value as ETheme)
  }, [activeTheme, setTheme])

  useEffect(() => {
    setActiveTheme(themes[theme])
  }, [locale, theme])

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

type UseSwitchThemeType = () => {
  activeTheme: SelectItemType
  setActiveTheme: Dispatch<SelectItemType>
}
