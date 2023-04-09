import { UseMutateAsyncFunction, useMutation, useQueryClient } from 'react-query'

import { queryKey } from '@/enums/queryKey'
import {
  LeatherFactoryType,
  UpdateLeatherFactoryParamsType,
} from '@/features/leatherFactories/api/types'
import { useSrmServiceStore } from '@/store/crmServises'

export const useUpdateLeatherFactory: UseUpdateLeatherFactoryType = _id => {
  const leatherFactoriesService = useSrmServiceStore(state => state.leatherFactoriesService)

  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation(leatherFactoriesService.update, {
    onSuccess: async data => {
      await queryClient.setQueryData([queryKey.GET_FACTORY, data._id], data)
      await queryClient.invalidateQueries([queryKey.GET_ALL_FACTORIES])
    },
  })

  return params => mutateAsync({ _id, params })
}

type UseUpdateLeatherFactoryType = (
  _id: string
) => UseMutateAsyncFunction<LeatherFactoryType, unknown, Partial<UpdateLeatherFactoryParamsType>>
