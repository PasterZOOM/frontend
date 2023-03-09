import { FC } from 'react'

import { Form, Formik } from 'formik'
import { v1 } from 'uuid'

import { CreateLeatherFactoryParamsType } from '@/api/crm/leatherFactoryApi/types'
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
const countries: { id: string; value: ECountry; title: string }[] = [
  { id: v1(), value: ECountry.ITALY, title: 'Italy' },
  { id: v1(), value: ECountry.AMERICA, title: 'America' },
  { id: v1(), value: ECountry.BELARUS, title: 'Belarus' },
  { id: v1(), value: ECountry.FRANCE, title: 'France' },
  { id: v1(), value: ECountry.RUSSIA, title: 'Russia' },
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
              <input type="text" name={ECreateLeatherFactoryParams.NAME} className="border" />
            </div>
            <div>
              <div>Страна в которой расположена фабрика:</div>
              <select name={ECreateLeatherFactoryParams.COUNTRY} className="border p-2">
                {countries.map(country => (
                  <option key={country.id} value={country.value}>
                    {country.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div>Описание:</div>{' '}
              <textarea name={ECreateLeatherFactoryParams.DESCRIPTION} className="border" />
            </div>
            <Button type="submit">Создать</Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
