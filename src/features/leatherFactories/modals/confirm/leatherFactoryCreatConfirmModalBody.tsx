import { FC } from 'react'

import { CreateLeatherFactoryFormType } from 'features/leatherFactories/forms/type'
import { useLocale } from 'hooks/useLocale'
import { countryValues } from 'objects/countries/countryValues'

type PropsType = {
  values: CreateLeatherFactoryFormType
}

export const LeatherFactoryCreatConfirmModalBody: FC<PropsType> = ({ values }) => {
  const locale = useLocale()

  return (
    <div className="space-y-2">
      <div>Вы уверены что хотите создать фабрику {values[`title-${locale}`]}?</div>
      <div>Страна: {countryValues[locale][values.country].title}</div>
      <div>Описание: {values[`description-${locale}`]}</div>
    </div>
  )
}
