import { useQuery } from 'react-query'

import { LeatherArticlesAPI } from 'features/leatherArticles/api/leatherArticlesAPI'
import { LeatherArticleType } from 'features/leatherArticles/api/types'
import { QUERY_KEY } from 'shared/enums/QUERY_KEY'
import { useLocale } from 'shared/lib/hooks/useLocale'
import { UseQueryOneHook } from 'shared/types/hooks/useQueryHooks'
import { LOCALES } from 'shared/types/localeType'

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
