import { FC } from 'react'

import { useTranslation } from 'next-i18next'
import { UseFormReturn } from 'react-hook-form'

import { useGetAllLeatherArticles } from '@/features/leatherArticles/hooks/useGetAllLeatherArticles'
import { CreateLeatherColorFormType } from '@/features/leatherColors/forms/module/type'
import { resolver } from '@/features/leatherColors/forms/module/validation.sheme'
import { LeatherColorCreatConfirmModalBody } from '@/features/leatherColors/forms/ui/leatherColorCreatConfirmModalBody'
import { useCreateLeatherColor } from '@/features/leatherColors/hooks/useCreateLeatherColor'
import { CreateForm } from '@/shared/components/forms/createForm'
import { FormInputWithWrapper } from '@/shared/components/forms/inputs/formInputWithWrapper'
import { FormSelectWithWrapper } from '@/shared/components/forms/selects/formSelectWithWrapper'
import { ELeatherColor } from '@/shared/enums/materials'
import { leatherColorsArray } from '@/shared/objects/colors/leatherColors'
import { SelectItemType } from '@/shared/ui/selects/defaultSelectType'
import { TypographyHeader } from '@/shared/ui/typographyHeader/typographyHeader'

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
    await methods.handleSubmit(async ({ articleId: _id, ...restData }): Promise<void> => {
      try {
        await createColor({
          _id,
          data: {
            ...restData,
            factory: data?.filter(article => article._id === _id)[0].factory._id ?? '',
          },
        })
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
        <FormSelectWithWrapper<FormValues> items={articles} label="Артикул:" name="articleId" />

        <FormSelectWithWrapper<FormValues>
          items={leatherColorsArray}
          label="Значение цвета:"
          name="value"
        />

        <FormInputWithWrapper<FormValues> label="Название цвета:" name="title" />

        <FormInputWithWrapper<FormValues> label="Код цвета:" name="code" />

        <FormInputWithWrapper<FormValues> label="Фото цвета:" name="photo" />

        <FormInputWithWrapper<FormValues> label="Описание:" name="description" />
      </CreateForm>
    </>
  )
}
