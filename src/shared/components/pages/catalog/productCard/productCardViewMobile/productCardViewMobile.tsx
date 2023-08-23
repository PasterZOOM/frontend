import { FC, memo } from 'react'

import classnames from 'classnames'
import Image from 'next/image'
import { Keyboard, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import cls from './productCardViewMobile.module.scss'

import { ProductPhotoType } from 'shared/types/productType'

type PropsType = {
  className?: string
  photos: ProductPhotoType[]
}

const ProductCardViewMobile: FC<PropsType> = ({ className, photos }) => {
  return (
    <Swiper
      loop
      pagination
      className={classnames(cls.productCardViewMobile, className, 'mySwiper')}
      modules={[Pagination, Keyboard]}
      onUpdate={swiper => {
        swiper.slideTo(0)
      }}
    >
      {photos.map(photo => {
        return (
          <SwiperSlide key={photo._id} className={classnames(cls.slide)}>
            <Image
              fill
              alt={photo.path}
              className="h-full w-full object-cover"
              sizes="400px"
              src={photo.path}
            />
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}

const Memo = memo(ProductCardViewMobile)

export { Memo as ProductCardViewMobile }
