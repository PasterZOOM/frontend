import { useMutation, useQueryClient } from 'react-query'

import { LeatherColorsAPI } from '@/features/leatherColors/api/leatherColorsAPI'
import { CreateLeatherColorParamsType, LeatherColorType } from '@/features/leatherColors/api/types'
import { CreateType } from '@/shared/api/paramsTypes'
import { QUERY_KEY } from '@/shared/enums/QUERY_KEY'
import { useLocale } from '@/shared/lib/hooks/useLocale'
import { UseMutationHook } from '@/shared/types/hooks/useMutationHook'

export const useCreateLeatherColor: UseMutationHook<
  LeatherColorType,
  unknown,
  CreateType<CreateLeatherColorParamsType>
> = options => {
  const locale = useLocale()
  const queryClient = useQueryClient()
  const colors = queryClient.getQueryData<LeatherColorType[]>([QUERY_KEY.GET_ALL_COLORS, locale])

  return useMutation({
    mutationFn: LeatherColorsAPI.create,
    onSuccess: ({ _id, title }) => {
      queryClient.setQueryData(
        [QUERY_KEY.GET_ALL_COLORS, locale],
        [...(colors ?? []), { _id, title }]
      )
    },
    ...options,
  })
}
