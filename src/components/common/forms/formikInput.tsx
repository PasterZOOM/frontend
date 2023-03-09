import { FC } from 'react'

import { useField } from 'formik'

type PropsType = {
  name: string
  className?: string
}

export const FormikInput: FC<PropsType> = ({ name, className }) => {
  const [field] = useField(name)

  return <input type="text" {...field} className={className || ''} />
}
