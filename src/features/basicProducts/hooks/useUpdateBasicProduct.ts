import { useMutation, useQueryClient } from 'react-query'
import { UseMutationOptions, UseMutationResult } from 'react-query/types/react/types'

import { UpdateParamsType } from 'api/paramsTypes'
import { queryKey } from 'enums/queryKey'
import { BasicProductType, UpdateBasicProductParamsType } from 'features/basicProducts/api/types'
import { selectBasicProductsService, useSrmServiceStore } from 'store/crmServises'

export const useUpdateBasicProduct: UseUpdateBasicProductType = options => {
  const basicProductsService = useSrmServiceStore(selectBasicProductsService)

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: basicProductsService.update,
    onSuccess: async data => {
      await queryClient.setQueryData([queryKey.GET_BASIC_PRODUCT, data._id], data)
      await queryClient.invalidateQueries([queryKey.GET_ALL_BASIC_PRODUCTS])
    },
    ...options,
  })
}

type UseUpdateBasicProductType<
  TData = BasicProductType,
  TError = unknown,
  TVariables = UpdateParamsType<UpdateBasicProductParamsType>
> = (
  options?: Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'>
) => UseMutationResult<TData, TError, TVariables>
