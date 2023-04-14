import { create } from 'zustand'

import { TCost } from '@/enums/cost'
import { CostType } from '@/types/costType'

export const initialCurrencyState: CostType = {
  BYN: 1,
  JPY: 1,
  CNY: 1,
  USD: 1,
  UAH: 1,
  RUB: 1,
  GBP: 1,
  EUR: 1,
  PLN: 1,
}

export const useCurrencyStore = create<StoreType>(set => ({
  ...initialCurrencyState,
  setActualRates: actualRates => set(actualRates),
}))

export const selectRate: RateSelectorType = currency => store => store[currency]
export const selectSetActualRates: SetActualRateSelectorType = store => store.setActualRates

type SetActualRatesType = (actualRates: CostType) => void
type StoreType = CostType & {
  setActualRates: SetActualRatesType
}
type RateSelectorType = (currency: TCost) => (store: StoreType) => number
type SetActualRateSelectorType = (store: StoreType) => SetActualRatesType
