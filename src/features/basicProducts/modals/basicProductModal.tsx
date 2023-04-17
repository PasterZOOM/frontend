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
  const { data: product } = useGetBasicProduct(id, { enabled: isOpen })
  const { mutateAsync: removeProduct } = useRemoveBasicProduct()

  const onDeleteConfirm = async (): Promise<void> => {
    try {
      await removeProduct(id)
      closeModal()
    } catch (e) {
      /* empty */
    }
  }

  return (
    <ModalLayout
      isOpen={isOpen}
      closeModal={closeModal}
      title={`Информация о фабрике ${product?.title}`}
    >
      {product && (
        <div className="flex gap-4 p-4">
          <BasicProductInfo product={product} onDeleteConfirm={onDeleteConfirm} />
        </div>
      )}
    </ModalLayout>
  )
}
