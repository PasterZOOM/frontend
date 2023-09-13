import {
  CreateLeatherColorParamsType,
  LeatherColorType,
  UpdateLeatherColorParamsType,
} from 'features/leatherColors/api/types'
import { instance } from 'shared/api/instance/axios-instance'
import { CreateType, UpdateParamsType } from 'shared/api/paramsTypes'

const BASE_URL = '/leather-colors'

export const LeatherColorsAPI = {
  create: async ({ _id, data }: CreateType<CreateLeatherColorParamsType>) => {
    const res = await instance.post<LeatherColorType>(`${BASE_URL}/${_id}`, data)

    return res.data
  },

  getAll: async () => {
    const res = await instance.get<LeatherColorType[]>(BASE_URL)

    return res.data
  },

  getOne: async (id: string) => {
    const res = await instance.get<LeatherColorType>(`${BASE_URL}/${id}`)

    return res.data
  },

  update: async ({ _id, data }: UpdateParamsType<UpdateLeatherColorParamsType>) => {
    const res = await instance.patch<LeatherColorType>(`${BASE_URL}/${_id}`, data)

    return res.data
  },

  remove: async ({ articleId, colorId }: { articleId: string; colorId: string }) => {
    const res = await instance.delete<LeatherColorType>(`${BASE_URL}/${articleId}/${colorId}`)

    return res.data
  },
}
