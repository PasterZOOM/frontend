import { useMutation, useQueryClient } from 'react-query'

import { QUERY_KEY } from 'enums/QUERY_KEY'
import { LeatherFactoriesAPI } from 'features/leatherFactories/api/leatherFactoriesAPI'
import {
  CreateLeatherFactoryParamsType,
  LeatherFactoryType,
} from 'features/leatherFactories/api/types'
import { UseMutationHook } from 'types/hooks/useMutationHook'

export const useCreateLeatherFactory: UseMutationHook<
  LeatherFactoryType,
  unknown,
  CreateLeatherFactoryParamsType
> = options => {
  const queryClient = useQueryClient()
  const factories = queryClient.getQueryData<LeatherFactoryType[]>(QUERY_KEY.GET_ALL_FACTORIES)

  return useMutation({
    mutationFn: LeatherFactoriesAPI.create,
    onSuccess: data => {
      queryClient.setQueryData(QUERY_KEY.GET_ALL_FACTORIES, [...(factories ?? []), data])
    },
    ...options,
  })
}
