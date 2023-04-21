import { FC } from 'react'

import { Keyboard, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { ProductPhotoType } from 'types/productType'

type PropsType = {
  photos: ProductPhotoType[]
}

export const ProductCardViewMobile: FC<PropsType> = ({ photos }) => {
  return (
    <Swiper
      pagination
      modules={[Pagination, Keyboard]}
      className="mySwiper flex aspect-square w-full justify-between"
    >
      {photos.map(photo => {
        return (
          <SwiperSlide key={photo._id} className="w-fit">
            <div className={`${photo.url} h-full w-full`} />
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
