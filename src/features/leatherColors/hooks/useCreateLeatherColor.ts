import { useMutation, useQueryClient } from 'react-query'

import { CreateType } from 'api/paramsTypes'
import { QUERY_KEY } from 'enums/QUERY_KEY'
import { LeatherColorsAPI } from 'features/leatherColors/api/leatherColorsAPI'
import { CreateLeatherColorParamsType, LeatherColorType } from 'features/leatherColors/api/types'
import { UseMutationHook } from 'types/hooks/useMutationHook'

export const useCreateLeatherColor: UseMutationHook<
  LeatherColorType,
  unknown,
  CreateType<CreateLeatherColorParamsType>
> = options => {
  const queryClient = useQueryClient()
  const colors = queryClient.getQueryData<LeatherColorType[]>(QUERY_KEY.GET_ALL_COLORS)

  return useMutation({
    mutationFn: LeatherColorsAPI.create,
    onSuccess: ({ _id, title }) => {
      queryClient.setQueryData(QUERY_KEY.GET_ALL_COLORS, [...(colors ?? []), { _id, title }])
    },
    ...options,
  })
}
