import { useMutation, useQueryClient } from 'react-query'
import { UseMutationOptions, UseMutationResult } from 'react-query/types/react/types'

import { CreateType } from 'api/paramsTypes'
import { queryKey } from 'enums/queryKey'
import {
  CreateLeatherArticleParamsType,
  LeatherArticleType,
} from 'features/leatherArticles/api/types'
import { selectLeatherArticlesService, useSrmServiceStore } from 'store/crmServises'

export const useCreateLeatherArticle: UseCreateLeatherArticleType = options => {
  const leatherArticlesService = useSrmServiceStore(selectLeatherArticlesService)

  const queryClient = useQueryClient()
  const articles = queryClient.getQueryData<Pick<LeatherArticleType, '_id' | 'title'>[]>(
    queryKey.GET_ALL_ARTICLES
  )

  return useMutation(leatherArticlesService.create, {
    onSuccess: ({ _id, title }) => {
      queryClient.setQueryData(queryKey.GET_ALL_ARTICLES, [...(articles ?? []), { _id, title }])
    },
    ...options,
  })
}

type UseCreateLeatherArticleType = (
  options?: Omit<
    UseMutationOptions<LeatherArticleType, unknown, CreateType<CreateLeatherArticleParamsType>>,
    'mutationFn'
  >
) => UseMutationResult<LeatherArticleType, unknown, CreateType<CreateLeatherArticleParamsType>>
