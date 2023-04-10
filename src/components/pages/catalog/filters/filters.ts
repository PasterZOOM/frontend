import { SelectItemType } from '@/components/forms/formikSelect'
import { ELeather, ELeatherColor } from '@/enums/materials'
import { EProductAssignment, EProductCategory } from '@/enums/product'
import { leatherColorsArray } from '@/objects/colors/leatherColorsValues'
import { productAssignmentsArray } from '@/objects/products/productAssignments'
import { productCategoriesArray } from '@/objects/products/productCategories'

const selectItemsToFiltersTransformer: SelectItemsToFiltersTransformerFnType = (items, filterKey) =>
  items.map(item => ({ ...item, filterKey }))

export type FilterType<T, K extends EFilterKeys> = {
  _id: string
  value: T
  title: string
  filterKey: K
}
export type GeneralFilterType = FilterType<
  EProductAssignment | EProductCategory | ELeather | ELeatherColor | string,
  EFilterKeys
>

export enum EFilterKeys {
  ASSIGNMENTS = 'assignments',
  CATEGORIES = 'categories',
  LEATHERS = 'leathers',
  LEATHER_COLORS = 'leatherColors',
}

export const productCategoriesFilters = selectItemsToFiltersTransformer(
  productCategoriesArray,
  EFilterKeys.CATEGORIES
)
export const productAssignmentsFilters = selectItemsToFiltersTransformer(
  productAssignmentsArray,
  EFilterKeys.ASSIGNMENTS
)
export const leatherColorFilters = selectItemsToFiltersTransformer(
  leatherColorsArray,
  EFilterKeys.LEATHER_COLORS
)

type SelectItemsToFiltersTransformerFnType = <T>(
  items: SelectItemType<T>[],
  filterKey: EFilterKeys
) => FilterType<T, EFilterKeys>[]
