import { FC } from 'react'

import { Keyboard, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { ProductPhotoType } from 'shared/types/productType'

type PropsType = {
  photos: ProductPhotoType[]
}

export const ProductCardViewMobile: FC<PropsType> = ({ photos }) => {
  return (
    <Swiper
      loop
      pagination
      className="mySwiper flex aspect-square w-full justify-between"
      modules={[Pagination, Keyboard]}
      onUpdate={swiper => {
        swiper.slideTo(0)
      }}
    >
      {photos.map(photo => {
        return (
          <SwiperSlide key={photo._id} className="w-fit">
            <div className={`${photo.path} h-full w-full`} />
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
