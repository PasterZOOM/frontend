import { ComponentPropsWithoutRef, ReactElement } from 'react'

import { Path, useFormContext } from 'react-hook-form'

type PropsType<T> = ComponentPropsWithoutRef<'input'> & {
  name: Path<T>
}

export const FormInput = <T,>({
  className = '',
  name,
  ...restProps
}: PropsType<T>): ReactElement => {
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
