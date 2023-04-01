import { useMutation, useQueryClient } from 'react-query'

import {
  LeatherArticleType,
  UpdateLeatherArticleParamsType,
} from '@/api/crm/leatherArticlesApi/types'
import { queryKey } from '@/enums/crm/queryKey'
import { useSrmServiceStore } from '@/store/crmServises'

export const useUpdateLeatherArticle = (
  _id: string
): {
  updateLeatherArticle: (
    params: Partial<UpdateLeatherArticleParamsType>
  ) => Promise<LeatherArticleType>
  updateLeatherArticleName: (title: string) => Promise<void>
  updateLeatherArticleDescription: (description: string) => Promise<void>
} => {
  const leatherArticlesService = useSrmServiceStore(state => state.leatherArticlesService)

  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation(leatherArticlesService.update, {
    onSuccess: async data => {
      await queryClient.setQueryData([queryKey.GET_ARTICLE, data._id], data)
      await queryClient.invalidateQueries([queryKey.GET_ALL_ARTICLES])
    },
  })
  const updateLeatherArticle = async (
    params: Partial<UpdateLeatherArticleParamsType>
  ): Promise<LeatherArticleType> => {
    return mutateAsync({ _id, params })
  }

  const updateLeatherArticleName = async (name: string): Promise<void> => {
    await updateLeatherArticle({ name })
  }
  const updateLeatherArticleDescription = async (description: string): Promise<void> => {
    await updateLeatherArticle({ description })
  }

  return {
    updateLeatherArticle,
    updateLeatherArticleName,
    updateLeatherArticleDescription,
  }
}
