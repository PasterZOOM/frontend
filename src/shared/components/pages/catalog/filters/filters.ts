import { ELeatherColor } from 'shared/enums/materials'
import { EProductAssignment, EProductCategory } from 'shared/enums/product'
import { leatherColorsArray } from 'shared/objects/colors/leatherColorsValues'
import { productAssignmentsArray } from 'shared/objects/products/productAssignments'
import { productCategoriesArray } from 'shared/objects/products/productCategories'
import { SelectItemType } from 'shared/ui/selects/defaultSelectType'

const selectItemsToFiltersTransformer: SelectItemsToFiltersTransformerFnType = (items, filterKey) =>
  items.map(item => ({ ...item, filterKey }))

export type FilterType<K extends EFilterKeys, T> = {
  _id: string
  filterKey: K
  title: string
  value: T
}
export type GeneralFilterType = FilterType<
  EFilterKeys,
  ELeatherColor | EProductAssignment | EProductCategory | string
>

export enum EFilterKeys {
  ASSIGNMENTS = 'assignments',
  CATEGORIES = 'categories',
  LEATHERS = 'leathers',
  LEATHER_COLORS = 'leatherColors',
  MAX_PRICE = 'maxPrice',
  MIN_PRICE = 'minPrice',
  PAGE = 'page',
  PAGE_SIZE = 'pageSize',
  SEARCH = 'search',
  SORT = 'sort',
}

export const productCategoriesFilters = (): FilterType<EFilterKeys, EProductCategory>[] =>
  selectItemsToFiltersTransformer(productCategoriesArray, EFilterKeys.CATEGORIES)
export const productAssignmentsFilters = (): FilterType<EFilterKeys, EProductAssignment>[] =>
  selectItemsToFiltersTransformer(productAssignmentsArray, EFilterKeys.ASSIGNMENTS)

export const leatherColorFilters = (): FilterType<EFilterKeys, ELeatherColor>[] =>
  selectItemsToFiltersTransformer(leatherColorsArray, EFilterKeys.LEATHER_COLORS)

type SelectItemsToFiltersTransformerFnType = <T>(
  items: SelectItemType<T>[],
  filterKey: EFilterKeys
) => FilterType<EFilterKeys, T>[]
