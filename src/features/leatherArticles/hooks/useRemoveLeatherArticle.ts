import { useMutation, useQueryClient } from 'react-query'

import { QUERY_KEY } from 'enums/QUERY_KEY'
import { LeatherArticleType } from 'features/leatherArticles/api/types'
import { selectLeatherArticlesService, useSrmServiceStore } from 'store/crmServises'
import { UseMutationHook } from 'types/hooks/useMutationHook'

export const useRemoveLeatherArticle: UseMutationHook<
  LeatherArticleType,
  unknown,
  string
> = options => {
  const leatherArticlesService = useSrmServiceStore(selectLeatherArticlesService)

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: leatherArticlesService.remove,
    onSuccess: async () => {
      await queryClient.invalidateQueries([QUERY_KEY.GET_ALL_ARTICLES])
      await queryClient.invalidateQueries([QUERY_KEY.GET_ALL_COLORS])
    },
    ...options,
  })
}
