import { useQuery } from 'react-query'

import { BasicProductsAPI } from 'features/basicProducts/api/basicProductsAPI'
import { BasicProductType } from 'features/basicProducts/api/types'
import { QUERY_KEY } from 'shared/enums/QUERY_KEY'
import { useLocale } from 'shared/lib/hooks/useLocale'
import { UseQueryOneHook } from 'types/hooks/useQueryHooks'
import { LOCALES } from 'types/localeType'

export const useGetBasicProduct: UseQueryOneHook<
  BasicProductType,
  unknown,
  [QUERY_KEY.GET_BASIC_PRODUCT, string, LOCALES]
> = (_id, options) => {
  const locale = useLocale()

  return useQuery({
    queryKey: [QUERY_KEY.GET_BASIC_PRODUCT, _id, locale],
    queryFn: () => BasicProductsAPI.getOne(_id),
    ...options,
  })
}
