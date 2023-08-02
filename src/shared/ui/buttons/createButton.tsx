import { ComponentPropsWithoutRef, FC, ReactNode } from 'react'

import { useTranslation } from 'next-i18next'
import { useFormContext } from 'react-hook-form'

import { ConfirmModalLayout } from 'components/modals/confirmModalLayout'
import { useModal } from 'shared/lib/hooks/useModal'
import { Button } from 'shared/ui/buttons/button'

type PropsType = {
  buttonProps?: ComponentPropsWithoutRef<'button'>
  modalChildren: ReactNode
  onConfirm: () => Promise<void>
}

export const CreateButton: FC<PropsType> = ({ modalChildren, buttonProps, onConfirm }) => {
  const { className, ...restButtonProps } = buttonProps ?? {}
  const { t } = useTranslation()

  const { openModal, closeModal, isOpen } = useModal()
  const {
    trigger,
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext()

  const onConfirmHandler = async (): Promise<void> => {
    await onConfirm()
    closeModal()
  }

  return (
    <>
      <Button
        {...restButtonProps}
        className={`w-full ${className || ''}`}
        onClick={handleSubmit(openModal, () => trigger())}
      >
        {t('создать')}
      </Button>
      <ConfirmModalLayout
        closeModal={closeModal}
        isOpen={isOpen}
        title="Создание"
        confirmButton={{
          children: 'Создать',
          onClick: onConfirmHandler,
          disabled: isSubmitting,
        }}
      >
        {modalChildren}
      </ConfirmModalLayout>
    </>
  )
}
