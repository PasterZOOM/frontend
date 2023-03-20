import { FC } from 'react'

import { UpdateLeatherFactoryParamsType } from '@/api/crm/leatherFactoriesApi/types'
import { countriesName } from '@/constants/countries/countriesName'
import { ECountry } from '@/enums/countries'
import { EUpdateLeatherFactoryParams } from '@/enums/crm/leatherFactory'
import { useGetLeatherFactory } from '@/hooks/crm/leatherFactories/useGetLeatherFactory'

type PropsType = {
  values: UpdateLeatherFactoryParamsType
}

export const LeatherFactoryUpdateConfirmModalBody: FC<PropsType> = ({ values }) => {
  const factory = useGetLeatherFactory(values[EUpdateLeatherFactoryParams.ID])

  return (
    <div className="space-y-2">
      <div>После подтверждения данные фабрики {factory?.name} будут изменены на:</div>
      <div>Название: {values[EUpdateLeatherFactoryParams.NAME]}</div>
      <div>Страна: {countriesName[values[EUpdateLeatherFactoryParams.COUNTRY] as ECountry]}</div>
      <div>Описание: {values[EUpdateLeatherFactoryParams.DESCRIPTION]}</div>
    </div>
  )
}
