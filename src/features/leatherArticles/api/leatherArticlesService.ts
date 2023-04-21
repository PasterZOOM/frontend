import axios from 'axios'

import { CreateType, UpdateParamsType } from 'api/paramsTypes'
import {
  CreateLeatherArticleParamsType,
  LeatherArticleType,
  UpdateLeatherArticleParamsType,
} from 'features/leatherArticles/api/types'

export class LeatherArticlesService {
  BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/leather-articles`

  create: (params: CreateType<CreateLeatherArticleParamsType>) => Promise<LeatherArticleType> =
    async ({ _id, params }) => {
      const res = await axios.post<LeatherArticleType>(`${this.BASE_URL}/${_id}`, params)

      return res.data
    }

  getAll: () => Promise<Pick<LeatherArticleType, '_id' | 'title'>[]> = async () => {
    const res = await axios.get<LeatherArticleType[]>(`${this.BASE_URL}`)

    return res.data
  }

  getOne: (id: string) => Promise<LeatherArticleType> = async id => {
    const res = await axios.get<LeatherArticleType>(`${this.BASE_URL}/${id}`)

    return res.data
  }

  update: (
    params: UpdateParamsType<UpdateLeatherArticleParamsType>
  ) => Promise<LeatherArticleType> = async ({ _id, params }) => {
    const res = await axios.patch<LeatherArticleType>(`${this.BASE_URL}/${_id}`, params)

    return res.data
  }

  remove: (id: string) => Promise<LeatherArticleType> = async id => {
    const res = await axios.delete<LeatherArticleType>(`${this.BASE_URL}/${id}`)

    return res.data
  }
}
