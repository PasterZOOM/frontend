import { FC, ReactNode } from 'react'

import { useModal } from '@/hooks/useModal'

type PropsType = {
  name: string
  children: ({ closeModal, isOpen }: { isOpen: boolean; closeModal: () => void }) => ReactNode
}

export const TableItem: FC<PropsType> = ({ name, children }) => {
  const { openModal, closeModal, isOpen } = useModal()

  return (
    <div>
      <button type="button" onClick={openModal} className="p-1">
        {name}
      </button>
      {children({ isOpen, closeModal })}
    </div>
  )
}
