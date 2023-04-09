import { GetRateResponseType } from './getRateResponseType'

import { TCost } from '@/enums/cost'

export class CurrencyService {
  BASE_URL = 'https://www.nbrb.by/api/exrates/rates'

  getRate: getRateFnType = async curAbbreviation => {
    let res

    try {
      res = (await fetch(`${this.BASE_URL}/${curAbbreviation}?parammode=2`)).json()
    } catch (e) {
      res = {
        Cur_Scale: 1,
        Cur_OfficialRate: 1,
      }
    }

    return res
  }
}

type getRateFnType = (curAbbreviation: TCost) => Promise<GetRateResponseType>
