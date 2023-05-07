import { FC } from 'react'

import { EditButton } from 'components/common/ui/editable/editButton'
import { useEditableSpan } from 'components/common/ui/editable/useEditableSpan'
import { DefaultInputPropsType } from 'components/common/ui/inputs/defaultInputType'

type PropsType<T = string> = {
  className?: string
  children: T
  onChange: (value: T) => void
  inputProps?: DefaultInputPropsType
}
const elementId = 'editableInput'

export const EditableSpanInput: FC<PropsType> = <T extends string | string[]>({
  className,
  children,
  onChange,
  inputProps: { type } = {},
}: PropsType<T>) => {
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
      id={elementId}
      className="w-full px-1 dark:bg-anthracite-gray"
      type={type}
      value={value}
      onChange={onChangeValueHandler}
      onBlur={disableEditMode}
      onKeyDown={onKeyDownHandler}
    />
  ) : (
    <EditButton enableEditMode={enableEditMode} className={className}>
      {Array.isArray(children) ? children.map(el => el) : children}
    </EditButton>
  )
}
