import { FC, ReactNode } from 'react'

import { Button } from '@/components/common/ui/buttons/button'
import { ConfirmModalLayout } from '@/components/modals/confirmModalLayout'
import { useModal } from '@/hooks/useModal'

type PropsType = {
  modalChildren: ReactNode
  onConfirm: () => void
  className?: string
}

export const CreateButton: FC<PropsType> = ({
  className,
  onConfirm: onCreateConfirm,
  modalChildren,
}) => {
  const { openModal, closeModal, isOpen } = useModal()

  const onConfirm = async (): Promise<void> => {
    await onCreateConfirm()
    closeModal()
  }

  return (
    <>
      <Button onClick={openModal} className={`w-full ${className || ''}`}>
        создать
      </Button>
      <ConfirmModalLayout
        closeModal={closeModal}
        isOpen={isOpen}
        title="Создание"
        confirmButton={{
          children: 'создать',
          onClick: onConfirm,
          type: 'submit',
        }}
      >
        {modalChildren}
      </ConfirmModalLayout>
    </>
  )
}
