import { useMutation, useQueryClient } from 'react-query'

import { BasicProductsAPI } from 'features/basicProducts/api/basicProductsAPI'
import { BasicProductType } from 'features/basicProducts/api/types'
import { QUERY_KEY } from 'shared/enums/QUERY_KEY'
import { useLocale } from 'shared/lib/hooks/useLocale'
import { UseMutationHook } from 'types/hooks/useMutationHook'

export const useRemoveBasicProduct: UseMutationHook<
  BasicProductType,
  unknown,
  string
> = options => {
  const locale = useLocale()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: BasicProductsAPI.remove,
    onSuccess: async () => {
      await queryClient.invalidateQueries([QUERY_KEY.GET_ALL_BASIC_PRODUCTS, locale])
    },
    ...options,
  })
}
