import { FC, KeyboardEventHandler, ReactNode } from 'react'

import { useModal } from '@/hooks/useModal'

type PropsType = {
  title: string
  children: ({ closeModal, isOpen }: { isOpen: boolean; closeModal: () => void }) => ReactNode // прокидывается callBack с модальным окном
}

export const TableItem: FC<PropsType> = ({ title, children }) => {
  const { openModal, closeModal, isOpen } = useModal()

  const onKeyEnter: KeyboardEventHandler<HTMLDivElement> = e => {
    if (e.key === 'Enter') {
      openModal()
    }
  }

  return (
    <>
      <div
        onClick={openModal}
        className="p-1 text-blue-500 hover:font-bold hover:text-blue-700 focus:font-bold focus:text-blue-700 focus:outline-0"
        aria-hidden="true"
        tabIndex={0}
        role="button"
        onKeyDown={onKeyEnter}
      >
        {title || '--Нет данных--'}
      </div>
      {children({ isOpen, closeModal })}
    </>
  )
}
