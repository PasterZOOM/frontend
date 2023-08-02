import { useMutation, useQueryClient } from 'react-query'

import { LeatherArticlesAPI } from 'features/leatherArticles/api/leatherArticlesAPI'
import { LeatherArticleType } from 'features/leatherArticles/api/types'
import { QUERY_KEY } from 'shared/enums/QUERY_KEY'
import { UseMutationHook } from 'types/hooks/useMutationHook'

export const useRemoveLeatherArticle: UseMutationHook<
  LeatherArticleType,
  unknown,
  string
> = options => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: LeatherArticlesAPI.remove,
    onSuccess: async () => {
      await queryClient.invalidateQueries([QUERY_KEY.GET_ALL_ARTICLES])
      await queryClient.invalidateQueries([QUERY_KEY.GET_ALL_COLORS])
    },
    ...options,
  })
}
