import { FC } from 'react'

import { DefaultButtonPropsType } from '@/components/common/ui/buttons/defaultButtonType'

type PropsType = DefaultButtonPropsType & {}

export const Button: FC<PropsType> = ({ children, className, ...restProps }) => {
  return (
    <button
      type="button"
      className={`transform bg-anthracite-gray px-8 py-4 uppercase text-white duration-300 hover:bg-white hover:text-anthracite-gray hover:shadow-button-hover ${className}`}
      {...restProps}
    >
      {children}
    </button>
  )
}
