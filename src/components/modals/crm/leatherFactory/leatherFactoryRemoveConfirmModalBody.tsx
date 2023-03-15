import { FC } from 'react'

import { LeatherFactoryType } from '@/api/crm/leatherFactoryApi/types'

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
