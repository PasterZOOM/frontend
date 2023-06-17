import { ReactElement } from 'react'

import { Path } from 'react-hook-form'

import { DefaultInputPropsType } from 'components/common/ui/inputs/defaultInputType'
import { FieldWrapper } from 'components/forms/fieldWrapper'
import { FormInput } from 'components/forms/inputs/formInput'

type PropsType<T> = {
  name: Path<T>
  inputProps?: DefaultInputPropsType
  title: string
}
export const FormInputWithWrapper = <T,>({
  inputProps,
  title,
  name,
}: PropsType<T>): ReactElement => {
  return (
    <FieldWrapper title={title} name={name}>
      <FormInput<T> {...inputProps} name={name} />
    </FieldWrapper>
  )
}
