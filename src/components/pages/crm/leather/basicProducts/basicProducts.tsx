import { FC } from 'react'

import { CreateFormAndListWrapper } from '@/components/common/wrappers/createFormAndListWrapper'
import CreateBasicProductForm from '@/components/forms/crm/basicProducts/createBasicProductForm'
import { BasicProductModal } from '@/components/modals/crm/basicProducts/basicProductModal'
import { TableItem } from '@/components/pages/crm/tableItem'
import { useGetAllBasicProducts } from '@/hooks/crm/basicProducts/useGetAllBasicProducts'

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
