import { FC, ReactNode } from 'react'

import { Button, ButtonVariant } from 'components/common/ui/buttons/button'
import { ConfirmModalLayout } from 'components/modals/confirmModalLayout'
import { useModal } from 'hooks/useModal'

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
  const { openModal, closeModal, isOpen } = useModal()

  const onConfirm = async (): Promise<void> => {
    await onDeleteConfirm()
    closeModal()
  }

  return (
    <>
      <Button variant={ButtonVariant.DELETE} onClick={openModal} className={className || ''}>
        удалить
      </Button>
      <ConfirmModalLayout
        closeModal={closeModal}
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
