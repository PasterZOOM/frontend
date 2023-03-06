import { create } from 'zustand'

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

type StoreType = CostType & {
  setActualRates: (actualRates: CostType) => void
}
export const useCurrencyStore = create<StoreType>(set => ({
  ...initialCurrencyState,
  setActualRates: actualRates => set(actualRates),
}))
