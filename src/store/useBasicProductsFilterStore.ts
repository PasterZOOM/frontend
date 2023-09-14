import { create } from 'zustand'

import { EFilterKeys } from '@/shared/components/pages/catalog/filters/filters'
import { DEFAULT_PAGE_SIZE } from '@/shared/consts/defaultPageSize'
import { QueryParam } from '@/shared/types/queryParam'

const initialState: FilterStateType = {
  filters: {
    assignments: [],
    leathers: [],
    leatherColors: [],
    categories: [],
    search: [],
    page: [],
    pageSize: `${DEFAULT_PAGE_SIZE}`,
    sort: [],
    maxPrice: [],
    minPrice: [],
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
export const selectFilters: FiltersSelectorType = store => store.filters
export const selectFilter: FilterSelectorType = filterKey => store => store.filters[filterKey]

export type FiltersType = Record<EFilterKeys, QueryParam>

type FilterStateType = {
  filters: FiltersType
}
type SetFilterType = (filterKey: EFilterKeys, value: QueryParam) => void
type StoreType = FilterStateType & {
  setFilter: SetFilterType
}
type SetFilterSelectorType = (store: StoreType) => SetFilterType
type FiltersSelectorType = (store: StoreType) => FiltersType
type FilterSelectorType = (filterKey: EFilterKeys) => (store: StoreType) => QueryParam
