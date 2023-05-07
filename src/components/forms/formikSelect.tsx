import { FC } from 'react'

import { Field } from 'formik'
import { useTranslation } from 'next-i18next'

import { SelectItemType } from 'components/common/ui/selects/defaultSelectType'
import { ETheme } from 'enums/theme'

type PropsType = {
  name: string
  className?: string
  items: SelectItemType<string | string[] | ETheme>[]
  multiple?: boolean
}

export const FormikSelect: FC<PropsType> = ({ name, className, items, multiple }) => {
  const { t } = useTranslation('common')

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
            {t(item.title)}
          </option>
        ))}
    </Field>
  )
}
