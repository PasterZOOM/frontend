import { useMutation, useQueryClient } from 'react-query'
import { UseMutationOptions, UseMutationResult } from 'react-query/types/react/types'

import { queryKey } from 'enums/queryKey'
import { BasicProductType } from 'features/basicProducts/api/types'
import { selectBasicProductsService, useSrmServiceStore } from 'store/crmServises'

export const useRemoveBasicProduct: UseRemoveBasicProductType = options => {
  const basicProductsService = useSrmServiceStore(selectBasicProductsService)

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: basicProductsService.remove,
    onSuccess: async () => {
      await queryClient.invalidateQueries([queryKey.GET_ALL_BASIC_PRODUCTS])
    },
    ...options,
  })
}

type UseRemoveBasicProductType<TData = BasicProductType, TError = unknown, TVariables = string> = (
  options?: Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'>
) => UseMutationResult<TData, TError, TVariables>
