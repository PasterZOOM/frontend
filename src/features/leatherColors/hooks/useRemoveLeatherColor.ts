import { useMutation, useQueryClient } from 'react-query'
import { UseMutationOptions, UseMutationResult } from 'react-query/types/react/types'

import { queryKey } from '@/enums/queryKey'
import { LeatherColorType } from '@/features/leatherColors/api/types'
import { selectLeatherColorsService, useSrmServiceStore } from '@/store/crmServises'

export const useRemoveLeatherColor: UseRemoveLeatherColorType = options => {
  const leatherColorsService = useSrmServiceStore(selectLeatherColorsService)

  const queryClient = useQueryClient()

  return useMutation(leatherColorsService.remove, {
    onSuccess: async () => {
      await queryClient.invalidateQueries([queryKey.GET_ALL_COLORS])
    },
    ...options,
  })
}

type UseRemoveLeatherColorType = (
  options?: Omit<UseMutationOptions<LeatherColorType, unknown, string>, 'mutationFn'>
) => UseMutationResult<LeatherColorType, unknown, string>
