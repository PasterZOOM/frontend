import { FC } from 'react'

import { Form, Formik } from 'formik'

import { CreateLeatherFactoryParamsType } from '@/api/crm/leatherFactoryApi/types'
import { FormikInput } from '@/components/common/forms/formikInput'
import { FormikSelect } from '@/components/common/forms/formikSelect'
import { Button } from '@/components/common/ui/buttons/button'
import { H5 } from '@/components/common/ui/headers/h5'
import { countriesForSelect } from '@/constants/countries/countriesForSelect'
import { ECreateLeatherFactoryParams } from '@/enums/crm/leatherFactory'
import { useCreateLeatherFactory } from '@/hooks/crm/leatherFactories/useCreateLeatherFactory'

const initialValues: CreateLeatherFactoryParamsType = {
  country: countriesForSelect[0]?.value,
  description: '',
  name: '',
}

export const AddLeatherFactoryForm: FC = () => {
  const createFactory = useCreateLeatherFactory()

  const onSubmit = async (values: CreateLeatherFactoryParamsType): Promise<void> => {
    await createFactory(values)
  }

  return (
    <div>
      <H5 className="mb-4 font-bold">Создать фабрику</H5>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {() => (
          <Form className="space-y-3">
            <div>
              <div>Название фабрики:</div>
              <FormikInput name={ECreateLeatherFactoryParams.NAME} className="w-full border" />
            </div>
            <div>
              <div>Страна в которой расположена фабрика:</div>
              <FormikSelect
                name={ECreateLeatherFactoryParams.COUNTRY}
                className="w-full border p-2"
                items={countriesForSelect}
                valueField="value"
              />
            </div>
            <div>
              <div>Описание:</div>
              <FormikInput
                name={ECreateLeatherFactoryParams.DESCRIPTION}
                className="w-full border"
              />
            </div>
            <Button type="submit" className="w-full">
              Создать
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
