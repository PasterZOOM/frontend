import { FC, useEffect, useState } from 'react'

import { v1 } from 'uuid'

import { Select } from '@/components/common/ui/selects/select'
import { ETheme } from '@/enums/theme'
import { useUserSettings } from '@/store/useUserSettings'

type ThemeType = {
  id: string
  value: ETheme
  title: string
}
const themes: ThemeType[] = [
  {
    id: v1(),
    value: ETheme.AUTO,
    title: 'Цветовая схема системы',
  },
  {
    id: v1(),
    value: ETheme.LIGHT,
    title: 'Светлая',
  },
  {
    id: v1(),
    value: ETheme.DARK,
    title: 'Темная',
  },
]
const ThemeElement: FC<Pick<ThemeType, 'title'>> = ({ title }) => <span>{title}</span>

const SwitchTheme: FC = () => {
  const theme = useUserSettings(state => state.theme)
  const setTheme = useUserSettings(state => state.setTheme)

  const [activeTheme, setActiveTHeme] = useState(themes.find(el => el.value === theme) || themes[0])

  const setActiveItemHandler = (newTheme: ThemeType): void => {
    setTheme(newTheme.value)
    setActiveTHeme(newTheme)
  }

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

  return (
    <Select
      activeItem={activeTheme}
      setActiveItem={setActiveItemHandler}
      items={themes}
      elementToLabel={ThemeElement}
    />
  )
}

export default SwitchTheme
