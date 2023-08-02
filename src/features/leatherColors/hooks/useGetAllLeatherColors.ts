import { useQuery, UseQueryOptions } from 'react-query'
import { UseQueryResult } from 'react-query/types/react/types'

import { LeatherColorsAPI } from 'features/leatherColors/api/leatherColorsAPI'
import { LeatherColorType } from 'features/leatherColors/api/types'
import { QUERY_KEY } from 'shared/enums/QUERY_KEY'
import { useLocale } from 'shared/lib/hooks/useLocale'
import { LOCALES } from 'types/localeType'

export const useGetAllLeatherColors: UseGetAllLeatherColorsType = (filter, options) => {
  const locale = useLocale()

  return useQuery({
    queryKey: [QUERY_KEY.GET_ALL_COLORS, ...(filter ?? []), locale],
    queryFn: () => LeatherColorsAPI.getAll(filter),
    ...options,
  })
}

type UseGetAllLeatherColorsType = (
  filter?: string[],
  options?: Omit<
    UseQueryOptions<
      LeatherColorType[],
      unknown,
      LeatherColorType[],
      (LOCALES | QUERY_KEY.GET_ALL_COLORS | string)[]
    >,
    'queryFn' | 'queryKey'
  >
) => UseQueryResult<LeatherColorType[]>
