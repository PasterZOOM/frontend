import { useEffect } from 'react'

import { CurrencyAPI } from '../api/currencyApi'
import { ECost } from '../lib/enum'
import { CostType } from '../lib/types'
import {
  initialCurrencyRatesState,
  selectSetActualRates,
  useCurrencyRatesStore,
} from '../store/useCurrencyRatesStore'

export const useGetActualRates = (): void => {
  const setActualRates = useCurrencyRatesStore(selectSetActualRates)

  useEffect(() => {
    ;(async () => {
      const rates: CostType = initialCurrencyRatesState

      await Promise.all(
        (Object.keys(ECost) as ECost[]).map(async costKey => {
          if (costKey !== ECost.BYN) {
            const rate = await CurrencyAPI.getRate(costKey)

            if (costKey === ECost.RUB) {
              rates[costKey] = rate.Cur_Scale / rate.Cur_OfficialRate // * 1.1 коэффициент разницы курса нацбанка и курса в банках для росс.рубля
            } else {
              rates[costKey] = rate.Cur_Scale / rate.Cur_OfficialRate
            }
          } else {
            rates[costKey] = 1 //  / 1.012 коэффициент разницы курса нацбанка и курса в банках
          }
        })
      )
      setActualRates(rates)
    })()
  }, [setActualRates])
}
