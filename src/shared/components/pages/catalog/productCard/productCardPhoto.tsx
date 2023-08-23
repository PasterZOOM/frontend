import { FC, memo } from 'react'

import { ProductCardView } from './productCardView'
import { ProductCardViewMobile } from './productCardViewMobile'

import { SCREEN } from 'features/basicProducts/enums/screen'
import { useWindowSize } from 'shared/lib/hooks/useWindowSize'
import { ProductPhotoType } from 'shared/types/productType'

type PropsType = {
  activePhoto: ProductPhotoType
  photos: ProductPhotoType[]
  setActivePhoto: (activeItem: ProductPhotoType) => void
}

const ProductCardPhoto: FC<PropsType> = ({ photos, activePhoto, setActivePhoto }) => {
  const { width } = useWindowSize()

  return width > SCREEN.LAPTOP_S ? (
    <ProductCardView activePhoto={activePhoto} photos={photos} setActivePhoto={setActivePhoto} />
  ) : (
    <ProductCardViewMobile photos={photos} />
  )
}

const Memo = memo(ProductCardPhoto)

export { Memo as ProductCardPhoto }
