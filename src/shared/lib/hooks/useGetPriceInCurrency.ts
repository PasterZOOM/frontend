import { DEFAULT_PRODUCT_CURRENCY } from 'shared/constants/currancy/defaultProductCurrency'
import { ECost } from 'shared/enums/cost'
import { CurrencySign } from 'shared/enums/currencySign'
import {
  selectGetCurrentPrice,
  selectRate,
  useCurrencyRatesStore,
} from 'store/useCurrencyRatesStore'
import { selectCurrentCurrency, useUserSettings } from 'store/useUserSettings'

export const useGetPriceInCurrency: UseGetPriceInCurrencyType = price => {
  const currentCurrency = useUserSettings(selectCurrentCurrency)
  const rate = useCurrencyRatesStore(selectRate(DEFAULT_PRODUCT_CURRENCY))

  const targetPrice = +useCurrencyRatesStore(selectGetCurrentPrice)(price).toFixed()

  return {
    price: targetPrice,
    currency: currentCurrency,
    title: rate
      ? `${CurrencySign[currentCurrency]}${targetPrice}`
      : `${CurrencySign[DEFAULT_PRODUCT_CURRENCY]}${price}`,
  }
}

type UseGetPriceInCurrencyType = (price: number) => {
  currency: ECost
  price: number
  title: string | undefined
}
