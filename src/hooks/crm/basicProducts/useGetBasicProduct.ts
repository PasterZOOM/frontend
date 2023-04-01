import { useQuery } from 'react-query'

import { BasicProductType } from '@/api/crm/basicProductsApi/types'
import { queryKey } from '@/enums/crm/queryKey'
import { useSrmServiceStore } from '@/store/crmServises'

export const useGetBasicProduct = (
  _id: string,
  enabled?: boolean
): BasicProductType | undefined => {
  const basicProductsService = useSrmServiceStore(state => state.basicProductsService)

  const { data } = useQuery(
    [queryKey.GET_BASIC_PRODUCT, _id],
    async () => basicProductsService.getOne(_id),
    { enabled }
  )

  return data
}
