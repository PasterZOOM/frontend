import { FC } from 'react'

import { LeatherFactoryType } from '@/features/leatherFactories/api/types'

type PropsType = {
  factory: LeatherFactoryType
}

export const LeatherFactoryRemoveConfirmModalBody: FC<PropsType> = ({ factory }) => {
  return (
    <>
      Вместе с фабрикой <b>{factory?.name}</b> будут удалены все связанные с ней артикулы и их цвета
    </>
  )
}
