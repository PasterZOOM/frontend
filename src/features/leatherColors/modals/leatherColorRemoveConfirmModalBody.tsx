import { FC } from 'react'

import { useTranslation } from 'next-i18next'

import { LeatherColorType } from '@/features/leatherColors/api/types'

type PropsType = {
  color: LeatherColorType
}

export const LeatherColorRemoveConfirmModalBody: FC<PropsType> = ({ color }) => {
  const { t } = useTranslation()

  return (
    <>
      {t('Цвет')} <b>{color?.title}</b> {t('будут удален')}
    </>
  )
}
