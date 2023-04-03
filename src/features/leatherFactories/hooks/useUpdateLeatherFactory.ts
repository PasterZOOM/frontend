import { useMutation, useQueryClient } from 'react-query'

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

  const updateLeatherFactory = async (
    params: Partial<UpdateLeatherFactoryParamsType>
  ): Promise<LeatherFactoryType> => {
    return mutateAsync({ _id, params })
  }

  const updateLeatherFactoryTitle: UpdateLeatherFactoryTitleFnType = async title => {
    await updateLeatherFactory({ title })
  }
  const updateLeatherFactoryDescription: UpdateLeatherFactoryDescriptionFnType =
    async description => {
      await updateLeatherFactory({ description })
    }

  return {
    updateLeatherFactory,
    updateLeatherFactoryTitle,
    updateLeatherFactoryDescription,
  }
}

type UseUpdateLeatherFactoryType = (_id: string) => {
  updateLeatherFactory: updateLeatherFactoryFnType
  updateLeatherFactoryTitle: UpdateLeatherFactoryTitleFnType
  updateLeatherFactoryDescription: UpdateLeatherFactoryDescriptionFnType
}
type updateLeatherFactoryFnType = (
  params: Partial<UpdateLeatherFactoryParamsType>
) => Promise<LeatherFactoryType>
type UpdateLeatherFactoryTitleFnType = (title: string) => Promise<void>
type UpdateLeatherFactoryDescriptionFnType = (description: string) => Promise<void>
