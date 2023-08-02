import { useQuery } from 'react-query'

import { LeatherColorsAPI } from 'features/leatherColors/api/leatherColorsAPI'
import { LeatherColorType } from 'features/leatherColors/api/types'
import { QUERY_KEY } from 'shared/enums/QUERY_KEY'
import { useLocale } from 'shared/lib/hooks/useLocale'
import { UseQueryOneHook } from 'types/hooks/useQueryHooks'
import { LOCALES } from 'types/localeType'

export const useGetLeatherColor: UseQueryOneHook<
  LeatherColorType,
  unknown,
  [QUERY_KEY.GET_COLOR, string, LOCALES]
> = (id, options) => {
  const locale = useLocale()

  return useQuery({
    queryKey: [QUERY_KEY.GET_COLOR, id, locale],
    queryFn: () => LeatherColorsAPI.getOne(id),
    ...options,
  })
}
