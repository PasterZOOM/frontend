import { useMutation, useQueryClient } from 'react-query'

import { UpdateParamsType } from 'api/paramsTypes'
import { QUERY_KEY } from 'enums/QUERY_KEY'
import { LeatherFactoriesAPI } from 'features/leatherFactories/api/leatherFactoriesAPI'
import {
  LeatherFactoryType,
  UpdateLeatherFactoryParamsType,
} from 'features/leatherFactories/api/types'
import { UseMutationHook } from 'types/hooks/useMutationHook'

export const useUpdateLeatherFactory: UseMutationHook<
  LeatherFactoryType,
  unknown,
  UpdateParamsType<UpdateLeatherFactoryParamsType>
> = options => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: LeatherFactoriesAPI.update,
    onSuccess: async (data, variables) => {
      await queryClient.setQueryData([QUERY_KEY.GET_FACTORY, data._id], data)
      if (variables.params.title) {
        await queryClient.invalidateQueries([QUERY_KEY.GET_ALL_FACTORIES])
      }
    },
    ...options,
  })
}
