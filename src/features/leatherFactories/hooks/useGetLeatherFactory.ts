import { useQuery } from 'react-query'

import { QUERY_KEY } from 'enums/QUERY_KEY'
import { LeatherFactoriesAPI } from 'features/leatherFactories/api/leatherFactoriesAPI'
import { LeatherFactoryType } from 'features/leatherFactories/api/types'
import { UseQueryOneHook } from 'types/hooks/useQueryHooks'

/**
 *
 * @param id {string} идентификатор фабрики производителя кожи
 * @param options
 * @return query {UseQueryResult<LeatherFactoryType>}
 */
export const useGetLeatherFactory: UseQueryOneHook<
  LeatherFactoryType,
  unknown,
  [QUERY_KEY.GET_FACTORY, string]
> = (id, options) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_FACTORY, id],
    queryFn: () => LeatherFactoriesAPI.getOne(id),
    ...options,
  })
}
