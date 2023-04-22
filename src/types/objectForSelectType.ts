import { SelectItemType } from 'components/common/ui/selects/defaultSelectType'

export type ObjectForSelectType<T extends string> = Record<T, SelectItemType<T>>
