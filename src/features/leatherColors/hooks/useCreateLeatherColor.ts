import { useMutation, useQueryClient } from 'react-query'
import { UseMutationOptions, UseMutationResult } from 'react-query/types/react/types'

import { CreateType } from 'api/paramsTypes'
import { queryKey } from 'enums/queryKey'
import { CreateLeatherColorParamsType, LeatherColorType } from 'features/leatherColors/api/types'
import { selectLeatherColorsService, useSrmServiceStore } from 'store/crmServises'

export const useCreateLeatherColor: UseCreateLeatherColorType = options => {
  const leatherColorsService = useSrmServiceStore(selectLeatherColorsService)

  const queryClient = useQueryClient()
  const colors = queryClient.getQueryData<Pick<LeatherColorType, '_id' | 'title' | 'photo'>[]>(
    queryKey.GET_ALL_COLORS
  )

  return useMutation(leatherColorsService.create, {
    onSuccess: ({ _id, title }) => {
      queryClient.setQueryData(queryKey.GET_ALL_COLORS, [...(colors ?? []), { _id, title }])
    },
    ...options,
  })
}

type UseCreateLeatherColorType = (
  options?: Omit<
    UseMutationOptions<LeatherColorType, unknown, CreateType<CreateLeatherColorParamsType>>,
    'mutationFn'
  >
) => UseMutationResult<LeatherColorType, unknown, CreateType<CreateLeatherColorParamsType>>
