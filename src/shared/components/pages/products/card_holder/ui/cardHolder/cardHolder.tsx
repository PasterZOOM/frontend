import { FC, memo } from 'react'

import classnames from 'classnames'
import { useRouter } from 'next/router'

import cls from './cardHolder.module.scss'

import { useGetBasicProduct } from 'features/basicProducts/hooks/useGetBasicProduct'
import { useGetLeatherArticle } from 'features/leatherArticles/hooks/useGetLeatherArticle'
import { useGetLeatherFactory } from 'features/leatherFactories/hooks/useGetLeatherFactory'
import { MainContainer } from 'shared/components/common/containers/mainContainer'
import { Price } from 'shared/ui/price/price'
import { TypographyHeader } from 'shared/ui/typographyHeader/typographyHeader'

type PropsType = {
  className?: string
}

const CardHolder: FC<PropsType> = ({ className }) => {
  const { query } = useRouter()
  const { data: product } = useGetBasicProduct(query.id as string)
  const { data: factory } = useGetLeatherFactory(product?.leather.factory._id || '')
  const { data: article } = useGetLeatherArticle(product?.leather.article._id || '')

  if (!product || !factory || !article) return null

  return (
    <MainContainer className="relative min-h-[calc(100vh-9.625rem)] grid-cols-12 gap-6 py-5 md:min-h-[calc(100vh-10.625rem)] xl:grid xl:min-h-fit">
      <div className="col-span-9">
        <div>{product.description}</div>

        <div>{factory.description}</div>

        <div>{article.description}</div>
      </div>
      <div className="col-span-3">
        <TypographyHeader as="h3" className={classnames(cls.cardHolder, className)}>
          {product.title}
        </TypographyHeader>
        <Price className="text-5xl font-bold" cost={product.cost} />
      </div>
    </MainContainer>
  )
}

const Memo = memo(CardHolder)

export { Memo as CardHolder }
