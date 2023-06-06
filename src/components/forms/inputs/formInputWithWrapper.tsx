import { FC } from 'react'

import { DefaultInputPropsType } from 'components/common/ui/inputs/defaultInputType'
import { FieldWrapper } from 'components/forms/fieldWrapper'
import { FormInput } from 'components/forms/inputs/formInput'

type PropsType = {
  name: string
  inputProps?: DefaultInputPropsType
  title: string
}
export const FormInputWithWrapper: FC<PropsType> = ({ inputProps, title, name }) => {
  return (
    <FieldWrapper title={title} name={name}>
      <FormInput {...inputProps} name={name} />
    </FieldWrapper>
  )
}
