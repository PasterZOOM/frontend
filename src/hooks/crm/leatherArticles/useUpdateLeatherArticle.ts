import { UseMutateAsyncFunction, useMutation, useQueryClient } from 'react-query'

import {
  LeatherArticleType,
  UpdateLeatherArticleParamsType,
} from '@/api/crm/leatherArticlesApi/types'
import { queryKey } from '@/enums/crm/queryKey'
import { useSrmServiceStore } from '@/store/crmServises'

export const useUpdateLeatherArticle = (): UseMutateAsyncFunction<
  LeatherArticleType,
  unknown,
  Partial<UpdateLeatherArticleParamsType>,
  unknown
> => {
  const leatherArticlesService = useSrmServiceStore(state => state.leatherArticlesService)

  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation(leatherArticlesService.update, {
    onSuccess: async data => {
      await queryClient.setQueryData([queryKey.GET_ARTICLE, data._id], data)
      await queryClient.invalidateQueries([queryKey.GET_ALL_ARTICLES])
    },
  })

  return mutateAsync
}
