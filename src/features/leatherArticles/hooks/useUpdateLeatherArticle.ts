import { useMutation, useQueryClient } from 'react-query'
import { UseMutationOptions, UseMutationResult } from 'react-query/types/react/types'

import { UpdateParamsType } from '@/api/paramsTypes'
import { queryKey } from '@/enums/queryKey'
import {
  LeatherArticleType,
  UpdateLeatherArticleParamsType,
} from '@/features/leatherArticles/api/types'
import { useSrmServiceStore } from '@/store/crmServises'

export const useUpdateLeatherArticle: UseUpdateLeatherArticleType = options => {
  const leatherArticlesService = useSrmServiceStore(state => state.leatherArticlesService)

  const queryClient = useQueryClient()

  return useMutation(leatherArticlesService.update, {
    onSuccess: async data => {
      await queryClient.setQueryData([queryKey.GET_ARTICLE, data._id], data)
      await queryClient.invalidateQueries([queryKey.GET_ALL_ARTICLES])
    },
    ...options,
  })
}

type UseUpdateLeatherArticleType = (
  options?: Omit<
    UseMutationOptions<
      LeatherArticleType,
      unknown,
      UpdateParamsType<UpdateLeatherArticleParamsType>
    >,
    'mutationFn'
  >
) => UseMutationResult<
  LeatherArticleType,
  unknown,
  UpdateParamsType<UpdateLeatherArticleParamsType>
>
