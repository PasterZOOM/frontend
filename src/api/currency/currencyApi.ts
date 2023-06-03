import axios from 'axios'

import { GetRateResponseType } from './getRateResponseType'

import { ECost } from 'enums/cost'

export const CurrencyAPI = {
  getRate: async (curAbbreviation: ECost): Promise<GetRateResponseType> => {
    return axios
      .get(`/exrates/rates/${curAbbreviation}`, {
        baseURL: process.env.NEXT_PUBLIC_NBRB_BASE_URL,
        params: { parammode: 2 },
      })
      .then(res => res.data)
      .catch(() => ({
        Cur_ID: 1,
        Date: new Date(),
        Cur_Abbreviation: curAbbreviation,
        Cur_Scale: 1,
        Cur_Name: '',
        Cur_OfficialRate: 1,
      }))
  },
}
