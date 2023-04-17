import { UseMutateAsyncFunction, useMutation, useQueryClient } from 'react-query'

import { CreateType } from '@/api/paramsTypes'
import { queryKey } from '@/enums/queryKey'
import { CreateLeatherColorParamsType, LeatherColorType } from '@/features/leatherColors/api/types'
import { useGetAllLeatherColors } from '@/features/leatherColors/hooks/useGetAllLeatherColors'
import { selectLeatherColorsService, useSrmServiceStore } from '@/store/crmServises'

export const useCreateLeatherColor: UseCreateLeatherColorType = () => {
  const leatherColorsService = useSrmServiceStore(selectLeatherColorsService)

  const queryClient = useQueryClient()
  const colors = useGetAllLeatherColors()

  const { mutateAsync } = useMutation(leatherColorsService.create, {
    onSuccess: ({ _id, title }) => {
      queryClient.setQueryData(queryKey.GET_ALL_COLORS, [...colors, { _id, title }])
    },
  })

  return mutateAsync
}

type UseCreateLeatherColorType = () => UseMutateAsyncFunction<
  LeatherColorType,
  unknown,
  CreateType<CreateLeatherColorParamsType>
>
