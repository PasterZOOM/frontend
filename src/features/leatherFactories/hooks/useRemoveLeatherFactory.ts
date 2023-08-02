import { useMutation, useQueryClient } from 'react-query'

import { LeatherFactoriesAPI } from 'features/leatherFactories/api/leatherFactoriesAPI'
import { LeatherFactoryType } from 'features/leatherFactories/api/types'
import { QUERY_KEY } from 'shared/enums/QUERY_KEY'
import { UseMutationHook } from 'types/hooks/useMutationHook'

export const useRemoveLeatherFactory: UseMutationHook<
  LeatherFactoryType,
  unknown,
  string
> = option => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: LeatherFactoriesAPI.remove,
    onSuccess: async () => {
      await queryClient.invalidateQueries([QUERY_KEY.GET_ALL_FACTORIES])
      await queryClient.invalidateQueries([QUERY_KEY.GET_ALL_ARTICLES])
      await queryClient.invalidateQueries([QUERY_KEY.GET_ALL_COLORS])
    },
    ...option,
  })
}
