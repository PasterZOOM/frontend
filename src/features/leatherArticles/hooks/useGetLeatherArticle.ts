import { useQuery } from 'react-query'

import { QUERY_KEY } from 'enums/QUERY_KEY'
import { LeatherArticlesAPI } from 'features/leatherArticles/api/leatherArticlesAPI'
import { LeatherArticleType } from 'features/leatherArticles/api/types'
import { useLocale } from 'hooks/useLocale'
import { UseQueryOneHook } from 'types/hooks/useQueryHooks'
import { LOCALES } from 'types/localeType'

export const useGetLeatherArticle: UseQueryOneHook<
  LeatherArticleType,
  unknown,
  [QUERY_KEY.GET_ARTICLE, string, LOCALES]
> = (id, options) => {
  const locale = useLocale()

  return useQuery({
    queryKey: [QUERY_KEY.GET_ARTICLE, id, locale],
    queryFn: () => LeatherArticlesAPI.getOne(id),
    ...options,
  })
}
