import { UseMutateAsyncFunction, useMutation, useQueryClient } from 'react-query'

import { LeatherFactoryType } from '@/api/crm/leatherFactoriesApi/types'
import { queryKey } from '@/enums/crm/queryKey'
import { useSrmServiceStore } from '@/store/crmServises'

export const useRemoveLeatherFactory = (): UseMutateAsyncFunction<
  LeatherFactoryType,
  unknown,
  string,
  unknown
> => {
  const leatherFactoriesService = useSrmServiceStore(state => state.leatherFactoriesService)

  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation(leatherFactoriesService.remove, {
    onSuccess: async () => {
      await queryClient.invalidateQueries([queryKey.GET_ALL_FACTORIES])
      await queryClient.invalidateQueries([queryKey.GET_ALL_ARTICLES])
      await queryClient.invalidateQueries([queryKey.GET_ALL_COLORS])
    },
  })

  return mutateAsync
}
