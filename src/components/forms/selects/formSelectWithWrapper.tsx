import { ReactElement } from 'react'

import { Path } from 'react-hook-form'

import {
  DefaultSelectPropsType,
  SelectItemType,
} from 'components/common/ui/selects/defaultSelectType'
import { FieldWrapper } from 'components/forms/fieldWrapper'
import { FormSelect } from 'components/forms/selects/formSelect'
import { ETheme } from 'enums/theme'

type PropsType<T> = {
  items: SelectItemType<ETheme | string[] | string>[]
  name: Path<T>
  selectProps?: DefaultSelectPropsType
  title: string
}

export const FormSelectWithWrapper = <T,>({
  selectProps,
  title,
  name,
  items,
}: PropsType<T>): ReactElement => {
  return (
    <FieldWrapper name={name} title={title}>
      <FormSelect {...selectProps} items={items} name={name} />
    </FieldWrapper>
  )
}
