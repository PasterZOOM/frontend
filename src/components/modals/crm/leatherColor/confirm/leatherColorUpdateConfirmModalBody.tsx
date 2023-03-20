import { FC } from 'react'

import { UpdateLeatherColorParamsType } from '@/api/crm/leatherColorsApi/types'
import { EUpdateLeatherColorParams } from '@/enums/crm/leatherColor'
import { useGetLeatherColor } from '@/hooks/crm/leatherColors/useGetLeatherColor'

type PropsType = {
  values: UpdateLeatherColorParamsType
}

export const LeatherColorUpdateConfirmModalBody: FC<PropsType> = ({ values }) => {
  const color = useGetLeatherColor(values[EUpdateLeatherColorParams.ID])

  return (
    <div className="space-y-2">
      <div>После подтверждения данные фабрики {color?.title} будут изменены на:</div>
      <div>Название: {values[EUpdateLeatherColorParams.TITLE]}</div>
      <div>Значение: {values[EUpdateLeatherColorParams.VALUE]}</div>
      <div>Код: {values[EUpdateLeatherColorParams.CODE]}</div>
      <div>Фото: {values[EUpdateLeatherColorParams.PHOTO]}</div>
      <div>Описание: {values[EUpdateLeatherColorParams.DESCRIPTION]}</div>
    </div>
  )
}
