import { FC } from 'react'

import { useTranslation } from 'next-i18next'

import { useSwitchTheme } from '../module/lib/hooks/useSwitchTheme'
import { themesArray } from '../module/themes'

import { SelectItemType } from 'shared/ui/selects/defaultSelectType'
import { Select } from 'shared/ui/selects/select'

const ThemeElement: FC<Pick<SelectItemType, 'title'>> = ({ title }) => {
  const { t } = useTranslation('common')

  return <span>{t(title)}</span>
}

export const ThemeSwitcher: FC = () => {
  const { activeTheme, setActiveTheme } = useSwitchTheme()

  return (
    <Select
      activeItem={activeTheme}
      elementToLabel={ThemeElement}
      items={themesArray}
      setActiveItem={setActiveTheme}
    />
  )
}
