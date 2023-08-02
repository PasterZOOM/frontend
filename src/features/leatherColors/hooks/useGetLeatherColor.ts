import { useQuery } from 'react-query'

import { QUERY_KEY } from 'enums/QUERY_KEY'
import { LeatherColorsAPI } from 'features/leatherColors/api/leatherColorsAPI'
import { LeatherColorType } from 'features/leatherColors/api/types'
import { useLocale } from 'hooks/useLocale'
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
