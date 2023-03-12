import { UseMutateAsyncFunction, useMutation, useQueryClient } from 'react-query'

import { LeatherArticleType } from '@/api/crm/leatherArticlesApi/types'
import { queryKey } from '@/enums/crm/queryKey'
import { useSrmServiceStore } from '@/store/crmServises'

export const useRemoveLeatherArticle = (): UseMutateAsyncFunction<
  LeatherArticleType,
  unknown,
  string,
  unknown
> => {
  const leatherArticlesService = useSrmServiceStore(state => state.leatherArticlesService)

  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation(leatherArticlesService.remove, {
    onSuccess: async () => {
      await queryClient.invalidateQueries([queryKey.GET_ALL_ARTICLES])
    },
  })

  return mutateAsync
}
