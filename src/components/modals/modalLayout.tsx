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
      <div className="relative max-h-full max-w-[95%]">
        <div className="flex justify-between gap-2 border-b border-anthracite-gray border-opacity-20 bg-white p-4 dark:border-white dark:bg-anthracite-gray">
          <div className="text-xl ">{title}</div>
          <button type="button" onClick={closeModal} className="h-fit text-lg">
            закрыть
          </button>
        </div>
        <div className="bg-white dark:bg-anthracite-gray">{children}</div>
      </div>
    </ModalOverlay>
  )
}
