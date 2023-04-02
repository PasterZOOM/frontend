import { useQuery } from 'react-query'

import { queryKey } from '@/enums/queryKey'
import { BasicProductType } from '@/features/basicProducts/api/types'
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
