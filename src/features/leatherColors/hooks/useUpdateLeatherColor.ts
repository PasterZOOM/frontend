import { useMutation, useQueryClient } from 'react-query'
import { UseMutationOptions, UseMutationResult } from 'react-query/types/react/types'

import { UpdateParamsType } from '@/api/paramsTypes'
import { queryKey } from '@/enums/queryKey'
import { LeatherColorType, UpdateLeatherColorParamsType } from '@/features/leatherColors/api/types'
import { selectLeatherColorsService, useSrmServiceStore } from '@/store/crmServises'

export const useUpdateLeatherColor: UseUpdateLeatherColorType = options => {
  const leatherColorsService = useSrmServiceStore(selectLeatherColorsService)

  const queryClient = useQueryClient()

  return useMutation(leatherColorsService.update, {
    onSuccess: async data => {
      await queryClient.setQueryData([queryKey.GET_COLOR, data._id], data)
      await queryClient.invalidateQueries([queryKey.GET_ALL_COLORS])
    },
    ...options,
  })
}

type UseUpdateLeatherColorType = (
  options?: Omit<
    UseMutationOptions<LeatherColorType, unknown, UpdateParamsType<UpdateLeatherColorParamsType>>,
    'mutationFn'
  >
) => UseMutationResult<LeatherColorType, unknown, UpdateParamsType<UpdateLeatherColorParamsType>>
