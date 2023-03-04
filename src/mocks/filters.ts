import { v1 } from 'uuid'

import { ELeather, ELeatherColor, TLeather, TLeatherColor } from '@/enums/materials'
import {
  EProductAssignment,
  EProductCategory,
  TProductAssignment,
  TProductCategory,
} from '@/enums/product'

export type FilterType<T extends TProductAssignment | TProductCategory | TLeather | TLeatherColor> =
  {
    id: string
    value: T
    title: string
  }

export type GeneralFilterType = FilterType<
  TProductAssignment | TProductCategory | TLeather | TLeatherColor
>

export const assignmentFilters: FilterType<TProductAssignment>[] = [
  { id: v1(), title: 'Для карт', value: EProductAssignment.FOR_CARDS },
  { id: v1(), title: 'Для купюр', value: EProductAssignment.FOR_CASH },
  { id: v1(), title: 'Для монет', value: EProductAssignment.FOR_COINS },
  { id: v1(), title: 'Для документов', value: EProductAssignment.FOR_DOCUMENTS },
]
export const productCategoryFilters: FilterType<TProductCategory>[] = [
  { id: v1(), title: 'Бифолд', value: EProductCategory.BIFOLD_WALLET },
  { id: v1(), title: 'Кардхолдер', value: EProductCategory.CARD_HOLDER },
  { id: v1(), title: 'Обложка для паспорта', value: EProductCategory.PASSPORT_COVER },
]
export const leatherFilters: FilterType<TLeather>[] = [
  { id: v1(), title: 'Buttero', value: ELeather.BUTTERO },
  { id: v1(), title: 'WAX', value: ELeather.WAX },
  { id: v1(), title: 'Pueblo', value: ELeather.PUEBLO },
]
export const leatherColorFilters: FilterType<TLeatherColor>[] = [
  { id: v1(), title: 'Черный', value: ELeatherColor.BLACK },
  { id: v1(), title: 'Красный', value: ELeatherColor.RED },
  { id: v1(), title: 'Зеленый', value: ELeatherColor.GREEN },
  { id: v1(), title: 'Желтый', value: ELeatherColor.YELLOW },
]
