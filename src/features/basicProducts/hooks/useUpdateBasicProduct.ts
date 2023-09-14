import { useMutation, useQueryClient } from 'react-query'

import { BasicProductsAPI } from '@/features/basicProducts/api/basicProductsAPI'
import { BasicProductType, UpdateBasicProductParamsType } from '@/features/basicProducts/api/types'
import { UpdateParamsType } from '@/shared/api/paramsTypes'
import { QUERY_KEY } from '@/shared/enums/QUERY_KEY'
import { useLocale } from '@/shared/lib/hooks/useLocale'
import { UseMutationHook } from '@/shared/types/hooks/useMutationHook'

export const useUpdateBasicProduct: UseMutationHook<
  BasicProductType,
  unknown,
  UpdateParamsType<UpdateBasicProductParamsType>
> = options => {
  const locale = useLocale()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: BasicProductsAPI.update,
    onSuccess: async (data, variables) => {
      queryClient.setQueryData([QUERY_KEY.GET_BASIC_PRODUCT, data._id, locale], data)
      if (variables.data.title) {
        await queryClient.invalidateQueries([QUERY_KEY.GET_ALL_BASIC_PRODUCTS])
      }
    },
    ...options,
  })
}
