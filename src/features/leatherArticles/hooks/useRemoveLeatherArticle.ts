import { useMutation, useQueryClient } from 'react-query'

import { QUERY_KEY } from 'enums/QUERY_KEY'
import { LeatherArticlesAPI } from 'features/leatherArticles/api/leatherArticlesAPI'
import { LeatherArticleType } from 'features/leatherArticles/api/types'
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
