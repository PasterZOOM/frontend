import { useQuery } from 'react-query'

import { QUERY_KEY } from 'enums/QUERY_KEY'
import { LeatherFactoriesAPI } from 'features/leatherFactories/api/leatherFactoriesAPI'
import { LeatherFactoryType } from 'features/leatherFactories/api/types'
import { useLocale } from 'hooks/useLocale'
import { UseQueryAllHook } from 'types/hooks/useQueryHooks'
import { LOCALES } from 'types/localeType'

export const useGetAllLeatherFactories: UseQueryAllHook<
  LeatherFactoryType[],
  unknown,
  [QUERY_KEY.GET_ALL_FACTORIES, LOCALES]
> = options => {
  const locale = useLocale()

  return useQuery({
    queryKey: [QUERY_KEY.GET_ALL_FACTORIES, locale],
    queryFn: LeatherFactoriesAPI.getAll,
    ...options,
  })
}
