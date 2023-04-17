import { useQuery, UseQueryOptions } from 'react-query'
import { UseQueryResult } from 'react-query/types/react/types'

import { queryKey } from '@/enums/queryKey'
import { LeatherColorType } from '@/features/leatherColors/api/types'
import { selectLeatherColorsService, useSrmServiceStore } from '@/store/crmServises'

export const useGetAllLeatherColors: UseGetAllLeatherColorsType = (filter, options) => {
  const leatherColorsService = useSrmServiceStore(selectLeatherColorsService)

  return useQuery(
    filter ? [queryKey.GET_ALL_COLORS, filter] : queryKey.GET_ALL_COLORS,
    () => leatherColorsService.getAll(filter),
    options
  )
}

type UseGetAllLeatherColorsType = (
  filter?: string[],
  options?: Omit<
    UseQueryOptions<Pick<LeatherColorType, '_id' | 'title' | 'photo'>[]>,
    'queryKey' | 'queryFn'
  >
) => UseQueryResult<Pick<LeatherColorType, '_id' | 'title' | 'photo'>[]>
