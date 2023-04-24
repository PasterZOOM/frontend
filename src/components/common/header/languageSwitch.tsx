import { FC } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { LOCALES } from 'types/localeType'

export const LanguageSwitch: FC = () => {
  const router = useRouter()

  return (
    <div className="flex gap-2">
      <Link
        href={router}
        locale="ru"
        className={`border px-2 ${
          router.locale === LOCALES.RU
            ? 'bg-anthracite-gray text-white dark:bg-white dark:text-anthracite-gray'
            : ''
        }`}
      >
        {LOCALES.RU}
      </Link>
      <Link
        href={router}
        locale="en"
        className={`border px-2 ${
          router.locale === LOCALES.EN
            ? 'bg-anthracite-gray text-white dark:bg-white dark:text-anthracite-gray'
            : ''
        }`}
      >
        {LOCALES.EN}
      </Link>
    </div>
  )
}
