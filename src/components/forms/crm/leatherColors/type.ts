import { ECreateLeatherColorParams } from '@/enums/crm/leatherColor'
import { ELeatherColor } from '@/enums/materials'

export type CreateLeatherColorFormType = Record<ECreateLeatherColorParams, string> & {
  [ECreateLeatherColorParams.VALUE]: ELeatherColor
}
