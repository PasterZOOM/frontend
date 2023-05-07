import { useEffect } from 'react'

import { useLocale } from 'hooks/useLocale'

export const useRefetchAfterChangeLocale = (refetch: () => void): void => {
  const locale = useLocale()

  useEffect(() => {
    ;(async () => refetch())()
  }, [locale])
}
