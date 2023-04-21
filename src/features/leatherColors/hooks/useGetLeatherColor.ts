import { useQuery } from 'react-query'

import { QUERY_KEY } from 'enums/QUERY_KEY'
import { LeatherColorType } from 'features/leatherColors/api/types'
import { selectLeatherColorsService, useSrmServiceStore } from 'store/crmServises'
import { UseQueryOneHook } from 'types/hooks/useQueryHooks'

export const useGetLeatherColor: UseQueryOneHook<
  LeatherColorType,
  unknown,
  [QUERY_KEY.GET_COLOR, string]
> = (id, options) => {
  const leatherColorsService = useSrmServiceStore(selectLeatherColorsService)

  return useQuery({
    queryKey: [QUERY_KEY.GET_COLOR, id],
    queryFn: () => leatherColorsService.getOne(id),
    ...options,
  })
}
