import { FC } from 'react'

import { BasicProductType } from 'features/basicProducts/api/types'

type PropsType = {
  basicProduct: BasicProductType
}

export const BasicProductRemoveConfirmModalBody: FC<PropsType> = ({ basicProduct }) => {
  return (
    <>
      Вы действительно хотите удалить базовое изделие <b>{basicProduct?.title}</b>?
    </>
  )
}
