import axios from 'axios'

import {
  CreateLeatherColorParamsType,
  LeatherColorType,
  UpdateLeatherColorParamsType,
} from '@/api/crm/leatherColorsApi/types'

export class LeatherColorsService {
  BASE_URL = 'http://localhost:8001/leather-colors'

  create: (params: CreateLeatherColorParamsType) => Promise<LeatherColorType> = async ({
    articleId,
    ...params
  }) => {
    const res = await axios.post<LeatherColorType>(`${this.BASE_URL}/${articleId}`, params)

    return res.data
  }

  getAll: () => Promise<Pick<LeatherColorType, '_id' | 'title'>[]> = async () => {
    const res = await axios.get<Pick<LeatherColorType, '_id' | 'title'>[]>(`${this.BASE_URL}`)

    return res.data
  }

  getOne: (id: string) => Promise<LeatherColorType> = async id => {
    const res = await axios.get<LeatherColorType>(`${this.BASE_URL}/${id}`)

    return res.data
  }

  update: (params: Partial<UpdateLeatherColorParamsType>) => Promise<LeatherColorType> = async ({
    _id,
    ...params
  }) => {
    const res = await axios.patch<LeatherColorType>(`${this.BASE_URL}/${_id}`, params)

    return res.data
  }

  remove: (id: string) => Promise<LeatherColorType> = async id => {
    const res = await axios.delete<LeatherColorType>(`${this.BASE_URL}/${id}`)

    return res.data
  }
}
