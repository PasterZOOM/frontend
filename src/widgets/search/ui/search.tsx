import {
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  FC,
  KeyboardEventHandler,
  useRef,
} from 'react'

import classnames from 'classnames'
import { useTranslation } from 'next-i18next'

import cls from './search.module.scss'

type PropsType = Omit<ComponentPropsWithoutRef<'input'>, 'type'> & {
  onChangeValue?: (value: string) => void
  onClear?: () => void
  onKeyEnter?: KeyboardEventHandler<HTMLInputElement>
  value: string
}

export const Search: FC<PropsType> = ({
  value,
  className = '',
  placeholder = 'Search',
  onKeyUp,
  onKeyDown,
  onKeyEnter,
  onChange,
  onChangeValue,
  onClear,
  ...rest
}) => {
  const { t } = useTranslation('common')
  const ref = useRef<HTMLInputElement | null>(null)

  const onKeyHandler: KeyboardEventHandler<HTMLInputElement> = e => {
    onKeyUp?.(e)
    onKeyDown?.(e)
    if (e.key === 'Enter') {
      onKeyEnter?.(e)
    }
  }

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = e => {
    onChange?.(e)
    onChangeValue?.(e.currentTarget.value)
  }

  const onCLickClearButtonHandler = (): void => {
    onClear?.()
    ref.current?.focus()
  }

  return (
    <div className={classnames(cls.search, className)}>
      <input
        ref={ref}
        className={classnames(cls.input, 'dark:border-gray-200 dark:bg-anthracite-gray')}
        placeholder={t('searchPlaceholder') || placeholder}
        type="text"
        value={value}
        onChange={onChangeHandler}
        onKeyDown={onKeyHandler}
        onKeyUp={onKeyHandler}
        {...rest}
      />
      <div className={cls['right-part']}>
        {value && (
          <button
            className={classnames(cls['clear-button'])}
            type="button"
            onClick={onCLickClearButtonHandler}
          >
            X
          </button>
        )}
      </div>
    </div>
  )
}
