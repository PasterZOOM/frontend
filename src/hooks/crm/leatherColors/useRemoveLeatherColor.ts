import { UseMutateAsyncFunction, useMutation, useQueryClient } from 'react-query'

import { LeatherColorType } from '@/api/crm/leatherColorsApi/types'
import { queryKey } from '@/enums/crm/queryKey'
import { useSrmServiceStore } from '@/store/crmServises'

export const useRemoveLeatherColor = (): UseMutateAsyncFunction<
  LeatherColorType,
  unknown,
  string,
  unknown
> => {
  const leatherColorsService = useSrmServiceStore(state => state.leatherColorsService)

  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation(leatherColorsService.remove, {
    onSuccess: async () => {
      await queryClient.invalidateQueries([queryKey.GET_ALL_COLORS])
    },
  })

  return mutateAsync
}
