import { FC } from 'react'

import { LeatherArticleType } from '@/features/leatherArticles/api/types'

type PropsType = {
  article: LeatherArticleType
}

export const LeatherArticleRemoveConfirmModalBody: FC<PropsType> = ({ article }) => {
  return (
    <>
      Вместе с артикулом <b>{article?.title}</b> будут удалены все связанные с ним цвета
    </>
  )
}
