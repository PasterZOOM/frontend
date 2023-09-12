import { FC, memo } from 'react'

import classnames from 'classnames'
import { useTranslation } from 'next-i18next'

import { useGetAllBasicProducts } from 'features/basicProducts/hooks/useGetAllBasicProducts'
import { ProductCard } from 'shared/components/pages/catalog/productCard/productCard/productCard'
import { TypographyHeader } from 'shared/ui/typographyHeader/typographyHeader'
import { Loader } from 'widgets/loader'

type PropsType = {
  className?: string
}

const ProductsItems: FC<PropsType> = props => {
  const { className } = props

  const { t } = useTranslation()
  const { data: products, isLoading } = useGetAllBasicProducts({ keepPreviousData: true })

  if (isLoading) {
    return <Loader className={classnames(className, 'col-span-full h-96 w-full')} />
  }

  if (!products || products.data.length === 0) {
    return (
      <div
        className={classnames(
          className,
          'col-span-full flex h-96 w-full items-center justify-center'
        )}
      >
        <TypographyHeader as="h2">{t('Ничего не найдено')}</TypographyHeader>
      </div>
    )
  }

  return (
    <>
      {products.data.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </>
  )
}

const Memo = memo(ProductsItems)

export { Memo as ProductsItems }
