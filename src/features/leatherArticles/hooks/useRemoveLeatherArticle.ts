import { useMutation, useQueryClient } from 'react-query'

import { LeatherArticlesAPI } from '@/features/leatherArticles/api/leatherArticlesAPI'
import { LeatherArticleType } from '@/features/leatherArticles/api/types'
import { QUERY_KEY } from '@/shared/enums/QUERY_KEY'
import { useLocale } from '@/shared/lib/hooks/useLocale'
import { UseMutationHook } from '@/shared/types/hooks/useMutationHook'

export const useRemoveLeatherArticle: UseMutationHook<
  LeatherArticleType,
  unknown,
  { articleId: string; factoryId: string }
> = options => {
  const locale = useLocale()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: LeatherArticlesAPI.remove,
    onSuccess: async () => {
      await queryClient.invalidateQueries([QUERY_KEY.GET_ALL_ARTICLES, locale])
      await queryClient.invalidateQueries([QUERY_KEY.GET_ALL_COLORS, locale])
    },
    ...options,
  })
}
