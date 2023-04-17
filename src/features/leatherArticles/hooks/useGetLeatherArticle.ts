import { useQuery, UseQueryOptions } from 'react-query'
import { UseQueryResult } from 'react-query/types/react/types'

import { queryKey } from '@/enums/queryKey'
import { LeatherArticleType } from '@/features/leatherArticles/api/types'
import { selectLeatherArticlesService, useSrmServiceStore } from '@/store/crmServises'

export const useGetLeatherArticle: UseGetLeatherArticleType = (articleId, options) => {
  const leatherArticlesService = useSrmServiceStore(selectLeatherArticlesService)

  return useQuery(
    [queryKey.GET_ARTICLE, articleId],
    () => leatherArticlesService.getOne(articleId),
    options
  )
}
type UseGetLeatherArticleType = (
  articleId: string,
  options?: Omit<UseQueryOptions<LeatherArticleType>, 'queryKey' | 'queryFn'>
) => UseQueryResult<LeatherArticleType>
