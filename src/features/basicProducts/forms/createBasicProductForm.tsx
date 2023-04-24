import { FC } from 'react'

import { Form, Formik, FormikHelpers } from 'formik'

import { CreateButton } from 'components/common/ui/buttons/createButton'
import { H5 } from 'components/common/ui/headers/h5'
import { SelectItemType } from 'components/common/ui/selects/defaultSelectType'
import { FieldWrapper } from 'components/forms/fieldWrapper'
import { FormikInput } from 'components/forms/formikInput'
import { FormikSelect } from 'components/forms/formikSelect'
import { ECost } from 'enums/cost'
import { EPunchPitch } from 'enums/materials'
import { EProductCategory } from 'enums/product'
import { ECreateBasicProductParams } from 'features/basicProducts/enums/paramsKeys'
import { CreateBasicProductFormType } from 'features/basicProducts/forms/type'
import { useCreateBasicProduct } from 'features/basicProducts/hooks/useCreateBasicProduct'
import { BasicProductCreatConfirmModalBody } from 'features/basicProducts/modals/confirm/basicProductCreatConfirmModalBody'
import { useGetAllLeatherArticles } from 'features/leatherArticles/hooks/useGetAllLeatherArticles'
import { useLocale } from 'hooks/useLocale'
import { currencyArray } from 'objects/currency/currency'
import { punchPatchesArray } from 'objects/materials/punchPatch'
import { productAssignmentsArray } from 'objects/products/productAssignments'
import { productCategoriesArray } from 'objects/products/productCategories'

const CreateBasicProductForm: FC = () => {
  const locale = useLocale()
  const { data } = useGetAllLeatherArticles()
  const { mutate: createBasicProduct } = useCreateBasicProduct()

  const articles: SelectItemType[] = (data ?? []).map(({ _id, title }) => ({
    _id,
    title,
    value: _id,
  }))

  const initialValues: CreateBasicProductFormType = {
    [ECreateBasicProductParams.ASSIGNMENTS]: [],
    [ECreateBasicProductParams.CATEGORY]: EProductCategory.CARD_HOLDER,
    [ECreateBasicProductParams.COST]: 0,
    [ECreateBasicProductParams.COST_CURRENCY]: ECost.USD,
    [ECreateBasicProductParams.DESCRIPTION_EN]: '',
    [ECreateBasicProductParams.DESCRIPTION_RU]: '',
    [ECreateBasicProductParams.LEATHER_ARTICLE]: '',
    [ECreateBasicProductParams.PUNCH_PITCH]: EPunchPitch.LITTLE,
    [ECreateBasicProductParams.SIZE_EN]: '',
    [ECreateBasicProductParams.SIZE_RU]: '',
    [ECreateBasicProductParams.TITLE_RU]: '',
    [ECreateBasicProductParams.TITLE_EN]: '',
  }

  const onSubmit = async (
    {
      leather,
      'title-en': titleEn,
      'title-ru': titleRu,
      'description-en': descriptionEn,
      'description-ru': descriptionRu,
      'size-en': sizeEn,
      'size-ru': sizeRu,
      ...params
    }: CreateBasicProductFormType,
    { resetForm }: FormikHelpers<CreateBasicProductFormType>
  ): Promise<void> => {
    try {
      await createBasicProduct({
        leather: leather || articles[0]?._id,
        title: { en: titleEn, ru: titleRu },
        description: { en: descriptionEn, ru: descriptionRu },
        size: { en: sizeEn, ru: sizeRu },
        ...params,
      })
      resetForm()
    } catch (e) {
      /* empty */
    }
  }

  return (
    <div>
      <H5 className="mb-4 font-bold">Создать артикул</H5>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, submitForm }) => (
          <Form className="space-y-3">
            <FieldWrapper name={ECreateBasicProductParams.TITLE_EN} title="Название изделия EN:">
              {name => <FormikInput name={name} />}
            </FieldWrapper>
            <FieldWrapper name={ECreateBasicProductParams.TITLE_RU} title="Название изделия RU:">
              {name => <FormikInput name={name} />}
            </FieldWrapper>

            <FieldWrapper name={ECreateBasicProductParams.LEATHER_ARTICLE} title="Артикул:">
              {name => <FormikSelect name={name} items={articles} />}
            </FieldWrapper>

            <FieldWrapper name={ECreateBasicProductParams.COST} title="Стоимость:">
              {name => <FormikInput name={name} type="number" />}
            </FieldWrapper>

            <FieldWrapper name={ECreateBasicProductParams.COST_CURRENCY} title="Валюта:">
              {name => <FormikSelect name={name} items={currencyArray(locale)} />}
            </FieldWrapper>

            <FieldWrapper name={ECreateBasicProductParams.CATEGORY} title="Категория:">
              {name => <FormikSelect name={name} items={productCategoriesArray(locale)} />}
            </FieldWrapper>

            <FieldWrapper name={ECreateBasicProductParams.ASSIGNMENTS} title="Назначения:">
              {name => (
                <FormikSelect name={name} items={productAssignmentsArray(locale)} multiple />
              )}
            </FieldWrapper>

            <FieldWrapper name={ECreateBasicProductParams.PUNCH_PITCH} title="Шаг пробойника:">
              {name => <FormikSelect name={name} items={punchPatchesArray(locale)} />}
            </FieldWrapper>

            <FieldWrapper name={ECreateBasicProductParams.SIZE_EN} title="Размер EN:">
              {name => <FormikInput name={name} />}
            </FieldWrapper>
            <FieldWrapper name={ECreateBasicProductParams.SIZE_RU} title="Размер RU:">
              {name => <FormikInput name={name} />}
            </FieldWrapper>

            <FieldWrapper name={ECreateBasicProductParams.DESCRIPTION_EN} title="Описание EN:">
              {name => <FormikInput name={name} />}
            </FieldWrapper>
            <FieldWrapper name={ECreateBasicProductParams.DESCRIPTION_RU} title="Описание RU:">
              {name => <FormikInput name={name} />}
            </FieldWrapper>

            <CreateButton
              onConfirm={submitForm}
              modalChildren={<BasicProductCreatConfirmModalBody values={values} />}
            />
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default CreateBasicProductForm
