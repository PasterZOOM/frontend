import { FC } from 'react'

import { useFormContext } from 'react-hook-form'

import { DefaultInputPropsType } from 'components/common/ui/inputs/defaultInputType'

type PropsType = DefaultInputPropsType & {
  name: string
}

export const FormInput: FC<PropsType> = ({ className = '', name, ...restProps }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <input
      id={name}
      className={`w-full border p-2 dark:bg-anthracite-gray ${className} ${
        errors[name] ? 'border-red-500' : ''
      }`}
      {...restProps}
      {...register(name)}
    />
  )
}
