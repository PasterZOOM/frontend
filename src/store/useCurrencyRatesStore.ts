import { create } from 'zustand'

import { DEFAULT_PRODUCT_CURRENCY } from 'shared/constants/currancy/defaultProductCurrency'
import { ECost } from 'shared/enums/cost'
import { CostType } from 'shared/types/costType'
import { useUserSettings } from 'store/useUserSettings'

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
  const { currentCurrency } = useUserSettings.getState()

  return {
    ...initialCurrencyRatesState,
    setActualRates: actualRates => set(actualRates),
    getCurrentPrice: price => {
      const state = get()

      return +((price * (state[currentCurrency] || 1)) / (state[DEFAULT_PRODUCT_CURRENCY] || 1))
    },
    getDefaultPrice: price => {
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
type GetCurrentPriceType = (price: number) => number
type GetDefaultPriceType = (price: number) => number
type StoreType = CostType & {
  getCurrentPrice: GetCurrentPriceType
  getDefaultPrice: GetDefaultPriceType
  setActualRates: SetActualRatesType
}
type RateSelectorType = (currency: ECost) => (store: StoreType) => number
type GetCurrentPriceSelectorType = (store: StoreType) => GetDefaultPriceType
type GetDefaultPriceSelectorType = (store: StoreType) => GetDefaultPriceType
type SetActualRateSelectorType = (store: StoreType) => SetActualRatesType
