import axios from 'axios'

import {
  BasicProductType,
  CreateBasicProductParamsType,
  UpdateBasicProductParamsType,
} from '@/api/crm/basicProductsApi/types'
import { UpdateParamsType } from '@/api/paramsTypes'

export class BasicProductsService {
  BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/basic-products`

  create: (params: CreateBasicProductParamsType) => Promise<BasicProductType> = async params => {
    const res = await axios.post<BasicProductType>(`${this.BASE_URL}`, { ...params })

    return res.data
  }

  getAll: () => Promise<BasicProductType[]> = async () => {
    const res = await axios.get<BasicProductType[]>(`${this.BASE_URL}`)

    return res.data
  }

  getOne: (id: string) => Promise<BasicProductType> = async id => {
    const res = await axios.get<BasicProductType>(`${this.BASE_URL}/${id}`)

    return res.data
  }

  update: (params: UpdateParamsType<UpdateBasicProductParamsType>) => Promise<BasicProductType> =
    async ({ _id, params }) => {
      const res = await axios.patch<BasicProductType>(`${this.BASE_URL}/${_id}`, params)

      return res.data
    }

  remove: (id: string) => Promise<BasicProductType> = async id => {
    const res = await axios.delete<BasicProductType>(`${this.BASE_URL}/${id}`)

    return res.data
  }
}
