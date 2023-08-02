import { useMutation, useQueryClient } from 'react-query'

import { BasicProductsAPI } from 'features/basicProducts/api/basicProductsAPI'
import {
  BasicProductType,
  RemoveBasicProductPhotoParamsType,
} from 'features/basicProducts/api/types'
import { QUERY_KEY } from 'shared/enums/QUERY_KEY'
import { UseMutationHook } from 'types/hooks/useMutationHook'

export const useRemoveBasicProductPhoto: UseMutationHook<
  BasicProductType,
  unknown,
  RemoveBasicProductPhotoParamsType
> = options => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: BasicProductsAPI.removePhoto,
    onSuccess: async data => {
      queryClient.setQueryData([QUERY_KEY.GET_BASIC_PRODUCT, data._id], data)
    },
    ...options,
  })
}
