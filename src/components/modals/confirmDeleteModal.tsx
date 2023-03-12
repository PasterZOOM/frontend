import { FC, ReactNode } from 'react'

import { Button } from '@/components/common/ui/buttons/button'
import { ModalOverlay } from '@/components/modals/overlay'

type PropsType = {
  isOpen: boolean
  closeModal: () => void
  onConfirm: () => void
  info: ReactNode
}

export const ConfirmDeleteModal: FC<PropsType> = ({ isOpen, closeModal, onConfirm, info }) => {
  return (
    <ModalOverlay isOpen={isOpen} onClose={closeModal} modalContainer="#confirmModal">
      <div className="flex max-w-[18rem] flex-col justify-between gap-4 bg-white p-4 dark:bg-anthracite-gray md:max-w-[25rem]">
        <div className="flex justify-between gap-2">
          <div className="text-xl">Удаление</div>
          <button type="button" onClick={closeModal} className="h-fit text-lg">
            закрыть
          </button>
        </div>

        {info && <div>{info}</div>}

        <div className="flex flex-col justify-between gap-4 md:flex-row">
          <Button onClick={closeModal} variant="secondary">
            Отменить
          </Button>
          <Button onClick={onConfirm} variant="delete">
            Подтвердить
          </Button>
        </div>
      </div>
    </ModalOverlay>
  )
}
