import { FC } from 'react'

import { useTranslation } from 'next-i18next'

import { LeatherArticleType } from 'features/leatherArticles/api/types'

type PropsType = {
  article: LeatherArticleType
}

export const LeatherArticleRemoveConfirmModalBody: FC<PropsType> = ({ article }) => {
  const { t } = useTranslation()

  return (
    <>
      {t('Вместе с артикулом')} <b>{article?.title}</b>{' '}
      {t('будут удалены все связанные с ним цвета')}
    </>
  )
}
