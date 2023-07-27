import { FC } from 'react'

import { useTranslation } from 'next-i18next'

import { ECreateBasicProductParams } from 'features/basicProducts/enums/paramsKeys'
import { CreateBasicProductFormType } from 'features/basicProducts/forms/type'
import { useGetAllLeatherArticles } from 'features/leatherArticles/hooks/useGetAllLeatherArticles'

type PropsType = {
  values: CreateBasicProductFormType
}

export const BasicProductCreatConfirmModalBody: FC<PropsType> = ({ values }) => {
  const { data: articles } = useGetAllLeatherArticles({ enabled: false })
  const { t } = useTranslation()

  if (!articles) return null

  return (
    <div className="space-y-2">
      <div>
        {t('Вы уверены что хотите создать базовую модель')}
        {values.title}?
      </div>
      <div>
        {t('Артикул кожи')}:
        {articles.find(f => f._id === values[ECreateBasicProductParams.LEATHER_ARTICLE])?.title}
      </div>
      <div>
        {t('Стоимость')}:{values[ECreateBasicProductParams.COST]}
      </div>
      <div>
        {t('Валюта')}:{values[ECreateBasicProductParams.COST_CURRENCY]}
      </div>
      <div>
        {t('Категория')}:{values[ECreateBasicProductParams.CATEGORY]}
      </div>
      <div>
        {t('Шаг пробойника')}:{values[ECreateBasicProductParams.PUNCH_PITCH]}
      </div>
      <div>
        {t('Размер')}:{values.size}
      </div>
      <div>
        {t('Описание')}:{values.description}
      </div>
    </div>
  )
}
