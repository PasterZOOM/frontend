import { useQuery } from 'react-query'

import { LeatherFactoryType } from '@/api/crm/leatherFactoriesApi/types'
import { queryKey } from '@/enums/crm/queryKey'
import { useSrmServiceStore } from '@/store/crmServises'

export const useGetLeatherFactory = (
  factoryId: string,
  enabled: boolean = false
): LeatherFactoryType | undefined => {
  const leatherFactoriesService = useSrmServiceStore(state => state.leatherFactoriesService)

  const { data } = useQuery(
    [queryKey.GET_FACTORY, factoryId],
    async () => leatherFactoriesService.getOne(factoryId),
    { enabled }
  )

  return data
}
