import { UseMutateAsyncFunction, useMutation, useQueryClient } from 'react-query'

import { queryKey } from '@/enums/queryKey'
import {
  LeatherArticleType,
  UpdateLeatherArticleParamsType,
} from '@/features/leatherArticles/api/types'
import { useSrmServiceStore } from '@/store/crmServises'

export const useUpdateLeatherArticle: UseUpdateLeatherArticleType = _id => {
  const leatherArticlesService = useSrmServiceStore(state => state.leatherArticlesService)

  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation(leatherArticlesService.update, {
    onSuccess: async data => {
      await queryClient.setQueryData([queryKey.GET_ARTICLE, data._id], data)
      await queryClient.invalidateQueries([queryKey.GET_ALL_ARTICLES])
    },
  })

  return params => mutateAsync({ _id, params })
}

type UseUpdateLeatherArticleType = (
  _id: string
) => UseMutateAsyncFunction<LeatherArticleType, unknown, Partial<UpdateLeatherArticleParamsType>>
