import { useQuery } from 'react-query'

import { queryKey } from '@/enums/queryKey'
import { LeatherColorType } from '@/features/leatherColors/api/types'
import { useSrmServiceStore } from '@/store/crmServises'

export const useGetAllLeatherColors: useGetAllLeatherColorsType = (filter, enabled = true) => {
  const leatherColorsService = useSrmServiceStore(state => state.leatherColorsService)

  const { data } = useQuery(
    [queryKey.GET_ALL_COLORS, filter],
    () => leatherColorsService.getAll(filter),
    {
      enabled,
    }
  )

  return data || []
}

type useGetAllLeatherColorsType = (
  filter?: string[],
  enabled?: boolean
) => Pick<LeatherColorType, '_id' | 'title' | 'photo'>[]
