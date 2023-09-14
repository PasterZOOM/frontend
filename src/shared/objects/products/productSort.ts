import { v1 } from 'uuid'

import { ESort } from '@/shared/enums/sort'
import { ObjectForSelectType } from '@/shared/types/objectForSelectType'
import { SelectItemType } from '@/shared/ui/selects/defaultSelectType'

export const productSort: ObjectForSelectType<ESort> = {
  [ESort.EXPENSIVE_FIRST]: {
    _id: v1(),
    value: ESort.EXPENSIVE_FIRST,
    title: 'Expensive first',
  },
  [ESort.CHEAP_FIRST]: {
    _id: v1(),
    value: ESort.CHEAP_FIRST,
    title: 'Cheap first',
  },
  [ESort.NEW_FIRSTS]: {
    _id: v1(),
    value: ESort.NEW_FIRSTS,
    title: 'New firsts',
  },
  [ESort.OLD_FIRSTS]: {
    _id: v1(),
    value: ESort.OLD_FIRSTS,
    title: 'Old firsts',
  },
}
export const productSortArray: SelectItemType<ESort>[] = Object.values(productSort)
