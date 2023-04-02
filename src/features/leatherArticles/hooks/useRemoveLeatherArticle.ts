import { UseMutateAsyncFunction, useMutation, useQueryClient } from 'react-query'

import { queryKey } from '@/enums/queryKey'
import { LeatherArticleType } from '@/features/leatherArticles/api/types'
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
      await queryClient.invalidateQueries([queryKey.GET_ALL_COLORS])
    },
  })

  return mutateAsync
}
