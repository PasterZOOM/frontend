import { FC } from 'react'

import { Form, Formik, FormikHelpers } from 'formik'

import { CreateButton } from '@/components/common/ui/buttons/createButton'
import { H5 } from '@/components/common/ui/headers/h5'
import { FieldWrapper } from '@/components/forms/fieldWrapper'
import { FormikInput } from '@/components/forms/formikInput'
import { FormikSelect } from '@/components/forms/formikSelect'
import { ELeatherColor } from '@/enums/materials'
import { useGetArticlesForSelect } from '@/features/leatherArticles/hooks/useGetArticlesForSelect'
import { ECreateLeatherColorParams } from '@/features/leatherColors/enums/paramsKeys'
import { CreateLeatherColorFormType } from '@/features/leatherColors/forms/type'
import { useCreateLeatherColor } from '@/features/leatherColors/hooks/useCreateLeatherColor'
import { LeatherColorCreatConfirmModalBody } from '@/features/leatherColors/modals/confirm/leatherColorCreatConfirmModalBody'
import { colorsForSelect } from '@/objects/colors/colorsForSelect'

export const CreateLeatherColorForm: FC = () => {
  const articles = useGetArticlesForSelect()

  const createColor = useCreateLeatherColor()

  const initialValues: CreateLeatherColorFormType = {
    [ECreateLeatherColorParams.ARTICLE_ID]: '',
    [ECreateLeatherColorParams.DESCRIPTION]: '',
    [ECreateLeatherColorParams.TITLE]: '',
    [ECreateLeatherColorParams.CODE]: '',
    [ECreateLeatherColorParams.VALUE]: ELeatherColor.BLACK,
    [ECreateLeatherColorParams.PHOTO]: '',
  }

  const onSubmit = async (
    { articleId, ...params }: CreateLeatherColorFormType,
    { resetForm }: FormikHelpers<CreateLeatherColorFormType>
  ): Promise<void> => {
    await createColor({ _id: articleId || articles[0]?._id, params })

    resetForm()
  }

  return (
    <div>
      <H5 className="mb-4 font-bold">Создать артикул</H5>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, submitForm }) => (
          <Form className="space-y-3">
            <FieldWrapper name={ECreateLeatherColorParams.ARTICLE_ID} title="Артикул:">
              {name => <FormikSelect name={name} items={articles} valueField="_id" />}
            </FieldWrapper>

            <FieldWrapper name={ECreateLeatherColorParams.VALUE} title="Значение цвета:">
              {name => <FormikSelect name={name} items={colorsForSelect} valueField="value" />}
            </FieldWrapper>

            <FieldWrapper name={ECreateLeatherColorParams.TITLE} title="Название цвета:">
              {name => <FormikInput name={name} />}
            </FieldWrapper>

            <FieldWrapper name={ECreateLeatherColorParams.CODE} title="Код цвета:">
              {name => <FormikInput name={name} />}
            </FieldWrapper>

            <FieldWrapper name={ECreateLeatherColorParams.PHOTO} title="Фото цвета:">
              {name => <FormikInput name={name} />}
            </FieldWrapper>

            <FieldWrapper name={ECreateLeatherColorParams.DESCRIPTION} title="Описание:">
              {name => <FormikInput name={name} />}
            </FieldWrapper>

            <CreateButton
              onConfirm={submitForm}
              modalChildren={<LeatherColorCreatConfirmModalBody values={values} />}
            />
          </Form>
        )}
      </Formik>
    </div>
  )
}
