import { useQuery, UseQueryOptions } from 'react-query'
import { UseQueryResult } from 'react-query/types/react/types'

import { queryKey } from 'enums/queryKey'
import { LeatherColorType } from 'features/leatherColors/api/types'
import { selectLeatherColorsService, useSrmServiceStore } from 'store/crmServises'

export const useGetLeatherColor: UseGetLeatherColorType = (colorId, options) => {
  const leatherColorsService = useSrmServiceStore(selectLeatherColorsService)

  return useQuery(
    [queryKey.GET_COLOR, colorId],
    () => leatherColorsService.getOne(colorId),
    options
  )
}

type UseGetLeatherColorType = (
  colorId: string,
  options?: Omit<UseQueryOptions<LeatherColorType>, 'queryKey' | 'queryFn'>
) => UseQueryResult<LeatherColorType>
