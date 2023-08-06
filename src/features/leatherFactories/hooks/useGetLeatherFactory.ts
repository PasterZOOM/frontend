import { useQuery } from 'react-query'

import { LeatherFactoriesAPI } from 'features/leatherFactories/api/leatherFactoriesAPI'
import { LeatherFactoryType } from 'features/leatherFactories/api/types'
import { QUERY_KEY } from 'shared/enums/QUERY_KEY'
import { useLocale } from 'shared/lib/hooks/useLocale'
import { UseQueryOneHook } from 'shared/types/hooks/useQueryHooks'
import { LOCALES } from 'shared/types/localeType'

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
