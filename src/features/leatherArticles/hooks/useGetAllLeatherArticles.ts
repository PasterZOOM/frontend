import { useQuery, UseQueryOptions } from 'react-query'
import { UseQueryResult } from 'react-query/types/react/types'

import { queryKey } from '@/enums/queryKey'
import { LeatherArticleType } from '@/features/leatherArticles/api/types'
import { useSrmServiceStore } from '@/store/crmServises'

export const useGetAllLeatherArticles: UseGetAllLeatherArticlesType = options => {
  const leatherArticlesService = useSrmServiceStore(state => state.leatherArticlesService)

  return useQuery(queryKey.GET_ALL_ARTICLES, leatherArticlesService.getAll, options)
}

type UseGetAllLeatherArticlesType = (
  options?: Omit<
    UseQueryOptions<Pick<LeatherArticleType, '_id' | 'title'>[]>,
    'queryKey' | 'queryFn'
  >
) => UseQueryResult<Pick<LeatherArticleType, '_id' | 'title'>[]>
