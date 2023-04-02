import { useMutation, useQueryClient } from 'react-query'

import { queryKey } from '@/enums/queryKey'
import { LeatherColorType, UpdateLeatherColorParamsType } from '@/features/leatherColors/api/types'
import { useSrmServiceStore } from '@/store/crmServises'

export const useUpdateLeatherColor = (
  _id: string
): {
  updateLeatherColor: (params: Partial<UpdateLeatherColorParamsType>) => Promise<LeatherColorType>
  updateLeatherColorPhoto: (photo: string) => Promise<void>
  updateLeatherColorName: (title: string) => Promise<void>
  updateLeatherColorCode: (code: string) => Promise<void>
  updateLeatherColorDescription: (description: string) => Promise<void>
} => {
  const leatherColorsService = useSrmServiceStore(state => state.leatherColorsService)

  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation(leatherColorsService.update, {
    onSuccess: async data => {
      await queryClient.setQueryData([queryKey.GET_COLOR, data._id], data)
      await queryClient.invalidateQueries([queryKey.GET_ALL_COLORS])
    },
  })

  const updateLeatherColor = async (
    params: Partial<UpdateLeatherColorParamsType>
  ): Promise<LeatherColorType> => {
    return mutateAsync({ _id, params })
  }

  const updateLeatherColorName = async (title: string): Promise<void> => {
    await updateLeatherColor({ title })
  }
  const updateLeatherColorDescription = async (description: string): Promise<void> => {
    await updateLeatherColor({ description })
  }
  const updateLeatherColorCode = async (code: string): Promise<void> => {
    await updateLeatherColor({ code })
  }
  const updateLeatherColorPhoto = async (photo: string): Promise<void> => {
    await updateLeatherColor({ photo })
  }

  return {
    updateLeatherColor,
    updateLeatherColorName,
    updateLeatherColorDescription,
    updateLeatherColorCode,
    updateLeatherColorPhoto,
  }
}
