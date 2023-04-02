import { UseMutateAsyncFunction, useMutation, useQueryClient } from 'react-query'

import { queryKey } from '@/enums/queryKey'
import { LeatherFactoryType } from '@/features/leatherFactories/api/types'
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
