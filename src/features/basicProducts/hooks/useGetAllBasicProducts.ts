import { useQuery } from 'react-query'

import { queryKey } from '@/enums/queryKey'
import { BasicProductType } from '@/features/basicProducts/api/types'
import { useSrmServiceStore } from '@/store/crmServises'

export const useGetAllBasicProducts = (enabled = true): BasicProductType[] => {
  const basicProductsService = useSrmServiceStore(state => state.basicProductsService)

  const { data } = useQuery(queryKey.GET_ALL_BASIC_PRODUCTS, basicProductsService.getAll, {
    enabled,
  })

  return data || []
}
