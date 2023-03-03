import { FC, useEffect, useState } from 'react'

import { CurrentCurrencySelect } from '@/components/common/ui/selects/currentCurrencySelect'
import SwitchTheme from '@/components/common/ui/selects/switchTheme'

const Header: FC = () => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    let oldScrollTopPosition = 0

    window.onscroll = () => {
      const scrollTopPosition = document.documentElement.scrollTop

      if (oldScrollTopPosition !== 0) {
        if (oldScrollTopPosition < scrollTopPosition) {
          setIsVisible(false)
        } else {
          setIsVisible(true)
        }
      }
      oldScrollTopPosition = scrollTopPosition
    }
  })

  return (
    <div
      className={`${
        isVisible ? '' : '-top-20'
      } sticky top-0 z-30 flex transform items-center justify-around bg-inherit py-5 px-3 shadow-line duration-300 dark:shadow-line-dark`}
    >
      <CurrentCurrencySelect />
      <SwitchTheme />
    </div>
  )
}

export default Header
