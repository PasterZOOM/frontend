import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from 'react-query'
import { UseMutationOptions, UseMutationResult } from 'react-query/types/react/types'

import { queryKey } from '@/enums/queryKey'
import { BasicProductType, CreateBasicProductParamsType } from '@/features/basicProducts/api/types'
import { useSrmServiceStore } from '@/store/crmServises'
import { getQueryFilters } from '@/utils/filters/getQueryFilters'

export const useCreateBasicProduct: UseCreateBasicProductType = options => {
  const { query } = useRouter()
  const filters = getQueryFilters(query)

  const basicProductsService = useSrmServiceStore(state => state.basicProductsService)

  const queryClient = useQueryClient()
  const products = queryClient.getQueryData<BasicProductType[]>([
    queryKey.GET_ALL_BASIC_PRODUCTS,
    filters,
  ])

  return useMutation(basicProductsService.create, {
    onSuccess: data => {
      queryClient.setQueryData(
        [queryKey.GET_ALL_BASIC_PRODUCTS, filters],
        [...(products ?? []), data]
      )
    },
    ...options,
  })
}

type UseCreateBasicProductType = (
  options?: Omit<
    UseMutationOptions<BasicProductType, unknown, CreateBasicProductParamsType>,
    'mutationFn'
  >
) => UseMutationResult<BasicProductType, unknown, CreateBasicProductParamsType>
