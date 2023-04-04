import { FC } from 'react'

import { Field } from 'formik'

export const FormikSelect: FC<PropsType> = ({ name, className, items, multiple }) => {
  return (
    <Field
      name={name}
      component="select"
      className={`w-full border p-2 dark:bg-anthracite-gray ${className || ''}`}
      multiple={multiple}
    >
      {items &&
        items.map(item => (
          <option key={item._id} value={item.value}>
            {item.title}
          </option>
        ))}
    </Field>
  )
}

export type SelectItemType<T = string> = { _id: string; title: string; value: T }
type PropsType = {
  name: string
  className?: string
  items: SelectItemType<string | string[]>[]
  multiple?: boolean
}
