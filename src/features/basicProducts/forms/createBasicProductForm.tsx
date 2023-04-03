import { FC } from 'react'

import { Form, Formik, FormikHelpers } from 'formik'

import { CreateButton } from '@/components/common/ui/buttons/createButton'
import { H5 } from '@/components/common/ui/headers/h5'
import { FieldWrapper } from '@/components/forms/fieldWrapper'
import { FormikInput } from '@/components/forms/formikInput'
import { FormikSelect, SelectItemType } from '@/components/forms/formikSelect'
import { ECost } from '@/enums/cost'
import { EPunchPitch } from '@/enums/materials'
import { EProductCategory } from '@/enums/product'
import { ECreateBasicProductParams } from '@/features/basicProducts/enums/paramsKeys'
import { CreateBasicProductFormType } from '@/features/basicProducts/forms/type'
import { useCreateBasicProduct } from '@/features/basicProducts/hooks/useCreateBasicProduct'
import { BasicProductCreatConfirmModalBody } from '@/features/basicProducts/modals/confirm/basicProductCreatConfirmModalBody'
import { useGetAllLeatherArticles } from '@/features/leatherArticles/hooks/useGetAllLeatherArticles'
import { currencyForSelect } from '@/objects/currency/currency'
import { punchPatchForSelect } from '@/objects/materials/punchPatch'
import { productAssignments } from '@/objects/products/productAssignments'
import { productCategories } from '@/objects/products/productCategories'

const CreateBasicProductForm: FC = () => {
  const articles: SelectItemType[] = useGetAllLeatherArticles().map(({ _id, title }) => ({
    _id,
    title,
    value: _id,
  }))

  const createBasicProduct = useCreateBasicProduct()

  const initialValues: CreateBasicProductFormType = {
    [ECreateBasicProductParams.LEATHER_ARTICLE]: '',
    [ECreateBasicProductParams.DESCRIPTION]: '',
    [ECreateBasicProductParams.TITLE]: '',
    [ECreateBasicProductParams.COST]: '',
    [ECreateBasicProductParams.CATEGORY]: EProductCategory.CARD_HOLDER,
    [ECreateBasicProductParams.COST_CURRENCY]: ECost.USD,
    [ECreateBasicProductParams.PUNCH_PITCH]: EPunchPitch.LITTLE,
    [ECreateBasicProductParams.SIZE]: '',
    [ECreateBasicProductParams.ASSIGNMENTS]: '',
  }

  const onSubmit = async (
    { leather, cost, ...params }: CreateBasicProductFormType,
    { resetForm }: FormikHelpers<CreateBasicProductFormType>
  ): Promise<void> => {
    await createBasicProduct({ leather: leather || articles[0]?._id, cost: +cost, ...params })

    resetForm()
  }

  return (
    <div>
      <H5 className="mb-4 font-bold">Создать артикул</H5>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, submitForm }) => (
          <Form className="space-y-3">
            <FieldWrapper name={ECreateBasicProductParams.TITLE} title="Название изделия:">
              {name => <FormikInput name={name} />}
            </FieldWrapper>

            <FieldWrapper name={ECreateBasicProductParams.LEATHER_ARTICLE} title="Артикул:">
              {name => <FormikSelect name={name} items={articles} />}
            </FieldWrapper>

            <FieldWrapper name={ECreateBasicProductParams.COST} title="Стоимость:">
              {name => <FormikInput name={name} type="number" />}
            </FieldWrapper>

            <FieldWrapper name={ECreateBasicProductParams.COST_CURRENCY} title="Валюта:">
              {name => <FormikSelect name={name} items={currencyForSelect} />}
            </FieldWrapper>

            <FieldWrapper name={ECreateBasicProductParams.CATEGORY} title="Категория:">
              {name => <FormikSelect name={name} items={Object.values(productCategories)} />}
            </FieldWrapper>

            <FieldWrapper name={ECreateBasicProductParams.ASSIGNMENTS} title="Назначения:">
              {name => (
                <FormikSelect name={name} items={Object.values(productAssignments)} multiple />
              )}
            </FieldWrapper>

            <FieldWrapper name={ECreateBasicProductParams.PUNCH_PITCH} title="Шаг пробойника:">
              {name => <FormikSelect name={name} items={punchPatchForSelect} />}
            </FieldWrapper>

            <FieldWrapper name={ECreateBasicProductParams.SIZE} title="Размер:">
              {name => <FormikInput name={name} />}
            </FieldWrapper>

            <FieldWrapper name={ECreateBasicProductParams.DESCRIPTION} title="Описание:">
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
