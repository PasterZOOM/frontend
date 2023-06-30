import { ComponentPropsWithoutRef, FC } from 'react'

import { useTranslation } from 'next-i18next'

type PropsType = Omit<ComponentPropsWithoutRef<'input'>, 'type'> & {
  value: string
}

export const Search: FC<PropsType> = ({
  value,
  className = '',
  placeholder = 'Search',
  ...rest
}) => {
  const { t } = useTranslation('common')

  return (
    <input
      type="search"
      value={value}
      placeholder={t('searchPlaceholder') ?? placeholder}
      className={`w-full rounded border px-4 py-2 dark:border-gray-200 dark:bg-anthracite-gray ${className}`}
      {...rest}
    />
  )
}
