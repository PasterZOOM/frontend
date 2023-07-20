import { create } from 'zustand'

import { ECost } from 'enums/cost'
import { CostType } from 'types/costType'

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

export const useCurrencyRatesStore = create<StoreType>((set, get) => ({
  ...initialCurrencyRatesState,
  setActualRates: actualRates => set(actualRates),
  getCurrentPrice: ({ price, priceCurrency, targetCurrency }) => {
    const state = get()

    return (price * (state[targetCurrency] || 1)) / (state[priceCurrency] || 1)
  },
}))

export const selectRate: RateSelectorType = currency => store => store[currency]
export const selectSetActualRates: SetActualRateSelectorType = store => store.setActualRates
export const selectGetCurrentPrice: GetCurrentPriceSelectorType = params => store =>
  store.getCurrentPrice(params)

type GetCurrentPriceParamsType = {
  price: number
  priceCurrency: ECost
  targetCurrency: ECost
}

type SetActualRatesType = (actualRates: CostType) => void
type GetCurrentPriceType = (params: GetCurrentPriceParamsType) => number
type StoreType = CostType & {
  setActualRates: SetActualRatesType
  getCurrentPrice: GetCurrentPriceType
}
type RateSelectorType = (currency: ECost) => (store: StoreType) => number
type GetCurrentPriceSelectorType = (
  params: GetCurrentPriceParamsType
) => (store: StoreType) => number
type SetActualRateSelectorType = (store: StoreType) => SetActualRatesType
