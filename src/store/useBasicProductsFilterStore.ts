import { create } from 'zustand'

import { EFilterKeys } from '@/mocks/filters'

type FilterStateType = {
  filters: Record<EFilterKeys, string>
}
const initialState: FilterStateType = {
  filters: {
    assignments: '',
    leathers: '',
    leatherColors: '',
    categories: '',
  },
}

type StoreType = FilterStateType & {
  setFilter: (filterKey: EFilterKeys, value: string) => void
}

export const useBasicProductsFilterStore = create<StoreType>((set, get) => ({
  ...initialState,
  setFilter: (filterKey, value) => {
    const { filters } = get()

    set({ filters: { ...filters, [filterKey]: value } })
  },
}))
