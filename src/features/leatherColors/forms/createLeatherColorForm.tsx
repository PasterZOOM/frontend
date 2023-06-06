import { FC } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'

import { H5 } from 'components/common/ui/headers/h5'
import { SelectItemType } from 'components/common/ui/selects/defaultSelectType'
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

const defaultValues: CreateLeatherColorFormType = {
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

  const methods = useForm<CreateLeatherColorFormType>({
    defaultValues,
    resolver,
  })

  const articles: SelectItemType[] = (data ?? []).map(({ _id, title }) => ({
    _id,
    title,
    value: _id,
  }))

  const onSubmit: SubmitHandler<CreateLeatherColorFormType> = async ({
    articleId: _id,
    ...params
  }): Promise<void> => {
    try {
      await createColor({ _id, params })
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
        confirmModalChildren={<LeatherColorCreatConfirmModalBody values={methods.getValues()} />}
      >
        <FormSelectWithWrapper title="Артикул:" name="articleId" items={articles} />

        <FormSelectWithWrapper title="Значение цвета:" name="value" items={leatherColorsArray()} />

        <FormInputWithWrapper title="Название цвета:" name="title" />

        <FormInputWithWrapper title="Код цвета:" name="code" />

        <FormInputWithWrapper title="Фото цвета:" name="photo" />

        <FormInputWithWrapper title="Описание:" name="description" />
      </CreateForm>
    </>
  )
}
