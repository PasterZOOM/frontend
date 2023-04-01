import { FC } from 'react'

import { CreateBasicProductFormType } from '@/components/forms/crm/basicProducts/type'
import { ECreateBasicProductParams } from '@/enums/crm/basicProduct'
import { useGetAllLeatherArticles } from '@/hooks/crm/leatherArticles/useGetAllLeatherArticles'

type PropsType = {
  values: CreateBasicProductFormType
}

export const BasicProductCreatConfirmModalBody: FC<PropsType> = ({ values }) => {
  const articles = useGetAllLeatherArticles(false)

  return (
    <div className="space-y-2">
      <div>
        Вы уверены что хотите создать базовую модель {values[ECreateBasicProductParams.TITLE]}?
      </div>
      <div>
        Артикул кожи:{' '}
        {articles.find(f => f._id === values[ECreateBasicProductParams.LEATHER_ARTICLE])?.name}
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
