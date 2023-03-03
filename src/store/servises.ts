import create from 'zustand'

import { CurrencyService } from '@/api/currency/currencyApi'

type Store = {
  currencyService: CurrencyService
}
const useServiceStore = create<Store>(() => {
  const currencyService = new CurrencyService()

  return {
    currencyService,
  }
})

export default useServiceStore
