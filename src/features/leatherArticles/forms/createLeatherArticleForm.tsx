import { FC } from 'react'

import { useTranslation } from 'next-i18next'
import { UseFormReturn } from 'react-hook-form'

import { CreateLeatherArticleFormType } from 'features/leatherArticles/forms/type'
import { resolver } from 'features/leatherArticles/forms/validation.sheme'
import { useCreateLeatherArticle } from 'features/leatherArticles/hooks/useCreateLeatherArticle'
import { LeatherArticleCreateConfirmModalBody } from 'features/leatherArticles/modals/confirm/leatherArticleCreateConfirmModalBody'
import { useGetAllLeatherFactories } from 'features/leatherFactories/hooks/useGetAllLeatherFactories'
import { CreateForm } from 'shared/components/forms/createForm'
import { FormInputWithWrapper } from 'shared/components/forms/inputs/formInputWithWrapper'
import { FormSelectWithWrapper } from 'shared/components/forms/selects/formSelectWithWrapper'
import { SelectItemType } from 'shared/ui/selects/defaultSelectType'
import { TypographyHeader } from 'shared/ui/typographyHeader/typographyHeader'

type FormValues = CreateLeatherArticleFormType
const defaultValues: FormValues = {
  factoryId: '',
  description: '',
  title: '',
  value: '',
}

export const CreateLeatherArticleForm: FC = () => {
  const { data } = useGetAllLeatherFactories()
  const { mutateAsync: createArticle } = useCreateLeatherArticle()
  const { t } = useTranslation()

  const factories: SelectItemType[] = (data ?? []).map(({ _id, title }) => ({
    _id,
    title,
    value: _id,
  }))

  const onSubmit = async (methods: UseFormReturn<FormValues>): Promise<void> => {
    await methods.handleSubmit(async ({ factoryId: _id, ...params }): Promise<void> => {
      try {
        await createArticle({ _id, params })
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
        confirmModalChildren={LeatherArticleCreateConfirmModalBody}
        defaultValues={defaultValues}
        resolver={resolver}
        onSubmit={onSubmit}
      >
        <FormInputWithWrapper<FormValues> name="title" title="Название артикула:" />

        <FormInputWithWrapper<FormValues> name="value" title="Значение:" />

        <FormSelectWithWrapper<FormValues> items={factories} name="factoryId" title="Фабрика:" />

        <FormInputWithWrapper<FormValues> name="description" title="Описание:" />
      </CreateForm>
    </>
  )
}
