import axios from 'axios'

import {
  CreateLeatherArticleParamsType,
  LeatherArticleType,
} from '@/api/crm/leatherArticlesApi/types'

export class LeatherArticlesService {
  BASE_URL = 'http://localhost:8001/leather-articles'

  create: (params: CreateLeatherArticleParamsType) => Promise<LeatherArticleType> =
    async params => {
      const res = await axios.post<LeatherArticleType>(`${this.BASE_URL}`, {
        body: params,
      })

      return res.data
    }

  getAll: () => Promise<LeatherArticleType[]> = async () => {
    const res = await axios.get<LeatherArticleType[]>(`${this.BASE_URL}`)

    return res.data
  }

  getOne: (id: string) => Promise<LeatherArticleType> = async id => {
    const res = await axios.get<LeatherArticleType>(`${this.BASE_URL}/${id}`)

    return res.data
  }

  update: (
    params: Partial<Omit<LeatherArticleType, '_id' | 'colors' | 'factory'>>
  ) => Promise<LeatherArticleType> = async params => {
    const res = await axios.patch<LeatherArticleType>(`${this.BASE_URL}`, { data: params })

    return res.data
  }

  remove: (id: string) => Promise<LeatherArticleType> = async id => {
    const res = await axios.delete<LeatherArticleType>(`${this.BASE_URL}/${id}`)

    return res.data
  }
}
