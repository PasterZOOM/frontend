import {
  CreateLeatherArticleParamsType,
  LeatherArticleType,
  UpdateLeatherArticleParamsType,
} from '@/features/leatherArticles/api/types'
import { instance } from '@/shared/api/instance/axios-instance'
import { CreateType, UpdateParamsType } from '@/shared/api/paramsTypes'

const BASE_URL = `/leather-articles`

export const LeatherArticlesAPI = {
  create: async ({ _id, data }: CreateType<CreateLeatherArticleParamsType>) => {
    const res = await instance.post<LeatherArticleType>(`${BASE_URL}/${_id}`, data)

    return res.data
  },

  getAll: async () => {
    const res = await instance.get<LeatherArticleType[]>(`${BASE_URL}`)

    return res.data
  },

  getOne: async (id: string) => {
    const res = await instance.get<LeatherArticleType>(`${BASE_URL}/${id}`)

    return res.data
  },

  update: async ({ _id, data }: UpdateParamsType<UpdateLeatherArticleParamsType>) => {
    const res = await instance.patch<LeatherArticleType>(`${BASE_URL}/${_id}`, data)

    return res.data
  },

  remove: async ({ factoryId, articleId }: { articleId: string; factoryId: string }) => {
    const res = await instance.delete<LeatherArticleType>(`${BASE_URL}/${factoryId}/${articleId}`)

    return res.data
  },
}
