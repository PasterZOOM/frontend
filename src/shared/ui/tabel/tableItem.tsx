import { FC, KeyboardEventHandler, ReactNode } from 'react'

import { useModal } from '@/shared/lib/hooks/useModal'

type PropsType = {
  children: ({ closeModal, isOpen }: { closeModal: () => void; isOpen: boolean }) => ReactNode
  title: string // прокидывается callBack с модальным окном
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
        aria-hidden
        className="p-1 text-blue-500 hover:font-bold hover:text-blue-700 focus:font-bold focus:text-blue-700 focus:outline-0"
        role="button"
        tabIndex={0}
        onClick={openModal}
        onKeyDown={onKeyEnter}
      >
        {title || '--Нет данных--'}
      </div>
      {children({ isOpen, closeModal })}
    </>
  )
}
