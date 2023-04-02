import { useMutation, useQueryClient } from 'react-query'

import { queryKey } from '@/enums/queryKey'
import {
  LeatherFactoryType,
  UpdateLeatherFactoryParamsType,
} from '@/features/leatherFactories/api/types'
import { useSrmServiceStore } from '@/store/crmServises'

export const useUpdateLeatherFactory = (
  _id: string
): {
  updateLeatherFactory: (
    params: Partial<UpdateLeatherFactoryParamsType>
  ) => Promise<LeatherFactoryType>
  updateLeatherFactoryName: (title: string) => Promise<void>
  updateLeatherFactoryDescription: (description: string) => Promise<void>
} => {
  const leatherFactoriesService = useSrmServiceStore(state => state.leatherFactoriesService)

  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation(leatherFactoriesService.update, {
    onSuccess: async data => {
      await queryClient.setQueryData([queryKey.GET_FACTORY, data._id], data)
      await queryClient.invalidateQueries([queryKey.GET_ALL_FACTORIES])
    },
  })

  const updateLeatherFactory = async (
    params: Partial<UpdateLeatherFactoryParamsType>
  ): Promise<LeatherFactoryType> => {
    return mutateAsync({ _id, params })
  }

  const updateLeatherFactoryName = async (title: string): Promise<void> => {
    await updateLeatherFactory({ title })
  }
  const updateLeatherFactoryDescription = async (description: string): Promise<void> => {
    await updateLeatherFactory({ description })
  }

  return {
    updateLeatherFactory,
    updateLeatherFactoryName,
    updateLeatherFactoryDescription,
  }
}
