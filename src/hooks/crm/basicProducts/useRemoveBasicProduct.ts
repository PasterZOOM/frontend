import { UseMutateAsyncFunction, useMutation, useQueryClient } from 'react-query'

import { BasicProductType } from '@/api/crm/basicProductsApi/types'
import { queryKey } from '@/enums/crm/queryKey'
import { useSrmServiceStore } from '@/store/crmServises'

export const useRemoveBasicProduct = (): UseMutateAsyncFunction<
  BasicProductType,
  unknown,
  string,
  unknown
> => {
  const basicProductsService = useSrmServiceStore(state => state.basicProductsService)

  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation(basicProductsService.remove, {
    onSuccess: async () => {
      await queryClient.invalidateQueries([queryKey.GET_ALL_BASIC_PRODUCTS])
    },
  })

  return mutateAsync
}
