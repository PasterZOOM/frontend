import { useMutation, useQueryClient } from 'react-query'

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

  const updateLeatherArticle: UpdateLeatherArticleFnType = async params => {
    return mutateAsync({ _id, params })
  }

  const updateLeatherArticleTitle: UpdateLeatherArticleTitleFnType = async title => {
    await updateLeatherArticle({ title })
  }
  const updateLeatherArticleDescription: UpdateLeatherArticleDescriptionFnType =
    async description => {
      await updateLeatherArticle({ description })
    }

  return {
    updateLeatherArticle,
    updateLeatherArticleTitle,
    updateLeatherArticleDescription,
  }
}

type UseUpdateLeatherArticleType = (_id: string) => {
  updateLeatherArticle: UpdateLeatherArticleFnType
  updateLeatherArticleTitle: UpdateLeatherArticleTitleFnType
  updateLeatherArticleDescription: UpdateLeatherArticleDescriptionFnType
}
type UpdateLeatherArticleFnType = (
  params: Partial<UpdateLeatherArticleParamsType>
) => Promise<LeatherArticleType>
type UpdateLeatherArticleTitleFnType = (title: string) => Promise<void>
type UpdateLeatherArticleDescriptionFnType = (description: string) => Promise<void>
