import { FC, memo, useCallback } from 'react'

import Image from 'next/image'

import { RemoveBasicProductPhotoParamsType } from 'features/basicProducts/api/types'
import { ProductPhotoType } from 'shared/types/productType'

type PropsType = {
  photo: ProductPhotoType
  productId: string
  removeBasicProductPhoto: (data: RemoveBasicProductPhotoParamsType) => void
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
    <div>
      <div className="relative h-40 w-40">
        <Image
          fill
          alt={photo.path}
          className="h-full w-full object-cover"
          quality={100}
          sizes="400px"
          src={photo.path}
        />
        <button
          className="absolute right-0 z-10 px-2 text-red-500"
          type="button"
          onClick={onButtonClick}
        >
          X
        </button>
      </div>
    </div>
  )
}

export const BasicProductPhoto = memo(Component)
