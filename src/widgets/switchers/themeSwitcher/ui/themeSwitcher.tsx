import { FC, memo } from 'react'

import classnames from 'classnames'

import { useSwitchTheme } from '../module/lib/hooks/useSwitchTheme'

import cls from './themeSwitcher.module.scss'

type PropsType = {
  className?: string
}
const ThemeSwitcher: FC<PropsType> = ({ className }) => {
  const { isDark, changeTheme } = useSwitchTheme()

  return (
    <div className={classnames(cls.themeSwitcher, className)}>
      <input checked={isDark} className={cls.switch} type="checkbox" onChange={changeTheme} />
    </div>
  )
}

const Memo = memo(ThemeSwitcher)

export { Memo as ThemeSwitcher }
