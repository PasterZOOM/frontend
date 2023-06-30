import { ReactElement } from 'react'

import { EditableSpanInput } from 'components/common/ui/editable/editableSpanInput'
import { PropertyInOneRow } from 'components/common/ui/properties/propertyInOneRow'

type PropsType<T> = {
  title: string
  className?: string
  children: T
  onChange: (value: T) => void
}

export const PropertyInOneRowWithEditableSpanInput = <T extends string | string[]>({
  title,
  className,
  children,
  onChange,
}: PropsType<T>): ReactElement => {
  return (
    <PropertyInOneRow title={title} className={className}>
      <EditableSpanInput onChange={onChange}>{children}</EditableSpanInput>
    </PropertyInOneRow>
  )
}
