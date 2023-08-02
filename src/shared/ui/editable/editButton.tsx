import { FC, KeyboardEventHandler, ReactNode } from 'react'

type PropsType = {
  children: ReactNode
  className?: string
  enableEditMode: () => void
}

export const EditButton: FC<PropsType> = ({ className, enableEditMode, children }) => {
  const onKeyEnter: KeyboardEventHandler<HTMLSpanElement> = e => {
    if (e.key === 'Enter') {
      enableEditMode()
    }
  }

  return (
    <div
      aria-hidden
      className={`${className || ''} flex cursor-default gap-2`}
      title="двойной клин для редактирования"
      onDoubleClick={enableEditMode}
    >
      {children || 'нет данных'}
      <span
        aria-hidden
        className="text-blue-500 hover:font-bold hover:text-blue-700 focus:font-bold focus:text-blue-700 focus:outline-0"
        role="button"
        tabIndex={0}
        onClick={enableEditMode}
        onKeyDown={onKeyEnter}
      >
        (ред.)
      </span>
    </div>
  )
}
