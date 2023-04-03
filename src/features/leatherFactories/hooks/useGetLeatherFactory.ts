import { useQuery, UseQueryOptions } from 'react-query'

import { queryKey } from '@/enums/queryKey'
import { LeatherFactoryType } from '@/features/leatherFactories/api/types'
import { useSrmServiceStore } from '@/store/crmServises'

export const useGetLeatherFactory: UseGetLeatherFactoryType = (factoryId, options) => {
  const leatherFactoriesService = useSrmServiceStore(state => state.leatherFactoriesService)

  const { data } = useQuery(
    [queryKey.GET_FACTORY, factoryId],
    () => leatherFactoriesService.getOne(factoryId),
    options
  )

  return data
}

type UseGetLeatherFactoryType = (
  factoryId: string,
  options?: Omit<UseQueryOptions<LeatherFactoryType>, 'queryKey' | 'queryFn'>
) => LeatherFactoryType | undefined
