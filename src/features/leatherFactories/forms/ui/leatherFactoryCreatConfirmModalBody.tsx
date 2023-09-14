import { FC } from 'react'

import { useTranslation } from 'next-i18next'

import { CreateLeatherFactoryFormType } from '@/features/leatherFactories/forms/module/type'
import { ECountry } from '@/shared/enums/country'
import { countryValues } from '@/shared/objects/countries/countryValues'

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
        {t('Страна')}: {t(countryValues[values.country as ECountry].title)}
      </div>
      <div>
        {t('Описание')}: {values.description}
      </div>
    </div>
  )
}
