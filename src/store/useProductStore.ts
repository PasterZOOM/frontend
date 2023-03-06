import { create } from 'zustand'

import { ProductType } from '@/types/productType'

type initialStateType = { products: ProductType[] }
const initialState: initialStateType = {
  products: [],
}

type StoreType = initialStateType & {
  setProducts: (products: ProductType[]) => void
}
export const useProductStore = create<StoreType>(set => ({
  ...initialState,
  setProducts: products => set({ products }),
}))
