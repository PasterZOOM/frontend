import { ECreateLeatherColorParams } from 'features/leatherColors/enums/paramsKeys'
import { ELeatherColor } from 'shared/enums/materials'

export type CreateLeatherColorFormType = Record<ECreateLeatherColorParams, string> & {
  [ECreateLeatherColorParams.VALUE]: ELeatherColor
}
