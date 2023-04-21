import axios from 'axios'

import { UpdateParamsType } from 'api/paramsTypes'
import {
  CreateLeatherFactoryParamsType,
  LeatherFactoryType,
  UpdateLeatherFactoryParamsType,
} from 'features/leatherFactories/api/types'

export class LeatherFactoriesService {
  BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/leather-factories`

  create: (params: CreateLeatherFactoryParamsType) => Promise<LeatherFactoryType> =
    async params => {
      const res = await axios.post<LeatherFactoryType>(`${this.BASE_URL}`, params)

      return res.data
    }

  getAll: () => Promise<Pick<LeatherFactoryType, '_id' | 'title'>[]> = async () => {
    const res = await axios.get<Pick<LeatherFactoryType, '_id' | 'title'>[]>(`${this.BASE_URL}`)

    return res.data
  }

  getOne: (id: string) => Promise<LeatherFactoryType> = async id => {
    const res = await axios.get<LeatherFactoryType>(`${this.BASE_URL}/${id}`)

    return res.data
  }

  update: (
    params: UpdateParamsType<UpdateLeatherFactoryParamsType>
  ) => Promise<LeatherFactoryType> = async ({ _id, params }) => {
    const res = await axios.patch<LeatherFactoryType>(`${this.BASE_URL}/${_id}`, params)

    return res.data
  }

  remove: (id: string) => Promise<LeatherFactoryType> = async id => {
    const res = await axios.delete<LeatherFactoryType>(`${this.BASE_URL}/${id}`)

    return res.data
  }
}
