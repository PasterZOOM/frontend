import { instance } from 'api/instance/axios-instance'
import { UpdateParamsType } from 'api/paramsTypes'
import {
  BasicProductType,
  CreateBasicProductParamsType,
  RemoveBasicProductPhotoParamsType,
  UpdateBasicProductParamsType,
} from 'features/basicProducts/api/types'
import { FiltersType } from 'store/useBasicProductsFilterStore'

const BASE_URL = `/basic-products`

export const BasicProductsAPI = {
  create: async (params: CreateBasicProductParamsType) => {
    const res = await instance.post<BasicProductType>(`${BASE_URL}`, { ...params })

    return res.data
  },

  getAll: async (filters?: FiltersType) => {
    const res = await instance.get<BasicProductType[]>(`${BASE_URL}`, {
      params: { ...filters },
    })

    return res.data
  },

  getOne: async (id: string) => {
    const res = await instance.get<BasicProductType>(`${BASE_URL}/${id}`)

    return res.data
  },

  update: async ({ _id, params }: UpdateParamsType<UpdateBasicProductParamsType>) => {
    const res = await instance.patch<BasicProductType>(`${BASE_URL}/${_id}`, params)

    return res.data
  },

  remove: async (id: string) => {
    const res = await instance.delete<BasicProductType>(`${BASE_URL}/${id}`)

    return res.data
  },

  addPhoto: async ({ _id, params }: UpdateParamsType<Record<string, string[]>>) => {
    const res = await instance.put<BasicProductType>(`${BASE_URL}/${_id}/photo`, params)

    return res.data
  },

  removePhoto: async ({ productId, photoId }: RemoveBasicProductPhotoParamsType) => {
    const res = await instance.delete<BasicProductType>(`${BASE_URL}/${productId}/photo/${photoId}`)

    return res.data
  },
}
