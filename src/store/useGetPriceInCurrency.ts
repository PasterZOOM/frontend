import { TCost } from '@/enums/cost'
import { CurrencySign } from '@/enums/currencySign'
import { useCurrencyStore } from '@/store/useCurrencyStore'

export const useGetPriceInCurrency = (
  price: number,
  priceCurrency: TCost,
  currency: TCost
): string => {
  const currentPrise = useCurrencyStore(state => (price * state[currency]) / state[priceCurrency])

  return `${CurrencySign[currency]}${currentPrise.toFixed()}`
}
