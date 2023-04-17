import { FC, ReactNode } from 'react'

import { useModal } from '@/hooks/useModal'

type PropsType = {
  title: string
  children: ({ closeModal, isOpen }: { isOpen: boolean; closeModal: () => void }) => ReactNode // прокидывается callBack с модальным окном
}

export const TableItem: FC<PropsType> = ({ title, children }) => {
  const { openModal, closeModal, isOpen } = useModal()

  return (
    <>
      <div
        onClick={openModal}
        className="p-1 hover:text-blue-500 focus:font-bold focus:text-blue-700 focus:outline-0"
        aria-hidden="true"
        tabIndex={0}
        role="button"
      >
        {title || '--Нет данных--'}
      </div>
      {children({ isOpen, closeModal })}
    </>
  )
}
