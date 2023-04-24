import { useRouter } from 'next/router'

import { LOCALES } from 'types/localeType'

export const useLocale = (): LOCALES => {
  const { locale } = useRouter()

  return (locale as LOCALES) ?? process.env.NEXT_PUBLIC_DEFAULT_LOCALE
}
