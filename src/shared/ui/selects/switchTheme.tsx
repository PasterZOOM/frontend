import { FC } from 'react'

import { useTranslation } from 'next-i18next'

import { useSwitchTheme } from 'shared/lib/hooks/useSwitchTheme'
import { themesArray } from 'shared/objects/theme/themes'
import { SelectItemType } from 'shared/ui/selects/defaultSelectType'
import { Select } from 'shared/ui/selects/select'

const ThemeElement: FC<Pick<SelectItemType, 'title'>> = ({ title }) => {
  const { t } = useTranslation('common')

  return <span>{t(title)}</span>
}

const SwitchTheme: FC = () => {
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

export default SwitchTheme
