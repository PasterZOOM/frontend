import { useQuery } from 'react-query'

import { QUERY_KEY } from 'enums/QUERY_KEY'
import { LeatherArticleType } from 'features/leatherArticles/api/types'
import { selectLeatherArticlesService, useSrmServiceStore } from 'store/crmServises'
import { UseQueryOneHook } from 'types/hooks/useQueryHooks'

export const useGetLeatherArticle: UseQueryOneHook<
  LeatherArticleType,
  unknown,
  [QUERY_KEY.GET_ARTICLE, string]
> = (id, options) => {
  const leatherArticlesService = useSrmServiceStore(selectLeatherArticlesService)

  return useQuery({
    queryKey: [QUERY_KEY.GET_ARTICLE, id],
    queryFn: () => leatherArticlesService.getOne(id),
    ...options,
  })
}
