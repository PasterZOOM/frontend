import { UseMutateAsyncFunction, useMutation, useQueryClient } from 'react-query'

import { LeatherFactoryType } from '@/api/crm/leatherFactoryApi/types'
import { queryKey } from '@/enums/crm/queryKey'
import { useSrmServiceStore } from '@/store/crmServises'

export const useRemoveLeatherFactory = (): UseMutateAsyncFunction<
  LeatherFactoryType,
  unknown,
  string,
  unknown
> => {
  const leatherFactoryService = useSrmServiceStore(state => state.leatherFactoryService)

  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation(leatherFactoryService.remove, {
    onSuccess: async () => {
      await queryClient.invalidateQueries([queryKey.GET_ALL_FACTORIES])
      await queryClient.invalidateQueries([queryKey.GET_ALL_ARTICLES])
    },
  })

  return mutateAsync
}
