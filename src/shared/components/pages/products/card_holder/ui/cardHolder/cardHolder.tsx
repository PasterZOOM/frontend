import { FC, memo, useState } from 'react'

import classnames from 'classnames'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FreeMode, Keyboard, Mousewheel, Navigation, Thumbs, Zoom } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperClass } from 'swiper/types'

import cls from './cardHolder.module.scss'

import { useGetBasicProduct } from 'features/basicProducts/hooks/useGetBasicProduct'
import { useGetLeatherArticle } from 'features/leatherArticles/hooks/useGetLeatherArticle'
import { useGetLeatherFactory } from 'features/leatherFactories/hooks/useGetLeatherFactory'
import { MainContainer } from 'shared/components/common/containers/mainContainer'
import { useChangeQueryParams } from 'shared/lib/hooks/queryParams/useChangeQueryParams'
import { Price } from 'shared/ui/price/price'
import { TypographyHeader } from 'shared/ui/typographyHeader/typographyHeader'
import { selectIsVisible, useAppStore } from 'store/useAppStore'
import { ProductColorsButtons } from 'widgets/productColorsButtons'

type PropsType = {
  className?: string
}

const CardHolder: FC<PropsType> = ({ className }) => {
  const { query } = useRouter()
  const isVisible = useAppStore(selectIsVisible)
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null)

  const { changeParam } = useChangeQueryParams('active_color')
  const { data: product } = useGetBasicProduct(query.id as string)
  const { data: factory } = useGetLeatherFactory(product?.leather.factory._id || '')
  const { data: article } = useGetLeatherArticle(product?.leather.article._id || '')
  const [activeColor, setActiveColor] = useState(
    (query.active_color as string) || product?.productColors[0]?._id || ''
  )

  const chaneActiveColorHandler = (activeColorId: string): void => {
    setActiveColor(activeColorId)
    changeParam(activeColorId)
  }

  if (!product || !factory || !article) return null

  return (
    <MainContainer className="relative min-h-[calc(100vh-9.625rem)] grid-cols-12 gap-6 py-5 md:min-h-[calc(100vh-10.625rem)] xl:grid xl:min-h-fit">
      <div className={`col-span-8 h-fit duration-300 xl:sticky ${isVisible ? 'top-22' : 'top-5'}`}>
        {product.photos && (
          <div className={classnames(cls.swiperWrapper)}>
            <Swiper
              freeMode
              mousewheel
              watchSlidesProgress
              className={classnames(cls.mySwiperThumps, 'mySwiper')}
              direction="vertical"
              modules={[FreeMode, Thumbs, Mousewheel]}
              slidesPerView={4.5}
              onSwiper={setThumbsSwiper}
            >
              {product.photos[activeColor].map(photo => (
                <SwiperSlide key={photo._id} className={cls.slide}>
                  <Image fill alt={photo.path} className=" object-cover" src={photo.path} />
                </SwiperSlide>
              ))}
            </Swiper>
            <Swiper
              keyboard
              mousewheel
              navigation
              className={cls.mySwiper}
              modules={[FreeMode, Navigation, Thumbs, Zoom, Keyboard, Mousewheel]}
              thumbs={{
                swiper: thumbsSwiper,
              }}
              zoom={{
                zoomedSlideClass: cls.swiperSlideZoomed,
                containerClass: cls.swiperZoomContainer,
              }}
            >
              {product.photos[activeColor].map(photo => (
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
        )}
        <div>{product.description}</div>
      </div>
      <div className={`col-span-4 h-fit duration-300 xl:sticky ${isVisible ? 'top-22' : 'top-5'}`}>
        <TypographyHeader as="h3" className={classnames(cls.cardHolder, className)}>
          {product.title}
        </TypographyHeader>
        <Price className="text-5xl font-bold" cost={product.cost} />
        <ProductColorsButtons
          activeColor={activeColor}
          chaneActiveColor={chaneActiveColorHandler}
          colors={product.productColors}
        />
        <div>{product.productColors.find(color => color._id === activeColor)?.title}</div>
      </div>
    </MainContainer>
  )
}

const Memo = memo(CardHolder)

export { Memo as CardHolder }
