import { FC } from 'react'

import { Keyboard, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { ProductPhotoType } from 'shared/types/productType'

type PropsType = {
  photos: ProductPhotoType[]
}

export const ProductCardViewMobile: FC<PropsType> = ({ photos }) => {
  // TODO: сбрасывать на первый слайд при смене цвета изделия
  return (
    <Swiper
      pagination
      className="mySwiper flex aspect-square w-full justify-between"
      modules={[Pagination, Keyboard]}
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
