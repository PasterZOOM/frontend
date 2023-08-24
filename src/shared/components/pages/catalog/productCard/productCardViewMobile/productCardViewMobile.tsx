import { FC, memo } from 'react'

import classnames from 'classnames'
import Image from 'next/image'
import { Keyboard, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import cls from './productCardViewMobile.module.scss'

import { getImageSizes } from 'shared/lib/images/getImageSizes'
import { ProductPhotoType } from 'shared/types/productType'

type PropsType = {
  className?: string
  photos: ProductPhotoType[]
}
const imageSizes = getImageSizes({
  $4_TABLET_M: '100vw',
  $6_LAPTOP_S: '50vw',
  $7_LAPTOP_M: '33vw',
  DEFAULT: '25vw',
})
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
              priority
              alt={photo.path}
              className="h-full w-full object-cover"
              quality={100}
              sizes={imageSizes}
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
