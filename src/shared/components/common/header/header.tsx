import { FC } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { selectIsVisible, useAppStore } from 'store/useAppStore'
import {
  CurrencySwitcher,
  LanguageSwitcher,
  ThemeSwitcher,
  UserStatusSwitcher,
} from 'widgets/switchers'

const Header: FC = () => {
  const router = useRouter()
  const { t } = useTranslation()

  const isVisible = useAppStore(selectIsVisible)

  return (
    <div //! скрыт на мобилках
      className={`${
        isVisible ? 'top-0' : '-top-20'
      } sticky z-30 hidden items-center justify-around bg-white px-3 py-5 shadow-line-bottom duration-300 dark:bg-anthracite-gray dark:shadow-line-bottom-dark xl:flex`}
    >
      <UserStatusSwitcher />
      {router.pathname.includes('catalog') ? (
        <Link href="/crm">CRM</Link>
      ) : (
        <Link href="/catalog">{t('Каталог')}</Link>
      )}
      <CurrencySwitcher />
      <ThemeSwitcher />
      <LanguageSwitcher />
    </div>
  )
}

export default Header
