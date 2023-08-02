import { useMutation, useQueryClient } from 'react-query'

import { LeatherColorsAPI } from 'features/leatherColors/api/leatherColorsAPI'
import { LeatherColorType } from 'features/leatherColors/api/types'
import { QUERY_KEY } from 'shared/enums/QUERY_KEY'
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
