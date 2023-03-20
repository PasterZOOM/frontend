import { FC } from 'react'

import { UpdateLeatherArticleParamsType } from '@/api/crm/leatherArticlesApi/types'
import { EUpdateLeatherArticleParams } from '@/enums/crm/leatherArticle'
import { useGetLeatherArticle } from '@/hooks/crm/leatherArticles/useGetLeatherArticle'

type PropsType = {
  values: UpdateLeatherArticleParamsType
}

export const LeatherArticleUpdateConfirmModalBody: FC<PropsType> = ({ values }) => {
  const article = useGetLeatherArticle(values[EUpdateLeatherArticleParams.ID])

  return (
    <div className="space-y-2">
      <div>После подтверждения данные фабрики {article?.name} будут изменены на:</div>
      <div>Название: {values[EUpdateLeatherArticleParams.NAME]}</div>
      <div>Описание: {values[EUpdateLeatherArticleParams.DESCRIPTION]}</div>
    </div>
  )
}
