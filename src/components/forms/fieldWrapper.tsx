import { FC, ReactNode } from 'react'

import { useFormContext } from 'react-hook-form'

type PropsType = {
  children: ReactNode
  name: string
  title: string
}

export const FieldWrapper: FC<PropsType> = ({ title, children, name }) => {
  const {
    formState: { errors },
  } = useFormContext()

  return (
    <label htmlFor={name} className="block">
      {title}
      {children}
      {errors[name] && <div className="text-red-500">{errors[name]?.message?.toString()}</div>}
    </label>
  )
}
