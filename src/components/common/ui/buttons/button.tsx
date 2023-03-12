import { FC } from 'react'

import { DefaultButtonPropsType } from '@/components/common/ui/buttons/defaultButtonType'

type PropsType = DefaultButtonPropsType & {
  variant?: 'primary' | 'secondary' | 'delete'
}

export const Button: FC<PropsType> = ({
  variant = 'primary',
  children,
  className,
  ...restProps
}) => {
  return (
    <button
      type="button"
      className={`transform px-8 py-4 uppercase shadow-button-hover duration-300 dark:shadow-button-hover-dark
      ${
        variant === 'primary'
          ? 'bg-anthracite-gray text-white hover:bg-transparent hover:text-anthracite-gray dark:bg-white dark:text-anthracite-gray dark:hover:bg-transparent dark:hover:text-white'
          : ''
      }
      ${
        variant === 'secondary'
          ? 'bg-transparent text-anthracite-gray hover:bg-anthracite-gray hover:text-white dark:bg-transparent dark:text-white dark:hover:bg-white dark:hover:text-anthracite-gray'
          : ''
      }
      ${
        variant === 'delete'
          ? 'bg-red-500 text-white hover:bg-opacity-50 hover:text-anthracite-gray dark:hover:text-white'
          : ''
      }
      ${className}`}
      {...restProps}
    >
      {children}
    </button>
  )
}
