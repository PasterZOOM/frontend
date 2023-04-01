import { FC } from 'react'

import { Form, Formik, FormikHelpers } from 'formik'

import { CreateButton } from '@/components/common/ui/buttons/createButton'
import { H5 } from '@/components/common/ui/headers/h5'
import { CreateBasicProductFormType } from '@/components/forms/crm/basicProducts/type'
import { FieldWrapper } from '@/components/forms/fieldWrapper'
import { FormikInput } from '@/components/forms/formikInput'
import { FormikSelect } from '@/components/forms/formikSelect'
import { BasicProductCreatConfirmModalBody } from '@/components/modals/crm/basicProducts/confirm/basicProductCreatConfirmModalBody'
import { currencyForSelect } from '@/constants/currency/currency'
import { punchPatchForSelect } from '@/constants/materials/punchPatch'
import { productCategoriesForSelect } from '@/constants/products/productCategories'
import { ECost } from '@/enums/cost'
import { ECreateBasicProductParams } from '@/enums/crm/basicProduct'
import { EPunchPitch } from '@/enums/materials'
import { EProductCategory } from '@/enums/product'
import { useCreateBasicProduct } from '@/hooks/crm/basicProducts/useCreateBasicProduct'
import { useGetAllLeatherArticles } from '@/hooks/crm/leatherArticles/useGetAllLeatherArticles'

const CreateBasicProductForm: FC = () => {
  const articles = useGetAllLeatherArticles()

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
              {name => <FormikSelect name={name} items={articles} valueField="_id" />}
            </FieldWrapper>

            <FieldWrapper name={ECreateBasicProductParams.COST} title="Стоимость:">
              {name => <FormikInput name={name} type="number" />}
            </FieldWrapper>

            <FieldWrapper name={ECreateBasicProductParams.COST_CURRENCY} title="Валюта:">
              {name => <FormikSelect name={name} items={currencyForSelect} valueField="value" />}
            </FieldWrapper>

            <FieldWrapper name={ECreateBasicProductParams.CATEGORY} title="Категория:">
              {name => (
                <FormikSelect name={name} items={productCategoriesForSelect} valueField="value" />
              )}
            </FieldWrapper>

            <FieldWrapper name={ECreateBasicProductParams.PUNCH_PITCH} title="Шаг пробойника:">
              {name => <FormikSelect name={name} items={punchPatchForSelect} valueField="value" />}
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
