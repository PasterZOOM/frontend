import { FC } from 'react'

import { Form, Formik, FormikHelpers } from 'formik'

import { CreateLeatherColorParamsType } from '@/api/crm/leatherColorsApi/types'
import { CreateButton } from '@/components/common/ui/buttons/createButton'
import { H5 } from '@/components/common/ui/headers/h5'
import { FieldWrapper } from '@/components/forms/fieldWrapper'
import { FormikInput } from '@/components/forms/formikInput'
import { FormikSelect } from '@/components/forms/formikSelect'
import { LeatherColorCreatConfirmModalBody } from '@/components/modals/crm/leatherColor/confirm/leatherColorCreatConfirmModalBody'
import { colorsForSelect } from '@/constants/colors/colorsForSelect'
import { ECreateLeatherColorParams } from '@/enums/crm/leatherColor'
import { ELeatherColor } from '@/enums/materials'
import { useGetAllLeatherArticles } from '@/hooks/crm/leatherArticles/useGetAllLeatherArticles'
import { useCreateLeatherColor } from '@/hooks/crm/leatherColors/useCreateLeatherColor'

export const CreateLeatherColorForm: FC = () => {
  const articles = useGetAllLeatherArticles()
  const createColor = useCreateLeatherColor()

  const initialValues: CreateLeatherColorParamsType = {
    [ECreateLeatherColorParams.ARTICLE_ID]: articles[0]?._id,
    [ECreateLeatherColorParams.DESCRIPTION]: '',
    [ECreateLeatherColorParams.TITLE]: '',
    [ECreateLeatherColorParams.CODE]: '',
    [ECreateLeatherColorParams.VALUE]: ELeatherColor.BLACK,
    [ECreateLeatherColorParams.PHOTO]: '',
  }

  const onSubmit = async (
    values: CreateLeatherColorParamsType,
    { resetForm }: FormikHelpers<CreateLeatherColorParamsType>
  ): Promise<void> => {
    await createColor(values)

    resetForm({
      values: { ...initialValues, [ECreateLeatherColorParams.ARTICLE_ID]: values.articleId },
    })
  }

  return (
    <div>
      <H5 className="mb-4 font-bold">Создать артикул</H5>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, submitForm }) => (
          <Form className="space-y-3">
            <FieldWrapper name={ECreateLeatherColorParams.ARTICLE_ID} title="Артикулы:">
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
