import { create } from 'zustand'

import { EFilterKeys } from '@/components/pages/catalog/filters/filters'

const initialState: FilterStateType = {
  filters: {
    assignments: '',
    leathers: '',
    leatherColors: '',
    categories: '',
  },
}

export const useBasicProductsFilterStore = create<StoreType>((set, get) => ({
  ...initialState,
  setFilter: (filterKey, value) => {
    const { filters } = get()

    set({ filters: { ...filters, [filterKey]: value } })
  },
}))

export const selectSetFilter: SelectSetFilterType = store => store.setFilter
export const selectFilter: FilterSelectorType = filterKey => store => store.filters[filterKey]

type FilterStateType = {
  filters: Record<EFilterKeys, string>
}
type SetFilterType = (filterKey: EFilterKeys, value: string) => void
type StoreType = FilterStateType & {
  setFilter: SetFilterType
}
type SelectSetFilterType = (store: StoreType) => SetFilterType
type FilterSelectorType = (filterKey: EFilterKeys) => (store: StoreType) => string
