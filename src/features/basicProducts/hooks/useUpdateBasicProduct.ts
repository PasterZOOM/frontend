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
  const updateBasicProduct: UpdateBasicProductFnType = async params => {
    return mutateAsync({ _id, params })
  }

  const updateBasicProductTitle: UpdateBasicProductTitleFnType = async title => {
    await updateBasicProduct({ title })
  }
  const updateBasicProductDescription: updateBasicProductDescriptionFnType = async description => {
    await updateBasicProduct({ description })
  }
  const updateBasicProductSize: updateBasicProductSizeFnType = async size => {
    await updateBasicProduct({ size })
  }
  const updateBasicProductCost: updateBasicProductCostFnType = async cost => {
    await updateBasicProduct({ cost: +cost })
  }

  return {
    updateBasicProduct,
    updateBasicProductTitle,
    updateBasicProductDescription,
    updateBasicProductSize,
    updateBasicProductCost,
  }
}

type UseUpdateBasicProductType = (_id: string) => {
  updateBasicProduct: UpdateBasicProductFnType
  updateBasicProductTitle: UpdateBasicProductTitleFnType
  updateBasicProductDescription: updateBasicProductDescriptionFnType
  updateBasicProductSize: updateBasicProductSizeFnType
  updateBasicProductCost: updateBasicProductCostFnType
}
type UpdateBasicProductFnType = UseMutateAsyncFunction<
  BasicProductType,
  unknown,
  Partial<UpdateBasicProductParamsType>
>
type UpdateBasicProductTitleFnType = (title: string) => Promise<void>
type updateBasicProductDescriptionFnType = (description: string) => Promise<void>
type updateBasicProductSizeFnType = (size: string) => Promise<void>
type updateBasicProductCostFnType = (cost: string) => Promise<void>
