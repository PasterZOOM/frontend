import { useMutation, useQueryClient } from 'react-query'

import { QUERY_KEY } from 'enums/QUERY_KEY'
import { LeatherFactoryType } from 'features/leatherFactories/api/types'
import { selectLeatherFactoriesService, useSrmServiceStore } from 'store/crmServises'
import { UseMutationHook } from 'types/hooks/useMutationHook'

export const useRemoveLeatherFactory: UseMutationHook<
  LeatherFactoryType,
  unknown,
  string
> = option => {
  const leatherFactoriesService = useSrmServiceStore(selectLeatherFactoriesService)

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: leatherFactoriesService.remove,
    onSuccess: async () => {
      await queryClient.invalidateQueries([QUERY_KEY.GET_ALL_FACTORIES])
      await queryClient.invalidateQueries([QUERY_KEY.GET_ALL_ARTICLES])
      await queryClient.invalidateQueries([QUERY_KEY.GET_ALL_COLORS])
    },
    ...option,
  })
}
