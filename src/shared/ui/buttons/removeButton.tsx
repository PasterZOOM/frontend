import { FC, ReactNode } from 'react'

import { useTranslation } from 'next-i18next'

import { ConfirmModalLayout } from 'shared/components/modals/confirmModalLayout'
import { useModal } from 'shared/lib/hooks/useModal'
import { Button, ButtonVariant } from 'shared/ui/buttons/button'

type PropsType = {
  className?: string
  modalChildren: ReactNode
  onConfirm: () => void
}

export const RemoveButton: FC<PropsType> = ({
  modalChildren,
  onConfirm: onDeleteConfirm,
  className,
}) => {
  const { openModal, closeModal, isOpen } = useModal()
  const { t } = useTranslation()

  const onConfirm = async (): Promise<void> => {
    onDeleteConfirm()
    closeModal()
  }

  return (
    <>
      <Button className={className || ''} variant={ButtonVariant.DELETE} onClick={openModal}>
        {t('удалить')}
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
