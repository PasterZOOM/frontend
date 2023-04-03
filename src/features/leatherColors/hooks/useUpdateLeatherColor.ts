import { useMutation, useQueryClient } from 'react-query'

import { queryKey } from '@/enums/queryKey'
import { LeatherColorType, UpdateLeatherColorParamsType } from '@/features/leatherColors/api/types'
import { useSrmServiceStore } from '@/store/crmServises'

export const useUpdateLeatherColor: UseUpdateLeatherColorType = _id => {
  const leatherColorsService = useSrmServiceStore(state => state.leatherColorsService)

  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation(leatherColorsService.update, {
    onSuccess: async data => {
      await queryClient.setQueryData([queryKey.GET_COLOR, data._id], data)
      await queryClient.invalidateQueries([queryKey.GET_ALL_COLORS])
    },
  })

  const updateLeatherColor: UpdateLeatherColorFnType = async params => {
    return mutateAsync({ _id, params })
  }

  const updateLeatherColorTitle: UpdateLeatherColorNameFnType = async title => {
    await updateLeatherColor({ title })
  }
  const updateLeatherColorDescription: UpdateLeatherColorDescriptionFnType = async description => {
    await updateLeatherColor({ description })
  }
  const updateLeatherColorCode: UpdateLeatherColorCodeFnType = async code => {
    await updateLeatherColor({ code })
  }
  const updateLeatherColorPhoto: UpdateLeatherColorPhotoFnType = async photo => {
    await updateLeatherColor({ photo })
  }

  return {
    updateLeatherColor,
    updateLeatherColorTitle,
    updateLeatherColorDescription,
    updateLeatherColorCode,
    updateLeatherColorPhoto,
  }
}

type UseUpdateLeatherColorType = (_id: string) => {
  updateLeatherColor: UpdateLeatherColorFnType
  updateLeatherColorPhoto: (photo: string) => Promise<void>
  updateLeatherColorTitle: (title: string) => Promise<void>
  updateLeatherColorCode: (code: string) => Promise<void>
  updateLeatherColorDescription: (description: string) => Promise<void>
}
type UpdateLeatherColorFnType = (
  params: Partial<UpdateLeatherColorParamsType>
) => Promise<LeatherColorType>
type UpdateLeatherColorPhotoFnType = (photo: string) => Promise<void>
type UpdateLeatherColorNameFnType = (title: string) => Promise<void>
type UpdateLeatherColorCodeFnType = (code: string) => Promise<void>
type UpdateLeatherColorDescriptionFnType = (description: string) => Promise<void>
