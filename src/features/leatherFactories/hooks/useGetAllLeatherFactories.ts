import { useQuery } from 'react-query'

import { QUERY_KEY } from 'enums/QUERY_KEY'
import { LeatherFactoryType } from 'features/leatherFactories/api/types'
import { selectLeatherFactoriesService, useSrmServiceStore } from 'store/crmServises'
import { UseQueryAllHook } from 'types/hooks/useQueryHooks'

export const useGetAllLeatherFactories: UseQueryAllHook<
  Pick<LeatherFactoryType, '_id' | 'title'>[],
  unknown,
  [QUERY_KEY.GET_ALL_FACTORIES]
> = options => {
  const leatherFactoriesService = useSrmServiceStore(selectLeatherFactoriesService)

  return useQuery({
    queryKey: [QUERY_KEY.GET_ALL_FACTORIES],
    queryFn: leatherFactoriesService.getAll,
    ...options,
  })
}
