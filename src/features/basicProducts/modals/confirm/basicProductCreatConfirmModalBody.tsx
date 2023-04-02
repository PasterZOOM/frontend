import { FC } from 'react'

import { ECreateBasicProductParams } from '@/features/basicProducts/enums/paramsKeys'
import { CreateBasicProductFormType } from '@/features/basicProducts/forms/type'
import { useGetAllLeatherArticles } from '@/features/leatherArticles/hooks/useGetAllLeatherArticles'

type PropsType = {
  values: CreateBasicProductFormType
}

export const BasicProductCreatConfirmModalBody: FC<PropsType> = ({ values }) => {
  const articles = useGetAllLeatherArticles()

  return (
    <div className="space-y-2">
      <div>
        Вы уверены что хотите создать базовую модель {values[ECreateBasicProductParams.TITLE]}?
      </div>
      <div>
        Артикул кожи:{' '}
        {articles.find(f => f._id === values[ECreateBasicProductParams.LEATHER_ARTICLE])?.title}
      </div>
      <div>Стоимость: {values[ECreateBasicProductParams.COST]}</div>
      <div>Валюта: {values[ECreateBasicProductParams.COST_CURRENCY]}</div>
      <div>Категория: {values[ECreateBasicProductParams.CATEGORY]}</div>
      <div>Шаг пробойника: {values[ECreateBasicProductParams.PUNCH_PITCH]}</div>
      <div>Размер: {values[ECreateBasicProductParams.SIZE]}</div>
      <div>Описание: {values[ECreateBasicProductParams.DESCRIPTION]}</div>
    </div>
  )
}
