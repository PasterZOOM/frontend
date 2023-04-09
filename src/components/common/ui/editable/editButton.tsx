import { FC, ReactNode } from 'react'

type PropsType = {
  className?: string
  enableEditMode: () => void
  children: ReactNode
}

export const EditButton: FC<PropsType> = ({ className, enableEditMode, children }) => {
  return (
    <div className={className || ''} onDoubleClick={enableEditMode} aria-hidden="true">
      {children || 'нет данных'}
      <span
        className="cursor-pointer pl-2 text-blue-500"
        onClick={enableEditMode}
        aria-hidden="true"
      >
        (ред.)
      </span>
    </div>
  )
}
