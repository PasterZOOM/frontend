import { FC, ReactNode } from 'react'

import { Button } from '@/components/common/ui/buttons/button'
import { ConfirmModalLayout } from '@/components/modals/confirmModalLayout'
import { useModal } from '@/hooks/useModal'

type PropsType = {
  modalChildren: ReactNode
  onConfirm: () => void
  className?: string
}

export const UpdateButton: FC<PropsType> = ({
  className,
  onConfirm: onUpdateConfirm,
  modalChildren,
}) => {
  const { openModal, closeModal, isOpen } = useModal()

  const onConfirm = async (): Promise<void> => {
    await onUpdateConfirm()
    closeModal()
  }

  return (
    <>
      <Button onClick={openModal} className={`w-full ${className || ''}`}>
        изменить
      </Button>
      <ConfirmModalLayout
        closeModal={closeModal}
        isOpen={isOpen}
        title="Изменение"
        confirmButton={{
          children: 'изменить',
          onClick: onConfirm,
          type: 'submit',
        }}
      >
        {modalChildren}
      </ConfirmModalLayout>
    </>
  )
}
