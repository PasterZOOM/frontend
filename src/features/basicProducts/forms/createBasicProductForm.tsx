import { FC } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'

import { H5 } from 'components/common/ui/headers/h5'
import { SelectItemType } from 'components/common/ui/selects/defaultSelectType'
import { CreateForm } from 'components/forms/createForm'
import { FormInputWithWrapper } from 'components/forms/inputs/formInputWithWrapper'
import { FormSelectWithWrapper } from 'components/forms/selects/formSelectWithWrapper'
import { ECost } from 'enums/cost'
import { EPunchPitch } from 'enums/materials'
import { EProductCategory } from 'enums/product'
import { CreateBasicProductFormType } from 'features/basicProducts/forms/type'
import { resolver } from 'features/basicProducts/forms/validation.sheme'
import { useCreateBasicProduct } from 'features/basicProducts/hooks/useCreateBasicProduct'
import { BasicProductCreatConfirmModalBody } from 'features/basicProducts/modals/confirm/basicProductCreatConfirmModalBody'
import { useGetAllLeatherArticles } from 'features/leatherArticles/hooks/useGetAllLeatherArticles'
import { currencyArray } from 'objects/currency/currency'
import { punchPatchesArray } from 'objects/materials/punchPatch'
import { productAssignmentsArray } from 'objects/products/productAssignments'
import { productCategoriesArray } from 'objects/products/productCategories'

const defaultValues: CreateBasicProductFormType = {
  assignments: [],
  category: EProductCategory.CARD_HOLDER,
  cost: 0,
  costCurrency: ECost.USD,
  description: '',
  leather: '',
  punchPitch: EPunchPitch.LITTLE,
  size: '',
  title: '',
}

export const CreateBasicProductForm: FC = () => {
  const { data } = useGetAllLeatherArticles()
  const { mutate: createBasicProduct } = useCreateBasicProduct()
  const methods = useForm<CreateBasicProductFormType>({
    defaultValues,
    resolver,
    mode: 'onTouched',
  })

  const articles: SelectItemType[] = (data ?? []).map(({ _id, title }) => ({
    _id,
    title,
    value: _id,
  }))

  const onSubmit: SubmitHandler<CreateBasicProductFormType> = async (formData): Promise<void> => {
    try {
      await createBasicProduct(formData)
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
        confirmModalChildren={<BasicProductCreatConfirmModalBody values={methods.getValues()} />}
      >
        <FormInputWithWrapper title="Название изделия:" name="title" />

        <FormSelectWithWrapper title="Артикул:" name="leather" items={articles} />

        <FormInputWithWrapper
          title="Стоимость:"
          name="cost"
          inputProps={{ type: 'number', min: 0 }}
        />

        <FormSelectWithWrapper title="Валюта:" name="costCurrency" items={currencyArray()} />

        <FormSelectWithWrapper
          title="Категория:"
          name="category"
          items={productCategoriesArray()}
        />

        <FormSelectWithWrapper
          title="Назначения:"
          name="assignments"
          items={productAssignmentsArray()}
          selectProps={{ multiple: true }}
        />

        <FormSelectWithWrapper
          title="Шаг пробойника:"
          name="punchPitch"
          items={punchPatchesArray()}
        />

        <FormInputWithWrapper title="Размер:" name="size" />

        <FormInputWithWrapper title="Описание:" name="description" />
      </CreateForm>
    </>
  )
}
