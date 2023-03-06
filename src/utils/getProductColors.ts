import { ELeather } from '@/enums/materials'
import { leathers } from '@/mocks/productsMock'
import { GeneralLeatherColorType } from '@/types/productType'

export const getProductColors = (codes: string[], leather: ELeather): GeneralLeatherColorType[] => {
  return codes.map(
    code => leathers[leather].find(el => el.code === code) || ({} as GeneralLeatherColorType)
  )
}
