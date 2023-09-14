import { ReactElement } from 'react'

import { Path } from 'react-hook-form'

import { FieldWrapper } from '@/shared/components/forms/fieldWrapper'
import { FormSelect } from '@/shared/components/forms/selects/formSelect'
import { DefaultSelectPropsType, SelectItemType } from '@/shared/ui/selects/defaultSelectType'
import { ETheme } from '@/widgets/switchers/themeSwitcher/module/enum'

type PropsType<T> = {
  items: SelectItemType<ETheme | string[] | string>[]
  label: string
  name: Path<T>
  selectProps?: DefaultSelectPropsType
}

export const FormSelectWithWrapper = <T,>({
  selectProps,
  label,
  name,
  items,
}: PropsType<T>): ReactElement => {
  return (
    <FieldWrapper label={label} name={name}>
      <FormSelect {...selectProps} items={items} name={name} />
    </FieldWrapper>
  )
}
