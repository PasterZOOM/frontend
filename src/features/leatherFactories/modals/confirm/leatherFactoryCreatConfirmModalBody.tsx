import { FC } from 'react'

import { useTranslation } from 'next-i18next'

import { CreateLeatherFactoryFormType } from 'features/leatherFactories/forms/type'
import { countryValues } from 'objects/countries/countryValues'

type PropsType = {
  values: CreateLeatherFactoryFormType
}

export const LeatherFactoryCreatConfirmModalBody: FC<PropsType> = ({ values }) => {
  const { t } = useTranslation()

  return (
    <div className="space-y-2">
      <div>Вы уверены что хотите создать фабрику {values.title}?</div>
      <div>Страна: {t(countryValues[values.country].title)}</div>
      <div>Описание: {values.description}</div>
    </div>
  )
}
