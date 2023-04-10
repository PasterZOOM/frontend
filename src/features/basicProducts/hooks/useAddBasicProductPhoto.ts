import { UseMutateAsyncFunction, useMutation, useQueryClient } from 'react-query'

import { queryKey } from '@/enums/queryKey'
import { BasicProductType } from '@/features/basicProducts/api/types'
import { useSrmServiceStore } from '@/store/crmServises'

export const useAddBasicProductPhoto: UseAddBasicProductPhotoType = _id => {
  const basicProductsService = useSrmServiceStore(state => state.basicProductsService)
  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation(basicProductsService.addPhoto, {
    onSuccess: async data => {
      await queryClient.setQueryData([queryKey.GET_BASIC_PRODUCT, data._id], data)
    },
  })

  return params => mutateAsync({ _id, params })
}

type UseAddBasicProductPhotoType = (
  _id: string
) => UseMutateAsyncFunction<BasicProductType, unknown, { [key: string]: string[] }>
