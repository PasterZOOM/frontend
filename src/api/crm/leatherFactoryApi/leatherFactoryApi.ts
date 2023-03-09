import axios from 'axios'

import {
  CreateLeatherFactoryParamsType,
  LeatherFactoryType,
} from '@/api/crm/leatherFactoryApi/types'

export class LeatherFactoryService {
  BASE_URL = 'http://localhost:8001/leather-factories'

  create: (params: CreateLeatherFactoryParamsType) => Promise<LeatherFactoryType> =
    async params => {
      const res = await axios.post<LeatherFactoryType>(`${this.BASE_URL}`, {
        ...params,
      })

      return res.data
    }

  getAll: () => Promise<LeatherFactoryType[]> = async () => {
    const res = await axios.get<LeatherFactoryType[]>(`${this.BASE_URL}`)

    return res.data
  }

  getOne: (id: string) => Promise<LeatherFactoryType> = async id => {
    const res = await axios.get<LeatherFactoryType>(`${this.BASE_URL}/${id}`)

    return res.data
  }

  update: (
    params: Partial<Omit<LeatherFactoryType, '_id' | 'articles'>>
  ) => Promise<LeatherFactoryType> = async params => {
    const res = await axios.patch<LeatherFactoryType>(`${this.BASE_URL}`, { data: params })

    return res.data
  }

  remove: (id: string) => Promise<LeatherFactoryType> = async id => {
    const res = await axios.delete<LeatherFactoryType>(`${this.BASE_URL}/${id}`)

    return res.data
  }
}
