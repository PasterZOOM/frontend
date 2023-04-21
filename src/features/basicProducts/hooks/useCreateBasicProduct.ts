import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from 'react-query'

import { QUERY_KEY } from 'enums/QUERY_KEY'
import { BasicProductType, CreateBasicProductParamsType } from 'features/basicProducts/api/types'
import { selectBasicProductsService, useSrmServiceStore } from 'store/crmServises'
import { UseMutationHook } from 'types/hooks/useMutationHook'
import { getQueryFilters } from 'utils/filters/getQueryFilters'

export const useCreateBasicProduct: UseMutationHook<
  BasicProductType,
  unknown,
  CreateBasicProductParamsType
> = options => {
  const { query } = useRouter()
  const filters = getQueryFilters(query)

  const basicProductsService = useSrmServiceStore(selectBasicProductsService)

  const queryClient = useQueryClient()
  const products = queryClient.getQueryData<BasicProductType[]>([
    QUERY_KEY.GET_ALL_BASIC_PRODUCTS,
    filters,
  ])

  return useMutation({
    mutationFn: basicProductsService.create,
    onSuccess: data => {
      queryClient.setQueryData(
        [QUERY_KEY.GET_ALL_BASIC_PRODUCTS, filters],
        [...(products ?? []), data]
      )
    },
    ...options,
  })
}
