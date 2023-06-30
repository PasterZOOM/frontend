import { useEffect } from 'react'

import { useLocale } from 'hooks/useLocale'

/**
 * Хук для под грузки переводов при изменении локали
 * @param refetch {function} функция пере запроса данных
 */
export const useRefetchAfterChangeLocale = (refetch: () => void): void => {
  const locale = useLocale()

  useEffect(() => {
    ;(async () => refetch())()
  }, [locale])
}
