import { UseMutateAsyncFunction, useMutation, useQueryClient } from 'react-query'

import { queryKey } from '@/enums/queryKey'
import {
  CreateLeatherFactoryParamsType,
  LeatherFactoryType,
} from '@/features/leatherFactories/api/types'
import { useGetAllLeatherFactories } from '@/features/leatherFactories/hooks/useGetAllLeatherFactories'
import { selectLeatherFactoriesService, useSrmServiceStore } from '@/store/crmServises'

export const useCreateLeatherFactory: UseCreateLeatherFactoryType = () => {
  const leatherFactoriesService = useSrmServiceStore(selectLeatherFactoriesService)

  const queryClient = useQueryClient()
  const factories = useGetAllLeatherFactories()

  const { mutateAsync } = useMutation(leatherFactoriesService.create, {
    onSuccess: ({ _id, title }) => {
      queryClient.setQueryData(queryKey.GET_ALL_FACTORIES, [...factories, { _id, title }])
    },
  })

  return mutateAsync
}

type UseCreateLeatherFactoryType = () => UseMutateAsyncFunction<
  LeatherFactoryType,
  unknown,
  CreateLeatherFactoryParamsType
>
