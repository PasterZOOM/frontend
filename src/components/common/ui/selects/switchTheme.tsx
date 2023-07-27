import { FC } from 'react'

import { useTranslation } from 'next-i18next'

import { SelectItemType } from 'components/common/ui/selects/defaultSelectType'
import { Select } from 'components/common/ui/selects/select'
import { useSwitchTheme } from 'hooks/useSwitchTheme'
import { themesArray } from 'objects/theme/themes'

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
      items={themesArray()}
      setActiveItem={setActiveTheme}
    />
  )
}

export default SwitchTheme
