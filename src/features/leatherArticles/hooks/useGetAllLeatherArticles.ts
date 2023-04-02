import { useQuery, UseQueryOptions } from 'react-query'

import { queryKey } from '@/enums/queryKey'
import { LeatherArticleType } from '@/features/leatherArticles/api/types'
import { useSrmServiceStore } from '@/store/crmServises'
// TODO: добавить options во все хуки с useQuery
export const useGetAllLeatherArticles = (
  options?: Omit<
    UseQueryOptions<
      unknown,
      unknown,
      Pick<LeatherArticleType, '_id' | 'title'>[],
      queryKey.GET_ALL_ARTICLES
    >,
    'queryKey' | 'queryFn'
  >
): Pick<LeatherArticleType, '_id' | 'title'>[] => {
  const leatherArticlesService = useSrmServiceStore(state => state.leatherArticlesService)

  const { data } = useQuery(queryKey.GET_ALL_ARTICLES, leatherArticlesService.getAll, options)

  return data || []
}
