import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from 'react-query'

import { QUERY_KEY } from 'enums/QUERY_KEY'
import { BasicProductsAPI } from 'features/basicProducts/api/basicProductsAPI'
import { BasicProductType, CreateBasicProductParamsType } from 'features/basicProducts/api/types'
import { UseMutationHook } from 'types/hooks/useMutationHook'

export const useCreateBasicProduct: UseMutationHook<
  BasicProductType,
  unknown,
  CreateBasicProductParamsType
> = options => {
  const { query } = useRouter()

  const queryClient = useQueryClient()
  const products = queryClient.getQueryData<BasicProductType[]>([
    QUERY_KEY.GET_ALL_BASIC_PRODUCTS,
    query,
  ])

  return useMutation({
    mutationFn: BasicProductsAPI.create,
    onSuccess: data => {
      queryClient.setQueryData(
        [QUERY_KEY.GET_ALL_BASIC_PRODUCTS, query],
        [...(products ?? []), data]
      )
    },
    ...options,
  })
}
