import { FC } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { SubWrapper } from '@/shared/components/common/containers/subWrapper'
import { useDisclosure } from '@/shared/lib/hooks/useDisclosure'
import { BurgerButton } from '@/shared/ui/buttons/burgerButton'
import { selectIsVisible, useAppStore } from '@/store/useAppStore'
import {
  CurrencySwitcher,
  LanguageSwitcher,
  ThemeSwitcher,
  UserStatusSwitcher,
} from '@/widgets/switchers'

const Header: FC = () => {
  const router = useRouter()
  const { t } = useTranslation()

  const isVisible = useAppStore(selectIsVisible)
  const [isOpenFilters, { open, close }] = useDisclosure(false)

  return (
    <div
      className={`${
        isVisible ? 'top-0' : '-top-20'
      } sticky z-20 flex items-center justify-end bg-white px-3 py-5 shadow-line-bottom duration-300 dark:bg-anthracite-gray dark:shadow-line-bottom-dark xl:p-0`}
    >
      <SubWrapper
        bias={isOpenFilters ? 'top-0' : '-top-56'}
        className="flex w-full  flex-col items-center justify-around gap-2 overflow-visible px-3 py-5 xl:flex-row"
        close={close}
        isOpen={isOpenFilters}
      >
        <UserStatusSwitcher />
        {router.pathname.includes('catalog') ? (
          <Link href="/crm">CRM</Link>
        ) : (
          <Link href="/catalog">{t('Каталог')}</Link>
        )}
        <CurrencySwitcher />
        <ThemeSwitcher className="relative -top-3 max-h-6" />
        <LanguageSwitcher />
        {isOpenFilters && (
          <button className="relative -bottom-4 xl:hidden" type="button" onClick={close}>
            ^
          </button>
        )}
      </SubWrapper>

      <BurgerButton className="xl:hidden" onClick={open} />
    </div>
  )
}

export default Header
