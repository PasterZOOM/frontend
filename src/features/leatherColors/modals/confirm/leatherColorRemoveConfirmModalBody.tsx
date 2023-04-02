import { FC } from 'react'

import { LeatherColorType } from '@/features/leatherColors/api/types'

type PropsType = {
  color: LeatherColorType
}

export const LeatherColorRemoveConfirmModalBody: FC<PropsType> = ({ color }) => {
  return (
    <>
      Цвет <b>{color?.title}</b> будут удален
    </>
  )
}
