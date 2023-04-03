import { FC, useState } from 'react'

import { Select } from '@/components/common/ui/selects/select'
import { useSwitchTheme } from '@/hooks/useSwitchTheme'
import { themes, ThemeType } from '@/objects/theme/themes'
import { useUserSettings } from '@/store/useUserSettings'

const ThemeElement: FC<Pick<ThemeType, 'title'>> = ({ title }) => <span>{title}</span>

const SwitchTheme: FC = () => {
  const theme = useUserSettings(state => state.theme)

  const [activeTheme, setActiveTheme] = useState<ThemeType>(themes[theme])

  useSwitchTheme(activeTheme)

  return (
    <Select
      activeItem={activeTheme}
      setActiveItem={setActiveTheme}
      items={Object.values(themes)}
      elementToLabel={ThemeElement}
    />
  )
}

export default SwitchTheme
