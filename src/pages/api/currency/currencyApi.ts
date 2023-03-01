import { TCost } from '@/enums/cost'
import { GetRateResponseType } from '@/pages/api/currency/getRateResponseType'

export class CurrencyService {
  BASE_URL = 'https://www.nbrb.by/api/exrates/rates'

  getRate: (curAbbreviation: TCost) => Promise<GetRateResponseType> = async curAbbreviation => {
    const res = await fetch(`${this.BASE_URL}/${curAbbreviation}?parammode=2`)

    return res.json()
  }
}
