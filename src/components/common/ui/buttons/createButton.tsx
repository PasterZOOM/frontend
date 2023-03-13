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
  const { open, close, isOpen } = useModal()

  const onConfirm = async (): Promise<void> => {
    await onCreateConfirm()
    close()
  }

  return (
    <>
      <Button onClick={open} className={`w-full ${className || ''}`}>
        создать
      </Button>
      <ConfirmModalLayout
        closeModal={close}
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
