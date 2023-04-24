import { useQuery, UseQueryOptions } from 'react-query'
import { UseQueryResult } from 'react-query/types/react/types'

import { QUERY_KEY } from 'enums/QUERY_KEY'
import { LeatherColorsAPI } from 'features/leatherColors/api/leatherColorsAPI'
import { LeatherColorType } from 'features/leatherColors/api/types'

export const useGetAllLeatherColors: UseGetAllLeatherColorsType = (filter, options) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_ALL_COLORS, ...(filter ?? [])],
    queryFn: () => LeatherColorsAPI.getAll(filter),
    ...options,
  })
}

type UseGetAllLeatherColorsType = (
  filter?: string[],
  options?: Omit<
    UseQueryOptions<
      Pick<LeatherColorType, '_id' | 'title' | 'photo'>[],
      unknown,
      Pick<LeatherColorType, '_id' | 'title' | 'photo'>[],
      (QUERY_KEY.GET_ALL_COLORS | string)[]
    >,
    'queryKey' | 'queryFn'
  >
) => UseQueryResult<Pick<LeatherColorType, '_id' | 'title' | 'photo'>[]>
