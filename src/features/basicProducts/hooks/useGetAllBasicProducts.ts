import { useRouter } from 'next/router'
import { useQuery, UseQueryOptions } from 'react-query'

import { queryKey } from '@/enums/queryKey'
import { BasicProductType } from '@/features/basicProducts/api/types'
import { useSrmServiceStore } from '@/store/crmServises'
import { getQueryFilters } from '@/utils/filters/getQueryFilters'

export const useGetAllBasicProducts: UseGetAllBasicProductsType = options => {
  // const filters = useBasicProductsFilterStore(state => state.filters)
  const { query } = useRouter()

  const filters = getQueryFilters(query)

  const basicProductsService = useSrmServiceStore(state => state.basicProductsService)

  const { data } = useQuery(
    filters ? [queryKey.GET_ALL_BASIC_PRODUCTS, filters] : queryKey.GET_ALL_BASIC_PRODUCTS,
    () => basicProductsService.getAll(filters),
    options
  )

  return data || []
}

type UseGetAllBasicProductsType = (
  options?: Omit<UseQueryOptions<BasicProductType[]>, 'queryKey' | 'queryFn'>
) => BasicProductType[]
