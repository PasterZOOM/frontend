import { FC } from 'react'

import { TableItem } from '@/components/common/ui/tabel/tableItem'
import { CreateFormAndListWrapper } from '@/components/common/wrappers/createFormAndListWrapper'
import CreateBasicProductForm from '@/features/basicProducts/forms/createBasicProductForm'
import { useGetAllBasicProducts } from '@/features/basicProducts/hooks/useGetAllBasicProducts'
import { BasicProductModal } from '@/features/basicProducts/modals/basicProductModal'

type PropsType = {
  className?: string
}

export const BasicProducts: FC<PropsType> = ({ className }) => {
  const baseProducts = useGetAllBasicProducts()

  return (
    <CreateFormAndListWrapper
      title="Список базовых изделий:"
      form={<CreateBasicProductForm />}
      className={className}
    >
      {baseProducts.map(baseProduct => (
        <TableItem key={baseProduct._id} name={baseProduct.title}>
          {({ closeModal, isOpen }) => (
            <BasicProductModal closeModal={closeModal} isOpen={isOpen} id={baseProduct._id} />
          )}
        </TableItem>
      ))}
    </CreateFormAndListWrapper>
  )
}
