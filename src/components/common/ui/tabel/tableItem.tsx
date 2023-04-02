import { FC, ReactNode } from 'react'

import { useModal } from '@/hooks/useModal'

type PropsType = {
  name: string
  children: ({ closeModal, isOpen }: { isOpen: boolean; closeModal: () => void }) => ReactNode // приокидывается модалка
}

export const TableItem: FC<PropsType> = ({ name, children }) => {
  const { openModal, closeModal, isOpen } = useModal()

  return (
    <>
      <div onClick={openModal} className="p-1" aria-hidden="true">
        {name}
      </div>
      {children({ isOpen, closeModal })}
    </>
  )
}
