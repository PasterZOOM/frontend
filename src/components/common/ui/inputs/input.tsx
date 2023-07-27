import { ChangeEventHandler, ComponentPropsWithoutRef, FC, useCallback } from 'react'

type PropsType = ComponentPropsWithoutRef<'input'> & {
  onChangeValue?: (value: string) => void
}

export const Input: FC<PropsType> = ({
  className,
  onChangeValue,
  onChange,
  type = 'text',
  ...props
}) => {
  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
    e => {
      onChangeValue?.(e.currentTarget.value)
      onChange?.(e)
    },
    [onChange, onChangeValue]
  )

  return (
    <input
      type={type}
      {...props}
      className={`w-full border p-2 dark:bg-anthracite-gray ${className || ''}`}
      onChange={onChangeHandler}
    />
  )
}
