import { ComponentPropsWithoutRef, ElementType, ReactElement } from 'react'

import classnames from 'classnames'
import { Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'

import cls from './button.module.scss'
import { ButtonVariant } from './buttonVariant'

export type ButtonProps<T extends ElementType = 'button'> = ComponentPropsWithoutRef<T> &
  (T extends 'a' ? { href: Url } : unknown) & {
    as?: T
    className?: string
    fullWidth?: boolean
    variant?: ButtonVariant
  }

export const Button = <T extends ElementType = 'button'>(
  props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>
): ReactElement => {
  const {
    variant = 'primary',
    fullWidth,
    className,
    as: Component = 'button',
    href,
    ...rest
  } = props

  if (Component === 'a') {
    return (
      <Link
        className={classnames(cls.button, cls[variant], { [cls.fullWidth]: fullWidth }, className)}
        href={href}
        {...rest}
      />
    )
  }

  return (
    <Component
      className={classnames(cls.button, cls[variant], { [cls.fullWidth]: fullWidth }, className)}
      {...rest}
    />
  )
}
