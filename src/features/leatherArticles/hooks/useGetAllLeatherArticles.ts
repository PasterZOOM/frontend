import { useQuery } from 'react-query'

import { queryKey } from '@/enums/queryKey'
import { LeatherArticleType } from '@/features/leatherArticles/api/types'
import { useSrmServiceStore } from '@/store/crmServises'

export const useGetAllLeatherArticles = (
  enabled = true
): Pick<LeatherArticleType, '_id' | 'name'>[] => {
  const leatherArticlesService = useSrmServiceStore(state => state.leatherArticlesService)

  const { data } = useQuery(queryKey.GET_ALL_ARTICLES, leatherArticlesService.getAll, { enabled })

  return data || []
}
