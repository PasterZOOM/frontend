import { FC, ReactNode } from 'react'

import { Button, ButtonVariant } from '@/components/common/ui/buttons/button'
import { DefaultButtonPropsType } from '@/components/common/ui/buttons/defaultButtonType'
import { ModalOverlay } from '@/components/modals/modalOverlay'

type PropsType = {
  isOpen: boolean
  closeModal: () => void
  children: ReactNode
  title: string
  confirmButton: DefaultButtonPropsType & {
    variant?: ButtonVariant
  }
}

export const ConfirmModalLayout: FC<PropsType> = ({
  isOpen,
  closeModal,
  children,
  title,
  confirmButton,
}) => {
  return (
    <ModalOverlay isOpen={isOpen} onClose={closeModal}>
      <div className="flex max-w-[18rem] flex-col justify-between gap-4 bg-white p-4 dark:bg-anthracite-gray md:max-w-[95%]">
        <div className="flex justify-between gap-2">
          <div className="text-xl">{title}</div>
          <button type="button" onClick={closeModal} className="h-fit text-lg">
            закрыть
          </button>
        </div>

        <div>{children}</div>

        <div role="button" className="flex flex-col justify-between gap-4 md:flex-row">
          <Button onClick={closeModal} variant={ButtonVariant.SECONDARY} className="w-full">
            Отменить
          </Button>
          <Button {...confirmButton} className="w-full" />
        </div>
      </div>
    </ModalOverlay>
  )
}
