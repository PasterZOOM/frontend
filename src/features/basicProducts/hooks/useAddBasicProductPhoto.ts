import { useMutation, useQueryClient } from 'react-query'

import { UpdateParamsType } from 'api/paramsTypes'
import { queryKey } from 'enums/queryKey'
import { BasicProductType } from 'features/basicProducts/api/types'
import { selectBasicProductsService, useSrmServiceStore } from 'store/crmServises'
import { UseMutationHook } from 'types/hooks/useMutationHook'

export const useAddBasicProductPhoto: UseMutationHook<
  BasicProductType,
  unknown,
  UpdateParamsType<{ [key: string]: string[] }>
> = options => {
  const basicProductsService = useSrmServiceStore(selectBasicProductsService)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: basicProductsService.addPhoto,
    onSuccess: async data => {
      await queryClient.setQueryData([queryKey.GET_BASIC_PRODUCT, data._id], data)
    },
    ...options,
  })
}
