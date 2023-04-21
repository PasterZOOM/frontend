import { FC } from 'react'

import { Field } from 'formik'

import { DefaultInputPropsType } from 'components/common/ui/inputs/defaultInputType'

type PropsType = DefaultInputPropsType & {
  name: string
  className?: string
}

export const FormikInput: FC<PropsType> = ({ type = 'text', name, className }) => {
  return (
    <Field
      name={name}
      type={type}
      className={`w-full border p-2 dark:bg-anthracite-gray ${className || ''}`}
    />
  )
}
