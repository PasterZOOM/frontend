import { ELeatherColor } from '@/enums/materials'
import { ECreateLeatherColorParams } from '@/features/leatherColors/enums/paramsKeys'

export type CreateLeatherColorFormType = Record<ECreateLeatherColorParams, string> & {
  [ECreateLeatherColorParams.VALUE]: ELeatherColor
}
