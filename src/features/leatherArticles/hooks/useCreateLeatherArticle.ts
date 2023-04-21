import { useMutation, useQueryClient } from 'react-query'

import { CreateType } from 'api/paramsTypes'
import { QUERY_KEY } from 'enums/QUERY_KEY'
import {
  CreateLeatherArticleParamsType,
  LeatherArticleType,
} from 'features/leatherArticles/api/types'
import { selectLeatherArticlesService, useSrmServiceStore } from 'store/crmServises'
import { UseMutationHook } from 'types/hooks/useMutationHook'

export const useCreateLeatherArticle: UseMutationHook<
  LeatherArticleType,
  unknown,
  CreateType<CreateLeatherArticleParamsType>
> = options => {
  const leatherArticlesService = useSrmServiceStore(selectLeatherArticlesService)

  const queryClient = useQueryClient()
  const articles = queryClient.getQueryData<Pick<LeatherArticleType, '_id' | 'title'>[]>(
    QUERY_KEY.GET_ALL_ARTICLES
  )

  return useMutation({
    mutationFn: leatherArticlesService.create,
    onSuccess: ({ _id, title }) => {
      queryClient.setQueryData(QUERY_KEY.GET_ALL_ARTICLES, [...(articles ?? []), { _id, title }])
    },
    ...options,
  })
}
