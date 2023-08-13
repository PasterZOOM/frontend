import { DetailedHTMLProps, ReactNode, SelectHTMLAttributes } from 'react'

export type DefaultSelectPropsType = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>
export type SelectItemType<T = string> = {
  _id: string
  component?: ReactNode
  title: string
  value: T
}
