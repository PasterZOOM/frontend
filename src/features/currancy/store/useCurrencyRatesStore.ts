import { create } from 'zustand'

import { DEFAULT_PRODUCT_CURRENCY } from '../lib/consts'

import { ECost } from 'features/currancy/lib/enum/eCost'
import { CostType } from 'features/currancy/lib/types/costType'

export const initialCurrencyRatesState: CostType = {
  BYN: 0,
  JPY: 0,
  CNY: 0,
  USD: 0,
  UAH: 0,
  RUB: 0,
  GBP: 0,
  EUR: 0,
  PLN: 0,
}

export const useCurrencyRatesStore = create<StoreType>((set, get) => {
  return {
    ...initialCurrencyRatesState,
    setActualRates: actualRates => set(actualRates),
    getCurrentPrice: (price, currentCurrency) => {
      const state = get()

      return +((price * (state[currentCurrency] || 1)) / (state[DEFAULT_PRODUCT_CURRENCY] || 1))
    },
    getDefaultPrice: (price, currentCurrency) => {
      const state = get()

      return +((price * (state[DEFAULT_PRODUCT_CURRENCY] || 1)) / (state[currentCurrency] || 1))
    },
  }
})

export const selectRate: RateSelectorType = currency => store => store[currency]
export const selectSetActualRates: SetActualRateSelectorType = store => store.setActualRates
export const selectGetCurrentPrice: GetCurrentPriceSelectorType = store => store.getCurrentPrice
export const selectGetDefaultPrice: GetDefaultPriceSelectorType = store => store.getDefaultPrice

type SetActualRatesType = (actualRates: CostType) => void
type GetCurrentPriceType = (price: number, currentCurrency: ECost) => number
type GetDefaultPriceType = (price: number, currentCurrency: ECost) => number
type StoreType = CostType & {
  getCurrentPrice: GetCurrentPriceType
  getDefaultPrice: GetDefaultPriceType
  setActualRates: SetActualRatesType
}
type RateSelectorType = (currency: ECost) => (store: StoreType) => number
type GetCurrentPriceSelectorType = (store: StoreType) => GetDefaultPriceType
type GetDefaultPriceSelectorType = (store: StoreType) => GetDefaultPriceType
type SetActualRateSelectorType = (store: StoreType) => SetActualRatesType
