import { useMutation, useQueryClient } from 'react-query'

import { UpdateParamsType } from 'api/paramsTypes'
import { QUERY_KEY } from 'enums/QUERY_KEY'
import { BasicProductsAPI } from 'features/basicProducts/api/basicProductsAPI'
import { BasicProductType, UpdateBasicProductParamsType } from 'features/basicProducts/api/types'
import { UseMutationHook } from 'types/hooks/useMutationHook'

export const useUpdateBasicProduct: UseMutationHook<
  BasicProductType,
  unknown,
  UpdateParamsType<UpdateBasicProductParamsType>
> = options => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: BasicProductsAPI.update,
    onSuccess: async (data, variables) => {
      await queryClient.setQueryData([QUERY_KEY.GET_BASIC_PRODUCT, data._id], data)
      if (variables.params.title) {
        await queryClient.invalidateQueries([QUERY_KEY.GET_ALL_BASIC_PRODUCTS])
      }
    },
    ...options,
  })
}
