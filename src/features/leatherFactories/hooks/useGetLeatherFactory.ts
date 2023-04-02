import { useQuery } from 'react-query'

import { queryKey } from '@/enums/queryKey'
import { LeatherFactoryType } from '@/features/leatherFactories/api/types'
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
