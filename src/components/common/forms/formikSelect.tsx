import { FC } from 'react'

import { useField } from 'formik'

type PropsType = {
  name: string
  className?: string
  items?: { _id: string; name: string }[]
}

export const FormikSelect: FC<PropsType> = ({ name, className, items }) => {
  const [field] = useField(name)

  return (
    <select {...field} className={className || ''}>
      {items &&
        items.map(item => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
    </select>
  )
}
