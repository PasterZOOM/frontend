import { TCost } from '@/enums/cost'
import { CurrencySign } from '@/enums/currencySign'
import { useCurrencyStore } from '@/store/useCurrencyStore'

export const useGetPriceInCurrency: UseGetPriceInCurrencyType = (
  price,
  priceCurrency,
  currency
): string => {
  const currentPrise = useCurrencyStore(state => (price * state[currency]) / state[priceCurrency])

  return `${CurrencySign[currency]}${currentPrise.toFixed()}`
}

type UseGetPriceInCurrencyType = (price: number, priceCurrency: TCost, currency: TCost) => string
