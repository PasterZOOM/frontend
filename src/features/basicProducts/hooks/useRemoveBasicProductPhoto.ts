import { useMutation, useQueryClient } from 'react-query'
import { UseMutationOptions, UseMutationResult } from 'react-query/types/react/types'

import { queryKey } from '@/enums/queryKey'
import { BasicProductType } from '@/features/basicProducts/api/types'
import { useSrmServiceStore } from '@/store/crmServises'

export const useRemoveBasicProductPhoto: UseRemoveBasicProductPhotoType = options => {
  const basicProductsService = useSrmServiceStore(state => state.basicProductsService)
  const queryClient = useQueryClient()

  return useMutation(basicProductsService.removePhoto, {
    onSuccess: async data => {
      await queryClient.setQueryData([queryKey.GET_BASIC_PRODUCT, data._id], data)
    },
    ...options,
  })
}

type UseRemoveBasicProductPhotoType = (
  options?: Omit<
    UseMutationOptions<BasicProductType, unknown, { productId: string; photoId: string }>,
    'mutationFn'
  >
) => UseMutationResult<BasicProductType, unknown, { productId: string; photoId: string }>
