import { useMutation, useQueryClient } from 'react-query'

import { QUERY_KEY } from 'enums/QUERY_KEY'
import {
  BasicProductType,
  RemoveBasicProductPhotoParamsType,
} from 'features/basicProducts/api/types'
import { selectBasicProductsService, useSrmServiceStore } from 'store/crmServises'
import { UseMutationHook } from 'types/hooks/useMutationHook'

export const useRemoveBasicProductPhoto: UseMutationHook<
  BasicProductType,
  unknown,
  RemoveBasicProductPhotoParamsType
> = options => {
  const basicProductsService = useSrmServiceStore(selectBasicProductsService)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: basicProductsService.removePhoto,
    onSuccess: async data => {
      await queryClient.setQueryData([QUERY_KEY.GET_BASIC_PRODUCT, data._id], data)
    },
    ...options,
  })
}
