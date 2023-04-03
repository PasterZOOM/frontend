import { useQuery, UseQueryOptions } from 'react-query'

import { queryKey } from '@/enums/queryKey'
import { LeatherArticleType } from '@/features/leatherArticles/api/types'
import { useSrmServiceStore } from '@/store/crmServises'

export const useGetAllLeatherArticles: UseGetAllLeatherArticlesType = options => {
  const leatherArticlesService = useSrmServiceStore(state => state.leatherArticlesService)

  const { data } = useQuery(queryKey.GET_ALL_ARTICLES, leatherArticlesService.getAll, options)

  return data || []
}

type UseGetAllLeatherArticlesType = (
  options?: Omit<
    UseQueryOptions<Pick<LeatherArticleType, '_id' | 'title'>[]>,
    'queryKey' | 'queryFn'
  >
) => Pick<LeatherArticleType, '_id' | 'title'>[]
