import { colors } from '@/mocks/products'
import { LeatherColorType } from '@/types/productType'

export const getProductColors = (colorsId: string[]): LeatherColorType[] => {
  return colorsId.map(colorId => colors.find(el => el._id === colorId) || ({} as LeatherColorType))
}
