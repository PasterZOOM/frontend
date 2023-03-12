import { useQuery } from 'react-query'

import { LeatherFactoryType } from '@/api/crm/leatherFactoryApi/types'
import { queryKey } from '@/enums/crm/queryKey'
import { useSrmServiceStore } from '@/store/crmServises'

export const useGetLeatherFactory = (
  factoryId: string,
  enabled?: boolean
): LeatherFactoryType | undefined => {
  const leatherFactoryService = useSrmServiceStore(state => state.leatherFactoryService)

  const { data } = useQuery(
    [queryKey.GET_FACTORY, factoryId],
    async () => leatherFactoryService.getOne(factoryId),
    { enabled }
  )

  return data
}
