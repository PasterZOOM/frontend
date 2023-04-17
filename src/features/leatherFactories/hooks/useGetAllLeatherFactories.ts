import { useQuery, UseQueryOptions } from 'react-query'
import { UseQueryResult } from 'react-query/types/react/types'

import { queryKey } from '@/enums/queryKey'
import { LeatherFactoryType } from '@/features/leatherFactories/api/types'
import { selectLeatherFactoriesService, useSrmServiceStore } from '@/store/crmServises'

export const useGetAllLeatherFactories: UseGetAllLeatherFactoriesType = options => {
  const leatherFactoriesService = useSrmServiceStore(selectLeatherFactoriesService)

  return useQuery(queryKey.GET_ALL_FACTORIES, leatherFactoriesService.getAll, options)
}

type UseGetAllLeatherFactoriesType = (
  options?: Omit<
    UseQueryOptions<Pick<LeatherFactoryType, '_id' | 'title'>[]>,
    'queryKey' | 'queryFn'
  >
) => UseQueryResult<Pick<LeatherFactoryType, '_id' | 'title'>[]>
