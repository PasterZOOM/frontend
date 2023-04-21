import { useMutation, useQueryClient } from 'react-query'

import { UpdateParamsType } from 'api/paramsTypes'
import { QUERY_KEY } from 'enums/QUERY_KEY'
import { LeatherColorType, UpdateLeatherColorParamsType } from 'features/leatherColors/api/types'
import { selectLeatherColorsService, useSrmServiceStore } from 'store/crmServises'
import { UseMutationHook } from 'types/hooks/useMutationHook'

export const useUpdateLeatherColor: UseMutationHook<
  LeatherColorType,
  unknown,
  UpdateParamsType<UpdateLeatherColorParamsType>
> = options => {
  const leatherColorsService = useSrmServiceStore(selectLeatherColorsService)

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: leatherColorsService.update,
    onSuccess: async (data, variables) => {
      await queryClient.setQueryData([QUERY_KEY.GET_COLOR, data._id], data)
      if (variables.params.title) {
        await queryClient.invalidateQueries([QUERY_KEY.GET_ALL_COLORS])
      }
    },
    ...options,
  })
}
