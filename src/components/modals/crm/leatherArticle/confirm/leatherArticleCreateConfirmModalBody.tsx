import { FC } from 'react'

import { CreateLeatherArticleParamsType } from '@/api/crm/leatherArticlesApi/types'
import { ECreateLeatherArticleParams } from '@/enums/crm/leatherArticle'
import { useGetAllLeatherFactories } from '@/hooks/crm/leatherFactories/useGetAllLeatherFactories'

type PropsType = {
  values: CreateLeatherArticleParamsType
}

export const LeatherArticleCreateConfirmModalBody: FC<PropsType> = ({ values }) => {
  const factories = useGetAllLeatherFactories()

  return (
    <div className="space-y-2">
      <div>
        Вы уверены что хотите создать артикул для фабрики{' '}
        {factories.find(f => f._id === values[ECreateLeatherArticleParams.FACTORY_ID])?.name}?
      </div>
      <div>Название артикула: {values[ECreateLeatherArticleParams.NAME]}</div>
      <div>Описание: {values[ECreateLeatherArticleParams.DESCRIPTION]}</div>
    </div>
  )
}
