import { FC, ReactNode } from 'react'

import { useModal } from '@/hooks/useModal'

type PropsType = {
  name: string
  children: ({ close, isOpen }: { isOpen: boolean; close: () => void }) => ReactNode
}

export const TableItem: FC<PropsType> = ({ name, children }) => {
  const { open, close, isOpen } = useModal()

  return (
    <div>
      <button type="button" onClick={open} className="p-1">
        {name}
      </button>
      {children({ isOpen, close })}
    </div>
  )
}
