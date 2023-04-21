import { useMutation, useQueryClient } from 'react-query'
import { UseMutationOptions, UseMutationResult } from 'react-query/types/react/types'

import { queryKey } from 'enums/queryKey'
import { BasicProductType } from 'features/basicProducts/api/types'
import { selectBasicProductsService, useSrmServiceStore } from 'store/crmServises'

export const useRemoveBasicProductPhoto: UseRemoveBasicProductPhotoType = options => {
  const basicProductsService = useSrmServiceStore(selectBasicProductsService)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: basicProductsService.removePhoto,
    onSuccess: async data => {
      await queryClient.setQueryData([queryKey.GET_BASIC_PRODUCT, data._id], data)
    },
    ...options,
  })
}

type UseRemoveBasicProductPhotoType<
  TData = BasicProductType,
  TError = unknown,
  TVariables = { productId: string; photoId: string }
> = (
  options?: Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'>
) => UseMutationResult<TData, TError, TVariables>
