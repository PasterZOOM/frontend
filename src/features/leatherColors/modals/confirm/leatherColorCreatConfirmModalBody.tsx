import { FC } from 'react'

import { useGetAllLeatherArticles } from 'features/leatherArticles/hooks/useGetAllLeatherArticles'
import { ECreateLeatherColorParams } from 'features/leatherColors/enums/paramsKeys'
import { CreateLeatherColorFormType } from 'features/leatherColors/forms/type'

type PropsType = {
  values: CreateLeatherColorFormType
}

export const LeatherColorCreatConfirmModalBody: FC<PropsType> = ({ values }) => {
  const { data: articles } = useGetAllLeatherArticles({ enabled: false })

  if (!articles) return null

  return (
    <div className="space-y-2">
      <div>
        Вы уверены что хотите создать цвет для артикула{' '}
        {articles.find(f => f._id === values[ECreateLeatherColorParams.ARTICLE_ID])?.title}?
      </div>
      <div>Название цвета: {values[ECreateLeatherColorParams.TITLE]}</div>
      <div>Код цвета: {values[ECreateLeatherColorParams.CODE]}</div>
      <div>Значение цвета: {values[ECreateLeatherColorParams.VALUE]}</div>
      <div>Фото цвета: {values[ECreateLeatherColorParams.PHOTO]}</div>
      <div>Описание: {values[ECreateLeatherColorParams.DESCRIPTION]}</div>
    </div>
  )
}
