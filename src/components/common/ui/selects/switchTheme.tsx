import { FC } from 'react'

import { SelectItemType } from 'components/common/ui/selects/defaultSelectType'
import { Select } from 'components/common/ui/selects/select'
import { useSwitchTheme } from 'hooks/useSwitchTheme'
import { themes } from 'objects/theme/themes'

const ThemeElement: FC<Pick<SelectItemType, 'title'>> = ({ title }) => <span>{title}</span>

const SwitchTheme: FC = () => {
  const { activeTheme, setActiveTheme } = useSwitchTheme()

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
