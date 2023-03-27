import { FC } from 'react'

import { Form, Formik, FormikHelpers } from 'formik'

import { CreateLeatherArticleParamsType } from '@/api/crm/leatherArticlesApi/types'
import { CreateButton } from '@/components/common/ui/buttons/createButton'
import { H5 } from '@/components/common/ui/headers/h5'
import { FieldWrapper } from '@/components/forms/fieldWrapper'
import { FormikInput } from '@/components/forms/formikInput'
import { FormikSelect } from '@/components/forms/formikSelect'
import { LeatherArticleCreateConfirmModalBody } from '@/components/modals/crm/leatherArticle/confirm/leatherArticleCreateConfirmModalBody'
import { ECreateLeatherArticleParams } from '@/enums/crm/leatherArticle'
import { useCreateLeatherArticle } from '@/hooks/crm/leatherArticles/useCreateLeatherArticle'
import { useGetAllLeatherFactories } from '@/hooks/crm/leatherFactories/useGetAllLeatherFactories'

export const CreateLeatherArticleForm: FC = () => {
  const factories = useGetAllLeatherFactories()
  const createArticle = useCreateLeatherArticle()

  const initialValues: CreateLeatherArticleParamsType = {
    [ECreateLeatherArticleParams.FACTORY_ID]: factories[0]?._id || '',
    [ECreateLeatherArticleParams.DESCRIPTION]: '',
    [ECreateLeatherArticleParams.NAME]: '',
  }

  const onSubmit = async (
    values: CreateLeatherArticleParamsType,
    { resetForm }: FormikHelpers<CreateLeatherArticleParamsType>
  ): Promise<void> => {
    await createArticle(values)

    resetForm({
      values: { ...initialValues, [ECreateLeatherArticleParams.FACTORY_ID]: values.factoryId },
    })
  }

  return (
    <div>
      <H5 className="mb-4 font-bold">Создать артикул</H5>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, submitForm }) => (
          <Form className="space-y-3">
            <FieldWrapper name={ECreateLeatherArticleParams.NAME} title="Название артикула:">
              {name => <FormikInput name={name} />}
            </FieldWrapper>

            <FieldWrapper name={ECreateLeatherArticleParams.FACTORY_ID} title="Фабрика:">
              {name => <FormikSelect name={name} items={factories} valueField="_id" />}
            </FieldWrapper>

            <FieldWrapper name={ECreateLeatherArticleParams.DESCRIPTION} title="Описание:">
              {name => <FormikInput name={name} />}
            </FieldWrapper>

            <CreateButton
              onConfirm={submitForm}
              modalChildren={<LeatherArticleCreateConfirmModalBody values={values} />}
            />
          </Form>
        )}
      </Formik>
    </div>
  )
}
