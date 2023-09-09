import { FC } from 'react'

import { useTranslation } from 'next-i18next'

import { LeatherFactoryType } from 'features/leatherFactories/api/types'

type PropsType = {
  factory: LeatherFactoryType
}

export const LeatherFactoryRemoveConfirmModalBody: FC<PropsType> = ({ factory }) => {
  const { t } = useTranslation()

  return (
    <>
      {t('Вместе с фабрикой')} <b>{factory?.title}</b>{' '}
      {t('будут удалены все связанные с ней артикулы и их цвета')}
    </>
  )
}
