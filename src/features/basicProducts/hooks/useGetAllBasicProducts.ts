import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import { QUERY_KEY } from 'enums/QUERY_KEY'
import { BasicProductsAPI } from 'features/basicProducts/api/basicProductsAPI'
import { BasicProductType } from 'features/basicProducts/api/types'
import { FiltersType } from 'store/useBasicProductsFilterStore'
import { UseQueryAllHook } from 'types/hooks/useQueryHooks'

export const useGetAllBasicProducts: UseQueryAllHook<
  BasicProductType[],
  unknown,
  [QUERY_KEY.GET_ALL_BASIC_PRODUCTS, FiltersType]
> = options => {
  const { query } = useRouter()

  return useQuery({
    queryKey: [QUERY_KEY.GET_ALL_BASIC_PRODUCTS, query as FiltersType],
    queryFn: () => BasicProductsAPI.getAll(query as FiltersType),
    ...options,
  })
}
