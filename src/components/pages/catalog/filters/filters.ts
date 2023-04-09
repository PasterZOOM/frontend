import { SelectItemType } from '@/components/forms/formikSelect'
import { EFilterKeys, FilterType } from '@/mocks/filters'
import { leatherColorsArray } from '@/objects/colors/leatherColorsValues'
import { productAssignmentsArray } from '@/objects/products/productAssignments'
import { productCategoriesArray } from '@/objects/products/productCategories'

const selectItemsToFiltersTransformer: SelectItemsToFiltersTransformerFnType = (items, filterKey) =>
  items.map(item => ({ ...item, filterKey }))

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
