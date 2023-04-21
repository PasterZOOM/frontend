import { useMutation, useQueryClient } from 'react-query'

import { QUERY_KEY } from 'enums/QUERY_KEY'
import { LeatherColorType } from 'features/leatherColors/api/types'
import { selectLeatherColorsService, useSrmServiceStore } from 'store/crmServises'
import { UseMutationHook } from 'types/hooks/useMutationHook'

export const useRemoveLeatherColor: UseMutationHook<
  LeatherColorType,
  unknown,
  string
> = options => {
  const leatherColorsService = useSrmServiceStore(selectLeatherColorsService)

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: leatherColorsService.remove,
    onSuccess: async () => {
      await queryClient.invalidateQueries([QUERY_KEY.GET_ALL_COLORS])
    },
    ...options,
  })
}
