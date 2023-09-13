import { useMutation, useQueryClient } from 'react-query'

import { LeatherArticlesAPI } from 'features/leatherArticles/api/leatherArticlesAPI'
import {
  LeatherArticleType,
  UpdateLeatherArticleParamsType,
} from 'features/leatherArticles/api/types'
import { UpdateParamsType } from 'shared/api/paramsTypes'
import { QUERY_KEY } from 'shared/enums/QUERY_KEY'
import { useLocale } from 'shared/lib/hooks/useLocale'
import { UseMutationHook } from 'shared/types/hooks/useMutationHook'

export const useUpdateLeatherArticle: UseMutationHook<
  LeatherArticleType,
  unknown,
  UpdateParamsType<UpdateLeatherArticleParamsType>
> = options => {
  const locale = useLocale()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: LeatherArticlesAPI.update,
    onSuccess: async (data, variables) => {
      queryClient.setQueryData([QUERY_KEY.GET_ARTICLE, data._id, locale], data)
      if (variables.data.title) {
        await queryClient.invalidateQueries([QUERY_KEY.GET_ALL_ARTICLES, locale])
      }
    },
    ...options,
  })
}
