import { useQuery } from 'react-query'

import { QUERY_KEY } from 'enums/QUERY_KEY'
import { LeatherArticleType } from 'features/leatherArticles/api/types'
import { selectLeatherArticlesService, useSrmServiceStore } from 'store/crmServises'
import { UseQueryAllHook } from 'types/hooks/useQueryHooks'

export const useGetAllLeatherArticles: UseQueryAllHook<
  Pick<LeatherArticleType, '_id' | 'title'>[],
  unknown,
  [QUERY_KEY.GET_ALL_ARTICLES]
> = options => {
  const leatherArticlesService = useSrmServiceStore(selectLeatherArticlesService)

  return useQuery({
    queryKey: [QUERY_KEY.GET_ALL_ARTICLES],
    queryFn: leatherArticlesService.getAll,
    ...options,
  })
}
