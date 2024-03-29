import { useQuery } from 'react-query'

import { BasicProductsAPI } from '@/features/basicProducts/api/basicProductsAPI'
import { BasicProductResponseType } from '@/features/basicProducts/api/types'
import { QUERY_KEY } from '@/shared/enums/QUERY_KEY'
import { useLocale } from '@/shared/lib/hooks/useLocale'
import { UseQueryAllHook } from '@/shared/types/hooks/useQueryHooks'
import { LOCALES } from '@/shared/types/localeType'
import {
  FiltersType,
  selectFilters,
  useBasicProductsFilterStore,
} from '@/store/useBasicProductsFilterStore'

export const useGetAllBasicProducts: UseQueryAllHook<
  BasicProductResponseType,
  unknown,
  [QUERY_KEY.GET_ALL_BASIC_PRODUCTS, FiltersType, LOCALES]
> = options => {
  const locale = useLocale()

  const filters = useBasicProductsFilterStore(selectFilters)

  return useQuery({
    queryKey: [QUERY_KEY.GET_ALL_BASIC_PRODUCTS, filters, locale],
    queryFn: () => BasicProductsAPI.getAll({ ...filters } as FiltersType),
    ...options,
  })
}
