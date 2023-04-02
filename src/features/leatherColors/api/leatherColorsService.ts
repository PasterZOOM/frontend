import axios from 'axios'

import { CreateType, UpdateParamsType } from '@/api/paramsTypes'
import {
  CreateLeatherColorParamsType,
  LeatherColorType,
  UpdateLeatherColorParamsType,
} from '@/features/leatherColors/api/types'

export class LeatherColorsService {
  BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/leather-colors`

  create: (params: CreateType<CreateLeatherColorParamsType>) => Promise<LeatherColorType> = async ({
    _id,
    params,
  }) => {
    const res = await axios.post<LeatherColorType>(`${this.BASE_URL}/${_id}`, params)

    return res.data
  }

  getAll: (filters?: string[]) => Promise<Pick<LeatherColorType, '_id' | 'title' | 'photo'>[]> =
    async filters => {
      const res = await axios.get<Pick<LeatherColorType, '_id' | 'title' | 'photo'>[]>(
        `${this.BASE_URL}`,
        { params: { _id: filters } }
      )

      return res.data
    }

  getOne: (id: string) => Promise<LeatherColorType> = async id => {
    const res = await axios.get<LeatherColorType>(`${this.BASE_URL}/${id}`)

    return res.data
  }

  update: (params: UpdateParamsType<UpdateLeatherColorParamsType>) => Promise<LeatherColorType> =
    async ({ _id, params }) => {
      const res = await axios.patch<LeatherColorType>(`${this.BASE_URL}/${_id}`, params)

      return res.data
    }

  remove: (id: string) => Promise<LeatherColorType> = async id => {
    const res = await axios.delete<LeatherColorType>(`${this.BASE_URL}/${id}`)

    return res.data
  }
}
