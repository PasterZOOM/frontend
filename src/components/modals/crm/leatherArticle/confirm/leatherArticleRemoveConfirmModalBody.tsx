import { FC } from 'react'

import { LeatherArticleType } from '@/api/crm/leatherArticlesApi/types'

type PropsType = {
  article: LeatherArticleType
}

export const LeatherArticleRemoveConfirmModalBody: FC<PropsType> = ({ article }) => {
  return (
    <>
      Вместе с артикулом <b>{article?.name}</b> будут удалены все связанные с ним цвета
    </>
  )
}
