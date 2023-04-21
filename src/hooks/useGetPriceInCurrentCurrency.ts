import { TCost } from 'enums/cost'
import { CurrencySign } from 'enums/currencySign'
import { selectRate, useCurrencyStore } from 'store/useCurrencyStore'
import { useUserSettings } from 'store/useUserSettings'

export const useGetPriceInCurrentCurrency: UseGetPriceInCurrentCurrencyType = (
  price,
  priceCurrency
) => {
  const currentCurrency = useUserSettings(store => store.currentCurrency)
  const currentPrise = useCurrencyStore(
    store => (price * store[currentCurrency]) / store[priceCurrency]
  )
  const rate = useCurrencyStore(selectRate(priceCurrency))

  if (rate !== 1) {
    return `${CurrencySign[currentCurrency]}${currentPrise.toFixed()}`
  }

  return undefined
}

type UseGetPriceInCurrentCurrencyType = (price: number, priceCurrency: TCost) => string | undefined
