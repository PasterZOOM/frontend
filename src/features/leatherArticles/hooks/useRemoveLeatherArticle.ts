import { useMutation, useQueryClient } from 'react-query'
import { UseMutationOptions, UseMutationResult } from 'react-query/types/react/types'

import { queryKey } from '@/enums/queryKey'
import { LeatherArticleType } from '@/features/leatherArticles/api/types'
import { useSrmServiceStore } from '@/store/crmServises'

export const useRemoveLeatherArticle: UseRemoveLeatherArticleType = options => {
  const leatherArticlesService = useSrmServiceStore(state => state.leatherArticlesService)

  const queryClient = useQueryClient()

  return useMutation(leatherArticlesService.remove, {
    onSuccess: async () => {
      await queryClient.invalidateQueries([queryKey.GET_ALL_ARTICLES])
      await queryClient.invalidateQueries([queryKey.GET_ALL_COLORS])
    },
    ...options,
  })
}

type UseRemoveLeatherArticleType = (
  options?: Omit<UseMutationOptions<LeatherArticleType, unknown, string>, 'mutationFn'>
) => UseMutationResult<LeatherArticleType, unknown, string>
