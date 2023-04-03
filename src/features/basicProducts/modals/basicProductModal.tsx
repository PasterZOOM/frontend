import { FC } from 'react'

import { ModalLayout } from '@/components/modals/modalLayout'
import { useGetBasicProduct } from '@/features/basicProducts/hooks/useGetBasicProduct'
import { useRemoveBasicProduct } from '@/features/basicProducts/hooks/useRemoveBasicProduct'
import { BasicProductInfo } from '@/features/basicProducts/pages/basicProductInfo'

type PropsType = {
  isOpen: boolean
  closeModal: () => void
  id: string
}

export const BasicProductModal: FC<PropsType> = ({ isOpen, closeModal, id }) => {
  const basicProduct = useGetBasicProduct(id, { enabled: isOpen })
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
