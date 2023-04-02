import { v1 } from 'uuid'

import { ELeather, ELeatherColor } from '@/enums/materials'
import { EProductAssignment, EProductCategory } from '@/enums/product'

export type FilterType<T, K extends EFilterKeys> = {
  _id: string
  value: T
  title: string
  filterKey?: K
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

export const productAssignmentsFilters: FilterType<EProductAssignment, EFilterKeys.ASSIGNMENTS>[] =
  [
    {
      _id: v1(),
      value: EProductAssignment.FOR_CARDS,
      title: 'Для кард',
      filterKey: EFilterKeys.ASSIGNMENTS,
    },
    {
      _id: v1(),
      value: EProductAssignment.FOR_CASH,
      title: 'Для купюр',
      filterKey: EFilterKeys.ASSIGNMENTS,
    },
    {
      _id: v1(),
      value: EProductAssignment.FOR_COINS,
      title: 'Для монет',
      filterKey: EFilterKeys.ASSIGNMENTS,
    },
    {
      _id: v1(),
      value: EProductAssignment.FOR_DOCUMENTS,
      title: 'Для документов',
      filterKey: EFilterKeys.ASSIGNMENTS,
    },
    {
      _id: v1(),
      value: EProductAssignment.FOR_WATCH,
      title: 'Для часов',
      filterKey: EFilterKeys.ASSIGNMENTS,
    },
    {
      _id: v1(),
      value: EProductAssignment.FOR_CLOTH,
      title: 'Для одежды',
      filterKey: EFilterKeys.ASSIGNMENTS,
    },
    {
      _id: v1(),
      value: EProductAssignment.FOR_AIRPODS,
      title: 'Для Air Pods',
      filterKey: EFilterKeys.ASSIGNMENTS,
    },
  ]
export const productCategoriesFilters: FilterType<EProductCategory, EFilterKeys.CATEGORIES>[] = [
  {
    _id: v1(),
    value: EProductCategory.CARD_HOLDER,
    title: 'Кард холдер',
    filterKey: EFilterKeys.CATEGORIES,
  },
  {
    _id: v1(),
    value: EProductCategory.PASSPORT_COVER,
    title: 'Обложка для паспорта',
    filterKey: EFilterKeys.CATEGORIES,
  },
  {
    _id: v1(),
    value: EProductCategory.BIFOLD_WALLET,
    title: 'Би-фодл',
    filterKey: EFilterKeys.CATEGORIES,
  },
  {
    _id: v1(),
    value: EProductCategory.BELT,
    title: 'Поясной ремень',
    filterKey: EFilterKeys.CATEGORIES,
  },
  { _id: v1(), value: EProductCategory.PURSE, title: 'Кошелек', filterKey: EFilterKeys.CATEGORIES },
  {
    _id: v1(),
    value: EProductCategory.HOLDER_FOR_AUTO_DOCS,
    title: 'Авто-док холдер',
    filterKey: EFilterKeys.CATEGORIES,
  },
  {
    _id: v1(),
    value: EProductCategory.DOC_HOLDER,
    title: 'Док холдер',
    filterKey: EFilterKeys.CATEGORIES,
  },
  {
    _id: v1(),
    value: EProductCategory.WATCH_STRAP,
    title: 'Часовой ремешок',
    filterKey: EFilterKeys.CATEGORIES,
  },
]
export const leatherFilters: FilterType<ELeather, EFilterKeys.LEATHERS>[] = [
  { _id: v1(), title: 'Buttero', value: ELeather.BUTTERO, filterKey: EFilterKeys.LEATHERS },
  { _id: v1(), title: 'WAX', value: ELeather.WAX, filterKey: EFilterKeys.LEATHERS },
  { _id: v1(), title: 'Pueblo', value: ELeather.PUEBLO, filterKey: EFilterKeys.LEATHERS },
]
export const leatherColorFilters: FilterType<ELeatherColor, EFilterKeys.LEATHER_COLORS>[] = [
  { _id: v1(), title: 'Черный', value: ELeatherColor.BLACK, filterKey: EFilterKeys.LEATHER_COLORS },
  { _id: v1(), title: 'Красный', value: ELeatherColor.RED, filterKey: EFilterKeys.LEATHER_COLORS },
  {
    _id: v1(),
    title: 'Зеленый',
    value: ELeatherColor.GREEN,
    filterKey: EFilterKeys.LEATHER_COLORS,
  },
  {
    _id: v1(),
    title: 'Желтый',
    value: ELeatherColor.YELLOW,
    filterKey: EFilterKeys.LEATHER_COLORS,
  },
]

export const filters: Record<EFilterKeys, GeneralFilterType[]> = {
  [EFilterKeys.ASSIGNMENTS]: productAssignmentsFilters,
  [EFilterKeys.CATEGORIES]: productCategoriesFilters,
  [EFilterKeys.LEATHERS]: leatherFilters,
  [EFilterKeys.LEATHER_COLORS]: leatherColorFilters,
}
