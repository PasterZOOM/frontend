import { TCost } from '@/enums/cost'
import { CurrencySign } from '@/enums/currencySign'
import { useCurrencyStore } from '@/store/useCurrencyStore'
import { useUserSettings } from '@/store/useUserSettings'

export const useGetPriceInCurrentCurrency = (price: number, priceCurrency: TCost): string => {
  const currentCurrency = useUserSettings(state => state.currentCurrency)
  const currentPrise = useCurrencyStore(
    state => (price * state[currentCurrency]) / state[priceCurrency]
  )

  return `${CurrencySign[currentCurrency]}${currentPrise.toFixed()}`
}
