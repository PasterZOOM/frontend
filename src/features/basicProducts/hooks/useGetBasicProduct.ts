import { useQuery } from 'react-query'

import { QUERY_KEY } from 'enums/QUERY_KEY'
import { BasicProductType } from 'features/basicProducts/api/types'
import { selectBasicProductsService, useSrmServiceStore } from 'store/crmServises'
import { UseQueryOneHook } from 'types/hooks/useQueryHooks'

export const useGetBasicProduct: UseQueryOneHook<
  BasicProductType,
  unknown,
  [QUERY_KEY.GET_BASIC_PRODUCT, string]
> = (_id, options) => {
  const basicProductsService = useSrmServiceStore(selectBasicProductsService)

  return useQuery({
    queryKey: [QUERY_KEY.GET_BASIC_PRODUCT, _id],
    queryFn: () => basicProductsService.getOne(_id),
    ...options,
  })
}
