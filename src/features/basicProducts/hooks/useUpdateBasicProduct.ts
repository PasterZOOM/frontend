import { UseMutateAsyncFunction, useMutation, useQueryClient } from 'react-query'

import { queryKey } from '@/enums/queryKey'
import { BasicProductType, UpdateBasicProductParamsType } from '@/features/basicProducts/api/types'
import { useSrmServiceStore } from '@/store/crmServises'

export const useUpdateBasicProduct: UseUpdateBasicProductType = _id => {
  const basicProductsService = useSrmServiceStore(state => state.basicProductsService)

  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation(basicProductsService.update, {
    onSuccess: async data => {
      await queryClient.setQueryData([queryKey.GET_BASIC_PRODUCT, data._id], data)
      await queryClient.invalidateQueries([queryKey.GET_ALL_BASIC_PRODUCTS])
    },
  })

  return params => mutateAsync({ _id, params })
}

type UseUpdateBasicProductType = (
  _id: string
) => UseMutateAsyncFunction<BasicProductType, unknown, Partial<UpdateBasicProductParamsType>>
