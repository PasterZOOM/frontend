import { instance } from 'api/instance/axios-instance'
import { CreateType, UpdateParamsType } from 'api/paramsTypes'
import {
  CreateLeatherArticleParamsType,
  LeatherArticleType,
  UpdateLeatherArticleParamsType,
} from 'features/leatherArticles/api/types'

const BASE_URL = `/leather-articles`

export const LeatherArticlesAPI = {
  create: async ({ _id, params }: CreateType<CreateLeatherArticleParamsType>) => {
    const res = await instance.post<LeatherArticleType>(`${BASE_URL}/${_id}`, params)

    return res.data
  },

  getAll: async () => {
    const res = await instance.get<Pick<LeatherArticleType, '_id' | 'title'>[]>(`${BASE_URL}`)

    return res.data
  },

  getOne: async (id: string) => {
    const res = await instance.get<LeatherArticleType>(`${BASE_URL}/${id}`)

    return res.data
  },

  update: async ({ _id, params }: UpdateParamsType<UpdateLeatherArticleParamsType>) => {
    const res = await instance.patch<LeatherArticleType>(`${BASE_URL}/${_id}`, params)

    return res.data
  },

  remove: async (id: string) => {
    const res = await instance.delete<LeatherArticleType>(`${BASE_URL}/${id}`)

    return res.data
  },
}
