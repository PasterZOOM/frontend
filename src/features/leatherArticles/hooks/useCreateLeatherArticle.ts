import { UseMutateAsyncFunction, useMutation, useQueryClient } from 'react-query'

import { CreateType } from '@/api/paramsTypes'
import { queryKey } from '@/enums/queryKey'
import {
  CreateLeatherArticleParamsType,
  LeatherArticleType,
} from '@/features/leatherArticles/api/types'
import { useGetAllLeatherArticles } from '@/features/leatherArticles/hooks/useGetAllLeatherArticles'
import { useSrmServiceStore } from '@/store/crmServises'

export const useCreateLeatherArticle = (): UseMutateAsyncFunction<
  LeatherArticleType,
  unknown,
  CreateType<CreateLeatherArticleParamsType>,
  unknown
> => {
  const leatherArticlesService = useSrmServiceStore(state => state.leatherArticlesService)

  const queryClient = useQueryClient()
  const articles = useGetAllLeatherArticles()

  const { mutateAsync } = useMutation(leatherArticlesService.create, {
    onSuccess: ({ _id, name }) => {
      queryClient.setQueryData(queryKey.GET_ALL_ARTICLES, [...articles, { _id, name }])
    },
  })

  return mutateAsync
}
