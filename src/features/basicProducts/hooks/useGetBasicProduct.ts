import { useQuery } from 'react-query'

import { QUERY_KEY } from 'enums/QUERY_KEY'
import { BasicProductsAPI } from 'features/basicProducts/api/basicProductsAPI'
import { BasicProductType } from 'features/basicProducts/api/types'
import { UseQueryOneHook } from 'types/hooks/useQueryHooks'

export const useGetBasicProduct: UseQueryOneHook<
  BasicProductType,
  unknown,
  [QUERY_KEY.GET_BASIC_PRODUCT, string]
> = (_id, options) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_BASIC_PRODUCT, _id],
    queryFn: () => BasicProductsAPI.getOne(_id),
    ...options,
  })
}
