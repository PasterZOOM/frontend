import { FC } from 'react'

import { useTranslation } from 'next-i18next'
import { UseFormReturn } from 'react-hook-form'

import { CreateBasicProductFormType } from '@/features/basicProducts/forms/module/type'
import { resolver } from '@/features/basicProducts/forms/module/validation.sheme'
import { BasicProductCreatConfirmModalBody } from '@/features/basicProducts/forms/ui/basicProductCreatConfirmModalBody'
import { useCreateBasicProduct } from '@/features/basicProducts/hooks/useCreateBasicProduct'
import { useGetAllLeatherArticles } from '@/features/leatherArticles/hooks/useGetAllLeatherArticles'
import { CreateForm } from '@/shared/components/forms/createForm'
import { FormInputWithWrapper } from '@/shared/components/forms/inputs/formInputWithWrapper'
import { FormSelectWithWrapper } from '@/shared/components/forms/selects/formSelectWithWrapper'
import { EPunchPitch } from '@/shared/enums/materials'
import { EProductCategory } from '@/shared/enums/product'
import { punchPatchesArray } from '@/shared/objects/materials/punchPatch'
import { productAssignmentsArray } from '@/shared/objects/products/productAssignments'
import { productCategoriesArray } from '@/shared/objects/products/productCategories'
import { SelectItemType } from '@/shared/ui/selects/defaultSelectType'
import { TypographyHeader } from '@/shared/ui/typographyHeader/typographyHeader'

type FormValues = CreateBasicProductFormType
const defaultValues: FormValues = {
  assignments: [],
  category: EProductCategory.CARD_HOLDER,
  cost: 0,
  description: '',
  leatherArticle: '',
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
    await methods.handleSubmit(async ({ leatherArticle, ...formData }): Promise<void> => {
      try {
        createBasicProduct({
          ...formData,
          leather: {
            article: leatherArticle,
            factory: data?.filter(article => article._id === leatherArticle)[0].factory._id ?? '',
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
        confirmModalChildren={BasicProductCreatConfirmModalBody}
        defaultValues={defaultValues}
        mode="onTouched"
        resolver={resolver}
        onSubmit={onSubmit}
      >
        <FormInputWithWrapper<FormValues> label="Название изделия:" name="title" />

        <FormSelectWithWrapper<FormValues>
          items={articles}
          label="Артикул:"
          name="leatherArticle"
        />

        <FormInputWithWrapper<FormValues>
          inputProps={{ type: 'number', min: 0 }}
          label="Стоимость:"
          name="cost"
        />

        <FormSelectWithWrapper<FormValues>
          items={productCategoriesArray}
          label="Категория:"
          name="category"
        />

        <FormSelectWithWrapper<FormValues>
          items={productAssignmentsArray}
          label="Назначения:"
          name="assignments"
          selectProps={{ multiple: true }}
        />

        <FormSelectWithWrapper<FormValues>
          items={punchPatchesArray}
          label="Шаг пробойника:"
          name="punchPitch"
        />

        <FormInputWithWrapper<FormValues> label="Размер:" name="size" />

        <FormInputWithWrapper<FormValues> label="Описание:" name="description" />
      </CreateForm>
    </>
  )
}
