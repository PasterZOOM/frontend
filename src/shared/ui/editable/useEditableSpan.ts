import { ChangeEventHandler, KeyboardEventHandler, useEffect, useState } from 'react'

export const useEditableSpan: UseEditableSpanType = <T>(
  initialValue: T,
  elementId: string,
  onChange: (value: T) => void
) => {
  const [editeMode, setEditeMode] = useState(false)
  const [value, setValue] = useState(initialValue)

  const enableEditMode = (): void => setEditeMode(true)

  const disableEditMode = (): void => {
    setEditeMode(false)
  }

  const sendValue = (): void => {
    onChange(value)
    disableEditMode()
  }
  const cancelChange = (): void => {
    setValue(initialValue)
    disableEditMode()
  }

  const onKeyDownHandler: KeyboardEventHandler = e => {
    if (e.key === 'Enter') {
      sendValue()
    }
    if (e.key === 'Escape') {
      cancelChange()
      e.stopPropagation()
    }
  }

  const onChangeValueHandler: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = e => {
    if (Array.isArray(initialValue)) {
      setValue(
        Array.from(document.querySelectorAll(`#${elementId} option:checked`)).map(
          el => (el as HTMLSelectElement).value
        ) as T
      )
    } else {
      setValue(e.currentTarget.value as T)
    }
  }

  useEffect(() => {
    if (editeMode) {
      const element = document.getElementById(elementId)

      element?.focus()
    }
  }, [editeMode, elementId])

  return {
    value,
    editeMode,
    enableEditMode,
    disableEditMode,
    onChangeValueHandler,
    onKeyDownHandler,
  }
}
type UseEditableSpanType = <T>(
  initialValue: T,
  elementId: string,
  onChange: (value: T) => void
) => {
  disableEditMode: () => void
  editeMode: boolean
  enableEditMode: () => void
  onChangeValueHandler: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>
  onKeyDownHandler: KeyboardEventHandler<HTMLInputElement | HTMLSelectElement>
  value: T
}
