import { FC } from 'react'

import { ModalLayout } from '@/components/modals/crm/modalLayout'
import { BasicProductInfo } from '@/components/pages/crm/leather/basicProducts/basicProductInfo'
import { useGetBasicProduct } from '@/hooks/crm/basicProducts/useGetBasicProduct'
import { useRemoveBasicProduct } from '@/hooks/crm/basicProducts/useRemoveBasicProduct'

type PropsType = {
  isOpen: boolean
  closeModal: () => void
  id: string
}

export const BasicProductModal: FC<PropsType> = ({ isOpen, closeModal, id }) => {
  const basicProduct = useGetBasicProduct(id, isOpen)
  const removeProduct = useRemoveBasicProduct()

  const onDeleteConfirm = async (): Promise<void> => {
    await removeProduct(id)
    closeModal()
  }

  return (
    <ModalLayout
      isOpen={isOpen}
      closeModal={closeModal}
      title={`Информация о фабрике ${basicProduct && basicProduct.title}`}
    >
      {basicProduct && (
        <div className="flex gap-4 p-4">
          <BasicProductInfo basicProduct={basicProduct} onDeleteConfirm={onDeleteConfirm} />
        </div>
      )}
    </ModalLayout>
  )
}
