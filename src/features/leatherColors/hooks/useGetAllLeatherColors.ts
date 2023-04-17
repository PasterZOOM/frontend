import { useQuery, UseQueryOptions } from 'react-query'

import { queryKey } from '@/enums/queryKey'
import { LeatherColorType } from '@/features/leatherColors/api/types'
import { selectLeatherColorsService, useSrmServiceStore } from '@/store/crmServises'

export const useGetAllLeatherColors: UseGetAllLeatherColorsType = (filter, options) => {
  const leatherColorsService = useSrmServiceStore(selectLeatherColorsService)

  const { data } = useQuery(
    filter ? [queryKey.GET_ALL_COLORS, filter] : queryKey.GET_ALL_COLORS,
    () => leatherColorsService.getAll(filter),
    options
  )

  return data || []
}

type UseGetAllLeatherColorsType = (
  filter?: string[],
  options?: Omit<
    UseQueryOptions<Pick<LeatherColorType, '_id' | 'title' | 'photo'>[]>,
    'queryKey' | 'queryFn'
  >
) => Pick<LeatherColorType, '_id' | 'title' | 'photo'>[]
