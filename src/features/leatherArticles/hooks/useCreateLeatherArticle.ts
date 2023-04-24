import { useMutation, useQueryClient } from 'react-query'

import { CreateType } from 'api/paramsTypes'
import { QUERY_KEY } from 'enums/QUERY_KEY'
import { LeatherArticlesAPI } from 'features/leatherArticles/api/leatherArticlesAPI'
import {
  CreateLeatherArticleParamsType,
  LeatherArticleType,
} from 'features/leatherArticles/api/types'
import { UseMutationHook } from 'types/hooks/useMutationHook'

export const useCreateLeatherArticle: UseMutationHook<
  LeatherArticleType,
  unknown,
  CreateType<CreateLeatherArticleParamsType>
> = options => {
  const queryClient = useQueryClient()
  const articles = queryClient.getQueryData<Pick<LeatherArticleType, '_id' | 'title'>[]>(
    QUERY_KEY.GET_ALL_ARTICLES
  )

  return useMutation({
    mutationFn: LeatherArticlesAPI.create,
    onSuccess: ({ _id, title }) => {
      queryClient.setQueryData(QUERY_KEY.GET_ALL_ARTICLES, [...(articles ?? []), { _id, title }])
    },
    ...options,
  })
}
