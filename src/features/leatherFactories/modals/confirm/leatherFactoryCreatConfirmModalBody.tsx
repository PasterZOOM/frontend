import { FC } from 'react'

import { useTranslation } from 'next-i18next'

import { CreateLeatherFactoryFormType } from 'features/leatherFactories/forms/type'
import { countryValues } from 'shared/objects/countries/countryValues'

type PropsType = {
  values: CreateLeatherFactoryFormType
}

export const LeatherFactoryCreatConfirmModalBody: FC<PropsType> = ({ values }) => {
  const { t } = useTranslation()

  return (
    <div className="space-y-2">
      <div>
        {t('Вы уверены что хотите создать фабрику')} {values.title}?
      </div>
      <div>
        {t('Страна')}: {t(countryValues[values.country].title)}
      </div>
      <div>
        {t('Описание')}: {values.description}
      </div>
    </div>
  )
}
