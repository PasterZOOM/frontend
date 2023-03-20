import { UseMutateAsyncFunction, useMutation, useQueryClient } from 'react-query'

import {
  LeatherFactoryType,
  UpdateLeatherFactoryParamsType,
} from '@/api/crm/leatherFactoriesApi/types'
import { queryKey } from '@/enums/crm/queryKey'
import { useSrmServiceStore } from '@/store/crmServises'

export const useUpdateLeatherFactory = (): UseMutateAsyncFunction<
  LeatherFactoryType,
  unknown,
  Partial<UpdateLeatherFactoryParamsType>,
  unknown
> => {
  const leatherFactoriesService = useSrmServiceStore(state => state.leatherFactoriesService)

  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation(leatherFactoriesService.update, {
    onSuccess: async data => {
      await queryClient.setQueryData([queryKey.GET_FACTORY, data._id], data)
      await queryClient.invalidateQueries([queryKey.GET_ALL_FACTORIES])
    },
  })

  return mutateAsync
}
