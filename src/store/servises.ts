import { create } from 'zustand'

import { CurrencyService } from '@/api/currency/currencyApi'
import { ProductsService } from '@/api/products/productsApi'

type Store = {
  currencyService: CurrencyService
  productsService: ProductsService
}
export const useServiceStore = create<Store>(() => {
  const currencyService = new CurrencyService()
  const productsService = new ProductsService()

  return {
    currencyService,
    productsService,
  }
})
