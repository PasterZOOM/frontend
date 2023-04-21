import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import { EFilterKeys } from 'components/pages/catalog/filters/filters'
import { QUERY_KEY } from 'enums/QUERY_KEY'
import { BasicProductType } from 'features/basicProducts/api/types'
import { selectBasicProductsService, useSrmServiceStore } from 'store/crmServises'
import { UseQueryAllHook } from 'types/hooks/useQueryHooks'
import { getQueryFilters } from 'utils/filters/getQueryFilters'

export const useGetAllBasicProducts: UseQueryAllHook<
  BasicProductType[],
  unknown,
  [QUERY_KEY.GET_ALL_BASIC_PRODUCTS, Record<EFilterKeys, string>]
> = options => {
  const { query } = useRouter()

  const filters = getQueryFilters(query)

  const basicProductsService = useSrmServiceStore(selectBasicProductsService)

  return useQuery({
    queryKey: [QUERY_KEY.GET_ALL_BASIC_PRODUCTS, filters],
    queryFn: () => basicProductsService.getAll(filters),
    ...options,
  })
}
