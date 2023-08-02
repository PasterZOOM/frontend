import { FC } from 'react'

import { useTranslation } from 'next-i18next'
import { UseFormReturn } from 'react-hook-form'

import { CreateForm } from 'components/forms/createForm'
import { FormInputWithWrapper } from 'components/forms/inputs/formInputWithWrapper'
import { FormSelectWithWrapper } from 'components/forms/selects/formSelectWithWrapper'
import { useGetAllLeatherArticles } from 'features/leatherArticles/hooks/useGetAllLeatherArticles'
import { CreateLeatherColorFormType } from 'features/leatherColors/forms/type'
import { resolver } from 'features/leatherColors/forms/validation.sheme'
import { useCreateLeatherColor } from 'features/leatherColors/hooks/useCreateLeatherColor'
import { LeatherColorCreatConfirmModalBody } from 'features/leatherColors/modals/confirm/leatherColorCreatConfirmModalBody'
import { leatherColorsArray } from 'objects/colors/leatherColorsValues'
import { ELeatherColor } from 'shared/enums/materials'
import { SelectItemType } from 'shared/ui/selects/defaultSelectType'
import { TypographyHeader } from 'shared/ui/typographyHeader/typographyHeader'

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
  const { t } = useTranslation()

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
        {t('Создать артикул')}
      </TypographyHeader>
      <CreateForm
        confirmModalChildren={LeatherColorCreatConfirmModalBody}
        defaultValues={defaultValues}
        resolver={resolver}
        onSubmit={onSubmit}
      >
        <FormSelectWithWrapper<FormValues> items={articles} name="articleId" title="Артикул:" />

        <FormSelectWithWrapper<FormValues>
          items={leatherColorsArray()}
          name="value"
          title="Значение цвета:"
        />

        <FormInputWithWrapper<FormValues> name="title" title="Название цвета:" />

        <FormInputWithWrapper<FormValues> name="code" title="Код цвета:" />

        <FormInputWithWrapper<FormValues> name="photo" title="Фото цвета:" />

        <FormInputWithWrapper<FormValues> name="description" title="Описание:" />
      </CreateForm>
    </>
  )
}
