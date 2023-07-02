import { useQuery } from 'react-query'

import { QUERY_KEY } from 'enums/QUERY_KEY'
import { LeatherFactoriesAPI } from 'features/leatherFactories/api/leatherFactoriesAPI'
import { LeatherFactoryType } from 'features/leatherFactories/api/types'
import { UseQueryAllHook } from 'types/hooks/useQueryHooks'

export const useGetAllLeatherFactories: UseQueryAllHook<
  LeatherFactoryType[],
  unknown,
  [QUERY_KEY.GET_ALL_FACTORIES]
> = options => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_ALL_FACTORIES],
    queryFn: LeatherFactoriesAPI.getAll,
    ...options,
  })
}
