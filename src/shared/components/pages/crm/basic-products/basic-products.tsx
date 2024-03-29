import { FC } from 'react'

import { useTranslation } from 'next-i18next'

import { CreateBasicProductForm } from '@/features/basicProducts/forms/ui/createBasicProductForm'
import { useGetAllBasicProducts } from '@/features/basicProducts/hooks/useGetAllBasicProducts'
import { BasicProductModal } from '@/features/basicProducts/modals/basicProductModal'
import { CreateFormAndListWrapper } from '@/shared/components/common/wrappers/createFormAndListWrapper'
import { useRedirect } from '@/shared/lib/hooks/useRedirect'
import { TableItem } from '@/shared/ui/tabel/tableItem'
import { TypographyHeader } from '@/shared/ui/typographyHeader/typographyHeader'

export const BasicProducts: FC = () => {
  useRedirect()
  const { t } = useTranslation()

  const { data: products } = useGetAllBasicProducts()

  return (
    <>
      <TypographyHeader as="h1" className="mb-6 text-center">
        {t('Базовые изделия')}
      </TypographyHeader>
      <CreateFormAndListWrapper
        className="w-full"
        form={<CreateBasicProductForm />}
        title="Список базовых изделий:"
      >
        {products &&
          products.data.map(product => (
            <TableItem key={product._id} title={product.title}>
              {({ closeModal, isOpen }) => (
                <BasicProductModal closeModal={closeModal} id={product._id} isOpen={isOpen} />
              )}
            </TableItem>
          ))}
      </CreateFormAndListWrapper>
    </>
  )
}
