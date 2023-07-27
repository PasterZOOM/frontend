import { ReactElement, ReactNode } from 'react'

import { EditButton } from 'components/common/ui/editable/editButton'
import { useEditableSpan } from 'components/common/ui/editable/useEditableSpan'
import { DefaultSelectPropsType } from 'components/common/ui/selects/defaultSelectType'

type PropsType<T> = {
  children: ReactNode[]
  className?: string
  initialValue: T
  onChange: (value: T) => void
  selectProps?: DefaultSelectPropsType
  title: ReactNode
}

const elementId = 'editableSelect'

export const EditableSpanSelect = <T extends string[] | string>({
  title,
  className,
  initialValue,
  onChange,
  selectProps = {},
  children,
}: PropsType<T>): ReactElement => {
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
      className="w-full px-1 py-0.5 dark:bg-anthracite-gray"
      id={elementId}
      value={value}
      onBlur={disableEditMode}
      onChange={onChangeValueHandler}
      onKeyDown={onKeyDownHandler}
      {...selectProps}
    >
      {children.map(el => el)}
    </select>
  ) : (
    <EditButton className={className} enableEditMode={enableEditMode}>
      {title}
    </EditButton>
  )
}
