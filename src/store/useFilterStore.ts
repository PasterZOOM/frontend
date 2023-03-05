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

type Store = FilterStateType & {
  setFilter: (filterKey: EFilterKeys, value: string) => void
}

export const useFilterStore = create<Store>((set, get) => ({
  ...initialState,
  setFilter: (filterKey, value) => {
    const { filters } = get()

    set({ filters: { ...filters, [filterKey]: value } })
  },
}))
