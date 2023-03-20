import { useQuery } from 'react-query'

import { LeatherColorType } from '@/api/crm/leatherColorsApi/types'
import { queryKey } from '@/enums/crm/queryKey'
import { useSrmServiceStore } from '@/store/crmServises'

export const useGetAllLeatherColors = (
  enabled = true
): Pick<LeatherColorType, '_id' | 'title'>[] => {
  const leatherColorsService = useSrmServiceStore(state => state.leatherColorsService)

  const { data } = useQuery(queryKey.GET_ALL_COLORS, leatherColorsService.getAll, { enabled })

  return data || []
}
