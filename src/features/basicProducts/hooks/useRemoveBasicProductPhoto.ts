import { UseMutateAsyncFunction, useMutation, useQueryClient } from 'react-query'

import { queryKey } from '@/enums/queryKey'
import { BasicProductType } from '@/features/basicProducts/api/types'
import { useSrmServiceStore } from '@/store/crmServises'

export const useRemoveBasicProductPhoto: UseRemoveBasicProductPhotoType = productId => {
  const basicProductsService = useSrmServiceStore(state => state.basicProductsService)
  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation(basicProductsService.removePhoto, {
    onSuccess: async data => {
      await queryClient.setQueryData([queryKey.GET_BASIC_PRODUCT, data._id], data)
    },
  })

  return photoId => mutateAsync({ params: { photoId, productId } })
}

type UseRemoveBasicProductPhotoType = (
  productId: string
) => UseMutateAsyncFunction<BasicProductType, unknown, string>
