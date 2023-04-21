import { useMutation, useQueryClient } from 'react-query'

import { UpdateParamsType } from 'api/paramsTypes'
import { QUERY_KEY } from 'enums/QUERY_KEY'
import {
  LeatherArticleType,
  UpdateLeatherArticleParamsType,
} from 'features/leatherArticles/api/types'
import { selectLeatherArticlesService, useSrmServiceStore } from 'store/crmServises'
import { UseMutationHook } from 'types/hooks/useMutationHook'

export const useUpdateLeatherArticle: UseMutationHook<
  LeatherArticleType,
  unknown,
  UpdateParamsType<UpdateLeatherArticleParamsType>
> = options => {
  const leatherArticlesService = useSrmServiceStore(selectLeatherArticlesService)

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: leatherArticlesService.update,
    onSuccess: async (data, variables) => {
      await queryClient.setQueryData([QUERY_KEY.GET_ARTICLE, data._id], data)
      if (variables.params.title) {
        await queryClient.invalidateQueries([QUERY_KEY.GET_ALL_ARTICLES])
      }
    },
    ...options,
  })
}
