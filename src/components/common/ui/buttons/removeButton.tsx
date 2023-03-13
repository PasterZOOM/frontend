import { FC, ReactNode } from 'react'

import { Button, ButtonVariant } from '@/components/common/ui/buttons/button'
import { ConfirmModalLayout } from '@/components/modals/confirmModalLayout'
import { useModal } from '@/hooks/useModal'

type PropsType = {
  modalChildren: ReactNode
  onConfirm: () => void
  className?: string
}

export const RemoveButton: FC<PropsType> = ({
  modalChildren,
  onConfirm: onDeleteConfirm,
  className,
}) => {
  const { open, close, isOpen } = useModal()

  const onConfirm = async (): Promise<void> => {
    await onDeleteConfirm()
    close()
  }

  return (
    <>
      <Button variant={ButtonVariant.DELETE} onClick={open} className={className || ''}>
        удалить
      </Button>
      <ConfirmModalLayout
        closeModal={close}
        isOpen={isOpen}
        title="Удаление"
        confirmButton={{
          children: 'удалить',
          variant: ButtonVariant.DELETE,
          onClick: onConfirm,
        }}
      >
        {modalChildren}
      </ConfirmModalLayout>
    </>
  )
}
