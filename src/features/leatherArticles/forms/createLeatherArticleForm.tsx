import { FC } from 'react'

import { UseFormReturn } from 'react-hook-form'

import { SelectItemType } from 'components/common/ui/selects/defaultSelectType'
import { TypographyHeader } from 'components/common/ui/typographyHeader/typographyHeader'
import { CreateForm } from 'components/forms/createForm'
import { FormInputWithWrapper } from 'components/forms/inputs/formInputWithWrapper'
import { FormSelectWithWrapper } from 'components/forms/selects/formSelectWithWrapper'
import { CreateLeatherArticleFormType } from 'features/leatherArticles/forms/type'
import { resolver } from 'features/leatherArticles/forms/validation.sheme'
import { useCreateLeatherArticle } from 'features/leatherArticles/hooks/useCreateLeatherArticle'
import { LeatherArticleCreateConfirmModalBody } from 'features/leatherArticles/modals/confirm/leatherArticleCreateConfirmModalBody'
import { useGetAllLeatherFactories } from 'features/leatherFactories/hooks/useGetAllLeatherFactories'

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
        Создать артикул
      </TypographyHeader>
      <CreateForm
        confirmModalChildren={LeatherArticleCreateConfirmModalBody}
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        resolver={resolver}
      >
        <FormInputWithWrapper<FormValues> title="Название артикула:" name="title" />

        <FormInputWithWrapper<FormValues> title="Значение:" name="value" />

        <FormSelectWithWrapper<FormValues> title="Фабрика:" name="factoryId" items={factories} />

        <FormInputWithWrapper<FormValues> title="Описание:" name="description" />
      </CreateForm>
    </>
  )
}
