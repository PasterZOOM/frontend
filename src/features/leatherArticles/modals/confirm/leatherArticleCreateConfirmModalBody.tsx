import { FC } from 'react'

import { useTranslation } from 'next-i18next'

import { ECreateLeatherArticleParams } from 'features/leatherArticles/enums/paramsKeys'
import { CreateLeatherArticleFormType } from 'features/leatherArticles/forms/type'
import { useGetAllLeatherFactories } from 'features/leatherFactories/hooks/useGetAllLeatherFactories'

type PropsType = {
  values: CreateLeatherArticleFormType
}

export const LeatherArticleCreateConfirmModalBody: FC<PropsType> = ({ values }) => {
  const { data: factories } = useGetAllLeatherFactories({ enabled: false })
  const { t } = useTranslation()

  return (
    <div className="space-y-2">
      <div>
        {t('Вы уверены что хотите создать артикул для фабрики')}{' '}
        {factories?.find(f => f._id === values[ECreateLeatherArticleParams.FACTORY_ID])?.title} ?
      </div>
      <div>
        {t('Название артикула')}: {values.title}
      </div>
      <div>
        {t('Значение')}: {values.value}
      </div>
      <div>
        {t('Описание')}: {values.description}
      </div>
    </div>
  )
}
