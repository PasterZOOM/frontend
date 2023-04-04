import { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from 'react'

import { DefaultInputPropsType } from '@/components/common/ui/inputs/defaultInputType'

type PropsType = {
  className?: string
  children: string
  onChange: (value: string) => void
  inputProps?: DefaultInputPropsType
}

export const EditableSpanInput: FC<PropsType> = ({
  className,
  children,
  onChange,
  inputProps: { type } = {},
}) => {
  const [editeMode, setEditeMode] = useState(false)
  const [value, setValue] = useState(children)

  const enableEditMode = (): void => setEditeMode(true)

  const disableEditMode = (): void => setEditeMode(false)

  const sendValue = (): void => {
    onChange(value)
    disableEditMode()
  }
  const cancelChange = (): void => {
    setValue(children)
    disableEditMode()
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      sendValue()
    }
    if (e.key === 'Escape') {
      cancelChange()
      e.stopPropagation()
    }
  }

  const onChangeValueHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.currentTarget.value)
  }

  useEffect(() => {
    if (editeMode) {
      const input = document.getElementById('editableInput')

      input?.focus()
    }
  }, [editeMode])

  return editeMode ? (
    <input
      id="editableInput"
      className="w-full"
      type={type}
      value={value}
      onChange={onChangeValueHandler}
      onBlur={disableEditMode}
      onKeyDown={onKeyDownHandler}
    />
  ) : (
    <div className={className || ''} onDoubleClick={enableEditMode} aria-hidden="true">
      {children || 'нет данных'} <span className="text-blue-500">(ред.)</span>
    </div>
  )
}
