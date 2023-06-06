import { FC, ReactNode } from 'react'

import { useFormContext } from 'react-hook-form'

import { Button } from 'components/common/ui/buttons/button'
import { DefaultButtonPropsType } from 'components/common/ui/buttons/defaultButtonType'
import { ConfirmModalLayout } from 'components/modals/confirmModalLayout'
import { useModal } from 'hooks/useModal'

type PropsType = {
  modalChildren: ReactNode
  buttonProps?: DefaultButtonPropsType
  onConfirm: () => Promise<void>
}

export const CreateButton: FC<PropsType> = ({ modalChildren, buttonProps, onConfirm }) => {
  const { className, ...restButtonProps } = buttonProps ?? {}
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
        создать
      </Button>
      <ConfirmModalLayout
        closeModal={closeModal}
        isOpen={isOpen}
        title="Создание"
        confirmButton={{
          children: 'Создать',
          onClick: onConfirmHandler,
          type: 'submit',
          disabled: isSubmitting,
        }}
      >
        {modalChildren}
      </ConfirmModalLayout>
    </>
  )
}
