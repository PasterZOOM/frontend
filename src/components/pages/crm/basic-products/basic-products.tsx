import { FC } from 'react'

import { useTranslation } from 'next-i18next'

import { TableItem } from 'components/common/ui/tabel/tableItem'
import { TypographyHeader } from 'components/common/ui/typographyHeader/typographyHeader'
import { CreateFormAndListWrapper } from 'components/common/wrappers/createFormAndListWrapper'
import { CreateBasicProductForm } from 'features/basicProducts/forms/createBasicProductForm'
import { useGetAllBasicProducts } from 'features/basicProducts/hooks/useGetAllBasicProducts'
import { BasicProductModal } from 'features/basicProducts/modals/basicProductModal'
import { useRedirect } from 'hooks/useRedirect'

export const BasicProducts: FC = () => {
  useRedirect()
  const { t } = useTranslation()

  const { data: products } = useGetAllBasicProducts()

  // useRefetchAfterChangeLocale(refetch)

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
