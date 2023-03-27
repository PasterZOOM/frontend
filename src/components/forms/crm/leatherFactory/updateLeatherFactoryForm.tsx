import { FC } from 'react'

import { Form, Formik } from 'formik'

import {
  LeatherFactoryType,
  UpdateLeatherFactoryParamsType,
} from '@/api/crm/leatherFactoriesApi/types'
import { UpdateButton } from '@/components/common/ui/buttons/updateButton'
import { FieldWrapper } from '@/components/forms/fieldWrapper'
import { FormikInput } from '@/components/forms/formikInput'
import { FormikSelect } from '@/components/forms/formikSelect'
import { LeatherFactoryUpdateConfirmModalBody } from '@/components/modals/crm/leatherFactory/confirm/leatherFactoryUpdateConfirmModalBody'
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
      {({ values, submitForm }) => (
        <Form className="w-full space-y-3">
          <FieldWrapper name={EUpdateLeatherFactoryParams.NAME} title="Название фабрики:">
            {name => <FormikInput name={name} />}
          </FieldWrapper>

          <FieldWrapper
            name={EUpdateLeatherFactoryParams.COUNTRY}
            title="Страна в которой расположена фабрика:"
          >
            {name => <FormikSelect name={name} items={countriesForSelect} valueField="value" />}
          </FieldWrapper>

          <FieldWrapper name={EUpdateLeatherFactoryParams.DESCRIPTION} title="Описание:">
            {name => <FormikInput name={name} />}
          </FieldWrapper>

          <UpdateButton
            onConfirm={submitForm}
            modalChildren={<LeatherFactoryUpdateConfirmModalBody values={values} />}
          />
        </Form>
      )}
    </Formik>
  )
}
