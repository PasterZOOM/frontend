import { useQuery } from 'react-query'

import { queryKey } from '@/enums/queryKey'
import { BasicProductType } from '@/features/basicProducts/api/types'
import { useSrmServiceStore } from '@/store/crmServises'
import { useBasicProductsFilterStore } from '@/store/useBasicProductsFilterStore'

export const useGetAllBasicProducts = (enabled = true): BasicProductType[] => {
  const filters = useBasicProductsFilterStore(state => state.filters)

  const basicProductsService = useSrmServiceStore(state => state.basicProductsService)

  const { data } = useQuery(
    filters ? [queryKey.GET_ALL_BASIC_PRODUCTS, filters] : queryKey.GET_ALL_BASIC_PRODUCTS,
    () => basicProductsService.getAll(filters),
    {
      enabled,
    }
  )

  return data || []
}
