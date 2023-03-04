import { TLeather } from '@/enums/materials'
import { leathers } from '@/mocks/products'
import { GeneralLeatherColorType } from '@/types/productType'

export const getProductColors = (codes: string[], leather: TLeather): GeneralLeatherColorType[] => {
  return codes.map(
    code => leathers[leather].find(el => el.code === code) || ({} as GeneralLeatherColorType)
  )
}
