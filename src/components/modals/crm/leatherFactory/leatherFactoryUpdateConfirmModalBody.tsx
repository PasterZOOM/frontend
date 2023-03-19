import { FC } from 'react'

import { UpdateLeatherFactoryParamsType } from '@/api/crm/leatherFactoryApi/types'
import { countriesName } from '@/constants/countries/countriesName'
import { ECountry } from '@/enums/countries'
import { ECreateLeatherFactoryParams } from '@/enums/crm/leatherFactory'

type PropsType = {
  values: UpdateLeatherFactoryParamsType
}

export const LeatherFactoryUpdateConfirmModalBody: FC<PropsType> = ({ values }) => {
  return (
    <div className="space-y-2">
      <div>Вы уверены что хотите создать фабрику {values[ECreateLeatherFactoryParams.NAME]}?</div>
      <div>Страна: {countriesName[values[ECreateLeatherFactoryParams.COUNTRY] as ECountry]}</div>
      <div>Описание: {values[ECreateLeatherFactoryParams.DESCRIPTION]}</div>
    </div>
  )
}
