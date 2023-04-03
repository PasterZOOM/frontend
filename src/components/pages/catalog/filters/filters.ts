import { SelectItemType } from '@/components/forms/formikSelect'
import { EFilterKeys, FilterType } from '@/mocks/filters'
import { leatherColorValues } from '@/objects/colors/leatherColorValues'
import { productAssignments } from '@/objects/products/productAssignments'
import { productCategories } from '@/objects/products/productCategories'

const selectItemsToFiltersTransformer: SelectItemsToFiltersTransformerFnType = (items, filterKey) =>
  items.map(item => ({ ...item, filterKey }))

export const productCategoriesFilters = selectItemsToFiltersTransformer(
  Object.values(productCategories),
  EFilterKeys.CATEGORIES
)
export const productAssignmentsFilters = selectItemsToFiltersTransformer(
  Object.values(productAssignments),
  EFilterKeys.ASSIGNMENTS
)
export const leatherColorFilters = selectItemsToFiltersTransformer(
  Object.values(leatherColorValues),
  EFilterKeys.LEATHER_COLORS
)

type SelectItemsToFiltersTransformerFnType = <T>(
  items: SelectItemType<T>[],
  filterKey: EFilterKeys
) => FilterType<T, EFilterKeys>[]
