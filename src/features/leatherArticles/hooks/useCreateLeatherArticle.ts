import { UseMutateAsyncFunction, useMutation, useQueryClient } from 'react-query'

import { CreateType } from '@/api/paramsTypes'
import { queryKey } from '@/enums/queryKey'
import {
  CreateLeatherArticleParamsType,
  LeatherArticleType,
} from '@/features/leatherArticles/api/types'
import { useGetAllLeatherArticles } from '@/features/leatherArticles/hooks/useGetAllLeatherArticles'
import { useSrmServiceStore } from '@/store/crmServises'

export const useCreateLeatherArticle: UseCreateLeatherArticleType = () => {
  const leatherArticlesService = useSrmServiceStore(state => state.leatherArticlesService)

  const queryClient = useQueryClient()
  const articles = useGetAllLeatherArticles()

  const { mutateAsync } = useMutation(leatherArticlesService.create, {
    onSuccess: ({ _id, title }) => {
      queryClient.setQueryData(queryKey.GET_ALL_ARTICLES, [...articles, { _id, title }])
    },
  })

  return mutateAsync
}

type UseCreateLeatherArticleType = () => CreateLeatherArticleFnType
type CreateLeatherArticleFnType = UseMutateAsyncFunction<
  LeatherArticleType,
  unknown,
  CreateType<CreateLeatherArticleParamsType>
>
