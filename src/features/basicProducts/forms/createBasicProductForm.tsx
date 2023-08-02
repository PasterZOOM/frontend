import { FC } from 'react'

import { useTranslation } from 'next-i18next'
import { UseFormReturn } from 'react-hook-form'

import { CreateForm } from 'components/forms/createForm'
import { FormInputWithWrapper } from 'components/forms/inputs/formInputWithWrapper'
import { FormSelectWithWrapper } from 'components/forms/selects/formSelectWithWrapper'
import { CreateBasicProductFormType } from 'features/basicProducts/forms/type'
import { resolver } from 'features/basicProducts/forms/validation.sheme'
import { useCreateBasicProduct } from 'features/basicProducts/hooks/useCreateBasicProduct'
import { BasicProductCreatConfirmModalBody } from 'features/basicProducts/modals/confirm/basicProductCreatConfirmModalBody'
import { useGetAllLeatherArticles } from 'features/leatherArticles/hooks/useGetAllLeatherArticles'
import { currencyArray } from 'objects/currency/currency'
import { punchPatchesArray } from 'objects/materials/punchPatch'
import { productAssignmentsArray } from 'objects/products/productAssignments'
import { productCategoriesArray } from 'objects/products/productCategories'
import { ECost } from 'shared/enums/cost'
import { EPunchPitch } from 'shared/enums/materials'
import { EProductCategory } from 'shared/enums/product'
import { SelectItemType } from 'shared/ui/selects/defaultSelectType'
import { TypographyHeader } from 'shared/ui/typographyHeader/typographyHeader'

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
  const { t } = useTranslation()

  const articles: SelectItemType[] = (data ?? []).map(({ _id, title }) => ({
    _id,
    title,
    value: _id,
  }))

  const onSubmit = async (methods: UseFormReturn<FormValues>): Promise<void> => {
    await methods.handleSubmit(async (formData): Promise<void> => {
      try {
        createBasicProduct(formData)
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
        confirmModalChildren={BasicProductCreatConfirmModalBody}
        defaultValues={defaultValues}
        mode="onTouched"
        resolver={resolver}
        onSubmit={onSubmit}
      >
        <FormInputWithWrapper<FormValues> name="title" title="Название изделия:" />

        <FormSelectWithWrapper<FormValues> items={articles} name="leather" title="Артикул:" />

        <FormInputWithWrapper<FormValues>
          inputProps={{ type: 'number', min: 0 }}
          name="cost"
          title="Стоимость:"
        />

        <FormSelectWithWrapper<FormValues>
          items={currencyArray()}
          name="costCurrency"
          title="Валюта:"
        />

        <FormSelectWithWrapper<FormValues>
          items={productCategoriesArray()}
          name="category"
          title="Категория:"
        />

        <FormSelectWithWrapper<FormValues>
          items={productAssignmentsArray()}
          name="assignments"
          selectProps={{ multiple: true }}
          title="Назначения:"
        />

        <FormSelectWithWrapper<FormValues>
          items={punchPatchesArray()}
          name="punchPitch"
          title="Шаг пробойника:"
        />

        <FormInputWithWrapper<FormValues> name="size" title="Размер:" />

        <FormInputWithWrapper<FormValues> name="description" title="Описание:" />
      </CreateForm>
    </>
  )
}
