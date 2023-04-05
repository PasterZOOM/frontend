import { ELeather, ELeatherColor } from '@/enums/materials'
import { EProductAssignment, EProductCategory } from '@/enums/product'

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
