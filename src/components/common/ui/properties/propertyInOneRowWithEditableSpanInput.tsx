import { ReactElement } from 'react'

import { EditableSpanInput } from 'components/common/ui/editable/editableSpanInput'
import { PropertyInOneRow } from 'components/common/ui/properties/propertyInOneRow'

type PropsType<T> = {
  children: T
  className?: string
  onChange: (value: T) => void
  title: string
}

export const PropertyInOneRowWithEditableSpanInput = <T extends string[] | string>({
  title,
  className,
  children,
  onChange,
}: PropsType<T>): ReactElement => {
  return (
    <PropertyInOneRow className={className} title={title}>
      <EditableSpanInput onChange={onChange}>{children}</EditableSpanInput>
    </PropertyInOneRow>
  )
}
