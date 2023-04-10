import axios from 'axios'

import { UpdateParamsType } from '@/api/paramsTypes'
import { EFilterKeys } from '@/components/pages/catalog/filters/filters'
import {
  BasicProductType,
  CreateBasicProductParamsType,
  UpdateBasicProductParamsType,
} from '@/features/basicProducts/api/types'

export class BasicProductsService {
  BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/basic-products`

  create: (params: CreateBasicProductParamsType) => Promise<BasicProductType> = async params => {
    const res = await axios.post<BasicProductType>(`${this.BASE_URL}`, { ...params })

    return res.data
  }

  getAll: (filters?: Record<EFilterKeys, string>) => Promise<BasicProductType[]> =
    async filters => {
      const assignments = filters?.assignments.length ? filters.assignments.split(',') : undefined
      const categories = filters?.categories.length ? filters.categories.split(',') : undefined
      const leatherColors = filters?.leatherColors.length
        ? filters.leatherColors.split(',')
        : undefined
      const leathers = filters?.leathers.length ? filters.leathers.split(',') : undefined

      const res = await axios.get<BasicProductType[]>(`${this.BASE_URL}`, {
        params: { assignments, categories, leatherColors, leathers },
      })

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

  addPhoto: (params: UpdateParamsType<{ [key: string]: string[] }>) => Promise<BasicProductType> =
    async ({ _id, params }) => {
      const res = await axios.put<BasicProductType>(`${this.BASE_URL}/${_id}/photo`, params)

      return res.data
    }

  removePhoto: (params: {
    params: { productId: string; photoId: string }
  }) => Promise<BasicProductType> = async ({ params: { productId, photoId } }) => {
    const res = await axios.delete<BasicProductType>(
      `${this.BASE_URL}/${productId}/photo/${photoId}`
    )

    return res.data
  }
}
