import { FC } from 'react'

import { UseFormReturn } from 'react-hook-form'

import { SelectItemType } from 'components/common/ui/selects/defaultSelectType'
import { TypographyHeader } from 'components/common/ui/typographyHeader/typographyHeader'
import { CreateForm } from 'components/forms/createForm'
import { FormInputWithWrapper } from 'components/forms/inputs/formInputWithWrapper'
import { FormSelectWithWrapper } from 'components/forms/selects/formSelectWithWrapper'
import { ELeatherColor } from 'enums/materials'
import { useGetAllLeatherArticles } from 'features/leatherArticles/hooks/useGetAllLeatherArticles'
import { CreateLeatherColorFormType } from 'features/leatherColors/forms/type'
import { resolver } from 'features/leatherColors/forms/validation.sheme'
import { useCreateLeatherColor } from 'features/leatherColors/hooks/useCreateLeatherColor'
import { LeatherColorCreatConfirmModalBody } from 'features/leatherColors/modals/confirm/leatherColorCreatConfirmModalBody'
import { leatherColorsArray } from 'objects/colors/leatherColorsValues'

type FormValues = CreateLeatherColorFormType

const defaultValues: FormValues = {
  articleId: '',
  description: '',
  title: '',
  code: '',
  value: ELeatherColor.BLACK,
  photo: '',
}

export const CreateLeatherColorForm: FC = () => {
  const { data } = useGetAllLeatherArticles()
  const { mutateAsync: createColor } = useCreateLeatherColor()

  const articles: SelectItemType[] = (data ?? []).map(({ _id, title }) => ({
    _id,
    title,
    value: _id,
  }))

  const onSubmit = async (methods: UseFormReturn<FormValues>): Promise<void> => {
    await methods.handleSubmit(async ({ articleId: _id, ...params }): Promise<void> => {
      try {
        await createColor({ _id, params })
        methods.reset()
      } catch (e) {
        /* empty */
      }
    })()
  }

  return (
    <>
      <TypographyHeader as="h5" className="mb-4 font-bold">
        Создать артикул
      </TypographyHeader>
      <CreateForm
        confirmModalChildren={LeatherColorCreatConfirmModalBody}
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        resolver={resolver}
      >
        <FormSelectWithWrapper<FormValues> title="Артикул:" name="articleId" items={articles} />

        <FormSelectWithWrapper<FormValues>
          title="Значение цвета:"
          name="value"
          items={leatherColorsArray()}
        />

        <FormInputWithWrapper<FormValues> title="Название цвета:" name="title" />

        <FormInputWithWrapper<FormValues> title="Код цвета:" name="code" />

        <FormInputWithWrapper<FormValues> title="Фото цвета:" name="photo" />

        <FormInputWithWrapper<FormValues> title="Описание:" name="description" />
      </CreateForm>
    </>
  )
}
