import { FC } from 'react'

import { SelectItemType } from 'components/common/ui/selects/defaultSelectType'
import { Select } from 'components/common/ui/selects/select'
import { useLocale } from 'hooks/useLocale'
import { useSwitchTheme } from 'hooks/useSwitchTheme'
import { themesArray } from 'objects/theme/themes'

const ThemeElement: FC<Pick<SelectItemType, 'title'>> = ({ title }) => {
  return <span>{title}</span>
}

const SwitchTheme: FC = () => {
  const locale = useLocale()
  const { activeTheme, setActiveTheme } = useSwitchTheme()

  return (
    <Select
      activeItem={activeTheme}
      setActiveItem={setActiveTheme}
      items={themesArray(locale)}
      elementToLabel={ThemeElement}
    />
  )
}

export default SwitchTheme
