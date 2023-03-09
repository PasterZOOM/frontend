import { FC } from 'react'

import { Button } from '@/components/common/ui/buttons/button'
import { ModalOverlay } from '@/components/modals/overlay'

type PropsType = {
  isOpen: boolean
  closeModal: () => void
  itemName?: string
  onConfirm: () => void
}

export const ConfirmDeleteModal: FC<PropsType> = ({
  isOpen,
  closeModal,
  itemName = 'это',
  onConfirm,
}) => {
  return (
    <ModalOverlay isOpen={isOpen} onClose={closeModal} modalContainer="#confirmModal">
      <div className="relative flex max-w-[18rem] flex-col justify-between gap-4 bg-white p-4 pt-12 dark:bg-anthracite-gray md:max-w-[25rem]">
        <button type="button" onClick={closeModal} className="absolute top-4 right-4 z-10 text-lg">
          закрыть
        </button>
        <div className="whitespace-normal">
          Вы точно хотите удалить <b>{itemName}</b>?
        </div>
        <div className="flex flex-col justify-between gap-4 md:flex-row">
          <Button onClick={closeModal} variant="secondary">
            Отменить
          </Button>
          <Button onClick={onConfirm} className="bg-red-500 hover:bg-red-200">
            Подтвердить
          </Button>
        </div>
      </div>
    </ModalOverlay>
  )
}
