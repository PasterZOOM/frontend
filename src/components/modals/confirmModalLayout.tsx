import { ComponentPropsWithoutRef, FC, ReactNode } from 'react'

import { useTranslation } from 'next-i18next'

import { Button, ButtonVariant } from 'components/common/ui/buttons/button'
import { ModalOverlay } from 'components/modals/modalOverlay'

type PropsType = {
  children: ReactNode
  closeModal: () => void
  confirmButton: ComponentPropsWithoutRef<'button'> & {
    variant?: ButtonVariant
  }
  isOpen: boolean
  title: string
}

export const ConfirmModalLayout: FC<PropsType> = ({
  isOpen,
  closeModal,
  children,
  title,
  confirmButton,
}) => {
  const { t } = useTranslation()

  return (
    <ModalOverlay isOpen={isOpen} onClose={closeModal}>
      <div className="flex max-w-[18rem] flex-col justify-between gap-4 bg-white p-4 dark:bg-anthracite-gray md:max-w-[95%]">
        <div className="flex justify-between gap-2">
          <div className="text-xl">{title}</div>
          <button className="h-fit text-lg" type="button" onClick={closeModal}>
            {t('закрыть')}
          </button>
        </div>

        <div>{children}</div>

        <div className="flex flex-col justify-between gap-4 md:flex-row" role="button">
          <Button className="w-full" variant={ButtonVariant.SECONDARY} onClick={closeModal}>
            {t('Отменить')}
          </Button>
          <Button {...confirmButton} className="w-full" />
        </div>
      </div>
    </ModalOverlay>
  )
}
