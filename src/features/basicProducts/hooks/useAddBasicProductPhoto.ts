import { useMutation, useQueryClient } from 'react-query'

import { UpdateParamsType } from 'api/paramsTypes'
import { QUERY_KEY } from 'enums/QUERY_KEY'
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
      await queryClient.setQueryData([QUERY_KEY.GET_BASIC_PRODUCT, data._id], data)
    },
    ...options,
  })
}
