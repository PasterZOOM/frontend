import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import { EFilterKeys } from 'components/pages/catalog/filters/filters'
import { queryKey } from 'enums/queryKey'
import { BasicProductType } from 'features/basicProducts/api/types'
import { selectBasicProductsService, useSrmServiceStore } from 'store/crmServises'
import { UseQueryAllHook } from 'types/hooks/useQueryHooks'
import { getQueryFilters } from 'utils/filters/getQueryFilters'

export const useGetAllBasicProducts: UseQueryAllHook<
  BasicProductType[],
  unknown,
  (queryKey | Record<EFilterKeys, string>)[]
> = options => {
  const { query } = useRouter()

  const filters = getQueryFilters(query)

  const basicProductsService = useSrmServiceStore(selectBasicProductsService)

  return useQuery({
    queryKey: [queryKey.GET_ALL_BASIC_PRODUCTS, filters],
    queryFn: () => basicProductsService.getAll(filters),
    ...options,
  })
}
