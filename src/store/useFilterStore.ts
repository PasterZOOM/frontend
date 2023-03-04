import { create } from 'zustand'

export type FiltersKeysType = keyof typeof initialState.filters
type FilterStateType = {
  filters: {
    assignments: string[]
    category: string[]
    leather: string[]
    leatherColor: string[]
  }
}

const initialState: FilterStateType = {
  filters: {
    assignments: [],
    leather: [],
    leatherColor: [],
    category: [],
  },
}

type Store = FilterStateType & {
  setFilter: (filterKey: FiltersKeysType, value: string[]) => void
}

export const useFilterStore = create<Store>((set, get) => ({
  ...initialState,
  setFilter: (filterKey, value) => {
    const { filters } = get()

    set({ filters: { ...filters, [filterKey]: value } })
  },
}))
