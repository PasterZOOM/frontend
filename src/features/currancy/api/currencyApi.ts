import axios from 'axios'

import { GetRateResponseType } from 'features/currancy/api/getRateResponseType'
import { StatusCode } from 'shared/enums/statusCode'
import { ECost } from 'widgets/switchers/currencySwitcher/module/enum'

export const CurrencyAPI = {
  getRate: async (curAbbreviation: ECost): Promise<GetRateResponseType> => {
    return axios
      .get<GetRateResponseType>(`/exrates/rates/${curAbbreviation}`, {
        baseURL: process.env.NEXT_PUBLIC_NBRB_BASE_URL,
        params: { parammode: 2 },
      })
      .then(res => {
        return res.data
      })
      .catch(res => {
        return {
          Cur_ID: 1,
          Date: new Date(),
          Cur_Abbreviation: curAbbreviation,
          Cur_Scale: 1,
          Cur_Name: '',
          Cur_OfficialRate: res.toJSON().status === StatusCode.NOT_FOUND ? 1 : 0,
        }
      })
  },
}
