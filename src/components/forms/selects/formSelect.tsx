import { FC } from 'react'

import { useTranslation } from 'next-i18next'
import { useFormContext } from 'react-hook-form'

import {
  DefaultSelectPropsType,
  SelectItemType,
} from 'components/common/ui/selects/defaultSelectType'
import { ETheme } from 'enums/theme'

type PropsType = DefaultSelectPropsType & {
  name: string
  items: SelectItemType<string | string[] | ETheme>[]
}

export const FormSelect: FC<PropsType> = ({ className = '', items, name, ...restProps }) => {
  const { t } = useTranslation('common')
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <select
      id={name}
      className={`w-full border p-2 dark:bg-anthracite-gray ${className} ${
        errors[name] ? 'border-red-500' : ''
      }`}
      {...restProps}
      {...register(name)}
    >
      {!restProps.multiple && (
        <option value="" disabled>
          --- пусто ---
        </option>
      )}
      {items &&
        items.map(item => (
          <option key={item._id} value={item.value}>
            {t(item.title)}
          </option>
        ))}
    </select>
  )
}