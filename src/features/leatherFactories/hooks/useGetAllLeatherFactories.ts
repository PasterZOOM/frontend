import { useQuery, UseQueryOptions } from 'react-query'

import { queryKey } from '@/enums/queryKey'
import { LeatherFactoryType } from '@/features/leatherFactories/api/types'
import { useSrmServiceStore } from '@/store/crmServises'

export const useGetAllLeatherFactories: UseGetAllLeatherFactoriesType = options => {
  const leatherFactoriesService = useSrmServiceStore(state => state.leatherFactoriesService)

  const { data } = useQuery(queryKey.GET_ALL_FACTORIES, leatherFactoriesService.getAll, options)

  return data || []
}

type UseGetAllLeatherFactoriesType = (
  options?: Omit<
    UseQueryOptions<Pick<LeatherFactoryType, '_id' | 'title'>[]>,
    'queryKey' | 'queryFn'
  >
) => Pick<LeatherFactoryType, '_id' | 'title'>[]
