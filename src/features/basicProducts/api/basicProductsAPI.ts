import {
  BasicProductResponseType,
  BasicProductType,
  CreateBasicProductParamsType,
  RemoveBasicProductPhotoParamsType,
  UpdateBasicProductParamsType,
} from './types'

import { instance } from 'shared/api/instance/axios-instance'
import { UpdateParamsType } from 'shared/api/paramsTypes'
import { FiltersType } from 'store/useBasicProductsFilterStore'

const BASE_URL = `/basic-products`

export const BasicProductsAPI = {
  create: async (data: CreateBasicProductParamsType) => {
    const res = await instance.post<BasicProductType>(`${BASE_URL}`, data)

    return res.data
  },

  getAll: async (params?: FiltersType) => {
    const res = await instance.get<BasicProductResponseType>(`${BASE_URL}`, {
      params,
      paramsSerializer: { indexes: null },
    })

    return res.data
  },

  getOne: async (id: string) => {
    const res = await instance.get<BasicProductType>(`${BASE_URL}/${id}`)

    return res.data
  },

  update: async ({ _id, data }: UpdateParamsType<UpdateBasicProductParamsType>) => {
    const res = await instance.patch<BasicProductType>(`${BASE_URL}/${_id}`, data)

    return res.data
  },

  remove: async (id: string) => {
    const res = await instance.delete<BasicProductType>(`${BASE_URL}/${id}`)

    return res.data
  },

  addPhoto: async ({ _id, data }: UpdateParamsType<Record<string, string[]>>) => {
    const res = await instance.put<BasicProductType>(`${BASE_URL}/${_id}/photo`, data)

    return res.data
  },

  removePhoto: async ({ productId, photoId }: RemoveBasicProductPhotoParamsType) => {
    const res = await instance.delete<BasicProductType>(`${BASE_URL}/${productId}/photo/${photoId}`)

    return res.data
  },
}
