import { FC, ReactNode } from 'react'

import { useFormContext } from 'react-hook-form'

type PropsType = {
  children: ReactNode
  label: string
  name: string
}

export const FieldWrapper: FC<PropsType> = ({ label, children, name }) => {
  const {
    formState: { errors },
  } = useFormContext()

  return (
    <label className="block" htmlFor={name}>
      {label}
      {children}
      {errors[name] && <div className="text-red-500">{errors[name]?.message?.toString()}</div>}
    </label>
  )
}
