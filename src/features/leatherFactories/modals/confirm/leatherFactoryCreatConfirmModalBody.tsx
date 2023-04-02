import { FC } from 'react'

import { ECountry } from '@/enums/countries'
import { CreateLeatherFactoryParamsType } from '@/features/leatherFactories/api/types'
import { ECreateLeatherFactoryParams } from '@/features/leatherFactories/enums/paramsKeys'
import { countriesName } from '@/objects/countries/countriesName'

type PropsType = {
  values: CreateLeatherFactoryParamsType // TODO: заменить на CreateLeatherFactoryFormType
}

export const LeatherFactoryCreatConfirmModalBody: FC<PropsType> = ({ values }) => {
  return (
    <div className="space-y-2">
      <div>Вы уверены что хотите создать фабрику {values[ECreateLeatherFactoryParams.NAME]}?</div>
      <div>Страна: {countriesName[values[ECreateLeatherFactoryParams.COUNTRY] as ECountry]}</div>
      <div>Описание: {values[ECreateLeatherFactoryParams.DESCRIPTION]}</div>
    </div>
  )
}
