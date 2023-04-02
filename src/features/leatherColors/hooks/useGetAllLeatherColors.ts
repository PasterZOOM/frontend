import { useQuery } from 'react-query'

import { queryKey } from '@/enums/queryKey'
import { LeatherColorType } from '@/features/leatherColors/api/types'
import { useSrmServiceStore } from '@/store/crmServises'

export const useGetAllLeatherColors = (
  enabled = true
): Pick<LeatherColorType, '_id' | 'title'>[] => {
  const leatherColorsService = useSrmServiceStore(state => state.leatherColorsService)

  const { data } = useQuery(queryKey.GET_ALL_COLORS, leatherColorsService.getAll, { enabled })

  return data || []
}
