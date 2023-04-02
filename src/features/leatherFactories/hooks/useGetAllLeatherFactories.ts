import { useQuery } from 'react-query'

import { queryKey } from '@/enums/queryKey'
import { LeatherFactoryType } from '@/features/leatherFactories/api/types'
import { useSrmServiceStore } from '@/store/crmServises'

export const useGetAllLeatherFactories = (
  enabled = true
): Pick<LeatherFactoryType, '_id' | 'name'>[] => {
  const leatherFactoriesService = useSrmServiceStore(state => state.leatherFactoriesService)

  const { data } = useQuery(queryKey.GET_ALL_FACTORIES, leatherFactoriesService.getAll, { enabled })

  return data || []
}
