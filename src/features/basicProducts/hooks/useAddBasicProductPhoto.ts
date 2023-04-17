import { useMutation, useQueryClient } from 'react-query'
import { UseMutationOptions, UseMutationResult } from 'react-query/types/react/types'

import { UpdateParamsType } from '@/api/paramsTypes'
import { queryKey } from '@/enums/queryKey'
import { BasicProductType } from '@/features/basicProducts/api/types'
import { selectBasicProductsService, useSrmServiceStore } from '@/store/crmServises'

export const useAddBasicProductPhoto: UseAddBasicProductPhotoType = options => {
  const basicProductsService = useSrmServiceStore(selectBasicProductsService)
  const queryClient = useQueryClient()

  return useMutation(basicProductsService.addPhoto, {
    onSuccess: async data => {
      await queryClient.setQueryData([queryKey.GET_BASIC_PRODUCT, data._id], data)
    },
    ...options,
  })
}

type UseAddBasicProductPhotoType = (
  options?: Omit<
    UseMutationOptions<BasicProductType, unknown, UpdateParamsType<{ [key: string]: string[] }>>,
    'mutationFn'
  >
) => UseMutationResult<BasicProductType, unknown, UpdateParamsType<{ [key: string]: string[] }>>
