import { FC } from 'react'

import { Field } from 'formik'

export type SelectItemType<T> = { _id: string; name: string; value?: T }

type PropsType = {
  name: string
  className?: string
  items?: SelectItemType<string>[]
  valueField: '_id' | 'value'
}

export const FormikSelect: FC<PropsType> = ({ name, className, items, valueField }) => {
  return (
    <Field
      name={name}
      component="select"
      className={`w-full border p-2 dark:bg-anthracite-gray ${className || ''}`}
    >
      {items &&
        items.map(item => (
          <option key={item._id} value={item[valueField]}>
            {item.name}
          </option>
        ))}
    </Field>
  )
}
