import { useQuery, UseQueryOptions } from 'react-query'

import { queryKey } from '@/enums/queryKey'
import { LeatherColorType } from '@/features/leatherColors/api/types'
import { selectLeatherColorsService, useSrmServiceStore } from '@/store/crmServises'

export const useGetLeatherColor: UseGetLeatherColorType = (colorId, options) => {
  const leatherColorsService = useSrmServiceStore(selectLeatherColorsService)

  const { data } = useQuery(
    [queryKey.GET_COLOR, colorId],
    () => leatherColorsService.getOne(colorId),
    options
  )

  return data
}

type UseGetLeatherColorType = (
  colorId: string,
  options?: Omit<UseQueryOptions<LeatherColorType>, 'queryKey' | 'queryFn'>
) => LeatherColorType | undefined
