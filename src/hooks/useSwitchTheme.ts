import { Dispatch, useEffect, useState } from 'react'

import { SelectItemType } from 'components/common/ui/selects/defaultSelectType'
import { ETheme } from 'enums/theme'
import { themes } from 'objects/theme/themes'
import { selectSetTheme, selectTheme, useUserSettings } from 'store/useUserSettings'

export const useSwitchTheme: UseSwitchThemeType = () => {
  const theme = useUserSettings(selectTheme)
  const setTheme = useUserSettings(selectSetTheme)

  const [activeTheme, setActiveTheme] = useState<SelectItemType>(themes[ETheme.AUTO])

  useEffect(() => {
    setTheme(activeTheme.value as ETheme)
  }, [activeTheme])

  useEffect(() => {
    setActiveTheme(themes[theme])
  }, [])

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
