import { FC, memo, useCallback } from 'react'

import { RemoveBasicProductPhotoParamsType } from 'features/basicProducts/api/types'
import { ProductPhotoType } from 'shared/types/productType'

type PropsType = {
  photo: ProductPhotoType
  productId: string
  removeBasicProductPhoto: (params: RemoveBasicProductPhotoParamsType) => void
}

const Component: FC<PropsType> = ({ productId, photo, removeBasicProductPhoto }) => {
  const onButtonClick = useCallback(
    (): void =>
      removeBasicProductPhoto({
        productId,
        photoId: photo._id,
      }),
    [removeBasicProductPhoto, productId, photo._id]
  )

  return (
    <div key={photo._id} className="ml-5">
      <span className="mr-2">{photo.url}</span>
      <button className="border px-1" type="button" onClick={onButtonClick}>
        X
      </button>
    </div>
  )
}

export const BasicProductPhoto = memo(Component)
