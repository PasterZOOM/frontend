import { SelectItemType } from 'components/common/ui/selects/defaultSelectType'
import { ELeatherColor } from 'enums/materials'
import { EProductAssignment, EProductCategory } from 'enums/product'
import { leatherColorsArray } from 'objects/colors/leatherColorsValues'
import { productAssignmentsArray } from 'objects/products/productAssignments'
import { productCategoriesArray } from 'objects/products/productCategories'

const selectItemsToFiltersTransformer: SelectItemsToFiltersTransformerFnType = (items, filterKey) =>
  items.map(item => ({ ...item, filterKey }))

export type FilterType<T, K extends EFilterKeys> = {
  _id: string
  value: T
  title: string
  filterKey: K
}
export type GeneralFilterType = FilterType<
  EProductAssignment | EProductCategory | ELeatherColor | string,
  EFilterKeys
>

export enum EFilterKeys {
  ASSIGNMENTS = 'assignments',
  CATEGORIES = 'categories',
  LEATHERS = 'leathers',
  LEATHER_COLORS = 'leatherColors',
}

export const productCategoriesFilters = (): FilterType<EProductCategory, EFilterKeys>[] =>
  selectItemsToFiltersTransformer(productCategoriesArray(), EFilterKeys.CATEGORIES)
export const productAssignmentsFilters = (): FilterType<EProductAssignment, EFilterKeys>[] =>
  selectItemsToFiltersTransformer(productAssignmentsArray(), EFilterKeys.ASSIGNMENTS)

export const leatherColorFilters = (): FilterType<ELeatherColor, EFilterKeys>[] =>
  selectItemsToFiltersTransformer(leatherColorsArray(), EFilterKeys.LEATHER_COLORS)

type SelectItemsToFiltersTransformerFnType = <T>(
  items: SelectItemType<T>[],
  filterKey: EFilterKeys
) => FilterType<T, EFilterKeys>[]
