import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'

export const useEditableSpan = <T>(
  initialValue: T,
  elementId: string,
  onChange: (value: T) => void
): {
  value: T
  editeMode: boolean
  enableEditMode: () => void
  disableEditMode: () => void
  onChangeValueHandler: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  onKeyDownHandler: (e: KeyboardEvent<HTMLInputElement | HTMLSelectElement>) => void
} => {
  const [editeMode, setEditeMode] = useState(false)
  const [value, setValue] = useState(initialValue)

  const enableEditMode = (): void => setEditeMode(true)

  const disableEditMode = (): void => setEditeMode(false)

  const sendValue = (): void => {
    onChange(value)
    disableEditMode()
  }
  const cancelChange = (): void => {
    setValue(initialValue)
    disableEditMode()
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement | HTMLSelectElement>): void => {
    if (e.key === 'Enter') {
      sendValue()
    }
    if (e.key === 'Escape') {
      cancelChange()
      e.stopPropagation()
    }
  }

  const onChangeValueHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
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
  }, [editeMode])

  return {
    value,
    editeMode,
    enableEditMode,
    disableEditMode,
    onChangeValueHandler,
    onKeyDownHandler,
  }
}
