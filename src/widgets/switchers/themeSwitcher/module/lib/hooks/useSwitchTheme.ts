import { ChangeEventHandler, useCallback, useEffect, useState } from 'react'

import { ETheme } from '../../enum'

import { useIsFirstRender } from '@/shared/lib/hooks/useFirstRender'
import { selectSetTheme, selectTheme, useUserSettings } from '@/store/useUserSettings'

export const useSwitchTheme: UseSwitchThemeType = () => {
  const isFirst = useIsFirstRender()

  const currentTheme = useUserSettings(selectTheme)
  const setTheme = useUserSettings(selectSetTheme)

  const [isDark, setIsDark] = useState(false)

  const changeIsDark = useCallback((dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add('dark')
      setIsDark(true)
    } else {
      document.documentElement.classList.remove('dark')
      setIsDark(false)
    }
  }, [])

  useEffect(() => {
    if (isFirst) {
      changeIsDark(
        currentTheme === ETheme.DARK ||
          (currentTheme === ETheme.AUTO &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
      )
    }
  }, [changeIsDark, currentTheme, isFirst])

  const changeTheme: ChangeEventHandler<HTMLInputElement> = (e): void => {
    changeIsDark(e.currentTarget.checked)
    setTheme(e.currentTarget.checked ? ETheme.DARK : ETheme.LIGHT)
  }

  return { isDark, changeTheme }
}

type UseSwitchThemeType = () => {
  changeTheme: ChangeEventHandler<HTMLInputElement>
  isDark: boolean
}
