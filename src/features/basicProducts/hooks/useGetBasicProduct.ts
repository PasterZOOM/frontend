import { useQuery, UseQueryOptions } from 'react-query'

import { queryKey } from '@/enums/queryKey'
import { BasicProductType } from '@/features/basicProducts/api/types'
import { useSrmServiceStore } from '@/store/crmServises'

export const useGetBasicProduct: UseGetBasicProductType = (_id, options) => {
  const basicProductsService = useSrmServiceStore(state => state.basicProductsService)

  const { data } = useQuery(
    [queryKey.GET_BASIC_PRODUCT, _id],
    () => basicProductsService.getOne(_id),
    options
  )

  return data
}

type UseGetBasicProductType = (
  _id: string,
  options?: Omit<UseQueryOptions<BasicProductType>, 'queryKey' | 'queryFn'>
) => BasicProductType | undefined
