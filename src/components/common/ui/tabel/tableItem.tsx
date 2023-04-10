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
      <div onClick={openModal} className="cursor-pointer p-1" aria-hidden="true">
        {title || '--Нет данных--'}
      </div>
      {children({ isOpen, closeModal })}
    </>
  )
}
