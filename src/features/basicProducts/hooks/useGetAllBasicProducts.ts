import { useQuery } from 'react-query'

import { EFilterKeys } from 'components/pages/catalog/filters/filters'
import { BasicProductsAPI } from 'features/basicProducts/api/basicProductsAPI'
import { BasicProductType } from 'features/basicProducts/api/types'
import { QUERY_KEY } from 'shared/enums/QUERY_KEY'
import { useLocale } from 'shared/lib/hooks/useLocale'
import {
  FiltersType,
  selectFilter,
  selectFilters,
  useBasicProductsFilterStore,
} from 'store/useBasicProductsFilterStore'
import { UseQueryAllHook } from 'types/hooks/useQueryHooks'
import { LOCALES } from 'types/localeType'

export const useGetAllBasicProducts: UseQueryAllHook<
  { data: BasicProductType[]; totalCount: number },
  unknown,
  [QUERY_KEY.GET_ALL_BASIC_PRODUCTS, FiltersType, LOCALES]
> = options => {
  const locale = useLocale()

  const pageSize = useBasicProductsFilterStore(selectFilter(EFilterKeys.PAGE_SIZE))
  const filters = useBasicProductsFilterStore(selectFilters)

  return useQuery({
    queryKey: [QUERY_KEY.GET_ALL_BASIC_PRODUCTS, filters, locale],
    queryFn: () => BasicProductsAPI.getAll({ ...filters, pageSize } as FiltersType),
    ...options,
  })
}
