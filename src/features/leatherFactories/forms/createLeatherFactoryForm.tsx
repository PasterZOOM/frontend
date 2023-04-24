import { FC } from 'react'

import { Form, Formik, FormikHelpers } from 'formik'

import { CreateButton } from 'components/common/ui/buttons/createButton'
import { H5 } from 'components/common/ui/headers/h5'
import { FieldWrapper } from 'components/forms/fieldWrapper'
import { FormikInput } from 'components/forms/formikInput'
import { FormikSelect } from 'components/forms/formikSelect'
import { ECreateLeatherFactoryParams } from 'features/leatherFactories/enums/paramsKeys'
import { CreateLeatherFactoryFormType } from 'features/leatherFactories/forms/type'
import { useCreateLeatherFactory } from 'features/leatherFactories/hooks/useCreateLeatherFactory'
import { LeatherFactoryCreatConfirmModalBody } from 'features/leatherFactories/modals/confirm/leatherFactoryCreatConfirmModalBody'
import { useLocale } from 'hooks/useLocale'
import { countriesArray } from 'objects/countries/countryValues'

export const CreateLeatherFactoryForm: FC = () => {
  const locale = useLocale()

  const { mutateAsync: createFactory } = useCreateLeatherFactory()

  const initialValues: CreateLeatherFactoryFormType = {
    [ECreateLeatherFactoryParams.COUNTRY]: countriesArray(locale)[0].value,
    [ECreateLeatherFactoryParams.DESCRIPTION_EN]: '',
    [ECreateLeatherFactoryParams.DESCRIPTION_RU]: '',
    [ECreateLeatherFactoryParams.TITLE_EN]: '',
    [ECreateLeatherFactoryParams.TITLE_RU]: '',
  }

  const onSubmit = async (
    {
      country,
      'title-en': titleEn,
      'title-ru': titleRu,
      'description-en': descriptionEn,
      'description-ru': descriptionRu,
    }: CreateLeatherFactoryFormType,
    { resetForm }: FormikHelpers<CreateLeatherFactoryFormType>
  ): Promise<void> => {
    try {
      await createFactory({
        country,
        title: { en: titleEn, ru: titleRu },
        description: { en: descriptionEn, ru: descriptionRu },
      })

      resetForm()
    } catch (e) {
      /* empty */
    }
  }

  return (
    <div>
      <H5 className="mb-4 font-bold">Создать фабрику</H5>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, submitForm }) => (
          <Form className="space-y-3">
            <FieldWrapper name={ECreateLeatherFactoryParams.TITLE_EN} title="Название фабрики EN:">
              {name => <FormikInput name={name} />}
            </FieldWrapper>
            <FieldWrapper name={ECreateLeatherFactoryParams.TITLE_RU} title="Название фабрики RU:">
              {name => <FormikInput name={name} />}
            </FieldWrapper>

            <FieldWrapper
              name={ECreateLeatherFactoryParams.COUNTRY}
              title="Страна в которой расположена фабрика:"
            >
              {name => <FormikSelect name={name} items={countriesArray(locale)} />}
            </FieldWrapper>

            <FieldWrapper name={ECreateLeatherFactoryParams.DESCRIPTION_EN} title="Описание EN:">
              {name => <FormikInput name={name} />}
            </FieldWrapper>
            <FieldWrapper name={ECreateLeatherFactoryParams.DESCRIPTION_RU} title="Описание RU:">
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
