import { FC } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { LOCALES } from 'types/localeType'

export const LanguageSwitch: FC = () => {
  const { pathname, query, locale } = useRouter()

  return (
    <div className="flex gap-2">
      <Link
        href={{ pathname, query }}
        locale="ru"
        className={`border px-2 ${
          locale === LOCALES.RU
            ? 'bg-anthracite-gray text-white dark:bg-white dark:text-anthracite-gray'
            : ''
        }`}
      >
        {LOCALES.RU}
      </Link>
      <Link
        href={{ pathname, query }}
        locale="en"
        className={`border px-2 ${
          locale === LOCALES.EN
            ? 'bg-anthracite-gray text-white dark:bg-white dark:text-anthracite-gray'
            : ''
        }`}
      >
        {LOCALES.EN}
      </Link>
    </div>
  )
}
