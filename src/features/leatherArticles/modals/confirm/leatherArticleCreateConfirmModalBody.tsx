import { FC } from 'react'

import { ECreateLeatherArticleParams } from '@/features/leatherArticles/enums/paramsKeys'
import { CreateLeatherArticleFormType } from '@/features/leatherArticles/forms/type'
import { useGetAllLeatherFactories } from '@/features/leatherFactories/hooks/useGetAllLeatherFactories'

type PropsType = {
  values: CreateLeatherArticleFormType
}

export const LeatherArticleCreateConfirmModalBody: FC<PropsType> = ({ values }) => {
  const factories = useGetAllLeatherFactories({ enabled: false })

  return (
    <div className="space-y-2">
      <div>
        Вы уверены что хотите создать артикул для фабрики{' '}
        {factories.find(f => f._id === values[ECreateLeatherArticleParams.FACTORY_ID])?.title}?
      </div>
      <div>Название артикула: {values[ECreateLeatherArticleParams.TITLE]}</div>
      <div>Описание: {values[ECreateLeatherArticleParams.DESCRIPTION]}</div>
    </div>
  )
}
