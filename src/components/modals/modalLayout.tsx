import { FC, ReactNode } from 'react'

import { ModalOverlay } from 'components/modals/modalOverlay'

type PropsType = {
  title: string
  children: ReactNode
  isOpen: boolean
  closeModal: () => void
}

export const ModalLayout: FC<PropsType> = ({ title, children, closeModal, isOpen }) => {
  return (
    <ModalOverlay isOpen={isOpen} onClose={closeModal}>
      <div className="relative max-w-[95%] bg-white dark:bg-anthracite-gray">
        <div className="flex justify-between gap-2 border-b border-anthracite-gray border-opacity-20 p-4 dark:border-white">
          <div className="text-xl">{title}</div>
          <button type="button" onClick={closeModal} className="h-fit text-lg">
            закрыть
          </button>
        </div>
        {children}
      </div>
    </ModalOverlay>
  )
}
