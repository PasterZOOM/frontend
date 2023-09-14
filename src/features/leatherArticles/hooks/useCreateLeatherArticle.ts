import { useMutation, useQueryClient } from 'react-query'

import { LeatherArticlesAPI } from '@/features/leatherArticles/api/leatherArticlesAPI'
import {
  CreateLeatherArticleParamsType,
  LeatherArticleType,
} from '@/features/leatherArticles/api/types'
import { CreateType } from '@/shared/api/paramsTypes'
import { QUERY_KEY } from '@/shared/enums/QUERY_KEY'
import { useLocale } from '@/shared/lib/hooks/useLocale'
import { UseMutationHook } from '@/shared/types/hooks/useMutationHook'

export const useCreateLeatherArticle: UseMutationHook<
  LeatherArticleType,
  unknown,
  CreateType<CreateLeatherArticleParamsType>
> = options => {
  const locale = useLocale()
  const queryClient = useQueryClient()
  const articles = queryClient.getQueryData<LeatherArticleType[]>([
    QUERY_KEY.GET_ALL_ARTICLES,
    locale,
  ])

  return useMutation({
    mutationFn: LeatherArticlesAPI.create,
    onSuccess: ({ _id, title }) => {
      queryClient.setQueryData(
        [QUERY_KEY.GET_ALL_ARTICLES, locale],
        [...(articles ?? []), { _id, title }]
      )
    },
    ...options,
  })
}
