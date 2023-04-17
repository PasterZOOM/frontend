import { useRouter } from 'next/router'
import { useQuery, UseQueryOptions } from 'react-query'
import { UseQueryResult } from 'react-query/types/react/types'

import { queryKey } from '@/enums/queryKey'
import { BasicProductType } from '@/features/basicProducts/api/types'
import { selectBasicProductsService, useSrmServiceStore } from '@/store/crmServises'
import { getQueryFilters } from '@/utils/filters/getQueryFilters'

export const useGetAllBasicProducts: UseGetAllBasicProductsType = options => {
  const { query } = useRouter()

  const filters = getQueryFilters(query)

  const basicProductsService = useSrmServiceStore(selectBasicProductsService)

  return useQuery(
    [queryKey.GET_ALL_BASIC_PRODUCTS, filters],
    () => basicProductsService.getAll(filters),
    options
  )
}

type UseGetAllBasicProductsType = (
  options?: Omit<UseQueryOptions<BasicProductType[]>, 'queryKey' | 'queryFn'>
) => UseQueryResult<BasicProductType[]>
