import { FC, ReactNode } from 'react'

import { Button, ButtonVariant } from '@/components/common/ui/buttons/button'
import { ModalOverlay } from '@/components/modals/overlay'

type PropsType = {
  isOpen: boolean
  closeModal: () => void
  children: ReactNode
  title: string
  confirmButton: { children: string; variant?: ButtonVariant; onClick: () => void }
}

export const ConfirmModalLayout: FC<PropsType> = ({
  isOpen,
  closeModal,
  children,
  title,
  confirmButton,
}) => {
  return (
    <ModalOverlay isOpen={isOpen} onClose={closeModal} modalContainer="#confirmModal">
      <div className="flex max-w-[18rem] flex-col justify-between gap-4 bg-white p-4 dark:bg-anthracite-gray md:max-w-[25rem]">
        <div className="flex justify-between gap-2">
          <div className="text-xl">{title}</div>
          <button type="button" onClick={closeModal} className="h-fit text-lg">
            закрыть
          </button>
        </div>

        <div>{children}</div>

        <div className="flex flex-col justify-between gap-4 md:flex-row">
          <Button onClick={closeModal} variant={ButtonVariant.SECONDARY} className="w-full">
            Отменить
          </Button>
          <Button {...confirmButton} className="w-full" />
        </div>
      </div>
    </ModalOverlay>
  )
}