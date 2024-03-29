import { useMutation, useQueryClient } from 'react-query'

import { LeatherColorsAPI } from '@/features/leatherColors/api/leatherColorsAPI'
import { LeatherColorType, UpdateLeatherColorParamsType } from '@/features/leatherColors/api/types'
import { UpdateParamsType } from '@/shared/api/paramsTypes'
import { QUERY_KEY } from '@/shared/enums/QUERY_KEY'
import { useLocale } from '@/shared/lib/hooks/useLocale'
import { UseMutationHook } from '@/shared/types/hooks/useMutationHook'

export const useUpdateLeatherColor: UseMutationHook<
  LeatherColorType,
  unknown,
  UpdateParamsType<UpdateLeatherColorParamsType>
> = options => {
  const locale = useLocale()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: LeatherColorsAPI.update,
    onSuccess: async (data, variables) => {
      queryClient.setQueryData([QUERY_KEY.GET_COLOR, data._id, locale], data)
      if (variables.data.title) {
        await queryClient.invalidateQueries([QUERY_KEY.GET_ALL_COLORS, locale])
      }
    },
    ...options,
  })
}
