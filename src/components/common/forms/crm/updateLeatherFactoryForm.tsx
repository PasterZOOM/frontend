import { FC } from 'react'

import { Form, Formik } from 'formik'
import { useMutation, useQueryClient } from 'react-query'

import {
  LeatherFactoryType,
  UpdateLeatherFactoryParamsType,
} from '@/api/crm/leatherFactoryApi/types'
import { FormikInput } from '@/components/common/forms/formikInput'
import { FormikSelect } from '@/components/common/forms/formikSelect'
import { Button } from '@/components/common/ui/buttons/button'
import { countriesForSelect } from '@/constants/countries/countriesForSelect'
import { EUpdateLeatherFactoryParams } from '@/enums/crm/leatherFactory'
import { queryKey } from '@/enums/crm/queryKey'
import { useSrmServiceStore } from '@/store/crmServises'

type PropsType = {
  factory: LeatherFactoryType
  className: string
}

export const UpdateLeatherFactoryForm: FC<PropsType> = ({ factory, className }) => {
  const leatherFactoryService = useSrmServiceStore(state => state.leatherFactoryService)

  const initialValues: UpdateLeatherFactoryParamsType = {
    [EUpdateLeatherFactoryParams.COUNTRY]: countriesForSelect[0]?.value,
    [EUpdateLeatherFactoryParams.DESCRIPTION]: factory.description,
    [EUpdateLeatherFactoryParams.NAME]: factory.name,
    [EUpdateLeatherFactoryParams.ID]: factory._id,
  }

  const queryClient = useQueryClient()
  const { mutateAsync: updateFactory } = useMutation(leatherFactoryService.update, {
    onSuccess: async data => {
      await queryClient.setQueryData([queryKey.GET_FACTORY, factory._id], data)
      await queryClient.invalidateQueries([queryKey.GET_ALL_FACTORIES])
    },
  })
  const onSubmit = async (values: UpdateLeatherFactoryParamsType): Promise<void> => {
    await updateFactory(values)
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {() => (
        <Form className={`space-y-3 ${className}`}>
          <div>
            <div>Название фабрики:</div>
            <FormikInput name={EUpdateLeatherFactoryParams.NAME} className="w-full border" />
          </div>
          <div>
            <div>Страна в которой расположена фабрика:</div>
            <FormikSelect
              name={EUpdateLeatherFactoryParams.COUNTRY}
              className="w-full border p-2"
              items={countriesForSelect}
              valueField="value"
            />
          </div>
          <div>
            <div>Описание:</div>
            <FormikInput name={EUpdateLeatherFactoryParams.DESCRIPTION} className="w-full border" />
          </div>
          <Button type="submit" className="w-full">
            Изменить
          </Button>
        </Form>
      )}
    </Formik>
  )
}
