import { DetailedHTMLProps, SelectHTMLAttributes } from 'react'

export type DefaultSelectPropsType = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>
export type SelectItemType<T = string> = { _id: string; title: string; value: T }
