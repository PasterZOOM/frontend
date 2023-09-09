import { useGetFormattedPrice } from 'features/currancy/hooks/useGetFormattedPrice'
import { DEFAULT_PRODUCT_CURRENCY } from 'features/currancy/lib/consts/defaultProductCurrency'
import { ECost } from 'features/currancy/lib/enum/eCost'
import {
  selectGetCurrentPrice,
  selectRate,
  useCurrencyRatesStore,
} from 'features/currancy/store/useCurrencyRatesStore'
import { selectCurrentCurrency, useUserSettings } from 'store/useUserSettings'

export const useGetPriceInCurrency: UseGetPriceInCurrencyType = price => {
  const currentCurrency = useUserSettings(selectCurrentCurrency)
  const rate = useCurrencyRatesStore(selectRate(DEFAULT_PRODUCT_CURRENCY))
  const getFormattedPrice = useGetFormattedPrice()

  const targetPrice = +useCurrencyRatesStore(selectGetCurrentPrice)(
    price,
    currentCurrency
  ).toFixed()

  return {
    price: targetPrice,
    currency: currentCurrency,
    title: rate
      ? getFormattedPrice(targetPrice, currentCurrency)
      : getFormattedPrice(price, DEFAULT_PRODUCT_CURRENCY),
  }
}

type UseGetPriceInCurrencyType = (price: number) => {
  currency: ECost
  price: number
  title: string | undefined
}
