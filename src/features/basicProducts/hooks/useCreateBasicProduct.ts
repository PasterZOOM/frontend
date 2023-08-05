import { useMutation, useQueryClient } from 'react-query'

import { BasicProductsAPI } from 'features/basicProducts/api/basicProductsAPI'
import { BasicProductType, CreateBasicProductParamsType } from 'features/basicProducts/api/types'
import { QUERY_KEY } from 'shared/enums/QUERY_KEY'
import { useLocale } from 'shared/lib/hooks/useLocale'
import { selectFilters, useBasicProductsFilterStore } from 'store/useBasicProductsFilterStore'
import { UseMutationHook } from 'types/hooks/useMutationHook'

export const useCreateBasicProduct: UseMutationHook<
  BasicProductType,
  unknown,
  CreateBasicProductParamsType
> = options => {
  const locale = useLocale()
  const filters = useBasicProductsFilterStore(selectFilters)
  const queryClient = useQueryClient()

  const products = queryClient.getQueryData<BasicProductType[]>([
    QUERY_KEY.GET_ALL_BASIC_PRODUCTS,
    filters,
    locale,
  ])

  return useMutation({
    mutationFn: BasicProductsAPI.create,
    onSuccess: data => {
      queryClient.setQueryData(
        [QUERY_KEY.GET_ALL_BASIC_PRODUCTS, filters, locale],
        [...(products ?? []), data]
      )
    },
    ...options,
  })
}
