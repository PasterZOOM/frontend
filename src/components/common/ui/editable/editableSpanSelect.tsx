import { ReactNode } from 'react'

import { EditButton } from '@/components/common/ui/editable/editButton'
import { DefaultSelectPropsType } from '@/components/common/ui/selects/defaultSelectType'
import { useEditableSpan } from '@/hooks/useEditableSpan'

type PropsType<T> = {
  title: ReactNode
  className?: string
  initialValue: T
  onChange: (value: T) => void
  selectProps?: DefaultSelectPropsType
  children: ReactNode[]
}

const elementId = 'editableSelect'

export const EditableSpanSelect = <T extends string | string[]>({
  title,
  className,
  initialValue,
  onChange,
  selectProps = {},
  children,
}: PropsType<T>): JSX.Element => {
  const {
    value,
    editeMode,
    enableEditMode,
    disableEditMode,
    onChangeValueHandler,
    onKeyDownHandler,
  } = useEditableSpan(initialValue, elementId, onChange)

  return editeMode ? (
    <select
      id={elementId}
      className="w-full px-1 py-0.5"
      value={value}
      onChange={onChangeValueHandler}
      onBlur={disableEditMode}
      onKeyDown={onKeyDownHandler}
      {...selectProps}
    >
      {children.map(el => el)}
    </select>
  ) : (
    <EditButton enableEditMode={enableEditMode} className={className}>
      {title}
    </EditButton>
  )
}
