import { v1 } from 'uuid'

import { ELeather, ELeatherColor } from '@/enums/materials'
import { EProductAssignment, EProductCategory } from '@/enums/product'

export type FilterType<T, K extends EFilterKeys> = {
  id: string
  value: T
  title: string
  filterKey: K
}

export type GeneralFilterType = FilterType<
  EProductAssignment | EProductCategory | ELeather | ELeatherColor,
  EFilterKeys
>

export enum EFilterKeys {
  ASSIGNMENTS = 'assignments',
  CATEGORIES = 'categories',
  LEATHERS = 'leathers',
  LEATHER_COLORS = 'leatherColors',
}

export const assignmentFilters: FilterType<EProductAssignment, EFilterKeys.ASSIGNMENTS>[] = [
  {
    id: v1(),
    title: 'Для карт',
    value: EProductAssignment.FOR_CARDS,
    filterKey: EFilterKeys.ASSIGNMENTS,
  },
  {
    id: v1(),
    title: 'Для купюр',
    value: EProductAssignment.FOR_CASH,
    filterKey: EFilterKeys.ASSIGNMENTS,
  },
  {
    id: v1(),
    title: 'Для монет',
    value: EProductAssignment.FOR_COINS,
    filterKey: EFilterKeys.ASSIGNMENTS,
  },
  {
    id: v1(),
    title: 'Для документов',
    value: EProductAssignment.FOR_DOCUMENTS,
    filterKey: EFilterKeys.ASSIGNMENTS,
  },
]
export const categoryFilters: FilterType<EProductCategory, EFilterKeys.CATEGORIES>[] = [
  {
    id: v1(),
    title: 'Бифолд',
    value: EProductCategory.BIFOLD_WALLET,
    filterKey: EFilterKeys.CATEGORIES,
  },
  {
    id: v1(),
    title: 'Кардхолдер',
    value: EProductCategory.CARD_HOLDER,
    filterKey: EFilterKeys.CATEGORIES,
  },
  {
    id: v1(),
    title: 'Обложка для паспорта',
    value: EProductCategory.PASSPORT_COVER,
    filterKey: EFilterKeys.CATEGORIES,
  },
]
export const leatherFilters: FilterType<ELeather, EFilterKeys.LEATHERS>[] = [
  { id: v1(), title: 'Buttero', value: ELeather.BUTTERO, filterKey: EFilterKeys.LEATHERS },
  { id: v1(), title: 'WAX', value: ELeather.WAX, filterKey: EFilterKeys.LEATHERS },
  { id: v1(), title: 'Pueblo', value: ELeather.PUEBLO, filterKey: EFilterKeys.LEATHERS },
]
export const leatherColorFilters: FilterType<ELeatherColor, EFilterKeys.LEATHER_COLORS>[] = [
  { id: v1(), title: 'Черный', value: ELeatherColor.BLACK, filterKey: EFilterKeys.LEATHER_COLORS },
  { id: v1(), title: 'Красный', value: ELeatherColor.RED, filterKey: EFilterKeys.LEATHER_COLORS },
  { id: v1(), title: 'Зеленый', value: ELeatherColor.GREEN, filterKey: EFilterKeys.LEATHER_COLORS },
  { id: v1(), title: 'Желтый', value: ELeatherColor.YELLOW, filterKey: EFilterKeys.LEATHER_COLORS },
]

export const filters: Record<EFilterKeys, GeneralFilterType[]> = {
  [EFilterKeys.ASSIGNMENTS]: assignmentFilters,
  [EFilterKeys.CATEGORIES]: categoryFilters,
  [EFilterKeys.LEATHERS]: leatherFilters,
  [EFilterKeys.LEATHER_COLORS]: leatherColorFilters,
}
