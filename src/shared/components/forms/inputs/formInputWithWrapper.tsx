import { ComponentPropsWithoutRef, ReactElement } from 'react'

import { Path } from 'react-hook-form'

import { FieldWrapper } from 'shared/components/forms/fieldWrapper'
import { FormInput } from 'shared/components/forms/inputs/formInput'

type PropsType<T> = {
  inputProps?: ComponentPropsWithoutRef<'input'>
  name: Path<T>
  title: string
}
export const FormInputWithWrapper = <T,>({
  inputProps,
  title,
  name,
}: PropsType<T>): ReactElement => {
  return (
    <FieldWrapper name={name} title={title}>
      <FormInput<T> {...inputProps} name={name} />
    </FieldWrapper>
  )
}
