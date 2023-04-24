import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import { EFilterKeys } from 'components/pages/catalog/filters/filters'
import { QUERY_KEY } from 'enums/QUERY_KEY'
import { BasicProductsAPI } from 'features/basicProducts/api/basicProductsAPI'
import { BasicProductType } from 'features/basicProducts/api/types'
import { UseQueryAllHook } from 'types/hooks/useQueryHooks'
import { getQueryFilters } from 'utils/filters/getQueryFilters'

export const useGetAllBasicProducts: UseQueryAllHook<
  BasicProductType[],
  unknown,
  [QUERY_KEY.GET_ALL_BASIC_PRODUCTS, Record<EFilterKeys, string>]
> = options => {
  const { query } = useRouter()

  const filters = getQueryFilters(query)

  return useQuery({
    queryKey: [QUERY_KEY.GET_ALL_BASIC_PRODUCTS, filters],
    queryFn: () => BasicProductsAPI.getAll(filters),
    ...options,
  })
}
