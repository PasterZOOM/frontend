import { useQuery } from 'react-query'

import { LeatherArticleType } from '@/api/crm/leatherArticlesApi/types'
import { queryKey } from '@/enums/crm/queryKey'
import { useSrmServiceStore } from '@/store/crmServises'

export const useGetAllLeatherArticles = (): Pick<LeatherArticleType, '_id' | 'name'>[] => {
  const leatherArticlesService = useSrmServiceStore(state => state.leatherArticlesService)

  const { data } = useQuery(queryKey.GET_ALL_ARTICLES, leatherArticlesService.getAll)

  return data || []
}
