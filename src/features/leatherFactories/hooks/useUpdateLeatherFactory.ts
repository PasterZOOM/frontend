import { useMutation, useQueryClient } from 'react-query'
import { UseMutationOptions, UseMutationResult } from 'react-query/types/react/types'

import { UpdateParamsType } from 'api/paramsTypes'
import { queryKey } from 'enums/queryKey'
import {
  LeatherFactoryType,
  UpdateLeatherFactoryParamsType,
} from 'features/leatherFactories/api/types'
import { selectLeatherFactoriesService, useSrmServiceStore } from 'store/crmServises'

export const useUpdateLeatherFactory: UseUpdateLeatherFactoryType = options => {
  const leatherFactoriesService = useSrmServiceStore(selectLeatherFactoriesService)

  const queryClient = useQueryClient()

  return useMutation(leatherFactoriesService.update, {
    onSuccess: async data => {
      await queryClient.setQueryData([queryKey.GET_FACTORY, data._id], data)
      await queryClient.invalidateQueries([queryKey.GET_ALL_FACTORIES])
    },
    ...options,
  })
}

type UseUpdateLeatherFactoryType = (
  options?: Omit<
    UseMutationOptions<
      LeatherFactoryType,
      unknown,
      UpdateParamsType<UpdateLeatherFactoryParamsType>
    >,
    'mutationFn'
  >
) => UseMutationResult<
  LeatherFactoryType,
  unknown,
  UpdateParamsType<UpdateLeatherFactoryParamsType>
>
