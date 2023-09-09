import { FC, memo, useState } from 'react'

import classnames from 'classnames'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { FreeMode, Keyboard, Mousewheel, Navigation, Thumbs, Zoom } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperClass } from 'swiper/types'

import cls from './detailProductSlider.module.scss'

import { PhotosType } from 'shared/types/productType'

type PropsType = {
  activeColor: string
  className?: string
  photos: PhotosType
}

const DetailProductSlider: FC<PropsType> = ({ className, photos, activeColor }) => {
  const { t } = useTranslation('translation')
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null)

  return (
    <div className={classnames(cls.detailProductSlider, className)}>
      <Swiper
        freeMode
        mousewheel
        watchSlidesProgress
        className={classnames(cls.mySwiperThumps, 'mySwiper')}
        direction="vertical"
        modules={[FreeMode, Thumbs, Mousewheel]}
        slidesPerView={4.5}
        spaceBetween={8}
        onSwiper={setThumbsSwiper}
      >
        {photos[activeColor].map(photo => (
          <SwiperSlide key={photo._id} className={cls.slideMiniWrapper}>
            <div className={cls.slideMini}>
              <Image fill alt={photo.path} className=" object-cover" src={photo.path} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        keyboard
        navigation
        className={cls.mySwiper}
        modules={[FreeMode, Navigation, Thumbs, Zoom, Keyboard]}
        title={t('Двойной клик для увеличения')}
        thumbs={{
          swiper: thumbsSwiper,
        }}
        zoom={{
          zoomedSlideClass: cls.swiperSlideZoomed,
          containerClass: cls.swiperZoomContainer,
        }}
      >
        {photos[activeColor].map(photo => (
          <SwiperSlide key={photo._id} className={cls.slide}>
            <div className={cls.swiperZoomContainer}>
              <Image
                fill
                alt={photo.path}
                className="h-full w-full object-cover"
                src={photo.path}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

const Memo = memo(DetailProductSlider)

export { Memo as DetailProductSlider }
