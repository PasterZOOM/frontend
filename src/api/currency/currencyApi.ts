import { GetRateResponseType } from './getRateResponseType'

import { TCost } from 'enums/cost'

const BASE_URL = 'https://www.nbrb.by/api/exrates/rates'

export const CurrencyAPI = {
  getRate: async (curAbbreviation: TCost): Promise<GetRateResponseType> => {
    let res

    try {
      res = (await fetch(`${BASE_URL}/${curAbbreviation}?parammode=2`)).json()
    } catch (e) {
      res = {
        Cur_Scale: 1,
        Cur_OfficialRate: 1,
      }
    }

    return res
  },
}
