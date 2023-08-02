import { useQuery } from 'react-query'

import { QUERY_KEY } from 'enums/QUERY_KEY'
import { LeatherArticlesAPI } from 'features/leatherArticles/api/leatherArticlesAPI'
import { LeatherArticleType } from 'features/leatherArticles/api/types'
import { useLocale } from 'hooks/useLocale'
import { UseQueryAllHook } from 'types/hooks/useQueryHooks'
import { LOCALES } from 'types/localeType'

export const useGetAllLeatherArticles: UseQueryAllHook<
  LeatherArticleType[],
  unknown,
  [QUERY_KEY.GET_ALL_ARTICLES, LOCALES]
> = options => {
  const locale = useLocale()

  return useQuery({
    queryKey: [QUERY_KEY.GET_ALL_ARTICLES, locale],
    queryFn: LeatherArticlesAPI.getAll,
    ...options,
  })
}
