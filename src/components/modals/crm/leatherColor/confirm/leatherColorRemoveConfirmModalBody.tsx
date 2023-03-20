import { FC } from 'react'

import { LeatherColorType } from '@/api/crm/leatherColorsApi/types'

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
