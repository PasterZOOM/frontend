import { FC } from 'react'

import { Form, Formik } from 'formik'

import { CreateLeatherArticleParamsType } from '@/api/crm/leatherArticlesApi/types'
import { FormikInput } from '@/components/common/forms/formikInput'
import { FormikSelect } from '@/components/common/forms/formikSelect'
import { Button } from '@/components/common/ui/buttons/button'
import { H5 } from '@/components/common/ui/headers/h5'
import { ECreateLeatherArticleParams } from '@/enums/crm/leatherArticle'
import { useCreateLeatherArticle } from '@/hooks/crm/leatherArticles/useCreateLeatherArticle'
import { useGetAllLeatherFactories } from '@/hooks/crm/leatherFactories/useGetAllLeatherFactories'

export const AddLeatherArticleForm: FC = () => {
  const factories = useGetAllLeatherFactories()
  const createArticle = useCreateLeatherArticle()

  const initialValues: CreateLeatherArticleParamsType = {
    [ECreateLeatherArticleParams.FACTORY_ID]: factories[0]?._id || '',
    [ECreateLeatherArticleParams.DESCRIPTION]: '',
    [ECreateLeatherArticleParams.NAME]: '',
  }

  const onSubmit = async (values: CreateLeatherArticleParamsType): Promise<void> => {
    await createArticle(values)
  }

  return (
    <div>
      <H5 className="mb-4 font-bold">Добавить артикул</H5>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {() => (
          <Form className="space-y-3">
            <div>
              <div>Название артикула:</div>
              <FormikInput name={ECreateLeatherArticleParams.NAME} className="w-full border" />
            </div>
            <div>
              <div>Фабрика:</div>

              <FormikSelect
                name={ECreateLeatherArticleParams.FACTORY_ID}
                className="w-full border p-2"
                items={factories}
                valueField="_id"
              />
            </div>
            <div>
              <div>Описание:</div>
              <FormikInput
                name={ECreateLeatherArticleParams.DESCRIPTION}
                className="w-full border"
              />
            </div>
            <Button type="submit" className="w-full">
              Создать
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
