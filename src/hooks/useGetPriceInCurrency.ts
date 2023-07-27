import { ECost } from 'enums/cost'
import { CurrencySign } from 'enums/currencySign'
import {
  selectGetCurrentPrice,
  selectRate,
  useCurrencyRatesStore,
} from 'store/useCurrencyRatesStore'

export const useGetPriceInCurrency: UseGetPriceInCurrencyType = (
  price,
  priceCurrency,
  targetCurrency
) => {
  const rate = useCurrencyRatesStore(selectRate(priceCurrency))

  const targetPrise = useCurrencyRatesStore(
    selectGetCurrentPrice({ price, priceCurrency, targetCurrency })
  )

  return {
    price: targetPrise,
    currency: targetCurrency,
    title: rate
      ? `${CurrencySign[targetCurrency]}${targetPrise.toFixed()}`
      : `${CurrencySign[priceCurrency]}${price.toFixed()}`,
  }
}

type UseGetPriceInCurrencyType = (
  price: number,
  priceCurrency: ECost,
  currentCurrency: ECost
) => { currency: ECost; price: number; title: string | undefined }
