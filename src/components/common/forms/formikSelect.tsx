import { FC, useEffect } from 'react'

import { useField } from 'formik'

type PropsType = {
  name: string
  className?: string
  items?: { _id: string; name: string; value?: string }[]
  valueField: '_id' | 'value'
}

export const FormikSelect: FC<PropsType> = ({ name, className, items, valueField }) => {
  const [field, , { setValue }] = useField(name)

  useEffect(() => {
    setValue(items?.[0]?.[valueField])
  }, [items])

  return (
    <select {...field} className={`dark:bg-anthracite-gray ${className || ''}`}>
      {items &&
        items.map(item => (
          <option key={item._id} value={item[valueField]}>
            {item.name}
          </option>
        ))}
    </select>
  )
}
