import { FC } from 'react'

import { Form, Formik } from 'formik'
import { v1 } from 'uuid'

import { CreateLeatherFactoryParamsType } from '@/api/crm/leatherFactoryApi/types'
import { FormikInput } from '@/components/common/forms/formikInput'
import { FormikSelect } from '@/components/common/forms/formikSelect'
import { Button } from '@/components/common/ui/buttons/button'
import { H5 } from '@/components/common/ui/headers/h5'
import { ECountry } from '@/enums/countries'
import { ECreateLeatherFactoryParams } from '@/enums/crm/leatherFactory'
import { useSrmServiceStore } from '@/store/crmServises'

const initialValues: CreateLeatherFactoryParamsType = {
  country: '',
  description: '',
  name: '',
}
const countries: { _id: string; value: ECountry; name: string }[] = [
  { _id: v1(), value: ECountry.ITALY, name: 'Italy' },
  { _id: v1(), value: ECountry.AMERICA, name: 'America' },
  { _id: v1(), value: ECountry.BELARUS, name: 'Belarus' },
  { _id: v1(), value: ECountry.FRANCE, name: 'France' },
  { _id: v1(), value: ECountry.RUSSIA, name: 'Russia' },
]

export const AddLeatherFactoryForm: FC = () => {
  const leatherFactoryService = useSrmServiceStore(state => state.leatherFactoryService)

  const onSubmit = async (values: CreateLeatherFactoryParamsType): Promise<void> => {
    await leatherFactoryService.create(values)
  }

  return (
    <div>
      <H5 className="font-bold">Добавить фабрику</H5>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {() => (
          <Form>
            <div>
              <div>Название фабрики:</div>
              <FormikInput name={ECreateLeatherFactoryParams.NAME} className="border" />
            </div>
            <div>
              <div>Страна в которой расположена фабрика:</div>
              <FormikSelect
                name={ECreateLeatherFactoryParams.COUNTRY}
                className="border p-2"
                items={countries}
              />
            </div>
            <div>
              <div>Описание:</div>
              <FormikInput name={ECreateLeatherFactoryParams.DESCRIPTION} className="border" />
            </div>
            <Button type="submit">Создать</Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
