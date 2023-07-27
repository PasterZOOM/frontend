import { FC } from 'react'

import { useTranslation } from 'next-i18next'

import { useGetAllLeatherArticles } from 'features/leatherArticles/hooks/useGetAllLeatherArticles'
import { ECreateLeatherColorParams } from 'features/leatherColors/enums/paramsKeys'
import { CreateLeatherColorFormType } from 'features/leatherColors/forms/type'

type PropsType = {
  values: CreateLeatherColorFormType
}

export const LeatherColorCreatConfirmModalBody: FC<PropsType> = ({ values }) => {
  const { data: articles } = useGetAllLeatherArticles({ enabled: false })
  const { t } = useTranslation()

  if (!articles) return null

  return (
    <div className="space-y-2">
      <div>
        {t('Вы уверены что хотите создать цвет для артикула')}
        {articles.find(f => f._id === values[ECreateLeatherColorParams.ARTICLE_ID])?.title}?
      </div>
      <div>
        {t('Название цвета')}: {values.title}
      </div>
      <div>
        {t('Код цвета')}: {values[ECreateLeatherColorParams.CODE]}
      </div>
      <div>
        {t('Значение цвета')}: {values[ECreateLeatherColorParams.VALUE]}
      </div>
      <div>
        {t('Фото цвета')}: {values[ECreateLeatherColorParams.PHOTO]}
      </div>
      <div>
        {t('Описание')}: {values.description}
      </div>
    </div>
  )
}
