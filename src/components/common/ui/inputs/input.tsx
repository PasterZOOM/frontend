import { FC } from 'react'

import { DefaultInputPropsType } from 'components/common/ui/inputs/defaultInputType'

type PropsType = DefaultInputPropsType
export const Input: FC<PropsType> = ({ className, ...props }) => {
  return (
    <input
      {...props}
      type="text"
      className={`w-full border p-2 dark:bg-anthracite-gray ${className || ''}`}
    />
  )
}
