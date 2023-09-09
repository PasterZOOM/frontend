import { ComponentPropsWithoutRef, ReactElement } from 'react'

import { Path } from 'react-hook-form'

import { FieldWrapper } from 'shared/components/forms/fieldWrapper'
import { FormInput } from 'shared/components/forms/inputs/formInput'

type PropsType<T> = {
  inputProps?: ComponentPropsWithoutRef<'input'>
  label: string
  name: Path<T>
}
export const FormInputWithWrapper = <T,>({
  inputProps,
  label,
  name,
}: PropsType<T>): ReactElement => {
  return (
    <FieldWrapper label={label} name={name}>
      <FormInput<T> {...inputProps} name={name} />
    </FieldWrapper>
  )
}
