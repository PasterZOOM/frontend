import { useQuery } from 'react-query'

import { queryKey } from '@/enums/queryKey'
import { LeatherArticleType } from '@/features/leatherArticles/api/types'
import { useSrmServiceStore } from '@/store/crmServises'

export const useGetLeatherArticle = (
  articleId: string,
  enabled?: boolean
): LeatherArticleType | undefined => {
  const leatherArticlesService = useSrmServiceStore(state => state.leatherArticlesService)

  const { data } = useQuery(
    [queryKey.GET_ARTICLE, articleId],
    async () => leatherArticlesService.getOne(articleId),
    { enabled }
  )

  return data
}
