import { useMutation, useQueryClient } from 'react-query'

import { QUERY_KEY } from 'enums/QUERY_KEY'
import { BasicProductType } from 'features/basicProducts/api/types'
import { selectBasicProductsService, useSrmServiceStore } from 'store/crmServises'
import { UseMutationHook } from 'types/hooks/useMutationHook'

export const useRemoveBasicProduct: UseMutationHook<
  BasicProductType,
  unknown,
  string
> = options => {
  const basicProductsService = useSrmServiceStore(selectBasicProductsService)

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: basicProductsService.remove,
    onSuccess: async () => {
      await queryClient.invalidateQueries([QUERY_KEY.GET_ALL_BASIC_PRODUCTS])
    },
    ...options,
  })
}
