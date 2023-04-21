import { FC } from 'react'

import { ECountry } from 'enums/countries'
import { ECreateLeatherFactoryParams } from 'features/leatherFactories/enums/paramsKeys'
import { CreateLeatherFactoryFormType } from 'features/leatherFactories/forms/type'
import { countriesName } from 'objects/countries/countriesName'

type PropsType = {
  values: CreateLeatherFactoryFormType
}

export const LeatherFactoryCreatConfirmModalBody: FC<PropsType> = ({ values }) => {
  return (
    <div className="space-y-2">
      <div>Вы уверены что хотите создать фабрику {values[ECreateLeatherFactoryParams.TITLE]}?</div>
      <div>Страна: {countriesName[values[ECreateLeatherFactoryParams.COUNTRY] as ECountry]}</div>
      <div>Описание: {values[ECreateLeatherFactoryParams.DESCRIPTION]}</div>
    </div>
  )
}
