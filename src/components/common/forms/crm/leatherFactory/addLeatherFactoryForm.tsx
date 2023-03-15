import { FC } from 'react'

import { Form, Formik } from 'formik'

import { CreateLeatherFactoryParamsType } from '@/api/crm/leatherFactoryApi/types'
import { FieldWrapper } from '@/components/common/forms/fieldWrapper'
import { FormikInput } from '@/components/common/forms/formikInput'
import { FormikSelect } from '@/components/common/forms/formikSelect'
import { CreateButton } from '@/components/common/ui/buttons/createButton'
import { H5 } from '@/components/common/ui/headers/h5'
import { LeatherFactoryCreatConfirmModalBody } from '@/components/modals/crm/leatherFactory/leatherFactoryCreatConfirmModalBody'
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

  // TODO Сделать кнопку с модалкой для подтверждения изменения
  return (
    <div>
      <H5 className="mb-4 font-bold">Создать фабрику</H5>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values }) => (
          <Form className="space-y-3">
            <FieldWrapper name={ECreateLeatherFactoryParams.NAME} title="Название фабрики:">
              {name => <FormikInput name={name} />}
            </FieldWrapper>

            <FieldWrapper
              name={ECreateLeatherFactoryParams.COUNTRY}
              title="Страна в которой расположена фабрика:"
            >
              {name => <FormikSelect name={name} items={countriesForSelect} valueField="value" />}
            </FieldWrapper>

            <FieldWrapper name={ECreateLeatherFactoryParams.DESCRIPTION} title="Описание:">
              {name => <FormikInput name={name} />}
            </FieldWrapper>

            <CreateButton
              onConfirm={() => onSubmit(values)}
              modalChildren={<LeatherFactoryCreatConfirmModalBody values={values} />}
            />
          </Form>
        )}
      </Formik>
    </div>
  )
}