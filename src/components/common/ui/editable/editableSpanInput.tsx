import { ComponentPropsWithoutRef, ReactElement } from 'react'

import { EditButton } from 'components/common/ui/editable/editButton'
import { useEditableSpan } from 'components/common/ui/editable/useEditableSpan'

type PropsType<T> = {
  children: T
  className?: string
  inputProps?: ComponentPropsWithoutRef<'input'>
  onChange: (value: T) => void
}
const elementId = 'editableInput'

export const EditableSpanInput = <T extends string[] | string>({
  className,
  children,
  onChange,
  inputProps: { type } = {},
}: PropsType<T>): ReactElement => {
  const {
    value,
    editeMode,
    enableEditMode,
    disableEditMode,
    onChangeValueHandler,
    onKeyDownHandler,
  } = useEditableSpan(children, elementId, onChange)

  return editeMode ? (
    <input
      className="w-full px-1 dark:bg-anthracite-gray"
      id={elementId}
      type={type}
      value={value}
      onBlur={disableEditMode}
      onChange={onChangeValueHandler}
      onKeyDown={onKeyDownHandler}
    />
  ) : (
    <EditButton className={className} enableEditMode={enableEditMode}>
      {Array.isArray(children) ? children.map(el => el) : children}
    </EditButton>
  )
}
