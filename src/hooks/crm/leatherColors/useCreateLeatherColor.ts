import { UseMutateAsyncFunction, useMutation, useQueryClient } from 'react-query'

import { CreateLeatherColorParamsType, LeatherColorType } from '@/api/crm/leatherColorsApi/types'
import { CreateType } from '@/api/paramsTypes'
import { queryKey } from '@/enums/crm/queryKey'
import { useGetAllLeatherColors } from '@/hooks/crm/leatherColors/useGetAllLeatherColors'
import { useSrmServiceStore } from '@/store/crmServises'

export const useCreateLeatherColor = (): UseMutateAsyncFunction<
  LeatherColorType,
  unknown,
  CreateType<CreateLeatherColorParamsType>,
  unknown
> => {
  const leatherColorsService = useSrmServiceStore(state => state.leatherColorsService)

  const queryClient = useQueryClient()
  const colors = useGetAllLeatherColors()

  const { mutateAsync } = useMutation(leatherColorsService.create, {
    onSuccess: ({ _id, title }) => {
      queryClient.setQueryData(queryKey.GET_ALL_COLORS, [...colors, { _id, title }])
    },
  })

  return mutateAsync
}
