import { useQuery } from 'react-query'

import { queryKey } from 'enums/queryKey'
import { BasicProductType } from 'features/basicProducts/api/types'
import { selectBasicProductsService, useSrmServiceStore } from 'store/crmServises'
import { UseQueryOneHook } from 'types/hooks/useQueryHooks'

export const useGetBasicProduct: UseQueryOneHook<BasicProductType, unknown, string[]> = (
  _id,
  options
) => {
  const basicProductsService = useSrmServiceStore(selectBasicProductsService)

  return useQuery({
    queryKey: [queryKey.GET_BASIC_PRODUCT, _id],
    queryFn: () => basicProductsService.getOne(_id),
    ...options,
  })
}
