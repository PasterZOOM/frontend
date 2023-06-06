import { FC } from 'react'

import { H1 } from 'components/common/ui/headers/h1'
import { TableItem } from 'components/common/ui/tabel/tableItem'
import { CreateFormAndListWrapper } from 'components/common/wrappers/createFormAndListWrapper'
import { CreateBasicProductForm } from 'features/basicProducts/forms/createBasicProductForm'
import { useGetAllBasicProducts } from 'features/basicProducts/hooks/useGetAllBasicProducts'
import { BasicProductModal } from 'features/basicProducts/modals/basicProductModal'
import { useRedirect } from 'hooks/useRedirect'
import { useRefetchAfterChangeLocale } from 'hooks/useRefetchAfterChangeLocale'

export const BasicProducts: FC = () => {
  useRedirect()

  const { data: products, refetch } = useGetAllBasicProducts()

  useRefetchAfterChangeLocale(refetch)

  return (
    <>
      <H1 className="mb-6 text-center">Базовые изделия</H1>
      <CreateFormAndListWrapper
        title="Список базовых изделий:"
        form={<CreateBasicProductForm />}
        className="w-full"
      >
        {products &&
          products.map(product => (
            <TableItem key={product._id} title={product.title}>
              {({ closeModal, isOpen }) => (
                <BasicProductModal closeModal={closeModal} isOpen={isOpen} id={product._id} />
              )}
            </TableItem>
          ))}
      </CreateFormAndListWrapper>
    </>
  )
}
