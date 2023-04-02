import { FC, useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { SwitchUserStatus } from '@/components/common/ui/checkbox/switchUserStatus'
import { CurrentCurrencySelect } from '@/components/common/ui/selects/currentCurrencySelect'
import SwitchTheme from '@/components/common/ui/selects/switchTheme'

const Header: FC = () => {
  const router = useRouter()
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
        isVisible ? 'top-0' : '-top-20'
      } sticky z-30 flex transform items-center justify-around bg-white py-5 px-3 shadow-line-bottom duration-300 dark:bg-anthracite-gray dark:shadow-line-bottom-dark`}
    >
      <SwitchUserStatus />
      {router.pathname.includes('catalog') ? (
        <Link href="/crm">CRM</Link>
      ) : (
        <Link href="/catalog">Catalog</Link>
      )}
      <CurrentCurrencySelect />
      <SwitchTheme />
    </div>
  )
}

export default Header
