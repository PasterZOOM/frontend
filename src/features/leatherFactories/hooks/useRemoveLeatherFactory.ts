import { useMutation, useQueryClient } from 'react-query'
import { UseMutationOptions, UseMutationResult } from 'react-query/types/react/types'

import { queryKey } from '@/enums/queryKey'
import { LeatherFactoryType } from '@/features/leatherFactories/api/types'
import { selectLeatherFactoriesService, useSrmServiceStore } from '@/store/crmServises'

export const useRemoveLeatherFactory: UseRemoveLeatherFactoryType = option => {
  const leatherFactoriesService = useSrmServiceStore(selectLeatherFactoriesService)

  const queryClient = useQueryClient()

  return useMutation(leatherFactoriesService.remove, {
    onSuccess: async () => {
      await queryClient.invalidateQueries([queryKey.GET_ALL_FACTORIES])
      await queryClient.invalidateQueries([queryKey.GET_ALL_ARTICLES])
      await queryClient.invalidateQueries([queryKey.GET_ALL_COLORS])
    },
    ...option,
  })
}

type UseRemoveLeatherFactoryType = (
  options?: Omit<UseMutationOptions<LeatherFactoryType, unknown, string>, 'mutationFn'>
) => UseMutationResult<LeatherFactoryType, unknown, string>
