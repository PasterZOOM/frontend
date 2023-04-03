import { useQuery, UseQueryOptions } from 'react-query'

import { queryKey } from '@/enums/queryKey'
import { LeatherArticleType } from '@/features/leatherArticles/api/types'
import { useSrmServiceStore } from '@/store/crmServises'

export const useGetLeatherArticle: UseGetLeatherArticleType = (articleId, options) => {
  const leatherArticlesService = useSrmServiceStore(state => state.leatherArticlesService)

  const { data } = useQuery(
    [queryKey.GET_ARTICLE, articleId],
    () => leatherArticlesService.getOne(articleId),
    options
  )

  return data
}
type UseGetLeatherArticleType = (
  articleId: string,
  options?: Omit<UseQueryOptions<LeatherArticleType>, 'queryKey' | 'queryFn'>
) => LeatherArticleType | undefined
