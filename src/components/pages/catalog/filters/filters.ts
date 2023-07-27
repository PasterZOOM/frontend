import { SelectItemType } from 'components/common/ui/selects/defaultSelectType'
import { ELeatherColor } from 'enums/materials'
import { EProductAssignment, EProductCategory } from 'enums/product'
import { leatherColorsArray } from 'objects/colors/leatherColorsValues'
import { productAssignmentsArray } from 'objects/products/productAssignments'
import { productCategoriesArray } from 'objects/products/productCategories'

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
  PAGE = 'page',
  PAGE_SIZE = 'pageSize',
  SEARCH = 'search',
}

export const productCategoriesFilters = (): FilterType<EFilterKeys, EProductCategory>[] =>
  selectItemsToFiltersTransformer(productCategoriesArray(), EFilterKeys.CATEGORIES)
export const productAssignmentsFilters = (): FilterType<EFilterKeys, EProductAssignment>[] =>
  selectItemsToFiltersTransformer(productAssignmentsArray(), EFilterKeys.ASSIGNMENTS)

export const leatherColorFilters = (): FilterType<EFilterKeys, ELeatherColor>[] =>
  selectItemsToFiltersTransformer(leatherColorsArray(), EFilterKeys.LEATHER_COLORS)

type SelectItemsToFiltersTransformerFnType = <T>(
  items: SelectItemType<T>[],
  filterKey: EFilterKeys
) => FilterType<EFilterKeys, T>[]
