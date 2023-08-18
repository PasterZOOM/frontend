import { FC } from 'react'

import { ProductCardView } from './productCardView'
import { ProductCardViewMobile } from './productCardViewMobile'

import { DESKTOP } from 'shared/constants/sizes/screenSizes'
import { useWindowSize } from 'shared/lib/hooks/useWindowSize'
import { ProductPhotoType } from 'shared/types/productType'

type PropsType = {
  photos: ProductPhotoType[]
}

export const ProductCardPhoto: FC<PropsType> = ({ photos }) => {
  const { width } = useWindowSize()

  return width > DESKTOP ? (
    <ProductCardView photos={photos} />
  ) : (
    <ProductCardViewMobile photos={photos} />
  )
}
