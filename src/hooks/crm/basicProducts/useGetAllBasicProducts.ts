import { useQuery } from 'react-query'

import { BasicProductType } from '@/api/crm/basicProductsApi/types'
import { queryKey } from '@/enums/crm/queryKey'
import { useSrmServiceStore } from '@/store/crmServises'

export const useGetAllBasicProducts = (enabled = true): BasicProductType[] => {
  const basicProductsService = useSrmServiceStore(state => state.basicProductsService)

  const { data } = useQuery(queryKey.GET_ALL_BASIC_PRODUCTS, basicProductsService.getAll, {
    enabled,
  })

  return data || []
}
