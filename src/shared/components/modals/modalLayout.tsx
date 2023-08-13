import { FC, ReactNode } from 'react'

import { useTranslation } from 'next-i18next'

import { ModalOverlay } from 'shared/components/modals/modalOverlay'
import { LanguageSwitcher } from 'widgets/switchers'

type PropsType = {
  children: ReactNode
  closeModal: () => void
  isOpen: boolean
  title: string
}

export const ModalLayout: FC<PropsType> = ({ title, children, closeModal, isOpen }) => {
  const { t } = useTranslation()

  return (
    <ModalOverlay isOpen={isOpen} onClose={closeModal}>
      <div className="relative max-h-full max-w-[95%]">
        <div className="flex justify-between gap-2 border-b border-anthracite-gray border-opacity-20 bg-white p-4 dark:border-white dark:bg-anthracite-gray">
          <div className="text-xl">{title}</div>
          <LanguageSwitcher />

          <button className="h-fit text-lg" type="button" onClick={closeModal}>
            {t('закрыть')}
          </button>
        </div>
        <div className="bg-white dark:bg-anthracite-gray">{children}</div>
      </div>
    </ModalOverlay>
  )
}
