import { UseMutateAsyncFunction, useMutation, useQueryClient } from 'react-query'

import { queryKey } from '@/enums/queryKey'
import { LeatherColorType } from '@/features/leatherColors/api/types'
import { selectLeatherColorsService, useSrmServiceStore } from '@/store/crmServises'

export const useRemoveLeatherColor: UseRemoveLeatherColorType = () => {
  const leatherColorsService = useSrmServiceStore(selectLeatherColorsService)

  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation(leatherColorsService.remove, {
    onSuccess: async () => {
      await queryClient.invalidateQueries([queryKey.GET_ALL_COLORS])
    },
  })

  return mutateAsync
}

type UseRemoveLeatherColorType = () => UseMutateAsyncFunction<LeatherColorType, unknown, string>
