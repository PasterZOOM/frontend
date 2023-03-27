import { FC } from 'react'

import { Form, Formik, FormikHelpers } from 'formik'

import { CreateLeatherFactoryParamsType } from '@/api/crm/leatherFactoriesApi/types'
import { CreateButton } from '@/components/common/ui/buttons/createButton'
import { H5 } from '@/components/common/ui/headers/h5'
import { FieldWrapper } from '@/components/forms/fieldWrapper'
import { FormikInput } from '@/components/forms/formikInput'
import { FormikSelect } from '@/components/forms/formikSelect'
import { LeatherFactoryCreatConfirmModalBody } from '@/components/modals/crm/leatherFactory/confirm/leatherFactoryCreatConfirmModalBody'
import { countriesForSelect } from '@/constants/countries/countriesForSelect'
import { ECreateLeatherFactoryParams } from '@/enums/crm/leatherFactory'
import { useCreateLeatherFactory } from '@/hooks/crm/leatherFactories/useCreateLeatherFactory'

const initialValues: CreateLeatherFactoryParamsType = {
  country: countriesForSelect[0]?.value,
  description: '',
  name: '',
}

export const CreateLeatherFactoryForm: FC = () => {
  const createFactory = useCreateLeatherFactory()

  const onSubmit = async (
    values: CreateLeatherFactoryParamsType,
    { resetForm }: FormikHelpers<CreateLeatherFactoryParamsType>
  ): Promise<void> => {
    await createFactory(values)

    resetForm()
  }

  return (
    <div>
      <H5 className="mb-4 font-bold">Создать фабрику</H5>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, submitForm }) => (
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
              onConfirm={submitForm}
              modalChildren={<LeatherFactoryCreatConfirmModalBody values={values} />}
            />
          </Form>
        )}
      </Formik>
    </div>
  )
}
