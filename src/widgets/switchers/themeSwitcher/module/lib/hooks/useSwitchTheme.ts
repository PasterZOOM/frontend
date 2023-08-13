import { useEffect, useState } from 'react'

import { ETheme } from '../../enum'
import { themes } from '../../themes'
import { changeThemeClass } from '../utils/changeThemeClass'

import { useIsFirstRender } from 'shared/lib/hooks/useFirstRender'
import { SelectItemType } from 'shared/ui/selects/defaultSelectType'
import { selectSetTheme, selectTheme, useUserSettings } from 'store/useUserSettings'

export const useSwitchTheme: UseSwitchThemeType = () => {
  const isFirst = useIsFirstRender()

  const currentTheme = useUserSettings(selectTheme)
  const setTheme = useUserSettings(selectSetTheme)

  const [activeTheme, setActiveTheme] = useState<SelectItemType<ETheme>>(themes[ETheme.AUTO])

  useEffect(() => {
    if (isFirst) {
      changeThemeClass(currentTheme)
      setActiveTheme(themes[currentTheme])
    }
  }, [currentTheme, isFirst])

  const setActiveThemeHandler = (newActiveTheme: SelectItemType<ETheme>): void => {
    changeThemeClass(newActiveTheme.value)
    setActiveTheme(newActiveTheme)
    setTheme(newActiveTheme.value)
  }

  return { activeTheme, setActiveTheme: setActiveThemeHandler }
}

type UseSwitchThemeType = () => {
  activeTheme: SelectItemType<ETheme>
  setActiveTheme: (newActiveTheme: SelectItemType<ETheme>) => void
}
