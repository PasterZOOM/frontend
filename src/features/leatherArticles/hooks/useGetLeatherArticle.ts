import { useQuery } from 'react-query'

import { QUERY_KEY } from 'enums/QUERY_KEY'
import { LeatherArticlesAPI } from 'features/leatherArticles/api/leatherArticlesAPI'
import { LeatherArticleType } from 'features/leatherArticles/api/types'
import { UseQueryOneHook } from 'types/hooks/useQueryHooks'

export const useGetLeatherArticle: UseQueryOneHook<
  LeatherArticleType,
  unknown,
  [QUERY_KEY.GET_ARTICLE, string]
> = (id, options) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_ARTICLE, id],
    queryFn: () => LeatherArticlesAPI.getOne(id),
    ...options,
  })
}
