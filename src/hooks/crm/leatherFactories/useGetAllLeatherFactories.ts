import { useQuery } from 'react-query'

import { LeatherFactoryType } from '@/api/crm/leatherFactoryApi/types'
import { queryKey } from '@/enums/crm/queryKey'
import { useSrmServiceStore } from '@/store/crmServises'

export const useGetAllLeatherFactories = (): Pick<LeatherFactoryType, '_id' | 'name'>[] => {
  const leatherFactoryService = useSrmServiceStore(state => state.leatherFactoryService)

  const { data } = useQuery(queryKey.GET_ALL_FACTORIES, leatherFactoryService.getAll)

  return data || []
}
