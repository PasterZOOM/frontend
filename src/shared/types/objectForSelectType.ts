import { SelectItemType } from '@/shared/ui/selects/defaultSelectType'

export type ObjectForSelectType<T extends string> = Record<T, SelectItemType<T>>
