import { useQuery } from 'react-query'

import { QUERY_KEY } from 'enums/QUERY_KEY'
import { LeatherColorsAPI } from 'features/leatherColors/api/leatherColorsAPI'
import { LeatherColorType } from 'features/leatherColors/api/types'
import { UseQueryOneHook } from 'types/hooks/useQueryHooks'

export const useGetLeatherColor: UseQueryOneHook<
  LeatherColorType,
  unknown,
  [QUERY_KEY.GET_COLOR, string]
> = (id, options) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_COLOR, id],
    queryFn: () => LeatherColorsAPI.getOne(id),
    ...options,
  })
}
