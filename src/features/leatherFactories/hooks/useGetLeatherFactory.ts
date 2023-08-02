import { useQuery } from 'react-query'

import { QUERY_KEY } from 'enums/QUERY_KEY'
import { LeatherFactoriesAPI } from 'features/leatherFactories/api/leatherFactoriesAPI'
import { LeatherFactoryType } from 'features/leatherFactories/api/types'
import { useLocale } from 'hooks/useLocale'
import { UseQueryOneHook } from 'types/hooks/useQueryHooks'
import { LOCALES } from 'types/localeType'

export const useGetLeatherFactory: UseQueryOneHook<
  LeatherFactoryType,
  unknown,
  [QUERY_KEY.GET_FACTORY, string, LOCALES]
> = (id, options) => {
  const locale = useLocale()

  return useQuery({
    queryKey: [QUERY_KEY.GET_FACTORY, id, locale],
    queryFn: () => LeatherFactoriesAPI.getOne(id),
    ...options,
  })
}
