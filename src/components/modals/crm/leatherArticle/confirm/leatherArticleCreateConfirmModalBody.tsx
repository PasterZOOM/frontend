import { FC } from 'react'

import { CreateLeatherArticleFormType } from '@/components/forms/crm/leatherArticles/type'
import { ECreateLeatherArticleParams } from '@/enums/crm/leatherArticle'
import { useGetAllLeatherFactories } from '@/hooks/crm/leatherFactories/useGetAllLeatherFactories'

type PropsType = {
  values: CreateLeatherArticleFormType
}

export const LeatherArticleCreateConfirmModalBody: FC<PropsType> = ({ values }) => {
  const factories = useGetAllLeatherFactories(false)

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
