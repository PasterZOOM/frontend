import { useMutation, useQueryClient } from 'react-query'

import { BasicProductsAPI } from '@/features/basicProducts/api/basicProductsAPI'
import { BasicProductType } from '@/features/basicProducts/api/types'
import { UpdateParamsType } from '@/shared/api/paramsTypes'
import { QUERY_KEY } from '@/shared/enums/QUERY_KEY'
import { useLocale } from '@/shared/lib/hooks/useLocale'
import { UseMutationHook } from '@/shared/types/hooks/useMutationHook'

export const useAddBasicProductPhoto: UseMutationHook<
  BasicProductType,
  unknown,
  UpdateParamsType<{ [key: string]: string[] }>
> = options => {
  const locale = useLocale()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: BasicProductsAPI.addPhoto,
    onSuccess: async data => {
      queryClient.setQueryData([QUERY_KEY.GET_BASIC_PRODUCT, data._id, locale], data)
    },
    ...options,
  })
}
