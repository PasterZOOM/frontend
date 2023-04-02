import { UseMutateAsyncFunction, useMutation, useQueryClient } from 'react-query'

import { queryKey } from '@/enums/queryKey'
import { BasicProductType, CreateBasicProductParamsType } from '@/features/basicProducts/api/types'
import { useGetAllBasicProducts } from '@/features/basicProducts/hooks/useGetAllBasicProducts'
import { useSrmServiceStore } from '@/store/crmServises'

export const useCreateBasicProduct = (): UseMutateAsyncFunction<
  BasicProductType,
  unknown,
  CreateBasicProductParamsType,
  unknown
> => {
  const basicProductsService = useSrmServiceStore(state => state.basicProductsService)

  const queryClient = useQueryClient()
  const basicProducts = useGetAllBasicProducts()

  const { mutateAsync } = useMutation(basicProductsService.create, {
    onSuccess: data => {
      queryClient.setQueryData(queryKey.GET_ALL_BASIC_PRODUCTS, [...basicProducts, data])
    },
  })

  return mutateAsync
}
