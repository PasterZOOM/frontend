import { FC } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

export const LanguageSwitch: FC = () => {
  const router = useRouter()

  return (
    <div className="flex gap-2">
      <Link
        href={router}
        locale="ru"
        className={`border px-2 ${
          router.locale === 'ru'
            ? 'bg-anthracite-gray text-white dark:bg-white dark:text-anthracite-gray'
            : ''
        }`}
      >
        RU
      </Link>
      <Link
        href={router}
        locale="en"
        className={`border px-2 ${
          router.locale === 'en'
            ? 'bg-anthracite-gray text-white dark:bg-white dark:text-anthracite-gray'
            : ''
        }`}
      >
        EN
      </Link>
    </div>
  )
}
