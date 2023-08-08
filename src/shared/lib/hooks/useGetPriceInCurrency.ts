import { DEFAULT_PRODUCT_CURRENCY } from 'shared/constants/currancy/defaultProductCurrency'
import { ECost } from 'shared/enums/cost'
import { CurrencySign } from 'shared/enums/currencySign'
import {
  selectGetCurrentPrice,
  selectRate,
  useCurrencyRatesStore,
} from 'store/useCurrencyRatesStore'

export const useGetPriceInCurrency: UseGetPriceInCurrencyType = (price, targetCurrency) => {
  const rate = useCurrencyRatesStore(selectRate(DEFAULT_PRODUCT_CURRENCY))

  const targetPrise = useCurrencyRatesStore(selectGetCurrentPrice({ price, targetCurrency }))

  return {
    price: +targetPrise.toFixed(),
    currency: targetCurrency,
    title: rate
      ? `${CurrencySign[targetCurrency]}${targetPrise.toFixed()}`
      : `${CurrencySign[DEFAULT_PRODUCT_CURRENCY]}${price.toFixed()}`,
  }
}

type UseGetPriceInCurrencyType = (
  price: number,
  currentCurrency: ECost
) => { currency: ECost; price: number; title: string | undefined }
