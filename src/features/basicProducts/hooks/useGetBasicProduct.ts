import { useQuery, UseQueryOptions } from 'react-query'
import { UseQueryResult } from 'react-query/types/react/types'

import { queryKey } from '@/enums/queryKey'
import { BasicProductType } from '@/features/basicProducts/api/types'
import { selectBasicProductsService, useSrmServiceStore } from '@/store/crmServises'

export const useGetBasicProduct: UseGetBasicProductType = (_id, options) => {
  const basicProductsService = useSrmServiceStore(selectBasicProductsService)

  return useQuery(
    [queryKey.GET_BASIC_PRODUCT, _id],
    () => basicProductsService.getOne(_id),
    options
  )
}

type UseGetBasicProductType = (
  _id: string,
  options?: Omit<UseQueryOptions<BasicProductType>, 'queryKey' | 'queryFn'>
) => UseQueryResult<BasicProductType>
