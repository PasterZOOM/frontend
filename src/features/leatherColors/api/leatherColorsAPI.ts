import { instance } from 'api/instance/axios-instance'
import { CreateType, UpdateParamsType } from 'api/paramsTypes'
import {
  CreateLeatherColorParamsType,
  LeatherColorType,
  UpdateLeatherColorParamsType,
} from 'features/leatherColors/api/types'

const BASE_URL = '/leather-colors'

export const LeatherColorsAPI = {
  create: async ({ _id, params }: CreateType<CreateLeatherColorParamsType>) => {
    const res = await instance.post<LeatherColorType>(`${BASE_URL}/${_id}`, params)

    return res.data
  },

  getAll: async (filters?: string[]) => {
    const res = await instance.get<Pick<LeatherColorType, '_id' | 'title' | 'photo'>[]>(BASE_URL, {
      params: { _id: filters },
    })

    return res.data
  },

  getOne: async (id: string) => {
    const res = await instance.get<LeatherColorType>(`${BASE_URL}/${id}`)

    return res.data
  },

  update: async ({ _id, params }: UpdateParamsType<UpdateLeatherColorParamsType>) => {
    const res = await instance.patch<LeatherColorType>(`${BASE_URL}/${_id}`, params)

    return res.data
  },

  remove: async (id: string) => {
    const res = await instance.delete<LeatherColorType>(`${BASE_URL}/${id}`)

    return res.data
  },
}
