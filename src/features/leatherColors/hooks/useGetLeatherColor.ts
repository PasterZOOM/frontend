import { useQuery } from 'react-query'

import { queryKey } from '@/enums/queryKey'
import { LeatherColorType } from '@/features/leatherColors/api/types'
import { useSrmServiceStore } from '@/store/crmServises'

export const useGetLeatherColor = (
  colorId: string,
  enabled: boolean = false
): LeatherColorType | undefined => {
  const leatherColorsService = useSrmServiceStore(state => state.leatherColorsService)

  const { data } = useQuery(
    [queryKey.GET_COLOR, colorId],
    async () => leatherColorsService.getOne(colorId),
    { enabled }
  )

  return data
}
