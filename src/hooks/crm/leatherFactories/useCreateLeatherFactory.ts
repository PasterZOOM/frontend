import { UseMutateAsyncFunction, useMutation, useQueryClient } from 'react-query'

import {
  CreateLeatherFactoryParamsType,
  LeatherFactoryType,
} from '@/api/crm/leatherFactoriesApi/types'
import { queryKey } from '@/enums/crm/queryKey'
import { useGetAllLeatherFactories } from '@/hooks/crm/leatherFactories/useGetAllLeatherFactories'
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
