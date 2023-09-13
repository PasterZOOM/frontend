import {
  CreateLeatherFactoryParamsType,
  LeatherFactoryType,
  UpdateLeatherFactoryParamsType,
} from 'features/leatherFactories/api/types'
import { instance } from 'shared/api/instance/axios-instance'
import { UpdateParamsType } from 'shared/api/paramsTypes'

const BASE_URL = 'leather-factories'

export const LeatherFactoriesAPI = {
  create: async (data: CreateLeatherFactoryParamsType) => {
    const res = await instance.post<LeatherFactoryType>(BASE_URL, data)

    return res.data
  },

  getAll: async () => {
    const res = await instance.get<LeatherFactoryType[]>(BASE_URL)

    return res.data
  },

  getOne: async (id: string) => {
    const res = await instance.get<LeatherFactoryType>(`${BASE_URL}/${id}`)

    return res.data
  },

  update: async ({ _id, data }: UpdateParamsType<UpdateLeatherFactoryParamsType>) => {
    const res = await instance.patch<LeatherFactoryType>(`${BASE_URL}/${_id}`, data)

    return res.data
  },

  remove: async (id: string) => {
    const res = await instance.delete<LeatherFactoryType>(`${BASE_URL}/${id}`)

    return res.data
  },
}
