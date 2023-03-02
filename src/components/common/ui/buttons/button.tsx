import { FC } from 'react'

import { DefaultButtonPropsType } from '@/components/common/ui/buttons/defaultButtonType'

type PropsType = DefaultButtonPropsType & {}

export const Button: FC<PropsType> = ({ children, className, ...restProps }) => {
  return (
    <button
      type="button"
      className={`transform bg-anthracite-gray px-8 py-4 uppercase text-white shadow-button-hover duration-300 hover:transform hover:bg-transparent hover:text-anthracite-gray hover:duration-300 dark:bg-white dark:text-anthracite-gray dark:shadow-button-hover-dark dark:hover:bg-transparent dark:hover:text-white ${className}`}
      {...restProps}
    >
      {children}
    </button>
  )
}
