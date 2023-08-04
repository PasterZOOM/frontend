import { useMutation, useQueryClient } from 'react-query'

import { UpdateParamsType } from 'api/paramsTypes'
import { LeatherFactoriesAPI } from 'features/leatherFactories/api/leatherFactoriesAPI'
import {
  LeatherFactoryType,
  UpdateLeatherFactoryParamsType,
} from 'features/leatherFactories/api/types'
import { QUERY_KEY } from 'shared/enums/QUERY_KEY'
import { useLocale } from 'shared/lib/hooks/useLocale'
import { UseMutationHook } from 'types/hooks/useMutationHook'

export const useUpdateLeatherFactory: UseMutationHook<
  LeatherFactoryType,
  unknown,
  UpdateParamsType<UpdateLeatherFactoryParamsType>
> = options => {
  const locale = useLocale()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: LeatherFactoriesAPI.update,
    onSuccess: async (data, variables) => {
      queryClient.setQueryData([QUERY_KEY.GET_FACTORY, data._id, locale], data)
      if (variables.params.title) {
        await queryClient.invalidateQueries([QUERY_KEY.GET_ALL_FACTORIES, locale])
      }
    },
    ...options,
  })
}
