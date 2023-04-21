import { useMutation, useQueryClient } from 'react-query'

import { CreateType } from 'api/paramsTypes'
import { QUERY_KEY } from 'enums/QUERY_KEY'
import { CreateLeatherColorParamsType, LeatherColorType } from 'features/leatherColors/api/types'
import { selectLeatherColorsService, useSrmServiceStore } from 'store/crmServises'
import { UseMutationHook } from 'types/hooks/useMutationHook'

export const useCreateLeatherColor: UseMutationHook<
  LeatherColorType,
  unknown,
  CreateType<CreateLeatherColorParamsType>
> = options => {
  const leatherColorsService = useSrmServiceStore(selectLeatherColorsService)

  const queryClient = useQueryClient()
  const colors = queryClient.getQueryData<Pick<LeatherColorType, '_id' | 'title' | 'photo'>[]>(
    QUERY_KEY.GET_ALL_COLORS
  )

  return useMutation({
    mutationFn: leatherColorsService.create,
    onSuccess: ({ _id, title }) => {
      queryClient.setQueryData(QUERY_KEY.GET_ALL_COLORS, [...(colors ?? []), { _id, title }])
    },
    ...options,
  })
}
