import { useMutation, useQueryClient } from 'react-query'

import { QUERY_KEY } from 'enums/QUERY_KEY'
import { LeatherColorsAPI } from 'features/leatherColors/api/leatherColorsAPI'
import { LeatherColorType } from 'features/leatherColors/api/types'
import { UseMutationHook } from 'types/hooks/useMutationHook'

export const useRemoveLeatherColor: UseMutationHook<
  LeatherColorType,
  unknown,
  string
> = options => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: LeatherColorsAPI.remove,
    onSuccess: async () => {
      await queryClient.invalidateQueries([QUERY_KEY.GET_ALL_COLORS])
    },
    ...options,
  })
}
