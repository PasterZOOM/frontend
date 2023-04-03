import { FC } from 'react'

import { Form, Formik, FormikHelpers } from 'formik'

import { CreateButton } from '@/components/common/ui/buttons/createButton'
import { H5 } from '@/components/common/ui/headers/h5'
import { FieldWrapper } from '@/components/forms/fieldWrapper'
import { FormikInput } from '@/components/forms/formikInput'
import { FormikSelect } from '@/components/forms/formikSelect'
import { ECreateLeatherFactoryParams } from '@/features/leatherFactories/enums/paramsKeys'
import { CreateLeatherFactoryFormType } from '@/features/leatherFactories/forms/type'
import { useCreateLeatherFactory } from '@/features/leatherFactories/hooks/useCreateLeatherFactory'
import { LeatherFactoryCreatConfirmModalBody } from '@/features/leatherFactories/modals/confirm/leatherFactoryCreatConfirmModalBody'
import { countriesForSelect } from '@/objects/countries/countriesForSelect'

const initialValues: CreateLeatherFactoryFormType = {
  country: countriesForSelect[0]?.value,
  description: '',
  title: '',
}

export const CreateLeatherFactoryForm: FC = () => {
  const createFactory = useCreateLeatherFactory()

  const onSubmit = async (
    values: CreateLeatherFactoryFormType,
    { resetForm }: FormikHelpers<CreateLeatherFactoryFormType>
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
            <FieldWrapper name={ECreateLeatherFactoryParams.TITLE} title="Название фабрики:">
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
