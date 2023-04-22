import { FC, KeyboardEventHandler, ReactNode } from 'react'

type PropsType = {
  className?: string
  enableEditMode: () => void
  children: ReactNode
}

export const EditButton: FC<PropsType> = ({ className, enableEditMode, children }) => {
  const onKeyEnter: KeyboardEventHandler<HTMLSpanElement> = e => {
    if (e.key === 'Enter') {
      enableEditMode()
    }
  }

  return (
    <div
      className={`${className || ''} flex cursor-default gap-2`}
      onDoubleClick={enableEditMode}
      aria-hidden
      title="двойной клин для редактирования"
    >
      {children || 'нет данных'}
      <span
        className="text-blue-500 hover:font-bold hover:text-blue-700 focus:font-bold focus:text-blue-700 focus:outline-0"
        onClick={enableEditMode}
        aria-hidden
        role="button"
        tabIndex={0}
        onKeyDown={onKeyEnter}
      >
        (ред.)
      </span>
    </div>
  )
}
