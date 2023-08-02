import { FC } from 'react'

import { ProductCardView } from 'components/pages/catalog/productCard/productCardView'
import { ProductCardViewMobile } from 'components/pages/catalog/productCard/productCardViewMobile'
import { DESKTOP } from 'constants/sizes/screenSizes'
import { useWindowSize } from 'shared/lib/hooks/useWindowSize'
import { ProductPhotoType } from 'types/productType'

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
