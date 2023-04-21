import { SelectItemType } from 'components/forms/formikSelect'

export type ObjectForSelectType<T extends string> = Record<T, SelectItemType<T>>
