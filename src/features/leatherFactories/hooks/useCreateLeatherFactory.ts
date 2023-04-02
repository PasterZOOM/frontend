import { UseMutateAsyncFunction, useMutation, useQueryClient } from 'react-query'

import { queryKey } from '@/enums/queryKey'
import {
  CreateLeatherFactoryParamsType,
  LeatherFactoryType,
} from '@/features/leatherFactories/api/types'
import { useGetAllLeatherFactories } from '@/features/leatherFactories/hooks/useGetAllLeatherFactories'
import { useSrmServiceStore } from '@/store/crmServises'

export const useCreateLeatherFactory = (): UseMutateAsyncFunction<
  LeatherFactoryType,
  unknown,
  CreateLeatherFactoryParamsType,
  unknown
> => {
  const leatherFactoriesService = useSrmServiceStore(state => state.leatherFactoriesService)

  const queryClient = useQueryClient()
  const factories = useGetAllLeatherFactories()

  const { mutateAsync } = useMutation(leatherFactoriesService.create, {
    onSuccess: ({ _id, name }) => {
      queryClient.setQueryData(queryKey.GET_ALL_FACTORIES, [...factories, { _id, name }])
    },
  })

  return mutateAsync
}
