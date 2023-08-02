import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import { EFilterKeys } from 'components/pages/catalog/filters/filters'
import { QUERY_KEY } from 'enums/QUERY_KEY'
import { BasicProductsAPI } from 'features/basicProducts/api/basicProductsAPI'
import { BasicProductType } from 'features/basicProducts/api/types'
import { useLocale } from 'hooks/useLocale'
import {
  FiltersType,
  selectFilter,
  useBasicProductsFilterStore,
} from 'store/useBasicProductsFilterStore'
import { UseQueryAllHook } from 'types/hooks/useQueryHooks'
import { LOCALES } from 'types/localeType'

export const useGetAllBasicProducts: UseQueryAllHook<
  { data: BasicProductType[]; totalCount: number },
  unknown,
  [QUERY_KEY.GET_ALL_BASIC_PRODUCTS, FiltersType, LOCALES]
> = options => {
  const { query } = useRouter()
  const locale = useLocale()

  const pageSize = useBasicProductsFilterStore(selectFilter(EFilterKeys.PAGE_SIZE))

  return useQuery({
    queryKey: [QUERY_KEY.GET_ALL_BASIC_PRODUCTS, query as FiltersType, locale],
    queryFn: () => BasicProductsAPI.getAll({ ...query, pageSize } as FiltersType),
    ...options,
  })
}
