import { useQuery } from 'react-query'

import { QUERY_KEY } from 'enums/QUERY_KEY'
import { LeatherFactoryType } from 'features/leatherFactories/api/types'
import { selectLeatherFactoriesService, useSrmServiceStore } from 'store/crmServises'
import { UseQueryOneHook } from 'types/hooks/useQueryHooks'

export const useGetLeatherFactory: UseQueryOneHook<
  LeatherFactoryType,
  unknown,
  [QUERY_KEY.GET_FACTORY, string]
> = (id, options) => {
  const leatherFactoriesService = useSrmServiceStore(selectLeatherFactoriesService)

  return useQuery({
    queryKey: [QUERY_KEY.GET_FACTORY, id],
    queryFn: () => leatherFactoriesService.getOne(id),
    ...options,
  })
}
