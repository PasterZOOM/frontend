import { UseMutateAsyncFunction, useMutation, useQueryClient } from 'react-query'

import { queryKey } from '@/enums/queryKey'
import { LeatherColorType, UpdateLeatherColorParamsType } from '@/features/leatherColors/api/types'
import { useSrmServiceStore } from '@/store/crmServises'

export const useUpdateLeatherColor: UseUpdateLeatherColorType = _id => {
  const leatherColorsService = useSrmServiceStore(state => state.leatherColorsService)

  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation(leatherColorsService.update, {
    onSuccess: async data => {
      await queryClient.setQueryData([queryKey.GET_COLOR, data._id], data)
      await queryClient.invalidateQueries([queryKey.GET_ALL_COLORS])
    },
  })

  return params => mutateAsync({ _id, params })
}

type UseUpdateLeatherColorType = (
  _id: string
) => UseMutateAsyncFunction<LeatherColorType, unknown, Partial<UpdateLeatherColorParamsType>>
