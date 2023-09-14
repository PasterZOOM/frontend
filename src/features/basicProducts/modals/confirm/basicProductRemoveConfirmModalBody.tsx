import { FC } from 'react'

import { useTranslation } from 'next-i18next'

import { BasicProductType } from '@/features/basicProducts/api/types'

type PropsType = {
  basicProduct: BasicProductType
}

export const BasicProductRemoveConfirmModalBody: FC<PropsType> = ({ basicProduct }) => {
  const { t } = useTranslation()

  return (
    <>
      {t('Вы действительно хотите удалить базовое изделие')} <b>{basicProduct?.title}</b>?
    </>
  )
}
