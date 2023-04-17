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

export const selectSetFilter: SetFilterSelectorType = store => store.setFilter
export const selectFilters: SetFiltersSelectorType = store => store.filters
export const selectFilter: FilterSelectorType = filterKey => store => store.filters[filterKey]

type FilterStateType = {
  filters: Record<EFilterKeys, string>
}
type SetFilterType = (filterKey: EFilterKeys, value: string) => void
type StoreType = FilterStateType & {
  setFilter: SetFilterType
}
type SetFilterSelectorType = (store: StoreType) => SetFilterType
type SetFiltersSelectorType = (store: StoreType) => Record<EFilterKeys, string>
type FilterSelectorType = (filterKey: EFilterKeys) => (store: StoreType) => string
