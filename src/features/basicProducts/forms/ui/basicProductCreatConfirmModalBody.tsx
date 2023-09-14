import { FC } from 'react'

import { useTranslation } from 'next-i18next'

import { CreateBasicProductFormType } from '@/features/basicProducts/forms/module/type'
import { useGetAllLeatherArticles } from '@/features/leatherArticles/hooks/useGetAllLeatherArticles'

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
        {t('Артикул кожи')}:{articles.find(f => f._id === values.leatherArticle)?.title}
      </div>
      <div>
        {t('Стоимость')}:{values.cost}
      </div>
      <div>
        {t('Категория')}:{values.category}
      </div>
      <div>
        {t('Шаг пробойника')}:{values.punchPitch}
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
