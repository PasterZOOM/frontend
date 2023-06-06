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
  name: Path<T>
  selectProps?: DefaultSelectPropsType
  title: string
  items: SelectItemType<string | string[] | ETheme>[]
}

export const FormSelectWithWrapper = <T,>({
  selectProps,
  title,
  name,
  items,
}: PropsType<T>): ReactElement => {
  return (
    <FieldWrapper title={title} name={name}>
      <FormSelect {...selectProps} items={items} name={name} />
    </FieldWrapper>
  )
}
