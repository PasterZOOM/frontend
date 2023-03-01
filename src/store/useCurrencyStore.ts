import { create } from 'zustand'

import { CostType } from '@/types/costType'

const initialState: CostType = {
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

type Store = CostType & {
  setActualRates: (actualRates: CostType) => void
}
export const useCurrencyStore = create<Store>(set => ({
  ...initialState,
  setActualRates: actualRates => set(actualRates),
}))
