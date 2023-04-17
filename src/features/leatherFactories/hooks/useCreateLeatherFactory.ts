import { useMutation, useQueryClient } from 'react-query'
import { UseMutationOptions, UseMutationResult } from 'react-query/types/react/types'

import { queryKey } from '@/enums/queryKey'
import {
  CreateLeatherFactoryParamsType,
  LeatherFactoryType,
} from '@/features/leatherFactories/api/types'
import { selectLeatherFactoriesService, useSrmServiceStore } from '@/store/crmServises'

export const useCreateLeatherFactory: UseCreateLeatherFactoryType = () => {
  const leatherFactoriesService = useSrmServiceStore(selectLeatherFactoriesService)

  const queryClient = useQueryClient()
  const factories = queryClient.getQueryData<Pick<LeatherFactoryType, '_id' | 'title'>[]>(
    queryKey.GET_ALL_FACTORIES
  )

  return useMutation(leatherFactoriesService.create, {
    onSuccess: ({ _id, title }) => {
      queryClient.setQueryData(queryKey.GET_ALL_FACTORIES, [...(factories ?? []), { _id, title }])
    },
  })
}

type UseCreateLeatherFactoryType = (
  options?: Omit<
    UseMutationOptions<LeatherFactoryType, unknown, CreateLeatherFactoryParamsType>,
    'mutationFn'
  >
) => UseMutationResult<LeatherFactoryType, unknown, CreateLeatherFactoryParamsType>
