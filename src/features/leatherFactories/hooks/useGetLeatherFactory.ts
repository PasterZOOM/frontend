import { useQuery, UseQueryOptions } from 'react-query'
import { UseQueryResult } from 'react-query/types/react/types'

import { queryKey } from 'enums/queryKey'
import { LeatherFactoryType } from 'features/leatherFactories/api/types'
import { selectLeatherFactoriesService, useSrmServiceStore } from 'store/crmServises'

export const useGetLeatherFactory: UseGetLeatherFactoryType = (factoryId, options) => {
  const leatherFactoriesService = useSrmServiceStore(selectLeatherFactoriesService)

  return useQuery(
    [queryKey.GET_FACTORY, factoryId],
    () => leatherFactoriesService.getOne(factoryId),
    options
  )
}

type UseGetLeatherFactoryType = (
  factoryId: string,
  options?: Omit<UseQueryOptions<LeatherFactoryType>, 'queryKey' | 'queryFn'>
) => UseQueryResult<LeatherFactoryType>
