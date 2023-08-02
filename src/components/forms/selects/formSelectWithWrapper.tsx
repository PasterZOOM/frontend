import { ReactElement } from 'react'

import { Path } from 'react-hook-form'

import { FieldWrapper } from 'components/forms/fieldWrapper'
import { FormSelect } from 'components/forms/selects/formSelect'
import { ETheme } from 'shared/enums/theme'
import { DefaultSelectPropsType, SelectItemType } from 'shared/ui/selects/defaultSelectType'

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
