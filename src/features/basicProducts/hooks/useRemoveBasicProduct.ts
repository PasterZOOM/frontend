import { useMutation, useQueryClient } from 'react-query'

import { QUERY_KEY } from 'enums/QUERY_KEY'
import { BasicProductsAPI } from 'features/basicProducts/api/basicProductsAPI'
import { BasicProductType } from 'features/basicProducts/api/types'
import { UseMutationHook } from 'types/hooks/useMutationHook'

export const useRemoveBasicProduct: UseMutationHook<
  BasicProductType,
  unknown,
  string
> = options => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: BasicProductsAPI.remove,
    onSuccess: async () => {
      await queryClient.invalidateQueries([QUERY_KEY.GET_ALL_BASIC_PRODUCTS])
    },
    ...options,
  })
}
