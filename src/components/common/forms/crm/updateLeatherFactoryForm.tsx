import { FC } from 'react'

import { Form, Formik } from 'formik'

import {
  LeatherFactoryType,
  UpdateLeatherFactoryParamsType,
} from '@/api/crm/leatherFactoryApi/types'
import { FormikInput } from '@/components/common/forms/formikInput'
import { FormikSelect } from '@/components/common/forms/formikSelect'
import { Button } from '@/components/common/ui/buttons/button'
import { countriesForSelect } from '@/constants/countries/countriesForSelect'
import { EUpdateLeatherFactoryParams } from '@/enums/crm/leatherFactory'
import { useUpdateLeatherFactory } from '@/hooks/crm/leatherFactories/useUpdateLeatherFactory'

type PropsType = {
  factory: LeatherFactoryType
}

export const UpdateLeatherFactoryForm: FC<PropsType> = ({ factory }) => {
  const updateFactory = useUpdateLeatherFactory()

  const initialValues: UpdateLeatherFactoryParamsType = {
    [EUpdateLeatherFactoryParams.COUNTRY]: countriesForSelect[0]?.value,
    [EUpdateLeatherFactoryParams.DESCRIPTION]: factory.description,
    [EUpdateLeatherFactoryParams.NAME]: factory.name,
    [EUpdateLeatherFactoryParams.ID]: factory._id,
  }

  const onSubmit = async (values: UpdateLeatherFactoryParamsType): Promise<void> => {
    await updateFactory(values)
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {() => (
        <Form className="w-full space-y-3">
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
