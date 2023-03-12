import { useQuery } from 'react-query'

import { LeatherArticleType } from '@/api/crm/leatherArticlesApi/types'
import { queryKey } from '@/enums/crm/queryKey'
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
