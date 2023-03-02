import { GetRateResponseType } from './getRateResponseType'

import { TCost } from '@/enums/cost'

export class CurrencyService {
  BASE_URL = 'https://www.nbrb.by/api/exrates/rates'

  getRate: (curAbbreviation: TCost) => Promise<GetRateResponseType> = async curAbbreviation => {
    const res = await fetch(`${this.BASE_URL}/${curAbbreviation}?parammode=2`)

    return res.json()
  }
}
