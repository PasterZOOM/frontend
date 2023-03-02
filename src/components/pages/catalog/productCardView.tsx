import { FC, useEffect, useState } from 'react'

import { ProductPhotoType } from '@/types/productType'

type PropsType = {
  photos: ProductPhotoType[]
}

export const ProductCardView: FC<PropsType> = ({ photos }) => {
  const [activePhoto, setActivePhoto] = useState(photos[0])
  const [isHover, setIsHover] = useState(false)

  const mouseMoveHandler = (photo: ProductPhotoType): void => {
    setActivePhoto(photo)
    setIsHover(true)
  }

  const leaveMouseHandler = (): void => {
    setActivePhoto(photos[0])
    setIsHover(false)
  }

  useEffect(() => {
    setActivePhoto(photos[0])
  }, [photos])

  return (
    <div className={`flex aspect-square w-full justify-between  ${activePhoto.url}`}>
      {photos.map(photo => (
        <div
          key={photo.id}
          onMouseMove={() => mouseMoveHandler(photo)}
          onMouseLeave={leaveMouseHandler}
          className="relative flex w-full cursor-zoom-in justify-center"
        >
          <div
            className={`absolute bottom-1  h-1 w-11/12 rounded-full bg-white dark:bg-anthracite-gray ${
              isHover ? '' : 'hidden'
            } ${activePhoto.id !== photo.id ? 'opacity-50' : ''}`}
          />
        </div>
      ))}
    </div>
  )
}
