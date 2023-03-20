import { UseMutateAsyncFunction, useMutation, useQueryClient } from 'react-query'

import { LeatherColorType, UpdateLeatherColorParamsType } from '@/api/crm/leatherColorsApi/types'
import { queryKey } from '@/enums/crm/queryKey'
import { useSrmServiceStore } from '@/store/crmServises'

export const useUpdateLeatherColor = (): UseMutateAsyncFunction<
  LeatherColorType,
  unknown,
  Partial<UpdateLeatherColorParamsType>,
  unknown
> => {
  const leatherColorsService = useSrmServiceStore(state => state.leatherColorsService)

  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation(leatherColorsService.update, {
    onSuccess: async data => {
      await queryClient.setQueryData([queryKey.GET_COLOR, data._id], data)
      await queryClient.invalidateQueries([queryKey.GET_ALL_COLORS])
    },
  })

  return mutateAsync
}
