import { useEffect } from 'react'

import create from 'zustand'

import { ECost, TCost } from '@/enums/cost'
import { CurrencyService } from '@/pages/api/currency/currencyApi'
import { useCurrencyStore } from '@/store/useCurrencyStore'
import { CostType } from '@/types/costType'

type Store = {
  currencyService: CurrencyService
}
const useServiceStore = create<Store>(() => {
  const currencyService = new CurrencyService()

  return {
    currencyService,
  }
})

export const useInit = (): void => {
  const currencyService = useServiceStore(store => store.currencyService)
  const setActualRates = useCurrencyStore(store => store.setActualRates)

  useEffect(() => {
    const rates: CostType = {
      BYN: 1,
      EUR: 1,
      GBP: 1,
      JPY: 1,
      RUB: 1,
      UAH: 1,
      USD: 1,
      CNY: 1,
      PLN: 1,
    }

    const getRates = async (): Promise<void> => {
      await Promise.all(
        Object.keys(ECost)
          .filter(costKey => costKey !== ECost.BYN)
          .map(async costKey => {
            const rate = await currencyService.getRate(costKey as TCost)

            rates[costKey as ECost] = +(rate.Cur_Scale / rate.Cur_OfficialRate)
          })
      )
    }

    getRates().then(() => setActualRates(rates))
  }, [])
}

export default useServiceStore
