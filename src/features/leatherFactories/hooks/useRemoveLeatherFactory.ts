import { useMutation, useQueryClient } from 'react-query'

import { LeatherFactoriesAPI } from '@/features/leatherFactories/api/leatherFactoriesAPI'
import { LeatherFactoryType } from '@/features/leatherFactories/api/types'
import { QUERY_KEY } from '@/shared/enums/QUERY_KEY'
import { useLocale } from '@/shared/lib/hooks/useLocale'
import { UseMutationHook } from '@/shared/types/hooks/useMutationHook'

export const useRemoveLeatherFactory: UseMutationHook<
  LeatherFactoryType,
  unknown,
  string
> = option => {
  const locale = useLocale()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: LeatherFactoriesAPI.remove,
    onSuccess: async () => {
      await queryClient.invalidateQueries([QUERY_KEY.GET_ALL_FACTORIES, locale])
      await queryClient.invalidateQueries([QUERY_KEY.GET_ALL_ARTICLES, locale])
      await queryClient.invalidateQueries([QUERY_KEY.GET_ALL_COLORS, locale])
    },
    ...option,
  })
}
