import { FC } from 'react'

import { Form, Formik } from 'formik'

import { LeatherColorType, UpdateLeatherColorParamsType } from '@/api/crm/leatherColorsApi/types'
import { UpdateButton } from '@/components/common/ui/buttons/updateButton'
import { FieldWrapper } from '@/components/forms/fieldWrapper'
import { FormikInput } from '@/components/forms/formikInput'
import { FormikSelect } from '@/components/forms/formikSelect'
import { LeatherColorUpdateConfirmModalBody } from '@/components/modals/crm/leatherColor/confirm/leatherColorUpdateConfirmModalBody'
import { colorsForSelect } from '@/constants/colors/colorsForSelect'
import { EUpdateLeatherColorParams } from '@/enums/crm/leatherColor'
import { useUpdateLeatherColor } from '@/hooks/crm/leatherColors/useUpdateLeatherColor'

type PropsType = {
  color: LeatherColorType
}

export const UpdateLeatherColorForm: FC<PropsType> = ({ color }) => {
  const updateColor = useUpdateLeatherColor()

  const initialValues: UpdateLeatherColorParamsType = {
    [EUpdateLeatherColorParams.DESCRIPTION]: color.description,
    [EUpdateLeatherColorParams.TITLE]: color.title,
    [EUpdateLeatherColorParams.ID]: color._id,
    [EUpdateLeatherColorParams.VALUE]: color.value,
    [EUpdateLeatherColorParams.PHOTO]: color.photo,
    [EUpdateLeatherColorParams.CODE]: color.code,
  }

  const onSubmit = async (values: UpdateLeatherColorParamsType): Promise<void> => {
    await updateColor(values)
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values }) => (
        <Form className="w-full space-y-3">
          <FieldWrapper name={EUpdateLeatherColorParams.VALUE} title="Значение цвета:">
            {name => <FormikSelect name={name} items={colorsForSelect} valueField="value" />}
          </FieldWrapper>

          <FieldWrapper name={EUpdateLeatherColorParams.TITLE} title="Название цвета:">
            {name => <FormikInput name={name} />}
          </FieldWrapper>

          <FieldWrapper name={EUpdateLeatherColorParams.CODE} title="Код цвета:">
            {name => <FormikInput name={name} />}
          </FieldWrapper>

          <FieldWrapper name={EUpdateLeatherColorParams.PHOTO} title="Фото цвета:">
            {name => <FormikInput name={name} />}
          </FieldWrapper>

          <FieldWrapper name={EUpdateLeatherColorParams.DESCRIPTION} title="Описание:">
            {name => <FormikInput name={name} />}
          </FieldWrapper>

          <UpdateButton
            onConfirm={() => onSubmit(values)}
            modalChildren={<LeatherColorUpdateConfirmModalBody values={values} />}
          />
        </Form>
      )}
    </Formik>
  )
}
