import { useQuery } from 'react-query'

import { QUERY_KEY } from 'enums/QUERY_KEY'
import { LeatherArticlesAPI } from 'features/leatherArticles/api/leatherArticlesAPI'
import { LeatherArticleType } from 'features/leatherArticles/api/types'
import { UseQueryAllHook } from 'types/hooks/useQueryHooks'

export const useGetAllLeatherArticles: UseQueryAllHook<
  LeatherArticleType[],
  unknown,
  [QUERY_KEY.GET_ALL_ARTICLES]
> = options => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_ALL_ARTICLES],
    queryFn: LeatherArticlesAPI.getAll,
    ...options,
  })
}
