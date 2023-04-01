import { useMutation, useQueryClient } from 'react-query'

import { BasicProductType, UpdateBasicProductParamsType } from '@/api/crm/basicProductsApi/types'
import { queryKey } from '@/enums/crm/queryKey'
import { useSrmServiceStore } from '@/store/crmServises'

export const useUpdateBasicProduct = (
  _id: string
): {
  updateBasicProduct: (params: Partial<UpdateBasicProductParamsType>) => Promise<BasicProductType>
  updateBasicProductName: (title: string) => Promise<void>
  updateBasicProductDescription: (description: string) => Promise<void>
  updateBasicProductSize: (size: string) => Promise<void>
  updateBasicProductCost: (cost: string) => Promise<void>
} => {
  const basicProductsService = useSrmServiceStore(state => state.basicProductsService)

  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation(basicProductsService.update, {
    onSuccess: async data => {
      await queryClient.setQueryData([queryKey.GET_BASIC_PRODUCT, data._id], data)
      await queryClient.invalidateQueries([queryKey.GET_ALL_BASIC_PRODUCTS])
    },
  })
  const updateBasicProduct = async (
    params: Partial<UpdateBasicProductParamsType>
  ): Promise<BasicProductType> => {
    return mutateAsync({ _id, params })
  }

  const updateBasicProductName = async (title: string): Promise<void> => {
    await updateBasicProduct({ title })
  }
  const updateBasicProductDescription = async (description: string): Promise<void> => {
    await updateBasicProduct({ description })
  }
  const updateBasicProductSize = async (size: string): Promise<void> => {
    await updateBasicProduct({ size })
  }
  const updateBasicProductCost = async (cost: string): Promise<void> => {
    await updateBasicProduct({ cost: +cost })
  }

  return {
    updateBasicProduct,
    updateBasicProductName,
    updateBasicProductDescription,
    updateBasicProductSize,
    updateBasicProductCost,
  }
}
