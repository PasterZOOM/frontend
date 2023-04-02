import { FC } from 'react'

import { Form, Formik, FormikHelpers } from 'formik'

import { CreateButton } from '@/components/common/ui/buttons/createButton'
import { H5 } from '@/components/common/ui/headers/h5'
import { FieldWrapper } from '@/components/forms/fieldWrapper'
import { FormikInput } from '@/components/forms/formikInput'
import { FormikSelect } from '@/components/forms/formikSelect'
import { ECreateLeatherArticleParams } from '@/features/leatherArticles/enums/paramsKeys'
import { CreateLeatherArticleFormType } from '@/features/leatherArticles/forms/type'
import { useCreateLeatherArticle } from '@/features/leatherArticles/hooks/useCreateLeatherArticle'
import { LeatherArticleCreateConfirmModalBody } from '@/features/leatherArticles/modals/confirm/leatherArticleCreateConfirmModalBody'
import { useGetAllLeatherFactories } from '@/features/leatherFactories/hooks/useGetAllLeatherFactories'

export const CreateLeatherArticleForm: FC = () => {
  const factories = useGetAllLeatherFactories()
  const createArticle = useCreateLeatherArticle()

  const initialValues: CreateLeatherArticleFormType = {
    [ECreateLeatherArticleParams.FACTORY_ID]: '',
    [ECreateLeatherArticleParams.DESCRIPTION]: '',
    [ECreateLeatherArticleParams.NAME]: '',
  }

  const onSubmit = async (
    { factoryId, ...params }: CreateLeatherArticleFormType,
    { resetForm }: FormikHelpers<CreateLeatherArticleFormType>
  ): Promise<void> => {
    await createArticle({ _id: factoryId || factories[0]?._id, params })

    resetForm()
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
