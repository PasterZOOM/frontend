import { FC } from 'react'

import { UseFormReturn } from 'react-hook-form'

import { SelectItemType } from 'components/common/ui/selects/defaultSelectType'
import { TypographyHeader } from 'components/common/ui/typographyHeader/typographyHeader'
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

type FormValues = CreateBasicProductFormType

const defaultValues: FormValues = {
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

  const articles: SelectItemType[] = (data ?? []).map(({ _id, title }) => ({
    _id,
    title,
    value: _id,
  }))

  const onSubmit = async (methods: UseFormReturn<FormValues>): Promise<void> => {
    await methods.handleSubmit(async (formData): Promise<void> => {
      try {
        await createBasicProduct(formData)
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
        confirmModalChildren={BasicProductCreatConfirmModalBody}
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        resolver={resolver}
        mode="onTouched"
      >
        <FormInputWithWrapper<FormValues> title="Название изделия:" name="title" />

        <FormSelectWithWrapper<FormValues> title="Артикул:" name="leather" items={articles} />

        <FormInputWithWrapper<FormValues>
          title="Стоимость:"
          name="cost"
          inputProps={{ type: 'number', min: 0 }}
        />

        <FormSelectWithWrapper<FormValues>
          title="Валюта:"
          name="costCurrency"
          items={currencyArray()}
        />

        <FormSelectWithWrapper<FormValues>
          title="Категория:"
          name="category"
          items={productCategoriesArray()}
        />

        <FormSelectWithWrapper<FormValues>
          title="Назначения:"
          name="assignments"
          items={productAssignmentsArray()}
          selectProps={{ multiple: true }}
        />

        <FormSelectWithWrapper<FormValues>
          title="Шаг пробойника:"
          name="punchPitch"
          items={punchPatchesArray()}
        />

        <FormInputWithWrapper<FormValues> title="Размер:" name="size" />

        <FormInputWithWrapper<FormValues> title="Описание:" name="description" />
      </CreateForm>
    </>
  )
}
