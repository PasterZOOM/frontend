import { FC } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'

import { H5 } from 'components/common/ui/headers/h5'
import { SelectItemType } from 'components/common/ui/selects/defaultSelectType'
import { CreateForm } from 'components/forms/createForm'
import { FormInputWithWrapper } from 'components/forms/inputs/formInputWithWrapper'
import { FormSelectWithWrapper } from 'components/forms/selects/formSelectWithWrapper'
import { CreateLeatherArticleFormType } from 'features/leatherArticles/forms/type'
import { resolver } from 'features/leatherArticles/forms/validation.sheme'
import { useCreateLeatherArticle } from 'features/leatherArticles/hooks/useCreateLeatherArticle'
import { LeatherArticleCreateConfirmModalBody } from 'features/leatherArticles/modals/confirm/leatherArticleCreateConfirmModalBody'
import { useGetAllLeatherFactories } from 'features/leatherFactories/hooks/useGetAllLeatherFactories'

const defaultValues: CreateLeatherArticleFormType = {
  factoryId: '',
  description: '',
  title: '',
  value: '',
}

export const CreateLeatherArticleForm: FC = () => {
  const { data } = useGetAllLeatherFactories()
  const { mutateAsync: createArticle } = useCreateLeatherArticle()

  const methods = useForm<CreateLeatherArticleFormType>({
    defaultValues,
    resolver,
  })

  const factories: SelectItemType[] = (data ?? []).map(({ _id, title }) => ({
    _id,
    title,
    value: _id,
  }))

  const onSubmit: SubmitHandler<CreateLeatherArticleFormType> = async ({
    factoryId: _id,
    ...params
  }): Promise<void> => {
    try {
      await createArticle({ _id, params })
      methods.reset()
    } catch (e) {
      /* empty */
    }
  }

  return (
    <>
      <H5 className="mb-4 font-bold">Создать артикул</H5>
      <CreateForm
        methods={methods}
        onSubmit={onSubmit}
        confirmModalChildren={<LeatherArticleCreateConfirmModalBody values={methods.getValues()} />}
      >
        <FormInputWithWrapper title="Название артикула:" name="title" />

        <FormInputWithWrapper title="Значение:" name="value" />

        <FormSelectWithWrapper title="Фабрика:" name="factoryId" items={factories} />

        <FormInputWithWrapper title="Описание:" name="description" />
      </CreateForm>
    </>
  )
}
