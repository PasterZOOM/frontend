import { TCost } from '@/enums/cost'
import { CurrencySign } from '@/enums/currencySign'
import { useCurrencyStore } from '@/store/useCurrencyStore'
import { useUserSettings } from '@/store/useUserSettings'

export const useGetPriceInCurrentCurrency: UseGetPriceInCurrentCurrencyType = (
  price,
  priceCurrency
) => {
  const currentCurrency = useUserSettings(state => state.currentCurrency)
  const currentPrise = useCurrencyStore(
    state => (price * state[currentCurrency]) / state[priceCurrency]
  )
  const rate = useCurrencyStore(state => state[priceCurrency])

  if (rate !== 1) {
    return `${CurrencySign[currentCurrency]}${currentPrise.toFixed()}`
  }

  return undefined
}

type UseGetPriceInCurrentCurrencyType = (price: number, priceCurrency: TCost) => string | undefined
