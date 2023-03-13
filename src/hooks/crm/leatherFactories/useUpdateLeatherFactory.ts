import { UseMutateAsyncFunction, useMutation, useQueryClient } from 'react-query'

import {
  LeatherFactoryType,
  UpdateLeatherFactoryParamsType,
} from '@/api/crm/leatherFactoryApi/types'
import { queryKey } from '@/enums/crm/queryKey'
import { useSrmServiceStore } from '@/store/crmServises'

export const useUpdateLeatherFactory = (): UseMutateAsyncFunction<
  LeatherFactoryType,
  unknown,
  Partial<UpdateLeatherFactoryParamsType>,
  unknown
> => {
  const leatherFactoryService = useSrmServiceStore(state => state.leatherFactoryService)

  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation(leatherFactoryService.update, {
    onSuccess: async data => {
      await queryClient.setQueryData([queryKey.GET_FACTORY, data._id], data)
      await queryClient.invalidateQueries([queryKey.GET_ALL_FACTORIES])
    },
  })

  return mutateAsync
}
