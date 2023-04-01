import { FC } from 'react'

import { CreateLeatherColorFormType } from '@/components/forms/crm/leatherColors/type'
import { ECreateLeatherColorParams } from '@/enums/crm/leatherColor'
import { useGetAllLeatherArticles } from '@/hooks/crm/leatherArticles/useGetAllLeatherArticles'

type PropsType = {
  values: CreateLeatherColorFormType
}

export const LeatherColorCreatConfirmModalBody: FC<PropsType> = ({ values }) => {
  const articles = useGetAllLeatherArticles(false)

  return (
    <div className="space-y-2">
      <div>
        Вы уверены что хотите создать цвет для артикула{' '}
        {articles.find(f => f._id === values[ECreateLeatherColorParams.ARTICLE_ID])?.name}?
      </div>
      <div>Название цвета: {values[ECreateLeatherColorParams.TITLE]}</div>
      <div>Код цвета: {values[ECreateLeatherColorParams.CODE]}</div>
      <div>Значение цвета: {values[ECreateLeatherColorParams.VALUE]}</div>
      <div>Фото цвета: {values[ECreateLeatherColorParams.PHOTO]}</div>
      <div>Описание: {values[ECreateLeatherColorParams.DESCRIPTION]}</div>
    </div>
  )
}
